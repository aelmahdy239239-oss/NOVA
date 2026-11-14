
import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity, Camera, Database, BrainCircuit, FlaskConical,
  Info, Play, Pause, RotateCcw, Zap, Signal,
  Download, Save, Trash2, CheckCircle2
} from 'lucide-react';

type RecordedSample = {
  id: string;
  timestamp: string;
  label: string;
  source: 'Synthetic';
  rms: number;
  peak: number;
  values: number[];
};
type MotionTrial = {
  id: string;
  label: string;
  startedAt: string;
  endedAt: string;
  durationSeconds: number;
  notes: string;
};

const STORAGE_KEY = 'nova-research-samples-v1';
const MOTION_STORAGE_KEY = 'nova-motion-trials-v1';

const modules = [
  { id: 'signal', number: '01', title: 'Signal Acquisition', subtitle: 'EMG signal input', icon: Activity, description: 'Acquire and visualize muscle activity signals.' },
  { id: 'motion', number: '02', title: 'Motion Recording', subtitle: 'Movement reference', icon: Camera, description: 'Document the intended movement for each trial.' },
  { id: 'dataset', number: '03', title: 'Dataset Management', subtitle: 'Organize recorded trials', icon: Database, description: 'Review, organize, label, and export signal samples.' },
  { id: 'training', number: '04', title: 'Model Training & Evaluation', subtitle: 'Pattern recognition', icon: BrainCircuit, description: 'Train classifiers and evaluate their performance.' }
];

const movementLabels = [
  'Rest',
  'Open Hand',
  'Power Grip',
  'Precision Pinch',
  'Wrist Flexion'
];

export const ResearchLabPage: React.FC = () => {
  const [active, setActive] = useState('signal');
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [phase, setPhase] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState('Rest');
  const [samples, setSamples] = useState<RecordedSample[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [savedNotice, setSavedNotice] = useState(false);
  const [motionLabel, setMotionLabel] = useState('Rest');
const [motionNotes, setMotionNotes] = useState('');
const [motionStartedAt, setMotionStartedAt] = useState<number | null>(null);
const [motionElapsed, setMotionElapsed] = useState(0);

const [motionTrials, setMotionTrials] = useState<MotionTrial[]>(() => {
  try {
    const saved = localStorage.getItem(MOTION_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

  useEffect(() => {
    if (!running) return;

    const timer = window.setInterval(() => {
      setPhase(value => value + 0.12 * speed);
    }, 50);

    return () => window.clearInterval(timer);
  }, [running, speed]);

// Save signal samples
useEffect(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
  } catch {
    console.warn('Could not save NOVA samples in browser storage.');
  }
}, [samples]);

// Save motion trials
useEffect(() => {
  try {
    localStorage.setItem(
      MOTION_STORAGE_KEY,
      JSON.stringify(motionTrials)
    );
  } catch {
    console.warn('Could not save NOVA motion trials.');
  }
}, [motionTrials]);

// Motion recording timer
useEffect(() => {
  if (motionStartedAt === null) return;

  const timer = window.setInterval(() => {
    setMotionElapsed(
      Math.floor((Date.now() - motionStartedAt) / 1000)
    );
  }, 250);

  return () => window.clearInterval(timer);
}, [motionStartedAt]);

  const signalData = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => {
      const t = phase - (119 - i) * 0.12;
      const wave =
        Math.sin(t * 2.2) * 0.48 +
        Math.sin(t * 5.1) * 0.19 +
        Math.sin(t * 9.3) * 0.08 +
        Math.sin(t * 0.7) * 0.12;
      const noise = Math.sin(i * 17.13 + phase * 3.7) * 0.035;
      return Math.max(-1, Math.min(1, wave + noise));
    });
  }, [phase]);

  const currentValue = signalData[signalData.length - 1];
  const rms = Math.sqrt(
    signalData.reduce((sum, value) => sum + value * value, 0) /
    signalData.length
  );
  const peak = Math.max(...signalData.map(value => Math.abs(value)));

  const chartPoints = signalData.map((value, index) => {
    const x = (index / (signalData.length - 1)) * 1000;
    const y = 100 - value * 75;
    return `${x},${y}`;
  }).join(' ');

  const selected = modules.find(item => item.id === active)!;
  const Icon = selected.icon;

  const recordSample = () => {
    const newSample: RecordedSample = {
      id: `NOVA-${Date.now()}`,
      timestamp: new Date().toISOString(),
      label: selectedLabel,
      source: 'Synthetic',
      rms: Number(rms.toFixed(5)),
      peak: Number(peak.toFixed(5)),
      values: [...signalData]
    };

    setSamples(previous => [newSample, ...previous]);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2500);
  };
  
