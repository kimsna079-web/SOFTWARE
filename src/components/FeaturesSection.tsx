import React, { useState } from 'react';
import { CORE_MODULES } from '../data/mockData';
import { FeatureModule } from '../types';
import { ModuleModal } from './ModuleModal';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<FeatureModule | null>(null);

  return (
    <section id="features" className="py-20 sm:py-28 bg-[#f8fafc] relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl pointer-events-none animate-float-blob" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest text-[#2563eb] uppercase bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full mb-3">
            Core Modules
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            One Tool. Every Need Covered.
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1e3c72] to-[#2563eb] rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Automate the complete Facebook account lifecycle &mdash; from automated phone registration all the way to profile personalization and high-volume business page creation.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CORE_MODULES.map((mod, idx) => {
            const isWideCard = idx >= 6; // Last 2 cards take full width in 2-column or 3-column span
            return (
              <div
                key={mod.id}
                onClick={() => setSelectedModule(mod)}
                className={`group cursor-pointer bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between ${
                  isWideCard ? 'lg:col-span-1 md:col-span-1' : ''
                }`}
                style={{
                  borderColor: undefined
                }}
              >
                {/* Dynamic Bottom Hover Stripe */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"
                  style={{ backgroundColor: mod.color }}
                />

                <div>
                  {/* Icon & Badges */}
                  <div className="flex items-center justify-between mb-5">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                      style={{ 
                        backgroundColor: mod.lightBg,
                        color: mod.color
                      }}
                    >
                      <i className={mod.icon}></i>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {mod.badge && (
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          mod.badge.variant === 'hot' 
                            ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                            : mod.badge.variant === 'pro'
                            ? 'bg-purple-50 text-purple-600 border border-purple-200'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        }`}>
                          {mod.badge.text}
                        </span>
                      )}
                      <span className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2563eb] flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#2563eb] transition-colors mb-2.5">
                    {mod.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {mod.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {mod.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100/80 text-slate-600 group-hover:bg-blue-50 group-hover:text-[#2563eb] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Notice */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            💡 Click any module card to inspect detailed feature specifications and configuration options.
          </p>
        </div>

      </div>

      {/* Module Detail Modal */}
      <ModuleModal 
        module={selectedModule} 
        onClose={() => setSelectedModule(null)} 
      />
    </section>
  );
};
