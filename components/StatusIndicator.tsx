import React from 'react';
import { Shield, Activity } from 'lucide-react';

interface StatusIndicatorProps {
  isEnabled: boolean;
  isLoading: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isEnabled, isLoading }) => {
  return (
    <div className="relative">
      {/* Ripple Effect Background (Only when enabled) */}
      {isEnabled && !isLoading && (
        <>
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse scale-150"></div>
          <div className="absolute inset-0 bg-green-500/10 rounded-full blur-2xl animate-ping scale-110"></div>
        </>
      )}

      {/* Main Circle Container */}
      <div 
        className={`
          relative w-48 h-48 rounded-full flex items-center justify-center 
          transition-all duration-500 border-4 shadow-2xl
          ${isEnabled 
            ? 'bg-gradient-to-br from-green-900 to-slate-900 border-green-500/50 shadow-green-900/40' 
            : 'bg-slate-800 border-slate-700 shadow-slate-900/50'
          }
        `}
      >
        {/* Inner Ring */}
        <div className={`
          absolute inset-2 rounded-full border border-dashed opacity-30
          ${isLoading ? 'animate-spin border-white' : 'border-transparent'}
        `}></div>

        {/* Icon Layer */}
        <div className={`transform transition-all duration-500 ${isLoading ? 'scale-90 opacity-70' : 'scale-100'}`}>
          {isLoading ? (
            <Activity size={64} className="text-slate-300 animate-pulse" />
          ) : isEnabled ? (
            <Shield size={80} className="text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
          ) : (
            // Neutral State when Disconnected
            <Shield size={80} className="text-slate-600" />
          )}
        </div>
      </div>
    </div>
  );
};