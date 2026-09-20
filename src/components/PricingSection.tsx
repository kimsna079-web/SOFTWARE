import React from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { Check, ShieldCheck, Lock, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#f8fafc] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest text-[#2563eb] uppercase bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full mb-3">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            One Premium Plan. Flexible Durations.
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1e3c72] to-[#2563eb] rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            Every plan includes 100% unlocked access to all modules, multi-window browser threads, and priority customer updates.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const waUrl = `https://wa.me/923241703901?text=${encodeURIComponent(plan.whatsappText)}`;
            
            return (
              <div 
                key={plan.id}
                className={`bg-white rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular 
                    ? 'border-2 border-[#2563eb] shadow-2xl shadow-blue-500/10 md:-translate-y-2 bg-gradient-to-b from-white to-blue-50/30' 
                    : 'border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <span>⭐</span>
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  {/* Title & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-700 text-base">
                      {plan.name}
                    </h3>
                    {plan.saveBadge && (
                      <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                        {plan.saveBadge}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-0.5 mb-1">
                    <span className="text-2xl font-bold text-slate-500">$</span>
                    <span className="font-display font-extrabold text-5xl sm:text-6xl text-slate-900 tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-lg font-bold text-slate-500">{plan.cents}</span>
                  </div>

                  <div className="text-xs sm:text-sm font-medium text-slate-500 mb-6">
                    {plan.billingPeriod}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 pt-4 border-t border-slate-100 text-sm">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-slate-600">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Purchase Button */}
                <div>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-all shadow-xs ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white hover:from-[#18305c] hover:to-[#1d4ed8] shadow-blue-500/20 shadow-md hover:shadow-lg'
                        : 'border-2 border-[#2563eb] text-[#2563eb] hover:bg-blue-50'
                    }`}
                  >
                    <span>Get {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-12 text-slate-600 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#2563eb]" />
            <span>256-bit SSL Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2563eb]" />
            <span>Cloudflare Protected</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>100% Verified Delivery</span>
          </div>
        </div>

        {/* Non-Refundable Notice */}
        <div className="text-center mt-6 text-xs text-slate-500 max-w-xl mx-auto flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            All sales are <strong>non-refundable</strong>. Comprehensive 1-on-1 setup support and activation keys provided via WhatsApp immediately after purchase.
          </span>
        </div>

      </div>
    </section>
  );
};
