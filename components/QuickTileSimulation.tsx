import React from 'react';
import { Shield, Wifi, Bluetooth, Battery, Sun } from 'lucide-react';

interface QuickTileSimulationProps {
  isOpen: boolean;
  onClose: () => void;
  isEnabled: boolean;
  onToggle: () => void;
}

export const QuickTileSimulation: React.FC<QuickTileSimulationProps> = ({ isOpen, onClose, isEnabled, onToggle }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      {/* Notification Shade Simulation */}
      <div 
        className="w-full bg-slate-900 rounded-b-3xl p-4 shadow-2xl animate-in slide-in-from-top duration-300 border-b border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Status Bar in Shade */}
        <div className="flex justify-between items-center text-slate-300 mb-6 text-xs px-2">
          <span>9:41</span>
          <div className="flex gap-3">
            <Wifi size={14} />
            <Battery size={14} />
          </div>
        </div>

        {/* Quick Settings Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <QuickTile icon={<Wifi size={20} />} active={true} label="Wi-Fi" />
          <QuickTile icon={<Bluetooth size={20} />} active={true} label="Bluetooth" />
          
          {/* THE DNS TOGGLE TILE - Remains visible and interactive */}
          <button 
            onClick={onToggle}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`
              w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300
              ${isEnabled ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}
            `}>
              <Shield size={24} className={isEnabled ? "fill-current" : ""} />
            </div>
            <span className={`text-[10px] font-medium text-center leading-tight ${isEnabled ? 'text-slate-100' : 'text-slate-400'}`}>
              Private DNS
            </span>
          </button>

          <QuickTile icon={<Sun size={20} />} active={false} label="Flashlight" />
        </div>

        {/* Brightness Slider */}
        <div className="bg-slate-800 h-12 rounded-full flex items-center px-4 gap-3 mb-6">
          <Sun size={18} className="text-slate-400" />
          <div className="h-1 flex-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="w-[70%] h-full bg-blue-500"></div>
          </div>
        </div>

        {/* Notification Area Dummy - Always empty (Silent Background Operation) */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase px-1">Notifications</div>
          <div className="bg-slate-800 rounded-2xl p-3 flex items-center justify-center text-slate-500 text-xs py-6">
             No new notifications
          </div>
        </div>

        {/* Drag Handle */}
        <div className="w-full flex justify-center mt-4 pb-2" onClick={onClose}>
          <div className="w-12 h-1 bg-slate-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

// Helper for other tiles
const QuickTile = ({ icon, active, label }: { icon: React.ReactNode, active: boolean, label: string }) => (
  <div className="flex flex-col items-center gap-2 opacity-50 pointer-events-none">
    <div className={`
      w-14 h-14 rounded-full flex items-center justify-center transition-colors
      ${active ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}
    `}>
      {icon}
    </div>
    <span className="text-[10px] font-medium text-slate-400 text-center leading-tight">{label}</span>
  </div>
);