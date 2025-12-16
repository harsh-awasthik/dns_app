import React, { useState } from 'react';
import { StatusIndicator } from './components/StatusIndicator';
import { ControlPanel } from './components/ControlPanel';
import { QuickTileSimulation } from './components/QuickTileSimulation';
import { Info, Smartphone, AlertTriangle, X, Github, Linkedin } from 'lucide-react';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSimulatingSystem, setIsSimulatingSystem] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  
  // Default to AdGuard, but allow user to change it
  const [dnsHost, setDnsHost] = useState('dns.adguard.com');

  // Simulate connection delay
  const toggleDNS = () => {
    if (!dnsHost.trim()) return; // Prevent empty host toggle
    setIsSimulatingSystem(true);
    setTimeout(() => {
      setIsEnabled((prev) => !prev);
      setIsSimulatingSystem(false);
    }, 600);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
      
      {/* App Container - simulates a mobile screen aspect ratio on desktop, full on mobile */}
      <div className="w-full h-full sm:max-w-[380px] sm:h-[800px] bg-slate-900 sm:rounded-3xl shadow-2xl flex flex-col relative overflow-hidden border-slate-800 sm:border-[8px]">
        
        {/* Status Bar Simulation */}
        <div className="h-8 w-full bg-slate-900 flex justify-between items-center px-6 text-xs text-slate-400 select-none z-20">
          <span>9:41</span>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            <div className="w-4 h-3 rounded bg-slate-700"></div>
          </div>
        </div>

        {/* Main App Content */}
        <div className="flex-1 flex flex-col p-6 z-10">
          
          {/* Header */}
          <header className="flex justify-between items-center mb-10">
            <h1 className="text-xl font-bold text-white tracking-tight">DNS Manager</h1>
            <button 
              onClick={() => setInfoOpen(true)}
              className="p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-400"
            >
              <Info size={20} />
            </button>
          </header>

          {/* Core Status Visualization */}
          <div className="flex-1 flex flex-col items-center justify-center -mt-10">
            <StatusIndicator isEnabled={isEnabled} isLoading={isSimulatingSystem} />
            
            <div className="mt-8 text-center space-y-2">
              <h2 className={`text-2xl font-bold transition-colors duration-300 ${isEnabled ? 'text-green-400' : 'text-slate-400'}`}>
                {isEnabled ? 'Private DNS Active' : 'DNS Not Connected'}
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                {isEnabled ? `Using ${dnsHost}` : 'Traffic is unencrypted'}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-8">
            <ControlPanel 
              isEnabled={isEnabled} 
              onToggle={toggleDNS} 
              isLoading={isSimulatingSystem}
              dnsHost={dnsHost}
              setDnsHost={setDnsHost}
            />
          </div>

          {/* Feature Highlight: Notification Tile */}
          <div className="mt-auto bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 mt-1">
                <Smartphone size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-200">Quick Settings Tile</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pull down your notification shade to toggle DNS instantly without opening the app.
                </p>
                <button 
                  onClick={() => setNotificationOpen(true)}
                  className="text-xs text-blue-400 font-medium hover:text-blue-300 mt-2 flex items-center gap-1"
                >
                  Simulate Notification Shade →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Web Demo Disclaimer */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center opacity-40 pointer-events-none">
          <div className="flex items-center gap-1 text-[10px] text-slate-500">
             <AlertTriangle size={10} /> Web Prototype
          </div>
        </div>

        {/* Info Modal */}
        {infoOpen && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200" onClick={() => setInfoOpen(false)}>
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl w-full max-w-[300px] shadow-2xl relative flex flex-col items-center text-center" onClick={e => e.stopPropagation()}>
               <button onClick={() => setInfoOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
                 <X size={20}/>
               </button>
               <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 mb-4">
                 <Info size={24} />
               </div>
               <h3 className="text-lg font-bold text-white mb-2">Developer Info</h3>
               <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                 vibe coded by <br/><span className="text-purple-400 font-semibold text-base">Harsh Awasthi</span>
               </p>
               <div className="flex gap-4 justify-center w-full">
                 <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors flex justify-center text-white">
                   <Github size={20}/>
                 </a>
                 <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 bg-[#0077b5]/20 text-[#0077b5] rounded-xl hover:bg-[#0077b5]/30 transition-colors flex justify-center">
                   <Linkedin size={20}/>
                 </a>
               </div>
            </div>
          </div>
        )}

        {/* Overlay: Notification Shade Simulation */}
        <QuickTileSimulation 
          isOpen={notificationOpen} 
          onClose={() => setNotificationOpen(false)}
          isEnabled={isEnabled}
          onToggle={toggleDNS}
        />

      </div>
    </div>
  );
}