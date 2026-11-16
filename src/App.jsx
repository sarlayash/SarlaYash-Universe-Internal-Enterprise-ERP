import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DashboardView from "./components/DashboardView";
import AttendanceView from "./components/AttendanceView";
import DailyTasksView from "./components/DailyTasksView";
import LeaveView from "./components/LeaveView";
import CalendarView from "./components/CalendarView";
import OrgHierarchyView from "./components/OrgHierarchyView";
import ChannelsView from "./components/ChannelsView";
import EarningModelView from "./components/EarningModelView";
import PayslipView from "./components/PayslipView";
import PoliciesView from "./components/PoliciesView";
import LoginModal from "./components/LoginModal";
import confetti from "canvas-confetti";
import { Sparkles, Bell, CheckCircle2, AlertTriangle, Clock, X } from "lucide-react";

import {
  getStoredData,
  setStoredData,
  initializeStorage,
  KEYS
} from "./utils/storage";

import {
  INITIAL_EMPLOYEES,
  INITIAL_CHANNELS,
  INITIAL_LEAVES,
  INITIAL_ATTENDANCE,
  INITIAL_HOLIDAYS_AND_EVENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EARNING_TARGETS,
  INITIAL_TASKS,
  INITIAL_PUNCH_CORRECTIONS,
  INITIAL_NOTIFICATIONS
} from "./data/initialData";

