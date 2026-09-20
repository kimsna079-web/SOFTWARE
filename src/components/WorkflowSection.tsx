import React from 'react';
import { WORKFLOW_STEPS } from '../data/mockData';
import { Settings2, FileSpreadsheet, Play, BarChart3 } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const icons = [Settings2, FileSpreadsheet, Play, BarChart3];

  return (
    <section id="workflow" className="py-20 sm:py-28 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest text-[#2563eb] uppercase bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full mb-3">
            Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How Does It Work?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1e3c72] to-[#2563eb] rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            Get your full automation pipeline running in just 4 simple, intuitive steps.
          </p>
        </div>

        {/* Workflow Steps Grid with Flow Line */}
        <div className="relative">
          {/* Animated Connecting Line (Desktop) */}
          <div 
            className="hidden md:block absolute top-[52px] left-[10%] right-[10%] h-[3px] z-0 opacity-40 animate-flow-line"
            style={{
              background: 'linear-gradient(90deg, transparent, #2563eb, #8b5cf6, transparent)',
              backgroundSize: '200% auto'
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {WORKFLOW_STEPS.map((wf, idx) => {
              const StepIcon = icons[idx];
              return (
                <div 
                  key={wf.step}
                  className="group bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center flex flex-col items-center"
                >
                  {/* Step Number Circle */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1e3c72] to-[#2563eb] text-white flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-blue-500/20 border-4 border-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    {wf.step === 4 ? (
                      <StepIcon className="w-7 h-7" />
                    ) : (
                      wf.step
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {wf.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {wf.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
