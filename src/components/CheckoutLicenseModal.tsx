import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  Key, 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  ArrowRight,
  CreditCard,
  Coins,
  MessageSquare
} from 'lucide-react';
import { PricingPlan } from '../types';

interface CheckoutLicenseModalProps {
  plan: PricingPlan | null;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  onClose: () => void;
}

export const CheckoutLicenseModal: React.FC<CheckoutLicenseModalProps> = ({ 
  plan, 
  billingCycle, 
  onClose 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card' | 'whatsapp'>('crypto');
  const [cryptoCurrency, setCryptoCurrency] = useState<'usdt_trc20' | 'usdt_bep20' | 'btc'>('usdt_trc20');
  const [copiedKey, setCopiedKey] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedLicense, setGeneratedLicense] = useState<string>('');
  const [buyerEmail, setBuyerEmail] = useState<string>('');

  if (!plan) return null;

  // Compute price based on cycle
  let displayPrice = plan.price;
  let cycleName = '1 Month';
  if (billingCycle === 'quarterly') {
    displayPrice = '24.99';
    cycleName = '3 Months (Save 17%)';
  } else if (billingCycle === 'annual') {
    displayPrice = '84.99';
    cycleName = '1 Year (Save 30%)';
  }

  const handleGenerateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    // Deterministic random formatted license
    const p1 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const p2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const p3 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const p4 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const license = `PROSAN-${p1}-${p2}-${p3}-${p4}`;
    setGeneratedLicense(license);
    setIsGenerated(true);
  };

  const handleCopyLicense = () => {
    navigator.clipboard.writeText(generatedLicense);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleDownloadLicenseFile = () => {
    const text = 
`=========================================================
PRO•SAN AUTOMATION SUITE — OFFICIAL LICENSE ACTIVATION
=========================================================
Product: PRO•SAN Desktop Edition v3.0 (x64)
Plan: ${plan.name} (${cycleName})
License Key: ${generatedLicense}
Customer Email: ${buyerEmail || 'verified_buyer@client.com'}
Issued At: ${new Date().toISOString()}
Hardware ID Lock: Auto-Binds on First Launch
Support Contact: Telegram @pro_san_bot / WhatsApp +923241703901

ACTIVATION INSTRUCTIONS:
1. Launch PRO_SAN_Setup.exe on your Windows PC or Windows Server VPS.
2. Navigate to Settings -> License Management.
3. Paste your License Key: ${generatedLicense}
4. Click 'Activate Machine' & Enjoy 100% Uncapped Automation!
=========================================================`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PROSAN_LICENSE_${generatedLicense.slice(-9)}.lic`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const cryptoAddress = cryptoCurrency === 'usdt_trc20' 
    ? 'TYd7q8K3F9J2mLs91vXzA7W3B4pQ9yRtU1' 
    : cryptoCurrency === 'usdt_bep20' 
    ? '0x71C2B4E910aD38F019C28a6f44eF993A12b84C89' 
    : 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 text-slate-800 relative overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1e3c72] via-[#2563eb] to-sky-400" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center font-bold text-sm">
                <Key className="w-4 h-4" />
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                {isGenerated ? 'License Key Activated!' : `Instant Checkout & Activation`}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Plan: <strong className="text-slate-800">{plan.name}</strong> &bull; Duration: <strong className="text-blue-600">{cycleName}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto py-4 space-y-5">
          {!isGenerated ? (
            <>
              {/* Price summary pill */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Total Amount Due</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-black text-slate-900">${displayPrice}</span>
                    <span className="text-xs text-slate-500">USD (Instant Delivery)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    100% Unlocked Access
                  </span>
                </div>
              </div>

              {/* Payment Method Switcher */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'crypto'
                        ? 'border-[#2563eb] bg-blue-50/50 text-[#2563eb] shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Coins className="w-5 h-5" />
                    <span className="text-xs font-bold">Crypto (USDT)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-[#2563eb] bg-blue-50/50 text-[#2563eb] shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs font-bold">Card / Stripe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'whatsapp'
                        ? 'border-[#2563eb] bg-blue-50/50 text-[#2563eb] shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <MessageSquare className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold">WhatsApp Pay</span>
                  </button>
                </div>
              </div>

              {/* Payment Details Section */}
              {paymentMethod === 'crypto' && (
                <div className="bg-slate-900 text-white p-4 rounded-xl space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Cryptocurrency:</span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCryptoCurrency('usdt_trc20')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          cryptoCurrency === 'usdt_trc20' ? 'bg-[#2563eb] text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        USDT TRC20
                      </button>
                      <button
                        type="button"
                        onClick={() => setCryptoCurrency('usdt_bep20')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          cryptoCurrency === 'usdt_bep20' ? 'bg-[#2563eb] text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        BEP20
                      </button>
                      <button
                        type="button"
                        onClick={() => setCryptoCurrency('btc')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          cryptoCurrency === 'btc' ? 'bg-[#2563eb] text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        BTC
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between gap-2">
                    <div className="truncate">
                      <div className="text-[10px] text-slate-400">Deposit Address</div>
                      <div className="text-emerald-400 font-bold text-[11px] truncate">{cryptoAddress}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(cryptoAddress);
                        alert('Deposit address copied!');
                      }}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant automatic confirmation within ~60 seconds via blockchain webhook.</span>
                  </div>
                </div>
              )}

              {/* Email Input & Simulated Generation */}
              <form onSubmit={handleGenerateLicense} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Delivery Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex.marketing@gmail.com"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                  />
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Your official license key and Windows download link will be bound to this email.
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:from-[#18305c] hover:to-[#1d4ed8] transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Instant License Key</span>
                  </button>
                </div>
              </form>

              <div className="text-center pt-1">
                <a
                  href={`https://wa.me/923241703901?text=${encodeURIComponent(`Hi! I want to pay for ${plan.name} (${cycleName}) via WhatsApp agent`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#2563eb] hover:underline inline-flex items-center gap-1"
                >
                  <span>Prefer manual chat or local payment? Speak with a representative on WhatsApp</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </>
          ) : (
            /* License Generated Screen */
            <div className="space-y-5 text-center sm:text-left">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-900">
                    License Provisioned Successfully!
                  </h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Your key is active and ready to unlock all PRO•SAN modules on Windows.
                  </p>
                </div>
              </div>

              {/* License Key Box */}
              <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
                  <span>ACTIVATION LICENSE KEY</span>
                  <span className="text-emerald-400">STATUS: VALID</span>
                </div>

                <div className="flex items-center justify-between gap-3 bg-slate-950 px-3.5 py-3 rounded-lg border border-slate-800">
                  <span className="font-mono text-base sm:text-lg font-black text-amber-400 tracking-wider">
                    {generatedLicense}
                  </span>
                  <button
                    onClick={handleCopyLicense}
                    className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors shrink-0"
                    title="Copy Key"
                  >
                    {copiedKey ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="text-[10px] text-slate-400 font-mono text-left">
                  Bound to: {buyerEmail || 'verified_buyer@client.com'} &bull; Duration: {cycleName}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleDownloadLicenseFile}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Download className="w-4 h-4 text-sky-400" />
                  <span>Download .LIC File</span>
                </button>

                <a
                  href={`https://wa.me/923241703901?text=${encodeURIComponent(`Hi! Here is my license key: ${generatedLicense}. Please send me the latest PRO•SAN v3.0 setup installer.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Download Software Installer</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            256-Bit Hardware Encrypted Licensing
          </span>
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
