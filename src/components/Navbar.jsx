import React, { useState, useEffect } from "react";
import {
  Bell,
  LogOut,
  UserCheck,
  Clock,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { resetAllData } from "../utils/storage";

export default function Navbar({
  currentUser,
  employees,
  onSwitchUser,
  todayAttendance,
  onQuickPunch,
  pendingLeavesCount,
  onNavigate,
  onLogout,
  onOpenLoginModal
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isCheckedIn = !!todayAttendance?.checkIn && !todayAttendance?.checkOut;

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <header className="sticky top-0 z-40 bg-[#08080d]/95 backdrop-blur-xl border-b border-[#ffd700]/25 px-4 lg:px-8 py-3 transition-all shadow-xl">
      <div className="flex items-center justify-between gap-4">
        {/* Brand & Emblem */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => onNavigate("dashboard")}>
            <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#dc2626] via-[#ffd700] to-[#b91c1c] shadow-lg group-hover:scale-105 transition-transform glow-red-sm">
              <img
                src="./sarlayash_logo.jpg"
                alt="SarlaYash Emblem"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full hidden items-center justify-center bg-[#050507] rounded-full text-[#ffd700] font-black text-xs">
                SY
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#08080d] rounded-full"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg lg:text-xl font-black tracking-wider text-white flex items-center gap-1.5 font-serif">
                <span className="text-white drop-shadow">SARLA</span>
                <span className="gold-gradient-text drop-shadow">YASH</span>
                <span className="text-white text-[11px] font-sans font-extrabold bg-[#dc2626] px-2 py-0.5 rounded-full border border-red-500/50 shadow-sm tracking-widest">
                  UNIVERSE
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-300 font-medium hidden sm:block">
              Enterprise Internal ERP • <span className="text-[#ffd700] font-semibold">Powered By Kapil</span>
            </p>
          </div>
        </div>

        {/* Center Live Clock */}
        <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#111118] border border-[#2a2a38] text-xs text-slate-200 shadow-inner">
          <Clock className="w-4 h-4 text-[#dc2626] animate-pulse" />
          <span className="font-bold text-[#ffd700] tracking-wider font-mono">{formattedTime}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-200">{formattedDate}</span>
          <span className="text-[10px] bg-[#dc2626]/20 text-[#fca5a5] border border-[#dc2626]/40 px-2 py-0.5 rounded uppercase font-bold tracking-wider">
            IST
          </span>
        </div>

        {/* Right Action Tools & Fast Persona Switcher */}
        <div className="flex items-center gap-3">
          {/* Quick Punch Button */}
          <button
            onClick={onQuickPunch}
            className={`hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md ${
              isCheckedIn
                ? "bg-[#181824] border border-emerald-500/50 text-emerald-300 hover:bg-emerald-950/40"
                : "bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] text-white hover:brightness-110 glow-red-sm border border-red-500/50"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{isCheckedIn ? "Checked In (Clock Out)" : "Punch Attendance"}</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-[#111118] border border-[#2a2a38] text-slate-300 hover:text-[#ffd700] hover:border-[#ffd700]/50 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {pendingLeavesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#dc2626] text-white font-extrabold text-[10px] rounded-full flex items-center justify-center animate-bounce shadow">
                  {pendingLeavesCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0d0d14] border border-[#ffd700]/30 rounded-2xl shadow-2xl p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#222230] mb-2.5">
                  <h4 className="text-xs font-bold text-[#ffd700] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" /> SarlaYash Alerts
                  </h4>
                  <span className="text-[10px] text-slate-400">Live Telemetry</span>
                </div>
                <div className="space-y-2 text-xs">
                  {pendingLeavesCount > 0 && (
                    <div
                      onClick={() => {
                        setShowNotifications(false);
                        onNavigate("leaves");
                      }}
                      className="p-2.5 rounded-xl bg-[#2a1012] border border-[#dc2626]/50 text-red-200 cursor-pointer hover:bg-[#3d1417] transition-colors flex items-start gap-2"
                    >
                      <AlertTriangle className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white">{pendingLeavesCount} Pending Leave Request(s)</p>
                        <p className="text-[11px] text-slate-300">Requires executive manager approval.</p>
                      </div>
                    </div>
                  )}

                  <div className="p-2.5 rounded-xl bg-[#14141e] border border-[#222230] text-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ffd700] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Daily Attendance Active</p>
                      <p className="text-[11px] text-slate-400">1-Hour consistency model & 5-Day week active.</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#14141e] border border-[#222230] text-slate-200 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Performance Slabs 0–3</p>
                      <p className="text-[11px] text-slate-400">₹1,000 to ₹15,000 monthly slabs unlocked.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Active User Pill & Fast Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-[#111118] border border-[#ffd700]/30 hover:border-[#ffd700] transition-all text-left"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#dc2626] to-[#ffd700] text-white font-black flex items-center justify-center text-sm shadow">
                {currentUser?.avatar || "👤"}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white leading-tight">{currentUser?.name}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase tracking-wider bg-[#dc2626]/20 text-[#fca5a5] border border-[#dc2626]/40">
                    {currentUser?.ecode}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-none truncate max-w-[130px]">
                  {currentUser?.designation}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Quick Switch Persona Dropdown */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-[#09090f] border border-[#ffd700]/30 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-[#222230] mb-2">
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#ffd700]">
                    Switch Active Persona (Instant Demo)
                  </p>
                  <p className="text-[11px] text-slate-400">All 10 Accounts • Password: Passw@rd</p>
                </div>

                <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
                  {employees.map((emp) => {
                    const isSelected = emp.id === currentUser?.id;
                    return (
                      <button
                        key={emp.id}
                        onClick={() => {
                          onSwitchUser(emp.id);
                          setShowUserDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all text-xs ${
                          isSelected
                            ? "bg-[#dc2626]/20 border border-[#dc2626]/50 text-[#ffd700] font-bold"
                            : "hover:bg-[#181822] text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-base">{emp.avatar}</span>
                          <div className="truncate">
                            <p className="font-semibold text-white truncate">{emp.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{emp.designation}</p>
                          </div>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#121218] text-[#ffd700] font-mono shrink-0 ml-1 border border-[#2a2a36]">
                          {emp.ecode}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 pt-2 border-t border-[#222230] flex items-center justify-between text-xs px-2">
                  <button
                    onClick={resetAllData}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-[#ffd700] transition-colors py-1"
                    title="Reset all dummy records to clean state"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset Data
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onLogout();
                    }}
                    className="flex items-center gap-1 text-[#f87171] hover:text-[#dc2626] font-bold transition-colors py-1"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Direct Logout Button in Header */}
          <button
            onClick={onLogout}
            className="p-2 rounded-xl bg-[#111118] border border-[#2a2a38] text-slate-400 hover:text-[#f87171] hover:border-[#dc2626]/50 transition-colors"
            title="Log Out of SarlaYash ERP"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
