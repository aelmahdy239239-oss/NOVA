import React, { useState } from 'react';
import { SimulatedTelemetry } from '../types';
import { DemoBanner } from '../components/DemoBanner';
import { 
  Battery, 
  Activity, 
  Cpu, 
  Heart, 
  Zap, 
  Clock, 
  Thermometer, 
  ShieldCheck, 
  AlertCircle, 
  Bell, 
  RefreshCw, 
  RotateCcw,
  Sliders,
  CheckCircle2,
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';

interface DashboardPageProps {
  telemetry: SimulatedTelemetry;
  onRefreshSimulation: () => void;
  onResetDemoData: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  telemetry,
  onRefreshSimulation,
  onResetDemoData
}) => {
  const [chartTimeframe, setChartTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  // Colors for Grip Distribution Pie Chart
  const GRIP_COLORS = ['#06b6d4', '#3b82f6', '#6366f1', '#10b981'];

  const gripData = [
    { name: 'Power Grip', value: telemetry.gripPercentages.powerGrip },
    { name: 'Precision Grip', value: telemetry.gripPercentages.precisionGrip },
    { name: 'Pinch Grip', value: telemetry.gripPercentages.pinchGrip },
    { name: 'Open Hand', value: telemetry.gripPercentages.openHand },
  ];

  // Usage statistics chart data
  const weeklyData = [
    { day: 'Mon', hours: telemetry.weeklyUsageHours[0] },
    { day: 'Tue', hours: telemetry.weeklyUsageHours[1] },
    { day: 'Wed', hours: telemetry.weeklyUsageHours[2] },
    { day: 'Thu', hours: telemetry.weeklyUsageHours[3] },
    { day: 'Fri', hours: telemetry.weeklyUsageHours[4] },
    { day: 'Sat', hours: telemetry.weeklyUsageHours[5] },
    { day: 'Sun', hours: telemetry.weeklyUsageHours[6] },
  ];

  const dailyData = [
    { hour: '8 AM', hours: (telemetry.dailyUsageHours * 0.1).toFixed(1) },
    { hour: '10 AM', hours: (telemetry.dailyUsageHours * 0.25).toFixed(1) },
    { hour: '12 PM', hours: (telemetry.dailyUsageHours * 0.35).toFixed(1) },
    { hour: '2 PM', hours: (telemetry.dailyUsageHours * 0.2).toFixed(1) },
    { hour: '4 PM', hours: (telemetry.dailyUsageHours * 0.1).toFixed(1) },
  ];

  const monthlyData = telemetry.monthlyUsageHours.map((val, idx) => ({
    day: `Day ${idx + 1}`,
    hours: val
  }));

  const activeUsageData = 
    chartTimeframe === 'daily' ? dailyData :
    chartTimeframe === 'weekly' ? weeklyData : monthlyData;

  const xAxisKey = chartTimeframe === 'daily' ? 'hour' : 'day';

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              NOVA Dashboard
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Connected — Simulation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time simulated telemetry engine for the NOVA adaptive prosthetic palm concept.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefreshSimulation}
            className="px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Simulation</span>
          </button>

          <button
            onClick={onResetDemoData}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Mandatory Demo Mode Disclaimer Banner */}
      <DemoBanner
        lastUpdated={telemetry.lastUpdated}
        onRefresh={onRefreshSimulation}
        onReset={onResetDemoData}
      />

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Battery */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>POWER MODULE</span>
            <span className="text-amber-400 font-semibold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">
              Simulated
            </span>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-white font-mono">
              {telemetry.battery}%
            </div>
            <Battery className={`w-6 h-6 ${telemetry.battery < 30 ? 'text-amber-400' : 'text-emerald-400'}`} />
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                telemetry.battery < 30 ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
              style={{ width: `${telemetry.battery}%` }}
            />
          </div>
        </div>

        {/* Estimated Runtime */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>RUNTIME EST.</span>
            <span className="text-amber-400 font-semibold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">
              Simulated
            </span>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-cyan-300 font-mono">
              {telemetry.estimatedRuntimeHours}h
            </div>
            <Clock className="w-6 h-6 text-cyan-400" />
          </div>
          <p className="text-[11px] text-slate-400">
            Est. remaining operational time
          </p>
        </div>

        {/* EMG Signal Quality */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>EMG SIGNAL</span>
            <span className="text-amber-400 font-semibold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">
              Simulated
            </span>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-blue-300 font-mono">
              {telemetry.emgQuality}%
            </div>
            <Activity className="w-6 h-6 text-blue-400" />
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-400 transition-all duration-500"
              style={{ width: `${telemetry.emgQuality}%` }}
            />
          </div>
        </div>

        {/* Motor Health */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>MOTOR HEALTH</span>
            <span className="text-amber-400 font-semibold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">
              Simulated
            </span>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-indigo-300 font-mono">
              {telemetry.motorHealth}%
            </div>
            <Cpu className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-400 transition-all duration-500"
              style={{ width: `${telemetry.motorHealth}%` }}
            />
          </div>
        </div>

        {/* System Health */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>SYSTEM HEALTH</span>
            <span className="text-amber-400 font-semibold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">
              Simulated
            </span>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-emerald-300 font-mono">
              {telemetry.systemHealth}%
            </div>
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-500"
              style={{ width: `${telemetry.systemHealth}%` }}
            />
          </div>
        </div>

      </div>

      {/* Usage Charts & Grip Distribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Usage Statistics Chart (2 cols on desktop) */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Usage Statistics</h3>
              </div>
              <p className="text-xs font-mono text-amber-400 mt-0.5">
                Simulated usage data
              </p>
            </div>

            {/* Timeframe selector buttons */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['daily', 'weekly', 'monthly'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setChartTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all capitalize ${
                    chartTimeframe === tf
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeUsageData}>
                <XAxis dataKey={xAxisKey} stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} unit="h" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                  formatter={(val: number) => [`${val} hrs`, 'Simulated Active Use']}
                />
                <Bar dataKey="hours" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>Average simulated daily activity: ~{telemetry.dailyUsageHours} hrs</span>
            <span className="text-cyan-400 font-mono">DEMO TELEMETRY</span>
          </div>
        </div>

        {/* Grip Statistics Donut Chart */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Grip Statistics</h3>
            </div>
            <p className="text-xs font-mono text-amber-400 mt-0.5">
              Simulated grip activity (Sum = 100%)
            </p>
          </div>

          <div className="h-52 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gripData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {gripData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={GRIP_COLORS[index % GRIP_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                  formatter={(val: number) => [`${val}%`, 'Simulated Ratio']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Grip Breakdown List */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
            {gripData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: GRIP_COLORS[idx] }} />
                <div className="truncate">
                  <div className="text-slate-300 font-medium truncate">{item.name}</div>
                  <div className="text-white font-mono font-bold">{item.value}%</div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Sensor & Motor Telemetry Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Sensor Status */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Sensor Array Telemetry
            </h3>
            <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
              Simulated
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">EMG Surface Array</div>
                <div className="text-slate-400 text-[11px]">Residual forearm activation nodes</div>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-bold border border-emerald-800">
                  {telemetry.sensorStatus.emgStatus}
                </span>
                <div className="text-slate-400 text-[11px] mt-1 font-mono">
                  Signal Quality: {telemetry.sensorStatus.emgQuality}%
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Calibration Profile</div>
                <div className="text-slate-400 text-[11px]">Adaptive user gesture baseline</div>
              </div>
              <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] border ${
                telemetry.sensorStatus.emgCalibration === 'Up to date'
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                  : 'bg-amber-950 text-amber-400 border-amber-800'
              }`}>
                {telemetry.sensorStatus.emgCalibration}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Spatial Motion Sensors</div>
                <div className="text-slate-400 text-[11px]">6-DOF IMU orientation matrix</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 font-mono font-bold border border-blue-800">
                {telemetry.sensorStatus.motionStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Motor Status */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              Motor Drive Telemetry
            </h3>
            <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
              Simulated
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Actuator System</div>
                <div className="text-slate-400 text-[11px]">Micro-stepper finger drives</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono font-bold border border-emerald-800">
                {telemetry.motorStatus.status}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Actuator Performance</div>
                <div className="text-slate-400 text-[11px]">Torque & response index</div>
              </div>
              <span className="font-mono font-bold text-indigo-300 text-sm">
                {telemetry.motorStatus.performance}%
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Thermal Index</div>
                <div className="text-slate-400 text-[11px]">Safe operating range: 25–45 °C</div>
              </div>
              <div className="flex items-center gap-1.5 font-mono font-bold text-slate-200 text-sm">
                <Thermometer className="w-4 h-4 text-rose-400" />
                <span>{telemetry.motorStatus.temperature} °C</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic text-center">
            Simulated engineering data — not real device telemetry.
          </p>
        </div>

      </div>

      {/* Maintenance & Notifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Maintenance Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              Maintenance & Diagnostics
            </h3>
            <span className="text-[11px] font-mono text-amber-400">
              All maintenance info simulated
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[11px]">System Health</div>
              <div className="text-emerald-400 font-bold font-mono text-sm mt-1">
                {telemetry.maintenanceStatus.systemHealth}
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[11px]">Sensor Calibration</div>
              <div className="text-slate-200 font-bold font-mono text-sm mt-1">
                {telemetry.maintenanceStatus.sensorCalibration}
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[11px]">Motor Inspection</div>
              <div className="text-amber-400 font-bold font-mono text-sm mt-1">
                {telemetry.maintenanceStatus.motorInspection}
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[11px]">Power Module</div>
              <div className="text-emerald-400 font-bold font-mono text-sm mt-1">
                {telemetry.maintenanceStatus.powerModule}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Feed */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              Simulated System Notifications
            </h3>
            <span className="text-[10px] font-mono font-bold bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-800">
              SIMULATED
            </span>
          </div>

          <div className="space-y-2.5">
            {telemetry.notifications.map((notif) => (
              <div
                key={notif.id}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs"
              >
                <div className="mt-0.5 shrink-0">
                  {notif.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400" />}
                  {notif.type === 'info' && <Bell className="w-4 h-4 text-cyan-400" />}
                  {notif.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-slate-200 leading-snug">{notif.message}</p>
                  <p className="text-[10px] font-mono text-slate-500 mt-1">{notif.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
