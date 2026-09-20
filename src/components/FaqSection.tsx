import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest text-[#2563eb] uppercase bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full mb-3">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1e3c72] to-[#2563eb] rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg">
            Everything you need to know about getting started, account safety, and proxies.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-[#2563eb] shadow-md bg-blue-50/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isOpen 
                      ? 'bg-[#2563eb] text-white rotate-180' 
                      : 'bg-blue-50 text-[#2563eb]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 animate-in fade-in duration-200">
                    <div className="h-px bg-slate-100 mb-4" />
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#f8fafc] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-slate-900 text-sm">Have a specific question not covered here?</h4>
            <p className="text-xs text-slate-500 mt-0.5">Our support engineers are available on WhatsApp 7 days a week.</p>
          </div>
          <a
            href="https://wa.me/923241703901?text=Hi!+I+have+a+question+about+FBM+Prime"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-100/80 hover:bg-emerald-200/80 rounded-xl transition-colors shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
