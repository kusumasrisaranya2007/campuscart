import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  IndianRupee, 
  CheckCircle, 
  AlertCircle, 
  Image as ImageIcon,
  BookOpen,
  Sparkles,
  Camera
} from 'lucide-react';
import { Product, ProductCategory, ProductCondition, StudentUser } from '../types';
import { CATEGORIES_LIST, CAMPUS_LIST, CALCULATOR_IMAGE, TEXTBOOK_IMAGE, ARDUINO_KIT_IMAGE } from '../sampleData';

interface SellItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  currentUser: StudentUser | null;
  glitchMode: boolean;
}

const PRESET_SAMPLE_PHOTOS = [
  { label: 'Calculators', url: CALCULATOR_IMAGE },
  { label: 'Textbooks', url: TEXTBOOK_IMAGE },
  { label: 'Maker Kits', url: ARDUINO_KIT_IMAGE },
  { label: 'Stationery', url: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80' },
  { label: 'Electronics', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80' },
];

export const SellItemModal: React.FC<SellItemModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  currentUser,
  glitchMode,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Textbooks and Notes');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [condition, setCondition] = useState<ProductCondition>('Good');
  const [campus, setCampus] = useState(currentUser?.college || 'IIT Delhi (Hauz Khas)');
  const [sellerName, setSellerName] = useState(currentUser?.name || '');
  const [sellerEmail, setSellerEmail] = useState(currentUser?.email || '');
  const [sellerPhone, setSellerPhone] = useState('');
  const [imageUrl, setImageUrl] = useState(CALCULATOR_IMAGE);
  const [tagsInput, setTagsInput] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  // File reader for student's custom product photo upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!title.trim()) errors.title = 'Product title is required';
    if (!description.trim()) errors.description = 'Provide a brief description of condition or syllabus';
    if (!price || Number(price) <= 0) errors.price = 'Enter a valid price in INR';
    if (!sellerName.trim()) errors.sellerName = 'Your name is required';
    if (!sellerEmail.trim() || !sellerEmail.includes('@')) errors.sellerEmail = 'Valid student email required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newProduct: Product = {
      id: `cc-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      category,
      description: description.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      condition,
      image: imageUrl,
      campus,
      seller: {
        name: sellerName.trim(),
        college: campus.split('(')[0].trim(),
        department: 'Engineering / Sciences',
        semester: 'Active Student',
        isVerified: !!currentUser?.isVerified,
        contactEmail: sellerEmail.trim(),
        phone: sellerPhone.trim() || undefined,
        joinedDate: 'Just now',
        rating: 5.0,
      },
      listedDate: 'Just now',
      tags: tags.length > 0 ? tags : [category.split(' ')[0], 'Campus Deal'],
      isAvailable: true,
      viewsCount: 1,
      wishlistCount: 0,
    };

    setTimeout(() => {
      onAddProduct(newProduct);
      setIsSubmitting(false);
      setSuccessMessage(true);

      setTimeout(() => {
        setSuccessMessage(false);
        onClose();
      }, 1500);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF7F0] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-left my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:px-7 bg-white border-b border-slate-100">
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Student Exchange Portal
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              List an Item for Sale
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen Banner */}
        {successMessage ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Listing Published!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Your item is now live on Campus Cart. Fellow students on your campus can view and message you directly!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* 1. Product Name */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">
                Product Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Casio fx-991EX ClassWiz or Higher Engg Mathematics"
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                  formErrors.title ? 'border-rose-400' : 'border-slate-200'
                }`}
              />
              {formErrors.title && (
                <span className="text-xs text-rose-500 mt-1 block">{formErrors.title}</span>
              )}
            </div>

            {/* 2. Category & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  {CATEGORIES_LIST.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">
                  Item Condition <span className="text-rose-500">*</span>
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as ProductCondition)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option value="Brand New">Brand New (Unused / In Box)</option>
                  <option value="Like New">Like New (Mint condition, no marks)</option>
                  <option value="Good">Good (Normal minor wear, fully working)</option>
                  <option value="Fair">Fair (Noticeable cosmetic wear, functional)</option>
                </select>
              </div>
            </div>

            {/* 3. Description */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">
                Description & Syllabus / Specs <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail the semester relevance, edition number, working condition, or any accessories included..."
                className={`w-full px-3.5 py-2 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                  formErrors.description ? 'border-rose-400' : 'border-slate-200'
                }`}
              />
              {formErrors.description && (
                <span className="text-xs text-rose-500 mt-1 block">{formErrors.description}</span>
              )}
            </div>

            {/* 4. Price & Original MRP in INR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">
                  Listing Price (INR ₹) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 650"
                    className={`w-full pl-8 pr-3 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-semibold ${
                      formErrors.price ? 'border-rose-400' : 'border-slate-200'
                    }`}
                  />
                </div>
                {formErrors.price && (
                  <span className="text-xs text-rose-500 mt-1 block">{formErrors.price}</span>
                )}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">
                  Original MRP (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="e.g. 1400"
                    className="w-full pl-8 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* 5. Product Image Upload & Presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Product Image Upload
              </label>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white border border-dashed border-slate-300 rounded-2xl">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload Device Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Or select one of our curated high-definition academic item templates below:
                  </p>
                  
                  {/* Preset photo tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {PRESET_SAMPLE_PHOTOS.map((preset) => (
                      <button
                        type="button"
                        key={preset.label}
                        onClick={() => setImageUrl(preset.url)}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border transition-colors ${
                          imageUrl === preset.url
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Campus & Seller Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">
                  Campus / Hostel Location
                </label>
                <select
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  {CAMPUS_LIST.filter((c) => c !== 'All Campuses').map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className={`w-full px-3 py-2.5 text-sm bg-white border rounded-xl focus:outline-none ${
                    formErrors.sellerName ? 'border-rose-400' : 'border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">
                  College Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={sellerEmail}
                  onChange={(e) => setSellerEmail(e.target.value)}
                  placeholder="e.g. student@college.edu"
                  className={`w-full px-3 py-2.5 text-sm bg-white border rounded-xl focus:outline-none ${
                    formErrors.sellerEmail ? 'border-rose-400' : 'border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">
                  WhatsApp / Phone (Optional)
                </label>
                <input
                  type="text"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                  placeholder="e.g. +91 98765 00000"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>
            </div>

            {/* 7. Tags */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 block">
                Search Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. sem3, gate, 2024 edition, btech"
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-emerald-950/15 disabled:opacity-50 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>{isSubmitting ? 'Publishing...' : 'Publish Listing'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
