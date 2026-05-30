export interface TopicData {
  title: string;
  slug: string;
  category: string;
  description: string;
  lastUpdated: string;
  summary: {
    points: string[];
    confidenceScore: number;
    sourceCount: number;
    generatedAt: string;
    modelName: string;
  };
  metrics: {
    newsCount: number;
    publicSentimentPos: number;
    publicSentimentNeu: number;
    publicSentimentNeg: number;
    predictionConfidence: number;
    sourceCount: number;
  };
  divergence: {
    mediaSentiment: number; // -100 to +100
    publicSentiment: number; // -100 to +100
    score: number; // 0 to 200
    insight: string;
  };
  news: Array<{
    id: string;
    headline: string;
    source: string;
    url: string;
    publishDate: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    excerpt: string;
  }>;
  discussions: Array<{
    id: string;
    platform: 'Reddit' | 'X' | 'Forums';
    author: string;
    content: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    engagement: number;
    url: string;
  }>;
  themes: Array<{
    name: string;
    mentions: number;
    sentiment: 'positive' | 'neutral' | 'negative';
    trend: 'up' | 'down' | 'stable';
  }>;
  predictions: Array<{
    id: string;
    question: string;
    yesProb: number;
    noProb: number;
    volume: string;
    trend: 'up' | 'down' | 'stable';
    history: Array<{ date: string; value: number }>;
  }>;
  timeline: Array<{
    date: string;
    title: string;
    description: string;
    sourcesCount: number;
  }>;
  sentimentHistory: Array<{
    date: string;
    media: number;
    public: number;
  }>;
  sources: Array<{
    name: string;
    count: number;
    sentiment: number; // -100 to +100
    bias: 'Left' | 'Center-Left' | 'Center' | 'Center-Right' | 'Right';
  }>;
}

