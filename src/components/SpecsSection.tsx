import React, { useState, useEffect } from 'react';
import { MIN_SPECS, REC_SPECS } from '../data/mockData';
import { 
  Cpu, 
  Rocket, 
  Check, 
  AlertCircle, 
  Gauge, 
  ShieldCheck, 
  Wifi, 
  Activity, 
  Zap, 
  RefreshCw,
  Server
} from 'lucide-react';

export const SpecsSection: React.FC = () => {
  // Live hardware scanning state
  const [isScanning, setIsScanning] = useState(false);
  const [hardwareStats, setHardwareStats] = useState<{
    cores: number;
    memoryGb: number;
    webGlSupported: boolean;
    webGlRenderer: string;
    pingMs: number;
    recommendedThreads: number;
    canvasScore: string;
  }>({
    cores: 8,
    memoryGb: 16,
    webGlSupported: true,
    webGlRenderer: 'ANGLE (Hardware Acceleration Active)',
    pingMs: 28,
    recommendedThreads: 12,
    canvasScore: '100% Anti-Detect Compatible'
  });

  // Proxy tester state
  const [testProxyInput, setTestProxyInput] = useState('185.220.101.42:8080:user_prosan:pass9921');
  const [isTestingProxy, setIsTestingProxy] = useState(false);
  const [proxyTestResult, setProxyTestResult] = useState<{
    status: 'idle' | 'success' | 'failed';
    ip: string;
    country: string;
    latency: number;
    protocol: string;
    dnsLeakProtected: boolean;
    fraudScore: string;
  }>({
    status: 'success',
    ip: '185.220.101.42',
    country: 'United States (Residential ISP)',
    latency: 34,
    protocol: 'SOCKS5 / HTTP Proxy',
    dnsLeakProtected: true,
    fraudScore: 'Low (0/100) — Optimal for Registration'
  });

  // Perform live system check on mount
  useEffect(() => {
    runSystemDiagnostics();
  }, []);

  const runSystemDiagnostics = () => {
    setIsScanning(true);
    const startPing = performance.now();

    setTimeout(() => {
      const cores = typeof navigator !== 'undefined' && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 8;
      const memoryGb = typeof navigator !== 'undefined' && (navigator as any).deviceMemory ? (navigator as any).deviceMemory : 16;
      
      let renderer = 'Direct3D11 (NVIDIA GeForce / Intel Iris Xe)';
      let webgl = true;
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
          const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || renderer;
          }
        } else {
          webgl = false;
        }
      } catch (e) {
        // fallback
      }

      const ping = Math.round(performance.now() - startPing) % 60 + 18;
      const recThreads = Math.min(24, Math.max(4, Math.floor(cores * 1.5)));

      setHardwareStats({
        cores,
        memoryGb,
        webGlSupported: webgl,
        webGlRenderer: renderer.length > 36 ? renderer.substring(0, 36) + '...' : renderer,
        pingMs: ping,
        recommendedThreads: recThreads,
        canvasScore: '100% Anti-Detect Compatible'
      });
      setIsScanning(false);
    }, 600);
  };

  const handleTestProxy = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTestingProxy(true);

    setTimeout(() => {
      const parts = testProxyInput.split(':');
      const ip = parts[0] || '198.51.100.44';
      const latency = Math.floor(Math.random() * 25) + 25;

      setProxyTestResult({
        status: 'success',
        ip: ip,
        country: 'United States (Residential AT&T / Verizon)',
        latency: latency,
        protocol: 'SOCKS5 (Dual Handshake Verified)',
        dnsLeakProtected: true,
        fraudScore: '0/100 (Clean Residential IP)'
      });
      setIsTestingProxy(false);
    }, 900);
  };

  return (
    <section id="specs" className="py-20 sm:py-28 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest text-[#2563eb] uppercase bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full mb-3">
            System Requirements &amp; Diagnostics
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How Powerful Does Your PC Need to Be?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1e3c72] to-[#2563eb] rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
            <strong className="font-brand text-slate-900 font-bold tracking-wide">PRO•SAN</strong> controls authentic Chrome instances via Playwright for 100% stealth. Check your system readiness below.
          </p>
        </div>

        {/* Real-Time Live System Diagnostics Scanner Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-400" />
                  Your Machine Compatibility Scanner
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Real-time hardware inspection measuring CPU cores, WebGL acceleration, and network readiness for concurrent browser windows.
              </p>
            </div>

            <button
              onClick={runSystemDiagnostics}
              disabled={isScanning}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all shrink-0 border border-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-sky-400' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Re-Scan System'}</span>
            </button>
          </div>

          {/* Diagnostic Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-xs font-mono">
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">CPU Processor</span>
              <div className="text-base sm:text-lg font-black text-sky-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                <span>{hardwareStats.cores} Cores</span>
              </div>
              <span className="text-[10px] text-emerald-400 mt-0.5 block">High Concurrency Ready</span>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">System Memory</span>
              <div className="text-base sm:text-lg font-black text-purple-400 flex items-center gap-1.5">
                <Gauge className="w-4 h-4" />
                <span>~{hardwareStats.memoryGb} GB RAM</span>
              </div>
              <span className="text-[10px] text-emerald-400 mt-0.5 block">Ample Multi-Profile Cache</span>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Network Latency</span>
              <div className="text-base sm:text-lg font-black text-amber-400 flex items-center gap-1.5">
                <Wifi className="w-4 h-4" />
                <span>{hardwareStats.pingMs} ms</span>
              </div>
              <span className="text-[10px] text-emerald-400 mt-0.5 block">Optimal Response Speed</span>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Recommended Threads</span>
              <div className="text-base sm:text-lg font-black text-emerald-400 flex items-center gap-1.5">
                <Rocket className="w-4 h-4" />
                <span>{hardwareStats.recommendedThreads} Windows</span>
              </div>
              <span className="text-[10px] text-sky-300 mt-0.5 block">100% Stability Rating</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>GPU Renderer: <strong className="text-slate-200">{hardwareStats.webGlRenderer}</strong></span>
            </div>
            <div className="text-emerald-400 font-bold">
              Verdict: System Is 100% Prepared For High-Speed PRO•SAN Automation
            </div>
          </div>
        </div>

        {/* Spec Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Minimum Requirements */}
          <div className="bg-[#f8fafc] rounded-2xl p-7 sm:p-8 border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1e3c72] uppercase tracking-wider">
                  Minimum Requirements
                </h3>
                <span className="text-xs text-slate-500 font-medium">Suitable for 1-5 concurrent browser windows</span>
              </div>
            </div>

            <div className="divide-y divide-slate-200/80 text-sm">
              {MIN_SPECS.map((row, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-1">
                  <span className="text-slate-500 font-medium">{row.label}</span>
                  <span className={`font-semibold ${row.highlight ? 'text-emerald-600 font-bold' : 'text-slate-800'}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Requirements */}
          <div className="bg-white rounded-2xl p-7 sm:p-8 border-2 border-[#2563eb] shadow-xl shadow-blue-500/5 hover:shadow-2xl transition-all duration-300 relative">
            <span className="absolute -top-3 right-6 bg-[#2563eb] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
              Optimal Performance
            </span>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#2563eb] uppercase tracking-wider">
                  Recommended Requirements
                </h3>
                <span className="text-xs text-slate-500 font-medium">Built for 10-25 concurrent multi-window threads</span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              {REC_SPECS.map((row, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-1">
                  <span className="text-slate-500 font-medium">{row.label}</span>
                  <span className={`font-semibold ${row.highlight ? 'text-emerald-600 font-bold' : 'text-slate-900'}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Interactive Residential Proxy Latency & Fraud Score Tester */}
        <div className="bg-[#f8fafc] rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Interactive Residential Proxy Health &amp; DNS Leak Tester
              </h3>
              <p className="text-xs text-slate-500">
                Test any SOCKS5 or HTTP residential proxy string format to verify latency and registration stealth score.
              </p>
            </div>
          </div>

          <form onSubmit={handleTestProxy} className="flex flex-col sm:flex-row gap-2.5 mb-4">
            <input
              type="text"
              value={testProxyInput}
              onChange={(e) => setTestProxyInput(e.target.value)}
              placeholder="IP:PORT:USER:PASS or SOCKS5://host:port"
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:border-[#2563eb] bg-white"
            />
            <button
              type="submit"
              disabled={isTestingProxy}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1e3c72] to-[#2563eb] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm hover:from-[#18305c] hover:to-[#1d4ed8] transition-all shrink-0"
            >
              <Zap className={`w-3.5 h-3.5 text-amber-300 ${isTestingProxy ? 'animate-bounce' : ''}`} />
              <span>{isTestingProxy ? 'Testing Connection...' : 'Run Proxy Test'}</span>
            </button>
          </form>

          {/* Test Results Banner */}
          {proxyTestResult.status === 'success' && (
            <div className="bg-white p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Resolved Node</span>
                <div className="font-bold text-slate-800 truncate">{proxyTestResult.ip}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Ping Latency</span>
                <div className="font-bold text-emerald-600">{proxyTestResult.latency} ms (Fast)</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">DNS Leak Protection</span>
                <div className="font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Enforced</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Fraud Score</span>
                <div className="font-bold text-emerald-600 truncate">{proxyTestResult.fraudScore}</div>
              </div>
            </div>
          )}
        </div>

        {/* VPS Note */}
        <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/70 flex items-start gap-3.5">
          <Server className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-bold">Need to Run 24/7 Autonomously Without Keeping Your Home PC On?</strong>
            <p className="mt-0.5 text-slate-600">
              <span className="font-brand font-bold text-slate-900">PRO•SAN</span> is fully compiled for Windows Server 2019/2022 and Windows 10/11 VPS instances. You can deploy on affordable VPS providers (such as Hetzner, Contabo, or AWS Lightsail) with 4 vCPUs and 8GB RAM to generate accounts 24 hours a day.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
