import React from 'react';
import { PageTab, TechItem } from '../types';
import { 
  Printer, 
  Activity, 
  Sliders, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface TechnologyPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const TechnologyPage: React.FC<TechnologyPageProps> = ({ setActiveTab }) => {
  const techItems: TechItem[] = [
    {
      id: '3d-printing',
      title: '3D Printing (Additive Manufacturing)',
      category: 'Manufacturing',
      iconName: 'Printer',
      whatItIs: 'Selective Laser Sintering (SLS) and Fused Deposition Modeling using medical-grade polymers and titanium alloy powders to produce lightweight custom components.',
      whyNovaUsesIt: 'NOVA uses 3D printing to create socket geometries customized to each user’s exact hand scans without expensive injection molds.',
      problemItSolves: 'Eliminates traditional high-cost manufacturing tooling that makes custom prosthetics cost-prohibitive for many users worldwide.'
    },
    {
      id: 'emg',
      title: 'EMG (Electromyography)',
      category: 'Sensing',
      iconName: 'Activity',
      whatItIs: 'Surface electromyography uses non-invasive dry electrode arrays against the skin to detect electrical potentials produced by contracting forearm muscles.',
      whyNovaUsesIt: 'NOVA uses EMG to capture natural human movement intention directly from residual muscles without surgery.',
      problemItSolves: 'Replaces bulky mechanical switches and harness-pull wires with intuitive biological control.'
    },
    {
      id: 'adaptive-control',
      title: 'Adaptive Control Algorithms',
      category: 'Software & AI',
      iconName: 'Sliders',
      whatItIs: 'Machine learning pattern recognition algorithms that run on-device to classify muscle firing signatures into intended grip modes.',
      whyNovaUsesIt: 'NOVA uses adaptive control to automatically recalibrate and adjust parameters as muscle fatigue occurs during daily use.',
      problemItSolves: 'Solves signal drift and muscle fatigue issues that cause traditional myoelectric limbs to fail or misfire throughout the day.'
    },
    {
      id: 'modular-arch',
      title: 'Modular Architecture',
      category: 'Hardware Engineering',
      iconName: 'Layers',
      whatItIs: 'A standardized mechanical and electrical bus design that partitions the palm into independent, quick-swap sub-assemblies.',
      whyNovaUsesIt: 'NOVA uses modular architecture so single damaged parts (like a finger motor or sensor node) can be replaced individually.',
      problemItSolves: 'Prevents the user from having to send the entire prosthetic back to a factory for minor repairs, drastically reducing downtime.'
    },
    {
      id: 'hybrid-materials',
      title: 'Hybrid Biomaterials',
      category: 'Materials Science',
      iconName: 'ShieldCheck',
      whatItIs: 'A combination of lightweight carbon fiber composites, medical-grade flexible TPU, and selectively sintered biocompatible titanium.',
      whyNovaUsesIt: 'NOVA uses hybrid materials to optimize strength-to-weight ratio while maintaining soft tactile friction on finger surfaces.',
      problemItSolves: 'Solves heavy device fatigue and poor grip friction on slippery objects like glass or plastic.'
    },
    {
      id: 'external-power',
      title: 'External Power Module Architecture',
      category: 'Power Management',
      iconName: 'Zap',
      whatItIs: 'A hot-swappable external lithium-iron-phosphate power cartridge mounted at the wrist quick-release bay.',
      whyNovaUsesIt: 'NOVA uses external power so users can swap a depleted cartridge for a fresh one in under 5 seconds without taking off the prosthetic.',
      problemItSolves: 'Eliminates hours of tethered charging downtime where the user is left without their prosthetic hand.'
    },
    {
      id: 'local-processing',
      title: 'Local Embedded Edge Processing',
      category: 'Electronics',
      iconName: 'Cpu',
      whatItIs: 'An ultra-low-power ARM Cortex-M micro-controller running embedded DSP code directly inside the palm chassis.',
      whyNovaUsesIt: 'NOVA processes all sensor telemetry locally on-device with sub-5 millisecond latency.',
      problemItSolves: 'Removes reliance on cloud connections, mobile phones, or external compute boxes for core hand movements.'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Printer': return Printer;
      case 'Activity': return Activity;
      case 'Sliders': return Sliders;
      case 'Layers': return Layers;
      case 'ShieldCheck': return ShieldCheck;
      case 'Zap': return Zap;
      case 'Cpu': return Cpu;
      default: return Cpu;
    }
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-xs font-mono text-cyan-400">
          <Cpu className="w-3.5 h-3.5" />
          <span>BIOMEDICAL ENGINEERING STACK</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Technology Breakdown
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Every component in NOVA is purposefully engineered to solve key physical, economic, and operational challenges in modern prosthetics.
        </p>
      </div>

      {/* Grid of Technologies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techItems.map((tech) => {
          const Icon = getIcon(tech.iconName);
          return (
            <div
              key={tech.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {tech.title}
                      </h3>
                      <span className="text-[10px] font-mono text-cyan-400">
                        {tech.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
                      What it is
                    </span>
                    <p className="text-slate-200">{tech.whatItIs}</p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-cyan-400 block">
                      Why NOVA uses it
                    </span>
                    <p className="text-slate-200">{tech.whyNovaUsesIt}</p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 block">
                      What problem it solves
                    </span>
                    <p className="text-slate-200">{tech.problemItSolves}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Concept Tech Spec</span>
                <span className="text-cyan-400 font-semibold">NOVA Core Architecture</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA to Personalization */}
      <div className="bg-gradient-to-r from-cyan-950/60 to-slate-950 border border-cyan-800/60 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">
            See How 3D Technology Personalizes Each Palm
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Learn about the 3D anatomical scanning and custom CAD generation pipeline that builds a NOVA Palm unique to every individual.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('personalization')}
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shrink-0 transition-all flex items-center gap-2"
        >
          <span>Explore Personalization</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
