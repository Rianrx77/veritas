import type { LlmConfig } from '../App';
import { generateMockTopic } from './mockData';
import type { TopicData } from './mockData';

export interface WireNewsArticle {
  headline: string;
  source: string;
  url: string;
  publishDate: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  excerpt: string;
}

export interface WireDiscussionSnippet {
  platform: 'Reddit' | 'X' | 'Forums';
  author: string;
  content: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  engagement: number;
  url: string;
}

export interface WirePredictionMarket {
  question: string;
  yesProb: number;
  noProb: number;
  volume: string;
  trend: 'up' | 'down' | 'stable';
  history: Array<{ date: string; value: number }>;
}

async function callLocalLLM(prompt: string, config: LlmConfig, isClassification: boolean = false): Promise<string> {
  const endpoint = config.localEndpoint.endsWith('/') 
    ? config.localEndpoint.slice(0, -1) 
    : config.localEndpoint;
  
  // If Ollama is detected via port 11434, use the native /api/generate endpoint
  if (isClassification || endpoint.includes('11434')) {
    const baseHost = endpoint.replace(/\/v1$/, '').replace(/\/$/, '');
    const url = `${baseHost}/api/generate`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.localModel || 'llama3',
        prompt,
        stream: false
      })
    });
    if (!response.ok) {
      throw new Error(`Ollama returned status ${response.status}`);
    }
    const data = await response.json();
    return data.response || "";
  } else {
    // Fallback to OpenAI-compatible chat completion (e.g. LM Studio / Port 1234)
    const url = `${endpoint}/chat/completions`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer local-dev'
      },
      body: JSON.stringify({
        model: config.localModel || 'llama3',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2
      })
    });
    if (!response.ok) {
      throw new Error(`Local LLM returned status ${response.status}`);
    }
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  }
}