const exportDataset = () => {
  if (samples.length === 0) return;

  const headers = [
    'Sample ID',
    'Timestamp',
    'Movement',
    'Source',
    'RMS',
    'Peak',
    'Signal Values'
  ];

  const escapeCsv = (value: string | number) =>
    `"${String(value).replace(/"/g, '""')}"`;

  const rows = samples.map(sample => [
    sample.id,
    sample.timestamp,
    sample.label,
    sample.source,
    sample.rms,
    sample.peak,
    sample.values.join(';')
  ]);

  const csv = [
    headers.map(escapeCsv).join(','),
    ...rows.map(row => row.map(escapeCsv).join(','))
  ].join('\n');

  const blob = new Blob(
    ['\uFEFF' + csv],
    { type: 'text/csv;charset=utf-8;' }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `nova-dataset-${new Date().toISOString().slice(0, 10)}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

  const deleteSample = (id: string) => {
    setSamples(previous => previous.filter(sample => sample.id !== id));
  };

  const exportMotionTrials = () => {
    if (motionTrials.length === 0) return;

    const headers = [
      'Trial ID',
      'Movement',
      'Started At',
      'Ended At',
      'Duration (seconds)',
      'Notes'
    ];

    const escapeCsv = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const rows = motionTrials.map(trial => [
      trial.id,
      trial.label,
      trial.startedAt,
      trial.endedAt,
      trial.durationSeconds,
      trial.notes
    ]);

    const csv = [
      headers.map(escapeCsv).join(','),
      ...rows.map(row => row.map(escapeCsv).join(','))
    ].join('\n');

    const blob = new Blob(
      ['\uFEFF' + csv],
      { type: 'text/csv;charset=utf-8;' }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `nova-motion-trials-${new Date().toISOString().slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  
const deleteMotionTrial = (id: string) => {
  setMotionTrials(previous =>
    previous.filter(trial => trial.id !== id)
  );
};

const clearMotionTrials = () => {
  if (motionStartedAt !== null) return;

  if (window.confirm('Delete all recorded motion trials? This cannot be undone.')) {
    setMotionTrials([]);
  }
};

  const startMotionTrial = () => {
    if (motionStartedAt !== null) return;

    setMotionElapsed(0);
    setMotionStartedAt(Date.now());
  };

  const finishMotionTrial = () => {
    if (motionStartedAt === null) return;

    const endedAt = Date.now();

    const newTrial: MotionTrial = {
      id: `MOTION-${Date.now()}`,
      label: motionLabel,
      startedAt: new Date(motionStartedAt).toISOString(),
      endedAt: new Date(endedAt).toISOString(),
      durationSeconds: Number(
        ((endedAt - motionStartedAt) / 1000).toFixed(2)
      ),
      notes: motionNotes.trim()
    };

    setMotionTrials(previous => [newTrial, ...previous]);
    setMotionStartedAt(null);
    setMotionElapsed(0);
    setMotionNotes('');
  };

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
                {item.id === 'signal' || item.id === 'dataset'
                  ? 'Interactive Demo'
                  : 'In development'}
              </p>
            </button>
          );
        })}
      </section>

      {/* Signal Acquisition */}
      {active === 'signal' && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8 space-y-6">

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-cyan-500/10 p-3">
                <Activity className="w-6 h-6 text-cyan-300" />
              </div>
              <div>
                <p className="text-xs font-mono text-cyan-400">MODULE 01</p>
                <h2 className="text-xl font-bold text-white">Signal Acquisition</h2>
                <p className="text-xs text-slate-400">Live signal visualization</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-amber-300">SIMULATION MODE</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center gap-3">
              <Signal className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-sm font-semibold text-white">Data Source</p>
                <p className="text-xs text-slate-500">Current input channel</p>
              </div>
            </div>
            <span className="rounded-lg bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
              Synthetic Signal
            </span>
          </div>

          {/* Chart */}
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
              <svg viewBox="0 0 1000 200" className="w-full h-48" preserveAspectRatio="none">
                {[-75, -25, 25, 75].map(y => (
                  <line key={y} x1="0" y1={100 + y} x2="1000" y2={100 + y}
                    stroke="#334155" strokeDasharray="5 7" strokeWidth="1" />
                ))}
                <line x1="0" y1="100" x2="1000" y2="100" stroke="#64748b" strokeWidth="1" />
                <polyline points={chartPoints} fill="none" stroke="#22d3ee"
                  strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex justify-between mt-3 text-[10px] font-mono text-slate-500">
              <span>OLDER SAMPLES</span>
              <span>LIVE WINDOW</span>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Current Amplitude</p>
              <p className="mt-2 text-2xl font-mono font-bold text-cyan-300">{currentValue.toFixed(3)}</p>
              <p className="text-[10px] text-slate-600 mt-1">a.u.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">RMS Amplitude</p>
              <p className="mt-2 text-2xl font-mono font-bold text-blue-300">{rms.toFixed(3)}</p>
              <p className="text-[10px] text-slate-600 mt-1">Root Mean Square · a.u.</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Peak Amplitude</p>
              <p className="mt-2 text-2xl font-mono font-bold text-purple-300">{peak.toFixed(3)}</p>
              <p className="text-[10px] text-slate-600 mt-1">Maximum absolute value · a.u.</p>
            </div>
          </div>

          {/* Controls */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-5">
            <h3 className="font-bold text-white">Acquisition Controls</h3>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => setRunning(value => !value)}
                className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400">
                {running ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Resume</>}
              </button>
              <button onClick={() => setPhase(0)}
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800">
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-3">
                <label className="text-slate-300 font-semibold">Signal Speed</label>
                <span className="font-mono text-cyan-300">{speed.toFixed(1)}x</span>
              </div>
              <input type="range" min="0.5" max="3" step="0.5" value={speed}
                onChange={event => setSpeed(Number(event.target.value))}
                className="w-full accent-cyan-400 cursor-pointer" />
              <div className="flex justify-between text-[10px] text-slate-600 mt-2">
                <span>0.5x</span><span>1.5x</span><span>3.0x</span>
              </div>
            </div>
          </div>

          {/* Recording */}
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 space-y-4">
            <div>
              <h3 className="font-bold text-white">Record a Sample</h3>
              <p className="text-xs text-slate-400 mt-1">
                Capture the current signal window and assign a movement label.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Movement Label
              </label>
              <select value={selectedLabel}
                onChange={event => setSelectedLabel(event.target.value)}
                className="w-full sm:max-w-sm rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white">
                {movementLabels.map(label => (
                  <option key={label} value={label}>{label}</option>
                ))}
              </select>
            </div>

            <button onClick={recordSample}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-colors">
              <Save className="w-4 h-4" />
              Record Sample
            </button>

            {savedNotice && (
              <p className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                Sample saved to Dataset successfully.
              </p>
            )}
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-300">Research Demo — Not Real EMG Data</p>
              <p className="mt-1 text-xs leading-6 text-slate-400">
                This waveform is mathematically generated. Recorded samples are synthetic
                software test data, not measured muscle activity, and must not be used
                to claim real-world model performance.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Dataset Management */}
      {active === 'dataset' && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-cyan-500/10 p-3">
                <Database className="w-6 h-6 text-cyan-300" />
              </div>
              <div>
                <p className="text-xs font-mono text-cyan-400">MODULE 03</p>
                <h2 className="text-xl font-bold text-white">Dataset Management</h2>
                <p className="text-xs text-slate-400">Recorded sample collection</p>
              </div>
            </div>
            <span className="rounded-lg bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-300">
              {samples.length} Samples
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Total Samples</p>
              <p className="mt-2 text-2xl font-bold text-white">{samples.length}</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Movement Classes</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {new Set(samples.map(sample => sample.label)).size}
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Data Source</p>
              <p className="mt-2 text-lg font-bold text-amber-300">Synthetic only</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={exportDataset} disabled={samples.length === 0}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button onClick={() => {
              if (window.confirm('Delete all recorded samples? This cannot be undone.')) {
                setSamples([]);
              }
            }} disabled={samples.length === 0}
              className="flex items-center gap-2 rounded-lg border border-red-500/30 px-4 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/10 disabled:opacity-40 disabled:cursor-not-allowed">
              <Trash2 className="w-4 h-4" /> Clear Dataset
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-950 text-xs uppercase text-slate-500">
                <tr>
                  <th className="p-4">Sample ID</th>
                  <th className="p-4">Movement</th>
                  <th className="p-4">RMS</th>
                  <th className="p-4">Peak</th>
                  <th className="p-4">Source</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {samples.map(sample => (
                  <tr key={sample.id} className="text-slate-300 hover:bg-slate-800/40">
                    <td className="p-4 font-mono text-xs">{sample.id}</td>
                    <td className="p-4 font-semibold text-white">{sample.label}</td>
                    <td className="p-4 font-mono">{sample.rms.toFixed(3)}</td>
                    <td className="p-4 font-mono">{sample.peak.toFixed(3)}</td>
                    <td className="p-4">
                      <span className="rounded bg-amber-500/10 px-2 py-1 text-[10px] text-amber-300">
                        {sample.source}
                      </span>
                    </td>
                    <td className="p-4">
                      <button onClick={() => deleteSample(sample.id)}
                        aria-label={`Delete ${sample.id}`}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-500/10 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {samples.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-slate-500">
                      <Database className="w-8 h-8 mx-auto mb-3 opacity-40" />
                      No samples recorded yet. Go to Signal Acquisition to record your first sample.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-sm font-semibold text-amber-300">Dataset integrity notice</p>
            <p className="mt-1 text-xs leading-6 text-slate-400">
              All entries currently come from the synthetic signal generator.
              Movement labels are manually selected demonstration labels; they
              are not verified physical movements or real EMG ground truth.
              Data is stored locally in this browser.
            </p>
          </div>
        </section>
      )}

      
      {/* Motion Recording */}
      {active === 'motion' && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
            <div className="rounded-xl bg-cyan-500/10 p-3">
              <Camera className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <p className="text-xs font-mono text-cyan-400">MODULE 02</p>
              <h2 className="text-xl font-bold text-white">Motion Recording</h2>
              <p className="text-xs text-slate-400">Manual movement trial recording</p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-sm font-semibold text-amber-300">Manual Recording Mode</p>
            <p className="mt-1 text-xs leading-6 text-slate-400">
              This module records manually selected movement labels and trial
              duration. It does not use a camera or automatically verify movement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Trial Status</p>
              <p className={`mt-2 text-lg font-bold ${motionStartedAt !== null ? 'text-emerald-400' : 'text-slate-300'}`}>
                {motionStartedAt !== null ? 'Recording' : 'Ready'}
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Elapsed Time</p>
              <p className="mt-2 text-2xl font-mono font-bold text-cyan-300">
                {Math.floor(motionElapsed / 60).toString().padStart(2, '0')}:
                {(motionElapsed % 60).toString().padStart(2, '0')}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Movement Label
            </label>
            <select
              value={motionLabel}
              onChange={event => setMotionLabel(event.target.value)}
              disabled={motionStartedAt !== null}
              className="w-full sm:max-w-sm rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white disabled:opacity-50"
            >
              {movementLabels.map(label => (
                <option key={label} value={label}>{label}</option>
              ))}
            </select>
            <p className="mt-2 text-xs text-slate-500">
              Choose the intended movement before starting the trial.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Trial Notes
            </label>
            <textarea
              value={motionNotes}
              onChange={event => setMotionNotes(event.target.value)}
              disabled={motionStartedAt !== null}
              placeholder="Add an optional note about this trial..."
              rows={3}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 disabled:opacity-50"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {motionStartedAt === null ? (
              <button
                onClick={startMotionTrial}
                className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400"
              >
                <Play className="w-4 h-4" />
                Start Trial
              </button>
            ) : (
              <button
                onClick={finishMotionTrial}
                className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400"
              >
                <CheckCircle2 className="w-4 h-4" />
                Finish & Save Trial
              </button>
            )}

            <div className="flex flex-wrap gap-3">
            <button
                onClick={exportMotionTrials}
                disabled={motionTrials.length === 0}
                className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <Download className="w-4 h-4" />
                Export Trials CSV
            </button>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-5 space-y-4">
            
            <div className="flex items-center justify-between gap-3">
            <h3 className="font-bold text-white">Recorded Trials</h3>

            <button
                onClick={clearMotionTrials}
                disabled={motionTrials.length === 0 || motionStartedAt !== null}
                className="flex items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <Trash2 className="w-4 h-4" />
                Clear All
            </button>
            </div>


            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-slate-950 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="p-4">Trial ID</th>
                    <th className="p-4">Movement</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Notes</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {motionTrials.map(trial => (
                    <tr key={trial.id} className="text-slate-300">
                      <td className="p-4 font-mono text-xs">{trial.id}</td>
                      <td className="p-4 font-semibold text-white">{trial.label}</td>
                      <td className="p-4 font-mono">{trial.durationSeconds.toFixed(2)} s</td>
                      <td className="p-4 text-xs">{trial.notes || '—'}</td>

                      <td className="px-4 py-3">
                      <button
                         onClick={() => deleteMotionTrial(trial.id)}
                            className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
                            title="Delete trial"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        </td>

                    </tr>
                  ))}
                  {motionTrials.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-500">
                        No motion trials recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Model Training & Evaluation */}
      {active === 'training' && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
          <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
            <div className="rounded-xl bg-cyan-500/10 p-3">
              <BrainCircuit className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <p className="text-xs font-mono text-cyan-400">MODULE 04</p>
              <h2 className="text-xl font-bold text-white">Model Training & Evaluation</h2>
              <p className="text-xs text-slate-400">Pattern recognition</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-bold text-white">Module objective</h3>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
              Prepare labeled signal data for future classifier training and
              evaluate model performance using appropriate validation methods.
            </p>
          </div>
          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-sm font-semibold text-amber-300">Not connected yet</p>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              No trained classifier or verified real EMG dataset is available.
              Model evaluation will be implemented after reliable data collection.
            </p>
          </div>
        </section>
      )}
    </div>
  );
};