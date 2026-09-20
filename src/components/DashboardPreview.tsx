import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  Terminal, 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  ExternalLink,
  Activity,
  Sparkles,
  Zap,
  ArrowUpRight,
  Clock,
  Wifi,
  ChevronRight,
  Settings2,
  Sliders,
  Eye,
  Key,
  X,
  CalendarClock
} from 'lucide-react';
import { AccountInspectorModal, InspectedAccount } from './AccountInspectorModal';
import { BatchScheduler } from './BatchScheduler';

interface AutomationTaskProgress {
  id: string;
  name: string;
  threadName: string;
  category: string;
  progress: number;
  currentStep: string;
  proxyIp: string;
  theme: 'emerald' | 'blue' | 'purple' | 'amber';
  etaSeconds: number;
}

const TASK_STEPS: Record<string, string[]> = {
  'task-1': [
    'Connecting via SOCKS5 residential node...',
    'Requesting virtual SMS SIM gateway token...',
    'Entering humanized email & secure 2FA pass...',
    'Waiting for SMS 6-digit confirmation code...',
    'Entering SMS verification token [839210]...',
    'Exporting active 2FA seed & recovery tokens...',
    'Account finalized & session persistence saved.'
  ],
  'task-2': [
    'Randomizing browser hardware profile...',
    'Spoofing Canvas 2D render context noise...',
    'Injecting AudioContext frequency jitter...',
    'Masking WebRTC public & private IP leaks...',
    'Applying WebGL vendor & renderer spoofing...',
    'Synchronizing OS time zone & HTTP/2 headers.'
  ],
  'task-3': [
    'Initializing AI portrait generation model...',
    'Generating 1080p high-resolution portrait...',
    'Synthesizing authentic bio & education profile...',
    'Uploading avatar to profile via mouse curves...',
    'Setting cover photo and interest tags...',
    'Encrypting profile metadata into local store.'
  ],
  'task-4': [
    'Selecting targeted business category & niche...',
    'Creating high-trust Facebook Fan Page...',
    'Configuring page bio, website URL & cover...',
    'Executing automated feed scroll & warmup...',
    'Sending initial follower invite sequence...',
    'Logging successful page creation into dashboard.'
  ]
};

const INITIAL_TASKS: AutomationTaskProgress[] = [
  {
    id: 'task-1',
    name: 'Auto-Registration & 2FA Setup',
    threadName: 'Thread #1',
    category: 'Registration',
    progress: 78,
    currentStep: 'Entering SMS verification token [839210]...',
    proxyIp: '185.220.101.42 (US)',
    theme: 'emerald',
    etaSeconds: 4
  },
  {
    id: 'task-2',
    name: 'Anti-Detect Canvas & WebGL Spoofing',
    threadName: 'Thread #2',
    category: 'Fingerprint',
    progress: 91,
    currentStep: 'Applying WebGL vendor & renderer spoofing...',
    proxyIp: '194.26.29.110 (UK)',
    theme: 'blue',
    etaSeconds: 2
  },
  {
    id: 'task-3',
    name: 'AI Profile & High-Res Avatar Hydration',
    threadName: 'Thread #3',
    category: 'Profile Builder',
    progress: 48,
    currentStep: 'Synthesizing authentic bio & education profile...',
    proxyIp: '91.202.233.15 (DE)',
    theme: 'purple',
    etaSeconds: 7
  },
  {
    id: 'task-4',
    name: 'Fan Page Publishing & Feed Warmup',
    threadName: 'Thread #4',
    category: 'Page & Warmup',
    progress: 34,
    currentStep: 'Executing automated feed scroll & warmup...',
    proxyIp: '142.112.88.74 (CA)',
    theme: 'amber',
    etaSeconds: 11
  }
];

