import React, { useState } from "react";
import {
  CalendarCheck2,
  CalendarPlus,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Send,
  Sparkles,
  Filter,
  User,
  ShieldCheck,
  Check,
  X,
  Shield
} from "lucide-react";
import confetti from "canvas-confetti";

export default function LeaveView({
  currentUser,
  leavesList,
  onApplyLeave,
  onUpdateLeaveStatus
}) {
  const isSuperAdmin = currentUser?.role === "super_admin" || currentUser?.id === "SYM001";
  const [activeTab, setActiveTab] = useState(isSuperAdmin ? "approval-desk" : "my-leaves");
  const [leaveFilter, setLeaveFilter] = useState("Pending");

  // Form state
  const [leaveType, setLeaveType] = useState("Casual Leave");
  const [startDate, setStartDate] = useState("2026-11-20");
  const [endDate, setEndDate] = useState("2026-11-21");
  const [duration, setDuration] = useState("Full Day");
  const [reason, setReason] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [actionFeedback, setActionFeedback] = useState("");

  // Calculate day count
  const calculateDays = (start, end, dur) => {
    if (!start || !end) return 1;
    const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
    if (diff < 0) return 0;
    const days = Math.round(diff) + 1;
    return dur.includes("Half") ? 0.5 : days;
  };

  const daysCount = calculateDays(startDate, endDate, duration);

  const handleSubmitLeave = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert("Please provide a valid reason for applying leave.");
      return;
    }

    if (startDate < "2026-11-01") {
      alert("Leave cannot be applied for past dates before 01 November 2026.");
      return;
    }

    const newLeave = {
      id: `LV-${Date.now()}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      employeeEcode: currentUser.ecode,
      leaveType: leaveType,
      startDate: startDate,
      endDate: endDate,
      daysCount: daysCount,
      duration: duration,
      reason: reason,
      appliedOn: "2026-11-16",
      status: "Pending", // Pending, Approved, Rejected
      managerName: "Founder Kapil Narula",
      managerRemarks: ""
    };

    onApplyLeave(newLeave);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    setActionFeedback("Leave application submitted successfully! It is now pending Founder Kapil's approval.");
    setReason("");
    setShowApplyModal(false);
    setTimeout(() => setActionFeedback(""), 4500);
  };

  const handleApprove = (leaveId) => {
    onUpdateLeaveStatus(leaveId, "Approved", `Approved by Founder Kapil Narula with SarlaYash Blessings.`);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setActionFeedback("Leave request approved successfully!");
    setTimeout(() => setActionFeedback(""), 4000);
  };

  const handleReject = (leaveId) => {
    const reason = prompt("Enter remark / reason for declining leave request:", "Operational exigencies; please reschedule.");
    if (reason !== null) {
      onUpdateLeaveStatus(leaveId, "Rejected", reason || "Request declined by Founder.");
      setActionFeedback("Leave request has been declined.");
      setTimeout(() => setActionFeedback(""), 4000);
    }
  };

  // Leaves lists
  const myLeaves = leavesList.filter((l) => l.employeeId === currentUser.id);
  const pendingRequests = leavesList.filter((l) => l.status === "Pending");
  const filteredAllRequests = leavesList.filter((l) => {
    if (leaveFilter === "All") return true;
    return l.status === leaveFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222230]">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2">
            <CalendarCheck2 className="w-6 h-6 text-[#ffd700]" />
            <span className="tracking-tight">
              {isSuperAdmin ? "Executive Leave Approvals Desk & Quotas" : "My Leave Quota & Application"}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Empathetic Care Model • Parental Care, Exam, Sick, Female No-Question Leave & Blessings Leave
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-bold text-xs shadow-lg glow-red transition-all self-start sm:self-auto border border-[#ffd700]/30"
        >
          <CalendarPlus className="w-4 h-4 text-[#ffd700]" />
          <span>Apply For Leave</span>
        </button>
      </div>

      {actionFeedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* 4 Leave Quota Balance Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#09090e] border border-[#ffd700]/25 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Casual Leave (CL)</span>
            <span className="p-1.5 rounded-lg bg-[#ffd700]/15 text-[#ffd700]">
              <Clock className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-2xl font-black text-white mt-2 font-mono">
            {currentUser?.leaveBalance?.casual || 10} <span className="text-xs text-slate-400 font-normal">Days</span>
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Personal & urgent affairs</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#09090e] border border-[#dc2626]/30 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Sick Leave (SL)</span>
            <span className="p-1.5 rounded-lg bg-[#dc2626]/20 text-[#fca5a5]">
              <AlertTriangle className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-2xl font-black text-white mt-2 font-mono">
            {currentUser?.leaveBalance?.sick || 8} <span className="text-xs text-slate-400 font-normal">Days</span>
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Medical recovery & health</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#09090e] border border-[#ffd700]/25 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Privilege Leave (PL)</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
              <CalendarCheck2 className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-2xl font-black text-white mt-2 font-mono">
            {currentUser?.leaveBalance?.privilege || 12} <span className="text-xs text-slate-400 font-normal">Days</span>
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Earned annual vacation</p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1c0c0e] to-[#0c0c12] border border-[#ffd700]/40 shadow-xl glow-red-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#ffd700] font-bold uppercase tracking-wider">Blessings Leave</span>
            <span className="p-1.5 rounded-lg bg-[#ffd700]/20 text-[#ffd700]">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-2xl font-black text-[#ffd700] mt-2 font-mono">
            {currentUser?.leaveBalance?.blessings || 5} <span className="text-xs text-amber-200 font-normal">Days</span>
          </p>
          <p className="text-[10px] text-slate-300 mt-1">Spiritual retreat & care</p>
        </div>
      </div>

      {/* SUPER ADMIN APPROVAL DESK (Visible ONLY to Founder Kapil Narula) */}
      {isSuperAdmin && (
        <div className="rounded-3xl bg-[#0c0c12] border-2 border-[#ffd700]/40 p-6 space-y-4 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#222230]">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#ffd700]" />
                <h3 className="font-bold text-base text-white">Founder Leave Approvals Desk</h3>
                {pendingRequests.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#dc2626] text-white text-[10px] font-bold">
                    {pendingRequests.length} Pending
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">Founder master authority to review and approve employee leave requests</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter:</span>
              {["Pending", "Approved", "Rejected", "All"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setLeaveFilter(tab)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    leaveFilter === tab
                      ? "bg-[#dc2626] text-white"
                      : "bg-[#14141e] text-slate-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {filteredAllRequests.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-[#222230] rounded-2xl">
              No leave applications matching status "{leaveFilter}". When employees apply, their requests appear here for Founder action.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#222230] text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-3">Employee</th>
                    <th className="py-2.5 px-3">Leave Type</th>
                    <th className="py-2.5 px-3">Dates & Days</th>
                    <th className="py-2.5 px-3">Reason</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Founder Decision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e2c]">
                  {filteredAllRequests.map((l) => (
                    <tr key={l.id} className="hover:bg-[#12121c] transition-colors">
                      <td className="py-3 px-3">
                        <p className="font-bold text-white">{l.employeeName}</p>
                        <p className="text-[10px] text-[#ffd700] font-mono">{l.employeeEcode || l.employeeId}</p>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-300">{l.leaveType}</td>
                      <td className="py-3 px-3">
                        <p className="font-mono text-white">{l.startDate} → {l.endDate}</p>
                        <p className="text-[10px] text-slate-400">{l.daysCount} Day(s) • {l.duration}</p>
                      </td>
                      <td className="py-3 px-3 text-slate-300 max-w-xs">{l.reason}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          l.status === "Approved"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : l.status === "Rejected"
                            ? "bg-red-500/20 text-red-300 border border-red-500/40"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {l.status === "Pending" ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleApprove(l.id)}
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(l.id)}
                              className="px-3 py-1 rounded-lg bg-[#dc2626] hover:bg-red-600 text-white font-bold text-[11px] shadow flex items-center gap-1"
                            >
                              <X className="w-3 h-3" /> Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-500 italic">
                            {l.managerRemarks || "Processed"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* INDIVIDUAL LEAVE HISTORY (Current User Only) */}
      <div className="rounded-3xl bg-[#0c0c12] border border-[#222230] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
          <div>
            <h3 className="font-bold text-base text-white">My Leave Application History</h3>
            <p className="text-xs text-slate-400">Authenticated records for {currentUser?.name}</p>
          </div>
          <span className="text-xs font-mono text-[#ffd700] bg-[#14141e] px-3 py-1 rounded-xl border border-[#2a2a38]">
            {myLeaves.length} Application(s)
          </span>
        </div>

        {myLeaves.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-[#222230] rounded-2xl">
            You haven't submitted any leave applications yet. Use "Apply For Leave" whenever needed!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#222230] text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Leave Type</th>
                  <th className="py-2.5 px-3">Dates</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Reason</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Founder Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e2c]">
                {myLeaves.map((l) => (
                  <tr key={l.id} className="hover:bg-[#12121c] transition-colors">
                    <td className="py-3 px-3 font-semibold text-white">{l.leaveType}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{l.startDate} → {l.endDate}</td>
                    <td className="py-3 px-3 text-slate-400">{l.daysCount} Day(s) ({l.duration})</td>
                    <td className="py-3 px-3 text-slate-300 max-w-xs">{l.reason}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        l.status === "Approved"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : l.status === "Rejected"
                          ? "bg-red-500/20 text-red-300 border border-red-500/40"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      }`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 italic">{l.managerRemarks || "Pending review"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* APPLY LEAVE MODAL */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#09090e] border-2 border-[#ffd700]/50 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
              <div className="flex items-center gap-2">
                <CalendarPlus className="w-5 h-5 text-[#ffd700]" />
                <h3 className="font-bold text-base text-white">Apply For Leave</h3>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitLeave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Select Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                >
                  <option value="Casual Leave">Casual Leave (CL)</option>
                  <option value="Sick Leave">Sick Leave (SL)</option>
                  <option value="Privilege Leave">Privilege Leave (PL)</option>
                  <option value="SarlaYash Blessings Leave">SarlaYash Blessings Leave (Spiritual / Wellness)</option>
                  <option value="Parental Care Leave">Parental Care Leave</option>
                  <option value="Exam Leave">Exam Preparation Leave</option>
                  <option value="Female No-Question Leave">Female No-Question Monthly Cycle Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">From Date</label>
                  <input
                    type="date"
                    min="2026-11-01"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">To Date</label>
                  <input
                    type="date"
                    min={startDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Duration</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Full Day", "First Half", "Second Half"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        duration === d
                          ? "bg-[#dc2626]/20 border-[#dc2626] text-white font-bold"
                          : "bg-[#050508] border-[#2a2a38] text-slate-400"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Reason / Handover Note</label>
                <textarea
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please state purpose of leave..."
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-[#ffd700]">Total: {daysCount} Working Day(s)</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2 rounded-xl bg-[#14141e] text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-bold flex items-center gap-1.5 shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit to Founder
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
