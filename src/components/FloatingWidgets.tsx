import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const FloatingWidgets: React.FC = () => {
  const [showBtt, setShowBtt] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBtt(true);
      } else {
        setShowBtt(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923241703901?text=Hi!+I+want+to+know+more+about+PRO•SAN"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with Support on WhatsApp"
        className="fixed bottom-5 sm:bottom-7 right-5 sm:right-7 z-50 w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl sm:text-3xl shadow-xl shadow-emerald-500/30 hover:scale-110 hover:-rotate-6 transition-all duration-300 animate-pulse-wa"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        title="Back to top"
        className={`fixed bottom-5 sm:bottom-7 left-5 sm:left-7 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1e3c72] hover:bg-[#2563eb] text-white flex items-center justify-center shadow-lg transition-all duration-300 ${
          showBtt 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible translate-y-4'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
};