const SAMPLE_ACCOUNTS: InspectedAccount[] = [
  {
    id: 101,
    name: 'David Miller',
    email: 'david.m_91@gmail.com',
    phone: '+1 (202) 555-0143',
    pass: 'ProSanSecure#2026',
    totpSecret: 'JBSWY3DPEHPK3PXP',
    status: 'LIVE_VERIFIED',
    proxyIp: '185.220.101.42 (US)',
    createdAt: 'Just now',
    fbUid: '1000982319401'
  },
  {
    id: 102,
    name: 'Sarah Jenkins',
    email: 'sarah.j_agency@outlook.com',
    phone: '+1 (202) 555-0178',
    pass: 'ProSanSecure#2026',
    totpSecret: 'KZXW65TBNRSXG5DS',
    status: 'LIVE_VERIFIED',
    proxyIp: '194.26.29.110 (UK)',
    createdAt: '2 mins ago',
    fbUid: '1000982420912'
  },
  {
    id: 103,
    name: 'Mark Taylor',
    email: 'mark.t_growth@yahoo.com',
    phone: '+1 (202) 555-0199',
    pass: 'ProSanSecure#2026',
    totpSecret: 'OBXXK43VMVZXIZLN',
    status: 'PROFILE_HYDRATED',
    proxyIp: '91.202.233.15 (DE)',
    createdAt: '5 mins ago',
    fbUid: '1000982531023'
  },
  {
    id: 104,
    name: 'Elena Rostova',
    email: 'elena.r_media@gmail.com',
    phone: '+44 7700 900142',
    pass: 'ProSanSecure#2026',
    totpSecret: 'W4N2M3L1K5J6H7G8',
    status: 'WARMUP_COMPLETED',
    proxyIp: '142.112.88.74 (CA)',
    createdAt: '8 mins ago',
    fbUid: '1000982642134'
  }
];

