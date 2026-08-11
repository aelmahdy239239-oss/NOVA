import React from 'react';
import novaModularPower from '../assets/images/nova_modular_power_1786449247752.jpg';
import { PageTab } from '../types';
import { 
  Zap, 
  Battery, 
  ArrowDown, 
  ShieldAlert, 
  RefreshCw, 
  CheckCircle2, 
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';

interface PowerPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const PowerPage: React.FC<PowerPageProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-xs font-mono text-amber-400">
          <Zap className="w-3.5 h-3.5" />
          <span>SWAPPABLE ENERGY ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          External Power System
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          The concept uses a removable external power module so the user does not need to wait for the prosthetic palm itself to recharge.
        </p>
      </div>

      {/* Visual Diagram Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-white">
            Power Flow Architecture
          </h2>
          <p className="text-xs text-slate-400">
            Hot-swappable energy pipeline designed for zero prosthetic downtime.
          </p>
        </div>

        {/* 4-Stage Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          
          {/* Stage 1 */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center space-y-3 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold font-mono">
              01
            </div>
            <h3 className="text-base font-bold text-white">NOVA Palm</h3>
            <p className="text-xs text-slate-400">
              Low-power micro-actuator and controller chassis.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center text-cyan-400">
            <ArrowDown className="w-6 h-6 -rotate-90" />
          </div>

          {/* Stage 2 */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/50 text-center space-y-3 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-mono">
              02
            </div>
            <h3 className="text-base font-bold text-white">External Power Module</h3>
            <p className="text-xs text-slate-400">
              Wrist-mounted quick-release battery housing.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center text-amber-400">
            <ArrowDown className="w-6 h-6 -rotate-90" />
          </div>

          {/* Stage 3 */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center space-y-3 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold font-mono">
              03
            </div>
            <h3 className="text-base font-bold text-white">Swappable Battery</h3>
            <p className="text-xs text-slate-400">
              Compact high-density LiFePO4 cartridge.
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center text-blue-400">
            <ArrowDown className="w-6 h-6 -rotate-90" />
          </div>

          {/* Stage 4 */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center space-y-3 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold font-mono">
              04
            </div>
            <h3 className="text-base font-bold text-white">Charging Dock</h3>
            <p className="text-xs text-slate-400">
              Dual-slot desktop charger for spare modules.
            </p>
          </div>

        </div>

        {/* CAD Render Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-4 border-t border-slate-800">
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 relative">
            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded border border-slate-800 text-[11px] text-slate-300 font-mono">
              3D CAD Model: Swappable Power Module & Charging Bay
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 relative">
  <img
    src={novaModularPower}
    alt="NOVA Swappable External Power Module CAD Render"
    referrerPolicy="no-referrer"
    className="w-full h-80 object-cover object-center"
  />
</div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              Why External Swappable Power?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Most conventional robotic prosthetics force the user to plug a cable directly into their arm when the battery dies, immobilizing the hand for 2 to 4 hours.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              NOVA places the battery in a light, ergonomic wrist module that snaps out in seconds. A charged spare cartridge can be inserted immediately, keeping the palm fully active throughout the day.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Swap Time</span>
                <span className="text-cyan-400 font-bold">&lt; 5 seconds</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Chemistry</span>
                <span className="text-white font-bold">LiFePO4 Safe Cells</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Mandatory Power Disclaimers Notice */}
      <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-3 text-amber-400 font-bold">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>Physics & Energy Disclaimers</span>
        </div>
        <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-mono font-bold">•</span>
            <span><strong>No Infinite Power:</strong> NOVA requires electrical energy to operate its actuators and micro-controller. It does not possess infinite power or perpetual motion.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-mono font-bold">•</span>
            <span><strong>Requires Battery Replacement:</strong> Continuous operation requires having charged replacement power modules ready. The device will cease motor function if all power modules are fully discharged.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-mono font-bold">•</span>
            <span><strong>Simulated Power Telemetry:</strong> Battery percentages shown on the NOVA dashboard are simulated data for demonstration purposes only.</span>
          </li>
        </ul>
      </div>

    </div>
  );
};
