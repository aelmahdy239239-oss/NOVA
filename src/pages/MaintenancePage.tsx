import React, { useState } from 'react';
import { PageTab, ModularComponent } from '../types';
import { 
  Wrench, 
  Cpu, 
  Activity, 
  Zap, 
  ShieldCheck, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  DollarSign,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface MaintenancePageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({ setActiveTab }) => {
  const [selectedModule, setSelectedModule] = useState<string>('motor');

  const modules: ModularComponent[] = [
    {
      id: 'motor',
      name: 'Motor Module',
      description: 'Contains micro-stepper drives and planetary gearboxes powering finger flexure.',
      replacementTime: '4 minutes',
      costSavings: '78% lower than whole palm',
      status: 'Normal',
      iconName: 'Cpu'
    },
    {
      id: 'sensor',
      name: 'Sensor Module',
      description: 'Houses surface EMG electrode contacts and signal conditioning circuitry.',
      replacementTime: '3 minutes',
      costSavings: '85% lower than whole palm',
      status: 'Optimal',
      iconName: 'Activity'
    },
    {
      id: 'power',
      name: 'Power Module',
      description: 'Removable wrist cartridge containing battery cells and safety PMIC.',
      replacementTime: '5 seconds',
      costSavings: '90% lower than whole palm',
      status: 'Normal',
      iconName: 'Zap'
    },
    {
      id: 'shell',
      name: 'Outer Shell',
      description: '3D-printed protective titanium and TPU cosmetic palm casing.',
      replacementTime: '6 minutes',
      costSavings: '82% lower than whole palm',
      status: 'Optimal',
      iconName: 'ShieldCheck'
    },
    {
      id: 'finger',
      name: 'Finger Interface',
      description: 'Quick-release finger linkage joints with high-friction silicone pads.',
      replacementTime: '3 minutes',
      costSavings: '88% lower than whole palm',
      status: 'Optimal',
      iconName: 'Sliders'
    },
    {
      id: 'controller',
      name: 'Controller Board',
      description: 'Embedded ARM microprocessor running adaptive pattern recognition algorithms.',
      replacementTime: '5 minutes',
      costSavings: '70% lower than whole palm',
      status: 'Optimal',
      iconName: 'Cpu'
    }
  ];

  const currentMod = modules.find(m => m.id === selectedModule) || modules[0];

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-xs font-mono text-emerald-400">
          <Wrench className="w-3.5 h-3.5" />
          <span>DECENTRALIZED SERVICE ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Modular Maintenance System
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          <strong className="text-emerald-300">Replace the affected module instead of replacing the entire system.</strong> Traditional prosthetics require shipping the whole device to a centralized factory for weeks. NOVA changes that.
        </p>
      </div>

      {/* Six Replaceable Modules Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-white">
            Six Standard Replaceable Modules
          </h2>
          <p className="text-xs text-slate-400">
            Click any module below to view repair specs and cost savings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => {
            const isSelected = selectedModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setSelectedModule(mod.id)}
                className={`p-5 rounded-2xl text-left transition-all border flex flex-col justify-between h-44 ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-500/50 text-white shadow-xl shadow-emerald-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-emerald-400 font-bold uppercase">
                      Module #{modules.indexOf(mod) + 1}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      mod.status === 'Optimal'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : 'bg-blue-950 text-blue-400 border-blue-800'
                    }`}>
                      {mod.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{mod.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    {mod.replacementTime}
                  </span>
                  <span className="text-emerald-400 font-semibold">{mod.costSavings}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Module Detail Panel */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                SELECTED MODULE DIAGNOSTIC INSPECTOR
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                {currentMod.name}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-bold">
                Swap Time: {currentMod.replacementTime}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-mono text-[10px] block uppercase">Module Purpose</span>
              <p className="text-slate-200 text-sm">{currentMod.description}</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-mono text-[10px] block uppercase">Cost Efficiency</span>
              <p className="text-emerald-400 font-bold text-sm font-mono">{currentMod.costSavings}</p>
              <p className="text-slate-400 text-[11px] mt-1">Avoids replacing working structural frame or electronics.</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-mono text-[10px] block uppercase">Simulated Diagnostic Status</span>
              <p className="text-white font-bold text-sm font-mono flex items-center gap-1.5 mt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Simulated Status: {currentMod.status}</span>
              </p>
            </div>
          </div>

          <p className="text-[11px] text-amber-400 bg-amber-950/40 p-3 rounded-xl border border-amber-900/50">
            All maintenance metrics, replacement times, and diagnostics shown on this page are simulated for demonstration purposes.
          </p>
        </div>

      </div>

    </div>
  );
};