export const DashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'screenshots' | 'simulator' | 'scheduler'>('simulator');
  const [isSimulating, setIsSimulating] = useState(true);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([
    '[SYSTEM] PRO•SAN Automation Engine v3.0 initialized.',
    '[PROXY] 15 Residential proxies verified (Avg Ping: 42ms).',
    '[READY] Ready for multi-threaded account registration batch.',
    '[THREAD-1] SMS gateway assigned +1 (202) 555-0144. Received code [839210].'
  ]);
  const [progress, setProgress] = useState(68);
  const [createdCount, setCreatedCount] = useState(14);
  const [activeThreads, setActiveThreads] = useState(4);
  const [tasks, setTasks] = useState<AutomationTaskProgress[]>(INITIAL_TASKS);
  const [inspectedAccount, setInspectedAccount] = useState<InspectedAccount | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [proxyRegion, setProxyRegion] = useState<string>('US Residential (AT&T)');
  const [typingVelocity, setTypingVelocity] = useState<string>('Humanized (120-250ms)');

  // Dynamic progress bar updates
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        // Update individual task progress
        setTasks((prevTasks) =>
          prevTasks.map((task) => {
            const increment = Math.floor(Math.random() * 6) + 3;
            const newProgress = task.progress + increment;

            if (newProgress >= 100) {
              // Completed! Increment account counter and cycle to next step
              setCreatedCount((prev) => prev + 1);
              const steps = TASK_STEPS[task.id] || [];
              const nextStep = steps[Math.floor(Math.random() * steps.length)];
              return {
                ...task,
                progress: 4,
                currentStep: nextStep,
                etaSeconds: Math.floor(Math.random() * 8) + 6
              };
            }

            return {
              ...task,
              progress: Math.min(newProgress, 99),
              etaSeconds: Math.max(1, Math.round((100 - newProgress) / 5))
            };
          })
        );

        // Update overall batch progress
        setProgress((prev) => (prev >= 100 ? 12 : prev + 3));

        // Add log events
        const events = [
          `[THREAD-${Math.floor(Math.random() * 4) + 1}] Connecting via SOCKS5: 198.51.100.${Math.floor(Math.random() * 250)}... OK (Ping: 34ms)`,
          `[SMS-OTP] Requesting phone number for country code +1 (USA)... Assigned`,
          `[CHROME] Isolated Playwright context loaded (Fingerprint ID: #FP-${Math.floor(Math.random() * 8999 + 1000)})`,
          `[FACEBOOK] Humanized typing velocity: 120ms delay. Entering credentials...`,
          `[OTP-SUCCESS] Received 6-digit code: 739201. Entering verification token...`,
          `[PROFILE] Auto-uploaded AI avatar & verified email cookie injected.`,
          `[DATABASE] Account saved: alex.walker_${Math.floor(Math.random() * 999)}@outlook.com [STATUS: LIVE]`
        ];
        const nextEvent = events[Math.floor(Math.random() * events.length)];
        setSimulatedLogs((prev) => [...prev.slice(-12), nextEvent]);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleBoostProgress = () => {
    setTasks((prev) =>
      prev.map((t) => ({
        ...t,
        progress: Math.min(100, t.progress + 15)
      }))
    );
    setProgress((p) => Math.min(100, p + 10));
  };

  const handleResetTasks = () => {
    setTasks(INITIAL_TASKS);
    setProgress(20);
    setSimulatedLogs(['[SYSTEM] Progress metrics reset.', '[SYSTEM] Tasks re-primed for execution.']);
  };

  const handleExportSampleCSV = () => {
    const csvContent = 
      "data:text/csv;charset=utf-8," + 
      "ID,Name,Email,Phone,Password,2FA_Key,Status,Cookies_JSON\n" +
      "1,Daniel Harris,daniel.h99@outlook.com,+12025550143,ProSanSecure#2026,JBSWY3DPEHPK3PXP,LIVE_VERIFIED,[{\"name\":\"c_user\",\"value\":\"10009823\"}]\n" +
      "2,Emily Miller,emily.m_marketer@yahoo.com,+12025550178,ProSanSecure#2026,KZXW65TBNRSXG5DS,LIVE_VERIFIED,[{\"name\":\"c_user\",\"value\":\"10009824\"}]\n" +
      "3,Michael Scott,m.scott_pro@gmail.com,+12025550199,ProSanSecure#2026,OBXXK43VMVZXIZLN,LIVE_VERIFIED,[{\"name\":\"c_user\",\"value\":\"10009825\"}]";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "prosan_sample_accounts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="preview" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-[#2563eb] bg-blue-50 border border-blue-200 mb-3">
            <Monitor className="w-3.5 h-3.5" />
            <span>Live Dashboard Preview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            High-Performance Desktop Interface
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1e3c72] to-[#2563eb] rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Experience our clean, multi-threaded interface engineered for high throughput, full proxy isolation, and animated task progress feedback.
          </p>

          {/* View Mode Switcher */}
          <div className="inline-flex flex-wrap items-center justify-center p-1 bg-slate-100 rounded-xl border border-slate-200 mt-6 shadow-inner gap-1">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'simulator'
                  ? 'bg-white text-[#2563eb] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Live Tasks &amp; Simulator</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            <button
              onClick={() => setActiveTab('scheduler')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'scheduler'
                  ? 'bg-white text-[#2563eb] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarClock className="w-4 h-4 text-sky-500" />
              <span>Batch Queue &amp; Scheduler</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                Human-Timing
              </span>
            </button>

            <button
              onClick={() => setActiveTab('screenshots')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'screenshots'
                  ? 'bg-white text-[#2563eb] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Software Screenshots</span>
            </button>

            <a
              href="#task-history"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold text-slate-600 hover:text-[#2563eb] hover:bg-white/70 transition-all"
            >
              <Activity className="w-4 h-4 text-sky-500 animate-pulse" />
              <span>Live Task Stream</span>
            </a>
          </div>
        </div>

        {/* Tab 1: Interactive Live Simulator & Task Progress */}
        {activeTab === 'simulator' && (
          <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in duration-300">
            
            {/* Windows Title Bar */}
            <div className="bg-slate-900/90 px-4 py-3 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-xs font-semibold text-slate-300 font-mono flex items-center gap-2">
                  <i className="fa-brands fa-facebook text-[#2563eb]"></i>
                  <span className="font-brand text-sm tracking-wider text-white">PRO•SAN</span>
                  <span className="text-slate-400 font-normal">Execution Control Center &mdash; Multi-Thread Live Monitor</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  Engine: {isSimulating ? <span className="text-emerald-400 font-bold">RUNNING</span> : <span className="text-amber-400 font-bold">PAUSED</span>}
                </span>

                <button
                  onClick={() => setActiveTab('scheduler')}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-sky-300 hover:text-white flex items-center gap-1.5 transition-all border border-blue-500/30"
                  title="Open Human-Behavior Batch Scheduler"
                >
                  <CalendarClock className="w-3 h-3 text-sky-400" />
                  <span className="hidden sm:inline">Scheduler</span>
                </button>

                <button
                  onClick={() => setShowSettingsModal(true)}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all border border-slate-700"
                  title="Configure Automation Engine"
                >
                  <Sliders className="w-3 h-3 text-sky-400" />
                  <span className="hidden sm:inline">Config</span>
                </button>

                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                    isSimulating 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30' 
                      : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  }`}
                >
                  {isSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isSimulating ? 'Pause Engine' : 'Resume Engine'}</span>
                </button>
              </div>
            </div>

            {/* Control Bar & Key Metrics */}
            <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-slate-800/80 bg-slate-900/40">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Batch Created</div>
                <div className="text-2xl font-black text-emerald-400 mt-1 font-display">
                  {createdCount} Accounts
                </div>
                <div className="text-[10px] text-emerald-400/80 mt-1 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Verified 2FA Ready
                </div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Active Threads</div>
                <div className="text-2xl font-black text-sky-400 mt-1 font-display">
                  {activeThreads} Windows
                </div>
                <div className="text-[10px] text-sky-400/80 mt-1 flex items-center gap-1 font-mono">
                  <Wifi className="w-2.5 h-2.5" />
                  Isolated Proxies
                </div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Proxy Health</div>
                <div className="text-2xl font-black text-emerald-400 mt-1 font-display">
                  100% OK
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  Avg Latency: 38ms
                </div>
              </div>

              {/* Batch Progress Metric with Live Animated Bar */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Batch Progress</span>
                    <span className="text-xs font-mono font-bold text-amber-300">{progress}%</span>
                  </div>
                  <div className="text-2xl font-black text-amber-400 mt-1 font-display">
                    {progress}%
                  </div>
                </div>

                {/* Animated Overall Progress Bar */}
                <div className="w-full bg-slate-950 rounded-full h-2 mt-2 overflow-hidden border border-slate-800 relative">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-300 rounded-full transition-all duration-700 ease-out animate-progress-stripes"
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
            </div>

            {/* NEW: Active Automation Tasks with Animated Progress Bars */}
            <div className="p-4 sm:p-6 border-b border-slate-800/80 bg-slate-950/70">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                      Active Automation Tasks
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-sky-300 border border-blue-500/30">
                      Live Visual Feedback
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time animated task completion percentages across isolated concurrent browser threads.
                  </p>
                </div>

                {/* Quick Task Interactive Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBoostProgress}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-sky-300 text-xs font-bold transition-all"
                    title="Simulate immediate progress step"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Boost (+15%)</span>
                  </button>

                  <button
                    onClick={handleResetTasks}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Reset Task Progress"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Tasks Progress Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {tasks.map((task) => {
                  const isCompleted = task.progress >= 100;
                  
                  // Color configuration per thread
                  const themeClasses = {
                    emerald: {
                      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                      text: 'text-emerald-400',
                      barGradient: 'from-emerald-600 via-teal-400 to-emerald-300',
                      glow: 'shadow-[0_0_12px_rgba(16,185,129,0.35)]',
                      border: 'border-emerald-500/30',
                      tag: 'bg-emerald-950/40 text-emerald-300'
                    },
                    blue: {
                      badge: 'bg-blue-500/20 text-sky-300 border-blue-500/30',
                      text: 'text-sky-400',
                      barGradient: 'from-blue-600 via-sky-400 to-cyan-300',
                      glow: 'shadow-[0_0_12px_rgba(14,165,233,0.35)]',
                      border: 'border-blue-500/30',
                      tag: 'bg-blue-950/40 text-sky-300'
                    },
                    purple: {
                      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
                      text: 'text-purple-400',
                      barGradient: 'from-indigo-600 via-purple-400 to-fuchsia-300',
                      glow: 'shadow-[0_0_12px_rgba(168,85,247,0.35)]',
                      border: 'border-purple-500/30',
                      tag: 'bg-purple-950/40 text-purple-300'
                    },
                    amber: {
                      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                      text: 'text-amber-400',
                      barGradient: 'from-amber-600 via-orange-400 to-yellow-300',
                      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.35)]',
                      border: 'border-amber-500/30',
                      tag: 'bg-amber-950/40 text-amber-300'
                    }
                  }[task.theme];

                  return (
                    <div
                      key={task.id}
                      className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 hover:border-slate-700/80 transition-all shadow-md relative overflow-hidden"
                    >
                      {/* Top Row: Thread info & percentage badge */}
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono border ${themeClasses.badge}`}>
                            {task.threadName}
                          </span>
                          <span className="text-xs font-bold text-white truncate" title={task.name}>
                            {task.name}
                          </span>
                        </div>

                        {/* Completion Percentage Badge */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {isCompleted ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>100% Done</span>
                            </span>
                          ) : (
                            <div className="flex items-center gap-1">
                              <span className={`font-mono text-sm sm:text-base font-black ${themeClasses.text}`}>
                                {task.progress}%
                              </span>
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Animated Progress Bar Track */}
                      <div className="relative w-full h-3.5 bg-slate-950 rounded-full border border-slate-800/90 p-0.5 overflow-hidden my-2.5 shadow-inner">
                        
                        {/* Milestone Tick Marks (25%, 50%, 75%) */}
                        <div className="absolute inset-0 pointer-events-none flex justify-between px-1/4 z-10 opacity-20">
                          <span className="w-px h-full bg-white ml-[25%]"></span>
                          <span className="w-px h-full bg-white ml-[25%]"></span>
                          <span className="w-px h-full bg-white ml-[25%]"></span>
                        </div>

                        {/* Fill Progress Bar with Gradient, Moving Stripes, and Glowing Tip */}
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden flex items-center justify-end pr-1 bg-gradient-to-r ${themeClasses.barGradient} ${themeClasses.glow} ${isSimulating ? 'animate-progress-stripes' : ''}`}
                          style={{ width: `${Math.max(task.progress, 3)}%` }}
                          role="progressbar"
                          aria-valuenow={task.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          {/* Shimmer effect overlay */}
                          {isSimulating && (
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>
                          )}

                          {/* Leading tip dot */}
                          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm shrink-0 z-10"></span>
                        </div>

                      </div>

                      {/* Bottom Details: Step & Proxy Node */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 gap-1.5 font-mono pt-1">
                        <div className="truncate flex items-center gap-1.5 text-slate-300" title={task.currentStep}>
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0"></span>
                          <span className="truncate">{task.currentStep}</span>
                        </div>

                        <div className="shrink-0 flex items-center gap-2 text-slate-400 text-[10px]">
                          <span className="truncate max-w-[120px]" title={task.proxyIp}>
                            {task.proxyIp}
                          </span>
                          <span className="text-slate-500">&bull;</span>
                          <span className="text-sky-300 flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            ~{task.etaSeconds}s
                          </span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Live Terminal & Account Queue Grid */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Terminal View */}
              <div className="lg:col-span-7 bg-black/60 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-sky-400" />
                    Automation Logs (Stdout)
                  </span>
                  <button 
                    onClick={() => setSimulatedLogs(['[SYSTEM] Logs cleared.', '[SYSTEM] Ready.'])}
                    className="hover:text-slate-200 transition-colors"
                    title="Clear Logs"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {simulatedLogs.map((log, i) => (
                    <div 
                      key={i} 
                      className={`${
                        log.includes('SUCCESS') || log.includes('Account saved') 
                          ? 'text-emerald-400' 
                          : log.includes('SYSTEM') 
                          ? 'text-sky-400' 
                          : 'text-slate-300'
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                  {isSimulating && (
                    <div className="text-sky-400 flex items-center gap-1.5 pt-1">
                      <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                      <span>Processing next proxy thread queue...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sample Created Accounts List */}
              <div className="lg:col-span-5 bg-slate-900/60 rounded-xl p-4 border border-slate-800">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Recent Accounts Ready
                  </span>
                  <button
                    onClick={handleExportSampleCSV}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Export CSV</span>
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  {SAMPLE_ACCOUNTS.map((acc) => (
                    <div 
                      key={acc.id}
                      onClick={() => setInspectedAccount(acc)}
                      className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-sky-500/50 flex items-center justify-between cursor-pointer transition-all group"
                    >
                      <div className="truncate pr-2">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{acc.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">({acc.proxyIp})</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono truncate">{acc.email}</div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border font-mono ${
                          acc.status === 'LIVE_VERIFIED'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        }`}>
                          {acc.status === 'LIVE_VERIFIED' ? 'LIVE 2FA' : 'PROFILE OK'}
                        </span>
                        <span className="p-1 rounded bg-slate-700/70 text-slate-300 group-hover:text-white group-hover:bg-blue-600 transition-colors" title="Inspect Account Credentials &amp; 2FA">
                          <Eye className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-slate-500 mt-3 italic">
                  💡 In production, all credentials, 2FA backup codes, and cookie JSON strings are formatted into ready-to-use CSV files.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Human Behavior Batch Scheduler */}
        {activeTab === 'scheduler' && (
          <BatchScheduler />
        )}

        {/* Tab 3: Screenshots View */}
        {activeTab === 'screenshots' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Quick Live Progress Bar Banner on Screenshots View */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono">
                    Live Task Progress Active
                  </span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  4 Automation Threads Running &bull; Overall Batch: {progress}%
                </div>
                <div className="text-xs text-slate-400 max-w-lg">
                  Visual feedback for account registration, anti-detect spoofing, and profile building tasks.
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="w-36 sm:w-48 bg-slate-950 rounded-full h-3 border border-slate-700/80 overflow-hidden relative p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 rounded-full transition-all duration-700 animate-progress-stripes"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <button
                  onClick={() => setActiveTab('simulator')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <span>Open Live Tasks View</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-center mb-2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#1e3c72] to-[#2563eb] shadow-md">
                <i className="fa-solid fa-bolt text-amber-300 text-xs"></i>
                <span>Live Desktop Application Windows</span>
              </span>
            </div>

            {/* Dashboard Top Image */}
            <div className="group relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-900">
              <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  <span className="ml-2 text-xs font-mono text-slate-400">PRO_SAN_Registration_Control_Center.exe</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-400">Windows 64-bit | Thread Pool: Active</div>
              </div>
              <img
                src="/dashboard_top.png"
                alt="PRO•SAN Dashboard - Main View"
                className="w-full h-auto object-cover block"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Dashboard Bottom Image */}
            <div className="group relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-900">
              <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-700 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-slate-700 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-slate-700 inline-block"></span>
                  <span className="ml-2 text-xs font-mono text-slate-400">PRO_SAN_Multi_Browser_Logs_Manager.exe</span>
                </div>
                <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  All Proxies Operational
                </div>
              </div>
              <img
                src="/dashboard_bottom.png"
                alt="PRO•SAN Dashboard - Monitoring View"
                className="w-full h-auto object-cover block"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

      </div>

      {/* Account Profile & 2FA Inspector Modal */}
      <AccountInspectorModal
        account={inspectedAccount}
        onClose={() => setInspectedAccount(null)}
      />

      {/* Automation Engine Configuration Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 text-sky-400 flex items-center justify-center">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Engine Runtime Configuration</h3>
                  <p className="text-xs text-slate-400">Tune multi-threading, proxy routing &amp; stealth thresholds.</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form controls */}
            <div className="py-4 space-y-4 text-xs font-mono">
              {/* Concurrent Threads Slider */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300 font-bold">Concurrent Browser Threads</span>
                  <span className="text-sky-400 font-black text-sm">{activeThreads} Windows</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={activeThreads}
                  onChange={(e) => setActiveThreads(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1 (Light)</span>
                  <span>4 (Default)</span>
                  <span>8 (Pro)</span>
                  <span>16 (Max)</span>
                </div>
              </div>

              {/* Proxy Region Selector */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <label className="block text-slate-300 font-bold mb-1.5">
                  Proxy Routing Pool
                </label>
                <select
                  value={proxyRegion}
                  onChange={(e) => setProxyRegion(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                >
                  <option value="US Residential (AT&T)">US Residential (AT&T / Verizon)</option>
                  <option value="UK Mobile 4G (EE/Vodafone)">UK Mobile 4G (EE / Vodafone)</option>
                  <option value="Germany Fiber (Telekom)">Germany Fiber (Telekom / Vodafone)</option>
                  <option value="Canada Residential (Rogers)">Canada Residential (Rogers / Bell)</option>
                  <option value="Vietnam ISP (Viettel)">Vietnam ISP (Viettel / FPT)</option>
                  <option value="Global SOCKS5 Rotating">Global SOCKS5 Rotating Pool</option>
                </select>
              </div>

              {/* Typing Velocity */}
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                <label className="block text-slate-300 font-bold mb-1.5">
                  Keystroke &amp; Mouse Velocity
                </label>
                <select
                  value={typingVelocity}
                  onChange={(e) => setTypingVelocity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-sky-500"
                >
                  <option value="Humanized (120-250ms)">Humanized Natural (120-250ms delay with micro-jitter)</option>
                  <option value="Ultra-Stealth (250-450ms)">Ultra-Stealth Slow (250-450ms with hesitation curves)</option>
                  <option value="Turbo (40-80ms)">Turbo Fast (40-80ms — recommended with clean residential IPs)</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Changes apply dynamically
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setSimulatedLogs((prev) => [
                      ...prev,
                      `[CONFIG] Applied: ${activeThreads} Threads | ${proxyRegion} | ${typingVelocity}`
                    ]);
                    setShowSettingsModal(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  Apply &amp; Deploy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
