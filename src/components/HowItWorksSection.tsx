import React from 'react';
import { Search, MessageSquare, Handshake, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onBrowse: () => void;
  onSell: () => void;
  glitchMode: boolean;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onBrowse, onSell, glitchMode }) => {
  const STEPS = [
    {
      number: '01',
      title: 'Browse or list academic materials',
      subtitle: 'Post your pre-loved textbooks, drafters, or calculators in seconds with honest condition grades. Or search what seniors are selling.',
      icon: Search,
      highlight: 'Zero Listing Fees',
    },
    {
      number: '02',
      title: 'Compare prices and contact students',
      subtitle: 'Chat directly with peers within your university. Inquire about semester notes, clarify syllabus editions, or make a reasonable offer.',
      icon: MessageSquare,
      highlight: 'Direct In-App Chat',
    },
    {
      number: '03',
      title: 'Arrange a convenient campus pickup',
      subtitle: 'Meet at the campus library, hostel mess, or cafeteria. Test the gear in person and complete the hand-off safely without courier costs.',
      icon: Handshake,
      highlight: 'Campus Hand-Off',
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple Peer-to-Peer Process</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How Campus Cart Works
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Built exclusively for students to eliminate overpriced commercial retail and save money every semester.
        </p>
      </div>

      {/* 3 Step Sequential Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="relative p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all duration-200 group"
            >
              <div>
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-emerald-700 font-mono tracking-tighter">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-2">
                  {step.highlight}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-800 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-emerald-700 transition-colors">
                <span>Step {idx + 1} of 3</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action CTA Banner */}
      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg sm:text-xl font-bold">Have textbooks from last semester lying around?</h4>
          <p className="text-xs sm:text-sm text-emerald-200">
            Pass them on to a junior student and recover your study investment today.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onSell}
            className="px-5 py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-sm"
          >
            Post Your First Listing
          </button>
          <button
            onClick={onBrowse}
            className="px-5 py-2.5 bg-emerald-700/80 hover:bg-emerald-700 text-white border border-emerald-500/50 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
          >
            Find Course Gear
          </button>
        </div>
      </div>
    </section>
  );
};
