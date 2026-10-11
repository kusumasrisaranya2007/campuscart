import React from 'react';
import { Heart, MapPin, CheckCircle2, MessageSquare, IndianRupee } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onContactSeller: (product: Product) => void;
  glitchMode: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onContactSeller,
  glitchMode,
}) => {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className={`group relative rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden text-left ${
        glitchMode ? 'glitch-card' : 'hover:-translate-y-1 hover:border-emerald-300'
      }`}
    >
      {/* Product Image Container */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Condition Tag: Minimalist unboxed badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-800 shadow-xs border border-slate-200">
          {product.condition}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-transform duration-200 shadow-sm active:scale-90 ${
            isWishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Discount Badge if available */}
        {discountPercent > 0 && (
          <div className="absolute bottom-3 left-3 bg-emerald-700 text-white px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide">
            {discountPercent}% OFF MRP
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Category & Listed Time (No static pill sandwich) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <span className="font-medium text-emerald-800">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.listedDate}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.title}
          </h3>

          {/* Campus Location */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{product.campus}</span>
          </div>
        </div>

        {/* Price & Seller Info Area */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
          {/* Price baseline */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 tabular-nums flex items-center">
                <IndianRupee className="w-4 h-4 text-emerald-700 -mr-0.5" />
                {product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Seller micro tag */}
            <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium">
              <span className="truncate max-w-[90px]">{product.seller.name.split(' ')[0]}</span>
              {product.seller.isVerified && (
                <span title="Verified College Student">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectProduct(product)}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center whitespace-nowrap"
            >
              View Details
            </button>
            <button
              onClick={() => onContactSeller(product)}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
