import React, { useState } from "react";
import {
  LogIn,
  KeyRound,
  Shield,
  Sparkles,
  UserCheck,
  CheckCircle2,
  X,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  Cpu,
  HeartHandshake,
  MessageSquareQuote
} from "lucide-react";

export default function LoginModal({
  isOpen,
  onClose,
  employees,
  onLoginSuccess,
  isMandatory = false
}) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mobileTab, setMobileTab] = useState("login"); // 'login' | 'vision'

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanId = identifier.trim().toUpperCase();

    // Find employee by ECODE / ERP Login ID / Email
    const found = employees.find(
      (emp) =>
        emp.ecode.toUpperCase() === cleanId ||
        (emp.erpLoginId && emp.erpLoginId.toUpperCase() === cleanId) ||
        emp.email.toLowerCase() === identifier.trim().toLowerCase() ||
        (cleanId === "SYM10" && emp.ecode === "SYM010") ||
        (cleanId === "SYM010" && emp.ecode === "SYM10")
    );

    if (!found) {
      setErrorMsg(`Invalid Login ID "${identifier}". Please use official ID: SYM001 to SYM010.`);
      return;
    }

    // Check confidential password
    const trimmedPass = password.trim();
    if (trimmedPass !== "Passw@rd" && trimmedPass !== "sarlayash123" && trimmedPass !== found.password) {
      setErrorMsg("Incorrect password. Please enter the confidential password verbally shared by Founder Kapil Narula.");
      return;
    }

    onLoginSuccess(found.id);
  };

  const handleSelectAccount = (emp) => {
    setIdentifier(emp.ecode);
    setErrorMsg("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-5xl my-auto rounded-3xl bg-gradient-to-b from-[#0f0c10] via-[#09090e] to-[#060608] border-2 border-[#ffd700]/50 shadow-2xl overflow-hidden relative glow-red-sm">
        {!isMandatory && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-xl text-slate-400 hover:text-white bg-[#14141e]/80 border border-[#2a2a38] transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Mobile Tab Switcher */}
        <div className="lg:hidden flex border-b border-[#222230] bg-[#07070b]">
          <button
            type="button"
            onClick={() => setMobileTab("login")}
            className={`flex-1 py-3 text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === "login"
                ? "text-[#ffd700] border-b-2 border-[#ffd700] bg-[#14141e]"
                : "text-slate-400"
            }`}
          >
            <LogIn className="w-4 h-4 text-[#dc2626]" />
            <span>ERP Sign-In</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("vision")}
            className={`flex-1 py-3 text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === "vision"
                ? "text-[#ffd700] border-b-2 border-[#ffd700] bg-[#14141e]"
                : "text-slate-400"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#ffd700]" />
            <span>Founder's Note & Vision</span>
          </button>
        </div>

        {/* Dual Panel Layout for Desktop, Tabbed / Responsive for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* LEFT PANEL: Founder's Image & Executive Note */}
          <div
            className={`lg:col-span-5 p-6 lg:p-8 bg-gradient-to-br from-[#180a0d] via-[#10080c] to-[#08080d] border-b lg:border-b-0 lg:border-r border-[#ffd700]/30 flex flex-col justify-between space-y-5 ${
              mobileTab === "vision" ? "block" : "hidden lg:flex"
            }`}
          >
            <div className="space-y-4">
              {/* Header Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dc2626]/20 border border-[#dc2626]/50 text-[#ffd700] text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>Founder's Address • SarlaYash Universe</span>
              </div>

              {/* Founder Image Showcase Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#ffd700]/40 shadow-2xl bg-black group">
                <img
                  src="./kapil_founder_mentorship.jpg"
                  alt="Kapil Narula — Founder & Mentor"
                  className="w-full h-72 sm:h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "./sarlayash_logo.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 text-left">
                  <span className="px-2 py-0.5 rounded bg-[#dc2626] text-white font-black text-[9px] uppercase tracking-wider shadow">
                    FOUNDER & SUPER ADMIN
                  </span>
                  <h3 className="text-xl font-black text-white font-serif mt-1 gold-gradient-text drop-shadow">
                    Kapil Narula
                  </h3>
                  <p className="text-[11px] text-slate-200 drop-shadow">
                    SarlaYash Universe • Powered By Kapil
                  </p>
                </div>
              </div>

              {/* Official Founder's Note */}
              <div className="p-4 rounded-2xl bg-[#090910] border border-[#ffd700]/30 space-y-2.5 shadow-inner">
                <div className="flex items-center gap-2 text-[#ffd700]">
                  <MessageSquareQuote className="w-5 h-5 text-[#dc2626]" />
                  <span className="text-xs font-serif font-black tracking-wide uppercase">
                    Founder's Note to Every Team Member:
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "Welcome to your enterprise workspace. At SarlaYash Universe, we believe education, technology, and mentorship must merge into a unified, compassionate ecosystem. You are not merely punching daily attendance or submitting tasks — you are creating tangible, measurable impact in students' lives. 
                  Learn with relentless curiosity, execute with discipline, and uphold our core values. Together, we are building the future of work and learning."
                </p>
                <div className="pt-2 border-t border-[#1e1e2c] flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#ffd700]">— Kapil Narula</span>
                  <span className="text-slate-400 font-mono text-[10px]">Namaste & Jai Hind</span>
                </div>
              </div>
            </div>

            {/* Quick Mentorship Pillars */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-slate-300">
              <div className="p-2 rounded-xl bg-[#0a0a10] border border-[#222230] flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>Academic Excellence</span>
              </div>
              <div className="p-2 rounded-xl bg-[#0a0a10] border border-[#222230] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#dc2626]" />
                <span>AI & Industry Readiness</span>
              </div>
              <div className="p-2 rounded-xl bg-[#0a0a10] border border-[#222230] flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span>Placements & Careers</span>
              </div>
              <div className="p-2 rounded-xl bg-[#0a0a10] border border-[#222230] flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-pink-400" />
                <span>Real-World Mentoring</span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Enterprise Sign-In Terminal */}
          <div
            className={`lg:col-span-7 p-6 lg:p-8 flex flex-col justify-between space-y-5 ${
              mobileTab === "login" ? "block" : "hidden lg:flex"
            }`}
          >
            <div>
              {/* Header Title & Logo */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-[#222230]">
                <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#ffd700] via-[#fef08a] to-[#d4af37] shadow-lg shrink-0">
                  <img
                    src="./sarlayash_logo.jpg"
                    alt="SarlaYash Emblem"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-serif tracking-wide gold-gradient-text">
                    SARLAYASH UNIVERSE ERP
                  </h2>
                  <p className="text-[11px] text-[#ffd700] font-semibold tracking-wider uppercase">
                    Official Enterprise Portal • Authenticated Access
                  </p>
                </div>
              </div>

              {/* Confidentiality Notice */}
              <div className="mt-4 p-3 rounded-2xl bg-[#0e0e16] border border-[#ffd700]/30 text-xs text-slate-300 flex items-center gap-3 shadow-inner">
                <div className="p-2 rounded-xl bg-[#dc2626]/20 border border-[#dc2626]/40 text-[#ffd700] shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-relaxed">
                  <p className="font-bold text-white">Confidential Password Protocol</p>
                  <p className="text-slate-400">
                    Common passwords are never displayed on screen. Shared verbally by Founder Kapil Narula.
                  </p>
                </div>
              </div>

              {errorMsg && (
                <div className="mt-3 p-3 rounded-xl bg-[#dc2626]/20 border border-[#dc2626]/50 text-[#fca5a5] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Credentials Form */}
              <form onSubmit={handleLogin} className="space-y-4 mt-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-200">Official ERP Login ID (ECODE)</label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      setErrorMsg("");
                    }}
                    placeholder="Enter ID (e.g. SYM001, SYM002, SYM004...)"
                    className="w-full p-3 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700] font-mono tracking-wider text-sm placeholder:text-slate-600 transition-colors"
                    required
                    autoFocus
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-200">Confidential Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMsg("");
                      }}
                      placeholder="••••••••••••"
                      className="w-full p-3 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700] text-sm transition-colors tracking-widest placeholder:text-slate-600"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-white"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-black text-xs shadow-lg glow-red transition-all flex items-center justify-center gap-2 uppercase tracking-wider border border-[#ffd700]/30"
                >
                  <LogIn className="w-4 h-4 text-[#ffd700]" />
                  <span>SIGN IN TO MY INDIVIDUAL WORKSPACE</span>
                </button>
              </form>
            </div>

            {/* Account Quick-Identifier Picker (Inserts ECODE only, requires password) */}
            <div className="pt-4 border-t border-[#222230] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Select Your Name to Autofill ID:
                </p>
                <span className="text-[10px] text-[#ffd700] font-mono">10 Official Accounts</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 text-xs max-h-48 overflow-y-auto pr-1">
                {employees.map((emp) => (
                  <button
                    key={emp.id}
                    type="button"
                    onClick={() => handleSelectAccount(emp)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 group ${
                      identifier.trim().toUpperCase() === emp.ecode.toUpperCase()
                        ? "bg-[#1c0c0e] border-[#dc2626] text-[#ffd700]"
                        : "bg-[#0e0e16] hover:bg-[#161622] border-[#222230] hover:border-[#ffd700]/50 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base shrink-0">{emp.avatar}</span>
                      <div className="truncate">
                        <p className="font-bold text-white text-xs truncate group-hover:text-[#ffd700]">
                          {emp.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">{emp.designation}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1a0a0d] text-[#ffd700] border border-[#dc2626]/30 shrink-0">
                      {emp.ecode}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