// Pre-built high-fidelity datasets
export const PREBUILT_TOPICS: Record<string, TopicData> = {
  "openai": {
    title: "OpenAI",
    slug: "openai",
    category: "Technology",
    description: "The leading artificial intelligence research company known for ChatGPT, GPT-4, and Sora, navigating governance transitions, commercialization pressures, and model capability scaling.",
    lastUpdated: "May 30, 2026",
    summary: {
      points: [
        "OpenAI is currently raising capital at a valuation exceeding $150 billion, shifting from a non-profit governed structure to a commercial benefit corporation.",
        "Model development centers on 'Orion' and next-gen reasoning models, though reports suggest diminishing returns in standard pre-training scaling laws.",
        "Public sentiment remains highly polarized between developer enthusiasm for feature releases and heavy user criticism over safety, data privacy, and leadership changes.",
        "Prediction markets estimate a 68% probability that OpenAI will transition fully to a for-profit structure before the end of 2027."
      ],
      confidenceScore: 94,
      sourceCount: 38,
      generatedAt: "2026-05-30T12:00:00Z",
      modelName: "Gemini 3.5 Flash (Synthesized via Wire)"
    },
    metrics: {
      newsCount: 142,
      publicSentimentPos: 42,
      publicSentimentNeu: 23,
      publicSentimentNeg: 35,
      predictionConfidence: 68,
      sourceCount: 22
    },
    divergence: {
      mediaSentiment: 65, // Positive media coverage on capabilities and valuation
      publicSentiment: -18, // Critical public sentiment on governance and restrictions
      score: 83,
      insight: "The media is largely enthusiastic about OpenAI's commercial viability, rising valuations, and model updates. However, public forums (particularly Reddit and X) are highly critical of governance changes, safety researcher departures, and API pricing, leading to a high divergence score of 83."
    },
    news: [
      {
        id: "n1",
        headline: "OpenAI Closes Landmark Funding Round, Evaluating For-Profit Transition",
        source: "Reuters",
        url: "https://reuters.com/openai-funding-round",
        publishDate: "2026-05-28",
        sentiment: "positive",
        excerpt: "OpenAI has finalized its latest multi-billion dollar investment round. According to sources close to the negotiations, the funding is structured with a condition that the startup transitions to a traditional for-profit model within two years."
      },
      {
        id: "n2",
        headline: "The Limits of Scaling: Inside OpenAI's Search for Next-Gen Model Breakthroughs",
        source: "The Information",
        url: "https://theinformation.com/openai-scaling-limits",
        publishDate: "2026-05-25",
        sentiment: "neutral",
        excerpt: "Researchers at OpenAI are reportedly confronting bottlenecks in training their next flagship model, codenamed Orion. Diminishing returns from simply adding more text data are forcing a shift toward post-training reasoning algorithms."
      },
      {
        id: "n3",
        headline: "OpenAI Safety Council Reorganized Amid Key Executive Resignations",
        source: "Bloomberg",
        url: "https://bloomberg.com/openai-safety-council",
        publishDate: "2026-05-20",
        sentiment: "negative",
        excerpt: "Several high-profile alignment researchers have announced their departures from OpenAI, voicing concerns that commercial milestones are being prioritized over catastrophic risk mitigations."
      },
      {
        id: "n4",
        headline: "OpenAI Unveils Real-time Voice Capabilities Internationally",
        source: "TechCrunch",
        url: "https://techcrunch.com/openai-voice-rollout",
        publishDate: "2026-05-18",
        sentiment: "positive",
        excerpt: "OpenAI has expanded access to its advanced voice mode across EU and Asian markets, offering low-latency, emotionally expressive conversations in dozens of localized dialects."
      }
    ],
    discussions: [
      {
        id: "d1",
        platform: "Reddit",
        author: "u/CodeWhisperer",
        content: "Honestly, the API has become way more restricted lately. Refusal rates are through the roof for normal coding tasks just because the prompt mentions something system-level. Frustrating.",
        sentiment: "negative",
        engagement: 420,
        url: "https://reddit.com/r/openai/comments/12345"
      },
      {
        id: "d2",
        platform: "X",
        author: "@tech_insights",
        content: "OpenAI moving to a full for-profit structure is the death of their original charter. The investors are in charge now. Altruism is gone, pure monetization takes over.",
        sentiment: "negative",
        engagement: 1250,
        url: "https://x.com/tech_insights/status/98765"
      },
      {
        id: "d3",
        platform: "Reddit",
        author: "u/LLM_Dev",
        content: "GPT-4o voice is actually mind-blowing for language practice. I've been learning conversational Spanish and it corrects my accent in real-time. Unbelievable tech.",
        sentiment: "positive",
        engagement: 512,
        url: "https://reddit.com/r/openai/comments/23456"
      },
      {
        id: "d4",
        platform: "Forums",
        author: "AI_Hacker_99",
        content: "Local models (Llama 3/Qwen) are catching up so fast that paying $20/month for ChatGPT is starting to make less sense for my specific dev workflows.",
        sentiment: "neutral",
        engagement: 88,
        url: "https://news.ycombinator.com/item?id=54321"
      }
    ],
    themes: [
      { name: "Transition to For-Profit", mentions: 345, sentiment: "negative", trend: "up" },
      { name: "Safety vs Speed of Deployment", mentions: 290, sentiment: "negative", trend: "stable" },
      { name: "API Restrictions & Censorship", mentions: 198, sentiment: "negative", trend: "up" },
      { name: "Real-time Voice & Agent Utility", mentions: 412, sentiment: "positive", trend: "up" }
    ],
    predictions: [
      {
        id: "p1",
        question: "Will OpenAI announce a fully for-profit restructuring by Dec 31, 2026?",
        yesProb: 68,
        noProb: 32,
        volume: "₹1,24,000",
        trend: "up",
        history: [
          { date: "May 1", value: 45 },
          { date: "May 8", value: 50 },
          { date: "May 15", value: 52 },
          { date: "May 22", value: 60 },
          { date: "May 30", value: 68 }
        ]
      },
      {
        id: "p2",
        question: "Will OpenAI release an 'AGI-labeled' model before the end of 2026?",
        yesProb: 24,
        noProb: 76,
        volume: "₹88,500",
        trend: "down",
        history: [
          { date: "May 1", value: 35 },
          { date: "May 8", value: 32 },
          { date: "May 15", value: 28 },
          { date: "May 22", value: 25 },
          { date: "May 30", value: 24 }
        ]
      }
    ],
    timeline: [
      {
        date: "May 28, 2026",
        title: "Funding Closes at $150B Valuation",
        description: "OpenAI secures key venture capital investment conditionally tied to corporate restructure.",
        sourcesCount: 14
      },
      {
        date: "May 20, 2026",
        title: "Safety Team Resignation Wave",
        description: "Leading alignment researchers step down, publishing public letters about safety drift.",
        sourcesCount: 9
      },
      {
        date: "May 18, 2026",
        title: "Voice Mode Global Expansion",
        description: "Advanced audio chat mode rolls out to EU and Asian markets after regulatory audits.",
        sourcesCount: 11
      },
      {
        date: "April 10, 2026",
        title: "Orion Development Bottlenecks Reported",
        description: "Internal reports surface details regarding hardware and data quality limits in pre-training.",
        sourcesCount: 6
      }
    ],
    sentimentHistory: [
      { date: "May 5", media: 60, public: -5 },
      { date: "May 12", media: 62, public: -10 },
      { date: "May 19", media: 55, public: -22 },
      { date: "May 26", media: 64, public: -20 },
      { date: "May 30", media: 65, public: -18 }
    ],
    sources: [
      { name: "Reuters", count: 18, sentiment: 45, bias: "Center" },
      { name: "Bloomberg", count: 15, sentiment: 30, bias: "Center" },
      { name: "The Information", count: 12, sentiment: 10, bias: "Center" },
      { name: "TechCrunch", count: 22, sentiment: 70, bias: "Center-Left" },
      { name: "Reddit (r/openai)", count: 245, sentiment: -35, bias: "Center-Left" },
      { name: "X (Twitter Threads)", count: 412, sentiment: -10, bias: "Center" }
    ]
  },
  "ai-regulation": {
    title: "AI Regulation",
    slug: "ai-regulation",
    category: "Policy",
    description: "Global policy frameworks, safety standards, and intellectual property mandates balancing innovation against security risks across the EU, US, and India.",
    lastUpdated: "May 29, 2026",
    summary: {
      points: [
        "The European Union's AI Act has entered full enforcement phases, penalizing several non-compliant foundation model developers.",
        "US bipartisan efforts focus on safety standards for critical infrastructure, though executive orders face legal challenges regarding administrative overreach.",
        "India advocates for a sovereign-led, innovation-supportive policy to democratize AI compute rather than restricting model licensing.",
        "Industry leaders lobby for voluntary commitments, while public discussions heavily support copyright protection for creative artists."
      ],
      confidenceScore: 91,
      sourceCount: 45,
      generatedAt: "2026-05-29T15:30:00Z",
      modelName: "Gemini 3.5 Flash (Synthesized via Wire)"
    },
    metrics: {
      newsCount: 185,
      publicSentimentPos: 28,
      publicSentimentNeu: 34,
      publicSentimentNeg: 38,
      predictionConfidence: 75,
      sourceCount: 28
    },
    divergence: {
      mediaSentiment: 20, // Slightly cautious but structured news
      publicSentiment: -45, // Heavy concerns on censorship vs deepfakes
      score: 65,
      insight: "Mainstream media covers legislative frameworks and safety reports neutrally, highlighting risk reduction. Public reaction on X and Reddit is highly critical, representing two polarized camps: open-source developers fearing regulatory capture, and artists demanding copyright enforcement."
    },
    news: [
      {
        id: "ar-n1",
        headline: "EU AI Act Enters Enforceability Milestone; Violators Face Steep Audits",
        source: "Financial Times",
        url: "https://ft.com/eu-ai-act-enforcement",
        publishDate: "2026-05-26",
        sentiment: "neutral",
        excerpt: "The first strict compliance deadlines under the European Union AI Act passed this week. Model developers must now submit detailed summaries of copyrighted materials used in training data."
      },
      {
        id: "ar-n2",
        headline: "India's Tech Ministry Proposes Compute Subsidies, Defers Licensing Regulations",
        source: "The Hindu",
        url: "https://thehindu.com/india-ai-policy-compute",
        publishDate: "2026-05-24",
        sentiment: "positive",
        excerpt: "Rather than forcing model builders to obtain operational licenses, India's government has announced plans to provide subsidized computing access for local researchers and startups."
      },
      {
        id: "ar-n3",
        headline: "Major Music Labels Win Preliminary Ruling in Copyright Ingestion Lawsuit",
        source: "The Wall Street Journal",
        url: "https://wsj.com/music-labels-ai-copyright",
        publishDate: "2026-05-19",
        sentiment: "negative",
        excerpt: "A federal judge ruled that scraping public music files for training voice-generation models likely exceeds fair-use limits, setting a massive legal precedent."
      }
    ],
    discussions: [
      {
        id: "ar-d1",
        platform: "Reddit",
        author: "u/OpenSourceForever",
        content: "The copyright transparency clause in the EU AI Act is basically designed to kill open-source. Only massive conglomerates can afford the legal audits required to catalog millions of files.",
        sentiment: "negative",
        engagement: 890,
        url: "https://reddit.com/r/LocalLLaMA/comments/77665"
      },
      {
        id: "ar-d2",
        platform: "X",
        author: "@creative_rights",
        content: "AI developers stole our art for years under the guise of 'research'. Finally, courts are realizing that generation is just sophisticated copyright theft. Enforce the laws!",
        sentiment: "positive",
        engagement: 2200,
        url: "https://x.com/creative_rights/status/44332"
      },
      {
        id: "ar-d3",
        platform: "Reddit",
        author: "u/PolicyWonk",
        content: "If the US bans open-weight weights, it will just push the developers to other countries. Regulating compute access makes more sense than regulating maths equations.",
        sentiment: "neutral",
        engagement: 420,
        url: "https://reddit.com/r/artificial/comments/90901"
      }
    ],
    themes: [
      { name: "Open Source Suppression", mentions: 410, sentiment: "negative", trend: "up" },
      { name: "Artist Copyright Protection", mentions: 395, sentiment: "positive", trend: "up" },
      { name: "Sovereign AI Compute Subsidies", mentions: 154, sentiment: "positive", trend: "stable" },
      { name: "Anti-Competitive Regulatory Capture", mentions: 280, sentiment: "negative", trend: "up" }
    ],
    predictions: [
      {
        id: "ar-p1",
        question: "Will the US pass a comprehensive federal AI safety bill before the end of 2026?",
        yesProb: 35,
        noProb: 65,
        volume: "₹94,000",
        trend: "down",
        history: [
          { date: "May 1", value: 48 },
          { date: "May 8", value: 42 },
          { date: "May 15", value: 39 },
          { date: "May 22", value: 37 },
          { date: "May 30", value: 35 }
        ]
      },
      {
        id: "ar-p2",
        question: "Will the EU fine a top-5 US tech firm under the AI Act by Dec 2026?",
        yesProb: 75,
        noProb: 25,
        volume: "₹1,15,000",
        trend: "up",
        history: [
          { date: "May 1", value: 60 },
          { date: "May 8", value: 65 },
          { date: "May 15", value: 68 },
          { date: "May 22", value: 72 },
          { date: "May 30", value: 75 }
        ]
      }
    ],
    timeline: [
      {
        date: "May 26, 2026",
        title: "EU AI Act Enforcement Starts",
        description: "Strict disclosure rules for training materials take full legal effect across member countries.",
        sourcesCount: 15
      },
      {
        date: "May 24, 2026",
        title: "India Rejects Pre-licensing Model",
        description: "Ministry of IT commits to compute infrastructure growth rather than startup registration blocks.",
        sourcesCount: 12
      },
      {
        date: "May 19, 2026",
        title: "Fair-Use Legal Precedent Set",
        description: "Judge denies AI startup's dismiss request in critical copyright infringement lawsuit.",
        sourcesCount: 8
      }
    ],
    sentimentHistory: [
      { date: "May 5", media: 15, public: -40 },
      { date: "May 12", media: 18, public: -42 },
      { date: "May 19", media: 12, public: -49 },
      { date: "May 26", media: 22, public: -46 },
      { date: "May 30", media: 20, public: -45 }
    ],
    sources: [
      { name: "Financial Times", count: 20, sentiment: 10, bias: "Center" },
      { name: "The Hindu", count: 14, sentiment: 35, bias: "Center-Left" },
      { name: "Bloomberg Law", count: 18, sentiment: 5, bias: "Center" },
      { name: "Reddit (r/LocalLLaMA)", count: 290, sentiment: -65, bias: "Center" },
      { name: "X (Policy Discussions)", count: 320, sentiment: -35, bias: "Center-Right" }
    ]
  },
  "nvidia": {
    title: "Nvidia",
    slug: "nvidia",
    category: "Markets",
    description: "The GPU monopoly commanding the generative AI gold rush, balancing semiconductor supply chains, architectural upgrades, and hyper-scaler compute expansion.",
    lastUpdated: "May 28, 2026",
    summary: {
      points: [
        "Nvidia's 'Rubin' GPU platform has entered mass production, commanding solid margins ahead of schedule.",
        "Suppliers report high capacity for High Bandwidth Memory (HBM4), reducing bottlenecks that plagued the Blackwell architecture launch.",
        "News media remains highly bullish, citing earnings reports that beat expectations yet again.",
        "However, public sentiment is shifting, with discussions focused on GPU power requirements, hyper-scaler cap-ex saturation, and open-source software stack alternatives."
      ],
      confidenceScore: 96,
      sourceCount: 52,
      generatedAt: "2026-05-28T18:00:00Z",
      modelName: "Gemini 3.5 Flash (Synthesized via Wire)"
    },
    metrics: {
      newsCount: 210,
      publicSentimentPos: 55,
      publicSentimentNeu: 30,
      publicSentimentNeg: 15,
      predictionConfidence: 82,
      sourceCount: 30
    },
    divergence: {
      mediaSentiment: 80, // Extremely positive financial press
      publicSentiment: 35, // Positive but cautious market discussions
      score: 45,
      insight: "Nvidia shows relatively low divergence. Both Wall Street and retail investors are generally aligned on Nvidia's monopoly power. Minor divergence arises from worries about electricity constraints and long-term hardware demand cycles, which the media largely glosses over."
    },
    news: [
      {
        id: "nv-n1",
        headline: "Nvidia Shares Jump as Rubin Chip Mass Ingestion Outperforms Guidance",
        source: "CNBC",
        url: "https://cnbc.com/nvidia-rubin-earnings",
        publishDate: "2026-05-27",
        sentiment: "positive",
        excerpt: "Nvidia stock crossed record highs following earnings details indicating that early shipments of its next-generation Rubin chips have begun flowing to cloud providers."
      },
      {
        id: "nv-n2",
        headline: "TSMC Secures Advanced Packaging Expansion to Satisfy Rubin Demand",
        source: "Nikkei Asia",
        url: "https://nikkei.com/tsmc-advanced-packaging",
        publishDate: "2026-05-25",
        sentiment: "positive",
        excerpt: "TSMC has accelerated its capital allocation toward CoWoS packaging facilities in Taiwan to clear production backlogs for Rubin and Blackwell architectures."
      },
      {
        id: "nv-n3",
        headline: "Energy Regulators Raise Alarm Over AI Data Center Power Allocations",
        source: "The Washington Post",
        url: "https://washingtonpost.com/data-center-power-regulators",
        publishDate: "2026-05-21",
        sentiment: "neutral",
        excerpt: "Utility commissions warning of grid overloads due to hyperscaler projects could stall computational power expansion, posing a risk to chip sales."
      }
    ],
    discussions: [
      {
        id: "nv-d1",
        platform: "Reddit",
        author: "u/GPU_Architect",
        content: "Nvidia's software ecosystem (CUDA) is still the real moat. AMD's ROCm has improved, but developers don't want to waste weeks debugging compiler issues for custom kernels.",
        sentiment: "positive",
        engagement: 1400,
        url: "https://reddit.com/r/investing/comments/nvda1"
      },
      {
        id: "nv-d2",
        platform: "X",
        author: "@macro_trader",
        content: "Are we ignoring the fact that Microsoft, Meta, and Google are spending 40% of their CapEx on chips they aren't fully monetizing yet? Eventually, there will be a budget cut.",
        sentiment: "negative",
        engagement: 1800,
        url: "https://x.com/macro_trader/status/11223"
      },
      {
        id: "nv-d3",
        platform: "Reddit",
        author: "u/Grid_Engineer",
        content: "The energy problem is real. We can't build nuclear reactors fast enough to feed the data centers Nvidia chips are going into. The grid is reaching its limit in Northern Virginia.",
        sentiment: "negative",
        engagement: 670,
        url: "https://reddit.com/r/technology/comments/44556"
      }
    ],
    themes: [
      { name: "CUDA Software Moat", mentions: 520, sentiment: "positive", trend: "stable" },
      { name: "Data Center Power Limits", mentions: 430, sentiment: "negative", trend: "up" },
      { name: "Hyper-scaler CapEx Saturation", mentions: 310, sentiment: "neutral", trend: "up" },
      { name: "Rubin Yield Success", mentions: 490, sentiment: "positive", trend: "up" }
    ],
    predictions: [
      {
        id: "nv-p1",
        question: "Will Nvidia's market cap remain above Apple and Microsoft on Dec 31, 2026?",
        yesProb: 82,
        noProb: 18,
        volume: "₹2,10,000",
        trend: "up",
        history: [
          { date: "May 1", value: 72 },
          { date: "May 8", value: 75 },
          { date: "May 15", value: 78 },
          { date: "May 22", value: 80 },
          { date: "May 30", value: 82 }
        ]
      },
      {
        id: "nv-p2",
        question: "Will AMD capture over 15% of the datacenter GPU market before 2027?",
        yesProb: 18,
        noProb: 82,
        volume: "₹65,000",
        trend: "down",
        history: [
          { date: "May 1", value: 25 },
          { date: "May 8", value: 22 },
          { date: "May 15", value: 20 },
          { date: "May 22", value: 19 },
          { date: "May 30", value: 18 }
        ]
      }
    ],
    timeline: [
      {
        date: "May 27, 2026",
        title: "Rubin Earning Beat",
        description: "Q1 earnings report crushes consensus driven by accelerated Rubin architecture bookings.",
        sourcesCount: 22
      },
      {
        date: "May 25, 2026",
        title: "TSMC CoWoS Allocation Increases",
        description: "Packaging capacity expansion finalized, guaranteeing higher chip production volumes.",
        sourcesCount: 14
      },
      {
        date: "May 21, 2026",
        title: "Grid Bottleneck Advisory",
        description: "Utility firms issue power shortage notices in high-density data center corridors.",
        sourcesCount: 9
      }
    ],
    sentimentHistory: [
      { date: "May 5", media: 78, public: 30 },
      { date: "May 12", media: 79, public: 32 },
      { date: "May 19", media: 75, public: 28 },
      { date: "May 26", media: 82, public: 36 },
      { date: "May 30", media: 80, public: 35 }
    ],
    sources: [
      { name: "CNBC", count: 25, sentiment: 85, bias: "Center-Right" },
      { name: "Nikkei Asia", count: 18, sentiment: 70, bias: "Center" },
      { name: "The Washington Post", count: 12, sentiment: 40, bias: "Center-Left" },
      { name: "Reddit (r/investing)", count: 320, sentiment: 40, bias: "Center" },
      { name: "X (Financial Threads)", count: 480, sentiment: 30, bias: "Center" }
    ]
  }
};

