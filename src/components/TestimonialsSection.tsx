import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#f8fafc] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest text-[#2563eb] uppercase bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            What Our Users Say
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1e3c72] to-[#2563eb] rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            Trusted by active digital marketers, account agencies, and social media managers worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < t.stars ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                    />
                  ))}
                </div>

                <p className="text-sm text-slate-700 italic leading-relaxed mb-6 font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Avatar & Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#1e3c72] to-[#2563eb] text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                  {t.avatarLetter}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
