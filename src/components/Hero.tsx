import React, { useState } from 'react';
import { Search, ArrowRight, PlusCircle, ShieldCheck, MapPin, Sparkles, IndianRupee, Layers } from 'lucide-react';
import { HERO_IMAGE, CAMPUS_LIST } from '../sampleData';

interface HeroProps {
  onBrowse: () => void;
  onSell: () => void;
  onSearch: (query: string, campus: string) => void;
  glitchMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onBrowse, onSell, onSearch, glitchMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('All Campuses');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCampus);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20">
      {/* Background soft ambient radial tints */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute top-12 left-10 w-96 h-96 bg-emerald-200/50 rounded-full blur-3xl" />
        <div className="absolute top-28 right-12 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subtitle, Search, CTA */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300/60 text-emerald-900 text-xs font-semibold tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Campus Cart · Buy Smart. Sell Easy. Save More.</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] ${
              glitchMode ? 'font-mono text-cyan-300' : ''
            }`}>
              Your Campus Marketplace for{' '}
              <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2 underline-offset-4">
                Affordable Essentials.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Buy affordable study materials, sell unused items, and exchange useful products with fellow students across your university dorms and lecture halls.
            </p>

            {/* Quick Search & Campus Selector Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="p-2 sm:p-2.5 bg-white rounded-2xl border border-slate-200 shadow-lg shadow-emerald-950/5 flex flex-col sm:flex-row gap-2 max-w-2xl"
            >
              {/* Search query input */}
              <div className="flex-1 flex items-center px-3 gap-2">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find textbooks, Casio fx-991, lab coats, kits..."
                  className="w-full py-2 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              {/* Campus Selector */}
              <div className="border-t sm:border-t-0 sm:border-l border-slate-200 px-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <select
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-medium text-slate-700 focus:outline-none cursor-pointer py-2 max-w-[170px]"
                >
                  {CAMPUS_LIST.map((campus) => (
                    <option key={campus} value={campus}>
                      {campus}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Action Button */}
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shrink-0"
              >
                <span>Find Items</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onBrowse}
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white text-sm sm:text-base font-semibold rounded-xl shadow-md shadow-emerald-950/15 flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Layers className="w-4 h-4" />
                <span>Browse Products</span>
              </button>
              
              <button
                onClick={onSell}
                className="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 text-sm sm:text-base font-semibold rounded-xl shadow-xs flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>Sell an Item</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 pl-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Peer Exchanges</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div className="relative rounded-3xl overflow-hidden border border-emerald-900/10 shadow-2xl bg-white p-2">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                  <img
                    src={HERO_IMAGE}
                    alt="Campus study materials, textbooks, laptop, and scientific tools"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                      Curated Student Exchange
                    </span>
                    <h3 className="text-lg font-bold">IIT & University Campus Marketplace</h3>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Average 60% savings compared to new bookstore prices
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Highlight Badge 1 */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Average Savings</div>
                  <div className="text-sm font-extrabold text-slate-900">₹850 per Semester</div>
                </div>
              </div>

              {/* Floating Highlight Badge 2 */}
              <div className="absolute -top-4 -right-3 sm:-right-4 bg-emerald-900 text-white rounded-2xl px-3.5 py-2 shadow-lg border border-emerald-700/50 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold">1,200+ Live Listings</span>
              </div>

            </div>
          </div>

        </div>

        {/* Full-width 4-metric strip below hero */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">₹4.8L+</div>
            <div className="text-xs font-medium text-slate-500">Student Funds Saved</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tabular-nums">1,280+</div>
            <div className="text-xs font-medium text-slate-500">Campus Hand-Offs Completed</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">18+</div>
            <div className="text-xs font-medium text-slate-500">Colleges & Universities</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tabular-nums">0%</div>
            <div className="text-xs font-medium text-slate-500">Platform Commission Fee</div>
          </div>
        </div>

      </div>
    </section>
  );
};
