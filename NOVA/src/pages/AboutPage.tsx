import React from 'react';
import { PageTab } from '../types';
import { 
  Info, 
  ShieldAlert, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

interface AboutPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-xs font-mono text-cyan-400">
          <Info className="w-3.5 h-3.5" />
          <span>CONCEPT & MISSION OVERVIEW</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About NOVA
        </h1>
        <p className="text-cyan-300 font-mono text-lg font-semibold">
          "One Palm. Personalized Control. A New Beginning."
        </p>
        <p className="text-slate-300 text-base leading-relaxed">
          NOVA is a fictional concept project exploring how prosthetic technology could become more personalized, modular, maintainable, and affordable for people worldwide.
        </p>
      </div>

      {/* Meaning & Purpose */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            N
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">The Name NOVA</h2>
            <p className="text-xs font-mono text-cyan-400">Concept Identity</p>
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          NOVA represents a <strong className="text-cyan-300">new beginning</strong> and a <strong className="text-cyan-300">new possibility</strong> for people using assistive technology. By combining non-invasive surface EMG control, parametric 3D printing, and hot-swappable modular components, the project aims to inspire open, maintainable design in biomedical engineering.
        </p>
      </div>

      {/* Critical Explicit Disclaimers Panel */}
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 text-amber-400">
          <ShieldAlert className="w-6 h-6 shrink-0" />
          <h2 className="text-2xl font-extrabold text-white">
            Mandatory Concept Disclaimers
          </h2>
        </div>

        <p className="text-xs text-amber-200 uppercase font-mono tracking-wider bg-amber-950/80 p-2.5 rounded border border-amber-800">
          Important Notice — Please Read Carefully
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Not Clinically Approved</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              NOVA has NOT been evaluated, cleared, or approved by the FDA, CE, or any medical regulatory authority.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Not Manufactured</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              NOVA is NOT currently manufactured or commercially available for purchase anywhere in the world.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Not Tested On Patients</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              NOVA has NOT undergone clinical human trials or testing on real patients.
            </p>
          </div>

        </div>

        <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
          This website is a technology competition demonstration of a proposed digital telemetry ecosystem and physical prosthetic design language. All dashboard numbers are generated randomly for simulation purposes.
        </p>
      </div>

      {/* CTA to Dashboard */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">
          Explore the Simulated Digital Platform
        </h3>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Experience how a smart prosthetic telemetry platform could monitor battery health, grip usage distributions, and motor status in real time.
        </p>
        <button
          onClick={() => setActiveTab('dashboard')}
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all inline-flex items-center gap-2"
        >
          <span>Open Telemetry Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
