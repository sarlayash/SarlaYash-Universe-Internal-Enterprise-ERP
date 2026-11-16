import React, { useState } from "react";
import {
  CheckSquare,
  Plus,
  Clock,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Users,
  Search,
  Filter,
  Check,
  X,
  Shield
} from "lucide-react";
import confetti from "canvas-confetti";

export default function DailyTasksView({
  tasksList,
  currentUser,
  employees,
  onAddTask,
  onUpdateTaskStatus
}) {
  const isSuperAdmin = currentUser?.role === "super_admin" || currentUser?.id === "SYM001";
  const [activeTab, setActiveTab] = useState(isSuperAdmin ? "team-tasks" : "my-tasks");
  const [showAddModal, setShowAddModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Form state
  const [taskTitle, setTaskTitle] = useState("");
  const [channel, setChannel] = useState(currentUser?.assignedChannels?.[0] || "SarlaYash Mission");
  const [category, setCategory] = useState("Daily Deliverables");
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("Completed");
  const [hoursSpent, setHoursSpent] = useState("4.0");
  const [deliverables, setDeliverables] = useState("");
  const [proofUrl, setProofUrl] = useState("");

  // Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const myTasks = tasksList.filter(
    (t) => t.employeeId === currentUser?.id || t.employeeEcode === currentUser?.ecode
  );

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim() || !deliverables.trim()) {
      alert("Please provide both task title and deliverables summary.");
      return;
    }

    const newTask = {
      id: `TSK-${Date.now()}`,
      employeeId: currentUser.id,
      employeeEcode: currentUser.ecode,
      title: taskTitle,
      channel: channel,
      category: category,
      priority: priority,
      status: status,
      dueDate: "2026-11-16",
      deliverables: deliverables,
      hoursSpent: parseFloat(hoursSpent) || 3.0,
      proofUrl: proofUrl || ""
    };

    onAddTask(newTask);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setFeedback(`Daily deliverable "${taskTitle}" submitted successfully!`);
    setShowAddModal(false);
    setTaskTitle("");
    setDeliverables("");
    setProofUrl("");
    setTimeout(() => setFeedback(""), 4500);
  };

  const handleMarkComplete = (taskId) => {
    onUpdateTaskStatus(taskId, "Completed");
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 }
    });
    setFeedback("Task marked as Completed!");
    setTimeout(() => setFeedback(""), 3500);
  };

  // Filter team tasks (Super Admin)
  const filteredTeamTasks = tasksList.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.employeeEcode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222230]">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-[#ffd700]" />
            <span className="tracking-tight">
              {isSuperAdmin ? "Company Deliverables & Task Master" : "My Daily Tasks & Deliverables Log"}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track daily hours, content milestones, proof links, and engineering deliverables
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-bold text-xs shadow-lg glow-red transition-all self-start sm:self-auto border border-[#ffd700]/30"
        >
          <Plus className="w-4 h-4 text-[#ffd700]" />
          <span>Submit Today's Task Log</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* SUPER ADMIN: Team Review vs My Tasks Toggle */}
      {isSuperAdmin && (
        <div className="flex items-center gap-2 bg-[#0c0c12] p-1.5 rounded-2xl border border-[#222230] w-fit">
          <button
            onClick={() => setActiveTab("team-tasks")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "team-tasks"
                ? "bg-[#dc2626] text-white shadow-md glow-red-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Founder Team Review Desk ({tasksList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("my-tasks")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "my-tasks"
                ? "bg-[#dc2626] text-white shadow-md glow-red-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>My Personal Tasks ({myTasks.length})</span>
          </button>
        </div>
      )}

      {/* SUPER ADMIN TEAM REVIEW TABLE */}
      {isSuperAdmin && activeTab === "team-tasks" ? (
        <div className="rounded-3xl bg-[#0c0c12] border-2 border-[#ffd700]/40 p-6 space-y-4 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#222230]">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ffd700]" />
                <span>All Team Deliverables & Hours Review</span>
              </h3>
              <p className="text-xs text-slate-400">Real-time submissions across all 10 SarlaYash members</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search deliverables..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-[#08080d] border border-[#2a2a38] text-xs text-white focus:outline-none focus:border-[#ffd700] w-48"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#08080d] border border-[#2a2a38] text-xs text-white focus:outline-none focus:border-[#ffd700]"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Under Review">Under Review</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#222230] text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Engineer</th>
                  <th className="py-2.5 px-3">Channel / Domain</th>
                  <th className="py-2.5 px-3">Task Title & Deliverables</th>
                  <th className="py-2.5 px-3">Hours</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Verification Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e2c]">
                {filteredTeamTasks.map((t) => {
                  const emp = employees.find((e) => e.ecode === t.employeeEcode || e.id === t.employeeId);
                  return (
                    <tr key={t.id} className="hover:bg-[#12121c] transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{emp?.avatar || "👤"}</span>
                          <div>
                            <p className="font-bold text-white">{emp?.name || t.employeeEcode}</p>
                            <p className="text-[10px] text-[#ffd700] font-mono">{t.employeeEcode}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-[#181824] text-[#ffd700] border border-[#2b2b3a] text-[10px] font-semibold">
                          {t.channel}
                        </span>
                      </td>
                      <td className="py-3 px-3 max-w-sm">
                        <p className="font-bold text-white">{t.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{t.deliverables}</p>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-amber-300">
                        {t.hoursSpent} hrs
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.status === "Completed"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {t.proofUrl ? (
                          <a
                            href={t.proofUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-[#ffd700] hover:underline"
                          >
                            <span>Inspect Proof</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-slate-600 text-[10px] italic">No proof link</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* INDIVIDUAL TASKS TABLE (Current User Only) */
        <div className="rounded-3xl bg-[#0c0c12] border border-[#222230] p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
            <div>
              <h3 className="font-bold text-base text-white">My Submitted Daily Worklogs</h3>
              <p className="text-xs text-slate-400">Authenticated logs for {currentUser?.name} ({currentUser?.ecode})</p>
            </div>
            <span className="text-xs font-mono text-[#ffd700] bg-[#14141e] px-3 py-1 rounded-xl border border-[#2a2a38]">
              {myTasks.length} Logged Tasks
            </span>
          </div>

          {myTasks.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-[#222230] rounded-2xl">
              No tasks logged yet today. Click "Submit Today's Task Log" above to record your accomplishments!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#222230] text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Channel / Domain</th>
                    <th className="py-2.5 px-3">Task Title & Deliverables</th>
                    <th className="py-2.5 px-3">Hours</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e2c]">
                  {myTasks.map((t) => (
                    <tr key={t.id} className="hover:bg-[#12121c] transition-colors">
                      <td className="py-3 px-3 font-mono text-slate-400">{t.dueDate || "2026-11-16"}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-[#181824] text-[#ffd700] border border-[#2b2b3a] text-[10px]">
                          {t.channel}
                        </span>
                      </td>
                      <td className="py-3 px-3 max-w-sm">
                        <p className="font-bold text-white">{t.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{t.deliverables}</p>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-amber-300">{t.hoursSpent} hrs</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.status === "Completed"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {t.status !== "Completed" && (
                          <button
                            onClick={() => handleMarkComplete(t.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 font-bold text-[10px] border border-emerald-500/40"
                          >
                            Mark Done
                          </button>
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

      {/* ADD TASK MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#09090e] border-2 border-[#ffd700]/50 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#ffd700]" />
                <h3 className="font-bold text-base text-white">Submit Daily Task & Deliverable</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Task Title / Activity Summary</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Published AI Ladder Episode 14 on YouTube..."
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Channel / Focus Area</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  >
                    {currentUser?.assignedChannels?.map((ch) => (
                      <option key={ch} value={ch}>{ch}</option>
                    ))}
                    <option value="General Engineering">General Engineering</option>
                    <option value="SarlaYash Mission">SarlaYash Mission</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Hours Invested</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="16"
                    value={hoursSpent}
                    onChange={(e) => setHoursSpent(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700] font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Detailed Deliverables & Accomplishment Notes</label>
                <textarea
                  rows="3"
                  value={deliverables}
                  onChange={(e) => setDeliverables(e.target.value)}
                  placeholder="Specify key deliverables, videos uploaded, lines of code, problems solved..."
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  required
                ></textarea>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Proof URL / GitHub / Post Link (Optional)</label>
                <input
                  type="url"
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#14141e] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-bold flex items-center gap-1.5 shadow-lg"
                >
                  <Plus className="w-4 h-4" /> Log Deliverable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
