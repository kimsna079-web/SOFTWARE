import React, { useState } from 'react';
import { Menu, X, ArrowLeft, Zap, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <a href="#hero" className="flex items-center gap-2 group text-decoration-none">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1e3c72] to-[#2563eb] flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                <img 
                  src="/fbmprimex_icon.png" 
                  alt="PRO•SAN" 
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    // Fallback to text icon if image fails
                    e.currentTarget.style.display = 'none';
                  }} 
                />
                <span className="hidden">P</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold font-brand text-[#2563eb] tracking-wide pr-2.5 border-r-2 border-[#2563eb]">
                  PRO•SAN
                </span>
                <span className="pl-2.5 text-xs sm:text-sm font-bold text-slate-800 tracking-tight leading-tight hidden xs:inline-block">
                  Facebook Automation Software
                </span>
              </div>
            </a>
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              V3.0 Live
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            <button 
              onClick={() => scrollTo('features')} 
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#2563eb] transition-colors rounded-lg hover:bg-slate-100/60"
            >
              Features
            </button>
            <button 
              onClick={() => scrollTo('preview')} 
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#2563eb] transition-colors rounded-lg hover:bg-slate-100/60"
            >
              Dashboard
            </button>
            <button 
              onClick={() => scrollTo('task-history')} 
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#2563eb] transition-colors rounded-lg hover:bg-slate-100/60 flex items-center gap-1.5"
            >
              <span>Task History</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>
            <button 
              onClick={() => scrollTo('workflow')} 
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#2563eb] transition-colors rounded-lg hover:bg-slate-100/60"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollTo('specs')} 
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#2563eb] transition-colors rounded-lg hover:bg-slate-100/60"
            >
              Requirements
            </button>
            <button 
              onClick={() => scrollTo('pricing')} 
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#2563eb] transition-colors rounded-lg hover:bg-slate-100/60"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollTo('faq')} 
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#2563eb] transition-colors rounded-lg hover:bg-slate-100/60"
            >
              FAQ
            </button>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="https://github.com/mrtechpk1-ai/FBMprime" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-all border border-slate-200"
            >
              <i className="fa-brands fa-github text-sm"></i> GitHub
            </a>
            <button 
              onClick={() => scrollTo('pricing')} 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#1e3c72] to-[#2563eb] hover:from-[#19325f] hover:to-[#1d4ed8] rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2">
          <button 
            onClick={() => scrollTo('features')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#2563eb] hover:bg-slate-50 rounded-lg"
          >
            Features &amp; Modules
          </button>
          <button 
            onClick={() => scrollTo('preview')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#2563eb] hover:bg-slate-50 rounded-lg"
          >
            Live Dashboard Preview
          </button>
          <button 
            onClick={() => scrollTo('task-history')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#2563eb] hover:bg-slate-50 rounded-lg flex items-center justify-between"
          >
            <span>Task History Live Stream</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>
          <button 
            onClick={() => scrollTo('workflow')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#2563eb] hover:bg-slate-50 rounded-lg"
          >
            How It Works (4 Steps)
          </button>
          <button 
            onClick={() => scrollTo('specs')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#2563eb] hover:bg-slate-50 rounded-lg"
          >
            System Requirements
          </button>
          <button 
            onClick={() => scrollTo('pricing')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#2563eb] hover:bg-slate-50 rounded-lg"
          >
            Pricing Plans
          </button>
          <button 
            onClick={() => scrollTo('faq')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#2563eb] hover:bg-slate-50 rounded-lg"
          >
            Frequently Asked Questions
          </button>
          <button 
            onClick={() => scrollTo('contact')}
            className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#2563eb] hover:bg-slate-50 rounded-lg"
          >
            Support &amp; Contact
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button 
              onClick={() => scrollTo('pricing')} 
              className="w-full py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-[#1e3c72] to-[#2563eb] rounded-xl shadow-md"
            >
              Get PRO•SAN Now
            </button>
            <a 
              href="https://wa.me/923241703901?text=Hi!+I+want+to+know+more+about+PRO•SAN"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl"
            >
              <i className="fa-brands fa-whatsapp me-2"></i> WhatsApp Support (+92 324 1703901)
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
