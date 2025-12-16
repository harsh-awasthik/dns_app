import React from 'react';
import { ShieldCheck, Globe } from 'lucide-react';

interface ControlPanelProps {
  isEnabled: boolean;
  onToggle: () => void;
  isLoading: boolean;
  dnsHost: string;
  setDnsHost: (host: string) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ isEnabled, onToggle, isLoading, dnsHost, setDnsHost }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Custom DNS Input */}
      <div className="bg-slate-800/50 p-1 rounded-2xl border border-slate-800 flex items-center focus-within:border-slate-600 focus-within:bg-slate-800 transition-all">
        <div className="pl-3 text-slate-500">
          <Globe size={18} />
        </div>
        <input 
          type="text" 
          value={dnsHost}
          onChange={(e) => setDnsHost(e.target.value)}
          disabled={isEnabled || isLoading}
          placeholder="Enter DNS Hostname"
          className="bg-transparent w-full p-3 text-sm text-slate-200 placeholder-slate-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed font-mono"
        />
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        disabled={isLoading || !dnsHost.trim()}
        className={`
          group relative w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg transition-all duration-300
          overflow-hidden shadow-xl
          ${isEnabled 
            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20' 
            : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-900/20 hover:shadow-indigo-500/30'
          }
          ${(isLoading || !dnsHost.trim()) ? 'opacity-80 cursor-wait grayscale' : ''}
        `}
      >
        {/* Button Content */}
        <div className="relative z-10 flex items-center gap-3">
          <ShieldCheck size={24} className={isEnabled ? "" : "fill-current"} />
          <span>
            {isLoading 
              ? 'Configuring...' 
              : isEnabled 
                ? 'Deactivate' 
                : 'Activate'}
          </span>
        </div>

        {/* Loading Progress Bar (simulated) */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 h-1 bg-white/30 animate-[width_1s_ease-in-out_forwards] w-full origin-left"></div>
        )}
      </button>

      {!isEnabled && (
        <p className="text-[10px] text-center text-slate-500">
          Enter a valid Private DNS provider hostname
        </p>
      )}
    </div>
  );
};