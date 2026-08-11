import React from 'react';
import { PageTab } from '../types';
import { ShieldAlert, Cpu, HeartHandshake, Layers } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Column */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
              N
            </div>
            <span className="font-mono font-bold text-xl text-white">NOVA</span>
          </div>
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            "One Palm. Personalized Control. A New Beginning."
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            NOVA represents a new beginning and a new possibility for people using assistive technology. Designed around adaptive EMG control, 3D manufacturing, modularity, and accessibility.
          </p>
        </div>

        {/* Quick Navigation */}
        <div>
          <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-3">
            System Ecosystem
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-cyan-400 transition-colors">
                Concept Overview
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('dashboard')} className="hover:text-cyan-400 transition-colors">
                Live Telemetry Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('how-it-works')} className="hover:text-cyan-400 transition-colors">
                How EMG Control Works
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('technology')} className="hover:text-cyan-400 transition-colors">
                Biomedical Technology Stack
              </button>
            </li>
          </ul>
        </div>

        {/* Engineering Architecture */}
        <div>
          <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider mb-3">
            Modular Platform
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActiveTab('personalization')} className="hover:text-cyan-400 transition-colors">
                3D Fitting & Personalization
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('power')} className="hover:text-cyan-400 transition-colors">
                External Power Architecture
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('maintenance')} className="hover:text-cyan-400 transition-colors">
                Modular Maintenance System
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('about')} className="hover:text-cyan-400 transition-colors">
                About Project & Disclaimers
              </button>
            </li>
          </ul>
        </div>

        {/* Important Disclaimer Card */}
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-4 text-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Important Concept Disclaimer</span>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            NOVA is a fictional concept demonstration project. There is no real medical device connected. All statistics, telemetry, and battery levels are simulated for presentation purposes only.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 NOVA Concept Project. All rights reserved.</p>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Simulated Demonstration System
          </span>
        </div>
      </div>
    </footer>
  );
};
