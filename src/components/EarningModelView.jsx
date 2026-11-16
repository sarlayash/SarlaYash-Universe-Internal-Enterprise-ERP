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
  Clock,
  Calendar,
  Home,
  Heart,
  Coins,
  ArrowRight,
  TrendingUp,
  Check,
  Percent,
  Smile,
  ShieldCheck,
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
  const [activeTab, setActiveTab] = useState("manifesto"); // "manifesto" | "targets" | "calculator"
  const [selectedSlab, setSelectedSlab] = useState("slab1");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Paycheck Simulator State
  const [postsCount, setPostsCount] = useState(30);
  const [engagementScore, setEngagementScore] = useState(95);
  const [subscribersBuilt, setSubscribersBuilt] = useState(120);

  // Target Form state
  const [targetTitle, setTargetTitle] = useState("");
  const [category, setCategory] = useState("Channel Growth & EdTech Impact");
  const [targetImpactMetric, setTargetImpactMetric] = useState("");
  const [targetValue, setTargetValue] = useState(100);
  const [unit, setUnit] = useState("Subscribers");
  const [rewardTier, setRewardTier] = useState("Slab 1 (₹1,000 - ₹5,000)");
  const [rewardAmount, setRewardAmount] = useState("₹5,000");
  const [proofSubmitted, setProofSubmitted] = useState("");
  const [deadline, setDeadline] = useState("2026-12-31");

  // Calculate Paycheck
  const calculatePaycheck = () => {
    const isSlab0Met = postsCount >= 30 && engagementScore >= 80;
    const isDepositRefunded = isSlab0Met;

    let basePay = 0;
    let earnedSlab = "Not Met";

    if (isSlab0Met) {
      if (subscribersBuilt >= 300) {
        basePay = 15000;
        earnedSlab = "👑 Slab 3 (Champion)";
      } else if (subscribersBuilt >= 200) {
        basePay = 10000;
        earnedSlab = "🥇 Slab 2 (Innovator)";
      } else if (subscribersBuilt >= 100) {
        basePay = 5000;
        earnedSlab = "🥈 Slab 1 (Achiever)";
      } else {
        basePay = 1000;
        earnedSlab = "🥉 Slab 0 (Foundation)";
      }
    }

    const totalEarning = isDepositRefunded ? basePay + 1100 : basePay; // ₹1,100 refund (₹50 x 22 days)
    return { basePay, totalEarning, earnedSlab, isDepositRefunded };
  };

  const simResult = calculatePaycheck();

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
            “An internship should not feel like another classroom. It should give you responsibility, flexibility, care and a chance to create measurable impact.”
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg glow-gold-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Choose My Target</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("manifesto")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "manifesto"
              ? "bg-amber-500 text-slate-950 shadow glow-gold-sm"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>🙌 What Makes Us Different?</span>
        </button>

        <button
          onClick={() => setActiveTab("slabs")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "slabs"
              ? "bg-amber-500 text-slate-950 shadow glow-gold-sm"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>🏆 Performance Slabs & Paycheck</span>
        </button>

        <button
          onClick={() => setActiveTab("calculator")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "calculator"
              ? "bg-amber-500 text-slate-950 shadow glow-gold-sm"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>🔥 Decide Your Paycheck (Simulator)</span>
        </button>

        <button
          onClick={() => setActiveTab("targets")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === "targets"
              ? "bg-amber-500 text-slate-950 shadow glow-gold-sm"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          <Target className="w-4 h-4" />
          <span>🎯 Active Team Targets ({earningTargets.length})</span>
        </button>
      </div>

      {/* TAB 1: MANIFESTO & 5 PILLARS */}
      {activeTab === "manifesto" && (
        <div className="space-y-6">
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-amber-400/50 bg-[#060a17] shadow-2xl">
            <div className="relative h-60 sm:h-72 w-full overflow-hidden">
              <img
                src="./sarlayash_blessings_banner.jpg"
                alt="SarlaYash Blessings Internships Earning Model"
                className="w-full h-full object-cover object-center brightness-90 hover:brightness-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a17] via-[#060a17]/60 to-transparent"></div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <span className="inline-block w-fit px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-widest shadow-md">
                  Welcome To A Different Model 🚀
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white font-serif mt-2 gold-gradient-text">
                  WHAT MAKES SARLAYASH BLESSINGS INTERNSHIPS DIFFERENT?
                </h3>
                <p className="text-sm sm:text-base text-amber-200 mt-1 max-w-3xl leading-relaxed">
                  An internship should not feel like another classroom. It should give you responsibility, flexibility, care and a chance to create measurable impact.
                </p>
              </div>
            </div>
          </div>

          {/* 5 Distinct Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Just 1 Hour a Day */}
            <div className="glass-panel p-5 rounded-3xl space-y-3 border-l-4 border-l-amber-400">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="font-extrabold text-base text-white">⏰ JUST 1 HOUR A DAY</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We believe consistency matters more than keeping people busy. One focused, high-yield hour of daily contribution generates compound excellence.
              </p>
            </div>

            {/* 2. 5-Day Work Week */}
            <div className="glass-panel p-5 rounded-3xl space-y-3 border-l-4 border-l-blue-400">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="font-extrabold text-base text-white">📅 5-DAY WORK WEEK</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Because growth also needs time to breathe. Saturdays and Sundays are reserved for reflection, self-paced upskilling, and rejuvenating personal time.
              </p>
            </div>

            {/* 3. Permanent Work From Home */}
            <div className="glass-panel p-5 rounded-3xl space-y-3 border-l-4 border-l-emerald-400">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <Home className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="font-extrabold text-base text-white">🏠 PERMANENT WORK FROM HOME</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Learn. Create. Contribute. From wherever you are. Zero commute stress, 100% digital enablement across our high-bandwidth cloud workflows.
              </p>
            </div>

            {/* 4. A Model That Cares */}
            <div className="glass-panel p-5 rounded-3xl space-y-3 border-l-4 border-l-rose-400 lg:col-span-2">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-400" />
              </div>
              <h4 className="font-extrabold text-base text-white">❤️ A MODEL THAT CARES</h4>
              <p className="text-xs text-slate-300">
                Because behind every intern is a human being with a life, family and responsibilities:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200 pt-1">
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Parental Care Leave:</strong> Time for parents & family</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Exam Leave:</strong> Academic exams prioritized</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Sick Leave:</strong> Rest and recover with peace of mind</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-rose-400 shrink-0" />
                  <span><strong>Female No-Question Leave:</strong> Monthly cycle wellness</span>
                </div>
              </div>
              <p className="text-[11px] text-amber-300/90 font-medium">
                ✅ All National & International Holidays Off without deduction.
              </p>
            </div>

            {/* 5. The ₹50 Commitment Deposit */}
            <div className="glass-panel p-5 rounded-3xl space-y-3 border-l-4 border-l-purple-400">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <Coins className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="font-extrabold text-base text-white">💰 THE ₹50 DAILY COMMITMENT DEPOSIT</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A small commitment of ₹50 per working day to cultivate disciplined professional ownership.
              </p>
              <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>100% Refundable upon meeting monthly performance criteria!</span>
              </div>
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-600/20 border border-amber-400/50 text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-white font-serif gold-gradient-text">
              “The question is not: What will I earn?”
            </h3>
            <p className="text-lg font-bold text-amber-300">
              “The question is: How much impact am I ready to create?”
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <strong>SarlaYash Mission:</strong> Legacy of Values. Future of Learning. • <strong>🙌 Powered By Kapil</strong>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PERFORMANCE SLABS */}
      {activeTab === "slabs" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              🔥 DECIDE YOUR OWN PAYCHECK
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Your Performance. Your Impact. Your Earning Potential.
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose your target tier. Complete the monthly milestones. Collect your paycheck + 100% commitment refund!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* SLAB 0 */}
            <div className="glass-panel p-5 rounded-3xl space-y-4 border-2 border-slate-700 relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🥉</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                    Foundation
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-base text-white">SLAB 0</h4>
                  <div className="text-2xl font-black text-amber-300 font-mono mt-1">₹1,000</div>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                    + 100% Commitment Refund
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>30 LinkedIn posts in a month</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Comments & engagement on SarlaYash Facebook posts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Engagement on SarlaYash LinkedIn posts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Support for YouTube upload posts</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setTargetTitle("Slab 0 Monthly Performance Quota");
                  setRewardTier("Slab 0 (₹1,000)");
                  setRewardAmount("₹1,000 + 100% Refund");
                  setTargetValue(30);
                  setUnit("LinkedIn Posts");
                  setTargetImpactMetric("30 posts + Facebook/LinkedIn/YouTube community engagement");
                  setShowSubmitModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition-all border border-amber-500/30 mt-4"
              >
                Target Slab 0
              </button>
            </div>

            {/* SLAB 1 */}
            <div className="glass-panel p-5 rounded-3xl space-y-4 border-2 border-blue-500/40 relative flex flex-col justify-between shadow-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🥈</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                    Achiever
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-base text-white">SLAB 1</h4>
                  <div className="text-2xl font-black text-blue-300 font-mono mt-1">₹1,000 – ₹5,000</div>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                    + 100% Commitment Refund
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <p className="text-[11px] text-slate-400 italic">Everything in Slab 0, plus:</p>
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200">
                    <strong className="block text-white">📈 +100 Subscribers</strong>
                    <span className="text-[11px]">Build 100 subscribers individually on Facebook and YouTube.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setTargetTitle("Slab 1 (100 Subscribers Milestone)");
                  setRewardTier("Slab 1 (₹1,000 - ₹5,000)");
                  setRewardAmount("₹5,000 + 100% Refund");
                  setTargetValue(100);
                  setUnit("Subscribers");
                  setTargetImpactMetric("Everything in Slab 0 + 100 FB & YouTube subscribers");
                  setShowSubmitModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all mt-4 shadow"
              >
                Target Slab 1
              </button>
            </div>

            {/* SLAB 2 */}
            <div className="glass-panel p-5 rounded-3xl space-y-4 border-2 border-amber-400/60 relative flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🥇</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    Innovator
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-base text-white">SLAB 2</h4>
                  <div className="text-2xl font-black text-amber-300 font-mono mt-1">₹1,000 – ₹10,000</div>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                    + 100% Commitment Refund
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <p className="text-[11px] text-slate-400 italic">Everything in Slab 0, plus:</p>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                    <strong className="block text-white">📈 +200 Subscribers</strong>
                    <span className="text-[11px]">Build 200 subscribers individually on Facebook and YouTube.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setTargetTitle("Slab 2 (200 Subscribers Milestone)");
                  setRewardTier("Slab 2 (₹1,000 - ₹10,000)");
                  setRewardAmount("₹10,000 + 100% Refund");
                  setTargetValue(200);
                  setUnit("Subscribers");
                  setTargetImpactMetric("Everything in Slab 0 + 200 FB & YouTube subscribers");
                  setShowSubmitModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black transition-all mt-4 shadow"
              >
                Target Slab 2
              </button>
            </div>

            {/* SLAB 3 */}
            <div className="glass-panel p-5 rounded-3xl space-y-4 border-2 border-purple-500/60 bg-gradient-to-b from-purple-950/20 to-slate-900 relative flex flex-col justify-between shadow-2xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">👑</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/30 text-purple-300 font-bold">
                    Universe Star
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-base text-white">SLAB 3</h4>
                  <div className="text-2xl font-black text-purple-300 font-mono mt-1">₹1,000 – ₹15,000</div>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                    + 100% Commitment Refund
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <p className="text-[11px] text-slate-400 italic">Everything in Slab 0, plus:</p>
                  <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-200">
                    <strong className="block text-white">🚀 +300 Subscribers</strong>
                    <span className="text-[11px]">Build 300 subscribers individually on Facebook and YouTube.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setTargetTitle("Slab 3 (300 Subscribers Champion)");
                  setRewardTier("Slab 3 (₹1,000 - ₹15,000)");
                  setRewardAmount("₹15,000 + 100% Refund");
                  setTargetValue(300);
                  setUnit("Subscribers");
                  setTargetImpactMetric("Everything in Slab 0 + 300 FB & YouTube subscribers");
                  setShowSubmitModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition-all mt-4 shadow"
              >
                Target Slab 3 (Champion)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PAYCHECK SIMULATOR */}
      {activeTab === "calculator" && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Interactive Earning Model Simulator
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Simulate Your Performance & Calculate Monthly Paycheck
            </h3>
            <p className="text-xs text-slate-400">
              Adjust your monthly deliverables below to see how your payout and commitment refund scale dynamically!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
            {/* Controls (2 cols) */}
            <div className="lg:col-span-2 space-y-5 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              {/* Slider 1: LinkedIn Posts */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span>1. Monthly LinkedIn Posts</span>
                    <span className="text-[10px] text-slate-400">(Min 30 for Slab 0)</span>
                  </span>
                  <span className="font-mono text-amber-300 font-bold text-sm">{postsCount} Posts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={postsCount}
                  onChange={(e) => setPostsCount(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>0 Posts</span>
                  <span className="text-amber-400 font-bold">30 Posts (Threshold)</span>
                  <span>60 Posts</span>
                </div>
              </div>

              {/* Slider 2: Community Engagement */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span>2. Facebook, LinkedIn & YouTube Engagement</span>
                    <span className="text-[10px] text-slate-400">(Comments & Support)</span>
                  </span>
                  <span className="font-mono text-blue-300 font-bold text-sm">{engagementScore}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={engagementScore}
                  onChange={(e) => setEngagementScore(Number(e.target.value))}
                  className="w-full accent-blue-400 cursor-pointer"
                />
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>0%</span>
                  <span className="text-blue-400 font-bold">80% (Required)</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Slider 3: Subscribers Built */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span>3. Subscribers Built (Facebook & YouTube)</span>
                    <span className="text-[10px] text-purple-400">(Unlocks Slabs 1, 2, 3)</span>
                  </span>
                  <span className="font-mono text-purple-300 font-bold text-sm">{subscribersBuilt} Subs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="400"
                  value={subscribersBuilt}
                  onChange={(e) => setSubscribersBuilt(Number(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>0</span>
                  <span className="text-blue-400 font-bold">100 (Slab 1)</span>
                  <span className="text-amber-400 font-bold">200 (Slab 2)</span>
                  <span className="text-purple-400 font-bold">300 (Slab 3)</span>
                </div>
              </div>
            </div>

            {/* Live Paycheck Display (1 col) */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-navy-900 to-slate-950 border-2 border-amber-500/40 shadow-2xl flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Projected Monthly Paycheck
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono mt-1">
                  ₹{simResult.totalEarning.toLocaleString()}
                </div>
                <span className="text-xs font-bold text-emerald-400 mt-1 block">
                  {simResult.earnedSlab}
                </span>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Base Performance Stipe:</span>
                  <span className="font-mono text-white font-bold">₹{simResult.basePay.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>₹50/Day Deposit Refund:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {simResult.isDepositRefunded ? "+ ₹1,100 (100% Refunded)" : "₹0 (Criteria Not Met)"}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                {simResult.isDepositRefunded ? (
                  <p className="text-emerald-300 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Full ₹1,100 deposit refunded with monthly payout!
                  </p>
                ) : (
                  <p className="text-amber-400">
                    ⚠️ Complete minimum 30 LinkedIn posts and 80% engagement to unlock Slab 0 and refund.
                  </p>
                )}
              </div>

              <button
                onClick={() => {
                  confetti({
                    particleCount: 80,
                    spread: 80,
                    origin: { y: 0.6 }
                  });
                  setFeedback(`Target locked in! Estimated paycheck: ₹${simResult.totalEarning.toLocaleString()}`);
                  setTimeout(() => setFeedback(""), 4000);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:brightness-110 shadow"
              >
                Lock In This Target Payout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ACTIVE TARGETS */}
      {activeTab === "targets" && (
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
      )}

      {/* Target Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#0a1226] border border-amber-500/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">Enroll in SarlaYash Blessings Model</h3>
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
                  placeholder="e.g. Slab 2 Milestone (200 subscribers + 30 LinkedIn posts)"
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
                    <option value="Community Engagement">Community Engagement</option>
                    <option value="Cybersecurity Labs">Cybersecurity Labs</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Reward Tier / Slab</label>
                  <select
                    value={rewardTier}
                    onChange={(e) => setRewardTier(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Slab 0 (₹1,000)">Slab 0 (₹1,000)</option>
                    <option value="Slab 1 (₹1,000 - ₹5,000)">Slab 1 (₹1,000 - ₹5,000)</option>
                    <option value="Slab 2 (₹1,000 - ₹10,000)">Slab 2 (₹1,000 - ₹10,000)</option>
                    <option value="Slab 3 (₹1,000 - ₹15,000)">Slab 3 (₹1,000 - ₹15,000)</option>
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
                    placeholder="e.g. Subscribers / Posts / Modules"
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
                  placeholder="e.g. 100 new YouTube subscribers built + 30 LinkedIn posts"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Proof Link / Verification Channel</label>
                <input
                  type="text"
                  value={proofSubmitted}
                  onChange={(e) => setProofSubmitted(e.target.value)}
                  placeholder="https://www.youtube.com/... or LinkedIn profile"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
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
