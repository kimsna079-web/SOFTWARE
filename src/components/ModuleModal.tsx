import React from 'react';
import { X, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { FeatureModule } from '../types';

interface ModuleModalProps {
  module: FeatureModule | null;
  onClose: () => void;
}

export const ModuleModal: React.FC<ModuleModalProps> = ({ module, onClose }) => {
  if (!module) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color accent header bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: module.color }}
        />

        <div className="flex items-start justify-between mb-4 pt-1">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-xs"
              style={{ backgroundColor: module.lightBg, color: module.color }}
            >
              <i className={module.icon}></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {module.title}
                </h3>
                {module.badge && (
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                    module.badge.variant === 'hot' 
                      ? 'bg-rose-100 text-rose-600 border border-rose-200' 
                      : module.badge.variant === 'pro'
                      ? 'bg-purple-100 text-purple-600 border border-purple-200'
                      : 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                  }`}>
                    {module.badge.text}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-slate-400">Core <span className="font-brand font-bold text-slate-600">PRO•SAN</span> Module</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          {module.description}
        </p>

        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            Key Capabilities &amp; Features
          </h4>
          <ul className="space-y-2.5">
            {module.fullDetails?.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {module.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#2563eb] border border-blue-100"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
          >
            Close
          </button>
          <a
            href="https://wa.me/923241703901?text=Hi!+I+want+to+know+more+about+PRO•SAN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#25D366] hover:bg-emerald-600 rounded-xl shadow-md transition-colors"
          >
            <span>Inquire on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
