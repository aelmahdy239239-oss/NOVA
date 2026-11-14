
import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Camera,
  Database,
  BrainCircuit,
  FlaskConical,
  Info,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Signal
} from 'lucide-react';

const modules = [
  {
    id: 'signal',
    number: '01',
    title: 'Signal Acquisition',
    subtitle: 'EMG signal input',
    icon: Activity,
    description: 'Acquire and visualize muscle activity signals.'
  },
  {
    id: 'motion',
    number: '02',
    title: 'Motion Recording',
    subtitle: 'Movement reference',
    icon: Camera,
    description: 'Document the intended movement for each trial.'
  },
  {
    id: 'dataset',
    number: '03',
    title: 'Dataset Management',
    subtitle: 'Organize recorded trials',
    icon: Database,
    description: 'Review, organize, label, and export signal samples.'
  },
  {
    id: 'training',
    number: '04',
    title: 'Model Training & Evaluation',
    subtitle: 'Pattern recognition',
    icon: BrainCircuit,
    description: 'Train classifiers and evaluate their performance.'
  }
];

export const ResearchLabPage: React.FC = () => {
  const [active, setActive] = useState('signal');
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!running) return;

    const timer = window.setInterval(() => {
      setPhase(value => value + 0.12 * speed);
    }, 50);

    return () => window.clearInterval(timer);
  }, [running, speed]);

  const signalData = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => {
      const t = phase - (119 - i) * 0.12;
      const wave =
        Math.sin(t * 2.2) * 0.48 +
        Math.sin(t * 5.1) * 0.19 +
        Math.sin(t * 9.3) * 0.08 +
        Math.sin(t * 0.7) * 0.12;

      const noise =
        Math.sin(i * 17.13 + phase * 3.7) * 0.035;

      return Math.max(-1, Math.min(1, wave + noise));
    });
  }, [phase]);

  const currentValue = signalData[signalData.length - 1];

  const rms = Math.sqrt(
    signalData.reduce((sum, value) => sum + value * value, 0) /
    signalData.length
  );

  const peak = Math.max(...signalData.map(value => Math.abs(value)));

  const chartPoints = signalData
    .map((value, index) => {
      const x = (index / (signalData.length - 1)) * 1000;
      const y = 100 - value * 75;
      return `${x},${y}`;
    })
    .join(' ');

  const selected = modules.find(item => item.id === active)!;
  const Icon = selected.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">

      {/* Header */}
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

      {/* Module Navigation */}
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
                {item.id === 'signal' ? 'Interactive Demo' : 'In development'}
              </p>
            </button>
          );
        })}
      </section>

      {/* Selected Module */}
      {active === 'signal' ? (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8 space-y-6">

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-cyan-500/10 p-3">
                <Activity className="w-6 h-6 text-cyan-300" />
              </div>
              <div>
                <p className="text-xs font-mono text-cyan-400">
                  MODULE 01
                </p>
                <h2 className="text-xl font-bold text-white">
                  Signal Acquisition
                </h2>
                <p className="text-xs text-slate-400">
                  Live signal visualization
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-amber-300">
                SIMULATION MODE
              </span>
            </div>
          </div>

          {/* Data Source */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center gap-3">
              <Signal className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-sm font-semibold text-white">Data Source</p>
                <p className="text-xs text-slate-500">
                  Current input channel
                </p>
              </div>
            </div>

            <span className="rounded-lg bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
              Synthetic Signal
            </span>
          </div>

          {/* Signal Chart */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="font-bold text-white">Signal Monitor</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Synthetic waveform · Arbitrary units (a.u.)
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-cyan-300">
                <Zap className="w-4 h-4" />
                {running ? 'Streaming' : 'Paused'}
              </div>
            </div>

            <div className="w-full overflow-hidden rounded-xl bg-slate-900/70">
              <svg
                viewBox="0 0 1000 200"
                className="w-full h-48"
                preserveAspectRatio="none"
              >
                {[-75, -25, 25, 75].map(y => (
                  <line
                    key={y}
                    x1="0"
                    y1={100 + y}
                    x2="1000"
                    y2={100 + y}
                    stroke="#334155"
                    strokeDasharray="5 7"
                    strokeWidth="1"
                  />
                ))}

                <line
                  x1="0"
                  y1="100"
                  x2="1000"
                  y2="100"
                  stroke="#64748b"
                  strokeWidth="1"
                />

                <polyline
                  points={chartPoints}
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex justify-between mt-3 text-[10px] font-mono text-slate-500">
              <span>OLDER SAMPLES</span>
              <span>LIVE WINDOW</span>
            </div>
          </div>

          {/* Signal Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Current Amplitude</p>
              <p className="mt-2 text-2xl font-mono font-bold text-cyan-300">
                {currentValue.toFixed(3)}
              </p>
              <p className="text-[10px] text-slate-600 mt-1">a.u.</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">RMS Amplitude</p>
              <p className="mt-2 text-2xl font-mono font-bold text-blue-300">
                {rms.toFixed(3)}
              </p>
              <p className="text-[10px] text-slate-600 mt-1">
                Root Mean Square · a.u.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Peak Amplitude</p>
              <p className="mt-2 text-2xl font-mono font-bold text-purple-300">
                {peak.toFixed(3)}
              </p>
              <p className="text-[10px] text-slate-600 mt-1">
                Maximum absolute value · a.u.
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-5">
            <h3 className="font-bold text-white">Acquisition Controls</h3>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setRunning(value => !value)}
                className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
              >
                {running ? (
                  <><Pause className="w-4 h-4" /> Pause</>
                ) : (
                  <><Play className="w-4 h-4" /> Resume</>
                )}
              </button>

              <button
                onClick={() => {
                  setRunning(false);
                  setPhase(0);
                  setRunning(true);
                }}
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-3">
                <label className="text-slate-300 font-semibold">
                  Signal Speed
                </label>
                <span className="font-mono text-cyan-300">
                  {speed.toFixed(1)}x
                </span>
              </div>

              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={speed}
                onChange={event => setSpeed(Number(event.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-slate-600 mt-2">
                <span>0.5x</span>
                <span>1.5x</span>
                <span>3.0x</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-300">
                Research Demo — Not Real EMG Data
              </p>
              <p className="mt-1 text-xs leading-6 text-slate-400">
                This waveform is mathematically generated for interface
                development and software testing. It does not represent
                measured muscle activity and cannot be used for medical
                decisions or model training.
              </p>
            </div>
          </div>
        </section>
      ) : (
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
              Module status
            </p>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              This module is not implemented yet. It will be connected to
              the signal acquisition workflow in a future development step.
            </p>
          </div>
        </section>
      )}
    </div>
  );
};