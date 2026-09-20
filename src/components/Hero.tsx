import React, { useState, useEffect } from 'react';
import { Download, PlayCircle, ShieldCheck, Sparkles, Terminal } from 'lucide-react';

export const Hero: React.FC = () => {
  const words = ["Never Seen Before", "Power of PRO•SAN", "Always Dreamed Of", "Full Autopilot"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Dedicated PRO•SAN typing effect with small size
  const proSanFull = "PRO•SAN";
  const [proSanText, setProSanText] = useState('');
  const [proSanDeleting, setProSanDeleting] = useState(false);

  useEffect(() => {
    const speed = proSanDeleting ? 70 : 130;
    const timer = setTimeout(() => {
      if (!proSanDeleting) {
        setProSanText(proSanFull.substring(0, proSanText.length + 1));
        if (proSanText.length + 1 === proSanFull.length) {
          setTimeout(() => setProSanDeleting(true), 2800);
        }
      } else {
        setProSanText(proSanFull.substring(0, proSanText.length - 1));
        if (proSanText.length === 0) {
          setProSanDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [proSanText, proSanDeleting]);

  useEffect(() => {
    const fullWord = words[currentWordIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText.length + 1 === fullWord.length) {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative text-center text-white overflow-hidden pt-20 sm:pt-28 pb-32 sm:pb-36 bg-gradient-to-br from-[#1e3c72] via-[#244888] to-[#2a5298]">
      {/* Background Animated Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          animation: 'gridShift 24s linear infinite'
        }}
      />

      {/* Atmospheric Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-emerald-500/10 blur-2xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Greeting above LIVE SOFTWARE badge */}
        <div className="mb-3 flex items-center justify-center">
          <span className="text-sky-200/95 text-base sm:text-lg md:text-xl font-semibold tracking-wide drop-shadow-sm">
            How can I help you today ?
          </span>
        </div>

        {/* Live Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-bold mb-3.5 backdrop-blur-sm shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>LIVE SOFTWARE &mdash; 500+ Active Users Worldwide</span>
        </div>

        {/* PRO•SAN Typing Badge (Small Size) */}
        <div className="mb-4 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/40 border border-sky-400/30 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-blue-200/80">Software:</span>
            <span className="font-brand text-sm sm:text-base text-sky-300 font-bold tracking-wider inline-flex items-center">
              {proSanText}
              <span className="inline-block w-0.5 h-3.5 bg-sky-300 ml-0.5 animate-pulse"></span>
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <h1 className="font-extrabold text-white text-3xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-tight leading-[1.12] mb-6">
          Facebook Automation<br />
          Like You&apos;ve{' '}
          <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-300 bg-clip-text text-transparent font-black">
            {currentText}
          </span>
          <span className="inline-block w-1 h-8 sm:h-12 bg-sky-400 ml-1.5 align-middle animate-pulse"></span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-blue-100/90 leading-relaxed font-normal mb-9">
          <strong className="font-brand text-white font-bold tracking-wide">PRO•SAN</strong> is a professional, fully undetectable Facebook automation suite. Auto Registration, Smart Profile Builder, Page Creation, and Active Organic Interaction &mdash; all inside one high-speed Windows software.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="https://github.com/mrtechpk1-ai/FBMprime/releases/download/V1.1.0/FBM_Prime_Reg.exe"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#2563eb] to-[#1e40af] hover:from-[#1d4ed8] hover:to-[#1e3a8a] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all border border-blue-400/30"
          >
            <Download className="w-5 h-5 text-sky-200" />
            <span>Download PRO•SAN Reg Now</span>
          </a>

          <button
            onClick={() => scrollToSection('features')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/25 backdrop-blur-md hover:-translate-y-0.5 transition-all"
          >
            <PlayCircle className="w-5 h-5 text-blue-300" />
            <span>Explore 8 Modules</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-blue-200/80 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Undetectable Chrome Playwright Engine</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Auto OTP &amp; 2FA Bypass</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-sky-300" />
            <span>Windows 10 / 11 Native 64-bit</span>
          </div>
        </div>

      </div>

      {/* Decorative Bottom Angle */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 bg-[#f8fafc]"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
      />
    </section>
  );
};
