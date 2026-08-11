import React, { useState } from 'react';
import { PageTab } from '../types';
import { 
  Activity, 
  Cpu, 
  Sliders, 
  Layers, 
  ShieldAlert, 
  Zap, 
  ArrowRight,
  Brain,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface HowItWorksPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ setActiveTab }) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const processStages = [
    {
      id: 0,
      title: 'Muscle Activity',
      subtitle: 'Residual Forearm Signal Generation',
      summary: 'When a user intends to move their hand or close a grip, residual muscles in the forearm contract, emitting microvolt electrical impulses.',
      details: 'When an amputee flexes muscles in their residual limb, motor neurons fire small electrical voltages (10–5000 µV). These natural biological signals are the raw input source for control.',
      icon: Activity,
      techNote: 'Biological Input Source'
    },
    {
      id: 1,
      title: 'Surface EMG Sensors',
      subtitle: 'Non-Invasive Signal Capture',
      summary: 'Surface electromyography (EMG) electrode arrays placed inside the socket gently contact the skin without surgery or implants.',
      details: 'Non-invasive silver-chloride dry electrode nodes embedded in the socket lining filter out environmental electromagnetic noise while detecting faint muscle contractions.',
      icon: Cpu,
      techNote: 'Non-Invasive Hardware'
    },
    {
      id: 2,
      title: 'Signal Processing',
      subtitle: 'Noise Filtering & Amplification',
      summary: 'The raw EMG signal is bandpass filtered, amplified, and digitized by the on-board micro-controller in real time.',
      details: 'High-frequency noise (e.g. skin movement artifact, 60Hz power line hum) is stripped away using digital signal processing algorithms operating at sub-5 millisecond latency.',
      icon: Layers,
      techNote: 'DSP Subsystem'
    },
    {
      id: 3,
      title: 'Adaptive Controller',
      subtitle: 'Gesture Pattern Recognition',
      summary: 'A machine-learning pattern recognition engine maps muscle firing patterns to intended grip profiles (Pinch, Power, Precision).',
      details: 'Instead of requiring rigid threshold flexing, NOVA’s adaptive control algorithm learns the user’s unique muscle firing signatures and adjusts parameters continuously as muscle fatigue develops.',
      icon: Sliders,
      techNote: 'Machine Learning Engine'
    },
    {
      id: 4,
      title: 'Motor System',
      subtitle: 'Precision Actuator Execution',
      summary: 'Compact micro-stepper motors drive finger leadscrews to execute the intended grip speed and force.',
      details: 'Closed-loop encoders provide real-time position and current feedback, preventing excessive crush force on delicate objects while delivering robust power for heavy items.',
      icon: Zap,
      techNote: 'Mechanical Drive'
    },
    {
      id: 5,
      title: 'NOVA Palm Movement',
      subtitle: 'Fluid Real-Time Motion',
      summary: 'The palm responds with smooth, proportional motion matching the user’s intended speed and force.',
      details: 'The end result is an intuitive extension of the user’s intent — enabling confident interaction with everyday objects from coffee cups to tools.',
      icon: CheckCircle2,
      techNote: 'Functional Outcome'
    }
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-xs font-mono text-cyan-400">
          <Activity className="w-3.5 h-3.5" />
          <span>CONCEPTUAL CONTROL ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How NOVA Works
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Understanding the non-invasive, adaptive signal pipeline from forearm muscle contraction to precision motor movement.
        </p>
      </div>

      {/* Prominent Disclaimer Notice */}
      <div className="bg-slate-900 border-2 border-cyan-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-400 mt-1">
            <Brain className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Non-Invasive Surface EMG Technology</span>
              <span className="text-xs font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                Key Clarification
              </span>
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              <strong className="text-cyan-300">NOVA does NOT directly read thoughts or brainwaves.</strong> The conceptual system uses non-invasive surface EMG (Electromyography) sensors that sit gently against the skin to detect tiny electrical impulses naturally produced when residual muscles flex.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Process Flow Pipeline */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">
            End-to-End Signal Pipeline
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Click any stage in the flow diagram below to inspect its technical details.
          </p>
        </div>

        {/* Process Flow Diagram Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800">
          {processStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStage === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`p-3 rounded-xl transition-all text-left flex flex-col justify-between h-28 border ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`}>
                    0{idx + 1}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                </div>

                <div>
                  <div className="text-xs font-bold leading-tight line-clamp-1">{stage.title}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{stage.techNote}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Display Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold font-mono">
                0{activeStage + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {processStages[activeStage].title}
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  {processStages[activeStage].subtitle}
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800 text-xs font-mono">
              {processStages[activeStage].techNote}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-200 text-xs font-mono uppercase text-cyan-400">
                Primary Function
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {processStages[activeStage].summary}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-slate-200 text-xs font-mono uppercase text-cyan-400">
                Technical Mechanism
              </h4>
              <p className="text-slate-300 leading-relaxed">
                {processStages[activeStage].details}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveStage(Math.max(0, activeStage - 1))}
              disabled={activeStage === 0}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs text-white transition-all"
            >
              ← Previous Stage
            </button>

            <span className="text-xs font-mono text-slate-500">
              Stage {activeStage + 1} of {processStages.length}
            </span>

            <button
              onClick={() => setActiveStage(Math.min(processStages.length - 1, activeStage + 1))}
              disabled={activeStage === processStages.length - 1}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-xs font-bold text-slate-950 transition-all"
            >
              Next Stage →
            </button>
          </div>
        </div>

      </div>

      {/* CTA to Explore Technology */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">
          Deep Dive Into NOVA Technology
        </h3>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Explore the exact materials, 3D printing methods, external power modules, and embedded processing hardware that power the NOVA concept.
        </p>
        <button
          onClick={() => setActiveTab('technology')}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all inline-flex items-center gap-2"
        >
          <span>View Technology Stack</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
