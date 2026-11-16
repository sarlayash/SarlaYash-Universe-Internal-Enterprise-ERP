import React, { useState } from "react";
import {
  Award,
  Sparkles,
  Target,
  Zap,
  CheckCircle2,
  Trophy,
  Plus,
  ExternalLink,
  Flame,
  Star,
  FileCheck2,
  X
} from "lucide-react";
import confetti from "canvas-confetti";

export default function EarningModelView({
  earningTargets,
  currentUser,
  employees,
  onAddTarget,
  onUpdateTargetProgress
}) {
  const isAdmin = currentUser?.role === "super_admin" || currentUser?.role === "admin";
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [targetTitle, setTargetTitle] = useState("");
  const [category, setCategory] = useState("Channel Growth & EdTech Impact");
  const [targetImpactMetric, setTargetImpactMetric] = useState("");
  const [targetValue, setTargetValue] = useState(100);
  const [unit, setUnit] = useState("Units");
  const [rewardTier, setRewardTier] = useState("Gold Innovator");
  const [rewardAmount, setRewardAmount] = useState("₹30,000 Performance Reward");
  const [proofSubmitted, setProofSubmitted] = useState("");
  const [deadline, setDeadline] = useState("2026-12-31");
  const [feedback, setFeedback] = useState("");

  const handleCreateTarget = (e) => {
    e.preventDefault();
    if (!targetTitle || !targetImpactMetric) return;

    const newTarget = {
      id: `EARN-${Date.now()}`,
      employeeEcode: currentUser.ecode,
      employeeName: currentUser.name,
      targetTitle: targetTitle,
      category: category,
      targetImpactMetric: targetImpactMetric,
      currentProgress: 0,
      targetValue: Number(targetValue),
      unit: unit,
      rewardTier: rewardTier,
      rewardAmount: rewardAmount,
      proofSubmitted: proofSubmitted || "Pending verification link",
      status: "In Progress (0%)",
      deadline: deadline
    };

    onAddTarget(newTarget);

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });

    setFeedback("Target enrolled in SarlaYash Blessings Model! Deliver the impact and earn your reward.");
    setShowSubmitModal(false);
    setTimeout(() => setFeedback(""), 4500);
  };

  const handleIncrementProgress = (targetId, current, max) => {
    const inc = Math.min(current + Math.ceil(max * 0.1), max);
    onUpdateTargetProgress(targetId, inc);
    if (inc >= max) {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
      setFeedback("Target Completed! Reward eligible for immediate disbursement.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <span className="gold-gradient-text">SarlaYash Blessings 🙌 Internships Earning Model</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Meritocracy framework for high-impact contributors across SarlaYash Universe
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg glow-gold-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Choose New Target</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Flagship Banner Showcase Box */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-amber-400/50 bg-[#060a17] shadow-2xl">
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src="./sarlayash_blessings_banner.jpg"
            alt="SarlaYash Blessings Internships Earning Model"
            className="w-full h-full object-cover object-center brightness-90 hover:brightness-100 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a17] via-[#060a17]/60 to-transparent"></div>

          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <span className="inline-block w-fit px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-widest shadow-md">
              Official Growth & Rewards Charter
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white font-serif mt-2 gold-gradient-text">
              SarlaYash Blessings Internships
            </h3>
            <p className="text-base sm:text-lg font-bold text-amber-200 mt-1 italic drop-shadow-md">
              “ Choose your target. Create the impact. Prove the results. Earn your reward. 🚀 ”
            </p>
          </div>
        </div>

        {/* 4 Pillars of the Model */}
        <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 p-4 sm:p-6 bg-slate-950/80">
          <div className="p-3 text-center space-y-1">
            <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-black text-sm flex items-center justify-center mx-auto mb-1 border border-amber-500/30">
              1
            </span>
            <h4 className="font-extrabold text-sm text-white">Choose Target</h4>
            <p className="text-[11px] text-slate-400">Select bold KPIs in AI, EdTech, Content, or Engineering.</p>
          </div>

          <div className="p-3 text-center space-y-1">
            <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 font-black text-sm flex items-center justify-center mx-auto mb-1 border border-blue-500/30">
              2
            </span>
            <h4 className="font-extrabold text-sm text-white">Create Impact</h4>
            <p className="text-[11px] text-slate-400">Scale channels, train students, build production software.</p>
          </div>

          <div className="p-3 text-center space-y-1">
            <span className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 font-black text-sm flex items-center justify-center mx-auto mb-1 border border-purple-500/30">
              3
            </span>
            <h4 className="font-extrabold text-sm text-white">Prove Results</h4>
            <p className="text-[11px] text-slate-400">Submit verified links, analytics snapshots, or GitHub repos.</p>
          </div>

          <div className="p-3 text-center space-y-1">
            <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-sm flex items-center justify-center mx-auto mb-1 border border-emerald-500/30">
              4
            </span>
            <h4 className="font-extrabold text-sm text-white">Earn Reward</h4>
            <p className="text-[11px] text-slate-400">Disbursed with Monthly Payslip + Gold SarlaYash Honor.</p>
          </div>
        </div>
      </div>

      {/* Active Team Targets & Progress */}
      <div className="glass-panel p-6 rounded-3xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Active Contributor Milestones ({earningTargets.length})</span>
            </h3>
            <p className="text-xs text-slate-400">Live milestones tracked under the Blessings framework</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {earningTargets.map((item) => {
            const percentage = Math.min(Math.round((item.currentProgress / item.targetValue) * 100), 100);
            const isFinished = percentage >= 100;

            return (
              <div
                key={item.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                  isFinished
                    ? "bg-emerald-950/20 border-emerald-500/40 shadow-emerald-900/20"
                    : "bg-slate-900/70 border-amber-500/25 hover:border-amber-400"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-white text-sm mt-1">{item.targetTitle}</h4>
                      <p className="text-xs text-slate-400">
                        Champion: <strong className="text-slate-200">{item.employeeName}</strong> ({item.employeeEcode})
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        isFinished
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {item.rewardTier}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Progress: <strong className="text-white">{item.currentProgress.toLocaleString()}</strong> / {item.targetValue.toLocaleString()} {item.unit}
                      </span>
                      <span className="font-bold text-amber-300 font-mono">{percentage}%</span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isFinished
                            ? "bg-emerald-400 shadow-md shadow-emerald-400/50"
                            : "bg-gradient-to-r from-amber-500 to-yellow-300 shadow-md shadow-amber-400/50"
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Reward & Proof */}
                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-amber-300 font-semibold">
                      <span>Reward Entitlement:</span>
                      <span className="font-bold">{item.rewardAmount}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      Proof: <span className="text-slate-300">{item.proofSubmitted}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800/80 mt-3">
                  <span className="text-[10px] text-slate-400">
                    Deadline: <strong>{item.deadline}</strong>
                  </span>

                  {!isFinished ? (
                    <button
                      onClick={() => handleIncrementProgress(item.id, item.currentProgress, item.targetValue)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-amber-500/30 flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Log +10% Progress</span>
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Goal Achieved!
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#0a1226] border border-amber-500/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Enroll Target in Blessings Earning Model</h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTarget} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Target Title</label>
                <input
                  type="text"
                  value={targetTitle}
                  onChange={(e) => setTargetTitle(e.target.value)}
                  placeholder="e.g. 50 High-Yield Video Lessons / 20k New Followers"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Channel Growth & EdTech Impact">Channel Growth</option>
                    <option value="Technical Curriculum">Technical Curriculum</option>
                    <option value="EdTech Platform">EdTech Platform</option>
                    <option value="Cybersecurity Training">Cybersecurity Training</option>
                    <option value="Student Placement Mentorship">Student Mentorship</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Reward Tier</label>
                  <select
                    value={rewardTier}
                    onChange={(e) => setRewardTier(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Silver Achiever">Silver Achiever</option>
                    <option value="Gold Innovator">Gold Innovator</option>
                    <option value="Diamond Champion">Diamond Champion</option>
                    <option value="Universe Star">Universe Star</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Metric Goal (Number)</label>
                  <input
                    type="number"
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Unit</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="e.g. Subscribers / Problems / Labs"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Impact Description</label>
                <input
                  type="text"
                  value={targetImpactMetric}
                  onChange={(e) => setTargetImpactMetric(e.target.value)}
                  placeholder="e.g. 100k Subscribers & 1M views on YouTube"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Proof Link / Repo URL</label>
                <input
                  type="text"
                  value={proofSubmitted}
                  onChange={(e) => setProofSubmitted(e.target.value)}
                  placeholder="https://... or repository path"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:brightness-110 shadow"
                >
                  Activate Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
