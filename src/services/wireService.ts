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

export class WireService {
  /**
   * Fetches unified data for a topic through the simulated Wire query layer.
   * In a production environment, this would call Anakin Wire's specific action IDs
   * for news, Reddit/X scraping, and Polymarket polling, then combine the response.
   */
  static async fetchTopicData(query: string): Promise<TopicData> {
    // Simulate network latency (between 1.5s and 3s) to show the beautiful loading state
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Return generated or pre-built topic data
    return generateMockTopic(query);
  }
}