export default function App() {
  // Initialize storage on first load
  useEffect(() => {
    initializeStorage();
  }, []);

  const [employees, setEmployees] = useState(() =>
    getStoredData(KEYS.EMPLOYEES, INITIAL_EMPLOYEES)
  );
  const [channels, setChannels] = useState(() =>
    getStoredData(KEYS.CHANNELS, INITIAL_CHANNELS)
  );
  const [leaves, setLeaves] = useState(() =>
    getStoredData(KEYS.LEAVES, INITIAL_LEAVES)
  );
  const [attendance, setAttendance] = useState(() =>
    getStoredData(KEYS.ATTENDANCE, INITIAL_ATTENDANCE)
  );
  const [events, setEvents] = useState(() =>
    getStoredData(KEYS.EVENTS, INITIAL_HOLIDAYS_AND_EVENTS)
  );
  const [announcements, setAnnouncements] = useState(() =>
    getStoredData(KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS)
  );
  const [earningTargets, setEarningTargets] = useState(() =>
    getStoredData(KEYS.EARNING_TARGETS, INITIAL_EARNING_TARGETS)
  );
  const [tasks, setTasks] = useState(() =>
    getStoredData(KEYS.TASKS, INITIAL_TASKS)
  );
  const [punchCorrections, setPunchCorrections] = useState(() =>
    getStoredData(KEYS.PUNCH_CORRECTIONS, INITIAL_PUNCH_CORRECTIONS)
  );
  const [notifications, setNotifications] = useState(() =>
    getStoredData(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS)
  );

  const [currentUserId, setCurrentUserId] = useState(() =>
    getStoredData(KEYS.CURRENT_USER_ID, "SYM001")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    getStoredData(KEYS.IS_LOGGED_IN, false)
  );

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    setStoredData(KEYS.EMPLOYEES, employees);
  }, [employees]);

  useEffect(() => {
    setStoredData(KEYS.CHANNELS, channels);
  }, [channels]);

  useEffect(() => {
    setStoredData(KEYS.LEAVES, leaves);
  }, [leaves]);

  useEffect(() => {
    setStoredData(KEYS.ATTENDANCE, attendance);
  }, [attendance]);

  useEffect(() => {
    setStoredData(KEYS.EVENTS, events);
  }, [events]);

  useEffect(() => {
    setStoredData(KEYS.ANNOUNCEMENTS, announcements);
  }, [announcements]);

  useEffect(() => {
    setStoredData(KEYS.EARNING_TARGETS, earningTargets);
  }, [earningTargets]);

  useEffect(() => {
    setStoredData(KEYS.TASKS, tasks);
  }, [tasks]);

  useEffect(() => {
    setStoredData(KEYS.PUNCH_CORRECTIONS, punchCorrections);
  }, [punchCorrections]);

  useEffect(() => {
    setStoredData(KEYS.NOTIFICATIONS, notifications);
  }, [notifications]);

  useEffect(() => {
    setStoredData(KEYS.CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    setStoredData(KEYS.IS_LOGGED_IN, isLoggedIn);
  }, [isLoggedIn]);

  const currentUser = employees.find((e) => e.id === currentUserId) || employees[0];
  const isSuperAdmin = currentUser?.role === "super_admin" || currentUser?.id === "SYM001";

  // Today's attendance for current user (16 Nov 2026)
  const todayAttendance = attendance.find(
    (a) => a.employeeId === currentUser?.id && a.date === "2026-11-16"
  );

  // Pending counts
  const pendingLeavesCount = leaves.filter((l) => l.status === "Pending").length;
  const pendingCorrectionsCount = punchCorrections.filter((c) => c.status === "Pending").length;

  // Real-Time Notification Dispatcher
  const dispatchNotification = ({ recipientId, senderName, title, message, type }) => {
    const notif = {
      id: `NOTIF-${Date.now()}`,
      recipientId,
      senderName,
      title,
      message,
      type: type || "system",
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setNotifications((prev) => [notif, ...prev]);

    // Show on-screen toast
    setToastMessage({ title, message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 5500);
  };

  const handleMarkNotificationRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, isRead: true } : n))
    );
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Handlers
  const handleSwitchUser = (empId) => {
    setCurrentUserId(empId);
  };

  const handleLoginSuccess = (empId) => {
    setCurrentUserId(empId);
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    const emp = employees.find((e) => e.id === empId);
    if (emp) {
      dispatchNotification({
        recipientId: emp.id,
        senderName: "SarlaYash Universe Security",
        title: "Session Authenticated",
        message: `Welcome ${emp.name} (${emp.ecode}). Your individual workspace is loaded.`,
        type: "system"
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsLoginModalOpen(true);
  };

  const handleRecordAttendance = (record) => {
    setAttendance((prev) => {
      const idx = prev.findIndex(
        (a) => a.employeeId === record.employeeId && a.date === record.date
      );
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = record;
        return updated;
      }
      return [record, ...prev];
    });

    // Notify Super Admin Kapil of punch
    if (record.employeeId !== "SYM001") {
      dispatchNotification({
        recipientId: "super_admin",
        senderName: record.employeeName,
        title: `Attendance: ${record.employeeName}`,
        message: `${record.employeeName} (${record.employeeId}) punched: ${record.checkIn || record.checkOut} [${record.workMode}]`,
        type: "attendance"
      });
    }
  };

  const handleQuickPunch = () => {
    const isCheckedIn = !!todayAttendance?.checkIn && !todayAttendance?.checkOut;
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    if (!isCheckedIn) {
      handleRecordAttendance({
        id: `ATT-${Date.now()}`,
        employeeId: currentUser.id,
        employeeName: currentUser.name,
        date: "2026-11-16",
        checkIn: timeStr,
        checkOut: null,
        workMode: "Office - Campus",
        status: "Present",
        notes: "Quick punch via header widget."
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      handleRecordAttendance({
        ...todayAttendance,
        checkOut: timeStr,
        notes: `${todayAttendance.notes} | Out at ${timeStr}`
      });
    }
  };

  // Leave Management Handlers
  const handleApplyLeave = (newLeave) => {
    setLeaves((prev) => [newLeave, ...prev]);

    // Dispatch real-time notification to Super Admin Kapil
    dispatchNotification({
      recipientId: "super_admin",
      senderName: newLeave.employeeName,
      title: `New Leave Request: ${newLeave.employeeName}`,
      message: `${newLeave.employeeName} applied for ${newLeave.daysCount} day(s) ${newLeave.leaveType} (${newLeave.startDate} to ${newLeave.endDate}).`,
      type: "leave"
    });
  };

  const handleUpdateLeaveStatus = (leaveId, newStatus, remarks) => {
    const targetLeave = leaves.find((l) => l.id === leaveId);

    setLeaves((prev) =>
      prev.map((l) =>
        l.id === leaveId
          ? { ...l, status: newStatus, managerRemarks: remarks }
          : l
      )
    );

    // Notify employee of Founder decision
    if (targetLeave) {
      dispatchNotification({
        recipientId: targetLeave.employeeId,
        senderName: "Founder Kapil Narula",
        title: `Leave ${newStatus}: ${targetLeave.leaveType}`,
        message: `Your leave request for ${targetLeave.startDate} has been ${newStatus.toUpperCase()} by Founder Kapil Narula with remarks: "${remarks}"`,
        type: "leave"
      });
    }
  };

  // Punch Correction Handlers
  const handleRequestCorrection = (newCorrection) => {
    setPunchCorrections((prev) => [newCorrection, ...prev]);

    // Dispatch real-time notification to Super Admin Kapil
    dispatchNotification({
      recipientId: "super_admin",
      senderName: newCorrection.employeeName,
      title: `Punch Correction Request: ${newCorrection.employeeName}`,
      message: `${newCorrection.employeeName} requested punch adjustment for ${newCorrection.date} (${newCorrection.requestedCheckIn} - ${newCorrection.requestedCheckOut}). Reason: ${newCorrection.reason}`,
      type: "correction"
    });
  };

  const handleApproveCorrection = (correctionId) => {
    const targetCorr = punchCorrections.find((c) => c.id === correctionId);
    if (!targetCorr) return;

    setPunchCorrections((prev) =>
      prev.map((c) =>
        c.id === correctionId ? { ...c, status: "Approved" } : c
      )
    );

    // Automatically update the employee's attendance record
    handleRecordAttendance({
      id: `ATT-CORR-${Date.now()}`,
      employeeId: targetCorr.employeeId,
      employeeName: targetCorr.employeeName,
      date: targetCorr.date,
      checkIn: targetCorr.requestedCheckIn,
      checkOut: targetCorr.requestedCheckOut,
      workMode: targetCorr.workMode,
      status: "Present [Approved by Founder]",
      notes: `Punch corrected & verified by Founder Kapil Narula. Original reason: ${targetCorr.reason}`
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    // Notify the employee in real-time
    dispatchNotification({
      recipientId: targetCorr.employeeId,
      senderName: "Founder Kapil Narula",
      title: "Punch Correction Approved",
      message: `Your punch correction for ${targetCorr.date} was APPROVED by Founder Kapil Narula and updated in your official attendance record.`,
      type: "correction"
    });
  };

  const handleRejectCorrection = (correctionId, remarks) => {
    const targetCorr = punchCorrections.find((c) => c.id === correctionId);
    if (!targetCorr) return;

    setPunchCorrections((prev) =>
      prev.map((c) =>
        c.id === correctionId ? { ...c, status: "Rejected", adminRemarks: remarks } : c
      )
    );

    // Notify employee
    dispatchNotification({
      recipientId: targetCorr.employeeId,
      senderName: "Founder Kapil Narula",
      title: "Punch Correction Declined",
      message: `Your punch correction for ${targetCorr.date} was declined by Founder Kapil Narula. Remark: ${remarks || "Operational requirements"}`,
      type: "correction"
    });
  };

  // Daily Tasks Handlers
  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);

    // Dispatch real-time notification to Super Admin Kapil
    if (newTask.employeeId !== "SYM001") {
      dispatchNotification({
        recipientId: "super_admin",
        senderName: newTask.employeeEcode,
        title: `Daily Deliverable Submitted`,
        message: `${newTask.employeeEcode} logged ${newTask.hoursSpent} hrs on ${newTask.channel}: "${newTask.title}".`,
        type: "task"
      });
    }
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleUpdateChannelAssignee = (channelId, name, ecode) => {
    setChannels((prev) =>
      prev.map((c) =>
        c.id === channelId
          ? { ...c, assignedTo: name, assignedEcode: ecode }
          : c
      )
    );
  };

  const handleAddTarget = (newTarget) => {
    setEarningTargets((prev) => [newTarget, ...prev]);
  };

  const handleUpdateTargetProgress = (targetId, newProgress) => {
    setEarningTargets((prev) =>
      prev.map((t) =>
        t.id === targetId
          ? {
              ...t,
              currentProgress: newProgress,
              status:
                newProgress >= t.targetValue
                  ? "Verified & Rewarded 🎉"
                  : `In Progress`
            }
          : t
      )
    );
  };

  const handleAddAnnouncement = (newAnnouncement) => {
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 flex flex-col font-sans selection:bg-[#dc2626]/30 selection:text-[#ffd700]">
      {/* Top Fixed Navbar */}
      <Navbar
        currentUser={currentUser}
        employees={employees}
        onSwitchUser={handleSwitchUser}
        todayAttendance={todayAttendance}
        onQuickPunch={handleQuickPunch}
        pendingLeavesCount={pendingLeavesCount}
        pendingCorrectionsCount={pendingCorrectionsCount}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onClearNotifications={handleClearNotifications}
        onNavigate={(tab) => setActiveTab(tab)}
        onLogout={handleLogout}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          pendingLeavesCount={pendingLeavesCount}
          pendingCorrectionsCount={pendingCorrectionsCount}
          todayAttendance={todayAttendance}
          onQuickPunch={handleQuickPunch}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all">
          {activeTab === "dashboard" && (
            <DashboardView
              currentUser={currentUser}
              employees={employees}
              attendanceList={attendance}
              leavesList={leaves}
              channelsList={channels}
              earningTargets={earningTargets}
              announcements={announcements}
              todayAttendance={todayAttendance}
              punchCorrections={punchCorrections}
              onNavigate={(tab) => setActiveTab(tab)}
              onQuickPunch={handleQuickPunch}
            />
          )}

          {activeTab === "attendance" && (
            <AttendanceView
              currentUser={currentUser}
              employees={employees}
              attendanceList={attendance}
              onRecordAttendance={handleRecordAttendance}
              todayAttendance={todayAttendance}
              punchCorrections={punchCorrections}
              onRequestCorrection={handleRequestCorrection}
              onApproveCorrection={handleApproveCorrection}
              onRejectCorrection={handleRejectCorrection}
            />
          )}

          {activeTab === "tasks" && (
            <DailyTasksView
              tasksList={tasks}
              currentUser={currentUser}
              employees={employees}
              onAddTask={handleAddTask}
              onUpdateTaskStatus={handleUpdateTaskStatus}
            />
          )}

          {activeTab === "leaves" && (
            <LeaveView
              currentUser={currentUser}
              leavesList={leaves}
              onApplyLeave={handleApplyLeave}
              onUpdateLeaveStatus={handleUpdateLeaveStatus}
            />
          )}

          {activeTab === "calendar" && (
            <CalendarView
              eventsList={events}
              leavesList={leaves}
              currentUser={currentUser}
              onAddEvent={handleAddEvent}
            />
          )}

          {activeTab === "org" && (
            <OrgHierarchyView
              employees={employees}
              channelsList={channels}
              currentUser={currentUser}
              onSwitchUser={handleSwitchUser}
              onSelectEmployeeForPayslip={(empId) => {
                setCurrentUserId(empId);
                setActiveTab("payslip");
              }}
            />
          )}

          {activeTab === "channels" && (
            <ChannelsView
              channelsList={channels}
              employees={employees}
              currentUser={currentUser}
              onUpdateChannelAssignee={handleUpdateChannelAssignee}
            />
          )}

          {activeTab === "earning-model" && (
            <EarningModelView
              earningTargets={earningTargets}
              currentUser={currentUser}
              employees={employees}
              onAddTarget={handleAddTarget}
              onUpdateTargetProgress={handleUpdateTargetProgress}
            />
          )}

          {activeTab === "payslip" && (
            <PayslipView
              currentUser={currentUser}
              employees={employees}
            />
          )}

          {activeTab === "policies" && (
            <PoliciesView
              announcements={announcements}
              currentUser={currentUser}
              onAddAnnouncement={handleAddAnnouncement}
            />
          )}
        </main>
      </div>

      {/* Real-Time Floating Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl bg-[#0e0e16] border-2 border-[#ffd700]/50 p-4 shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-5 glow-red-sm">
          <div className="p-2 rounded-xl bg-[#dc2626]/20 text-[#ffd700] border border-[#dc2626]/40 shrink-0">
            {toastMessage.type === "leave" ? (
              <AlertTriangle className="w-5 h-5 text-[#ffd700]" />
            ) : toastMessage.type === "correction" ? (
              <Clock className="w-5 h-5 text-[#dc2626]" />
            ) : (
              <Sparkles className="w-5 h-5 text-emerald-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-white text-xs leading-snug">{toastMessage.title}</h4>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{toastMessage.message}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Mandatory Login Modal on Landing Page or when logged out */}
      <LoginModal
        isOpen={!isLoggedIn || isLoginModalOpen}
        isMandatory={!isLoggedIn}
        onClose={() => setIsLoginModalOpen(false)}
        employees={employees}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
