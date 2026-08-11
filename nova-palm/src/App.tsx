/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageTab, SimulatedTelemetry } from './types';
import { generateSimulatedTelemetry } from './services/simulation';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { PersonalizationPage } from './pages/PersonalizationPage';
import { PowerPage } from './pages/PowerPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [telemetry, setTelemetry] = useState<SimulatedTelemetry>(() => generateSimulatedTelemetry());

  const handleRefreshSimulation = () => {
    setTelemetry(generateSimulatedTelemetry());
  };

  const handleResetDemoData = () => {
    setTelemetry(generateSimulatedTelemetry());
  };

  // Auto scroll to top when changing views
  const changeTab = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={changeTab} />

        <main className="py-6">
          {activeTab === 'home' && (
            <LandingPage setActiveTab={changeTab} />
          )}

          {activeTab === 'dashboard' && (
            <DashboardPage
              telemetry={telemetry}
              onRefreshSimulation={handleRefreshSimulation}
              onResetDemoData={handleResetDemoData}
            />
          )}

          {activeTab === 'how-it-works' && (
            <HowItWorksPage setActiveTab={changeTab} />
          )}

          {activeTab === 'technology' && (
            <TechnologyPage setActiveTab={changeTab} />
          )}

          {activeTab === 'personalization' && (
            <PersonalizationPage setActiveTab={changeTab} />
          )}

          {activeTab === 'power' && (
            <PowerPage setActiveTab={changeTab} />
          )}

          {activeTab === 'maintenance' && (
            <MaintenancePage setActiveTab={changeTab} />
          )}

          {activeTab === 'about' && (
            <AboutPage setActiveTab={changeTab} />
          )}
        </main>
      </div>

      <Footer setActiveTab={changeTab} />
    </div>
  );
}
