import React, { useState } from 'react';
import { ShieldCheck, Cpu, Battery, Activity, Sliders, Layers, Sparkles } from 'lucide-react';
import novaPalmHero from '../assets/images/nova_palm_hero_1786449234092.jpg';
export const NOVAProductViewer: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);

  const hotspots = [
    {
      id: 0,
      title: 'Adaptive EMG Sensor Array',
      top: '40%',
      left: '28%',
      description: 'Non-invasive surface EMG sensors detect subtle residual muscle signals from the forearm to predict grip intention.',
      icon: Activity,
      badge: 'Concept Signal Processing'
    },
    {
      id: 1,
      title: 'Quick-Release Power Module',
      top: '75%',
      left: '60%',
      description: 'Hot-swappable external battery module located at the wrist avoids permanent internal battery degradation.',
      icon: Battery,
      badge: 'External Architecture'
    },
    {
      id: 2,
      title: '3D-Printed Titanium Chassis',
      top: '52%',
      left: '48%',
      description: 'Lightweight biocompatible titanium lattice skeleton customized to the user’s exact residual hand measurements.',
      icon: Cpu,
      badge: 'Additive Manufacturing'
    },
    {
      id: 3,
      title: 'Modular Finger Actuators',
      top: '22%',
      left: '68%',
      description: 'Individual micro-drive motors designed for individual replacement in under 5 minutes without replacing the palm.',
      icon: Sliders,
      badge: 'Maintainable Design'
    }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        
        {/* Product Image & Hotspots */}
        <div className="relative w-full lg:w-3/5 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group">
          <img
            src={novaPalmHero}
            alt="NOVA Palm Prosthetic Concept Product Visual"
            referrerPolicy="no-referrer"
            className="w-full h-[360px] sm:h-[420px] object-cover object-center"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Hotspot buttons */}
          {hotspots.map((hs) => {
            const isSelected = activeHotspot === hs.id;
            return (
              <button
                key={hs.id}
                onClick={() => setActiveHotspot(hs.id)}
                style={{ top: hs.top, left: hs.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group/pin focus:outline-none transition-transform ${
                  isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
                aria-label={`View hotspot: ${hs.title}`}
              >
                <span className="relative flex h-7 w-7 items-center justify-center">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isSelected ? 'bg-cyan-400' : 'bg-blue-500'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-6 w-6 items-center justify-center text-xs font-mono font-bold text-white shadow-lg border ${
                    isSelected ? 'bg-cyan-500 border-cyan-200' : 'bg-slate-900/90 border-slate-400'
                  }`}>
                    {hs.id + 1}
                  </span>
                </span>
              </button>
            );
          })}

          {/* Small watermark */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-800 text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Interactive 3D Render — Concept Visualization</span>
          </div>
        </div>

        {/* Hotspot details sidebar */}
        <div className="w-full lg:w-2/5 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-mono font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>EXPLO-VIEW: SELECT HOTSPOT (1-4)</span>
          </div>

          {activeHotspot !== null ? (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase bg-cyan-950 px-2 py-0.5 rounded border border-cyan-900">
                  {hotspots[activeHotspot].badge}
                </span>
                <span className="text-xs font-mono text-slate-500">Node #{activeHotspot + 1}</span>
              </div>

              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                {React.createElement(hotspots[activeHotspot].icon, { className: 'w-5 h-5 text-cyan-400' })}
                {hotspots[activeHotspot].title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {hotspots[activeHotspot].description}
              </p>

              <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80 flex items-center justify-between">
                <span>Status: Simulated CAD Node</span>
                <span className="text-emerald-400 font-medium">Concept Validated</span>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-400 text-sm bg-slate-950/50 rounded-xl border border-dashed border-slate-800">
              Click any numbered marker on the NOVA Palm to inspect its structural and electrical components.
            </div>
          )}

          {/* Quick select buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {hotspots.map((hs) => (
              <button
                key={hs.id}
                onClick={() => setActiveHotspot(hs.id)}
                className={`p-2 rounded-lg text-xs font-medium text-left transition-colors border ${
                  activeHotspot === hs.id
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-mono text-[10px] text-cyan-400 mr-1.5">#{hs.id + 1}</span>
                {hs.title}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
