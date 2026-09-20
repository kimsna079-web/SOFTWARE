import React, { useState } from 'react';
import { WORKFLOW_STEPS } from '../data/mockData';
import { 
  Settings2, 
  FileSpreadsheet, 
  Play, 
  BarChart3, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Zap,
  RotateCcw,
  Shield,
  Smartphone,
  User,
  Share2
} from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const icons = [Settings2, FileSpreadsheet, Play, BarChart3];
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);

  // Step demo configurations
  const STEP_DETAILS = {
    1: {
      title: 'Configure Isolation & Proxies',
      subtitle: 'Set up independent browser sandboxes with dedicated IP routing',
      metricTitle: 'Active Proxy Routing',
      metricValue: 'SOCKS5 Residential Node',
      actionText: 'Test SOCKS5 Handshake',
      preview: {
        settingA: 'Anti-Detect Canvas Noise: Enabled (+1.4% jitter)',
        settingB: 'Hardware Fingerprint: Windows 11 / RTX 4080 (Masked)',
        settingC: 'Assigned Proxy: 198.51.100.42:8080 (US East)'
      },
      icon: Shield
    },
    2: {
      title: 'Import Numbers & SMS Gateway',
      subtitle: 'Automate virtual phone intake with instant OTP reception',
      metricTitle: 'SMS Verification Speed',
      metricValue: '3.2s Average Code Arrival',
      actionText: 'Simulate SMS Code Receive',
      preview: {
        settingA: 'Provider: SMS-Activate / 5SIM Gateway (US Line)',
        settingB: 'Virtual Number: +1 (202) 555-0193 [Assigned]',
        settingC: 'Security: 2FA TOTP Base32 Key Auto-Generated'
      },
      icon: Smartphone
    },
    3: {
      title: 'AI Profile & Bio Hydration',
      subtitle: 'Personalize each account with authentic 1080p avatars and bios',
      metricTitle: 'Profile Completeness',
      metricValue: '100% (Ready for Warmup)',
      actionText: 'Generate Synthetic Bio & Avatar',
      preview: {
        settingA: 'Avatar: High-Resolution AI Photorealistic Portrait',
        settingB: 'Bio: "Digital Creator & Tech Strategist | NYC"',
        settingC: 'Work & Education: Verified Public University in US'
      },
      icon: User
    },
    4: {
      title: 'Warmup & Automated Export',
      subtitle: 'Execute humanized feed engagement and export cookies instantly',
      metricTitle: 'Live Export Format',
      metricValue: 'CSV / JSON + Cookies (c_user/xs)',
      actionText: 'Download Sample Batch Export',
      preview: {
        settingA: 'Human Typing Velocity: 140ms randomized delay',
        settingB: 'Organic Warmup: 5 min feed scroll + 2 page likes',
        settingC: 'Session Cookie: c_user=1000984128491 (Injected)'
      },
      icon: Share2
    }
  };

  const handleNextStep = () => {
    setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1));
  };

  const currentStepData = STEP_DETAILS[activeStep as 1 | 2 | 3 | 4];
  const CurrentStepIcon = currentStepData.icon;

  return (
    <section id="workflow" className="py-20 sm:py-28 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest text-[#2563eb] uppercase bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full mb-3">
            Interactive Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How Does It Work?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1e3c72] to-[#2563eb] rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            Get your full automation pipeline running in just 4 simple, intuitive steps. Click through the stages below to test the pipeline live.
          </p>
        </div>

        {/* Workflow Steps Grid with Flow Line */}
        <div className="relative mb-12">
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
              const isCurrent = activeStep === wf.step;
              const isPast = activeStep > wf.step;

              return (
                <div 
                  key={wf.step}
                  onClick={() => setActiveStep(wf.step)}
                  className={`group cursor-pointer rounded-2xl p-7 border transition-all duration-300 text-center flex flex-col items-center relative ${
                    isCurrent 
                      ? 'bg-blue-50/70 border-2 border-[#2563eb] shadow-xl shadow-blue-500/10 -translate-y-2' 
                      : isPast
                      ? 'bg-white border-emerald-300 shadow-xs'
                      : 'bg-white border-slate-200/90 shadow-xs hover:border-slate-300'
                  }`}
                >
                  {/* Step Number Circle */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-2xl shadow-lg border-4 border-white mb-6 transition-transform ${
                    isCurrent
                      ? 'bg-gradient-to-tr from-[#1e3c72] to-[#2563eb] text-white scale-110 shadow-blue-500/30'
                      : isPast
                      ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isPast ? <Check className="w-8 h-8 text-white" /> : wf.step}
                  </div>

                  <h3 className={`text-lg font-bold mb-2.5 transition-colors ${
                    isCurrent ? 'text-[#2563eb]' : 'text-slate-900'
                  }`}>
                    {wf.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {wf.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 w-full flex items-center justify-center text-xs font-bold text-[#2563eb]">
                    <span>{isCurrent ? 'Active Stage' : 'Click to Inspect'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Step Stage Inspector Panel */}
        <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 text-sky-400 flex items-center justify-center">
                <CurrentStepIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                  Pipeline Stage 0{activeStep} of 04
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {currentStepData.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveStep(1)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Restart Pipeline"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextStep}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:from-[#18305c] hover:to-[#1d4ed8] transition-all"
              >
                <span>{activeStep === 4 ? 'Loop to Step 1' : 'Proceed to Next Step'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Details and Live Step Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 text-xs sm:text-sm">
            <div className="md:col-span-7 space-y-3 font-mono">
              <span className="text-slate-400 text-xs uppercase tracking-wider block">
                Stage Execution Telemetry
              </span>
              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{currentStepData.preview.settingA}</span>
                </div>
                <div className="flex items-center gap-2 text-sky-300">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{currentStepData.preview.settingB}</span>
                </div>
                <div className="flex items-center gap-2 text-amber-300">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{currentStepData.preview.settingC}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block">
                  {currentStepData.metricTitle}
                </span>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-display mt-1">
                  {currentStepData.metricValue}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Automatic Execution
                </span>
                <span className="text-sky-300 font-bold">100% Autonomous</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
