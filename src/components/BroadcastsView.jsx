import React, { useState } from "react";
import {
  Radio,
  Tv,
  Megaphone,
  Video,
  Calendar,
  Clock,
  Sparkles,
  Users,
  Award,
  ExternalLink,
  Plus,
  CheckCircle2,
  AlertCircle,
  Check,
  X,
  Share2,
  Shield,
  Eye,
  Send,
  UserCheck,
  Image as ImageIcon
} from "lucide-react";
import confetti from "canvas-confetti";

export default function BroadcastsView({
  broadcasts,
  currentUser,
  employees,
  onAddBroadcast,
  onNominateForBroadcast,
  onApproveNomination,
  onRejectNomination,
  onDeleteBroadcast
}) {
  const isSuperAdmin = currentUser?.role === "super_admin" || currentUser?.id === "SYM001";
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'videos' | 'posters' | 'nominations'
  const [showPushModal, setShowPushModal] = useState(false);
  const [selectedBroadcastForNomination, setSelectedBroadcastForNomination] = useState(null);
  const [selectedPosterPreview, setSelectedPosterPreview] = useState(null);
  const [feedback, setFeedback] = useState("");

  // Push Broadcast Form State (Founder Only)
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Masterclass Session");
  const [newBannerOption, setNewBannerOption] = useState("blessings"); // 'blessings' | 'logo' | 'custom'
  const [newCustomBanner, setNewCustomBanner] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newDate, setNewDate] = useState("2026-11-25");
  const [newTime, setNewTime] = useState("06:00 PM – 07:30 PM IST");
  const [newPlatform, setNewPlatform] = useState("YouTube Live & Google Meet");
  const [newMeetingLink, setNewMeetingLink] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newRoles, setNewRoles] = useState([
    "Guest Speaker",
    "Technical Demo Lead",
    "Session Moderator",
    "Slide Deck Curator"
  ]);

  // Nomination Form State (Employees)
  const [nominatedRole, setNominatedRole] = useState("Guest Speaker");
  const [nominationPitch, setNominationPitch] = useState("");

  // Calculate stats
  const allNominations = broadcasts.flatMap((b) =>
    (b.nominations || []).map((nom) => ({ ...nom, broadcastTitle: b.title, broadcastId: b.id }))
  );
  const pendingNominations = allNominations.filter((n) => n.status === "Pending");
  const myNominations = allNominations.filter(
    (n) => n.employeeId === currentUser?.id || n.employeeEcode === currentUser?.ecode
  );

  // Helper to extract YouTube video ID
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    try {
      if (url.includes("embed/")) return url;
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    } catch (e) {
      return null;
    }
  };

  // Handle Publish Broadcast (Founder)
  const handlePublishBroadcast = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Please provide both title and session description.");
      return;
    }

    let finalBanner = "./sarlayash_blessings_banner.jpg";
    if (newBannerOption === "logo") finalBanner = "./sarlayash_logo.jpg";
    else if (newBannerOption === "custom" && newCustomBanner.trim()) finalBanner = newCustomBanner.trim();

    const newBroadcast = {
      id: `BC-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      bannerUrl: finalBanner,
      videoUrl: newVideoUrl.trim() || null,
      dateTime: `${newDate} • ${newTime}`,
      date: newDate,
      platform: newPlatform,
      meetingLink: newMeetingLink.trim() || "https://meet.google.com/sarlayash",
      description: newDescription.trim(),
      publishedBy: "Founder Kapil Narula",
      publishedAt: new Date().toISOString(),
      availableRoles: newRoles.filter((r) => r.trim().length > 0),
      nominations: []
    };

    onAddBroadcast(newBroadcast);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    setFeedback(`New broadcast "${newTitle}" has been pushed live to all user dashboards!`);
    setShowPushModal(false);
    setNewTitle("");
    setNewDescription("");
    setNewVideoUrl("");
    setNewMeetingLink("");
    setTimeout(() => setFeedback(""), 5000);
  };

  // Handle Submit Nomination (Employee)
  const handleSubmitNomination = (e) => {
    e.preventDefault();
    if (!nominationPitch.trim()) {
      alert("Please summarize your proposed presentation topic or tasks.");
      return;
    }

    const nomination = {
      id: `NOM-${Date.now()}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      employeeEcode: currentUser.ecode,
      role: nominatedRole,
      pitch: nominationPitch.trim(),
      status: "Pending", // Pending, Approved by Founder, Rejected
      nominatedAt: new Date().toISOString(),
      founderRemarks: ""
    };

    onNominateForBroadcast(selectedBroadcastForNomination.id, nomination);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    setFeedback(`Nomination for "${nominatedRole}" submitted to Founder Kapil Narula for review!`);
    setSelectedBroadcastForNomination(null);
    setNominationPitch("");
    setTimeout(() => setFeedback(""), 5000);
  };

  // Filter broadcasts based on tab
  const filteredBroadcasts = broadcasts.filter((b) => {
    if (activeTab === "videos") return !!b.videoUrl;
    if (activeTab === "posters") return !!b.bannerUrl;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222230]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2">
              <Radio className="w-6 h-6 text-[#dc2626] animate-pulse" />
              <span className="tracking-tight">
                {isSuperAdmin
                  ? "Founder Broadcast Hub & Media Command"
                  : "Founder Broadcasts, Masterclasses & Speaker Roles"}
              </span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#dc2626]/20 text-[#ffd700] border border-[#dc2626]/40 text-[10px] font-mono font-bold">
              Live Portal Hub
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Official YouTube sessions, institutional meetings, media posters & interactive speaker nominations
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSuperAdmin && (
            <button
              onClick={() => setShowPushModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-bold text-xs shadow-lg glow-red transition-all border border-[#ffd700]/30"
            >
              <Plus className="w-4 h-4 text-[#ffd700]" />
              <span>Push New Broadcast / Session</span>
            </button>
          )}
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0c0c12] border border-[#222230] text-xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all ${
              activeTab === "all"
                ? "bg-[#dc2626] text-white shadow glow-red-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Broadcasts ({broadcasts.length})
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "videos"
                ? "bg-[#dc2626] text-white shadow glow-red-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Video className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Videos & Streams</span>
          </button>
          <button
            onClick={() => setActiveTab("posters")}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "posters"
                ? "bg-[#dc2626] text-white shadow glow-red-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Media Posters</span>
          </button>
          {isSuperAdmin ? (
            <button
              onClick={() => setActiveTab("nominations")}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "nominations"
                  ? "bg-[#dc2626] text-white shadow glow-red-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>Speaker Nominations Review ({pendingNominations.length})</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab("nominations")}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "nominations"
                  ? "bg-[#dc2626] text-white shadow glow-red-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>My Enrolled Roles ({myNominations.length})</span>
            </button>
          )}
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live synchronization active across all devices</span>
        </div>
      </div>

      {/* TAB CONTENT: SUPER ADMIN NOMINATIONS REVIEW DESK */}
      {activeTab === "nominations" && isSuperAdmin && (
        <div className="rounded-3xl bg-[#0c0c12] border-2 border-[#ffd700]/40 p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#ffd700]" />
                <h3 className="font-bold text-base text-white">Founder Speaker & Task Approval Desk</h3>
                {pendingNominations.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#dc2626] text-white text-[10px] font-bold">
                    {pendingNominations.length} Actionable
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Review candidate nominations and assign official co-hosting and speaker roles
              </p>
            </div>
          </div>

          {allNominations.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-[#222230] rounded-2xl">
              No nominations received yet. When team members nominate for speaker or task roles, they will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#222230] text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-3">Session Title</th>
                    <th className="py-2.5 px-3">Candidate</th>
                    <th className="py-2.5 px-3">Nominated Role</th>
                    <th className="py-2.5 px-3">Candidate Pitch / Topics</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Founder Decision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e2c]">
                  {allNominations.map((nom) => (
                    <tr key={nom.id} className="hover:bg-[#12121c] transition-colors">
                      <td className="py-3 px-3 font-semibold text-white max-w-xs truncate">
                        {nom.broadcastTitle}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="font-bold text-white">{nom.employeeName}</p>
                            <p className="text-[10px] text-[#ffd700] font-mono">{nom.employeeEcode}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1c0c0e] text-[#ffd700] border border-[#dc2626]/40 text-[10px] font-bold">
                          {nom.role}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-300 max-w-xs">{nom.pitch}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          nom.status === "Approved by Founder"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : nom.status === "Rejected"
                            ? "bg-red-500/20 text-red-300 border border-red-500/40"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}>
                          {nom.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {nom.status === "Pending" ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => onApproveNomination(nom.broadcastId, nom.id)}
                              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" /> Approve Role
                            </button>
                            <button
                              onClick={() => {
                                const remark = prompt("Enter remark for declining nomination:");
                                if (remark !== null) onRejectNomination(nom.broadcastId, nom.id, remark);
                              }}
                              className="px-3 py-1 rounded-lg bg-[#dc2626] hover:bg-red-600 text-white font-bold text-[11px] shadow flex items-center gap-1"
                            >
                              <X className="w-3 h-3" /> Decline
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">
                            {nom.founderRemarks || "Decision Recorded"}
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

      {/* TAB CONTENT: EMPLOYEE MY NOMINATIONS */}
      {activeTab === "nominations" && !isSuperAdmin && (
        <div className="rounded-3xl bg-[#0c0c12] border border-[#222230] p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
            <div>
              <h3 className="font-bold text-base text-white">My Session Enrollments & Speaker Nominations</h3>
              <p className="text-xs text-slate-400">Authenticated nominations for {currentUser?.name}</p>
            </div>
            <span className="text-xs font-mono text-[#ffd700] bg-[#14141e] px-3 py-1 rounded-xl border border-[#2a2a38]">
              {myNominations.length} Nomination(s)
            </span>
          </div>

          {myNominations.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-[#222230] rounded-2xl">
              You haven't nominated for any speaker roles or tasks yet. Browse sessions below and click "Nominate for Speaker Role"!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#222230] text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-3">Session</th>
                    <th className="py-2.5 px-3">Nominated Role</th>
                    <th className="py-2.5 px-3">My Pitch / Contribution</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Founder Kapil Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e2c]">
                  {myNominations.map((nom) => (
                    <tr key={nom.id} className="hover:bg-[#12121c] transition-colors">
                      <td className="py-3 px-3 font-semibold text-white max-w-xs">{nom.broadcastTitle}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1c0c0e] text-[#ffd700] border border-[#dc2626]/40 text-[10px] font-bold">
                          {nom.role}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-300 max-w-xs">{nom.pitch}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          nom.status === "Approved by Founder"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : nom.status === "Rejected"
                            ? "bg-red-500/20 text-red-300 border border-red-500/40"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}>
                          {nom.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400 italic">
                        {nom.founderRemarks || "Under review by Founder"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* BROADCASTS GRID / CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBroadcasts.map((item) => {
          const embedUrl = getYouTubeEmbedUrl(item.videoUrl);
          const hasNominated = (item.nominations || []).some(
            (n) => n.employeeId === currentUser?.id || n.employeeEcode === currentUser?.ecode
          );
          const approvedSpeaker = (item.nominations || []).find((n) => n.status === "Approved by Founder");

          return (
            <div
              key={item.id}
              className="rounded-3xl bg-[#09090f] border-2 border-[#ffd700]/30 hover:border-[#ffd700] transition-all shadow-2xl flex flex-col justify-between overflow-hidden group glow-red-sm"
            >
              {/* Media Container: Banner Poster or Video */}
              <div className="relative">
                {embedUrl ? (
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      src={embedUrl}
                      title={item.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="relative h-60 w-full overflow-hidden bg-black cursor-pointer" onClick={() => setSelectedPosterPreview(item.bannerUrl)}>
                    <img
                      src={item.bannerUrl}
                      alt={item.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      onError={(e) => {
                        e.target.src = "./sarlayash_blessings_banner.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090f] via-transparent to-black/40"></div>
                    <button
                      type="button"
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-black/70 text-[#ffd700] text-[10px] font-bold flex items-center gap-1 border border-[#ffd700]/30"
                    >
                      <Eye className="w-3 h-3" /> Full Poster
                    </button>
                  </div>
                )}

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#dc2626] text-white text-[10px] font-black uppercase tracking-wider shadow">
                    {item.type}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/80 text-[#ffd700] border border-[#ffd700]/40 text-[10px] font-mono font-bold">
                    {item.platform}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-black text-white font-serif leading-snug group-hover:text-[#ffd700] transition-colors">
                      {item.title}
                    </h3>
                    {isSuperAdmin && onDeleteBroadcast && (
                      <button
                        onClick={() => onDeleteBroadcast(item.id)}
                        className="p-1 rounded-lg text-slate-500 hover:text-red-400 shrink-0"
                        title="Delete Broadcast"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1 text-[#ffd700] font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#dc2626]" />
                      <span>{item.dateTime}</span>
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      By {item.publishedBy}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Approved Co-Speaker Badge if present */}
                  {approvedSpeaker && (
                    <div className="p-2.5 rounded-xl bg-[#14141e] border border-emerald-500/40 text-xs flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#ffd700] shrink-0" />
                      <div>
                        <span className="text-[10px] text-emerald-400 uppercase font-bold">Approved Co-Speaker / Lead: </span>
                        <strong className="text-white font-bold">{approvedSpeaker.employeeName}</strong>
                        <span className="text-[10px] text-slate-400 ml-1 font-mono">({approvedSpeaker.role})</span>
                      </div>
                    </div>
                  )}

                  {/* Open Opportunities / Available Roles */}
                  {item.availableRoles && item.availableRoles.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Open Team Roles (Click to Nominate):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.availableRoles.map((role) => (
                          <span
                            key={role}
                            className="px-2.5 py-0.5 rounded-lg bg-[#14141e] text-[#ffd700] border border-[#2a2a38] text-[10px] font-semibold"
                          >
                            🎤 {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Controls */}
                <div className="pt-4 border-t border-[#222230] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {item.meetingLink && (
                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#14141e] hover:bg-[#1a1a26] text-white font-bold text-xs border border-[#2a2a38] hover:border-[#ffd700]/50 transition-all flex items-center gap-1.5"
                      >
                        <span>Join Session / Meet</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#ffd700]" />
                      </a>
                    )}
                    {item.videoUrl && (
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-[#dc2626]/20 hover:bg-[#dc2626]/30 text-[#fca5a5] font-bold text-xs border border-[#dc2626]/40 transition-all flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Watch on YouTube</span>
                      </a>
                    )}
                  </div>

                  {/* Nominate / Enrolled Button */}
                  <button
                    onClick={() => {
                      setSelectedBroadcastForNomination(item);
                      setNominatedRole(item.availableRoles?.[0] || "Guest Speaker");
                    }}
                    className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 shadow-lg ${
                      hasNominated
                        ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/50"
                        : "bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] hover:from-[#ef4444] hover:to-[#dc2626] text-white glow-red-sm border border-[#ffd700]/30"
                    }`}
                  >
                    <Award className="w-4 h-4 text-[#ffd700]" />
                    <span>{hasNominated ? "Nomination Submitted" : "Nominate for Speaker Role"}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL 1: PUSH NEW BROADCAST (FOUNDER KAPIL SUPER ADMIN) */}
      {showPushModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-2xl my-8 rounded-3xl bg-[#09090e] border-2 border-[#ffd700]/50 p-6 sm:p-8 shadow-2xl space-y-5 glow-red-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
              <div className="flex items-center gap-2.5">
                <Radio className="w-6 h-6 text-[#dc2626]" />
                <div>
                  <h3 className="font-black text-lg text-white font-serif gold-gradient-text">
                    Push New Broadcast / Announce Session
                  </h3>
                  <p className="text-xs text-[#ffd700]">Founder Super Admin Broadcast Console • Kapil Narula</p>
                </div>
              </div>
              <button
                onClick={() => setShowPushModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishBroadcast} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-200">Session / Broadcast Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. AI Ladder Live Masterclass — Building Multi-Agent Systems"
                  className="w-full p-3 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-200">Broadcast Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  >
                    <option value="Masterclass Session">Masterclass Session</option>
                    <option value="All-Hands Meeting">All-Hands Meeting</option>
                    <option value="YouTube Live Broadcast">YouTube Live Broadcast</option>
                    <option value="Compliance Panel">Compliance Panel</option>
                    <option value="Student Placement Drive">Student Placement Drive</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-200">Broadcast Platform</label>
                  <input
                    type="text"
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    placeholder="e.g. YouTube Live & Google Meet"
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  />
                </div>
              </div>

              {/* Poster / Banner Selector */}
              <div className="space-y-2">
                <label className="font-semibold text-slate-200">Select Media Poster / Banner</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewBannerOption("blessings")}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      newBannerOption === "blessings"
                        ? "bg-[#1c0c0e] border-[#dc2626] text-[#ffd700]"
                        : "bg-[#050508] border-[#2a2a38] text-slate-400"
                    }`}
                  >
                    <p className="font-bold text-xs text-white">Blessings Curtain</p>
                    <p className="text-[10px] text-slate-400">Official Red Curtain</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewBannerOption("logo")}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      newBannerOption === "logo"
                        ? "bg-[#1c0c0e] border-[#dc2626] text-[#ffd700]"
                        : "bg-[#050508] border-[#2a2a38] text-slate-400"
                    }`}
                  >
                    <p className="font-bold text-xs text-white">Golden Crest Emblem</p>
                    <p className="text-[10px] text-slate-400">SarlaYash Tree Logo</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewBannerOption("custom")}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      newBannerOption === "custom"
                        ? "bg-[#1c0c0e] border-[#dc2626] text-[#ffd700]"
                        : "bg-[#050508] border-[#2a2a38] text-slate-400"
                    }`}
                  >
                    <p className="font-bold text-xs text-white">Custom URL</p>
                    <p className="text-[10px] text-slate-400">External Image URL</p>
                  </button>
                </div>

                {newBannerOption === "custom" && (
                  <input
                    type="url"
                    value={newCustomBanner}
                    onChange={(e) => setNewCustomBanner(e.target.value)}
                    placeholder="https://example.com/poster.jpg"
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700] text-xs"
                  />
                )}
              </div>

              {/* Video URL & Meeting Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-200">YouTube Video / Live Stream URL (Optional)</label>
                  <input
                    type="url"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-200">Google Meet / Live Stream Link</label>
                  <input
                    type="url"
                    value={newMeetingLink}
                    onChange={(e) => setNewMeetingLink(e.target.value)}
                    placeholder="https://meet.google.com/..."
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-200">Session Date (Active from Nov 01, 2026)</label>
                  <input
                    type="date"
                    min="2026-11-01"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-200">Time Window (IST)</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="06:00 PM – 07:30 PM IST"
                    className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                    required
                  />
                </div>
              </div>

              {/* Description & Agenda */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-200">Session Agenda & Description</label>
                <textarea
                  rows="3"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Outline topics covered, special guests, and what team members will learn..."
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#222230]">
                <button
                  type="button"
                  onClick={() => setShowPushModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#14141e] text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] via-[#b91c1c] to-[#991b1b] text-white font-bold flex items-center gap-1.5 shadow-lg glow-red-sm border border-[#ffd700]/30"
                >
                  <Send className="w-4 h-4 text-[#ffd700]" />
                  <span>Publish Broadcast to All Dashboards</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: NOMINATE FOR SPEAKER / ENROLL IN TASK (ALL EMPLOYEES) */}
      {selectedBroadcastForNomination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#09090e] border-2 border-[#ffd700]/50 p-6 shadow-2xl space-y-5 glow-red-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#222230]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#ffd700]" />
                <h3 className="font-bold text-base text-white">Nominate for Speaker Role / Task</h3>
              </div>
              <button
                onClick={() => setSelectedBroadcastForNomination(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0e0e16] border border-[#ffd700]/30 text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Target Session:</span>
              <p className="font-bold text-white text-sm">{selectedBroadcastForNomination.title}</p>
              <p className="text-[#ffd700] font-mono text-[11px]">{selectedBroadcastForNomination.dateTime}</p>
            </div>

            <form onSubmit={handleSubmitNomination} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-200">Select Role You Wish to Own</label>
                <select
                  value={nominatedRole}
                  onChange={(e) => setNominatedRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                >
                  {(selectedBroadcastForNomination.availableRoles || ["Guest Speaker", "Technical Demo Lead", "Session Moderator"]).map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-200">Your Proposed Presentation Pitch / Topics Covered</label>
                <textarea
                  rows="4"
                  value={nominationPitch}
                  onChange={(e) => setNominationPitch(e.target.value)}
                  placeholder="Outline what you will present, demo code ready, or how you will moderate the session..."
                  className="w-full p-2.5 rounded-xl bg-[#050508] border border-[#2a2a38] text-white focus:outline-none focus:border-[#ffd700]"
                  required
                ></textarea>
              </div>

              <div className="p-3 rounded-xl bg-[#14141e] border border-[#2a2a38] text-[11px] text-slate-300">
                <p className="font-bold text-white">Founder Review Protocol:</p>
                <p className="text-slate-400 mt-0.5">
                  Founder Kapil Narula reviews all nominations. Once approved, you will receive real-time confirmation and official co-speaker credits.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBroadcastForNomination(null)}
                  className="px-4 py-2 rounded-xl bg-[#14141e] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white font-bold flex items-center gap-1.5 shadow-lg"
                >
                  <Send className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span>Submit Nomination to Founder</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL POSTER PREVIEW MODAL */}
      {selectedPosterPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedPosterPreview(null)}>
          <div className="relative max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden border-2 border-[#ffd700] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPosterPreview}
              alt="Full Poster View"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            <button
              onClick={() => setSelectedPosterPreview(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/80 text-white hover:text-[#ffd700]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
