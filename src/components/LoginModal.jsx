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
  Lock
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-2xl my-8 rounded-3xl bg-[#09090e] border-2 border-[#ffd700]/50 p-6 sm:p-8 shadow-2xl space-y-6 relative glow-red-sm">
        {!isMandatory && onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a1a24]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#ffd700] via-[#fef08a] to-[#d4af37] mx-auto shadow-xl ring-4 ring-[#dc2626]/40">
            <img
              src="./sarlayash_logo.jpg"
              alt="SarlaYash Emblem"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-serif tracking-wide gold-gradient-text">
            SARLAYASH UNIVERSE ERP
          </h2>
          <p className="text-xs text-[#ffd700] font-semibold tracking-wider uppercase">
            Internal Enterprise Portal • Powered By Kapil
          </p>
          <p className="text-[11px] text-slate-300 max-w-md mx-auto">
            Please authenticate with your official employee credentials to access your individual dashboard, punch daily attendance, log deliverables, and apply for leaves.
          </p>
        </div>

        {/* Security & Confidentiality Advisory (No password displayed anywhere) */}
        <div className="p-3.5 rounded-2xl bg-[#0e0e16] border border-[#ffd700]/30 text-xs text-slate-300 flex items-center gap-3 shadow-inner">
          <div className="p-2 rounded-xl bg-[#dc2626]/20 border border-[#dc2626]/40 text-[#ffd700] shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div className="text-[11px] leading-relaxed">
            <p className="font-bold text-white">Confidential Enterprise Access</p>
            <p className="text-slate-400">
              Your password has been verbally shared by Founder Kapil Narula. Keep credentials private at all times.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-[#dc2626]/20 border border-[#dc2626]/50 text-[#fca5a5] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-200">Official ERP Login ID (ECODE)</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                setErrorMsg("");
              }}
              placeholder="Enter your ID (e.g. SYM001, SYM002, SYM004...)"
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

        {/* Account Quick-Identifier Picker (Inserts ECODE only, requires password) */}
        <div className="pt-4 border-t border-[#222230] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Select Your Name to Autofill ID:
            </p>
            <span className="text-[10px] text-[#ffd700] font-mono">10 Official Accounts</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 text-xs max-h-52 overflow-y-auto pr-1">
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
  );
}
