import React from 'react';
import { 
  BookOpen, 
  Calculator, 
  FlaskConical, 
  Cpu, 
  Compass, 
  PenTool, 
  Laptop, 
  Coffee,
  ArrowRight
} from 'lucide-react';
import { ProductCategory } from '../types';

interface CategoriesSectionProps {
  onSelectCategory: (category: ProductCategory) => void;
  selectedCategory: string;
}

interface CategoryCardMeta {
  title: ProductCategory;
  icon: React.ElementType;
  description: string;
  count: number;
  badge: string;
}

const CATEGORY_ITEMS: CategoryCardMeta[] = [
  {
    title: 'Textbooks and Notes',
    icon: BookOpen,
    description: 'Engineering, medical, maths books & solved exam papers',
    count: 340,
    badge: 'High Demand',
  },
  {
    title: 'Calculators',
    icon: Calculator,
    description: 'Scientific fx-991EX, graphing TI-84 & financial tools',
    count: 85,
    badge: 'Semester Start',
  },
  {
    title: 'Lab Materials',
    icon: FlaskConical,
    description: 'Cotton lab aprons, safety goggles & dissection sets',
    count: 112,
    badge: 'Sanitized',
  },
  {
    title: 'Project Kits',
    icon: Cpu,
    description: 'Arduino Uno, Raspberry Pi, sensor kits & breadboards',
    count: 94,
    badge: 'Tech & IoT',
  },
  {
    title: 'Drawing Tools',
    icon: Compass,
    description: 'Mini drafters, engineering sheets, compass sets & T-squares',
    count: 67,
    badge: 'Drafting',
  },
  {
    title: 'Stationery',
    icon: PenTool,
    description: 'Spiral notebook bundles, technical pens & highlighters',
    count: 145,
    badge: 'Bulk Packs',
  },
  {
    title: 'Electronics',
    icon: Laptop,
    description: 'Bluetooth keyboards, mice, adapters & study monitors',
    count: 120,
    badge: 'Tested',
  },
  {
    title: 'Other College Essentials',
    icon: Coffee,
    description: 'Hostel kettles, desk lamps, laundry racks & room organizers',
    count: 178,
    badge: 'Hostel Life',
  },
];

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <section className="py-14 bg-white/60 border-y border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 text-left">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Explore by Academic Category
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              What do you need for this semester?
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Save up to 70% by buying pre-loved academic gear directly from senior students who took the course before you.
          </p>
        </div>

        {/* 8 Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORY_ITEMS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedCategory === item.title;

            return (
              <button
                key={item.title}
                onClick={() => onSelectCategory(item.title)}
                className={`group relative text-left p-5 rounded-2xl border transition-all duration-200 bg-white hover:-translate-y-1 hover:shadow-md ${
                  isSelected
                    ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-slate-200/90 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-emerald-700 transition-colors">
                    {item.count} items
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Browse Category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
