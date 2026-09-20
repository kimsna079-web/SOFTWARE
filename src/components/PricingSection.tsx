import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { PricingPlan } from '../types';
import { 
  Check, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Key,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap
} from 'lucide-react';
import { CheckoutLicenseModal } from './CheckoutLicenseModal';

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('quarterly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(null);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const COMPARISON_ROWS = [
    { feature: 'Auto Phone / Email Registration', starter: true, pro: true, enterprise: true },
    { feature: '2FA TOTP Generation & Backup Seed', starter: true, pro: true, enterprise: true },
    { feature: 'Undetectable Playwright Headless Context', starter: true, pro: true, enterprise: true },
    { feature: 'Per-Thread SOCKS5 / HTTP Proxy Isolation', starter: '5 Proxies', pro: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Canvas & WebGL Hardware Spoofing', starter: true, pro: true, enterprise: true },
    { feature: 'AI Bio & 1080p Avatar Synthesizer', starter: '100 / day', pro: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Bulk Fan Page Creator & Publisher', starter: '10 / day', pro: 'Unlimited', enterprise: 'Unlimited' },
    { feature: 'Smart Organic Interaction Warmup', starter: 'Standard', pro: 'Turbo + Custom', enterprise: 'Custom Speed' },
    { feature: 'Session Cookies (c_user/xs) Export', starter: true, pro: true, enterprise: true },
    { feature: 'Concurrent Browser Windows', starter: 'Up to 5', pro: 'Up to 20', enterprise: 'Unlimited (VPS)' },
    { feature: 'Continuous Antiban Logic Updates', starter: 'Monthly', pro: 'Instant / Priority', enterprise: 'Instant / VIP' },
    { feature: 'Dedicated WhatsApp & Telegram Support', starter: 'Standard', pro: 'Priority 24/7', enterprise: '1-on-1 Engineer' }
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#f8fafc] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-widest text-[#2563eb] uppercase bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full mb-3">
            Pricing &amp; Licensing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            One Premium Plan. Flexible Durations.
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1e3c72] to-[#2563eb] rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            Every plan includes 100% unlocked access to all modules, multi-window browser threads, and continuous stealth updates.
          </p>

          {/* Interactive Billing Cycle Switcher */}
          <div className="inline-flex items-center p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/80 mt-8 shadow-inner">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1 Month
            </button>

            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>3 Months</span>
              <span className="bg-emerald-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                -17%
              </span>
            </button>

            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>1 Year</span>
              <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                -30%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
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
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Recommended Choice</span>
                  </div>
                )}

                <div>
                  {/* Title & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-800 text-lg">
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

                {/* Purchase & Activation Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedPlanForCheckout(plan)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-all shadow-xs ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white hover:from-[#18305c] hover:to-[#1d4ed8] shadow-blue-500/20 shadow-md hover:shadow-lg'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    <Key className="w-4 h-4" />
                    <span>Instant License Checkout</span>
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-[#2563eb] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Or Order via WhatsApp</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix Toggle */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Detailed Feature Comparison Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  Compare technical specifications, thread capacities, and antiban capabilities across all license tiers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#2563eb] shrink-0">
              <span>{showComparison ? 'Hide Table' : 'Expand Matrix'}</span>
              {showComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showComparison && (
            <div className="border-t border-slate-200 overflow-x-auto p-4 sm:p-6 animate-in fade-in duration-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px]">
                    <th className="py-3 px-4">Core Automation Feature</th>
                    <th className="py-3 px-4 text-center">1 Month ($10.00)</th>
                    <th className="py-3 px-4 text-center bg-blue-50/50 text-[#2563eb]">3 Months ($24.99)</th>
                    <th className="py-3 px-4 text-center">1 Year ($84.99)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {row.feature}
                      </td>

                      <td className="py-3.5 px-4 text-center font-medium text-slate-600">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : '-'
                        ) : (
                          row.starter
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-center font-bold text-slate-900 bg-blue-50/30">
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : '-'
                        ) : (
                          row.pro
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : '-'
                        ) : (
                          row.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Security & Warranty Assurance */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-700 text-xs sm:text-sm">
            <Lock className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong className="text-slate-900 font-bold">100% Anti-Ban Guarantee &bull; Machine Bound Safety:</strong> Your license binds to your hardware profile or VPS. If you ever switch computers, our Telegram bot resets your hardware ID for free.
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-500">Payments:</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[11px] font-bold text-slate-700">USDT</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[11px] font-bold text-slate-700">Stripe</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[11px] font-bold text-slate-700">WhatsApp</span>
          </div>
        </div>

      </div>

      {/* Instant Checkout & License Generator Modal */}
      <CheckoutLicenseModal
        plan={selectedPlanForCheckout}
        billingCycle={billingCycle}
        onClose={() => setSelectedPlanForCheckout(null)}
      />
    </section>
  );
};
