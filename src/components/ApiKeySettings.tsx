import React, { useContext, useState } from 'react';
import { X, Info, Check, ExternalLink, Settings } from 'lucide-react';
import { ApiKeyContext } from '../App';

interface ApiKeySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiKeySettings({ isOpen, onClose }: ApiKeySettingsProps) {
  const { llmConfig, setLlmConfig } = useContext(ApiKeyContext);

  const [provider, setProvider] = useState<'mock' | 'gemini' | 'local'>(llmConfig.provider);
  const [apiKey, setApiKeyInput] = useState(llmConfig.apiKey);
  const [localEndpoint, setLocalEndpointInput] = useState(llmConfig.localEndpoint);
  const [localModel, setLocalModelInput] = useState(llmConfig.localModel);
  const [wireApiKey, setWireApiKeyInput] = useState(llmConfig.wireApiKey || '');
  const [status, setStatus] = useState<'idle' | 'saved' | 'cleared'>('idle');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLlmConfig({
      provider,
      apiKey: apiKey.trim(),
      localEndpoint: localEndpoint.trim(),
      localModel: localModel.trim(),
      wireApiKey: wireApiKey.trim()
    });
    setStatus('saved');
    setTimeout(() => {
      setStatus('idle');
      onClose();
    }, 1500);
  };

  const handleReset = () => {
    setProvider('mock');
    setApiKeyInput('');
    setLocalEndpointInput('http://localhost:11434/v1');
    setLocalModelInput('llama3');
    setWireApiKeyInput('');
    setLlmConfig({
      provider: 'mock',
      apiKey: '',
      localEndpoint: 'http://localhost:11434/v1',
      localModel: 'llama3',
      wireApiKey: ''
    });
    setStatus('cleared');
    setTimeout(() => {
      setStatus('idle');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end no-print">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-cream-50 dark:bg-[#121417] p-6 shadow-2xl flex flex-col border-l border-cream-200 dark:border-dark-border transform transition-transform duration-300 translate-x-0">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-dark-border">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-accent-blue" />
            <h2 className="text-lg font-bold font-serif text-cream-900 dark:text-[#E8E7E3]">Developer Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-cream-200 dark:hover:bg-neutral-800 text-cream-500 hover:text-cream-900 dark:text-[#A0A5B5] dark:hover:text-[#E8E7E3]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {/* Info Card */}
          <div className="p-4 rounded-xl border border-cream-200 bg-cream-100/50 dark:border-dark-border dark:bg-neutral-900/40 space-y-3">
            <h3 className="text-sm font-semibold flex items-center text-cream-900 dark:text-[#E8E7E3]">
              <Info className="w-4 h-4 mr-1.5 text-accent-blue" />
              Dual-Mode Data Synthesis
            </h3>
            <p className="text-xs text-cream-500 dark:text-dark-text-secondary leading-relaxed">
              Veritas runs in two distinct execution modes:
            </p>
            <ul className="text-xs text-cream-500 dark:text-dark-text-secondary list-disc pl-4 space-y-1.5">
              <li>
                <strong className="text-cream-900 dark:text-[#E8E7E3]">Mock Mode (Default):</strong> Returns seed-based templates for keywords like <code className="px-1 py-0.5 rounded bg-cream-200 dark:bg-dark-border text-xs">OpenAI</code>. Fast and bulletproof for judging.
              </li>
              <li>
                <strong className="text-cream-900 dark:text-[#E8E7E3]">Live AI Mode:</strong> Uses Gemini or local models (Ollama/LM Studio) to synthesize custom search summaries in real-time.
              </li>
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* LLM Provider Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-cream-500 dark:text-dark-text-secondary">
                LLM Synthesis Provider
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['mock', 'gemini', 'local'] as const).map((prov) => (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => setProvider(prov)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                      provider === prov
                        ? 'border-accent-blue bg-accent-blue/10 text-accent-blue'
                        : 'border-cream-300 dark:border-dark-border text-cream-500 dark:text-dark-text-secondary hover:bg-cream-200 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {prov === 'mock' ? 'Mock Engine' : prov === 'gemini' ? 'Gemini Cloud' : 'Local LLM'}
                  </button>
                ))}
              </div>
            </div>

            {/* Anakin Wire API Key */}
            <div className="space-y-1.5 border-b border-cream-200 dark:border-dark-border pb-4">
              <label htmlFor="wireApiKey" className="block text-xs font-semibold uppercase tracking-wider text-cream-500 dark:text-dark-text-secondary">
                Anakin Wire API Key (Live Ingest)
              </label>
              <input
                type="password"
                id="wireApiKey"
                value={wireApiKey}
                onChange={(e) => setWireApiKeyInput(e.target.value)}
                placeholder="ask_..."
                className="w-full px-3 py-2.5 rounded-lg border border-cream-300 dark:border-dark-border bg-white dark:bg-[#181A1F] text-sm text-cream-900 dark:text-[#E8E7E3] placeholder-cream-400 focus:outline-none focus:ring-1 focus:ring-accent-blue"
              />
              <p className="text-3xs text-cream-400 dark:text-neutral-500 leading-relaxed mt-1">
                Required for real-time media and discussion fetches. Stored locally in your browser.
              </p>
            </div>

            {/* Provider Specific Settings */}
            {provider === 'gemini' && (
              <div className="space-y-1.5 animate-fadeIn">
                <label htmlFor="apiKey" className="block text-xs font-semibold uppercase tracking-wider text-cream-500 dark:text-dark-text-secondary">
                  Google Gemini API Key
                </label>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2.5 rounded-lg border border-cream-300 dark:border-dark-border bg-white dark:bg-[#181A1F] text-sm text-cream-900 dark:text-[#E8E7E3] placeholder-cream-400 focus:outline-none focus:ring-1 focus:ring-accent-blue"
                  required
                />
                <p className="text-3xs text-cream-400 dark:text-neutral-500 leading-relaxed mt-1">
                  Stored locally. Key is sent directly to Google AI Studio endpoints.
                </p>
                <div className="pt-2">
                  <a
                    href="https://aistudio.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-2xs font-semibold text-accent-blue hover:underline"
                  >
                    <span>Get free key in Google AI Studio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {provider === 'local' && (
              <div className="space-y-4 animate-fadeIn">
                
                {/* Local Endpoint */}
                <div className="space-y-1.5">
                  <label htmlFor="localEndpoint" className="block text-xs font-semibold uppercase tracking-wider text-cream-500 dark:text-dark-text-secondary">
                    Local API Endpoint URL
                  </label>
                  <input
                    type="text"
                    id="localEndpoint"
                    value={localEndpoint}
                    onChange={(e) => setLocalEndpointInput(e.target.value)}
                    placeholder="http://localhost:11434/v1"
                    className="w-full px-3 py-2.5 rounded-lg border border-cream-300 dark:border-dark-border bg-white dark:bg-[#181A1F] text-sm text-cream-900 dark:text-[#E8E7E3] focus:outline-none focus:ring-1 focus:ring-accent-blue"
                    required
                  />
                  <p className="text-3xs text-cream-400 dark:text-neutral-500 leading-relaxed">
                    OpenAI-compatible server URL. Use <code className="bg-cream-200 dark:bg-dark-border px-1 py-0.5 rounded text-3xs">http://localhost:11434/v1</code> for Ollama, or <code className="bg-cream-200 dark:bg-dark-border px-1 py-0.5 rounded text-3xs">http://localhost:1234/v1</code> for LM Studio.
                  </p>
                </div>

                {/* Local Model Tag */}
                <div className="space-y-1.5">
                  <label htmlFor="localModel" className="block text-xs font-semibold uppercase tracking-wider text-cream-500 dark:text-dark-text-secondary">
                    Local Model Identifier
                  </label>
                  <input
                    type="text"
                    id="localModel"
                    value={localModel}
                    onChange={(e) => setLocalModelInput(e.target.value)}
                    placeholder="llama3"
                    className="w-full px-3 py-2.5 rounded-lg border border-cream-300 dark:border-dark-border bg-white dark:bg-[#181A1F] text-sm text-cream-900 dark:text-[#E8E7E3] focus:outline-none focus:ring-1 focus:ring-accent-blue"
                    required
                  />
                  <p className="text-3xs text-cream-400 dark:text-neutral-500 leading-relaxed">
                    The tag of your running model (e.g. <code className="bg-cream-200 dark:bg-dark-border px-1 py-0.5 rounded text-3xs">llama3</code>, <code className="bg-cream-200 dark:bg-dark-border px-1 py-0.5 rounded text-3xs">mistral</code>, or <code className="bg-cream-200 dark:bg-dark-border px-1 py-0.5 rounded text-3xs">qwen2.5</code>).
                  </p>
                </div>

                {/* CORS Note */}
                <div className="p-3 rounded-lg border border-accent-gold/20 bg-accent-gold/5 text-3xs text-accent-gold dark:text-[#E8E7E3] leading-relaxed">
                  <p className="font-semibold">Local Server CORS setup:</p>
                  <p className="mt-1">
                    Your local server must accept CORS requests. For Ollama on Windows, run `set OLLAMA_ORIGINS=*` in CMD before starting Ollama. For LM Studio, enable "Allow CORS" in the server sidebar setting.
                  </p>
                </div>

              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-cream-200 dark:border-dark-border">
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg bg-accent-blue hover:bg-accent-blue-hover text-white transition-colors shadow-md"
              >
                Save Settings
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 text-sm font-semibold rounded-lg border border-cream-300 hover:bg-cream-200 dark:border-dark-border dark:hover:bg-neutral-800 text-cream-900 dark:text-[#E8E7E3] transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Status indicator alerts */}
        {status !== 'idle' && (
          <div
            className={`p-3 rounded-lg flex items-center space-x-2 text-xs font-medium animate-pulse ${
              status === 'saved'
                ? 'bg-accent-green/10 text-accent-green'
                : 'bg-accent-red/10 text-accent-red'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{status === 'saved' ? 'Settings saved successfully!' : 'Developer settings reset to default!'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
