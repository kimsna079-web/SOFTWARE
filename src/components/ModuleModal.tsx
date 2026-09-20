import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Shield, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Terminal, 
  RotateCcw, 
  Copy, 
  Check, 
  Zap, 
  User, 
  Globe, 
  Key
} from 'lucide-react';
import { FeatureModule } from '../types';

interface ModuleModalProps {
  module: FeatureModule | null;
  onClose: () => void;
}

export const ModuleModal: React.FC<ModuleModalProps> = ({ module, onClose }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'sandbox'>('details');
  const [sandboxRunning, setSandboxRunning] = useState<boolean>(false);
  const [sandboxResult, setSandboxResult] = useState<string | null>(null);
  const [copiedResult, setCopiedResult] = useState<boolean>(false);

  if (!module) return null;

  const handleRunSandbox = () => {
    setSandboxRunning(true);
    setSandboxResult(null);

    setTimeout(() => {
      let output = '';
      if (module.id.includes('reg') || module.id.includes('verify')) {
        output = 
`[SMS-GATEWAY] Requesting USA (+1) phone line via SMS-Activate API...
[ASSIGNED] Number: +1 (202) 555-0182
[BROWSER] Launching isolated Chromium thread (Context ID: CTX-8921)
[INJECT] Random human typing speed: 128ms / key
[OTP-RECEIVED] Received 6-digit confirmation code: 849201
[2FA-INIT] Enabling Google Authenticator 2FA. Base32 Key: JBSWY3DPEHPK3PXP
[STATUS] Account successfully registered & saved to database.`;
      } else if (module.id.includes('profile')) {
        output = 
`[AI-ENGINE] Prompting 1080p photorealistic portrait generator...
[SYNTHESIS] Avatar: /avatars/synth_female_24_casual_business.jpg (Uploaded)
[BIO-GEN] Generated bio: "Digital Strategist & Content Architect | Exploring AI & UX"
[COVER-PHOTO] Applied high-res landscape backdrop with subtle crop variation
[COMPLETED] Profile completeness score: 100% (High Trust Rating)`;
      } else if (module.id.includes('page')) {
        output = 
`[PAGE-GEN] Creating Fan Page under Business & Tech category
[PAGE-NAME] "Apex Growth Dynamics — Tech Insights"
[METADATA] Injected website link, custom CTA button ("Learn More"), and WhatsApp action
[PUBLISHED] Fan page live with vanity URL: facebook.com/ApexGrowthDynamics99`;
      } else if (module.id.includes('proxy')) {
        output = 
`[PROXY-CHECK] Connecting to SOCKS5 residential node: 198.51.100.24:9090
[LATENCY] Ping response: 29ms (Handshake verified)
[CANVAS-SPOOF] Adding 2D noise buffer (+0.8% offset)
[WEBRTC-SHIELD] IP leak blocked (Local candidate: 10.0.0.1 masked)`;
      } else {
        output = 
`[TASK-INIT] Starting ${module.title} autonomous routine...
[PARAMS] Multi-threaded concurrency: 4 active worker instances
[STATUS] Routine executed smoothly with zero antispam warnings.`;
      }

      setSandboxResult(output);
      setSandboxRunning(false);
    }, 1000);
  };

  const handleCopySandbox = () => {
    if (!sandboxResult) return;
    navigator.clipboard.writeText(sandboxResult);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color accent header bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: module.color }}
        />

        {/* Modal Top Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 shrink-0">
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

        {/* Tab Switcher: Overview vs. Interactive Sandbox */}
        <div className="flex items-center gap-2 pt-3 pb-1 shrink-0">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'details'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Module Overview
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'sandbox'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Test Run</span>
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto py-3 space-y-4 pr-1">
          {activeTab === 'details' ? (
            <>
              <p className="text-sm text-slate-600 leading-relaxed">
                {module.description}
              </p>

              <div>
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

              <div className="flex flex-wrap gap-1.5 pt-2">
                {module.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#2563eb] border border-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          ) : (
            /* Interactive Sandbox Tab */
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#2563eb]" />
                  <span>Test Run: {module.title}</span>
                </div>
                <p>
                  Trigger an isolated simulated test execution to see how this module executes commands and outputs data in the background.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handleRunSandbox}
                  disabled={sandboxRunning}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white text-xs font-bold flex items-center gap-2 shadow-sm hover:from-[#18305c] hover:to-[#1d4ed8] transition-all"
                >
                  <Play className={`w-3.5 h-3.5 ${sandboxRunning ? 'animate-spin' : ''}`} />
                  <span>{sandboxRunning ? 'Simulating Routine...' : 'Execute Test Run'}</span>
                </button>

                {sandboxResult && (
                  <button
                    onClick={handleCopySandbox}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    {copiedResult ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Output</span>
                  </button>
                )}
              </div>

              {/* Terminal Output */}
              <div className="bg-slate-950 text-slate-100 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400 text-[10px]">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-sky-400" />
                    SIMULATED EXECUTION LOG
                  </span>
                  <span className="text-emerald-400">READY</span>
                </div>

                <pre className="text-[11px] leading-relaxed text-emerald-400 whitespace-pre-wrap">
                  {sandboxRunning 
                    ? '[EXEC] Loading Playwright context and anti-detect hooks...' 
                    : sandboxResult || '[INFO] Click "Execute Test Run" above to simulate this module.'}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 shrink-0">
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
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md hover:from-[#18305c] hover:to-[#1d4ed8] transition-all"
          >
            <span>Order License</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};
