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
  X
} from "lucide-react";
import confetti from "canvas-confetti";

export default function LeaveView({
  currentUser,
  leavesList,
  onApplyLeave,
  onUpdateLeaveStatus
}) {
  const isAdmin = currentUser?.role === "super_admin" || currentUser?.role === "admin";
  const [activeTab, setActiveTab] = useState(isAdmin ? "approval-desk" : "apply-leave");
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

    const newLeave = {
      id: `LV-${Date.now()}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      leaveType: leaveType,
      startDate: startDate,
      endDate: endDate,
      daysCount: daysCount,
      duration: duration,
      reason: reason,
      appliedOn: new Date().toISOString().split("T")[0],
      status: "Pending",
      managerName: currentUser.reportsTo,
      managerRemarks: ""
    };

    onApplyLeave(newLeave);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    setActionFeedback("Leave application submitted successfully! It is now pending manager approval.");
    setReason("");
    setShowApplyModal(false);
    setTimeout(() => setActionFeedback(""), 4500);
  };

  const handleApprove = (leaveId) => {
    onUpdateLeaveStatus(leaveId, "Approved", `Approved by ${currentUser.name} (${currentUser.designation}).`);
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
      onUpdateLeaveStatus(leaveId, "Rejected", reason || "Request declined by manager.");
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
            <span className="tracking-tight">Leave Management & Approvals</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Apply, track quotas, and manage team leave requests with workflow transparency
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] text-white font-bold text-xs hover:brightness-110 shadow-lg glow-red-sm transition-all self-start sm:self-auto border border-[#ffd700]/30"
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

      {/* Leave Quota Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0c0c12] border-l-4 border-l-[#ffd700] border border-[#222230] shadow-md">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Casual Leave (CL)</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-white">{currentUser?.leaveBalance?.casual || 12}</span>
            <span className="text-[10px] text-[#ffd700]">Available Days</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Short personal leaves</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0c12] border-l-4 border-l-[#dc2626] border border-[#222230] shadow-md">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sick Leave (SL)</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-white">{currentUser?.leaveBalance?.sick || 10}</span>
            <span className="text-[10px] text-[#fca5a5]">Available Days</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Medical recovery & doctor visits</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0c12] border-l-4 border-l-amber-500 border border-[#222230] shadow-md">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Privilege Leave (PL)</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-white">{currentUser?.leaveBalance?.privilege || 15}</span>
            <span className="text-[10px] text-amber-300">Available Days</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Vacation & planned family travel</p>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1a0a0d] via-[#0c0c12] to-[#08080d] border-l-4 border-l-[#ffd700] border border-[#dc2626]/40 shadow-md">
          <span className="text-[11px] font-bold text-[#ffd700] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#ffd700]" /> Blessings Leave
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-black text-[#ffd700]">{currentUser?.leaveBalance?.blessings || 3}</span>
            <span className="text-[10px] text-amber-300">Special Quota</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Spiritual renewal & social service</p>
        </div>
      </div>

      {/* Tabs Switcher (Admin Approval Desk vs My History) */}
      <div className="flex items-center gap-2 border-b border-[#222230] pb-2">
        {isAdmin && (
          <button
            onClick={() => setActiveTab("approval-desk")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "approval-desk"
                ? "bg-[#dc2626] text-white shadow glow-red-sm border border-[#ffd700]/40"
                : "bg-[#0e0e16] text-slate-400 hover:text-white border border-[#222230]"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#ffd700]" />
            <span>Admin Approval Desk</span>
            {pendingRequests.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#ffd700] text-slate-950 font-black">
                {pendingRequests.length}
              </span>
            )}
          </button>
        )}

        <button
          onClick={() => setActiveTab("my-leaves")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "my-leaves"
              ? "bg-[#dc2626] text-white shadow glow-red-sm border border-[#ffd700]/40"
              : "bg-[#0e0e16] text-slate-400 hover:text-white border border-[#222230]"
          }`}
        >
          <User className="w-4 h-4 text-[#ffd700]" />
          <span>My Leave Applications ({myLeaves.length})</span>
        </button>
      </div>

      {/* ADMIN APPROVAL DESK TAB */}
      {isAdmin && activeTab === "approval-desk" && (
        <div className="p-6 rounded-3xl bg-[#0c0c12] border border-[#222230] space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#222230]">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#ffd700]" />
                <span>Executive Leave Approval Desk</span>
              </h3>
              <p className="text-xs text-slate-400">
                Action pending applications submitted by engineers and staff
              </p>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#08080d] border border-[#222230] text-xs">
              {["Pending", "Approved", "Rejected", "All"].map((f) => (
                <button
                  key={f}
                  onClick={() => setLeaveFilter(f)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    leaveFilter === f
                      ? "bg-[#dc2626] text-white shadow-sm font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {f} {f === "Pending" && `(${pendingRequests.length})`}
                </button>
              ))}
            </div>
          </div>

          {filteredAllRequests.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500 border border-dashed border-[#222230] rounded-2xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-60" />
              <p className="text-sm font-semibold text-slate-300">No leave requests in "{leaveFilter}" category</p>
              <p className="text-[11px] text-slate-500 mt-1">All leave applications are up to date.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAllRequests.map((leave) => {
                const isPending = leave.status === "Pending";
                return (
                  <div
                    key={leave.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isPending
                        ? "bg-[#100a0d] border-[#dc2626]/50 shadow-lg glow-red-sm"
                        : "bg-[#09090e] border-[#222230] text-slate-400"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Left: Applicant details */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{leave.employeeName}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161622] text-[#ffd700] border border-[#222230]">
                            {leave.employeeId}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-[#dc2626]/20 text-[#fca5a5] border border-[#dc2626]/30">
                            {leave.leaveType}
                          </span>
                          <span
                            className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              leave.status === "Approved"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                : leave.status === "Pending"
                                ? "bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/40"
                                : "bg-[#dc2626]/20 text-[#fca5a5] border border-[#dc2626]/40"
                            }`}
                          >
                            {leave.status}
                          </span>
                        </div>

                        <p className="text-xs text-slate-200">
                          <strong className="text-[#ffd700] font-mono">
                            {leave.startDate} to {leave.endDate}
                          </strong>{" "}
                          ({leave.daysCount} day{leave.daysCount > 1 ? "s" : ""}, {leave.duration})
                        </p>

                        <div className="p-2.5 rounded-xl bg-[#050508] border border-[#222230] text-xs text-slate-300">
                          <strong className="text-slate-400 font-medium">Reason: </strong>
                          {leave.reason}
                        </div>

                        {leave.managerRemarks && (
                          <p className="text-[11px] text-[#ffd700]/90 italic">
                            Manager Remarks: "{leave.managerRemarks}"
                          </p>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        {isPending ? (
                          <>
                            <button
                              onClick={() => handleApprove(leave.id)}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                            >
                              <Check className="w-4 h-4" />
                              <span>Approve</span>
                            </button>

                            <button
                              onClick={() => handleReject(leave.id)}
                              className="px-4 py-2 rounded-xl bg-[#161622] hover:bg-[#dc2626]/40 text-[#fca5a5] font-bold text-xs flex items-center gap-1.5 border border-[#dc2626]/40 transition-all"
                            >
                              <X className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-slate-500 font-medium italic">
                            Decided ({leave.status})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* MY LEAVES TAB */}
      {(!isAdmin || activeTab === "my-leaves") && (
        <div className="p-6 rounded-3xl bg-[#0c0c12] border border-[#222230] space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <CalendarCheck2 className="w-5 h-5 text-[#ffd700]" />
                <span>My Submitted Leaves</span>
              </h3>
              <p className="text-xs text-slate-400">Applications and real-time manager approvals</p>
            </div>

            <button
              onClick={() => setShowApplyModal(true)}
              className="text-xs text-[#ffd700] hover:text-yellow-300 font-bold flex items-center gap-1"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span>New Request</span>
            </button>
          </div>

          {myLeaves.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-[#222230] rounded-2xl">
              You haven't submitted any leaves yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#222230] text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-3">Leave Type</th>
                    <th className="py-3 px-3">Date Range</th>
                    <th className="py-3 px-3">Days</th>
                    <th className="py-3 px-3">Reason</th>
                    <th className="py-3 px-3">Reporting Manager</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e2c]">
                  {myLeaves.map((l) => (
                    <tr key={l.id} className="hover:bg-[#12121c]">
                      <td className="py-3 px-3 font-semibold text-white">{l.leaveType}</td>
                      <td className="py-3 px-3 font-mono text-slate-300">
                        {l.startDate} → {l.endDate}
                      </td>
                      <td className="py-3 px-3">{l.daysCount} day ({l.duration})</td>
                      <td className="py-3 px-3 text-slate-300 max-w-xs truncate">{l.reason}</td>
                      <td className="py-3 px-3 text-slate-400">{l.managerName}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            l.status === "Approved"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : l.status === "Pending"
                              ? "bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/30"
                              : "bg-[#dc2626]/20 text-[#fca5a5] border border-[#dc2626]/30"
                          }`}
                        >
                          {l.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px] italic">
                        {l.managerRemarks || "Pending decision"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Apply Leave Modal Form */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl rounded-3xl bg-[#09090e] border-2 border-[#ffd700]/40 p-6 shadow-2xl space-y-5 glow-red-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#dc2626]/20 text-[#ffd700] border border-[#dc2626]/30">
                  <CalendarPlus className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-white">Apply For Company Leave</h3>
                  <p className="text-xs text-slate-400">Applicant: {currentUser?.name} ({currentUser?.ecode})</p>
                </div>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#161622]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitLeave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Leave Category</label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  >
                    <option value="Parental Care Leave">Parental Care Leave (Care Model)</option>
                    <option value="Exam Leave">Exam Leave (Academic)</option>
                    <option value="Female No-Question Leave">Female No-Question Leave (Monthly Cycles)</option>
                    <option value="Sick Leave">Sick Leave (SL)</option>
                    <option value="SarlaYash Blessings Leave">SarlaYash Blessings Leave (Spiritual / Renewal)</option>
                    <option value="Casual Leave">Casual Leave (CL)</option>
                    <option value="Privilege Leave">Privilege Leave (PL)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  >
                    <option value="Full Day">Full Day</option>
                    <option value="First Half">First Half (Morning Session)</option>
                    <option value="Second Half">Second Half (Afternoon Session)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                    required
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0e0e16] border border-[#ffd700]/30 flex items-center justify-between text-[#ffd700]">
                <span>Calculated Days:</span>
                <span className="font-bold text-sm text-[#ffd700] font-mono">
                  {daysCount} Day{daysCount > 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Detailed Reason for Absence</label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please describe why leave is required and work coverage arrangements..."
                  className="w-full p-3 rounded-xl bg-[#050508] border border-[#2a2a38] text-white placeholder-slate-500 focus:outline-none focus:border-[#ffd700]"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-[#08080d] border border-[#222230] text-[11px] text-slate-400">
                <span>Reporting Manager: </span>
                <strong className="text-white">{currentUser?.reportsTo}</strong>
                <p className="mt-0.5">Notification will be instantly routed to manager desk.</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#222230]">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#161622] hover:bg-[#1e1e2c] text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-bold shadow-lg glow-red-sm flex items-center gap-2 border border-[#ffd700]/30"
                >
                  <Send className="w-4 h-4 text-[#ffd700]" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
