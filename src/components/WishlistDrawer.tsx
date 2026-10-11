import React from 'react';
import { X, Trash2, Heart, ArrowRight, IndianRupee } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProductIds: string[];
  allProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onClearWishlist: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProductIds,
  allProducts,
  onRemoveFromWishlist,
  onSelectProduct,
  onClearWishlist,
}) => {
  if (!isOpen) return null;

  const wishlistedItems = allProducts.filter((p) => wishlistProductIds.includes(p.id));
  const totalValue = wishlistedItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF7F0] h-full shadow-2xl flex flex-col text-left border-l border-slate-200 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Saved Essentials</h3>
              <p className="text-xs text-slate-500">{wishlistedItems.length} items shortlisted</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {wishlistedItems.length > 0 && (
              <button
                onClick={onClearWishlist}
                className="text-xs text-slate-500 hover:text-rose-600 font-semibold transition-colors"
                title="Clear all"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistedItems.length > 0 ? (
            wishlistedItems.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3 group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                />
                
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}>
                  <div className="text-[11px] font-semibold text-emerald-800">{item.category}</div>
                  <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700">
                    {item.title}
                  </h4>
                  <div className="text-xs font-extrabold text-slate-900 mt-1 tabular-nums flex items-center">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-700" />
                    {item.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFromWishlist(item.id)}
                  className="p-2 text-slate-300 hover:text-rose-600 transition-colors"
                  title="Remove from saved items"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-500 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">No items in your wishlist yet</p>
              <p className="text-xs text-slate-400 max-w-xs">
                Click the heart icon on any textbook, kit, or tool to save it for quick review later.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer with Subtotal */}
        {wishlistedItems.length > 0 && (
          <div className="p-5 bg-white border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-600">Total Wishlist Value</span>
              <span className="text-lg font-black text-slate-900 tabular-nums flex items-center">
                <IndianRupee className="w-4 h-4 text-emerald-700" />
                {totalValue.toLocaleString('en-IN')}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Continue Browsing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
