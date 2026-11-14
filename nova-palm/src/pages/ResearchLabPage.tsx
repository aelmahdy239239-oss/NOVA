
import React, { useState } from 'react';
import {
  Activity,
  Camera,
  Database,
  BrainCircuit,
  FlaskConical,
  Info
} from 'lucide-react';

const modules = [
  {
    id: 'signal',
    number: '01',
    title: 'Signal Acquisition',
    subtitle: 'EMG signal input',
    icon: Activity,
    description: 'Acquire and visualize muscle activity signals, monitor signal quality, and select the input source.'
  },
  {
    id: 'motion',
    number: '02',
    title: 'Motion Recording',
    subtitle: 'Movement reference',
    icon: Camera,
    description: 'Document the intended movement for each trial to create reliable labels for collected signals.'
  },
  {
    id: 'dataset',
    number: '03',
    title: 'Dataset Management',
    subtitle: 'Organize recorded trials',
    icon: Database,
    description: 'Review, organize, label, and export signal samples before model development.'
  },
  {
    id: 'training',
    number: '04',
    title: 'Model Training & Evaluation',
    subtitle: 'Pattern recognition',
    icon: BrainCircuit,
    description: 'Train classifiers and evaluate their performance using separate test data.'
  }
];

export const ResearchLabPage: React.FC = () => {
  const [active, setActive] = useState('signal');
  const selected = modules.find(item => item.id === active)!;
  const Icon = selected.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
      <section className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 to-blue-950/60 p-6 sm:p-9">
        <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
          <FlaskConical className="w-4 h-4" />
          NOVA RESEARCH ENVIRONMENT
        </div>
        <h1 className="mt-4 text-4xl font-extrabold text-white">
          Research <span className="text-cyan-400">Lab</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
          A research workspace for the future sEMG control pipeline,
          from signal collection to dataset preparation and model evaluation.
        </p>
        <div className="mt-5 flex items-start gap-2 text-xs text-amber-300">
          <Info className="w-4 h-4 shrink-0" />
          No real sEMG hardware or trained model is connected yet.
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {modules.map(item => {
          const ItemIcon = item.icon;
          const activeModule = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`rounded-2xl border p-5 text-left transition-all ${
                activeModule
                  ? 'border-cyan-400/50 bg-cyan-500/10'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-600'
              }`}
            >
              <div className="flex justify-between">
                <span className="font-mono text-xs text-slate-500">
                  {item.number} / 04
                </span>
                <ItemIcon className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="mt-5 font-bold text-white">{item.title}</h2>
              <p className="mt-2 text-xs text-slate-400">{item.subtitle}</p>
              <p className="mt-4 text-[10px] uppercase tracking-wider text-amber-300">
                In development
              </p>
            </button>
          );
        })}
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
          <div className="rounded-xl bg-cyan-500/10 p-3">
            <Icon className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <p className="text-xs font-mono text-cyan-400">
              MODULE {selected.number}
            </p>
            <h2 className="text-xl font-bold text-white">
              {selected.title}
            </h2>
            <p className="text-xs text-slate-400">{selected.subtitle}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-white">Module objective</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
            {selected.description}
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
          <p className="text-sm font-semibold text-cyan-300">
            Hardware integration
          </p>
          <p className="mt-2 text-xs leading-6 text-slate-400">
            Real sEMG input requires a compatible, safely isolated acquisition
            device. The existing micro:bit demo is a separate motion-sensor
            demonstration, not an EMG source.
          </p>
        </div>
      </section>
    </div>
  );
};