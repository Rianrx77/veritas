import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, Check, Cpu } from 'lucide-react';

interface ProgressStep {
  label: string;
  duration: number;
}

export default function SearchProcessing() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || 'Research Topic';

  const steps: ProgressStep[] = [
    { label: "Gathering media coverage from Wire...", duration: 600 },
    { label: "Analyzing public discussions via Wire...", duration: 600 },
    { label: "Evaluating prediction markets via Wire...", duration: 600 },
    { label: "Calculating Perspective Divergence Score...", duration: 500 },
    { label: "Generating neutral summary...", duration: 700 }
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (currentStepIndex < steps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStepIndex]);
        setCurrentStepIndex(prev => prev + 1);
      }, steps[currentStepIndex].duration);

      return () => clearTimeout(timer);
    } else {
      // Completed all steps! Transition to topic page
      const slug = query.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      navigate(`/topic/${slug}?q=${encodeURIComponent(query)}`);
    }
  }, [currentStepIndex, query, navigate]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto px-6 py-24 space-y-8">
      {/* Animated CPU Core */}
      <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue animate-pulse-glow">
        <Cpu className="w-10 h-10 animate-spin" style={{ animationDuration: '4s' }} />
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-bold text-cream-900 dark:text-[#E8E7E3]">Analyzing Ingest Layer</h2>
        <p className="text-xs text-cream-500 dark:text-dark-text-secondary">
          Running Wire queries for "<span className="font-semibold text-cream-900 dark:text-[#E8E7E3]">{query}</span>"
        </p>
      </div>

      {/* Steps List */}
      <div className="w-full bg-white dark:bg-[#121417] border border-cream-200 dark:border-dark-border rounded-2xl p-6 shadow-md space-y-4">
        {steps.map((step, idx) => {
          const isCompleted = completedSteps.includes(idx);
          const isActive = idx === currentStepIndex;
          const isPending = idx > currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center space-x-3 transition-opacity duration-300 ${
                isPending ? 'opacity-40' : 'opacity-100'
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-accent-green text-white'
                    : isActive
                    ? 'border-2 border-accent-blue text-accent-blue'
                    : 'border border-cream-300 dark:border-neutral-700 text-cream-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" />
                ) : isActive ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span className="text-3xs font-semibold">{idx + 1}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-xs font-medium ${
                  isActive
                    ? 'text-accent-blue font-semibold'
                    : isCompleted
                    ? 'text-cream-900 dark:text-[#E8E7E3]'
                    : 'text-cream-500 dark:text-dark-text-secondary'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <span className="text-3xs font-semibold uppercase tracking-wider text-cream-400 dark:text-neutral-600">
          Federated Web Search &bull; Anakin Wire SDK
        </span>
      </div>
    </div>
  );
}
