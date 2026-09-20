import React from 'react';
import { MessageCircle, Send, Mail, Clock, HelpCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const scrollToFaq = () => {
    const el = document.getElementById('faq');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#f8fafc] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Navy CTA Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white overflow-hidden shadow-2xl bg-gradient-to-br from-[#0f172a] via-[#162747] to-[#1e3c72]">
          
          {/* Decorative glowing circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block text-xs font-extrabold tracking-widest text-blue-300 uppercase bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6 backdrop-blur-xs">
              Get Started Today
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Ready to Scale Your<br />
              <span className="font-brand font-bold text-sky-300 tracking-wide">PRO•SAN</span> Operations?
            </h2>

            <p className="text-blue-100/80 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-normal">
              Get <strong className="font-brand font-bold text-white tracking-wide">PRO•SAN</strong> today and have your autonomous registration and account heating pipeline live within 24 hours.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://wa.me/923241703901?text=Hello!+I+want+to+purchase+PRO•SAN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all animate-pulse-wa"
              >
                <i className="fa-brands fa-whatsapp text-2xl"></i>
                <span>Purchase on WhatsApp</span>
              </a>

              <button
                onClick={scrollToFaq}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/25 backdrop-blur-xs transition-all hover:-translate-y-0.5"
              >
                <HelpCircle className="w-5 h-5 text-sky-300" />
                <span>Read FAQ First</span>
              </button>
            </div>

            {/* Contact Channels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm text-blue-100/90 pt-8 border-t border-white/10">
              
              {/* WhatsApp */}
              <a 
                href="https://wa.me/923241703901" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <i className="fa-brands fa-whatsapp text-emerald-400 text-lg group-hover:scale-110 transition-transform"></i>
                <span className="font-bold text-white">+92 324 1703901</span>
              </a>

              {/* Telegram */}
              <a 
                href="https://t.me/Fbmprime" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <i className="fa-brands fa-telegram text-sky-400 text-lg group-hover:scale-110 transition-transform"></i>
                <span className="font-bold text-white">@Fbmprime</span>
              </a>

              {/* Email */}
              <a 
                href="mailto:fbmprime@gmail.com" 
                className="flex items-center justify-center sm:justify-start gap-2.5 p-2 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <Mail className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-white truncate">fbmprime@gmail.com</span>
              </a>

              {/* Response Time */}
              <div className="flex items-center justify-center sm:justify-start gap-2.5 p-2 text-slate-300">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Response: 1&ndash;2 hours</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
