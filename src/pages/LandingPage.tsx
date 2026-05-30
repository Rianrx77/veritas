import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Flame, Globe, MessageSquare, LineChart, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const triggerSearch = (topic: string) => {
    navigate(`/search?q=${encodeURIComponent(topic)}`);
  };

  const trendingTopics = [
    { name: "OpenAI", category: "Technology" },
    { name: "AI Regulation", category: "Policy" },
    { name: "Nvidia", category: "Markets" },
    { name: "India's Semiconductor Mission", category: "Geopolitics" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 flex flex-col items-center justify-center space-y-16">
      
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream-900 dark:text-[#E8E7E3] leading-tight">
          Understand any topic <br />
          <span className="italic text-accent-blue font-normal">from every angle.</span>
        </h1>
        <p className="text-sm sm:text-base text-cream-500 dark:text-dark-text-secondary max-w-xl mx-auto leading-relaxed">
          See what the world says, what the media reports, and what the future predicts. Veritas collapses the entire research workflow into a single search.
        </p>
      </div>

      {/* Search Container */}
      <div className="w-full max-w-xl">
        <form onSubmit={handleSearchSubmit} className="relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a company, technology, event, person, or policy..."
            className="w-full px-5 py-4 pl-12 pr-28 text-sm sm:text-base rounded-2xl border border-cream-300 dark:border-dark-border bg-white dark:bg-[#15171C] text-cream-900 dark:text-[#E8E7E3] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue transition-all duration-300 placeholder-cream-400"
          />
          <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-cream-400 dark:text-neutral-500 group-focus-within:text-accent-blue transition-colors" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-accent-blue hover:bg-accent-blue-hover text-white transition-all shadow active:scale-95 flex items-center space-x-1"
          >
            <span>Analyze</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Trending list */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-2xs font-semibold uppercase tracking-wider text-cream-400 dark:text-neutral-500 mr-2 flex items-center">
            <Flame className="w-3 h-3 text-accent-red mr-1 animate-pulse" />
            Trending:
          </span>
          {trendingTopics.map((topic) => (
            <button
              key={topic.name}
              onClick={() => triggerSearch(topic.name)}
              className="text-xs px-3 py-1 rounded-full border border-cream-200 bg-cream-50 hover:bg-cream-200 text-cream-900 dark:border-dark-border dark:bg-neutral-900/40 dark:hover:bg-neutral-800 dark:text-[#E8E7E3] transition-all"
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {/* Wire Data Sources Explanation Section */}
      <div className="w-full border border-cream-200 bg-white/40 dark:border-dark-border dark:bg-[#121417]/30 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between border-b border-cream-200 dark:border-dark-border pb-6 gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg font-bold text-cream-900 dark:text-[#E8E7E3]">Data Sources Federated via Wire</h3>
            <p className="text-xs text-cream-500 dark:text-dark-text-secondary">
              Wire abstracts web ingestion, transforming the internet into our database.
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-accent-blue/10 text-accent-blue border border-accent-blue/20 text-xs font-semibold tracking-wider uppercase">
            Aggregated Layer
          </div>
        </div>

        {/* Grid of sources */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Media Source */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#15171C] border border-cream-200 dark:border-dark-border space-y-2">
            <div className="flex items-center space-x-2 text-accent-blue">
              <Globe className="w-4 h-4" />
              <h4 className="text-sm font-bold text-cream-900 dark:text-[#E8E7E3]">Media Sentiment</h4>
            </div>
            <p className="text-xs text-cream-500 dark:text-dark-text-secondary leading-relaxed">
              Ingests global journals (Reuters, Bloomberg, CNBC) to index what events have officially taken place.
            </p>
          </div>

          {/* Social Source */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#15171C] border border-cream-200 dark:border-dark-border space-y-2">
            <div className="flex items-center space-x-2 text-accent-gold">
              <MessageSquare className="w-4 h-4" />
              <h4 className="text-sm font-bold text-cream-900 dark:text-[#E8E7E3]">Public Discussions</h4>
            </div>
            <p className="text-xs text-cream-500 dark:text-dark-text-secondary leading-relaxed">
              Ingests forums (Reddit, X, developer sites) to capture what community members think happened.
            </p>
          </div>

          {/* Prediction Source */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#15171C] border border-cream-200 dark:border-dark-border space-y-2">
            <div className="flex items-center space-x-2 text-accent-green">
              <LineChart className="w-4 h-4" />
              <h4 className="text-sm font-bold text-cream-900 dark:text-[#E8E7E3]">Prediction Markets</h4>
            </div>
            <p className="text-xs text-cream-500 dark:text-dark-text-secondary leading-relaxed">
              Ingests market positions (Polymarket, Betfair) to gauge what actors believe will happen next.
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="pt-2 text-center">
          <p className="text-2xs italic text-cream-400 dark:text-neutral-500">
            "Veritas turns the internet's fragmented conversation into a single, evidence-backed narrative by combining what happened, what people think happened, and what the future predicts."
          </p>
        </div>
      </div>
    </div>
  );
}
