import {
  INITIAL_EMPLOYEES,
  INITIAL_CHANNELS,
  INITIAL_LEAVES,
  INITIAL_ATTENDANCE,
  INITIAL_HOLIDAYS_AND_EVENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EARNING_TARGETS,
  COMPANY_POLICIES
} from "../data/initialData";

const KEYS = {
  EMPLOYEES: "sarlayash_erp_employees",
  CHANNELS: "sarlayash_erp_channels",
  LEAVES: "sarlayash_erp_leaves",
  ATTENDANCE: "sarlayash_erp_attendance",
  EVENTS: "sarlayash_erp_events",
  ANNOUNCEMENTS: "sarlayash_erp_announcements",
  EARNING_TARGETS: "sarlayash_erp_earning_targets",
  CURRENT_USER_ID: "sarlayash_erp_current_user_id"
};

export const getStoredData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error("Error reading localStorage", e);
    return fallback;
  }
};

export const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving localStorage", e);
  }
};

export const initializeStorage = () => {
  if (!localStorage.getItem(KEYS.EMPLOYEES)) {
    setStoredData(KEYS.EMPLOYEES, INITIAL_EMPLOYEES);
  }
  if (!localStorage.getItem(KEYS.CHANNELS)) {
    setStoredData(KEYS.CHANNELS, INITIAL_CHANNELS);
  }
  if (!localStorage.getItem(KEYS.LEAVES)) {
    setStoredData(KEYS.LEAVES, INITIAL_LEAVES);
  }
  if (!localStorage.getItem(KEYS.ATTENDANCE)) {
    setStoredData(KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  }
  if (!localStorage.getItem(KEYS.EVENTS)) {
    setStoredData(KEYS.EVENTS, INITIAL_HOLIDAYS_AND_EVENTS);
  }
  if (!localStorage.getItem(KEYS.ANNOUNCEMENTS)) {
    setStoredData(KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  }
  if (!localStorage.getItem(KEYS.EARNING_TARGETS)) {
    setStoredData(KEYS.EARNING_TARGETS, INITIAL_EARNING_TARGETS);
  }
  if (!localStorage.getItem(KEYS.CURRENT_USER_ID)) {
    setStoredData(KEYS.CURRENT_USER_ID, "SYM001"); // Default to Founder Kapil Narula
  }
};

export const resetAllData = () => {
  localStorage.setItem(KEYS.EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
  localStorage.setItem(KEYS.CHANNELS, JSON.stringify(INITIAL_CHANNELS));
  localStorage.setItem(KEYS.LEAVES, JSON.stringify(INITIAL_LEAVES));
  localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(INITIAL_ATTENDANCE));
  localStorage.setItem(KEYS.EVENTS, JSON.stringify(INITIAL_HOLIDAYS_AND_EVENTS));
  localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
  localStorage.setItem(KEYS.EARNING_TARGETS, JSON.stringify(INITIAL_EARNING_TARGETS));
  localStorage.setItem(KEYS.CURRENT_USER_ID, JSON.stringify("SYM001"));
  window.location.reload();
};

export { KEYS };
