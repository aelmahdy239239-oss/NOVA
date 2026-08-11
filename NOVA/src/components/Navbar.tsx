import React, { useState } from 'react';
import { PageTab } from '../types';
import { 
  Activity, 
  Cpu, 
  Layers, 
  Zap, 
  Wrench, 
  Info, 
  Sliders, 
  Menu, 
  X, 
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Activity },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'how-it-works', label: 'How It Works', icon: Activity },
    { id: 'technology', label: 'Technology', icon: Cpu },
    { id: 'personalization', label: 'Personalization', icon: Sliders },
    { id: 'power', label: 'Power', icon: Zap },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              N
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xl tracking-wider text-white">NOVA</span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/60 rounded">
                  PALM
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 tracking-tight font-medium hidden sm:block">
                Adaptive Prosthetic Concept
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Open Dashboard</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Concept Disclaimer Header Banner */}
      <div className="bg-slate-950/80 border-t border-b border-slate-800/80 px-4 py-1 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          <strong className="text-slate-200">Concept Project:</strong> Fictional prosthetic technology demonstration — No real medical device connected. All telemetry is simulated.
        </span>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors flex items-center gap-3 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
