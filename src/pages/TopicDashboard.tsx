import { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { 
  Newspaper, MessageSquare, TrendingUp, Calendar, BarChart2, Share2, 
  RefreshCw, Award, ArrowUpRight, ArrowDownRight, Sparkles, AlertCircle,
  Database, Code, X
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip 
} from 'recharts';
import { ApiKeyContext, ThemeContext } from '../App';
import { WireService } from '../services/wireService';
import { AIService } from '../services/aiService';
import type { AISummaryResult } from '../services/aiService';
import type { TopicData } from '../services/mockData';

export default function TopicDashboard() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  
  const queryParam = searchParams.get('q');
  // If slug is 'openai' but there's no q param, set q to OpenAI
  const query = queryParam || slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Research Topic';

  const { llmConfig } = useContext(ApiKeyContext);
  const { theme } = useContext(ThemeContext);

  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [topicData, setTopicData] = useState<TopicData | null>(null);
  const [aiSummary, setAiSummary] = useState<AISummaryResult | null>(null);
  const [activeTab, setActiveTab] = useState<'news' | 'public' | 'predictions' | 'timeline' | 'diversity'>('news');
  const [copied, setCopied] = useState(false);
  const [showWireModal, setShowWireModal] = useState(false);

  // Load basic topic data
  useEffect(() => {
    let active = true;
    async function loadData() {
      setLoading(true);
      try {
        const data = await WireService.fetchTopicData(query, llmConfig);
        if (active) {
          setTopicData(data);
          // Set default mock AI summary
          setAiSummary(data.summary);
          setLoading(false);
          
          // If Live AI is active, trigger a live synthesis
          if (llmConfig.provider !== 'mock') {
            triggerLiveAiSummary(data, llmConfig);
          }
        }
      } catch (err) {
        console.error(err);
        if (active) setLoading(false);
      }
    }
    loadData();
    return () => { active = false; };
  }, [query, llmConfig]);

  const triggerLiveAiSummary = async (data: TopicData, config = llmConfig) => {
    setAiLoading(true);
    try {
      const liveSummary = await AIService.generateSummary(data, config);
      setAiSummary(liveSummary);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleRefresh = () => {
    if (topicData) {
      triggerLiveAiSummary(topicData, llmConfig);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/#/report/${slug}?q=${encodeURIComponent(query)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || !topicData) {
    const isLive = llmConfig.wireApiKey && llmConfig.wireApiKey.trim().length > 0;
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin text-accent-blue" />
        <p className="text-sm text-cream-500 dark:text-dark-text-secondary">
          {isLive ? 'Retrieving Live Intelligence from Anakin Wire...' : 'Resolving Wire schema feeds...'}
        </p>
      </div>
    );
  }

  // Calculate stats for the divergence score
  const isDivergenceHigh = topicData.divergence.score > 50;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner Warning for Sandbox Mode */}
      {llmConfig.provider === 'mock' && (
        <div className="p-3.5 rounded-xl border border-accent-gold/20 bg-accent-gold/5 flex items-start space-x-3 text-xs text-accent-gold dark:text-[#E8E7E3] no-print">
          <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="font-semibold">Running in Sandbox Mock Mode</p>
            <p className="text-cream-500 dark:text-dark-text-secondary">
              Synthesized data is active to guarantee demo stability. To see live generative summaries of this data, click the <strong className="text-accent-blue underline cursor-pointer" onClick={() => window.dispatchEvent(new CustomEvent('open-settings'))}>Configure LLM</strong> button in the navbar and configure an LLM provider.
            </p>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-cream-200 dark:border-dark-border pb-6">
        <div>
          <span className="text-2xs font-semibold uppercase tracking-wider text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded-md">
            {topicData.category}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-900 dark:text-[#E8E7E3] mt-2">
            {topicData.title}
          </h2>
          <p className="text-xs text-cream-500 dark:text-dark-text-secondary mt-1">
            Database state reconciled as of <span className="font-medium text-cream-900 dark:text-[#E8E7E3]">{topicData.lastUpdated}</span> via Wire.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-cream-300 dark:border-dark-border bg-white dark:bg-[#15171C] text-cream-900 dark:text-[#E8E7E3] hover:bg-cream-200 dark:hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied Report Link!' : 'Share Dashboard'}</span>
          </button>
          
          <Link
            to={`/report/${slug}?q=${encodeURIComponent(query)}`}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-accent-blue hover:bg-accent-blue-hover text-white transition-colors shadow-md"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Report Page</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: AI Summary + Divergence Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Summary Card (Left/Center 2/3) */}
        <div className="lg:col-span-2 p-6 rounded-3xl border border-cream-200 bg-white dark:border-dark-border dark:bg-[#121417] shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-cream-200 dark:border-dark-border pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-accent-blue animate-pulse" />
                <h3 className="font-serif text-lg font-bold text-cream-900 dark:text-[#E8E7E3]">AI Unified Summary</h3>
              </div>
              <div className="flex items-center space-x-2 text-3xs font-semibold uppercase tracking-wider text-cream-400 dark:text-neutral-500">
                <span>{aiSummary?.modelName}</span>
                {llmConfig.provider !== 'mock' && (
                  <button 
                    onClick={handleRefresh}
                    disabled={aiLoading}
                    className="p-1 rounded hover:bg-cream-200 dark:hover:bg-neutral-800 text-accent-blue disabled:opacity-40"
                    title="Re-run AI synthesis"
                  >
                    <RefreshCw className={`w-3 h-3 ${aiLoading ? 'animate-spin' : ''}`} />
                  </button>
                )}
              </div>
            </div>

            {aiLoading ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin text-accent-blue" />
                <p className="text-xs text-cream-500 dark:text-[#A0A5B5]">
                  {llmConfig.provider === 'local' 
                    ? `${llmConfig.localModel ? `Local LLM (${llmConfig.localModel.toUpperCase()})` : 'Local LLM'} synthesizing web perspectives...` 
                    : llmConfig.provider === 'gemini' 
                      ? 'Gemini synthesizing web perspectives...' 
                      : 'Mock Engine synthesizing web perspectives...'}
                </p>
              </div>
            ) : (
              <ul className="space-y-3.5 py-2">
                {aiSummary?.points.map((point, index) => (
                  <li key={index} className="flex items-start text-sm leading-relaxed text-cream-900 dark:text-[#E8E7E3]">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 mr-3 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-cream-200 dark:border-dark-border pt-4 mt-6 flex items-center justify-between text-2xs text-cream-500 dark:text-dark-text-secondary">
            <div>
              Generated with confidence rating: <span className="font-semibold text-accent-green">{aiSummary?.confidenceScore}%</span>
            </div>
            <div>
              Sources processed: <span className="font-semibold text-cream-900 dark:text-[#E8E7E3]">{aiSummary?.sourceCount} API feeds</span>
            </div>
          </div>
        </div>

        {/* Perspective Divergence Score Card (Right 1/3) */}
        <div className="p-6 rounded-3xl border border-cream-200 bg-white dark:border-dark-border dark:bg-[#121417] shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-cream-200 dark:border-dark-border pb-3">
              <h3 className="font-serif text-lg font-bold text-cream-900 dark:text-[#E8E7E3]">Perspective Divergence</h3>
              <span className={`px-2 py-0.5 rounded-md text-3xs font-bold uppercase tracking-wider ${
                isDivergenceHigh 
                  ? 'bg-accent-red/10 text-accent-red border border-accent-red/20' 
                  : 'bg-accent-green/10 text-accent-green border border-accent-green/20'
              }`}>
                {isDivergenceHigh ? 'High Conflict' : 'Consensus'}
              </span>
            </div>

            {/* Big Divergence Number */}
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-black text-cream-900 dark:text-[#E8E7E3]">
                {topicData.divergence.score}
              </span>
              <span className="text-xs text-cream-400 dark:text-neutral-500">/ 200 pts</span>
            </div>

            {/* Sentiment Meter bars */}
            <div className="space-y-3.5 pt-2">
              {/* Media Sentiment */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-cream-500 dark:text-dark-text-secondary">Media Sentiment</span>
                  <span className="font-bold text-accent-blue">{topicData.divergence.mediaSentiment > 0 ? '+' : ''}{topicData.divergence.mediaSentiment}</span>
                </div>
                <div className="h-2 w-full bg-cream-200 dark:bg-dark-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent-blue rounded-full transition-all duration-1000"
                    style={{ width: `${(topicData.divergence.mediaSentiment + 100) / 2}%` }}
                  />
                </div>
              </div>

              {/* Public Sentiment */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-cream-500 dark:text-dark-text-secondary">Public Sentiment</span>
                  <span className={`font-bold ${topicData.divergence.publicSentiment > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                    {topicData.divergence.publicSentiment > 0 ? '+' : ''}{topicData.divergence.publicSentiment}
                  </span>
                </div>
                <div className="h-2 w-full bg-cream-200 dark:bg-dark-border rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      topicData.divergence.publicSentiment > 0 ? 'bg-accent-green' : 'bg-accent-red'
                    }`}
                    style={{ width: `${(topicData.divergence.publicSentiment + 100) / 2}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-cream-500 dark:text-dark-text-secondary leading-relaxed bg-cream-100/50 dark:bg-neutral-900/40 p-3 rounded-xl border border-cream-200 dark:border-dark-border">
            {topicData.divergence.insight}
          </p>
        </div>
      </div>

      {/* KPI Story Snapshot Metrics (4 cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-2xl border border-cream-200 bg-white dark:border-dark-border dark:bg-[#121417] shadow-sm space-y-1">
          <span className="text-3xs font-semibold uppercase tracking-wider text-cream-400 dark:text-neutral-500">News Coverage</span>
          <p className="text-2xl font-bold text-cream-900 dark:text-[#E8E7E3]">{topicData.metrics.newsCount} Articles</p>
          <span className="text-3xs text-accent-blue flex items-center font-medium">
            Pulled via Wire layer
          </span>
        </div>
        {/* KPI 2 */}
        <div className="p-4 rounded-2xl border border-cream-200 bg-white dark:border-dark-border dark:bg-[#121417] shadow-sm space-y-1">
          <span className="text-3xs font-semibold uppercase tracking-wider text-cream-400 dark:text-neutral-500">Public Sentiment</span>
          <p className="text-2xl font-bold text-cream-900 dark:text-[#E8E7E3]">{topicData.metrics.publicSentimentPos}% Positive</p>
          <span className="text-3xs text-cream-500 dark:text-dark-text-secondary">
            {topicData.metrics.publicSentimentNeg}% Neg / {topicData.metrics.publicSentimentNeu}% Neu
          </span>
        </div>
        {/* KPI 3 */}
        <div className="p-4 rounded-2xl border border-cream-200 bg-white dark:border-dark-border dark:bg-[#121417] shadow-sm space-y-1">
          <span className="text-3xs font-semibold uppercase tracking-wider text-cream-400 dark:text-neutral-500">Prediction Probability</span>
          <p className="text-2xl font-bold text-cream-900 dark:text-[#E8E7E3]">{topicData.metrics.predictionConfidence}% YES</p>
          <span className="text-3xs text-accent-green flex items-center font-medium">
            Polymarket position
          </span>
        </div>
        {/* KPI 4 */}
        <div className="p-4 rounded-2xl border border-cream-200 bg-white dark:border-dark-border dark:bg-[#121417] shadow-sm space-y-1">
          <span className="text-3xs font-semibold uppercase tracking-wider text-cream-400 dark:text-neutral-500">Source Diversity</span>
          <p className="text-2xl font-bold text-cream-900 dark:text-[#E8E7E3]">{topicData.metrics.sourceCount} Domains</p>
          <span className="text-3xs text-cream-500 dark:text-dark-text-secondary">
            Independent global coverage
          </span>
        </div>
      </div>

      {/* Raw Data Sources Used Card */}
      <div className="p-5 rounded-2xl border border-cream-200 bg-white dark:border-dark-border dark:bg-[#121417] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-cream-200 dark:border-dark-border pb-3">
          <div className="flex items-center space-x-2">
            <Database className="w-4.5 h-4.5 text-accent-blue" />
            <h3 className="font-serif text-sm font-bold text-cream-900 dark:text-[#E8E7E3]">Data Sources Ingested via Wire</h3>
          </div>
          <button
            onClick={() => setShowWireModal(true)}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-2xs font-semibold border border-accent-blue/20 text-accent-blue hover:bg-accent-blue/5 dark:border-accent-blue/30 dark:hover:bg-accent-blue/10 transition-colors cursor-pointer"
          >
            <Code className="w-3.5 h-3.5 mr-1" />
            <span>Inspect Wire API Ingest Payload</span>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2.5">
          {topicData.sources.map((src) => (
            <div 
              key={src.name} 
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-cream-200 bg-cream-100/50 dark:border-dark-border dark:bg-neutral-900/30 text-xs"
            >
              <span className="font-semibold text-cream-900 dark:text-[#E8E7E3]">{src.name}</span>
              <span className="text-neutral-300 dark:text-neutral-700">|</span>
              <span className="text-2xs text-cream-500 dark:text-dark-text-secondary">{src.count} records</span>
              <span className={`w-1.5 h-1.5 rounded-full ${src.sentiment > 20 ? 'bg-accent-green' : src.sentiment < -10 ? 'bg-accent-red' : 'bg-neutral-400'}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Explorer Section with Tabs */}
      <div className="border border-cream-200 bg-white dark:border-dark-border dark:bg-[#121417] rounded-3xl shadow-sm overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-cream-200 dark:border-dark-border overflow-x-auto bg-cream-50/50 dark:bg-neutral-950/20">
          {[
            { id: 'news', label: 'Media Coverage', icon: Newspaper },
            { id: 'public', label: 'Public Opinion', icon: MessageSquare },
            { id: 'predictions', label: 'Prediction Signals', icon: TrendingUp },
            { id: 'timeline', label: 'Developments', icon: Calendar },
            { id: 'diversity', label: 'Source Bias', icon: BarChart2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-5 py-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap focus:outline-none transition-colors ${
                  isActive
                    ? 'border-accent-blue text-accent-blue bg-white dark:bg-[#121417]'
                    : 'border-transparent text-cream-500 hover:text-cream-900 dark:text-dark-text-secondary dark:hover:text-[#E8E7E3]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="p-6">
          
          {/* Tab 1: News Coverage */}
          {activeTab === 'news' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topicData.news.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 rounded-2xl border border-cream-200 dark:border-dark-border bg-cream-50/30 dark:bg-neutral-900/10 flex flex-col justify-between space-y-4 hover:border-accent-blue/30 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-2xs">
                      <span className="font-bold text-accent-blue">{item.source}</span>
                      <span className="text-cream-400 dark:text-neutral-500">{item.publishDate}</span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-cream-900 dark:text-[#E8E7E3] hover:underline cursor-pointer">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">{item.headline}</a>
                    </h4>
                    <p className="text-xs text-cream-500 dark:text-dark-text-secondary leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-cream-100 dark:border-dark-border pt-3 text-3xs font-semibold uppercase tracking-wider">
                    <span className={`px-2 py-0.5 rounded ${
                      item.sentiment === 'positive' 
                        ? 'bg-accent-green/10 text-accent-green' 
                        : item.sentiment === 'negative' 
                        ? 'bg-accent-red/10 text-accent-red' 
                        : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800'
                    }`}>
                      {item.sentiment} sentiment
                    </span>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-accent-blue hover:underline flex items-center space-x-0.5"
                    >
                      <span>Original Link</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Public Opinion */}
          {activeTab === 'public' && (
            <div className="space-y-6">
              {/* Discussion Themes */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cream-400 dark:text-neutral-500">Key Community Themes</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {topicData.themes.map((theme) => (
                    <div key={theme.name} className="p-3.5 rounded-xl border border-cream-200 dark:border-dark-border bg-cream-50/20 space-y-1">
                      <p className="text-xs font-bold text-cream-900 dark:text-[#E8E7E3] truncate">{theme.name}</p>
                      <div className="flex items-center justify-between text-2xs">
                        <span className="text-cream-400 dark:text-neutral-500">{theme.mentions} posts</span>
                        <span className={`font-semibold capitalize ${theme.sentiment === 'positive' ? 'text-accent-green' : 'text-accent-red'}`}>
                          {theme.sentiment}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discussion snippet items */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cream-400 dark:text-neutral-500">Recent Public Snippets</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topicData.discussions.map((post) => (
                    <div 
                      key={post.id} 
                      className="p-4 rounded-2xl border border-cream-200 dark:border-dark-border bg-cream-50/30 dark:bg-neutral-900/10 flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-center justify-between text-2xs">
                        <span className="font-semibold text-cream-900 dark:text-[#E8E7E3]">{post.author}</span>
                        <span className="px-2 py-0.5 rounded bg-cream-200 dark:bg-dark-border text-cream-500 dark:text-dark-text-secondary">{post.platform}</span>
                      </div>
                      <p className="text-xs italic text-cream-500 dark:text-dark-text-secondary leading-relaxed">
                        "{post.content}"
                      </p>
                      <div className="flex items-center justify-between border-t border-cream-100 dark:border-dark-border pt-2 text-3xs font-semibold">
                        <span className={`px-2 py-0.5 rounded uppercase tracking-wider ${
                          post.sentiment === 'positive' 
                            ? 'bg-accent-green/10 text-accent-green' 
                            : post.sentiment === 'negative' 
                            ? 'bg-accent-red/10 text-accent-red' 
                            : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800'
                        }`}>
                          {post.sentiment}
                        </span>
                        <span className="text-cream-400 dark:text-neutral-500">{post.engagement} engagements</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Prediction Markets */}
          {activeTab === 'predictions' && (
            <div className="space-y-6">
              {topicData.predictions.length === 0 ? (
                <div className="text-center py-8 text-xs text-cream-400 dark:text-neutral-500">
                  No prediction market data available for this topic.
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Market Details List */}
                  <div className="lg:col-span-1 space-y-4">
                    {topicData.predictions.map((market) => (
                      <div key={market.id} className="p-4 rounded-2xl border border-cream-200 dark:border-dark-border bg-cream-50/20 space-y-4">
                        <h4 className="text-xs font-bold text-cream-900 dark:text-[#E8E7E3] leading-relaxed">
                          {market.question}
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="p-2 rounded-xl bg-accent-blue/10 border border-accent-blue/20">
                            <span className="block text-3xs font-bold uppercase tracking-wider text-accent-blue">YES Chance</span>
                            <span className="text-xl font-bold text-accent-blue">{market.yesProb}%</span>
                          </div>
                          <div className="p-2 rounded-xl bg-cream-200 dark:bg-dark-border">
                            <span className="block text-3xs font-bold uppercase tracking-wider text-cream-400 dark:text-neutral-500">NO Chance</span>
                            <span className="text-xl font-bold text-cream-900 dark:text-[#E8E7E3]">{market.noProb}%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-2xs text-cream-400 dark:text-neutral-500">
                          <span>Volume: {market.volume}</span>
                          <span className="flex items-center">
                            {market.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 text-accent-green mr-0.5" />}
                            {market.trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 text-accent-red mr-0.5" />}
                            <span className="font-semibold uppercase tracking-wider">{market.trend} trend</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Market Charts Container */}
                  <div className="lg:col-span-2 p-4 rounded-2xl border border-cream-200 dark:border-dark-border bg-cream-50/10 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cream-400 dark:text-neutral-500 mb-4">Historical Probability Chart (Polymarket contracts)</h4>
                      <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={topicData.predictions[0]?.history || []}>
                            <XAxis dataKey="date" stroke={theme === 'dark' ? '#5A6072' : '#C2B49B'} fontSize={10} />
                            <YAxis domain={[0, 100]} stroke={theme === 'dark' ? '#5A6072' : '#C2B49B'} fontSize={10} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: theme === 'dark' ? '#141619' : '#FFFFFF',
                                borderColor: theme === 'dark' ? '#22252A' : '#E5DFD3',
                                color: theme === 'dark' ? '#E8E7E3' : '#1F1E1A'
                              }} 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#2B5C8F" 
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <p className="text-2xs text-cream-400 dark:text-neutral-500 mt-2 italic text-center">
                      Probability contracts aggregate capital allocations to predict outcomes in real-time.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Timeline */}
          {activeTab === 'timeline' && (
            <div className="relative border-l border-cream-200 dark:border-dark-border pl-6 ml-2 space-y-6">
              {topicData.timeline.map((event, idx) => (
                <div key={idx} className="relative space-y-1">
                  {/* Bullet Node */}
                  <div className="absolute -left-9 top-1 w-6 h-6 rounded-full bg-cream-200 dark:bg-neutral-800 border-2 border-accent-blue flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-accent-blue" />
                  </div>
                  
                  {/* Event Details */}
                  <span className="text-2xs font-semibold text-accent-blue">{event.date}</span>
                  <h4 className="font-serif text-sm font-bold text-cream-900 dark:text-[#E8E7E3]">{event.title}</h4>
                  <p className="text-xs text-cream-500 dark:text-dark-text-secondary leading-relaxed">
                    {event.description}
                  </p>
                  <span className="inline-block text-3xs text-cream-400 dark:text-neutral-500 mt-1">
                    Ingested from {event.sourcesCount} reports
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 5: Source Diversity Bias */}
          {activeTab === 'diversity' && (
            <div className="overflow-x-auto rounded-xl border border-cream-200 dark:border-dark-border">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-cream-100/50 dark:bg-neutral-900/40 text-cream-500 dark:text-dark-text-secondary font-semibold border-b border-cream-200 dark:border-dark-border">
                    <th className="p-3">Source Name</th>
                    <th className="p-3">Coverage Ingests</th>
                    <th className="p-3">Media Bias Rating</th>
                    <th className="p-3">Avg Sentiment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200 dark:divide-dark-border">
                  {topicData.sources.map((src) => (
                    <tr key={src.name} className="hover:bg-cream-50/20 dark:hover:bg-neutral-900/10">
                      <td className="p-3 font-semibold text-cream-900 dark:text-[#E8E7E3]">{src.name}</td>
                      <td className="p-3 text-cream-500 dark:text-dark-text-secondary">{src.count} entries</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-3xs font-semibold ${
                          src.bias === 'Center' 
                            ? 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800' 
                            : 'bg-accent-blue/10 text-accent-blue'
                        }`}>
                          {src.bias}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold ${src.sentiment > 20 ? 'text-accent-green' : src.sentiment < -10 ? 'text-accent-red' : 'text-neutral-500'}`}>
                            {src.sentiment > 0 ? '+' : ''}{src.sentiment}
                          </span>
                          <div className="w-16 h-1.5 bg-cream-200 dark:bg-dark-border rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${src.sentiment > 20 ? 'bg-accent-green' : src.sentiment < -10 ? 'bg-accent-red' : 'bg-neutral-400'}`}
                              style={{ width: `${(src.sentiment + 100) / 2}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>

      {/* Developer Trigger Event Listener */}
      <DeveloperSettingsHandler />

      {/* Wire API Payload Inspector Modal */}
      {showWireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn no-print">
          <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#0E1115] border border-dark-border rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-300">
            {/* Title Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#14181E] border-b border-dark-border">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-accent-red/60" />
                  <span className="w-3 h-3 rounded-full bg-accent-gold/60" />
                  <span className="w-3 h-3 rounded-full bg-accent-green/60" />
                </div>
                <span className="text-neutral-500 font-mono text-xs">|</span>
                <Database className="w-4 h-4 text-accent-blue" />
                <h3 className="text-xs font-mono font-semibold text-[#E8E7E3]">Anakin Wire API Request & Response Logger</h3>
              </div>
              <button
                onClick={() => setShowWireModal(false)}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-[#E8E7E3] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inspector Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 font-mono text-xs">
              {/* Endpoint Called */}
              <div className="space-y-1.5">
                <span className="text-3xs uppercase tracking-wider font-semibold text-neutral-500">HTTP REQUEST</span>
                <div className="p-3 bg-neutral-900 border border-dark-border rounded-lg flex items-center justify-between">
                  <span className="text-[#A29074] font-bold">GET</span>
                  <span className="text-[#2B5C8F] select-all overflow-x-auto whitespace-nowrap scrollbar-none flex-1 mx-3 text-left">
                    https://api.anakin.co/v1/wire/fetch?query={encodeURIComponent(query)}&depth=full
                  </span>
                  <span className="px-2 py-0.5 rounded bg-accent-green/10 text-accent-green text-3xs font-semibold uppercase">Active</span>
                </div>
              </div>

              {/* Wire Payload Body */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-3xs uppercase tracking-wider font-semibold text-neutral-500">WIRE SCRAPED JSON RESPONSE</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(generateWirePayload(topicData, query), null, 2));
                    }}
                    className="text-3xs text-accent-blue hover:underline cursor-pointer"
                  >
                    Copy JSON
                  </button>
                </div>
                <pre className="p-4 bg-neutral-900 border border-dark-border rounded-lg overflow-x-auto text-left text-neutral-300 max-h-[45vh] scrollbar-thin text-3xs sm:text-2xs leading-relaxed">
                  <code>
                    {JSON.stringify(generateWirePayload(topicData, query), null, 2)}
                  </code>
                </pre>
              </div>
            </div>

            {/* Footer Status */}
            <div className="px-6 py-3 bg-[#14181E] border-t border-dark-border flex items-center justify-between text-3xs text-neutral-500">
              <span>Authentication: Bearer Anakin_Wire_v1_Prod_xxxx</span>
              <span>Bytes Ingested: {JSON.stringify(generateWirePayload(topicData, query)).length} B</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function generateWirePayload(topicData: any, query: string) {
  if (!topicData) return null;
  return {
    status: "success",
    timestamp: new Date().toISOString(),
    query: query,
    ingest_session: `wis_${Math.random().toString(36).substring(2, 11)}`,
    provider: "anakin.co/wire-scrapers-v1",
    data: {
      topic: topicData.title,
      sentiment_divergence_score: topicData.divergence.score,
      sources_federated: topicData.sources.map((s: any) => ({
        name: s.name,
        records_fetched: s.count,
        sentiment_index: s.sentiment
      })),
      raw_news_records: topicData.news.slice(0, 2).map((n: any) => ({
        headline: n.headline,
        publisher: n.source,
        relative_time: n.time,
        sentiment_label: n.sentiment
      })),
      raw_forum_comments: topicData.discussions.slice(0, 2).map((d: any) => ({
        author: d.author,
        platform: d.platform,
        body: d.content.substring(0, 60) + "...",
        sentiment_label: d.sentiment
      }))
    }
  };
}

// Simple event bridge to open settings from external elements
function DeveloperSettingsHandler() {
  useEffect(() => {
    const handleOpen = () => {
      // Find the settings trigger button and click it to open the drawer
      const indicators = document.querySelectorAll('button');
      for (const btn of Array.from(indicators)) {
        if (btn.textContent?.includes('Configure LLM') || btn.textContent?.includes('Live AI')) {
          btn.click();
          break;
        }
      }
    };
    window.addEventListener('open-settings', handleOpen);
    return () => window.removeEventListener('open-settings', handleOpen);
  }, []);
  return null;
}