// Deterministic seedable random number generator
function createRandom(seedString: string) {
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
  }
  return function() {
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
  };
}

// Generate topic data dynamically for any query
export function generateMockTopic(query: string): TopicData {
  const normalizedQuery = query.trim();
  const key = normalizedQuery.toLowerCase();
  
  if (PREBUILT_TOPICS[key]) {
    return PREBUILT_TOPICS[key];
  }

  // Check fuzzy matching for prebuilts
  for (const k in PREBUILT_TOPICS) {
    if (key.includes(k) || k.includes(key)) {
      return PREBUILT_TOPICS[k];
    }
  }

  // Generate deterministic mock data
  const rand = createRandom(normalizedQuery);
  const getRandRange = (min: number, max: number) => min + Math.floor(rand() * (max - min));
  const chooseOne = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];

  const categories = ["Technology", "Markets", "Policy", "Science", "Geopolitics"];
  const category = chooseOne(categories);

  const mediaSentiment = getRandRange(-20, 80);
  const publicSentiment = getRandRange(-60, 30);
  const score = Math.abs(mediaSentiment - publicSentiment);

  const newsCount = getRandRange(20, 150);
  const predictionConfidence = getRandRange(30, 90);
  const sourceCount = getRandRange(5, 20);

  const posSentiment = getRandRange(20, 70);
  const negSentiment = getRandRange(15, 100 - posSentiment);
  const neuSentiment = 100 - posSentiment - negSentiment;

  // Title casing
  const title = normalizedQuery.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const points = [
    `Ingested news reports verify a growing volume of global interest centered around ${title}.`,
    `A divergence in opinion exists, where mainstream media coverage shows a sentiment bias of ${mediaSentiment > 0 ? '+' : ''}${mediaSentiment} while public forums demonstrate ${publicSentiment > 0 ? '+' : ''}${publicSentiment}.`,
    `Regulatory compliance, market viability, and secondary supply constraints are identified as the primary drivers of discussion.`,
    `Prediction market contracts indicate a ${predictionConfidence}% likelihood of structural developments related to ${title} within the next twelve months.`
  ];

  const newsSourcesList = ["Reuters", "Bloomberg", "TechCrunch", "Financial Times", "Associated Press", "CNBC", "Wired"];
  const generatedNews = Array.from({ length: 4 }).map((_, i) => {
    const src = chooseOne(newsSourcesList);
    const sentiments: Array<'positive'|'neutral'|'negative'> = ['positive', 'neutral', 'negative'];
    const sent = sentiments[getRandRange(0, 3)];
    const headlines = [
      `How ${title} is Reshaping Industry Benchmarks and Capital Allocations`,
      `The Core Bottlenecks Facing ${title} Implementations at Scale`,
      `Regulatory Outlook: New Mandates Proposed to Monitor ${title}`,
      `Evaluating the Long-Term Economic Potential of ${title} Infrastructure`
    ];
    return {
      id: `dyn-n-${i}`,
      headline: headlines[i] || `New Studies Released Regarding ${title}`,
      source: src,
      url: `https://${src.toLowerCase().replace(" ", "")}.com/${key}-report-${i}`,
      publishDate: `2026-05-${28 - i}`,
      sentiment: sent,
      excerpt: `Recent assessments indicate that ${title} is experiencing rapid changes. Industry leaders are debating whether current strategies are sufficient to sustain growth amid rising constraints.`
    };
  });

  const generatedDiscussions = Array.from({ length: 4 }).map((_, i) => {
    const platforms: Array<'Reddit' | 'X' | 'Forums'> = ['Reddit', 'X', 'Forums'];
    const plat = platforms[getRandRange(0, 3)];
    const sentiments: Array<'positive'|'neutral'|'negative'> = ['positive', 'neutral', 'negative'];
    const sent = sentiments[getRandRange(0, 3)];
    const snippets = [
      `I'm skeptical about the current timeline for ${title}. We've seen similar promises fail in previous cycles.`,
      `This is honestly a game-changer. Integrated this into my workflow yesterday and it saves hours.`,
      `Does anyone else feel like the media coverage on ${title} is completely ignoring the environmental impact?`,
      `The cost structure is currently the biggest bottleneck. It's too expensive for smaller players to adopt.`
    ];
    return {
      id: `dyn-d-${i}`,
      platform: plat,
      author: `@user_gen_${getRandRange(10, 99)}`,
      content: snippets[i] || `Discussing ${title} and its immediate impacts on public workflows.`,
      sentiment: sent,
      engagement: getRandRange(50, 1500),
      url: `https://${plat.toLowerCase()}.com/status/${getRandRange(10000, 99999)}`
    };
  });

  const generatedThemes: Array<{
    name: string;
    mentions: number;
    sentiment: 'positive' | 'neutral' | 'negative';
    trend: 'up' | 'down' | 'stable';
  }> = [
    { name: `Cost & Resource Limits`, mentions: getRandRange(80, 300), sentiment: chooseOne(['negative', 'neutral']) as 'negative' | 'neutral', trend: 'up' as const },
    { name: `Workflow Improvements`, mentions: getRandRange(100, 400), sentiment: 'positive' as const, trend: 'up' as const },
    { name: `Regulatory Uncertainty`, mentions: getRandRange(50, 200), sentiment: 'negative' as const, trend: 'stable' as const },
  ];

  const generatedPredictions = [
    {
      id: `dyn-p-1`,
      question: `Will ${title} achieve mainstream adoption metrics by Dec 31, 2026?`,
      yesProb: predictionConfidence,
      noProb: 100 - predictionConfidence,
      volume: `₹${getRandRange(20, 150)},000`,
      trend: chooseOne(['up', 'down', 'stable'] as const),
      history: [
        { date: "May 1", value: Math.max(10, predictionConfidence - 15) },
        { date: "May 10", value: Math.max(10, predictionConfidence - 10) },
        { date: "May 20", value: Math.max(10, predictionConfidence - 5) },
        { date: "May 30", value: predictionConfidence }
      ]
    }
  ];

  const generatedTimeline = [
    {
      date: "May 28, 2026",
      title: `Critical Assessment on ${title}`,
      description: `Detailed industry report outlines major potential and friction points for ${title}.`,
      sourcesCount: getRandRange(3, 10)
    },
    {
      date: "May 15, 2026",
      title: `Open-Source Code Repositories Gain Traction`,
      description: `A collection of utility libraries simplifying integrations are pushed to public repositories.`,
      sourcesCount: getRandRange(2, 6)
    }
  ];

  const sentimentHistory = [
    { date: "May 5", media: mediaSentiment - 10, public: publicSentiment - 5 },
    { date: "May 12", media: mediaSentiment - 5, public: publicSentiment - 2 },
    { date: "May 19", media: mediaSentiment - 2, public: publicSentiment - 8 },
    { date: "May 26", media: mediaSentiment, public: publicSentiment }
  ];

  const sources = [
    { name: "Reuters", count: getRandRange(2, 10), sentiment: mediaSentiment + 5, bias: "Center" as const },
    { name: "Bloomberg", count: getRandRange(2, 8), sentiment: mediaSentiment - 5, bias: "Center" as const },
    { name: "Reddit", count: getRandRange(20, 100), sentiment: publicSentiment - 10, bias: "Center-Left" as const },
    { name: "X", count: getRandRange(50, 200), sentiment: publicSentiment + 5, bias: "Center" as const }
  ];

  return {
    title,
    slug: key.replace(/[^a-z0-9]+/g, '-'),
    category,
    description: `A dynamically gathered research profile for ${title}, analyzing global news trends, community responses, and future probability indicators.`,
    lastUpdated: "May 30, 2026",
    summary: {
      points,
      confidenceScore: getRandRange(80, 97),
      sourceCount: generatedNews.length + generatedDiscussions.length + sources.length,
      generatedAt: new Date().toISOString(),
      modelName: "Gemini 3.5 Flash (Synthesized via Wire)"
    },
    metrics: {
      newsCount,
      publicSentimentPos: posSentiment,
      publicSentimentNeu: neuSentiment,
      publicSentimentNeg: negSentiment,
      predictionConfidence,
      sourceCount
    },
    divergence: {
      mediaSentiment,
      publicSentiment,
      score,
      insight: `There is a clear difference between professional reporting and conversational opinion. The news media presents ${title} with a ${mediaSentiment > 40 ? 'highly bullish' : 'moderate'} lens focusing on systemic advancements. Public feedback on forums indicates ${publicSentiment < 0 ? 'notable concerns regarding execution and cost' : 'neutral-to-positive user interest'}.`
    },
    news: generatedNews,
    discussions: generatedDiscussions,
    themes: generatedThemes,
    predictions: generatedPredictions,
    timeline: generatedTimeline,
    sentimentHistory,
    sources
  };
}
