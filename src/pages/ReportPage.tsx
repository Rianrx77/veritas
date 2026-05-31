import { useEffect, useState, useContext } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Printer, ArrowLeft, RefreshCw, FileText, Calendar, Database } from 'lucide-react';
import { WireService } from '../services/wireService';
import { ApiKeyContext } from '../App';
import type { TopicData } from '../services/mockData';

export default function ReportPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { llmConfig } = useContext(ApiKeyContext);

  const queryParam = searchParams.get('q');
  const query = queryParam || slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Research Report';

  const [loading, setLoading] = useState(true);
  const [topicData, setTopicData] = useState<TopicData | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await WireService.fetchTopicData(query, llmConfig);
        setTopicData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [query, llmConfig]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || !topicData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin text-accent-blue" />
        <p className="text-sm text-cream-500 dark:text-dark-text-secondary">Generating print report schema...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8 print:p-0">
      
      {/* Back and Print Actions (Hidden in Print) */}
      <div className="flex items-center justify-between no-print border-b border-cream-200 dark:border-dark-border pb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-1.5 text-xs font-semibold text-cream-500 hover:text-cream-900 dark:text-dark-text-secondary dark:hover:text-[#E8E7E3] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-accent-blue hover:bg-accent-blue-hover text-white transition-colors shadow-md"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Report Header */}
      <div className="border-b-4 border-cream-900 dark:border-neutral-700 pb-6 space-y-4">
        <div className="flex items-center justify-between text-2xs uppercase tracking-widest font-semibold text-cream-500 dark:text-dark-text-secondary">
          <span>Veritas Research Division</span>
          <span>Category: {topicData.category}</span>
        </div>
        
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cream-900 dark:text-[#E8E7E3] m-0 leading-tight">
            {topicData.title}
          </h1>
          <p className="text-sm text-cream-500 dark:text-dark-text-secondary italic">
            A multi-perspective intelligence brief on {topicData.title} reconciled on {topicData.lastUpdated}.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 text-center text-3xs font-semibold uppercase tracking-wider text-cream-500 dark:text-dark-text-secondary">
          <div className="py-2 border-r border-cream-200 dark:border-dark-border">
            Divergence: <span className="font-bold text-cream-900 dark:text-[#E8E7E3]">{topicData.divergence.score}</span>
          </div>
          <div className="py-2 border-r border-cream-200 dark:border-dark-border">
            News items: <span className="font-bold text-cream-900 dark:text-[#E8E7E3]">{topicData.metrics.newsCount}</span>
          </div>
          <div className="py-2">
            Confidence: <span className="font-bold text-cream-900 dark:text-[#E8E7E3]">{topicData.summary.confidenceScore}%</span>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="space-y-4 print-card p-5 rounded-2xl border border-cream-200 dark:border-dark-border bg-white dark:bg-[#121417]">
        <h3 className="font-serif text-base font-bold text-cream-900 dark:text-[#E8E7E3] border-b border-cream-200 dark:border-dark-border pb-2 flex items-center">
          <FileText className="w-4 h-4 mr-2 text-accent-blue" />
          Executive AI Synthesis
        </h3>
        <ul className="space-y-3 pl-1">
          {topicData.summary.points.map((point, index) => (
            <li key={index} className="flex items-start text-xs leading-relaxed text-cream-900 dark:text-[#E8E7E3]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 mr-2.5 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Perspective Divergence Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-6">
        <div className="p-5 rounded-2xl border border-cream-200 bg-white dark:border-dark-border dark:bg-[#121417] print-card space-y-4">
          <h3 className="font-serif text-base font-bold text-cream-900 dark:text-[#E8E7E3] border-b border-cream-200 dark:border-dark-border pb-2">
            Narrative Divergence
          </h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-cream-900 dark:text-[#E8E7E3]">{topicData.divergence.score}</span>
            <span className="text-3xs text-cream-400 dark:text-neutral-500">/ 200 pts</span>
          </div>
          <div className="space-y-2 text-2xs">
            <div className="flex justify-between">
              <span>Media Coverage Bias:</span>
              <span className="font-semibold text-accent-blue">{topicData.divergence.mediaSentiment > 0 ? '+' : ''}{topicData.divergence.mediaSentiment}</span>
            </div>
            <div className="flex justify-between">
              <span>Public Opinion Bias:</span>
              <span className={`font-semibold ${topicData.divergence.publicSentiment > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                {topicData.divergence.publicSentiment > 0 ? '+' : ''}{topicData.divergence.publicSentiment}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-cream-200 bg-white dark:border-dark-border dark:bg-[#121417] print-card space-y-3">
          <h3 className="font-serif text-base font-bold text-cream-900 dark:text-[#E8E7E3] border-b border-cream-200 dark:border-dark-border pb-2">
            Divergence Insights
          </h3>
          <p className="text-xs text-cream-500 dark:text-dark-text-secondary leading-relaxed">
            {topicData.divergence.insight}
          </p>
        </div>
      </div>

      {/* Sources Federated */}
      <div className="p-5 rounded-2xl border border-cream-200 bg-white dark:border-dark-border dark:bg-[#121417] print-card space-y-4">
        <h3 className="font-serif text-base font-bold text-cream-900 dark:text-[#E8E7E3] border-b border-cream-200 dark:border-dark-border pb-2 flex items-center">
          <Database className="w-4 h-4 mr-2 text-accent-blue" />
          Ingested Data Feeds (via Wire query layer)
        </h3>
        <div className="flex flex-wrap gap-2">
          {topicData.sources.map((src) => (
            <span 
              key={src.name} 
              className="text-3xs border border-cream-200 bg-cream-100/30 dark:border-dark-border px-2.5 py-1 rounded-md"
            >
              {src.name}: <strong className="text-cream-900 dark:text-[#E8E7E3]">{src.count} entries</strong>
            </span>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="p-5 rounded-2xl border border-cream-200 bg-white dark:border-dark-border dark:bg-[#121417] print-card space-y-4">
        <h3 className="font-serif text-base font-bold text-cream-900 dark:text-[#E8E7E3] border-b border-cream-200 dark:border-dark-border pb-2 flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-accent-blue" />
          Chronological Developments
        </h3>
        <div className="space-y-4 pl-1">
          {topicData.timeline.map((event, idx) => (
            <div key={idx} className="space-y-1 text-xs">
              <span className="font-bold text-accent-blue text-2xs block">{event.date}</span>
              <h4 className="font-serif font-bold text-cream-900 dark:text-[#E8E7E3]">{event.title}</h4>
              <p className="text-cream-500 dark:text-dark-text-secondary leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Report Footer */}
      <div className="border-t border-cream-200 dark:border-dark-border pt-6 text-center text-3xs text-cream-400 dark:text-neutral-500 space-y-1">
        <p>This document is a synthesized research report generated automatically via Veritas.</p>
        <p>Raw internet signals collected programmatically using the Anakin Wire action schema layer.</p>
      </div>

    </div>
  );
}
