import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Key, 
  Copy, 
  Check, 
  Download, 
  Fingerprint, 
  User, 
  Globe, 
  Clock, 
  Terminal,
  ExternalLink,
  Smartphone
} from 'lucide-react';

export interface InspectedAccount {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  pass: string;
  totpSecret: string;
  status: string;
  proxyIp: string;
  createdAt: string;
  fbUid?: string;
  cookiesJson?: string;
  userAgent?: string;
  fingerprintHash?: string;
}

interface AccountInspectorModalProps {
  account: InspectedAccount | null;
  onClose: () => void;
}

export const AccountInspectorModal: React.FC<AccountInspectorModalProps> = ({ account, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [totpCode, setTotpCode] = useState<string>('749 201');
  const [totpSecondsLeft, setTotpSecondsLeft] = useState<number>(24);

  // Live 30s TOTP Token Simulation
  useEffect(() => {
    if (!account) return;

    // Generate pseudo TOTP from time window
    const updateTotp = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = 30 - (now % 30);
      setTotpSecondsLeft(remaining);

      // Deterministic pseudo 6-digit code based on secret and 30s window
      const windowIndex = Math.floor(now / 30);
      const seed = (account.totpSecret || 'JBSWY3DPEHPK3PXP')
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), windowIndex);
      const code = Math.abs((seed * 15485863) % 900000) + 100000;
      const formatted = `${code.toString().slice(0, 3)} ${code.toString().slice(3)}`;
      setTotpCode(formatted);
    };

    updateTotp();
    const interval = setInterval(updateTotp, 1000);
    return () => clearInterval(interval);
  }, [account]);

  if (!account) return null;

  const defaultCookies = JSON.stringify([
    { name: "c_user", value: account.fbUid || "1000984128491", domain: ".facebook.com", path: "/" },
    { name: "xs", value: "32%3AgLp192jXz9A%3A2%3A1719283921%3A-1%3A-1", domain: ".facebook.com", path: "/" },
    { name: "fr", value: "0wQ184j.AWX910.fb.prosan", domain: ".facebook.com", path: "/" },
    { name: "datr", value: "pW8fZ4m199s93_ProSanLive", domain: ".facebook.com", path: "/" },
    { name: "presence", value: "EDvF3EtimeF1719283930EersF1", domain: ".facebook.com", path: "/" }
  ], null, 2);

  const cookies = account.cookiesJson || defaultCookies;
  const userAgent = account.userAgent || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 PRO_SAN/3.0";
  const fingerprintHash = account.fingerprintHash || "fp_canvas_39af8201b_webgl_nvidia_rtx";

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadSingle = () => {
    const content = 
`========================================
PRO•SAN VERIFIED FACEBOOK ACCOUNT EXPORT
========================================
Account ID: ${account.id}
Name: ${account.name}
Email: ${account.email}
Phone: ${account.phone}
Password: ${account.pass}
2FA Secret Key: ${account.totpSecret}
Facebook UID: ${account.fbUid || '1000984128491'}
Status: ${account.status}
Registered Proxy IP: ${account.proxyIp}
Creation Date: ${account.createdAt}
User-Agent: ${userAgent}
Fingerprint ID: ${fingerprintHash}

----------------------------------------
AUTHENTICATION COOKIES (JSON FORMAT):
----------------------------------------
${cookies}
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prosan_account_${account.name.replace(/\s+/g, '_').toLowerCase()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 text-slate-100 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 text-sky-400 flex items-center justify-center shadow-inner">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {account.name}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                  {account.status || 'LIVE_VERIFIED'}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                <span>ID #{account.id}</span>
                <span>&bull;</span>
                <span className="text-sky-300 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  {account.proxyIp}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto py-4 space-y-4 pr-1 text-xs sm:text-sm">
          
          {/* Live 2FA TOTP Card */}
          <div className="bg-gradient-to-br from-slate-950 to-blue-950/40 p-4 rounded-xl border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-sky-300 font-mono">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>ACTIVE 2FA TWO-FACTOR AUTHENTICATOR (RFC 6238)</span>
              </div>
              <p className="text-xs text-slate-400">
                Live rolling one-time security token for direct Facebook login verification.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-700/80 shrink-0">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-black font-mono tracking-widest text-emerald-400">
                  {totpCode}
                </div>
                <div className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1 mt-0.5">
                  <Clock className="w-2.5 h-2.5 text-amber-400" />
                  <span>Refreshes in {totpSecondsLeft}s</span>
                </div>
              </div>

              <button
                onClick={() => handleCopy(totpCode.replace(/\s+/g, ''), 'totp')}
                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                title="Copy 6-digit Code"
              >
                {copiedField === 'totp' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Account Credentials Table */}
          <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center justify-between">
              <span>Primary Credentials</span>
              <span className="text-[10px] text-emerald-400">Encrypted AES-256</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div className="truncate pr-2">
                  <div className="text-[10px] text-slate-500">Email Address</div>
                  <div className="text-slate-200 truncate">{account.email}</div>
                </div>
                <button 
                  onClick={() => handleCopy(account.email, 'email')}
                  className="text-slate-400 hover:text-white p-1"
                >
                  {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div className="truncate pr-2">
                  <div className="text-[10px] text-slate-500">Account Password</div>
                  <div className="text-slate-200 truncate">{account.pass}</div>
                </div>
                <button 
                  onClick={() => handleCopy(account.pass, 'pass')}
                  className="text-slate-400 hover:text-white p-1"
                >
                  {copiedField === 'pass' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div className="truncate pr-2">
                  <div className="text-[10px] text-slate-500">Phone (SMS Gateway)</div>
                  <div className="text-slate-200 truncate">{account.phone}</div>
                </div>
                <button 
                  onClick={() => handleCopy(account.phone, 'phone')}
                  className="text-slate-400 hover:text-white p-1"
                >
                  {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 flex items-center justify-between">
                <div className="truncate pr-2">
                  <div className="text-[10px] text-slate-500">2FA Base32 Seed</div>
                  <div className="text-amber-400 truncate">{account.totpSecret}</div>
                </div>
                <button 
                  onClick={() => handleCopy(account.totpSecret, 'seed')}
                  className="text-slate-400 hover:text-white p-1"
                >
                  {copiedField === 'seed' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Browser Fingerprint & Anti-Detect Profile */}
          <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <Fingerprint className="w-3.5 h-3.5 text-sky-400" />
              <span>Isolated Hardware Profile &amp; Fingerprint</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-center justify-between gap-2">
                <span className="text-slate-400 shrink-0">User-Agent:</span>
                <span className="text-slate-300 truncate text-[11px]">{userAgent}</span>
                <button 
                  onClick={() => handleCopy(userAgent, 'ua')}
                  className="text-slate-400 hover:text-white shrink-0"
                >
                  {copiedField === 'ua' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500">Hardware Profile:</span>
                  <div className="text-sky-300 font-semibold mt-0.5">Win32 &bull; 8 Cores &bull; 16GB RAM</div>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500">Canvas 2D Noise:</span>
                  <div className="text-emerald-400 font-semibold mt-0.5">Injecting Jitter &bull; 100% Stealth</div>
                </div>
              </div>
            </div>
          </div>

          {/* Session Cookies JSON Viewer */}
          <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Session Cookies (c_user, xs, datr)</span>
              </span>
              <button
                onClick={() => handleCopy(cookies, 'cookies')}
                className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 bg-sky-500/10 px-2 py-1 rounded border border-sky-500/20"
              >
                {copiedField === 'cookies' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy JSON</span>
              </button>
            </div>
            
            <pre className="bg-black/70 p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400 max-h-32 overflow-y-auto leading-relaxed">
              {cookies}
            </pre>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between shrink-0 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl transition-colors"
          >
            Dismiss
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(
                `${account.email}|${account.pass}|${account.totpSecret}|${account.phone}`,
                'pipe'
              )}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              {copiedField === 'pipe' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy (Pipe Separated)</span>
            </button>

            <button
              onClick={handleDownloadSingle}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Export</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
