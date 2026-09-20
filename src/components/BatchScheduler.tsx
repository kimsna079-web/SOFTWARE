import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  Play, 
  Pause, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Sliders, 
  Coffee, 
  Sun, 
  Moon, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Timer, 
  ChevronRight, 
  Eye, 
  Activity, 
  BarChart2, 
  Settings2, 
  X, 
  Check, 
  UserCheck, 
  Fingerprint,
  Info,
  CalendarClock,
  ArrowRight
} from 'lucide-react';
import { AutomationBatch } from '../types';

interface BatchSchedulerProps {
  onQueueUpdate?: (count: number) => void;
}

const INITIAL_BATCHES: AutomationBatch[] = [
  {
    id: 'batch-01',
    name: 'US Residential Intake — Cohort Alpha',
    moduleTitle: 'Auto-Registration & 2FA Setup',
    targetCount: 20,
    completedCount: 8,
    status: 'running',
    scheduledStartTime: '2026-09-19T18:00',
    scheduledStartTimeFormatted: 'Active Now (Started 18:00)',
    minDelaySec: 40,
    maxDelaySec: 130,
    delayDistribution: 'gaussian',
    coffeeBreakEnabled: true,
    coffeeBreakEvery: 8,
    coffeeBreakDurationMin: 6,
    circadianEnabled: true,
    circadianWindow: '08:30 AM - 09:30 PM EST',
    assignedProxy: 'US Residential (AT&T 10-Port SOCKS5)',
    threads: 3,
    currentActionLog: 'Emulating human hesitation (typing OTP via micro-jitter 142ms)...',
    nextAccountDelaySeconds: 38,
    historyLogs: [
      { timestamp: '18:02:14', accountIndex: 1, delayTakenSec: 54, event: 'Account david.m_91@gmail.com verified (+54s delay)' },
      { timestamp: '18:04:20', accountIndex: 2, delayTakenSec: 126, event: 'Account sarah.k_agency@gmail.com verified (+126s delay)' },
      { timestamp: '18:05:48', accountIndex: 3, delayTakenSec: 88, event: 'Account ryan.b_growth@outlook.com verified (+88s delay)' },
      { timestamp: '18:07:30', accountIndex: 4, delayTakenSec: 102, event: 'Account lisa.t_media@yahoo.com verified (+102s delay)' },
      { timestamp: '18:09:12', accountIndex: 5, delayTakenSec: 42, event: 'Account kevin.w_ads@gmail.com verified (+42s delay)' },
      { timestamp: '18:11:05', accountIndex: 6, delayTakenSec: 113, event: 'Account jessica.p_scale@gmail.com verified (+113s delay)' },
      { timestamp: '18:12:40', accountIndex: 7, delayTakenSec: 95, event: 'Account brian.m_ecom@outlook.com verified (+95s delay)' },
      { timestamp: '18:14:18', accountIndex: 8, delayTakenSec: 68, event: 'Account emma.d_leads@gmail.com verified (+68s delay)' }
    ]
  },
  {
    id: 'batch-02',
    name: 'Evening Profile Hydration & AI Avatars',
    moduleTitle: 'Smart Profile Builder',
    targetCount: 15,
    completedCount: 0,
    status: 'scheduled',
    scheduledStartTime: '2026-09-19T21:15',
    scheduledStartTimeFormatted: 'Today at 09:15 PM EST',
    startDelayRemainingSeconds: 245,
    minDelaySec: 50,
    maxDelaySec: 160,
    delayDistribution: 'gaussian',
    coffeeBreakEnabled: true,
    coffeeBreakEvery: 6,
    coffeeBreakDurationMin: 8,
    circadianEnabled: true,
    circadianWindow: '08:30 AM - 10:00 PM EST',
    assignedProxy: 'Germany Fiber (Telekom Residential)',
    threads: 2,
    currentActionLog: 'Queued — Waiting for scheduled trigger time...',
    historyLogs: []
  },
  {
    id: 'batch-03',
    name: 'Organic Feed Warmup & Fan Page Launch',
    moduleTitle: 'Active Interaction & Page Creation',
    targetCount: 10,
    completedCount: 0,
    status: 'scheduled',
    scheduledStartTime: '2026-09-20T09:30',
    scheduledStartTimeFormatted: 'Tomorrow at 09:30 AM EST',
    startDelayRemainingSeconds: 3820,
    minDelaySec: 60,
    maxDelaySec: 180,
    delayDistribution: 'exponential',
    coffeeBreakEnabled: true,
    coffeeBreakEvery: 5,
    coffeeBreakDurationMin: 10,
    circadianEnabled: true,
    circadianWindow: '09:00 AM - 08:00 PM EST',
    assignedProxy: 'UK Mobile 4G (EE / Vodafone Rotating)',
    threads: 2,
    currentActionLog: 'Scheduled for tomorrow morning office-hours window.',
    historyLogs: []
  },
  {
    id: 'batch-04',
    name: 'Nightly Cookie Validation Sweep',
    moduleTitle: 'Live Results & Cookie Exporter',
    targetCount: 30,
    completedCount: 30,
    status: 'completed',
    scheduledStartTime: '2026-09-19T14:00',
    scheduledStartTimeFormatted: 'Today at 02:00 PM (Finished)',
    minDelaySec: 25,
    maxDelaySec: 75,
    delayDistribution: 'uniform',
    coffeeBreakEnabled: false,
    coffeeBreakEvery: 10,
    coffeeBreakDurationMin: 5,
    circadianEnabled: false,
    circadianWindow: 'Unrestricted',
    assignedProxy: 'Global SOCKS5 Residential Pool',
    threads: 4,
    currentActionLog: 'Batch completed 100% successfully. 30 session cookies exported.',
    historyLogs: []
  }
];

