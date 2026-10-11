import React, { useState } from 'react';
import { ShoppingCart, GraduationCap, Heart, PlusCircle, User, Zap, Menu, X, ShieldCheck } from 'lucide-react';
import { StudentUser } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenSellModal: () => void;
  onOpenAuthModal: () => void;
  currentUser: StudentUser | null;
  glitchMode: boolean;
  setGlitchMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  wishlistCount,
  onOpenWishlist,
  onOpenSellModal,
  onOpenAuthModal,
  currentUser,
  glitchMode,
  setGlitchMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/90 backdrop-blur-md border-b border-emerald-950/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Zone 1: Campus Cart Logo Lockup */}
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group text-left focus-visible:outline-emerald-600 shrink-0"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 transition-transform duration-200">
              <ShoppingCart className="w-5 h-5 translate-y-0.5" />
              <div className="absolute -top-1.5 -right-1.5 bg-amber-400 text-emerald-950 rounded-full p-1 shadow">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-extrabold tracking-tight ${glitchMode ? 'glitch-text-fx text-cyan-400 font-mono' : 'text-emerald-950'}`}>
                Campus<span className="text-emerald-600">Cart</span>
              </span>
              <span className="text-[10px] tracking-wide text-slate-500 font-medium hidden sm:inline">
                Buy Smart · Sell Easy · Save More
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Single-line 1-2 word text links) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <button
              onClick={() => setActiveTab('home')}
              className={`transition-colors hover:text-emerald-700 whitespace-nowrap shrink-0 ${
                activeTab === 'home' ? 'text-emerald-700 border-b-2 border-emerald-600 pb-0.5' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`transition-colors hover:text-emerald-700 whitespace-nowrap shrink-0 ${
                activeTab === 'browse' ? 'text-emerald-700 border-b-2 border-emerald-600 pb-0.5' : ''
              }`}
            >
              Browse Products
            </button>
            <button
              onClick={onOpenSellModal}
              className="transition-colors hover:text-emerald-700 whitespace-nowrap shrink-0 flex items-center gap-1.5 text-emerald-700"
            >
              <PlusCircle className="w-4 h-4" />
              Sell an Item
            </button>
            <button
              onClick={() => setActiveTab('how-it-works')}
              className={`transition-colors hover:text-emerald-700 whitespace-nowrap shrink-0 ${
                activeTab === 'how-it-works' ? 'text-emerald-700 border-b-2 border-emerald-600 pb-0.5' : ''
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`transition-colors hover:text-emerald-700 whitespace-nowrap shrink-0 flex items-center gap-1 ${
                activeTab === 'safety' ? 'text-emerald-700 border-b-2 border-emerald-600 pb-0.5' : ''
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Trust & Safety
            </button>
          </nav>

          {/* Zone 3: Interactive Affordances (Wishlist, Glitch Art switch, Auth) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Retro-Futurist Glitch Mode Switcher */}
            <button
              onClick={() => setGlitchMode(!glitchMode)}
              title={glitchMode ? "Disable Glitch Terminal Mode" : "Activate Retro-Futurist Glitch Mode"}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all duration-200 border ${
                glitchMode
                  ? 'bg-fuchsia-950 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(0,255,255,0.4)] animate-pulse'
                  : 'bg-white/80 hover:bg-white text-slate-600 border-slate-200 hover:text-emerald-700'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${glitchMode ? 'text-cyan-400 fill-cyan-400' : 'text-amber-500'}`} />
              <span className="hidden md:inline">{glitchMode ? 'GLITCH [ON]' : 'CYBER HUD'}</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl bg-white/90 hover:bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 shadow-sm transition-colors focus-visible:outline-emerald-600"
              title="Saved Academic Essentials"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account / Login Button */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 bg-emerald-800 hover:bg-emerald-900 text-white shadow-sm shadow-emerald-950/20 focus-visible:outline-emerald-600 whitespace-nowrap"
            >
              <User className="w-4 h-4 text-emerald-300" />
              {currentUser ? (
                <span className="max-w-[110px] truncate">{currentUser.name.split(' ')[0]}</span>
              ) : (
                <span>Student Login</span>
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-white/80 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F0] border-b border-emerald-900/10 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-sm font-semibold">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-800 hover:text-emerald-800"
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveTab('browse');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-800 hover:text-emerald-800"
            >
              Browse Products
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSellModal();
              }}
              className="text-left px-3 py-2 rounded-lg bg-emerald-100/60 text-emerald-900 font-bold flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-emerald-700" />
              Sell an Item
            </button>
            <button
              onClick={() => {
                setActiveTab('how-it-works');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-800 hover:text-emerald-800"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                setActiveTab('safety');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Trust & Safety Guidelines
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
