import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Key, Check } from 'lucide-react';
import { ThemeContext, ApiKeyContext } from '../App';
import ApiKeySettings from './ApiKeySettings';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { llmConfig } = useContext(ApiKeyContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-cream-200 bg-cream-50/70 backdrop-blur-md dark:border-dark-border dark:bg-[#0C0D0E]/70 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="font-serif text-2xl font-bold tracking-wider text-cream-900 dark:text-[#E8E7E3] group-hover:text-accent-blue transition-colors">
              VERITAS
            </span>
            <span className="hidden sm:inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-cream-200 text-cream-500 dark:bg-dark-border dark:text-dark-text-secondary">
              Wire Ingest
            </span>
          </Link>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* LLM Status Indicator */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 ${
                llmConfig.provider !== 'mock'
                  ? 'bg-accent-green/10 text-accent-green border-accent-green/20 hover:bg-accent-green/20'
                  : 'bg-cream-200 text-cream-500 border-cream-300 hover:bg-cream-300 dark:bg-dark-border dark:text-dark-text-secondary dark:border-transparent'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>
                {llmConfig.provider === 'gemini'
                  ? 'Gemini Live'
                  : llmConfig.provider === 'local'
                  ? `Local: ${llmConfig.localModel}`
                  : 'Configure LLM'}
              </span>
              {llmConfig.provider !== 'mock' && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            {/* Theme Toggle (Sun / Moon) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-cream-200 hover:bg-cream-300 text-cream-900 dark:bg-dark-border dark:hover:bg-neutral-800 dark:text-[#E8E7E3] focus:outline-none transition-all duration-300 transform active:scale-95"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5 overflow-hidden">
                <div
                  className={`absolute inset-0 transform transition-transform duration-500 ease-out ${
                    theme === 'light' ? 'translate-y-0 rotate-0' : '-translate-y-10 rotate-90'
                  }`}
                >
                  <Sun className="w-5 h-5 text-accent-gold" />
                </div>
                <div
                  className={`absolute inset-0 transform transition-transform duration-500 ease-out ${
                    theme === 'dark' ? 'translate-y-0 rotate-0' : 'translate-y-10 -rotate-90'
                  }`}
                >
                  <Moon className="w-5 h-5 text-accent-blue" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Developer Drawer Overlay */}
      <ApiKeySettings isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
