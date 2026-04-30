import React, { useState, useEffect } from 'react';
import { 
  Terminal, Cpu, Lock, Factory, Rocket, Target, Globe, 
  ShieldAlert, Zap, Drill, Building2, Crosshair, 
  Map as MapIcon, HeartPulse, Activity, AlertTriangle, 
  Users, TrendingUp, Wallet, Flame, Gavel, Radio
} from 'lucide-react';

// --- BOOT SEQUENCE ---
const BootSequence = ({ onComplete }) => {
  const [status, setStatus] = useState('INITIALIZING...');
  useEffect(() => {
    const steps = ["DECRYPTING KERNEL...", "SYNCING SATELLITES...", "DAWN SYSTEMS ONLINE"];
    steps.forEach((s, i) => setTimeout(() => setStatus(s), i * 800));
    setTimeout(onComplete, 2600);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[1100] bg-black flex items-center justify-center font-mono p-6">
      <div className="max-w-md w-full text-center">
        <Cpu size={60} className="text-blue-600 mx-auto mb-8 animate-pulse" />
        <h1 className="text-2xl font-black text-white italic tracking-tighter mb-4">DAWN <span className="text-blue-600">SYSTEMS</span></h1>
        <div className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em]">{status}</div>
      </div>
    </div>
  );
};

export default function App() {
  const [booting, setBooting] = useState(true);
  const [showCover, setShowCover] = useState(true);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [resources, setResources] = useState({ iron: 1200, gold: 340 });
  const [stats, setStats] = useState({ approval: 72, treasury: 250000 });
  const [log, setLog] = useState(["[SYSTEM] Sovereign OS v1.0 initialized."]);

  const targets = [
    { id: 1, name: 'Sector Prime', type: 'CITY', x: 28, y: 35, health: 100 },
    { id: 2, name: 'Fort Aegis', type: 'BASE', x: 62, y: 22, health: 85 },
    { id: 3, name: 'Neo-Tokyo Hub', type: 'CITY', x: 48, y: 58, health: 100 }
  ];

  // --- SPLASH SCREEN ---
  if (showCover) {
    return (
      <div className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center font-mono overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 border-[1px] border-blue-900/30 rounded-full animate-ping scale-50" />
        </div>
        <div className="relative z-10 text-center space-y-6">
          <h2 className="text-[10px] text-blue-500 font-black tracking-[0.8em] uppercase">Sovereign Strategic Hub</h2>
          <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none">
            WORLD<br /><span className="text-blue-600">GOVERNANCE</span><br />SIMULATOR
          </h1>
          <button onClick={() => setShowCover(false)} className="mt-10 px-16 py-6 bg-transparent border-2 border-blue-600 text-blue-500 font-black uppercase tracking-[0.4em] text-xs hover:bg-blue-600 hover:text-white transition-all duration-500 rounded-full">
            Initialize Command Link
          </button>
          <div className="pt-12">
            <p className="text-xs text-white font-black uppercase tracking-widest italic">Architect: CARLOS ONDARI 'DAWN'</p>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500/30 shadow-[0_0_15px_blue] animate-[scan_4s_linear_infinite]" />
        <style>{`@keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }`}</style>
      </div>
    );
  }

  // --- MAIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-black text-neutral-400 font-mono overflow-x-hidden">
      {booting && <BootSequence onComplete={() => setBooting(false)} />}
      
      <nav className="p-6 border-b border-neutral-900 bg-black/80 flex justify-between items-center sticky top-0 z-50">
        <div className="flex gap-12">
          <div><p className="text-[8px] text-neutral-600 font-black uppercase">Treasury</p><p className="text-white font-black text-lg">${stats.treasury.toLocaleString()}</p></div>
          <div><p className="text-[8px] text-blue-500 font-black uppercase">Approval</p><p className="text-white font-black text-lg">{stats.approval}%</p></div>
        </div>
        <div className="text-right text-[8px] font-black text-neutral-600 uppercase">DAWN SYSTEMS // V1.0</div>
      </nav>

      <div className="p-10 max-w-[1600px] mx-auto grid grid-cols-12 gap-10">
        {/* TACTICAL MAP */}
        <section className="col-span-12 lg:col-span-8 bg-neutral-900 border-2 border-neutral-800 rounded-[60px] h-[500px] relative overflow-hidden">
          {targets.map(t => (
            <button key={t.id} onClick={() => setSelectedTarget(t)} className="absolute p-4 bg-black border-2 border-neutral-700 rounded-2xl hover:border-blue-500 transition-all" style={{ left: `${t.x}%`, top: `${t.y}%` }}>
              <Target size={20} className={selectedTarget?.id === t.id ? 'text-blue-500' : 'text-neutral-500'} />
            </button>
          ))}
        </section>

        {/* CONTROLS */}
        <section className="col-span-12 lg:col-span-4 space-y-6">
          <div className="p-8 bg-neutral-900 border-2 border-neutral-800 rounded-[40px]">
            <h3 className="text-xs font-black text-white uppercase mb-4 tracking-widest">Command Center</h3>
            {selectedTarget ? (
              <div className="space-y-4">
                <p className="text-2xl font-black text-white uppercase">{selectedTarget.name}</p>
                <button className="w-full py-4 bg-red-600 text-white font-black rounded-xl uppercase text-[10px]">Execute Protocol</button>
              </div>
            ) : <p className="text-xs italic text-neutral-600">Select target on map...</p>}
          </div>
        </section>
      </div>

      <footer className="fixed bottom-0 w-full bg-blue-600 h-8 flex items-center overflow-hidden z-[100]">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] text-white font-black uppercase italic">
          CARLOS ONDARI 'DAWN' INITIALIZES SOVEREIGN COMMAND HUB • SYSTEM ONLINE • READY FOR 11:10 LAUNCH •••
        </div>
      </footer>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 20s linear infinite; }`}</style>
    </div>
  );
}
