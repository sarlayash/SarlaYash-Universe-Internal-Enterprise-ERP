import React, { useState } from "react";
import {
  LayoutDashboard,
  Clock,
  CheckSquare,
  CalendarCheck2,
  Menu,
  X,
  Radio,
  Calendar,
  Users,
  Globe2,
  Award,
  FileText,
  Shield,
  Download,
  LogOut,
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
  currentUser,
  pendingLeavesCount,
  pendingCorrectionsCount,
  broadcastsCount,
  todayAttendance,
  onQuickPunch,
  onInstallApp,
  canInstall,
  onLogout
}) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const isSuperAdmin = currentUser?.role === "super_admin" || currentUser?.id === "SYM001";
  const isCheckedIn = !!todayAttendance?.checkIn && !todayAttendance?.checkOut;

  const triggerHaptic = () => {
    try {
      if (navigator.vibrate) {
        navigator.vibrate(15);
      }
    } catch (e) {
      // Ignore vibration error
    }
  };

  const handleTabSelect = (tab) => {
    triggerHaptic();
    setActiveTab(tab);
    setShowMoreMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Fixed Sleek Mobile Bottom Navigation Bar (Visible only on mobile/tablet screens < lg) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#08080d]/95 backdrop-blur-2xl border-t border-[#ffd700]/30 shadow-2xl px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-around">
          {/* Dashboard */}
          <button
            onClick={() => handleTabSelect("dashboard")}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative ${
              activeTab === "dashboard"
                ? "text-[#ffd700] font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <div className={`p-1 rounded-xl transition-all ${activeTab === "dashboard" ? "bg-[#dc2626]/20 text-[#ffd700]" : ""}`}>
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
            {activeTab === "dashboard" && (
              <span className="absolute -top-1 w-5 h-0.5 bg-[#ffd700] rounded-full shadow-[0_0_8px_#ffd700]"></span>
            )}
          </button>

          {/* Punch Terminal */}
          <button
            onClick={() => handleTabSelect("attendance")}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative ${
              activeTab === "attendance"
                ? "text-[#ffd700] font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <div className={`p-1 rounded-xl transition-all relative ${activeTab === "attendance" ? "bg-[#dc2626]/20 text-[#ffd700]" : ""}`}>
              <Clock className="w-5 h-5" />
              {isCheckedIn && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">Punch</span>
            {activeTab === "attendance" && (
              <span className="absolute -top-1 w-5 h-0.5 bg-[#ffd700] rounded-full shadow-[0_0_8px_#ffd700]"></span>
            )}
          </button>

          {/* Center Floating Quick Punch Pulse Action */}
          <button
            onClick={() => {
              triggerHaptic();
              onQuickPunch();
            }}
            className={`-mt-5 p-3 rounded-2xl shadow-2xl border flex items-center justify-center transition-transform active:scale-90 ${
              isCheckedIn
                ? "bg-gradient-to-tr from-[#991b1b] to-[#dc2626] text-white border-red-400/50 glow-red-sm"
                : "bg-gradient-to-tr from-[#dc2626] via-[#b91c1c] to-[#ffd700]/90 text-white border-[#ffd700]/60 glow-red"
            }`}
            title={isCheckedIn ? "Clock Out" : "Clock In"}
          >
            <Clock className="w-6 h-6 drop-shadow" />
          </button>

          {/* Daily Tasks */}
          <button
            onClick={() => handleTabSelect("tasks")}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative ${
              activeTab === "tasks"
                ? "text-[#ffd700] font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <div className={`p-1 rounded-xl transition-all ${activeTab === "tasks" ? "bg-[#dc2626]/20 text-[#ffd700]" : ""}`}>
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">Tasks</span>
            {activeTab === "tasks" && (
              <span className="absolute -top-1 w-5 h-0.5 bg-[#ffd700] rounded-full shadow-[0_0_8px_#ffd700]"></span>
            )}
          </button>

          {/* More Menu Drawer Trigger */}
          <button
            onClick={() => {
              triggerHaptic();
              setShowMoreMenu(true);
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative ${
              showMoreMenu || !["dashboard", "attendance", "tasks"].includes(activeTab)
                ? "text-[#ffd700] font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <div className="p-1 rounded-xl relative">
              <Menu className="w-5 h-5" />
              {(pendingLeavesCount > 0 || pendingCorrectionsCount > 0) && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#dc2626]"></span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">More</span>
          </button>
        </div>
      </nav>

      {/* Elegant Mobile Bottom Sheet / Slide-Over Menu */}
      {showMoreMenu && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/85 backdrop-blur-md animate-in fade-in">
          <div
            className="w-full bg-[#0b0b12] border-t-2 border-[#ffd700]/40 rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300"
          >
            {/* Sheet Handle & Header */}
            <div className="p-4 pb-2 border-b border-[#222230] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-[#dc2626] to-[#ffd700] shadow">
                  <img src="./sarlayash_logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-white text-sm gold-gradient-text">
                    SarlaYash Enterprise Suite
                  </h3>
                  <p className="text-[10px] text-slate-400">{currentUser?.name} • {currentUser?.ecode}</p>
                </div>
              </div>

              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-2 rounded-xl bg-[#14141e] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Options */}
            <div className="p-4 space-y-2 overflow-y-auto max-h-[60vh] text-xs">
              {/* Install PWA Prompt inside menu if available */}
              {canInstall && (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-[#dc2626]/30 via-[#ffd700]/20 to-[#dc2626]/20 border border-[#ffd700]/40 flex items-center justify-between gap-3 shadow-lg mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#dc2626] text-white">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs">Install Mobile App</p>
                      <p className="text-[10px] text-slate-300">Fast 1-tap offline home screen access</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      onInstallApp();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#ffd700] text-black font-black text-[11px] shadow hover:brightness-110 shrink-0"
                  >
                    Install Now
                  </button>
                </div>
              )}

              <p className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider px-1">
                Enterprise Modules
              </p>

              {/* Leaves */}
              <button
                onClick={() => handleTabSelect("leaves")}
                className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                  activeTab === "leaves" ? "bg-[#dc2626]/20 border border-[#dc2626] text-[#ffd700] font-bold" : "bg-[#101018] border border-[#1e1e2c] text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CalendarCheck2 className="w-4 h-4 text-[#dc2626]" />
                  <span>Leave Management</span>
                </div>
                {pendingLeavesCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#dc2626] text-white text-[10px] font-bold">
                    {pendingLeavesCount}
                  </span>
                )}
              </button>

              {/* Broadcasts & Sessions */}
              <button
                onClick={() => handleTabSelect("broadcasts")}
                className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                  activeTab === "broadcasts" ? "bg-[#dc2626]/20 border border-[#dc2626] text-[#ffd700] font-bold" : "bg-[#101018] border border-[#1e1e2c] text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Radio className="w-4 h-4 text-[#ffd700]" />
                  <span>Broadcasts & Sessions</span>
                </div>
                {broadcastsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#181824] text-[#ffd700] border border-[#2a2a38] text-[10px] font-mono">
                    {broadcastsCount} Active
                  </span>
                )}
              </button>

              {/* Earning Model */}
              <button
                onClick={() => handleTabSelect("earning-model")}
                className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                  activeTab === "earning-model" ? "bg-[#dc2626]/20 border border-[#dc2626] text-[#ffd700] font-bold" : "bg-[#101018] border border-[#1e1e2c] text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-[#ffd700]" />
                  <span>Blessings Internships Slabs</span>
                </div>
                <span className="text-[10px] text-[#ffd700] font-bold">₹1k–₹15k</span>
              </button>

              {/* Ecosystem Channels */}
              <button
                onClick={() => handleTabSelect("channels")}
                className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                  activeTab === "channels" ? "bg-[#dc2626]/20 border border-[#dc2626] text-[#ffd700] font-bold" : "bg-[#101018] border border-[#1e1e2c] text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Globe2 className="w-4 h-4 text-[#dc2626]" />
                  <span>Ecosystem Channels (18)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Calendar */}
              <button
                onClick={() => handleTabSelect("calendar")}
                className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                  activeTab === "calendar" ? "bg-[#dc2626]/20 border border-[#dc2626] text-[#ffd700] font-bold" : "bg-[#101018] border border-[#1e1e2c] text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#ffd700]" />
                  <span>Official Calendar</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Org Hierarchy */}
              <button
                onClick={() => handleTabSelect("org")}
                className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                  activeTab === "org" ? "bg-[#dc2626]/20 border border-[#dc2626] text-[#ffd700] font-bold" : "bg-[#101018] border border-[#1e1e2c] text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#dc2626]" />
                  <span>Executive Hierarchy</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Payslip */}
              <button
                onClick={() => handleTabSelect("payslip")}
                className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                  activeTab === "payslip" ? "bg-[#dc2626]/20 border border-[#dc2626] text-[#ffd700] font-bold" : "bg-[#101018] border border-[#1e1e2c] text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#ffd700]" />
                  <span>My Monthly Payslip</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Policies & POSH */}
              <button
                onClick={() => handleTabSelect("policies")}
                className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all ${
                  activeTab === "policies" ? "bg-[#dc2626]/20 border border-[#dc2626] text-[#ffd700] font-bold" : "bg-[#101018] border border-[#1e1e2c] text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-[#dc2626]" />
                  <span>Company Policies & POSH</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Logout Option */}
              <div className="pt-2 border-t border-[#1e1e2c]">
                <button
                  onClick={() => {
                    setShowMoreMenu(false);
                    onLogout();
                  }}
                  className="w-full p-3 rounded-2xl bg-red-950/20 hover:bg-red-950/40 border border-red-500/30 text-red-400 font-bold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout from Session</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
