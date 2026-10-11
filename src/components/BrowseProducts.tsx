import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, ArrowUpDown, Filter, MapPin } from 'lucide-react';
import { Product, ProductCategory, ProductCondition } from '../types';
import { CATEGORIES_LIST, CAMPUS_LIST } from '../sampleData';
import { ProductCard } from './ProductCard';

interface BrowseProductsProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onContactSeller: (product: Product) => void;
  initialCategory?: string;
  initialQuery?: string;
  initialCampus?: string;
  glitchMode: boolean;
}

export const BrowseProducts: React.FC<BrowseProductsProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onSelectProduct,
  onContactSeller,
  initialCategory = 'All',
  initialQuery = '',
  initialCampus = 'All Campuses',
  glitchMode,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [selectedCampus, setSelectedCampus] = useState<string>(initialCampus);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'popular'>('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync initial props if changed
  React.useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialQuery !== undefined) setSearchQuery(initialQuery);
  }, [initialQuery]);

  React.useEffect(() => {
    if (initialCampus) setSelectedCampus(initialCampus);
  }, [initialCampus]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search matching
        const matchesQuery =
          searchQuery.trim() === '' ||
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.seller.college.toLowerCase().includes(searchQuery.toLowerCase());

        // Category matching
        const matchesCategory =
          selectedCategory === 'All' || p.category === selectedCategory;

        // Condition matching
        const matchesCondition =
          selectedCondition === 'All' || p.condition === selectedCondition;

        // Campus matching
        const matchesCampus =
          selectedCampus === 'All Campuses' || p.campus === selectedCampus;

        // Price matching
        const matchesPrice = p.price <= maxPrice;

        return matchesQuery && matchesCategory && matchesCondition && matchesCampus && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'popular') return b.viewsCount - a.viewsCount;
        return 0; // default newest order
      });
  }, [products, searchQuery, selectedCategory, selectedCondition, selectedCampus, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCondition('All');
    setSelectedCampus('All Campuses');
    setMaxPrice(5000);
    setSortBy('newest');
  };

  const isFilteringActive =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedCondition !== 'All' ||
    selectedCampus !== 'All Campuses' ||
    maxPrice < 5000;

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* Top Banner and Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Student Marketplace Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Browse Academic Materials
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Verified student listings across textbooks, instruments, and college gear
          </p>
        </div>

        {/* Search & Sort Controls Top Bar */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search listings..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer pr-1"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden p-2.5 bg-white border border-slate-200 rounded-xl text-slate-700"
            aria-label="Toggle Filter Panel"
          >
            <Filter className="w-4 h-4 text-emerald-700" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Filters Sidebar + Right Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Filter Sidebar (Desktop + Mobile Collapsible) */}
        <aside
          className={`md:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs ${
            showMobileFilters ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
              <span>Filters</span>
            </div>
            {isFilteringActive && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 block">
              Category
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-between ${
                  selectedCategory === 'All'
                    ? 'bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] text-slate-400">{products.length}</span>
              </button>
              {CATEGORIES_LIST.map((cat) => {
                const count = products.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-emerald-50 text-emerald-900 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate pr-2">{cat}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Condition Filter */}
          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 block">
              Item Condition
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {['All', 'Brand New', 'Like New', 'Good', 'Fair'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg text-center transition-colors border ${
                    selectedCondition === cond
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Campus Location Filter */}
          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Campus / Institute</span>
            </label>
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {CAMPUS_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Max Price Slider (INR) */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Max Price
              </label>
              <span className="text-xs font-bold text-slate-900 tabular-nums">
                ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={200}
              max={5000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 tabular-nums">
              <span>₹200</span>
              <span>₹5,000+</span>
            </div>
          </div>

        </aside>

        {/* Right Area: Results Counter + Product Grid */}
        <main className="md:col-span-9 space-y-6">
          
          {/* Active filter count summary */}
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div>
              Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> academic materials
              {selectedCategory !== 'All' && <span> in <span className="font-semibold text-emerald-800">{selectedCategory}</span></span>}
            </div>
            {isFilteringActive && (
              <span className="text-[11px] text-emerald-700 font-medium">
                Filtered view active
              </span>
            )}
          </div>

          {/* Product Grid or Empty State */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onSelectProduct={onSelectProduct}
                  onContactSeller={onContactSeller}
                  glitchMode={glitchMode}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No matching campus materials found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                We couldn't find any listings matching your search or filter criteria. Try adjusting the price range or resetting filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

        </main>

      </div>
    </section>
  );
};
