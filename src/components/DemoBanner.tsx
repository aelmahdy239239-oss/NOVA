import React from 'react';
import { AlertTriangle, RefreshCw, Activity } from 'lucide-react';

interface DemoBannerProps {
  lastUpdated?: string;
  onRefresh?: () => void;
  onReset?: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ lastUpdated, onRefresh, onReset }) => {
  return (
    <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden my-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-wider text-amber-400 uppercase bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/50">
                DEMO MODE — SIMULATED DATA
              </span>
              {lastUpdated && (
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                  Last simulated update: {lastUpdated}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-300 mt-1.5 leading-snug">
              All device readings, percentages, battery levels, motor telemetry, and sensor data shown on this dashboard are <strong className="text-amber-200">simulated data created for demonstration purposes</strong>. NOVA is a concept project and is not connected to a real prosthetic device.
            </p>
          </div>
        </div>

        {(onRefresh || onReset) && (
          <div className="flex items-center gap-2 shrink-0 self-end md:self-center w-full md:w-auto">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="flex-1 md:flex-none px-3.5 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Simulation</span>
              </button>
            )}
            {onReset && (
              <button
                onClick={onReset}
                className="flex-1 md:flex-none px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-all"
              >
                Reset Demo Data
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
