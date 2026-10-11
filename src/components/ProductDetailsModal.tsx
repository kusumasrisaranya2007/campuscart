import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  MessageSquare, 
  Share2, 
  ShieldCheck, 
  MapPin, 
  IndianRupee, 
  CheckCircle2, 
  Sparkles,
  Tag,
  Clock,
  Send
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onOpenChat: (product: Product) => void;
  glitchMode: boolean;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onOpenChat,
  glitchMode,
}) => {
  const [offerPrice, setOfferPrice] = useState<string>('');
  const [offerSent, setOfferSent] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !product) return null;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleMakeOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerPrice) return;
    setOfferSent(true);
    setTimeout(() => {
      setOfferSent(false);
      setOfferPrice('');
    }, 3000);
  };

  const handleCopyShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-[#FAF7F0] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-left my-8">
        
        {/* Top Header Controls */}
        <div className="flex items-center justify-between p-4 sm:px-6 bg-white border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="text-emerald-800">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>ID: {product.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Share listing with batchmate"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedLink && (
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Copied Link!
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Product Image & Highlights */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-md text-xs font-bold text-slate-800 shadow-xs border border-slate-200">
                {product.condition}
              </div>
              {discountPercent > 0 && (
                <div className="absolute bottom-3 left-3 bg-emerald-700 text-white px-2.5 py-1 rounded text-xs font-extrabold shadow-sm">
                  Save {discountPercent}% vs Bookstore
                </div>
              )}
            </div>

            {/* Quick Badges / Campus Exchange Notice */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-emerald-950 text-xs space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Standard Campus Handover Rules</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Meet in broad daylight at the Central Library foyer, Campus Canteen, or Department Quad. Inspect pages, electronic switches, or parts before final payment.
              </p>
            </div>
          </div>

          {/* Right Column: Title, Price, Description, Seller Card, CTA */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Title & Tags */}
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{product.campus}</span>
                  <span aria-hidden="true">·</span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Listed {product.listedDate}</span>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Student Price (INR)</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums flex items-center">
                      <IndianRupee className="w-5 h-5 text-emerald-700 -mr-0.5" />
                      {product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through tabular-nums">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-all ${
                    isWishlisted
                      ? 'bg-rose-50 text-rose-600 border-rose-300'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                  title={isWishlisted ? "Saved" : "Save to wishlist"}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Description & Details
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                  {product.description}
                </p>
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Seller Information Card */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Student Seller
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      {product.seller.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                        <span>{product.seller.name}</span>
                        {product.seller.isVerified && (
                          <span title="Verified College Student">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        {product.seller.college} · {product.seller.department} ({product.seller.semester})
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-700">★ {product.seller.rating || 4.9}</div>
                    <div className="text-[10px] text-slate-400">Verified Peer</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Actions: Contact Seller + Make an Offer */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenChat(product);
                  }}
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-emerald-950/10 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message Seller</span>
                </button>

                {/* Make an Offer Form */}
                <form onSubmit={handleMakeOffer} className="flex gap-1.5">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      placeholder="Your Offer Price"
                      className="w-full pl-6 pr-2 py-2.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Offer</span>
                  </button>
                </form>
              </div>

              {offerSent && (
                <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 p-2 rounded-lg text-center border border-emerald-200">
                  Offer of ₹{offerPrice} submitted to {product.seller.name}! They will respond in chat.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
