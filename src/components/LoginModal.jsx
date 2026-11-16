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
  EyeOff
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
      setErrorMsg(`Invalid Login ID "${identifier}". Please use SYM001 to SYM010.`);
      return;
    }

    // Check password: match "Passw@rd" (case sensitive or exact), also allow "sarlayash123"
    const trimmedPass = password.trim();
    if (trimmedPass !== "Passw@rd" && trimmedPass !== "sarlayash123" && trimmedPass !== found.password) {
      setErrorMsg("Incorrect password. Official password is: Passw@rd");
      return;
    }

    onLoginSuccess(found.id);
  };

  const handleQuickSelect = (empId) => {
    onLoginSuccess(empId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-2xl my-8 rounded-3xl bg-[#091124] border-2 border-amber-500/50 p-6 sm:p-8 shadow-2xl space-y-6 relative">
        {!isMandatory && onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-600 mx-auto shadow-xl ring-4 ring-amber-500/20">
            <img
              src="./sarlayash_logo.jpg"
              alt="SarlaYash Emblem"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-serif tracking-wide gold-gradient-text">
            SARLAYASH UNIVERSE ERP
          </h2>
          <p className="text-xs text-amber-300 font-semibold tracking-wider uppercase">
            Internal Enterprise Portal • Powered By Kapil
          </p>
          <p className="text-[11px] text-slate-400 max-w-md mx-auto">
            Please log in with your official ERP credentials to access your daily tasks, mark attendance, apply for leaves, and submit work logs.
          </p>
        </div>

        {/* Credentials Info Badge from User Table */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Official Password for all 10 members:</span>
          </div>
          <code className="font-mono font-black text-amber-300 bg-slate-900/90 px-3 py-1 rounded-lg border border-amber-500/40 text-sm">
            Passw@rd
          </code>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-300">ERP Login ID (ECODE)</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                setErrorMsg("");
              }}
              placeholder="e.g. SYM001, SYM002, SYM004, SYM010"
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-mono tracking-wider text-sm placeholder:text-slate-600"
              required
              autoFocus
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-300">Password</label>
              <span className="text-[10px] text-slate-400">Default: Passw@rd</span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="Passw@rd"
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black text-xs hover:brightness-110 shadow-lg glow-gold transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <LogIn className="w-4 h-4" />
            <span>SIGN IN TO PERSONAL WORKSPACE</span>
          </button>
        </form>

        {/* Quick One-Click Switcher for all 10 members from the spreadsheet */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Or Select Your Account Directly (1-Click Instant Sign-In):
            </p>
            <span className="text-[10px] text-amber-400 font-mono">10 Team Accounts</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 text-xs max-h-56 overflow-y-auto pr-1">
            {employees.map((emp) => (
              <button
                key={emp.id}
                type="button"
                onClick={() => handleQuickSelect(emp.id)}
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 text-left transition-all flex items-center justify-between gap-2 group"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-base shrink-0">{emp.avatar}</span>
                  <div className="truncate">
                    <p className="font-bold text-white text-xs truncate group-hover:text-amber-300">
                      {emp.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">{emp.designation}</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-700 shrink-0">
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