async function executeWireTaskAndPoll(actionId: string, query: string, apiKey: string): Promise<any> {
  console.log(`[Anakin Wire] Creating task for ${actionId} with query "${query}"`);
  
  const response = await fetch('https://api.anakin.io/v1/wire/task', {
    method: 'POST',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action_id: actionId,
      params: {
        query: query
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Wire API task creation returned status ${response.status}`);
  }

  const taskData = await response.json();
  if (taskData.status === 'completed') {
    console.log(`[Anakin Wire] Action ${actionId} completed synchronously.`);
    return taskData;
  }

  const jobId = taskData.job_id;
  if (!jobId) {
    throw new Error(`No job_id returned for action ${actionId}`);
  }

  const pollUrl = `https://api.anakin.io/v1/wire/jobs/${jobId}`;
  console.log(`[Anakin Wire] Job ${jobId} registered for ${actionId}. Starting polling loop...`);

  // Poll up to 15 times (30 seconds total)
  for (let i = 0; i < 15; i++) {
    await new Promise(r => setTimeout(r, 2000));
    console.log(`[Anakin Wire] Polling job ${jobId} (attempt ${i + 1}/15)...`);
    
    try {
      const pollRes = await fetch(pollUrl, {
        headers: {
          'X-API-Key': apiKey
        }
      });

      if (!pollRes.ok) {
        console.warn(`[Anakin Wire] Polling failed for job ${jobId} with status ${pollRes.status}`);
        continue;
      }

      const jobData = await pollRes.json();
      if (jobData.status === 'completed') {
        console.log(`[Anakin Wire] Job ${jobId} completed successfully.`);
        return jobData;
      } else if (jobData.status === 'failed') {
        throw new Error(`Job execution failed: ${JSON.stringify(jobData.error || 'unknown error')}`);
      }
    } catch (err) {
      console.warn(`[Anakin Wire] Error checking job status for ${jobId}:`, err);
    }
  }

  throw new Error(`Polling timed out for job ${jobId} after 30 seconds`);
}

function extractItemsFromJob(jobData: any): any[] {
  if (!jobData) return [];
  
  const payloads = [jobData.data, jobData.result, jobData];
  for (const payload of payloads) {
    if (!payload) continue;
    
    if (Array.isArray(payload)) {
      return payload;
    }
    
    if (payload.data && Array.isArray(payload.data)) {
      return payload.data;
    }
    
    if (payload.result && Array.isArray(payload.result)) {
      return payload.result;
    }
    
    if (payload.data && typeof payload.data === 'object') {
      const nested = payload.data;
      if (nested.data && Array.isArray(nested.data)) {
        return nested.data;
      }
      if (nested.results && Array.isArray(nested.results)) {
        return nested.results;
      }
      if (nested.articles && Array.isArray(nested.articles)) {
        return nested.articles;
      }
      const arrayKey = Object.keys(nested).find(k => Array.isArray(nested[k]));
      if (arrayKey) {
        return nested[arrayKey];
      }
    }
    
    const arrayKey = Object.keys(payload).find(k => Array.isArray(payload[k]));
    if (arrayKey) {
      return payload[arrayKey];
    }
  }
  
  return [jobData];
}

// Session cache to avoid redundant Wire API calls for the same query
const sessionCache = new Map<string, TopicData>();

export class WireService {
  /**
   * Orchestrates the intelligent search flow:
   * 1. Classifies query intent using the Local LLM (Ollama or LM Studio).
   * 2. Selects appropriate Anakin Wire action_ids.
   * 3. Fetches live web signals in parallel via Promise.all.
   * 4. Synthesizes an objective executive summary using the Local LLM.
   */
  static async orchestrateSearchQuery(query: string, config: LlmConfig): Promise<TopicData> {
    // Check session cache first to save API credits
    const cacheKey = `wire:${query.toLowerCase().trim()}`;
    const cached = sessionCache.get(cacheKey);
    if (cached) {
      console.log(`[Orchestration] Cache hit for "${query}". Returning cached result.`);
      return cached;
    }
    console.log(`[Orchestration] Initiating two-step research flow for query: "${query}"`);
    
    // Step 1: Intent Classification via Local AI
    let category = 'GENERAL';
    try {
      const classificationPrompt = `Categorize the following search query into one of these types: [FINANCE, TECH, POLITICS, CAREERS, GENERAL]. Query: '${query}'. Return ONLY the category word in uppercase.`;
      const responseText = await callLocalLLM(classificationPrompt, config, true);
      const cleaned = responseText.trim().toUpperCase();
      
      if (['FINANCE', 'TECH', 'POLITICS', 'CAREERS', 'GENERAL'].includes(cleaned)) {
        category = cleaned;
      } else {
        // Look for keywords in LLM verbose response
        for (const cat of ['FINANCE', 'TECH', 'POLITICS', 'CAREERS', 'GENERAL']) {
          if (cleaned.includes(cat)) {
            category = cat;
            break;
          }
        }
      }
      console.log(`[Orchestration] Local LLM Classified query as: ${category}`);
    } catch (e) {
      console.warn("[Orchestration] Local LLM classification failed, using keyword fallback:", e);
      const qLower = query.toLowerCase();
      if (/placed|placement|job|career|hiring|hire|salary|recruitment|engineer|college|student|university|intern|campus/i.test(qLower)) {
        category = 'CAREERS';
      } else if (/stock|rate|fed|finance|val|valuation|market|gold|price|rbi|bank|revenue|funding|investment|wsj|cnbc/i.test(qLower)) {
        category = 'FINANCE';
      } else if (/tech|claude|gpt|model|nvidia|ai|github|software|developer|silicon|semiconductor|chip|openai|reasoning|programming|code/i.test(qLower)) {
        category = 'TECH';
      } else if (/election|biden|trump|politics|government|senate|policy|regulation|law|court|eu|minister|news|bbc|reuters/i.test(qLower)) {
        category = 'POLITICS';
      } else {
        category = 'GENERAL';
      }
      console.log(`[Orchestration] Keyword Classifier set category to: ${category}`);
    }

    // Step 2: Dynamic Action IDs Selection
    const actionIds = new Set<string>(['gn_search', 'rt_search']);
    if (category === 'FINANCE') {
      actionIds.add('cn_search');
    } else if (category === 'TECH') {
      actionIds.add('tc_search');
      actionIds.add('hn_search');
    } else if (category === 'POLITICS') {
      actionIds.add('ap_search');
      actionIds.add('re_search');
    } else if (category === 'CAREERS') {
      actionIds.add('re_search');
    }
    const actionIdList = Array.from(actionIds);
    console.log(`[Orchestration] Routing search query to Anakin Wire APIs:`, actionIdList);

    // Step 3: Promise.all Batch execution
    let consolidatedResponses: any[] = [];
    if (config.wireApiKey) {
      try {
        const promises = actionIdList.map(async (actionId) => {
          try {
            const data = await executeWireTaskAndPoll(actionId, query, config.wireApiKey || '');
            return { actionId, data, success: true };
          } catch (taskErr) {
            console.error(`[Orchestration] Action ID ${actionId} failed or timed out:`, taskErr);
            return { actionId, data: null, success: false };
          }
        });
        
        consolidatedResponses = await Promise.all(promises);
        console.log(`[Orchestration] Ingested raw responses for all actions.`);
      } catch (e) {
        console.error("[Orchestration] Parallel Wire API requests failed:", e);
      }
    } else {
      console.warn("[Orchestration] No Anakin Wire API key set; skipping actual fetches.");
    }

    // Parse items from live responses
    const newsList: any[] = [];
    const discussionsList: any[] = [];
    const analyzeSentiment = (headline: string, excerpt: string) => {
      const text = `${headline} ${excerpt}`.toLowerCase();
      const positiveWords = [
        'leapfrog', 'record', 'valuation', 'surge', 'gains', 'growth', 'breakthrough',
        'success', 'launch', 'release', 'positive', 'partnership', 'expand', 'investment',
        'bullish', 'win', 'leads', 'upgrade', 'profit', 'rise', 'soar', 'innovative', 'open'
      ];
      const negativeWords = [
        'drop', 'fall', 'lose', 'decline', 'crash', 'hack', 'breach', 'vulnerability',
        'risk', 'threat', 'caution', 'probe', 'investigation', 'fine', 'penalty', 'lawsuit',
        'fail', 'lack', 'ban', 'block', 'warning', 'negative', 'bearish', 'deficit'
      ];
      
      let score = 0;
      for (const word of positiveWords) {
        if (text.includes(word)) score += 1;
      }
      for (const word of negativeWords) {
        if (text.includes(word)) score -= 1;
      }
      
      if (score > 0) return 'positive';
      if (score < 0) return 'negative';
      return 'neutral';
    };

    consolidatedResponses.forEach((res, resIdx) => {
      const { actionId, data, success } = res;
      if (!success || !data) {
        console.log(`[Orchestration] Skipping mapping for failed action: ${actionId}`);
        return;
      }

      let items = extractItemsFromJob(data);

      // Filter and limit items
      items = items.filter(item => item && typeof item === 'object').slice(0, 5);

      const isDiscussion = actionId.includes('reddit') || actionId.includes('rt_') || actionId.includes('github') || actionId.includes('forum');

      if (isDiscussion) {
        items.forEach((item, itemIdx) => {
          const platform = actionId.includes('reddit') || actionId.includes('rt_') ? 'Reddit' : 'Forums';
          const author = item.author || item.user || item.owner || `user_${resIdx}_${itemIdx}`;
          const content = item.content || item.body || item.text || item.title || item.description || `Discussions regarding ${query}`;
          const sentiment = item.sentiment || analyzeSentiment(content, '');
          const engagement = item.engagement || item.score || item.stars || Math.floor(Math.random() * 100);
          const url = item.url || item.link || `https://${platform.toLowerCase()}.com/post/${resIdx}_${itemIdx}`;

          discussionsList.push({
            id: `wire-d-${resIdx}-${itemIdx}`,
            platform,
            author,
            content: content.length > 250 ? content.slice(0, 247) + '...' : content,
            sentiment,
            engagement,
            url
          });
        });
      } else {
        items.forEach((item, itemIdx) => {
          const sourceName = item.source || item.publisher || actionId.split('_')[0];
          const headline = item.headline || item.title || item.name || `News update on ${query}`;
          const url = item.url || item.link || `https://${sourceName.toLowerCase()}.com/article/${resIdx}_${itemIdx}`;
          const publishDate = item.publishDate || item.date || item.published || item.publishedAt || new Date().toISOString().split('T')[0];
          const excerpt = item.excerpt || item.description || item.snippet || item.body || `Coverage detailing ${query}`;
          const sentiment = item.sentiment || analyzeSentiment(headline, excerpt);

          newsList.push({
            id: `wire-n-${resIdx}-${itemIdx}`,
            headline,
            source: sourceName.charAt(0).toUpperCase() + sourceName.slice(1),
            url,
            publishDate,
            sentiment,
            excerpt
          });
        });
      }
    });


    // Step 4: Final Synthesis via Local LLM
    let summaryPoints: string[] = [];
    let usedModel = config.provider === 'local' 
      ? `Local LLM (${(config.localModel || 'llama3').toUpperCase()})` 
      : config.provider === 'gemini' 
        ? 'Gemini' 
        : 'Mock Synthesis Engine';

    if (consolidatedResponses.length > 0) {
      try {
        const rawDataBlock = {
          query,
          category,
          actionIds: actionIdList,
          responses: consolidatedResponses.map(r => ({
            actionId: r.actionId,
            items: r.data
          }))
        };

        const summaryPrompt = `You are an expert analyst. Based on this raw JSON data from News, Reddit, and other sources, write an executive summary about the current sentiment and factual status of '${query}'.
Return your response ONLY as a JSON array of 3 to 4 strings representing key bullet points. Do not include markdown formatting or extra text outside the JSON array.
Example:
[
  "First key point about news...",
  "Second key point about discussions...",
  "Third key point about overall status..."
]

Raw JSON Data:
${JSON.stringify(rawDataBlock).slice(0, 3000)}
`;
        usedModel = `Local LLM (${(config.localModel || 'llama3').toUpperCase()})`;
        const summaryText = await callLocalLLM(summaryPrompt, config, false);
        
        const jsonStart = summaryText.indexOf('[');
        const jsonEnd = summaryText.lastIndexOf(']') + 1;
        if (jsonStart !== -1 && jsonEnd !== -1) {
          try {
            const jsonStr = summaryText.substring(jsonStart, jsonEnd);
            const parsed = JSON.parse(jsonStr);
            if (Array.isArray(parsed) && parsed.length > 0) {
              summaryPoints = parsed.slice(0, 4);
            }
          } catch (e) {
            // ignore JSON parse error, fall back to regex/line split
          }
        }
        
        if (summaryPoints.length === 0) {
          const cleanLines = summaryText
            .split('\n')
            .map(line => line.replace(/^[-*"\s[\]]+|["\s,\]]+$/g, '').trim())
            .filter(line => line.length > 10);
          if (cleanLines.length >= 3) {
            summaryPoints = cleanLines.slice(0, 4);
          }
        }
      } catch (e) {
        console.warn("[Orchestration] Local LLM executive summary failed, trying Gemini if available:", e);
      }
    }

    // Attempt Gemini synthesis fallback if Gemini is the active provider or if local AI synthesis failed
    if (summaryPoints.length === 0 && config.apiKey && (config.provider === 'gemini' || config.provider === 'local')) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(config.apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const geminiPrompt = `You are an expert analyst. Write a 3-sentence executive summary about the current sentiment and factual status of '${query}' based on this data. Output ONLY a JSON array of 3 strings: ${JSON.stringify(newsList.slice(0, 3))}`;
        const result = await model.generateContent(geminiPrompt);
        const text = result.response.text();
        const jsonStart = text.indexOf('[');
        const jsonEnd = text.lastIndexOf(']') + 1;
        if (jsonStart !== -1 && jsonEnd !== -1) {
          const parsed = JSON.parse(text.substring(jsonStart, jsonEnd));
          if (Array.isArray(parsed) && parsed.length > 0) {
            summaryPoints = parsed.slice(0, 4);
            usedModel = "Gemini 1.5 Flash (Live AI)";
          }
        }
      } catch (geminiErr) {
        console.error("[Orchestration] Gemini fallback synthesis failed:", geminiErr);
      }
    }

    // Default static points if all LLM options fail
    if (summaryPoints.length === 0) {
      summaryPoints = [
        `Ingested news reports verify a growing volume of global interest centered around ${query}.`,
        `Real-time feeds from categorized sites indicate active coverage and discussion on related developments.`,
        `Regulatory guidelines, developer execution, and community adoption remain the core drivers of sentiment.`,
        `Prediction and opinion signals display a moderate-to-high level of divergence across communities.`
      ];
      usedModel = "Mock Synthesis Engine (Fallback)";
    }

    // Build the final complete payload using our high-fidelity seedable mock generator as a base
    const baseTopic = generateMockTopic(query);
    
    // Inject classification and category
    baseTopic.category = category.charAt(0) + category.slice(1).toLowerCase();
    
    // Overwrite news and discussions if we fetched real data
    if (newsList.length > 0) {
      baseTopic.news = [...newsList, ...baseTopic.news].slice(0, Math.max(newsList.length, 4));
    }
    
    if (discussionsList.length > 0) {
      baseTopic.discussions = [...discussionsList, ...baseTopic.discussions].slice(0, Math.max(discussionsList.length, 4));
    }

    baseTopic.summary = {
      points: summaryPoints,
      confidenceScore: Math.floor(88 + Math.random() * 8),
      sourceCount: actionIdList.length + newsList.length + discussionsList.length,
      generatedAt: new Date().toISOString(),
      modelName: usedModel
    };

    // Update metrics and source list dynamically
    baseTopic.metrics.newsCount = baseTopic.news.length;
    baseTopic.metrics.sourceCount = actionIdList.length;

    const sourceMap: Record<string, number> = {};
    baseTopic.news.forEach(n => {
      sourceMap[n.source] = (sourceMap[n.source] || 0) + 1;
    });
    baseTopic.discussions.forEach(d => {
      sourceMap[d.platform] = (sourceMap[d.platform] || 0) + 1;
    });

    const sourcesData = Object.keys(sourceMap).map(name => {
      const isMedia = !['Reddit', 'X', 'Forums'].includes(name);
      return {
        name,
        count: sourceMap[name],
        sentiment: isMedia ? baseTopic.divergence.mediaSentiment : baseTopic.divergence.publicSentiment,
        bias: (isMedia ? 'Center' : 'Center-Left') as any
      };
    });
    if (sourcesData.length > 0) {
      baseTopic.sources = sourcesData;
    }

    // Cache the result to avoid redundant API calls on back-navigation
    sessionCache.set(cacheKey, baseTopic);
    console.log(`[Orchestration] Cached result for "${query}".`);

    return baseTopic;
  }

  /**
   * Fetches unified data for a topic. If a Live API configuration is present,
   * it delegates to orchestrateSearchQuery for two-step local LLM & Wire integration.
   */
  static async fetchTopicData(query: string, config?: LlmConfig): Promise<TopicData> {
    if (config && config.wireApiKey) {
      return this.orchestrateSearchQuery(query, config);
    }
    
    // Simulate network latency (between 1.5s and 3s) for the mock demo
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    return generateMockTopic(query);
  }
}
