import React from 'react';
import { PageTab } from '../types';
import { NOVAProductViewer } from '../components/NOVAProductViewer';
import { 
  Activity, 
  Sliders, 
  Layers, 
  Zap, 
  LayoutDashboard, 
  Cpu, 
  ShieldCheck, 
  ArrowRight,
  Heart,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface LandingPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab }) => {
  const features = [
    {
      title: 'Adaptive EMG Control',
      description: 'Surface EMG signals are used as the conceptual control interface to read residual muscle activation.',
      icon: Activity,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: '3D Personalization',
      description: 'The palm can conceptually be customized using 3D scanning and anatomical measurements.',
      icon: Sliders,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Modular Architecture',
      description: 'Major components are designed as quickly replaceable, low-cost individual modules.',
      icon: Layers,
      color: 'from-indigo-500 to-violet-500'
    },
    {
      title: 'External Power',
      description: 'A removable external power module avoids a large permanent battery inside the palm assembly.',
      icon: Zap,
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Smart Monitoring',
      description: 'A digital platform conceptually monitors device status, battery metrics, and motor health.',
      icon: LayoutDashboard,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Affordable Manufacturing',
      description: '3D printing and modular design are intended to reduce manufacturing and maintenance barriers worldwide.',
      icon: Cpu,
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>A NEW BEGINNING FOR ASSISTIVE TECHNOLOGY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            NOVA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Palm</span>
          </h1>

          <p className="text-xl font-medium text-cyan-300/90 font-mono">
            Smart Adaptive Prosthetic Technology
          </p>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A personalized, modular prosthetic palm concept designed around adaptive control, 3D manufacturing, maintainability, and accessibility.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('how-it-works')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore NOVA</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-cyan-400" />
              <span>View Dashboard</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 italic">
            Concept project — not a medical device.
          </p>
        </div>

        {/* Interactive Product Render Viewer */}
        <div className="mt-12">
          <NOVAProductViewer />
        </div>
      </section>

      {/* Key Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Key Architectural Innovations
          </h2>
          <p className="text-slate-400 text-sm">
            Designed to address accessibility, maintainability, and user personalization through six engineering pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all hover:shadow-xl group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why NOVA Matters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider bg-cyan-950 px-2.5 py-1 rounded border border-cyan-900">
                Philosophy & Purpose
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Reimagining Accessible Assistive Tech
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Traditional prosthetics are often cost-prohibitive, heavy, and difficult to repair locally. NOVA shifts the paradigm toward decentralized 3D manufacturing, modular repairs, and hot-swappable power systems.
              </p>
              <ul className="space-y-2 text-sm text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sub-5 minute module replacement vs whole-device factory overhaul</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Non-invasive surface EMG algorithm that adapts over time</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3D CAD fitting customized to individual user measurements</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400">CONCEPT METRICS</span>
                <span className="text-xs font-mono text-cyan-400">DEMO SPECIFICATIONS</span>
              </div>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">Weight Target</span>
                  <span className="text-white font-mono font-semibold">Under 380 grams</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">Chassis Material</span>
                  <span className="text-white font-mono font-semibold">Biocompatible Titanium & Carbon Fiber</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">Control Interface</span>
                  <span className="text-white font-mono font-semibold">Multi-channel Surface EMG</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <span className="text-slate-400">Power Delivery</span>
                  <span className="text-white font-mono font-semibold">External Quick-Release Battery</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-amber-400 bg-amber-950/40 p-2.5 rounded border border-amber-900/50">
                Note: All specifications represent engineering design targets for the NOVA concept.
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
