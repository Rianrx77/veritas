import { createContext, useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SearchProcessing from './pages/SearchProcessing';
import TopicDashboard from './pages/TopicDashboard';
import ReportPage from './pages/ReportPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Types for context
export interface LlmConfig {
  provider: 'mock' | 'gemini' | 'local';
  apiKey: string;
  localEndpoint: string;
  localModel: string;
  wireApiKey?: string;
}

interface ApiKeyContextType {
  apiKey: string;
  llmConfig: LlmConfig;
  setLlmConfig: (config: LlmConfig) => void;
}

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ApiKeyContext = createContext<ApiKeyContextType>({
  apiKey: '',
  llmConfig: {
    provider: 'mock',
    apiKey: '',
    localEndpoint: 'http://localhost:11434/v1',
    localModel: 'llama3',
    wireApiKey: '',
  },
  setLlmConfig: () => {},
});

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export function App() {
  const [llmConfig, setLlmConfigState] = useState<LlmConfig>(() => {
    const saved = localStorage.getItem('veritas_llm_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure wireApiKey is present
        if (parsed && typeof parsed === 'object') {
          return {
            wireApiKey: localStorage.getItem('veritas_wire_key') || '',
            ...parsed
          };
        }
        return parsed;
      } catch (e) {
        // Ignore error
      }
    }
    const legacyKey = localStorage.getItem('veritas_gemini_key') || '';
    const legacyWireKey = localStorage.getItem('veritas_wire_key') || '';
    return {
      provider: legacyKey ? 'gemini' : 'mock',
      apiKey: legacyKey,
      localEndpoint: 'http://localhost:11434/v1',
      localModel: 'llama3',
      wireApiKey: legacyWireKey,
    };
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('veritas_theme') as 'light' | 'dark') || 'light';
  });

  const setLlmConfig = (config: LlmConfig) => {
    setLlmConfigState(config);
    localStorage.setItem('veritas_llm_config', JSON.stringify(config));
    localStorage.setItem('veritas_gemini_key', config.apiKey);
    if (config.wireApiKey) {
      localStorage.setItem('veritas_wire_key', config.wireApiKey);
    } else {
      localStorage.removeItem('veritas_wire_key');
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('veritas_theme', next);
      return next;
    });
  };

  // Sync theme class to document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = '#0C0D0E';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#F7F5F0';
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ApiKeyContext.Provider value={{ apiKey: llmConfig.apiKey, llmConfig, setLlmConfig }}>
        <HashRouter>
          <div className="min-h-screen flex flex-col bg-cream-100 text-cream-900 dark:bg-[#0C0D0E] dark:text-[#E8E7E3] transition-colors duration-500">
            <Navbar />
            <main className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/search" element={<SearchProcessing />} />
                <Route path="/topic/:slug" element={<TopicDashboard />} />
                <Route path="/report/:slug" element={<ReportPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </ApiKeyContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
