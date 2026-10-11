import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  UserCheck, 
  HelpCircle,
  Flag
} from 'lucide-react';

export const TrustSafetySection: React.FC = () => {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const SAFETY_RULES = [
    {
      title: 'Inspect First, Pay Later',
      description: 'Never send advance bank or UPI payments before holding the item. Physically verify book pages, calculator buttons, electronic display screens, or drafting scale calibrations.',
      icon: Eye,
      tag: 'Payment Rule',
    },
    {
      title: 'Meet in Public Campus Zones',
      description: 'Always arrange hand-offs in well-lit, populated campus areas during daytime hours: the University Library lobby, Student Activity Center, hostel mess entrance, or campus cafeteria.',
      icon: MapPin,
      tag: 'Meeting Location',
    },
    {
      title: 'Verify Student Credentials',
      description: 'Check the seller’s verified college email domain (.edu or .ac.in) or ask to see their college ID card during pickup to ensure they are an active campus student.',
      icon: UserCheck,
      tag: 'Identity Check',
    },
    {
      title: 'Zero Third-Party Middlemen',
      description: 'Campus Cart is 100% peer-to-peer. Never interact with external courier calls or fraudulent payment links claiming to be platform representatives.',
      icon: Lock,
      tag: 'Fraud Prevention',
    },
  ];

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason.trim()) return;
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setReportModalOpen(false);
      setReportReason('');
    }, 2000);
  };

  return (
    <section className="py-16 bg-[#FAF7F0] border-t border-emerald-900/10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Campus Trust & Safety Protocol</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Safe & Trustworthy Academic Exchanges
            </h2>
          </div>
          <button
            onClick={() => setReportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors shadow-xs w-fit"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Report Suspicious Listing</span>
          </button>
        </div>

        {/* 4 Safety Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAFETY_RULES.map((rule) => {
            const Icon = rule.icon;
            return (
              <div
                key={rule.title}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                    {rule.tag}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {rule.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {rule.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Student Community Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety checklist card */}
        <div className="mt-10 p-6 rounded-2xl bg-emerald-900/5 border border-emerald-900/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Campus Cart Zero-Scam Pledge</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                All accounts are monitored by campus moderation moderators. We support direct UPI QR / cash upon physical handover to guarantee student safety.
              </p>
            </div>
          </div>
          <div className="text-xs font-bold text-emerald-800 bg-white px-4 py-2 rounded-xl border border-emerald-200 shrink-0">
            Emergency Peer Helpline: safety@campuscart.edu
          </div>
        </div>

      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
                <AlertTriangle className="w-5 h-5" />
                <span>Report an Item or Seller</span>
              </div>
              <button
                onClick={() => setReportModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {reportSubmitted ? (
              <div className="py-6 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl">
                Thank you! Your report has been dispatched to campus moderators.
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4 text-left">
                <p className="text-xs text-slate-600">
                  Help keep your university community safe. Tell us about counterfeit items, suspicious pricing, or broken safety guidelines.
                </p>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Describe the issue
                  </label>
                  <textarea
                    rows={3}
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    placeholder="e.g. Seller asked for upfront online transfer before meeting..."
                    className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-500"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
