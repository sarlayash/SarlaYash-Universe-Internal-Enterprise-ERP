import React, { useState } from "react";
import {
  LogIn,
  KeyRound,
  Shield,
  Sparkles,
  UserCheck,
  CheckCircle2,
  X,
  AlertCircle
} from "lucide-react";

export default function LoginModal({
  isOpen,
  onClose,
  employees,
  onLoginSuccess
}) {
  const [identifier, setIdentifier] = useState("SYM001");
  const [password, setPassword] = useState("sarlayash123");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanId = identifier.trim().toLowerCase();

    const found = employees.find(
      (emp) =>
        emp.ecode.toLowerCase() === cleanId ||
        emp.email.toLowerCase() === cleanId ||
        emp.name.toLowerCase().includes(cleanId)
    );

    if (!found) {
      setErrorMsg("Employee ID or email not found in SarlaYash records.");
      return;
    }

    if (password !== "sarlayash123" && password !== found.ecode.toLowerCase()) {
      setErrorMsg("Invalid password. Default demo password is: sarlayash123");
      return;
    }

    onLoginSuccess(found.id);
    onClose();
  };

  const handleQuickSelect = (empId) => {
    onLoginSuccess(empId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg rounded-3xl bg-[#091124] border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-600 mx-auto shadow-lg">
            <img
              src="./sarlayash_logo.jpg"
              alt="SarlaYash Emblem"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-serif tracking-wide">
            SarlaYash Universe ERP
          </h2>
          <p className="text-xs text-amber-300 font-medium">
            Internal Enterprise Portal • Powered By Kapil
          </p>
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
            <label className="font-semibold text-slate-300">Employee Code or Official Email</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                setErrorMsg("");
              }}
              placeholder="e.g. SYM001 or SYM004 or amber.khanum@sarlayash.com"
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400 font-mono"
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-300">Password</label>
              <span className="text-[10px] text-amber-400/80">Default: sarlayash123</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg("");
              }}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-black text-xs hover:brightness-110 shadow-lg glow-gold transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>AUTHENTICATE & ENTER PORTAL</span>
          </button>
        </form>

        {/* Quick One-Click Switcher for testing all roles */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider text-center">
            Or Choose A Role For Instant Access:
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickSelect("SYM001")}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-left transition-all"
            >
              <span className="font-bold text-amber-300 block">👑 Kapil Narula</span>
              <span className="text-[10px] text-slate-400">Founder & Super Admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickSelect("SYM002")}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all"
            >
              <span className="font-bold text-white block">⚡ Sathursan K.</span>
              <span className="text-[10px] text-slate-400">Chief Executive Officer</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickSelect("SYM003")}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all"
            >
              <span className="font-bold text-white block">🌸 Trisha Ghosh</span>
              <span className="text-[10px] text-slate-400">Chief People Officer</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickSelect("SYM004")}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all"
            >
              <span className="font-bold text-white block">🚀 Amber Khanum</span>
              <span className="text-[10px] text-slate-400">AI Ladder 🪜 Lead</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickSelect("SYM005")}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all"
            >
              <span className="font-bold text-white block">💻 Arpan Mandal</span>
              <span className="text-[10px] text-slate-400">Solution Engineer (DSA)</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickSelect("SYM007")}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all"
            >
              <span className="font-bold text-white block">🎯 Nidhi Rathore</span>
              <span className="text-[10px] text-slate-400">Solution Engineer (Aptitude)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
