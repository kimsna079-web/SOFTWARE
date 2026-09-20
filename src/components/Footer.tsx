import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f172a] text-slate-400 py-14 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
            P
          </div>
          <span className="font-brand font-bold text-2xl text-white tracking-wider">
            PRO•SAN
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mb-6 font-medium">
          Professional Facebook Automation Software &mdash; Windows Native Platform
        </p>

        {/* Social / Direct Links */}
        <div className="flex items-center justify-center gap-5 mb-8">
          <a 
            href="https://wa.me/923241703901" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#25D366] hover:text-white text-slate-300 flex items-center justify-center transition-all hover:scale-110"
            title="WhatsApp Support: +92 324 1703901"
          >
            <i className="fa-brands fa-whatsapp text-lg"></i>
          </a>

          <a 
            href="https://t.me/Fbmprime" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#229ED9] hover:text-white text-slate-300 flex items-center justify-center transition-all hover:scale-110"
            title="Telegram: @Fbmprime"
          >
            <i className="fa-brands fa-telegram text-lg"></i>
          </a>

          <a 
            href="mailto:fbmprime@gmail.com" 
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-600 hover:text-white text-slate-300 flex items-center justify-center transition-all hover:scale-110"
            title="Email: fbmprime@gmail.com"
          >
            <i className="fa-solid fa-envelope text-lg"></i>
          </a>

          <a 
            href="https://github.com/mrtechpk1-ai/FBMprime" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 flex items-center justify-center transition-all hover:scale-110"
            title="GitHub Repository & Releases"
          >
            <i className="fa-brands fa-github text-lg"></i>
          </a>
        </div>

        {/* Legal Disclaimer */}
        <div className="max-w-3xl mx-auto p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 mb-6 text-left sm:text-center text-[11px] sm:text-xs text-slate-500 leading-relaxed">
          <p className="flex items-center justify-center gap-1.5 font-bold text-slate-400 mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>Disclaimer &amp; Intended Usage</span>
          </p>
          This software is intended for legitimate software testing, educational research, and approved marketing automation purposes only. Users are solely responsible for complying with Meta Platforms, Inc. Terms of Service, Community Standards, and all applicable domestic and international regulations. PRO•SAN is an independent tool and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Meta Platforms, Inc. or Facebook.
        </div>

        {/* Copyright & Attribution */}
        <p className="text-xs text-slate-600">
          &copy; {new Date().getFullYear()} <span className="font-brand font-bold text-slate-400">PRO•SAN</span> by <strong>Muhammad Ahmed Ali</strong>. All rights reserved.
        </p>

      </div>
    </footer>
  );
};
