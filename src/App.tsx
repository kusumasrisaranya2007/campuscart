import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { BrowseProducts } from './components/BrowseProducts';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { SellItemModal } from './components/SellItemModal';
import { BuyerSellerChatModal } from './components/BuyerSellerChatModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TrustSafetySection } from './components/TrustSafetySection';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Product, ProductCategory, StudentUser } from './types';
import { INITIAL_PRODUCTS } from './sampleData';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');

  // Glitch Art Mode Toggle (persisted)
  const [glitchMode, setGlitchMode] = useState<boolean>(() => {
    return localStorage.getItem('campus_cart_glitch') === 'true';
  });

  // Products State with local storage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('campus_cart_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Wishlist State (list of Product IDs)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('campus_cart_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved wishlist', e);
      }
    }
    return ['cc-001', 'cc-003']; // pre-seeded realistic items
  });

  // Current Logged In Student
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() => {
    const saved = localStorage.getItem('campus_cart_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    return {
      id: 'usr-101',
      name: 'Aarav Patel',
      email: 'aarav.ee@iitd.ac.in',
      college: 'IIT Delhi (Hauz Khas)',
      department: 'Electrical Engineering',
      isVerified: true,
      verificationStatus: 'verified',
    };
  });

  // Active Modals & Overlays
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeChatProduct, setActiveChatProduct] = useState<Product | null>(null);

  // Filter params passed to Browse Products
  const [browseCategory, setBrowseCategory] = useState<string>('All');
  const [browseQuery, setBrowseQuery] = useState<string>('');
  const [browseCampus, setBrowseCampus] = useState<string>('All Campuses');

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Persist products to LocalStorage
  useEffect(() => {
    localStorage.setItem('campus_cart_products', JSON.stringify(products));
  }, [products]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('campus_cart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Persist user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('campus_cart_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('campus_cart_user');
    }
  }, [currentUser]);

  // Persist glitch mode
  useEffect(() => {
    localStorage.setItem('campus_cart_glitch', String(glitchMode));
    if (glitchMode) {
      document.body.classList.add('mode-glitch');
    } else {
      document.body.classList.remove('mode-glitch');
    }
  }, [glitchMode]);

  // Wishlist handler
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed item from saved wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added item to saved wishlist! ❤️');
        return [...prev, productId];
      }
    });
  };

  // Add new listed product
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`"${newProduct.title}" published successfully!`);
    // Navigate to browse to show the newly listed item
    setActiveTab('browse');
    setBrowseCategory(newProduct.category);
  };

  // Search trigger from Hero
  const handleHeroSearch = (query: string, campus: string) => {
    setBrowseQuery(query);
    setBrowseCampus(campus);
    setActiveTab('browse');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Category trigger from Categories section
  const handleSelectCategory = (category: ProductCategory) => {
    setBrowseCategory(category);
    setActiveTab('browse');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      glitchMode ? 'mode-glitch bg-[#050508] text-cyan-300' : 'bg-[#FAF7F0] text-slate-800'
    }`}>
      
      {/* Glitch Scanlines CRT Effect Overlay (always active in glitch mode or toggleable) */}
      {glitchMode && (
        <div className="fixed inset-0 scanlines-overlay z-50 pointer-events-none opacity-40" />
      )}

      {/* Top Banner Notice: College Demo Mode */}
      <div className="bg-emerald-900 text-white text-[11px] font-semibold py-1.5 px-4 text-center border-b border-emerald-800 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
        <span>
          <strong>Campus Cart</strong> · College Startup Demonstration · Zero platform commission · 100% Peer-to-Peer
        </span>
      </div>

      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        glitchMode={glitchMode}
        setGlitchMode={setGlitchMode}
      />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom duration-200 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Sections based on Active Tab */}
      <main className="flex-1">
        
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onBrowse={() => {
                setActiveTab('browse');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              onSell={() => setIsSellModalOpen(true)}
              onSearch={handleHeroSearch}
              glitchMode={glitchMode}
            />

            {/* Academic Categories (All 8 Categories) */}
            <CategoriesSection
              onSelectCategory={handleSelectCategory}
              selectedCategory={browseCategory}
            />

            {/* Featured Product Highlights on Homepage */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                    <TrendingUp className="w-4 h-4" />
                    <span>Popular on Campus This Week</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    Featured Student Listings
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('browse');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 transition-colors group"
                >
                  <span>View All {products.length} Academic Materials</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Grid of first 6 featured items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 6).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    onContactSeller={(p) => setActiveChatProduct(p)}
                    glitchMode={glitchMode}
                  />
                ))}
              </div>
            </section>

            {/* How It Works (3 Steps) on Homepage */}
            <HowItWorksSection
              onBrowse={() => setActiveTab('browse')}
              onSell={() => setIsSellModalOpen(true)}
              glitchMode={glitchMode}
            />

            {/* Trust and Safety Banner */}
            <TrustSafetySection />
          </>
        )}

        {/* BROWSE PRODUCTS VIEW */}
        {activeTab === 'browse' && (
          <BrowseProducts
            products={products}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onContactSeller={(p) => setActiveChatProduct(p)}
            initialCategory={browseCategory}
            initialQuery={browseQuery}
            initialCampus={browseCampus}
            glitchMode={glitchMode}
          />
        )}

        {/* HOW IT WORKS DEDICATED VIEW */}
        {activeTab === 'how-it-works' && (
          <div className="py-6">
            <HowItWorksSection
              onBrowse={() => setActiveTab('browse')}
              onSell={() => setIsSellModalOpen(true)}
              glitchMode={glitchMode}
            />
            <TrustSafetySection />
          </div>
        )}

        {/* TRUST AND SAFETY DEDICATED VIEW */}
        {activeTab === 'safety' && (
          <div className="py-6">
            <TrustSafetySection />
          </div>
        )}

      </main>

      {/* Footer & FAQs */}
      <Footer />

      {/* PRODUCT DETAILS MODAL */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenChat={(p) => {
          setSelectedProduct(null);
          setActiveChatProduct(p);
        }}
        glitchMode={glitchMode}
      />

      {/* SELL AN ITEM MODAL */}
      <SellItemModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onAddProduct={handleAddProduct}
        currentUser={currentUser}
        glitchMode={glitchMode}
      />

      {/* BUYER-SELLER CHAT MODAL */}
      <BuyerSellerChatModal
        product={activeChatProduct}
        isOpen={!!activeChatProduct}
        onClose={() => setActiveChatProduct(null)}
        currentUser={currentUser}
        glitchMode={glitchMode}
      />

      {/* WISHLIST DRAWER */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProductIds={wishlist}
        allProducts={products}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onClearWishlist={() => setWishlist([])}
      />

      {/* STUDENT AUTH MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => {
          setCurrentUser(user);
          showToast(`Welcome back, ${user.name}!`);
        }}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Logged out of student account');
        }}
        glitchMode={glitchMode}
      />

    </div>
  );
}
