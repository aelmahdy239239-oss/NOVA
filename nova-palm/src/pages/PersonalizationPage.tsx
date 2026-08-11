import React, { useState } from 'react';
import { PageTab } from '../types';
import { 
  Sliders, 
  Scan, 
  Box, 
  Printer, 
  Wrench, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  FileText
} from 'lucide-react';

interface PersonalizationPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const PersonalizationPage: React.FC<PersonalizationPageProps> = ({ setActiveTab }) => {
  // Simulator state
  const [handWidth, setHandWidth] = useState<number>(85); // mm
  const [forearmCircumference, setForearmCircumference] = useState<number>(240); // mm
  const [gripForce, setGripForce] = useState<'Light' | 'Standard' | 'Heavy'>('Standard');
  const [shellFinish, setShellFinish] = useState<'Matte Black Titanium' | 'Stealth Carbon Fiber' | 'Clinical White Composite'>('Matte Black Titanium');

  const steps = [
    {
      num: '01',
      title: 'User Assessment',
      description: 'Physical evaluation by a prosthetist to record limb length, active residual muscle groups, and daily activity requirements.',
      icon: Activity
    },
    {
      num: '02',
      title: '3D Scan',
      description: 'Non-invasive optical 3D scanning captures sub-millimeter topography of the residual limb socket site.',
      icon: Scan
    },
    {
      num: '03',
      title: 'Personalized CAD',
      description: 'Parametric CAD software automatically adapts the internal titanium lattice frame and socket to match the 3D scan.',
      icon: Box
    },
    {
      num: '04',
      title: '3D Printing',
      description: 'Selective Laser Sintering (SLS) additive manufacturing prints the titanium skeleton and biocompatible outer shell.',
      icon: Printer
    },
    {
      num: '05',
      title: 'Assembly',
      description: 'Modular actuators, dry EMG sensor pads, and the external power bay are snapped into the custom chassis.',
      icon: Wrench
    },
    {
      num: '06',
      title: 'EMG Calibration',
      description: 'The user performs a 10-minute adaptive gesture training session to calibrate the control software to their muscle signals.',
      icon: Sliders
    },
    {
      num: '07',
      title: 'Personalized NOVA',
      description: 'The complete, custom-fitted NOVA Palm is delivered, optimized for the user’s exact anatomy and grip habits.',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-xs font-mono text-cyan-400">
          <Sliders className="w-3.5 h-3.5" />
          <span>INDIVIDUALIZED ANATOMICAL DESIGN</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          3D Personalization Pipeline
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Prosthetic technology should adapt to the human body — not the other way around. NOVA rejects the "one-size-fits-all" standard.
        </p>
      </div>

      {/* Process Flow Timeline */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl font-bold text-white">
            Seven-Step Personalization Flow
          </h2>
          <p className="text-xs text-slate-400">
            From clinical scan to calibrated daily use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-slate-950 p-5 rounded-2xl border border-slate-800/90 space-y-3 relative group hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-900">
                    {step.num}
                  </span>
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive CAD Spec & Fitting Simulator */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h2 className="text-2xl font-extrabold text-white">
                Interactive Personalization Configurator
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Simulate adjusting anatomical dimensions and material specs to generate a personalized CAD summary.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-mono">
            Simulated CAD Generator
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Controls */}
          <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            
            {/* Hand Width */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-200">Palm Width Measurement</label>
                <span className="font-mono text-cyan-400">{handWidth} mm</span>
              </div>
              <input
                type="range"
                min={70}
                max={105}
                value={handWidth}
                onChange={(e) => setHandWidth(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>70mm (Small)</span>
                <span>85mm (Medium)</span>
                <span>105mm (Large)</span>
              </div>
            </div>

            {/* Forearm Circumference */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-200">Forearm Socket Circumference</label>
                <span className="font-mono text-cyan-400">{forearmCircumference} mm</span>
              </div>
              <input
                type="range"
                min={180}
                max={320}
                value={forearmCircumference}
                onChange={(e) => setForearmCircumference(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Grip Force Profile */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200 block">
                Target Actuator Grip Profile
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['Light', 'Standard', 'Heavy'] as const).map((gf) => (
                  <button
                    key={gf}
                    onClick={() => setGripForce(gf)}
                    className={`py-2 px-3 rounded-lg font-medium transition-all border ${
                      gripForce === gf
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {gf}
                  </button>
                ))}
              </div>
            </div>

            {/* Shell Finish */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200 block">
                Outer Shell Material Finish
              </label>
              <div className="space-y-2 text-xs">
                {(['Matte Black Titanium', 'Stealth Carbon Fiber', 'Clinical White Composite'] as const).map((sf) => (
                  <button
                    key={sf}
                    onClick={() => setShellFinish(sf)}
                    className={`w-full text-left py-2 px-3 rounded-lg font-medium transition-all border flex items-center justify-between ${
                      shellFinish === sf
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{sf}</span>
                    {shellFinish === sf && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Generated CAD Summary Spec Sheet */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Generated CAD Specification</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                PASSED SIMULATION
              </span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-slate-900">
                <span className="text-slate-400">Palm Size Index</span>
                <span className="text-white font-bold">{handWidth} mm (Custom Fit)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-900">
                <span className="text-slate-400">Socket Volume</span>
                <span className="text-white font-bold">{((forearmCircumference * 12) / 10).toFixed(0)} cc</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-900">
                <span className="text-slate-400">Calculated Weight</span>
                <span className="text-cyan-300 font-bold">{(280 + (handWidth * 0.8)).toFixed(0)} grams</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-900">
                <span className="text-slate-400">Actuator Power Setting</span>
                <span className="text-white font-bold">{gripForce} ({gripForce === 'Heavy' ? '65 N' : gripForce === 'Standard' ? '45 N' : '28 N'})</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-900">
                <span className="text-slate-400">Selected Material</span>
                <span className="text-white font-bold">{shellFinish}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-900">
                <span className="text-slate-400">Estimated SLS Print Time</span>
                <span className="text-slate-300">~6 hours 20 mins</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400">
              This interactive tool demonstrates how NOVA’s parametric CAD engine generates bespoke manufacturing files directly from 3D anatomical scan data.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
