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
  RefreshCw,
  ExternalLink
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
    <header className="sticky top-0 z-40 bg-[#080e1e]/90 backdrop-blur-md border-b border-amber-500/20 px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Brand & Emblem */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => onNavigate("dashboard")}>
            <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-600 shadow-md group-hover:scale-105 transition-transform">
              <img
                src="./sarlayash_logo.jpg"
                alt="SarlaYash Emblem"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full hidden items-center justify-center bg-navy-900 rounded-full text-amber-400 font-bold text-xs">
                SY
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#080e1e] rounded-full"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg lg:text-xl font-extrabold tracking-wide text-white flex items-center gap-1.5 font-serif">
                <span className="gold-gradient-text tracking-wider">SARLAYASH</span>
                <span className="text-amber-300 text-sm font-sans font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  UNIVERSE
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Internal Enterprise ERP • <span className="text-amber-400 font-semibold">Powered By Kapil</span>
            </p>
          </div>
        </div>

        {/* Center Live Clock */}
        <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300 shadow-inner">
          <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="font-semibold text-amber-300 tracking-wider font-mono">{formattedTime}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">{formattedDate}</span>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">IST</span>
        </div>

        {/* Right Action Tools & Fast Persona Switcher */}
        <div className="flex items-center gap-3">
          {/* Quick Punch Button */}
          <button
            onClick={onQuickPunch}
            className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-md ${
              isCheckedIn
                ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60"
                : "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:brightness-110 glow-gold-sm"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{isCheckedIn ? "Checked In (Punch Out)" : "Punch Attendance"}</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {pendingLeavesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce">
                  {pendingLeavesCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0d162d] border border-amber-500/30 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Portal Alerts
                  </h4>
                  <span className="text-[10px] text-slate-400">Live Updates</span>
                </div>
                <div className="space-y-2 text-xs">
                  {pendingLeavesCount > 0 && (
                    <div
                      onClick={() => {
                        setShowNotifications(false);
                        onNavigate("leaves");
                      }}
                      className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-200 cursor-pointer hover:bg-amber-900/40 transition-colors flex items-start gap-2"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">{pendingLeavesCount} Pending Leave Request(s)</p>
                        <p className="text-[11px] text-slate-300">Requires manager review & approval in Leave Desk.</p>
                      </div>
                    </div>
                  )}

                  <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50 text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-white">Daily Attendance Active</p>
                      <p className="text-[11px] text-slate-400">Shift tracking enabled (09:30 AM - 06:30 PM).</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50 text-slate-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-white">SarlaYash Blessings Model</p>
                      <p className="text-[11px] text-slate-400">Internship Earning milestones unlocked for Q4.</p>
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
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-900/90 border border-amber-500/30 hover:border-amber-400 transition-all text-left"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-bold flex items-center justify-center text-sm shadow">
                {currentUser?.avatar || "👤"}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white leading-tight">{currentUser?.name}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
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
              <div className="absolute right-0 mt-2 w-72 bg-[#0c152c] border border-amber-500/30 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-slate-800 mb-2">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-amber-400">
                    Switch Active Persona (Instant Demo)
                  </p>
                  <p className="text-[11px] text-slate-400">Test Individual Dashboard vs Admin Portal</p>
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
                            ? "bg-amber-500/20 border border-amber-500/40 text-amber-200 font-bold"
                            : "hover:bg-slate-800/60 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-base">{emp.avatar}</span>
                          <div className="truncate">
                            <p className="font-semibold truncate">{emp.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{emp.designation}</p>
                          </div>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono shrink-0 ml-1">
                          {emp.ecode}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs px-2">
                  <button
                    onClick={resetAllData}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition-colors py-1"
                    title="Reset all dummy records to clean state"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset Data
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onLogout();
                    }}
                    className="flex items-center gap-1 text-rose-400 hover:text-rose-300 font-bold transition-colors py-1"
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
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
            title="Log Out of SarlaYash ERP"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
