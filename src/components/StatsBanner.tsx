import React from 'react';
import { Users, UserCheck, Layers, Clock, ShieldCheck } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      value: '500+',
      label: 'Active Users',
      icon: Users,
      iconColor: 'text-[#2563eb]',
      textColor: 'text-[#1e3c72]'
    },
    {
      value: '10K+',
      label: 'Accounts Created',
      icon: UserCheck,
      iconColor: 'text-emerald-500',
      textColor: 'text-emerald-600'
    },
    {
      value: '8',
      label: 'Powerful Modules',
      icon: Layers,
      iconColor: 'text-amber-500',
      textColor: 'text-amber-600'
    },
    {
      value: '24/7',
      label: 'Automation Capable',
      icon: Clock,
      iconColor: 'text-sky-500',
      textColor: 'text-sky-600'
    },
    {
      value: '100%',
      label: 'Undetectable',
      icon: ShieldCheck,
      iconColor: 'text-rose-500',
      textColor: 'text-rose-600'
    }
  ];

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-5 sm:p-7 md:p-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className={`flex flex-col items-center justify-center text-center px-2 group ${idx > 0 && idx % 2 === 0 ? 'pt-4 sm:pt-0' : ''}`}
              >
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 group-hover:scale-105 transition-transform duration-200 mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500">
                  <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                  <span>{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
