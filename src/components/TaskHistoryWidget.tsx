import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Filter, 
  Search, 
  Wifi, 
  UserCheck, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Sparkles,
  ArrowDown,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Radio
} from 'lucide-react';

export interface LogEntry {
  id: string;
  timestamp: string;
  threadId: number;
  threadName: string;
  action: 'Account created' | 'Proxy switched' | 'SMS OTP verified' | 'Fingerprint masked' | 'Cookie injected' | 'Page created' | 'Warmup interaction' | 'Error recovered';
  message: string;
  proxyIp?: string;
  accountEmail?: string;
  level: 'success' | 'info' | 'warning' | 'purple';
}

interface ThreadStatus {
  id: number;
  name: string;
  mode: string;
  status: 'active' | 'rotating' | 'cooling' | 'registering';
  proxy: string;
  tasksCompleted: number;
  ping: number;
}

const INITIAL_THREADS: ThreadStatus[] = [
  { id: 1, name: 'Thread #1', mode: 'Auto-Registration Alpha', status: 'registering', proxy: '185.220.101.42 (US)', tasksCompleted: 42, ping: 38 },
  { id: 2, name: 'Thread #2', mode: 'Profile & Avatar Builder', status: 'active', proxy: '194.26.29.110 (UK)', tasksCompleted: 38, ping: 45 },
  { id: 3, name: 'Thread #3', mode: 'Proxy Rotator & Warmup', status: 'rotating', proxy: '91.202.233.15 (DE)', tasksCompleted: 51, ping: 29 },
  { id: 4, name: 'Thread #4', mode: 'Unlimited Page Publisher', status: 'active', proxy: '142.112.88.74 (CA)', tasksCompleted: 27, ping: 52 },
];

const SAMPLE_LOGS: LogEntry[] = [
  {
    id: 'log-001',
    timestamp: '15:35:01.120',
    threadId: 1,
    threadName: 'Thread #1',
    action: 'Proxy switched',
    message: 'Switched to residential node 185.220.101.42 (ISP: Comcast USA, Latency: 38ms)',
    proxyIp: '185.220.101.42',
    level: 'purple'
  },
  {
    id: 'log-002',
    timestamp: '15:35:04.450',
    threadId: 1,
    threadName: 'Thread #1',
    action: 'Fingerprint masked',
    message: 'Canvas 2D & WebGL audio noise randomized. Chrome 128 / macOS Spoofed.',
    level: 'info'
  },
  {
    id: 'log-003',
    timestamp: '15:35:08.810',
    threadId: 2,
    threadName: 'Thread #2',
    action: 'Warmup interaction',
    message: 'Simulated 45s mouse curve scroll on Facebook Marketplace feed; 3 posts hovered.',
    level: 'info'
  },
  {
    id: 'log-004',
    timestamp: '15:35:12.230',
    threadId: 1,
    threadName: 'Thread #1',
    action: 'SMS OTP verified',
    message: 'Virtual SMS carrier assigned: +1 (202) 555-0144. Received code [839210].',
    level: 'info'
  },
  {
    id: 'log-005',
    timestamp: '15:35:15.910',
    threadId: 1,
    threadName: 'Thread #1',
    action: 'Account created',
    message: 'Account successfully registered: daniel.h99@outlook.com (FBID: 10009848192). Live 2FA key saved.',
    accountEmail: 'daniel.h99@outlook.com',
    level: 'success'
  },
  {
    id: 'log-006',
    timestamp: '15:35:18.420',
    threadId: 3,
    threadName: 'Thread #3',
    action: 'Proxy switched',
    message: 'Rotation timer triggered (interval: 3 mins). New IP: 91.202.233.15 (Frankfurt, DE)',
    proxyIp: '91.202.233.15',
    level: 'purple'
  },
  {
    id: 'log-007',
    timestamp: '15:35:22.750',
    threadId: 4,
    threadName: 'Thread #4',
    action: 'Page created',
    message: 'Created Facebook Fan Page "Apex Digital Media" with custom category, cover and bio.',
    level: 'success'
  },
  {
    id: 'log-008',
    timestamp: '15:35:26.110',
    threadId: 2,
    threadName: 'Thread #2',
    action: 'Cookie injected',
    message: 'Exported active c_user and xs session cookies into secure encrypted profile store.',
    level: 'info'
  }
];

