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
  Shield,
  Check,
  Trash2,
  Lock
} from "lucide-react";
import { resetAllData } from "../utils/storage";

export default function Navbar({
  currentUser,
  employees,
  onSwitchUser,
  todayAttendance,
  onQuickPunch,
  pendingLeavesCount,
  pendingCorrectionsCount = 0,
  notifications = [],
  onMarkNotificationRead,
  onClearNotifications,
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
  const isSuperAdmin = currentUser?.role === "super_admin" || currentUser?.id === "SYM001";

  // Filter notifications relevant to current user
  const userNotifications = notifications.filter(
    (n) =>
      n.recipientId === "all" ||
      (isSuperAdmin && n.recipientId === "super_admin") ||
      n.recipientId === currentUser?.id ||
      n.recipientId === currentUser?.ecode
  );

  const unreadCount = userNotifications.filter((n) => !n.isRead).length;

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

        {/* Right Action Tools */}
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

          {/* Real-Time Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-[#111118] border border-[#2a2a38] text-slate-300 hover:text-[#ffd700] hover:border-[#ffd700]/50 transition-colors"
              title="Real-Time Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#dc2626] text-white font-extrabold text-[10px] rounded-full flex items-center justify-center animate-bounce shadow">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0d0d14] border border-[#ffd700]/30 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#222230] mb-2.5">
                  <h4 className="text-xs font-bold text-[#ffd700] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" /> Real-Time Alerts
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onClearNotifications && onClearNotifications()}
                      className="text-[10px] text-slate-400 hover:text-red-400 flex items-center gap-1"
                      title="Clear notifications"
                    >
                      <Trash2 className="w-3 h-3" /> Clear
                    </button>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto space-y-2 text-xs pr-1">
                  {isSuperAdmin && (pendingLeavesCount > 0 || pendingCorrectionsCount > 0) && (
                    <div
                      onClick={() => {
                        setShowNotifications(false);
                        onNavigate(pendingLeavesCount > 0 ? "leaves" : "attendance");
                      }}
                      className="p-3 rounded-xl bg-[#2a1012] border border-[#dc2626]/50 text-red-200 cursor-pointer hover:bg-[#3d1417] transition-colors flex items-start gap-2.5"
                    >
                      <AlertTriangle className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white">Super Admin Approvals Pending</p>
                        <p className="text-[11px] text-slate-300">
                          {pendingLeavesCount} leave application(s) • {pendingCorrectionsCount} punch correction(s)
                        </p>
                      </div>
                    </div>
                  )}

                  {userNotifications.length === 0 ? (
                    <div className="p-4 text-center text-slate-400 text-xs">
                      No notifications yet. Real-time alerts will appear here.
                    </div>
                  ) : (
                    userNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          onMarkNotificationRead && onMarkNotificationRead(notif.id);
                        }}
                        className={`p-3 rounded-xl border transition-colors flex items-start gap-2.5 cursor-pointer ${
                          notif.isRead
                            ? "bg-[#111118] border-[#222230] text-slate-400"
                            : "bg-[#16121e] border-[#ffd700]/30 text-slate-200"
                        }`}
                      >
                        <div className="p-1 rounded bg-[#09090e] text-[#ffd700] shrink-0 mt-0.5">
                          {notif.type === "leave" ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-[#ffd700]" />
                          ) : notif.type === "correction" ? (
                            <Clock className="w-3.5 h-3.5 text-[#dc2626]" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-xs truncate">{notif.title}</p>
                          <p className="text-[11px] text-slate-300 leading-snug mt-0.5">{notif.message}</p>
                          <p className="text-[9px] text-slate-500 mt-1 font-mono">
                            {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#dc2626] shrink-0 mt-1"></span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill & Secure Menu */}
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

            {/* Profile Dropdown */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-[#09090f] border border-[#ffd700]/30 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-2">
                <div className="p-3 rounded-xl bg-[#121218] border border-[#222230]">
                  <p className="font-bold text-white text-sm">{currentUser?.name}</p>
                  <p className="text-xs text-[#ffd700] font-mono mt-0.5">{currentUser?.ecode} • {currentUser?.designation}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{currentUser?.email}</p>
                  {isSuperAdmin && (
                    <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#dc2626]/20 text-[#ffd700] border border-[#dc2626]/40 text-[10px] font-bold uppercase">
                      👑 Super Admin Access Active
                    </span>
                  )}
                </div>

                {/* If Super Admin Kapil, allow auditing/switching personas */}
                {isSuperAdmin && (
                  <div className="pt-2 border-t border-[#222230]">
                    <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#ffd700] mb-1.5 flex items-center gap-1">
                      <Shield className="w-3 h-3 text-[#dc2626]" /> Super Admin User Inspection:
                    </p>
                    <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                      {employees.map((emp) => (
                        <button
                          key={emp.id}
                          onClick={() => {
                            onSwitchUser(emp.id);
                            setShowUserDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between p-1.5 px-2 rounded-lg text-left text-xs transition-colors ${
                            emp.id === currentUser?.id
                              ? "bg-[#dc2626]/20 text-[#ffd700] font-bold"
                              : "hover:bg-[#161622] text-slate-300"
                          }`}
                        >
                          <span className="truncate">{emp.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">{emp.ecode}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-[#222230] space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 p-2 rounded-xl bg-[#dc2626]/20 hover:bg-[#dc2626]/30 text-[#fca5a5] font-bold transition-colors border border-[#dc2626]/40"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out from Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
