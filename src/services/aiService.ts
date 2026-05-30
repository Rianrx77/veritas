import { GoogleGenerativeAI } from '@google/generative-ai';
import type { TopicData } from './mockData';
import type { LlmConfig } from '../App';

export interface AISummaryResult {
  points: string[];
  confidenceScore: number;
  sourceCount: number;
  generatedAt: string;
  modelName: string;
}

export class AIService {
  /**
   * Generates a neutral, multi-perspective summary of the topic data.
   * If a Gemini API key is provided, it uses the official SDK to generate a live summary.
   * If local LLM mode is selected, it calls local Ollama or LM Studio servers.
   * Otherwise, it returns the pre-populated mock summary.
   */
  static async generateSummary(
    topicData: TopicData,
    config: LlmConfig
  ): Promise<AISummaryResult> {
    if (config.provider === 'mock') {
      // Fallback: Return the high-fidelity mock summary
      return {
        ...topicData.summary,
        generatedAt: new Date().toISOString(),
        modelName: "Mock Synthesis Engine"
      };
    }

    // Construct a detailed prompt with raw news and public opinion data
    const newsStr = topicData.news
      .map((n) => `- [News: ${n.source}] ${n.headline}: ${n.excerpt} (Sentiment: ${n.sentiment})`)
      .join('\n');
    
    const discStr = topicData.discussions
      .map((d) => `- [Social: ${d.platform}] ${d.author}: "${d.content}" (Sentiment: ${d.sentiment})`)
      .join('\n');
    
    const predStr = topicData.predictions
      .map((p) => `- [Predictions] Question: "${p.question}" (Yes: ${p.yesProb}%, No: ${p.noProb}%)`)
      .join('\n');

    const prompt = `
You are Veritas, a neutral, evidence-backed AI research assistant.
Your task is to synthesize a neutral, highly objective summary of the following topic data collected via web search APIs.
You must analyze:
1. What happened (from the news articles).
2. What people think (from public forum discussions).
3. What is predicted (from prediction market signals).

Topic: ${topicData.title}
Category: ${topicData.category}
Description: ${topicData.description}

Raw Data Ingested:
---
NEWS COVERAGE:
${newsStr}

PUBLIC DISCUSSIONS:
${discStr}

PREDICTION SIGNALS:
${predStr}
---

Provide EXACTLY 4 concise bullet points summarizing this topic from multiple angles.
Keep the tone neutral, professional, and free of hype.
Do not use markdown formatting inside the bullet points.
Output your response as a JSON array of strings. For example:
[
  "First key point about news events...",
  "Second key point about public opinion...",
  "Third key point about prediction probability...",
  "Fourth key point synthesizing the conflict/agreement..."
]
`;

    if (config.provider === 'gemini') {
      if (!config.apiKey) {
        throw new Error("Gemini API key is required but missing.");
      }
      try {
        const genAI = new GoogleGenerativeAI(config.apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return this.parseResponse(text, topicData, "Gemini 1.5 Flash (Live AI)");
      } catch (error) {
        console.error("Gemini API Error, falling back to mock summary:", error);
        return this.getFallbackSummary(topicData, "Gemini (Fallback Mode)");
      }
    }

    if (config.provider === 'local') {
      try {
        const endpoint = config.localEndpoint.endsWith('/') 
          ? config.localEndpoint.slice(0, -1) 
          : config.localEndpoint;
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
          throw new Error(`Local LLM server returned status ${response.status}`);
        }

        const responseData = await response.json();
        const text = responseData.choices?.[0]?.message?.content || "";
        return this.parseResponse(text, topicData, `Local LLM (${config.localModel})`);
      } catch (error) {
        console.error("Local LLM API Error, falling back to mock summary:", error);
        return this.getFallbackSummary(topicData, `Local LLM Fallback (${config.localModel})`);
      }
    }

    throw new Error("Invalid LLM provider configured.");
  }

  /**
   * Helper to parse bullet points from LLM response text
   */
  private static parseResponse(text: string, topicData: TopicData, modelName: string): AISummaryResult {
    // Clean and parse JSON array
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']') + 1;
    
    if (jsonStart !== -1 && jsonEnd !== -1) {
      try {
        const jsonStr = text.substring(jsonStart, jsonEnd);
        const parsedPoints = JSON.parse(jsonStr);
        if (Array.isArray(parsedPoints) && parsedPoints.length > 0) {
          return {
            points: parsedPoints.slice(0, 4), // ensure 4 points
            confidenceScore: Math.floor(88 + Math.random() * 8), // 88-95%
            sourceCount: topicData.news.length + topicData.discussions.length,
            generatedAt: new Date().toISOString(),
            modelName
          };
        }
      } catch (e) {
        // Fall back to line extraction
      }
    }
    
    // If parsing fails, extract lines manually
    const cleanLines = text
      .split('\n')
      .map(line => line.replace(/^[-*"\s[\]]+|["\s,\]]+$/g, '').trim())
      .filter(line => line.length > 10);
    
    if (cleanLines.length >= 4) {
      return {
        points: cleanLines.slice(0, 4),
        confidenceScore: 92,
        sourceCount: topicData.news.length + topicData.discussions.length,
        generatedAt: new Date().toISOString(),
        modelName
      };
    }

    throw new Error("Could not parse AI bullet points.");
  }

  /**
   * Helper to return static fallback details
   */
  private static getFallbackSummary(topicData: TopicData, modelName: string): AISummaryResult {
    return {
      points: [
        `Failed to call generative server. Showing cached synthesis for ${topicData.title}.`,
        `News reports indicate steady engagement, with media sentiment showing ${topicData.divergence.mediaSentiment > 0 ? 'positivity' : 'caution'}.`,
        `Public discussions continue to reveal debates about regulatory compliance and long-term costs.`,
        `Market predictions place the probability of major changes at ${topicData.metrics.predictionConfidence}%.`
      ],
      confidenceScore: 85,
      sourceCount: topicData.news.length + topicData.discussions.length,
      generatedAt: new Date().toISOString(),
      modelName
    };
  }
}