const RANDOM_NAMES = [
  'alex.carter', 'sophia.martinez', 'ryan.evans', 'elena.rostova', 'david.kim', 'marcus.vance', 'chloe.taylor'
];
const DOMAINS = ['outlook.com', 'gmail.com', 'yahoo.com', 'proton.me'];
const PROXY_LOCATIONS = [
  { ip: '173.245.58.12', loc: 'New York, US', isp: 'Verizon' },
  { ip: '185.190.141.8', loc: 'London, UK', isp: 'Vodafone' },
  { ip: '45.133.1.99', loc: 'Toronto, CA', isp: 'Rogers' },
  { ip: '82.165.197.1', loc: 'Berlin, DE', isp: 'Deutsche Telekom' },
  { ip: '103.21.244.0', loc: 'Tokyo, JP', isp: 'NTT Comms' }
];

export const TaskHistoryWidget: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>(SAMPLE_LOGS);
  const [selectedThread, setSelectedThread] = useState<number | 'all'>('all');
  const [selectedActionFilter, setSelectedActionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLive, setIsLive] = useState(true);
  const [streamSpeed, setStreamSpeed] = useState<number>(1600); // ms
  const [autoScroll, setAutoScroll] = useState(true);
  const [threads, setThreads] = useState<ThreadStatus[]>(INITIAL_THREADS);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom if autoScroll is enabled
  useEffect(() => {
    if (autoScroll && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  // Live streaming interval generator
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const threadId = Math.floor(Math.random() * 4) + 1;
      const threadName = `Thread #${threadId}`;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(Math.floor(Math.random() * 900 + 100))}`;

      const actionTypes: LogEntry['action'][] = [
        'Account created',
        'Proxy switched',
        'SMS OTP verified',
        'Fingerprint masked',
        'Cookie injected',
        'Warmup interaction',
        'Page created',
        'Proxy switched',
        'Account created'
      ];

      const chosenAction = actionTypes[Math.floor(Math.random() * actionTypes.length)];
      let message = '';
      let level: LogEntry['level'] = 'info';
      let proxyIp: string | undefined = undefined;
      let accountEmail: string | undefined = undefined;

      if (chosenAction === 'Account created') {
        const name = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
        const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
        const email = `${name}_${Math.floor(Math.random() * 899 + 100)}@${domain}`;
        const fbid = `1000${Math.floor(Math.random() * 8999999 + 1000000)}`;
        message = `Account verified & finalized: ${email} (FB ID: ${fbid}). Full 2FA & cookie bundle exported.`;
        level = 'success';
        accountEmail = email;

        // Update thread stats
        setThreads(prev => prev.map(t => t.id === threadId ? { ...t, tasksCompleted: t.tasksCompleted + 1, status: 'active' } : t));
      } else if (chosenAction === 'Proxy switched') {
        const p = PROXY_LOCATIONS[Math.floor(Math.random() * PROXY_LOCATIONS.length)];
        message = `Proxy switched to ${p.ip} (${p.loc} | ISP: ${p.isp}). SSL handshake 0-RTT: 32ms.`;
        level = 'purple';
        proxyIp = p.ip;

        // Update thread status
        setThreads(prev => prev.map(t => t.id === threadId ? { ...t, proxy: `${p.ip} (${p.loc.split(',')[1]?.trim() || 'Node'})`, ping: Math.floor(Math.random() * 30 + 25), status: 'rotating' } : t));
      } else if (chosenAction === 'SMS OTP verified') {
        const areaCode = Math.floor(Math.random() * 800 + 200);
        const code = Math.floor(Math.random() * 899999 + 100000);
        message = `SMS gateway matched virtual SIM +1 (${areaCode}) 555-${Math.floor(Math.random() * 8999 + 1000)}. Code [${code}] auto-submitted.`;
        level = 'info';
      } else if (chosenAction === 'Fingerprint masked') {
        const gpus = ['NVIDIA GeForce RTX 4070', 'Apple M2 Pro Metal', 'AMD Radeon RX 7800 XT'];
        const gpu = gpus[Math.floor(Math.random() * gpus.length)];
        message = `Browser canvas & WebRTC masked. Screen: 1920x1080, AudioContext jitter added, GPU: ${gpu}.`;
        level = 'info';
      } else if (chosenAction === 'Page created') {
        const niches = ['Fitness & Wellness', 'E-commerce Deals', 'Tech Gadget Hub', 'Digital Marketing Growth'];
        const niche = niches[Math.floor(Math.random() * niches.length)];
        message = `High-trust Fan Page published in "${niche}" category. Instant invite sequence primed.`;
        level = 'success';
      } else if (chosenAction === 'Warmup interaction') {
        const secs = Math.floor(Math.random() * 30 + 15);
        message = `Humanized behavioral warmup: scrolled feed for ${secs}s, reacted to 1 video, expanded comments.`;
        level = 'info';
      } else if (chosenAction === 'Cookie injected') {
        message = `Session persisted. Auth cookies [c_user, xs, datr, sb] serialized to local database storage.`;
        level = 'info';
      } else {
        message = `Thread watchdog heartbeat OK. All connection sockets isolated.`;
        level = 'info';
      }

      const newEntry: LogEntry = {
        id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: timeStr,
        threadId,
        threadName,
        action: chosenAction,
        message,
        proxyIp,
        accountEmail,
        level
      };

      setLogs(prev => [...prev.slice(-150), newEntry]);
    }, streamSpeed);

    return () => clearInterval(interval);
  }, [isLive, streamSpeed]);

  // Filtered log entries
  const filteredLogs = logs.filter(log => {
    if (selectedThread !== 'all' && log.threadId !== selectedThread) return false;
    if (selectedActionFilter !== 'all' && log.action !== selectedActionFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchMsg = log.message.toLowerCase().includes(q);
      const matchAction = log.action.toLowerCase().includes(q);
      const matchThread = log.threadName.toLowerCase().includes(q);
      const matchProxy = log.proxyIp?.toLowerCase().includes(q);
      const matchEmail = log.accountEmail?.toLowerCase().includes(q);
      return matchMsg || matchAction || matchThread || matchProxy || matchEmail;
    }
    return true;
  });

  // Action counts
  const accountCreatedCount = logs.filter(l => l.action === 'Account created').length;
  const proxySwitchedCount = logs.filter(l => l.action === 'Proxy switched').length;
  const otpCount = logs.filter(l => l.action === 'SMS OTP verified').length;

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleExportLogs = () => {
    const textData = logs.map(l => `[${l.timestamp}] [${l.threadName}] [${l.action}] ${l.message}`).join('\n');
    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prosan_task_history_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSimulateCustomAction = (type: 'Account created' | 'Proxy switched') => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(Math.floor(Math.random() * 900 + 100))}`;
    const threadId = selectedThread === 'all' ? (Math.floor(Math.random() * 4) + 1) : selectedThread;

    const newLog: LogEntry = type === 'Account created' ? {
      id: `log-manual-${Date.now()}`,
      timestamp: timeStr,
      threadId,
      threadName: `Thread #${threadId}`,
      action: 'Account created',
      message: `Manual trigger: Account live & verified (m.scott_pro@gmail.com). All cookies confirmed.`,
      accountEmail: 'm.scott_pro@gmail.com',
      level: 'success'
    } : {
      id: `log-manual-${Date.now()}`,
      timestamp: timeStr,
      threadId,
      threadName: `Thread #${threadId}`,
      action: 'Proxy switched',
      message: `Manual trigger: Instant proxy switch requested. Re-routed via 178.62.204.18 (London UK, 29ms).`,
      proxyIp: '178.62.204.18',
      level: 'purple'
    };

    setLogs(prev => [...prev, newLog]);
  };

  return (
    <section id="task-history" className="py-14 sm:py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase text-sky-400 bg-sky-950/60 border border-sky-800/60 mb-2">
              <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>Multi-Thread Automation Monitor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Task History</span>
              <span className="font-brand font-bold text-sky-400 text-xl sm:text-2xl">&bull; PRO•SAN</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Live stream of real-time execution events, proxy rotations, and account completions across isolated automation threads.
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Live Accounts</div>
                <div className="text-sm sm:text-base font-black text-emerald-400 font-mono">+{accountCreatedCount} Created</div>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400"></div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Proxy Rotations</div>
                <div className="text-sm sm:text-base font-black text-purple-400 font-mono">{proxySwitchedCount} Switched</div>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/70 rounded-xl px-3.5 py-2 flex items-center gap-2.5 shadow-sm">
              <Radio className="w-4 h-4 text-sky-400" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Active Threads</div>
                <div className="text-sm sm:text-base font-black text-sky-400 font-mono">4 Concurrency</div>
              </div>
            </div>
          </div>
        </div>

        {/* Thread Status Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {threads.map(thread => {
            const isSelected = selectedThread === thread.id;
            return (
              <button
                key={thread.id}
                onClick={() => setSelectedThread(isSelected ? 'all' : thread.id)}
                className={`text-left p-3 rounded-xl border transition-all relative overflow-hidden group ${
                  isSelected 
                    ? 'bg-blue-900/40 border-blue-500 shadow-md shadow-blue-500/10 ring-1 ring-blue-400' 
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-mono text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                      {thread.name}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    thread.status === 'registering' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : thread.status === 'rotating'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    {thread.status}
                  </span>
                </div>

                <div className="text-[11px] font-medium text-slate-300 truncate">{thread.mode}</div>
                <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-slate-800/80">
                  <span className="truncate max-w-[130px]" title={thread.proxy}>
                    {thread.proxy}
                  </span>
                  <span className="text-emerald-400 shrink-0">{thread.ping}ms</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Widget Main Box */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
          
          {/* Top Command Toolbar */}
          <div className="p-3 sm:p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            
            {/* Left: Stream Status & Play/Pause */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLive(!isLive)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isLive 
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm' 
                    : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                }`}
              >
                {isLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isLive ? 'Live Stream Active' : 'Stream Paused'}</span>
              </button>

              <button
                onClick={handleClearLogs}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Clear Logs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setAutoScroll(!autoScroll)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  autoScroll ? 'text-sky-400 bg-sky-950/60 border border-sky-800/60' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Keep pinned to latest logs"
              >
                <ArrowDown className={`w-3 h-3 ${autoScroll ? 'animate-bounce' : ''}`} />
                <span className="hidden xs:inline">Auto-Scroll</span>
              </button>
            </div>

            {/* Manual Simulation Quick Triggers */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400 hidden lg:inline">Inject Test Event:</span>
              <button
                onClick={() => handleSimulateCustomAction('Account created')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/60 transition-colors"
              >
                <UserCheck className="w-3 h-3 text-emerald-400" />
                <span>+ Account Created</span>
              </button>

              <button
                onClick={() => handleSimulateCustomAction('Proxy switched')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-purple-300 bg-purple-950/50 hover:bg-purple-900/60 border border-purple-800/60 transition-colors"
              >
                <Wifi className="w-3 h-3 text-purple-400" />
                <span>+ Proxy Switched</span>
              </button>

              <button
                onClick={handleExportLogs}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors"
                title="Download Log Stream"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>

          </div>

          {/* Filtering & Search Bar */}
          <div className="px-3 sm:px-4 py-2.5 bg-slate-900/50 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
            
            {/* Thread Filters */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Thread:</span>
              </span>

              <button
                onClick={() => setSelectedThread('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                  selectedThread === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All (Aggregated)
              </button>

              {[1, 2, 3, 4].map(id => (
                <button
                  key={id}
                  onClick={() => setSelectedThread(id)}
                  className={`px-2 py-1 rounded-md text-xs font-mono font-bold transition-all ${
                    selectedThread === id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Thread #{id}
                </button>
              ))}
            </div>

            {/* Action Type Filter & Search Box */}
            <div className="flex items-center gap-2 grow sm:grow-0">
              <select
                value={selectedActionFilter}
                onChange={(e) => setSelectedActionFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              >
                <option value="all">All Action Types</option>
                <option value="Account created">Account created</option>
                <option value="Proxy switched">Proxy switched</option>
                <option value="SMS OTP verified">SMS OTP verified</option>
                <option value="Fingerprint masked">Fingerprint masked</option>
                <option value="Cookie injected">Cookie injected</option>
                <option value="Page created">Page created</option>
                <option value="Warmup interaction">Warmup interaction</option>
              </select>

              <div className="relative grow sm:w-48">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search live stream..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

          </div>

          {/* Scrollable Live Stream Logs Container */}
          <div 
            ref={scrollContainerRef}
            className="p-3 sm:p-4 overflow-y-auto max-h-[440px] font-mono text-xs text-slate-300 space-y-1.5 select-text"
            style={{ scrollBehavior: 'smooth' }}
          >
            {filteredLogs.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <Terminal className="w-8 h-8 mx-auto mb-2 opacity-40 text-sky-400" />
                <p className="text-sm font-semibold text-slate-400">No log entries match your current filter</p>
                <p className="text-xs text-slate-500 mt-1">Adjust your filters or resume the stream</p>
              </div>
            ) : (
              filteredLogs.map((log) => {
                const isAccountCreated = log.action === 'Account created';
                const isProxySwitched = log.action === 'Proxy switched';
                const isOtp = log.action === 'SMS OTP verified';

                return (
                  <div 
                    key={log.id}
                    className={`p-2 rounded-lg border transition-all flex flex-col md:flex-row md:items-center justify-between gap-2 leading-relaxed ${
                      isAccountCreated
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-100 hover:bg-emerald-950/30'
                        : isProxySwitched
                        ? 'bg-purple-950/20 border-purple-800/40 text-purple-100 hover:bg-purple-950/30'
                        : isOtp
                        ? 'bg-sky-950/20 border-sky-800/40 text-sky-100 hover:bg-sky-950/30'
                        : 'bg-slate-900/60 border-slate-800/60 text-slate-300 hover:bg-slate-900/90'
                    }`}
                  >
                    {/* Log Row Content */}
                    <div className="flex items-start md:items-center gap-2.5 grow overflow-hidden">
                      
                      {/* Timestamp */}
                      <span className="text-slate-500 text-[11px] shrink-0 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-600 hidden sm:inline" />
                        {log.timestamp}
                      </span>

                      {/* Thread Badge */}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 tracking-wider uppercase ${
                        log.threadId === 1 ? 'bg-blue-900/60 text-blue-300 border border-blue-700/50' :
                        log.threadId === 2 ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-700/50' :
                        log.threadId === 3 ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50' :
                        'bg-teal-900/60 text-teal-300 border border-teal-700/50'
                      }`}>
                        {log.threadName}
                      </span>

                      {/* Action Pill Badge */}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 inline-flex items-center gap-1 ${
                        isAccountCreated ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        isProxySwitched ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                        isOtp ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' :
                        'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        {isAccountCreated && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        {isProxySwitched && <Wifi className="w-3 h-3 text-purple-400" />}
                        {isOtp && <ShieldCheck className="w-3 h-3 text-sky-400" />}
                        <span>{log.action}</span>
                      </span>

                      {/* Message Content */}
                      <span className="truncate text-xs text-slate-200" title={log.message}>
                        {log.message}
                      </span>

                    </div>

                    {/* Right Extra Metadata (if any) */}
                    <div className="shrink-0 flex items-center gap-2 text-[10px] font-mono text-slate-400 pl-6 md:pl-0">
                      {log.proxyIp && (
                        <span className="px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-300 border border-purple-800/40">
                          IP: {log.proxyIp}
                        </span>
                      )}
                      {log.accountEmail && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-900/40 text-emerald-300 border border-emerald-800/40">
                          2FA LIVE
                        </span>
                      )}
                    </div>

                  </div>
                );
              })
            )}

            {/* Live Indicator at bottom */}
            {isLive && (
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-sky-400">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                  <span>Streaming real-time events across 4 active worker instances...</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Stream Rate:</span>
                  <button
                    onClick={() => setStreamSpeed(speed => speed === 1600 ? 800 : speed === 800 ? 2500 : 1600)}
                    className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white text-[10px]"
                  >
                    {streamSpeed === 800 ? 'Fast (0.8s)' : streamSpeed === 1600 ? 'Normal (1.6s)' : 'Relaxed (2.5s)'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Buffer: <strong className="text-slate-200">{logs.length} entries</strong></span>
              </span>
              <span>&bull;</span>
              <span>Showing: <strong className="text-slate-200">{filteredLogs.length} events</strong></span>
            </div>

            <div className="text-[11px] text-slate-500 font-mono">
              Auto-purged &gt; 150 entries &bull; 100% Client Memory Safe
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
