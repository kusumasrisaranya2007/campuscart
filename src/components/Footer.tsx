import React, { useState } from 'react';
import { 
  ShoppingCart, 
  GraduationCap, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Heart, 
  ExternalLink,
  Edit2,
  Check
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactEmail, setContactEmail] = useState('kusumasrisaranya2007@gmail.com');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const FAQS = [
    {
      q: 'How does Campus Cart keep student exchanges safe?',
      a: 'Campus Cart is designed for physical campus hand-offs in public spaces such as university libraries and student cafeterias. We advocate for zero upfront online transfers: students inspect the textbook, calculator, or lab tool before releasing payment.',
    },
    {
      q: 'Do I have to pay any listing fee or commission?',
      a: 'No! Campus Cart is 100% free for students. 0% platform fee, 0% listing fee. Our goal is to make academic essentials affordable and reduce campus waste.',
    },
    {
      q: 'Can I sell non-academic items?',
      a: 'We prioritize academic and campus essentials: textbooks, notes, scientific calculators, drafting tools, lab aprons, robotics kits, stationery, electronics, and dorm necessities like kettles and desk lamps.',
    },
    {
      q: 'How do I verify my college email address?',
      a: 'Sign up using your institutional domain ending in .edu, .ac.in, or university specific handle. Our automated domain check verifies your enrollment status immediately.',
    },
  ];

  return (
    <footer className="bg-[#14231E] text-slate-300 pt-16 pb-12 border-t border-emerald-950 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Top Tier: Brand + FAQs + Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & College Project Mission */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <ShoppingCart className="w-5 h-5" />
                <div className="absolute -top-1.5 -right-1.5 bg-amber-400 text-emerald-950 rounded-full p-1 shadow">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Campus<span className="text-emerald-400">Cart</span>
                </span>
                <div className="text-[11px] text-emerald-400 font-medium">
                  Buy Smart · Sell Easy · Save More
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A college-exclusive academic marketplace founded by students for students. Trade, buy, and pass forward course materials at honest peer prices.
            </p>

            {/* Editable Contact Email Placeholder */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center justify-between max-w-xs">
                <span>Support & Startup Contact:</span>
                <button
                  onClick={() => setIsEditingEmail(!isEditingEmail)}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px]"
                  title="Customize contact email"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>{isEditingEmail ? 'Done' : 'Edit Email'}</span>
                </button>
              </div>

              {isEditingEmail ? (
                <div className="flex items-center gap-2 max-w-xs">
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="px-2.5 py-1 text-xs bg-slate-800 border border-emerald-500 rounded-lg text-white w-full focus:outline-none"
                  />
                  <button
                    onClick={() => setIsEditingEmail(false)}
                    className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>{contactEmail}</span>
                </a>
              )}
            </div>

            <div className="p-3 bg-emerald-950/60 border border-emerald-800/40 rounded-xl text-[11px] text-emerald-200/90">
              🎓 College Startup Prototype Demo · Built for university pitch presentation.
            </div>
          </div>

          {/* Column 2: Interactive FAQ Accordion */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Frequently Asked Questions
            </h4>
            <div className="space-y-2">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="border border-emerald-900/60 rounded-xl overflow-hidden bg-slate-900/40"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-3 text-left text-xs font-bold text-slate-200 flex items-center justify-between hover:text-emerald-300 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 pt-1 text-xs text-slate-400 leading-relaxed border-t border-emerald-950">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: Navigation & Legal Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Campus Cart Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setLegalModal('privacy')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  Privacy Policy & Data Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal('terms')}
                  className="hover:text-emerald-300 transition-colors text-left"
                >
                  Terms and Conditions of Use
                </button>
              </li>
              <li>
                <a
                  href="#safety"
                  className="hover:text-emerald-300 transition-colors block"
                >
                  Trust & Campus Safety Handbook
                </a>
              </li>
              <li>
                <span className="text-slate-500 block pt-2">
                  Currency standard: INR (₹)
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Startup Attribution */}
        <div className="pt-8 border-t border-emerald-950/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Campus Cart. All rights reserved. Peer-to-Peer Academic Exchange.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-slate-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-slate-400 transition-colors"
            >
              Terms of Service
            </button>
            <span>·</span>
            <span>Campus Cart Prototype v1.0</span>
          </div>
        </div>

      </div>

      {/* Privacy / Terms Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">
                {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions'}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="text-slate-400 hover:text-slate-800 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Student Information:</strong> Campus Cart collects student name, university email, and listed products solely to facilitate peer academic exchanges within authorized university campuses.
                  </p>
                  <p>
                    <strong>2. Data Retention:</strong> Listing images and descriptions are stored only while the item remains actively available. No user data is sold to commercial advertising networks.
                  </p>
                  <p>
                    <strong>3. Location Privacy:</strong> We never track live GPS locations. All meeting points are designated campus landmarks selected voluntarily by students.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Permissible Materials:</strong> Only legitimate study materials, textbooks, scientific tools, and college essentials may be posted. Counterfeit academic degrees or unauthorized exam leaks are strictly prohibited.
                  </p>
                  <p>
                    <strong>2. Cash on Delivery & Direct Handover:</strong> Buyers and sellers agree to inspect items upon physical delivery in public campus premises before monetary transfer.
                  </p>
                  <p>
                    <strong>3. Prototype Notice:</strong> Campus Cart is presented as an academic marketplace prototype for student entrepreneurship review.
                  </p>
                </>
              )}
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
