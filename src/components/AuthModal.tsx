import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Lock, 
  Mail, 
  User, 
  Building, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  LogOut
} from 'lucide-react';
import { StudentUser } from '../types';
import { CAMPUS_LIST } from '../sampleData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: StudentUser | null;
  onLogin: (user: StudentUser) => void;
  onLogout: () => void;
  glitchMode: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  glitchMode,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('IIT Delhi (Hauz Khas)');
  const [rollNumber, setRollNumber] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [password, setPassword] = useState('');
  const [verificationPreference, setVerificationPreference] = useState<'email' | 'id_card'>('email');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (isSignUp && !name.trim()) errs.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid college email is required';
    if (!password || password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Check if college domain is verified
    const isAcademicEmail = email.endsWith('.ac.in') || email.endsWith('.edu') || email.includes('bits-pilani') || email.includes('iit');

    const student: StudentUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: isSignUp ? name.trim() : (currentUser?.name || email.split('@')[0]),
      email: email.trim(),
      college,
      rollNumber: rollNumber.trim() || '2024CSB1042',
      department,
      isVerified: isAcademicEmail,
      verificationStatus: isAcademicEmail ? 'verified' : 'pending',
    };

    onLogin(student);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FAF7F0] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-left my-8">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {currentUser ? 'Student Profile' : isSignUp ? 'Student Registration' : 'Student Sign In'}
              </h3>
              <p className="text-xs text-slate-500">Campus Cart Academic Network</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If user is already logged in: View Profile */}
        {currentUser ? (
          <div className="p-6 space-y-5 bg-white">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60">
              <div className="w-12 h-12 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-lg">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <span>{currentUser.name}</span>
                  {currentUser.isVerified && (
                    <span title="Verified Campus Student">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500">{currentUser.email}</div>
                <div className="text-[11px] font-semibold text-emerald-800 mt-0.5">
                  {currentUser.college}
                </div>
              </div>
            </div>

            {/* Verification Status Banner */}
            <div className={`p-4 rounded-xl border text-xs space-y-1 ${
              currentUser.isVerified
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {currentUser.isVerified ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Academic Email Verified</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Verification Pending Review</span>
                  </>
                )}
              </div>
              <p className="text-[11px] leading-relaxed">
                {currentUser.isVerified
                  ? 'Your institutional domain is recognized. You can list items with the green Verified Student badge.'
                  : 'You can buy and message sellers freely. Verified student status activates upon college email or ID card check.'}
              </p>
            </div>

            {/* Honest Demo notice */}
            <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Demonstration Mode: Session is securely persisted in local storage for testing your college startup demo.
              </span>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Login / Sign Up Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white">
            
            {/* Honest verification disclaimer */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Student Verification System:</span> Use your college email (.ac.in or .edu) or institute name to simulate instant student badge assignment.
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                {errors.name && <span className="text-[11px] text-rose-500">{errors.name}</span>}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                College / Personal Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul.ee23@iitd.ac.in"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              {errors.email && <span className="text-[11px] text-rose-500">{errors.email}</span>}
            </div>

            {/* College Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                College / Institute Name
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  {CAMPUS_LIST.filter((c) => c !== 'All Campuses').map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {isSignUp && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Mechanical"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Student / Roll No.
                  </label>
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="e.g. 2023ME1045"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              {errors.password && <span className="text-[11px] text-rose-500">{errors.password}</span>}
            </div>

            {/* Submit Action */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-sm"
              >
                {isSignUp ? 'Create Student Account' : 'Sign In to Campus Cart'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs text-emerald-700 hover:underline font-semibold"
                >
                  {isSignUp
                    ? 'Already registered? Sign in here'
                    : "Don't have an account? Sign up for your campus"}
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
