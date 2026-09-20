import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBanner } from './components/StatsBanner';
import { DashboardPreview } from './components/DashboardPreview';
import { TaskHistoryWidget } from './components/TaskHistoryWidget';
import { FeaturesSection } from './components/FeaturesSection';
import { WorkflowSection } from './components/WorkflowSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SpecsSection } from './components/SpecsSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWidgets } from './components/FloatingWidgets';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <StatsBanner />
        <DashboardPreview />
        <TaskHistoryWidget />
        <FeaturesSection />
        <WorkflowSection />
        <TestimonialsSection />
        <SpecsSection />
        <PricingSection />
        <FaqSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <FloatingWidgets />
    </div>
  );
}