export const BatchScheduler: React.FC<BatchSchedulerProps> = ({ onQueueUpdate }) => {
  const [batches, setBatches] = useState<AutomationBatch[]>(INITIAL_BATCHES);
  const [filterStatus, setFilterStatus] = useState<'all' | 'running' | 'scheduled' | 'completed'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBatchForInspection, setSelectedBatchForInspection] = useState<AutomationBatch | null>(null);
  
  // Master queue state
  const [isSchedulerActive, setIsSchedulerActive] = useState(true);

  // Form State for Creating New Batch
  const [formName, setFormName] = useState('Campaign Warmup Wave #5');
  const [formModule, setFormModule] = useState('Auto-Registration & 2FA Setup');
  const [formTargetCount, setFormTargetCount] = useState(15);
  const [formThreads, setFormThreads] = useState(3);
  const [formProxy, setFormProxy] = useState('US Residential (AT&T 10-Port SOCKS5)');
  const [formStartOption, setFormStartOption] = useState<'immediate' | 'relative' | 'specific'>('immediate');
  const [formRelativeMinutes, setFormRelativeMinutes] = useState(15);
  const [formSpecificDateTime, setFormSpecificDateTime] = useState('2026-09-19T22:00');
  
  // Randomized Delay Parameters
  const [formMinDelay, setFormMinDelay] = useState(45);
  const [formMaxDelay, setFormMaxDelay] = useState(140);
  const [formDistribution, setFormDistribution] = useState<'gaussian' | 'uniform' | 'exponential'>('gaussian');
  
  // Human Mimicry Rest Parameters
  const [formCoffeeBreak, setFormCoffeeBreak] = useState(true);
  const [formCoffeeEvery, setFormCoffeeEvery] = useState(8);
  const [formCoffeeDuration, setFormCoffeeDuration] = useState(7);
  const [formCircadian, setFormCircadian] = useState(true);

  // Simulated Delay Curve Generator for visual preview
  const [previewDelays, setPreviewDelays] = useState<number[]>([]);

  // Update visual delay preview whenever min/max/distribution changes
  useEffect(() => {
    const generated: number[] = [];
    const count = 9;
    for (let i = 0; i < count; i++) {
      if (formDistribution === 'gaussian') {
        // Approximate Box-Muller normal distribution centered around midpoint
        const mean = (formMinDelay + formMaxDelay) / 2;
        const stdDev = (formMaxDelay - formMinDelay) / 4.5;
        const u1 = Math.random() || 0.5;
        const u2 = Math.random() || 0.5;
        const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        const val = Math.round(Math.max(formMinDelay, Math.min(formMaxDelay, mean + z * stdDev)));
        generated.push(val);
      } else if (formDistribution === 'exponential') {
        const factor = Math.pow(i / (count - 1), 1.6);
        const val = Math.round(formMinDelay + factor * (formMaxDelay - formMinDelay));
        generated.push(val);
      } else {
        // Uniform jitter
        const val = Math.round(formMinDelay + Math.random() * (formMaxDelay - formMinDelay));
        generated.push(val);
      }
    }
    setPreviewDelays(generated);
  }, [formMinDelay, formMaxDelay, formDistribution]);

  // Live Timer Ticking for active queues and scheduled counts
  useEffect(() => {
    if (!isSchedulerActive) return;

    const interval = setInterval(() => {
      setBatches((prevBatches) =>
        prevBatches.map((batch) => {
          // If scheduled, count down startDelayRemainingSeconds
          if (batch.status === 'scheduled' && batch.startDelayRemainingSeconds) {
            const nextRemaining = batch.startDelayRemainingSeconds - 1;
            if (nextRemaining <= 0) {
              return {
                ...batch,
                status: 'running',
                scheduledStartTimeFormatted: 'Just Triggered',
                startDelayRemainingSeconds: undefined,
                currentActionLog: 'Starting initial thread allocation & proxy handshake...',
                nextAccountDelaySeconds: Math.floor(Math.random() * (batch.maxDelaySec - batch.minDelaySec)) + batch.minDelaySec
              };
            }
            return {
              ...batch,
              startDelayRemainingSeconds: nextRemaining
            };
          }

          // If running, simulate live account progress and delay countdown
          if (batch.status === 'running') {
            const delayLeft = (batch.nextAccountDelaySeconds ?? 20) - 1;
            if (delayLeft <= 0) {
              // Account completed!
              const nextCompleted = batch.completedCount + 1;
              const isFinished = nextCompleted >= batch.targetCount;
              const isCoffeeTime = batch.coffeeBreakEnabled && nextCompleted % batch.coffeeBreakEvery === 0 && !isFinished;

              const nextDelay = Math.floor(Math.random() * (batch.maxDelaySec - batch.minDelaySec)) + batch.minDelaySec;

              const newLog = {
                timestamp: new Date().toTimeString().split(' ')[0],
                accountIndex: nextCompleted,
                delayTakenSec: batch.nextAccountDelaySeconds || 45,
                event: isCoffeeTime 
                  ? `Account #${nextCompleted} verified. ☕ Human Coffee Break: Pausing execution for ${batch.coffeeBreakDurationMin} minutes.`
                  : `Account #${nextCompleted} verified (+${batch.nextAccountDelaySeconds || 45}s randomized human delay)`
              };

              return {
                ...batch,
                completedCount: nextCompleted,
                status: isFinished ? 'completed' : isCoffeeTime ? 'resting' : 'running',
                currentActionLog: isFinished 
                  ? 'Batch finalized. All accounts verified & session cookies saved.'
                  : isCoffeeTime
                  ? `☕ Human Rest Interval Active: Simulating user step-away for ${batch.coffeeBreakDurationMin}m.`
                  : `Emulating human hesitation (typing OTP via micro-jitter 135ms)...`,
                nextAccountDelaySeconds: isFinished ? undefined : isCoffeeTime ? batch.coffeeBreakDurationMin * 60 : nextDelay,
                historyLogs: [newLog, ...(batch.historyLogs || [])].slice(0, 15)
              };
            }

            return {
              ...batch,
              nextAccountDelaySeconds: delayLeft
            };
          }

          // If resting, count down rest
          if (batch.status === 'resting') {
            const restLeft = (batch.nextAccountDelaySeconds ?? 60) - 1;
            if (restLeft <= 0) {
              return {
                ...batch,
                status: 'running',
                currentActionLog: 'Coffee break concluded. Resuming humanized account queue...',
                nextAccountDelaySeconds: Math.floor(Math.random() * (batch.maxDelaySec - batch.minDelaySec)) + batch.minDelaySec
              };
            }
            return {
              ...batch,
              nextAccountDelaySeconds: restLeft
            };
          }

          return batch;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isSchedulerActive]);

  // Handle Form Submit
  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();

    let startRemaining: number | undefined = undefined;
    let formattedStart = 'Starts Immediately';
    let statusVal: AutomationBatch['status'] = 'running';

    if (formStartOption === 'relative') {
      startRemaining = formRelativeMinutes * 60;
      formattedStart = `Scheduled in ${formRelativeMinutes} mins`;
      statusVal = 'scheduled';
    } else if (formStartOption === 'specific') {
      startRemaining = 900; // default 15 min simulation for demo
      formattedStart = `Scheduled at ${formSpecificDateTime.replace('T', ' ')}`;
      statusVal = 'scheduled';
    }

    const newBatch: AutomationBatch = {
      id: `batch-${Date.now().toString().slice(-4)}`,
      name: formName,
      moduleTitle: formModule,
      targetCount: Number(formTargetCount),
      completedCount: 0,
      status: statusVal,
      scheduledStartTime: formSpecificDateTime,
      scheduledStartTimeFormatted: formattedStart,
      startDelayRemainingSeconds: startRemaining,
      minDelaySec: Number(formMinDelay),
      maxDelaySec: Number(formMaxDelay),
      delayDistribution: formDistribution,
      coffeeBreakEnabled: formCoffeeBreak,
      coffeeBreakEvery: Number(formCoffeeEvery),
      coffeeBreakDurationMin: Number(formCoffeeDuration),
      circadianEnabled: formCircadian,
      circadianWindow: formCircadian ? '08:30 AM - 10:00 PM EST' : 'Unrestricted',
      assignedProxy: formProxy,
      threads: Number(formThreads),
      currentActionLog: statusVal === 'running' 
        ? 'Initializing multi-threaded browser sandboxes & randomizing delay...'
        : 'Batch queued in scheduler. Waiting for trigger time window.',
      nextAccountDelaySeconds: statusVal === 'running' ? formMinDelay + 10 : undefined,
      historyLogs: []
    };

    setBatches([newBatch, ...batches]);
    setShowCreateModal(false);
    if (onQueueUpdate) {
      onQueueUpdate(batches.length + 1);
    }
  };

  const handleTogglePauseBatch = (id: string) => {
    setBatches((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            status: b.status === 'paused' ? 'running' : 'paused',
            currentActionLog: b.status === 'paused' ? 'Batch execution resumed.' : 'Batch paused by operator.'
          };
        }
        return b;
      })
    );
  };

  const handleForceRunNow = (id: string) => {
    setBatches((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            status: 'running',
            scheduledStartTimeFormatted: 'Triggered Manually (Running)',
            startDelayRemainingSeconds: undefined,
            nextAccountDelaySeconds: b.minDelaySec + 5,
            currentActionLog: 'Manually triggered ahead of schedule. Executing account #1...'
          };
        }
        return b;
      })
    );
  };

  const handleDeleteBatch = (id: string) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
  };

  const filteredBatches = batches.filter((b) => {
    if (filterStatus === 'running') return b.status === 'running' || b.status === 'resting';
    if (filterStatus === 'scheduled') return b.status === 'scheduled';
    if (filterStatus === 'completed') return b.status === 'completed';
    return true;
  });

  const activeRunningCount = batches.filter((b) => b.status === 'running' || b.status === 'resting').length;
  const scheduledCount = batches.filter((b) => b.status === 'scheduled').length;

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in duration-300">
      
      {/* Title / Machine Status Bar */}
      <div className="bg-slate-900/90 px-4 py-3 flex flex-wrap items-center justify-between border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-sky-400" />
            <span className="font-brand text-sm tracking-wider text-white">PRO•SAN</span>
            <span className="text-slate-400 font-mono text-xs hidden sm:inline">
              Automated Batch Scheduler &amp; Human Mimicry Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
            <Clock className="w-3 h-3 text-sky-400" />
            <span>Target TZ: EST (New York)</span>
          </div>

          <button
            onClick={() => setIsSchedulerActive(!isSchedulerActive)}
            className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
              isSchedulerActive 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30' 
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
            }`}
          >
            {isSchedulerActive ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            <span>{isSchedulerActive ? 'Scheduler Active' : 'Scheduler Suspended'}</span>
          </button>
        </div>
      </div>

      {/* Human Behavior Telemetry Stats Bar */}
      <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5 border-b border-slate-800/80 bg-slate-900/30">
        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/90">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Human Mimicry Index</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-1 font-display flex items-baseline gap-1">
            <span>99.8%</span>
            <span className="text-xs text-slate-500 font-normal font-sans">Stealth</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            Gaussian Jitter &bull; Random Delays
          </div>
        </div>

        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/90">
          <div className="text-[11px] text-slate-400 font-medium">Active Batch Execution</div>
          <div className="text-2xl font-black text-sky-400 mt-1 font-display flex items-baseline gap-1">
            <span>{activeRunningCount}</span>
            <span className="text-xs text-slate-500 font-normal font-sans">Running</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            Multi-threaded residential pool
          </div>
        </div>

        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/90">
          <div className="text-[11px] text-slate-400 font-medium">Upcoming Queue</div>
          <div className="text-2xl font-black text-amber-400 mt-1 font-display flex items-baseline gap-1">
            <span>{scheduledCount}</span>
            <span className="text-xs text-slate-500 font-normal font-sans">Scheduled</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            Timed to avoid nighttime flags
          </div>
        </div>

        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800/90">
          <div className="text-[11px] text-slate-400 font-medium">Human Rest Emulation</div>
          <div className="text-2xl font-black text-purple-400 mt-1 font-display flex items-baseline gap-1">
            <span>Active</span>
            <Coffee className="w-3.5 h-3.5 text-purple-400 ml-1" />
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            6-10 min coffee breaks every 8 accts
          </div>
        </div>
      </div>

      {/* Main Control Toolbar */}
      <div className="p-4 sm:p-6 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Batches ({batches.length})
          </button>
          <button
            onClick={() => setFilterStatus('running')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'running'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Running ({activeRunningCount})
          </button>
          <button
            onClick={() => setFilterStatus('scheduled')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'scheduled'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Scheduled ({scheduledCount})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'completed'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Action Button: Queue New Batch */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:from-[#18305c] hover:to-[#1d4ed8] transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Queue New Automation Batch</span>
        </button>
      </div>

      {/* Batches Queue Cards */}
      <div className="p-4 sm:p-6 space-y-4">
        {filteredBatches.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs font-mono">
            No automation batches found matching filter.
          </div>
        ) : (
          filteredBatches.map((batch) => {
            const percent = Math.round((batch.completedCount / batch.targetCount) * 100);
            const isRunning = batch.status === 'running';
            const isResting = batch.status === 'resting';
            const isScheduled = batch.status === 'scheduled';
            const isCompleted = batch.status === 'completed';
            const isPaused = batch.status === 'paused';

            return (
              <div
                key={batch.id}
                className={`bg-slate-900/60 rounded-xl p-4 sm:p-5 border transition-all ${
                  isRunning
                    ? 'border-sky-500/40 shadow-lg shadow-blue-500/5 bg-slate-900/90'
                    : isResting
                    ? 'border-purple-500/40 bg-purple-950/20'
                    : isScheduled
                    ? 'border-amber-500/30 bg-slate-900/50'
                    : isCompleted
                    ? 'border-slate-800 bg-slate-950/40'
                    : 'border-slate-800'
                }`}
              >
                {/* Batch Top Line */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                        {batch.name}
                      </h4>

                      {/* Status Badges */}
                      {isRunning && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                          RUNNING NOW
                        </span>
                      )}
                      {isResting && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                          <Coffee className="w-3 h-3 text-purple-300 animate-bounce" />
                          COFFEE BREAK REST
                        </span>
                      )}
                      {isScheduled && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                          <Timer className="w-3 h-3" />
                          SCHEDULED
                        </span>
                      )}
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-700/50 text-slate-300 border border-slate-600">
                          COMPLETED
                        </span>
                      )}
                      {isPaused && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          PAUSED
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-sky-300 font-medium">{batch.moduleTitle}</span>
                      <span>&bull;</span>
                      <span className="text-slate-300 font-mono">{batch.assignedProxy}</span>
                      <span>&bull;</span>
                      <span className="text-slate-400 font-mono">{batch.threads} Threads</span>
                    </div>
                  </div>

                  {/* Top Right Action Buttons */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {isScheduled && (
                      <button
                        onClick={() => handleForceRunNow(batch.id)}
                        className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                        title="Execute Immediately"
                      >
                        <Play className="w-3 h-3" />
                        <span>Run Now</span>
                      </button>
                    )}

                    {!isCompleted && !isScheduled && (
                      <button
                        onClick={() => handleTogglePauseBatch(batch.id)}
                        className={`p-1.5 rounded-lg border text-xs font-bold transition-colors ${
                          isPaused
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                        }`}
                        title={isPaused ? 'Resume Execution' : 'Pause Batch'}
                      >
                        {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedBatchForInspection(batch)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                      title="Inspect Batch Telemetry & Logs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteBatch(batch.id)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 border border-slate-700 transition-colors"
                      title="Remove from Queue"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar & Timing Indicators */}
                <div className="py-3">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="text-white font-bold">{batch.completedCount}</span>
                      <span className="text-slate-500">/</span>
                      <span>{batch.targetCount} Accounts Processed</span>
                      <span className="text-slate-500">({percent}%)</span>
                    </span>

                    {/* Live Timing / Delay Badge */}
                    {isRunning && batch.nextAccountDelaySeconds !== undefined && (
                      <span className="text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <Timer className="w-3 h-3 animate-spin" />
                        <span>Next account in {batch.nextAccountDelaySeconds}s [Randomized {batch.minDelaySec}s–{batch.maxDelaySec}s]</span>
                      </span>
                    )}

                    {isResting && batch.nextAccountDelaySeconds !== undefined && (
                      <span className="text-purple-300 font-bold flex items-center gap-1 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                        <Coffee className="w-3 h-3 text-purple-300" />
                        <span>Resting: Resumes in {Math.ceil(batch.nextAccountDelaySeconds / 60)}m ({batch.nextAccountDelaySeconds}s)</span>
                      </span>
                    )}

                    {isScheduled && batch.startDelayRemainingSeconds !== undefined && (
                      <span className="text-amber-300 font-bold flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        <Clock className="w-3 h-3" />
                        <span>Starts in {Math.floor(batch.startDelayRemainingSeconds / 60)}m {batch.startDelayRemainingSeconds % 60}s</span>
                      </span>
                    )}
                  </div>

                  <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-slate-500'
                          : isResting
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-400'
                          : 'bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-400 animate-progress-stripes'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Human Behavior Badges & Action Log */}
                <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between text-xs text-slate-400 gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                      <Fingerprint className="w-3 h-3 text-sky-400" />
                      <span>{batch.delayDistribution.toUpperCase()} Delay ({batch.minDelaySec}s–{batch.maxDelaySec}s)</span>
                    </span>

                    {batch.coffeeBreakEnabled && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                        <Coffee className="w-3 h-3 text-purple-400" />
                        <span>Coffee Break: Every {batch.coffeeBreakEvery} accts ({batch.coffeeBreakDurationMin}m)</span>
                      </span>
                    )}

                    {batch.circadianEnabled && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                        <Sun className="w-3 h-3 text-amber-400" />
                        <span>Office Hours: {batch.circadianWindow}</span>
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] font-mono text-slate-300 truncate max-w-md">
                    <span className="text-slate-500">Telemetry: </span>
                    <span className={isRunning ? 'text-sky-300' : 'text-slate-400'}>{batch.currentActionLog}</span>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Interactive Batch Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-7 text-slate-100 shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400" />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 text-sky-400 flex items-center justify-center">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Queue Automation Batch
                  </h3>
                  <p className="text-xs text-slate-400">
                    Configure start triggers, randomized human delays, and circadian rest cycles.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleCreateBatch} className="overflow-y-auto py-4 space-y-5 pr-1 text-xs sm:text-sm">
              
              {/* Batch Identity */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-sky-400" />
                  <span>1. Batch Campaign &amp; Task Routine</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Batch Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Target Module</label>
                    <select
                      value={formModule}
                      onChange={(e) => setFormModule(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="Auto-Registration & 2FA Setup">Auto-Registration &amp; 2FA Setup</option>
                      <option value="Smart Profile Builder">Smart Profile &amp; AI Avatar Hydration</option>
                      <option value="Active Interaction & Page Creation">Active Interaction &amp; Fan Page Publishing</option>
                      <option value="Live Results & Cookie Exporter">Live Results &amp; Cookie Exporter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Batch Volume (Accounts to Process): <span className="text-sky-400 font-bold">{formTargetCount}</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="200"
                      value={formTargetCount}
                      onChange={(e) => setFormTargetCount(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Concurrent Threads: <span className="text-emerald-400 font-bold">{formThreads} Windows</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="16"
                      value={formThreads}
                      onChange={(e) => setFormThreads(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Randomized Delays (Core Human Behavior Feature) */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
                    <Fingerprint className="w-3.5 h-3.5 text-emerald-400" />
                    <span>2. Randomized Human Delay Interval (Gaussian Variance)</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Antiban Safe
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  Avoid bot-pattern detection flags by randomizing intervals between each account processing step.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div>
                    <label className="block text-slate-300 mb-1">
                      Min Delay: <span className="text-sky-400 font-bold">{formMinDelay}s</span>
                    </label>
                    <input
                      type="range"
                      min="15"
                      max="120"
                      value={formMinDelay}
                      onChange={(e) => setFormMinDelay(Math.min(Number(e.target.value), formMaxDelay - 10))}
                      className="w-full accent-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">
                      Max Delay: <span className="text-purple-400 font-bold">{formMaxDelay}s</span>
                    </label>
                    <input
                      type="range"
                      min="40"
                      max="300"
                      value={formMaxDelay}
                      onChange={(e) => setFormMaxDelay(Math.max(Number(e.target.value), formMinDelay + 10))}
                      className="w-full accent-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Random Distribution</label>
                    <select
                      value={formDistribution}
                      onChange={(e) => setFormDistribution(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="gaussian">Gaussian (Natural Bell Curve)</option>
                      <option value="uniform">Uniform Jitter</option>
                      <option value="exponential">Progressive Exponential</option>
                    </select>
                  </div>
                </div>

                {/* Simulated Delay Sequence Graph Preview */}
                <div className="pt-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono mb-1.5">
                    Live Preview: Simulated Delay Pattern Across Next 9 Accounts (Seconds)
                  </span>
                  <div className="flex items-end gap-1.5 h-16 bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                    {previewDelays.map((delay, idx) => {
                      const maxPossible = Math.max(...previewDelays, 1);
                      const heightPercent = Math.round((delay / maxPossible) * 100);
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                          <span className="text-[9px] font-mono text-slate-400 mb-0.5">{delay}s</span>
                          <div 
                            className="w-full rounded-t bg-gradient-to-t from-blue-600 to-sky-400 transition-all duration-300"
                            style={{ height: `${heightPercent}%` }}
                            title={`Account #${idx + 1}: ${delay} seconds pause`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Start Time Trigger */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>3. Start Timing &amp; Schedule Trigger</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormStartOption('immediate')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      formStartOption === 'immediate'
                        ? 'border-sky-500 bg-sky-500/10 text-sky-300 font-bold'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    <span className="text-xs">Immediate</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormStartOption('relative')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      formStartOption === 'relative'
                        ? 'border-sky-500 bg-sky-500/10 text-sky-300 font-bold'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400'
                    }`}
                  >
                    <Timer className="w-4 h-4" />
                    <span className="text-xs">Delay Start</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormStartOption('specific')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      formStartOption === 'specific'
                        ? 'border-sky-500 bg-sky-500/10 text-sky-300 font-bold'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">Specific Time</span>
                  </button>
                </div>

                {formStartOption === 'relative' && (
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                    <span className="text-xs text-slate-400">Launch batch in:</span>
                    <div className="flex gap-2">
                      {[5, 15, 30, 60, 120].map((mins) => (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => setFormRelativeMinutes(mins)}
                          className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                            formRelativeMinutes === mins
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          +{mins}m
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {formStartOption === 'specific' && (
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <label className="block text-slate-400 text-xs mb-1">Trigger DateTime (EST)</label>
                    <input
                      type="datetime-local"
                      value={formSpecificDateTime}
                      onChange={(e) => setFormSpecificDateTime(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Human Rest Emulation (Coffee Break & Circadian Rhythm) */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-purple-400" />
                  <span>4. Human Rest Breaks &amp; Circadian Office-Hours Lock</span>
                </div>

                <div className="space-y-2.5 text-xs font-mono">
                  {/* Coffee break toggle */}
                  <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-purple-400" />
                      <div>
                        <div className="text-white font-bold">Simulate Coffee Break (Human Step-Away)</div>
                        <div className="text-[10px] text-slate-400">
                          Automatically pause queue for {formCoffeeDuration} minutes every {formCoffeeEvery} accounts.
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={formCoffeeBreak}
                      onChange={(e) => setFormCoffeeBreak(e.target.checked)}
                      className="w-4 h-4 accent-purple-500"
                    />
                  </label>

                  {/* Circadian rhythm toggle */}
                  <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-400" />
                      <div>
                        <div className="text-white font-bold">Enforce Circadian Daytime Hours (08:30 AM - 10:00 PM EST)</div>
                        <div className="text-[10px] text-slate-400">
                          Prevents nocturnal 3 AM anomalies that trigger Facebook security scrutiny.
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={formCircadian}
                      onChange={(e) => setFormCircadian(e.target.checked)}
                      className="w-4 h-4 accent-amber-500"
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:from-[#18305c] hover:to-[#1d4ed8] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Batch to Active Schedule Queue</span>
                </button>
              </div>

            </form>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between shrink-0 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Anti-Ban Engine: Safe Delay Emulation Verified
              </span>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="hover:text-white"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Batch Telemetry & Delay Log Inspector Modal */}
      {selectedBatchForInspection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 text-slate-100 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
              <div>
                <h3 className="text-base font-bold text-white">
                  Telemetry &amp; Human Delay Inspection
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {selectedBatchForInspection.name} &bull; ID: {selectedBatchForInspection.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedBatchForInspection(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto py-4 space-y-4 pr-1 text-xs font-mono">
              {/* Timing parameters banner */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Interval Range</span>
                  <span className="text-sky-400 font-bold">{selectedBatchForInspection.minDelaySec}s – {selectedBatchForInspection.maxDelaySec}s</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Delay Distribution</span>
                  <span className="text-emerald-400 font-bold">{selectedBatchForInspection.delayDistribution.toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Coffee Break Rest</span>
                  <span className="text-purple-400 font-bold">Every {selectedBatchForInspection.coffeeBreakEvery} accts</span>
                </div>
              </div>

              {/* Execution Event Stream */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span>Randomized Delay Execution Stream</span>
                  <span className="text-emerald-400 text-[10px]">Real-time Human Emulation</span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {(!selectedBatchForInspection.historyLogs || selectedBatchForInspection.historyLogs.length === 0) ? (
                    <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-500 text-center">
                      No accounts processed yet for this queued batch.
                    </div>
                  ) : (
                    selectedBatchForInspection.historyLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[10px] text-slate-500 shrink-0">[{log.timestamp}]</span>
                          <span className="text-slate-200 truncate">{log.event}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                          +{log.delayTakenSec}s
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedBatchForInspection(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
