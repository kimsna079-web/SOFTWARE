import React from 'react';
import { MIN_SPECS, REC_SPECS } from '../data/mockData';
import { Cpu, Rocket, Check, AlertCircle } from 'lucide-react';

export const SpecsSection: React.FC = () => {
  return (
    <section id="specs" className="py-20 sm:py-28 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest text-[#2563eb] uppercase bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full mb-3">
            System Requirements
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How Powerful Does Your PC Need to Be?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1e3c72] to-[#2563eb] rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            <strong className="font-brand text-slate-900 font-bold tracking-wide">PRO•SAN</strong> controls authentic Chrome browser instances via Playwright for 100% stealth. A decent multi-core Windows machine is recommended.
          </p>
        </div>

        {/* Spec Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Minimum Requirements */}
          <div className="bg-[#f8fafc] rounded-2xl p-7 sm:p-8 border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1e3c72] uppercase tracking-wider">
                  Minimum Requirements
                </h3>
                <span className="text-xs text-slate-500 font-medium">Suitable for 1-5 concurrent browser windows</span>
              </div>
            </div>

            <div className="divide-y divide-slate-200/80 text-sm">
              {MIN_SPECS.map((row, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-1">
                  <span className="text-slate-500 font-medium">{row.label}</span>
                  <span className={`font-semibold ${row.highlight ? 'text-emerald-600 font-bold' : 'text-slate-800'}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Requirements */}
          <div className="bg-white rounded-2xl p-7 sm:p-8 border-2 border-[#2563eb] shadow-xl shadow-blue-500/5 hover:shadow-2xl transition-all duration-300 relative">
            <span className="absolute -top-3 right-6 bg-[#2563eb] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
              Optimal Performance
            </span>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#2563eb] uppercase tracking-wider">
                  Recommended Requirements
                </h3>
                <span className="text-xs text-slate-500 font-medium">Built for 10-25 concurrent multi-window threads</span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              {REC_SPECS.map((row, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-1">
                  <span className="text-slate-500 font-medium">{row.label}</span>
                  <span className={`font-semibold ${row.highlight ? 'text-emerald-600 font-bold' : 'text-slate-900'}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* VPS Note */}
        <div className="mt-8 p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong>Running 24/7 Autonomously?</strong> For non-stop account generation and scheduled page publishing without keeping your home laptop on, <span className="font-brand font-bold text-slate-900">PRO•SAN</span> runs seamlessly on any standard Windows Server 2019/2022 VPS (4 vCPUs / 8GB RAM).
          </div>
        </div>

      </div>
    </section>
  );
};
