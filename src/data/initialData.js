// SarlaYash Universe Powered By Kapil - Master Data Store

export const INITIAL_EMPLOYEES = [
  {
    id: "SYM001",
    sno: 1,
    ecode: "SYM001",
    name: "Kapil Narula",
    designation: "Founder",
    reportsTo: "SarlaYash Leaders",
    email: "kapil.narula@sarlayash.com",
    role: "super_admin", // super_admin, admin, employee
    phone: "+91 98110 01001",
    department: "Executive Leadership",
    location: "Global HQ / Executive Office",
    joiningDate: "2020-01-01",
    status: "Active",
    avatar: "👑",
    bio: "Visionary Founder of SarlaYash Universe, SarlaYash Group of Institutions & SarlaYash Learning Solutions LLP.",
    leaveBalance: { casual: 15, sick: 12, privilege: 20, blessings: 5 },
    salary: { basic: 250000, hra: 100000, allowances: 50000, pf: 12000, tax: 45000 },
    assignedChannels: ["SarlaYash Mission | Powered By Kapil", "Mind Your Words With Kapil", "Mysteries Of POSH With Kapil"]
  },
  {
    id: "SYM002",
    sno: 2,
    ecode: "SYM002",
    name: "Sathursan Kamalanathan",
    designation: "Chief Executive Officer",
    reportsTo: "Kapil Narula",
    email: "sathursan.k@sarlayash.com",
    role: "admin",
    phone: "+91 98110 01002",
    department: "Executive Management & Operations",
    location: "Headquarters",
    joiningDate: "2021-03-15",
    status: "Active",
    avatar: "⚡",
    bio: "CEO driving technological innovation, scalable operational execution, and enterprise excellence across SarlaYash.",
    leaveBalance: { casual: 12, sick: 10, privilege: 15, blessings: 4 },
    salary: { basic: 180000, hra: 72000, allowances: 35000, pf: 9000, tax: 28000 },
    assignedChannels: ["DSA Unfiltered With Kapil | Powered By SarlaYash", "Cyber IQ With Kapil | Powered By SarlaYash"]
  },
  {
    id: "SYM003",
    sno: 3,
    ecode: "SYM003",
    name: "Trisha Ghosh",
    designation: "Chief People Officer",
    reportsTo: "Kapil Narula",
    email: "trisha.ghosh@sarlayash.com",
    role: "admin",
    phone: "+91 98110 01003",
    department: "People, Culture & Talent Operations",
    location: "Headquarters",
    joiningDate: "2021-06-01",
    status: "Active",
    avatar: "🌸",
    bio: "Chief People Officer championing cultural ethos, talent acceleration, POSH adherence, and people blessings.",
    leaveBalance: { casual: 12, sick: 10, privilege: 15, blessings: 4 },
    salary: { basic: 175000, hra: 70000, allowances: 30000, pf: 8500, tax: 26000 },
    assignedChannels: ["HR Mirror With Kapil", "Polish Aptitude With Kapil"]
  },
  {
    id: "SYM004",
    sno: 4,
    ecode: "SYM004",
    name: "Amber Khanum",
    designation: "Industry Ready Solution Engineer",
    reportsTo: "Sathursan Kamalanathan",
    email: "amber.khanum@sarlayash.com",
    role: "employee",
    phone: "+91 98110 01004",
    department: "AI & Solution Engineering",
    location: "Tech Campus",
    joiningDate: "2023-01-10",
    status: "Active",
    avatar: "🚀",
    bio: "Specializing in Generative AI architectures, solution delivery, and leading the flagship AI Ladder 🪜 channel.",
    leaveBalance: { casual: 10, sick: 8, privilege: 12, blessings: 3 },
    salary: { basic: 85000, hra: 34000, allowances: 15000, pf: 4200, tax: 8500 },
    assignedChannels: ["AI Ladder 🪜 With Kapil"]
  },
  {
    id: "SYM005",
    sno: 5,
    ecode: "SYM005",
    name: "Arpan Mandal",
    designation: "Industry Ready Solution Engineer",
    reportsTo: "Sathursan Kamalanathan",
    email: "arpan.mandal@sarlayash.com",
    role: "employee",
    phone: "+91 98110 01005",
    department: "Fullstack & Cloud Engineering",
    location: "Tech Campus",
    joiningDate: "2023-02-01",
    status: "Active",
    avatar: "💻",
    bio: "Fullstack engineering champion focused on high-performance cloud architectures and developer tools.",
    leaveBalance: { casual: 11, sick: 9, privilege: 14, blessings: 3 },
    salary: { basic: 82000, hra: 32800, allowances: 14000, pf: 4000, tax: 8000 },
    assignedChannels: ["DSA Unfiltered With Kapil"]
  },
  {
    id: "SYM006",
    sno: 6,
    ecode: "SYM006",
    name: "Abhishek Kaundal",
    designation: "Industry Ready Solution Engineer",
    reportsTo: "Sathursan Kamalanathan",
    email: "abhishek.kaundal@sarlayash.com",
    role: "employee",
    phone: "+91 98110 01006",
    department: "Cyber & Infrastructure Engineering",
    location: "Tech Campus",
    joiningDate: "2023-03-15",
    status: "Active",
    avatar: "🛡️",
    bio: "Cyber intelligence, secure networking, and systems robustness specialist.",
    leaveBalance: { casual: 9, sick: 7, privilege: 11, blessings: 2 },
    salary: { basic: 80000, hra: 32000, allowances: 13000, pf: 3900, tax: 7800 },
    assignedChannels: ["Cyber IQ With Kapil | Powered By SarlaYash"]
  },
  {
    id: "SYM007",
    sno: 7,
    ecode: "SYM007",
    name: "Nidhi Rathore",
    designation: "Industry Ready Solution Engineer",
    reportsTo: "Trisha Ghosh",
    email: "nidhi.rathore@sarlayash.com",
    role: "employee",
    phone: "+91 98110 01007",
    department: "Talent Solutions & EdTech",
    location: "Learning Studio",
    joiningDate: "2023-04-10",
    status: "Active",
    avatar: "🎯",
    bio: "Curriculum engineering, problem solving pedagogy, and aptitude mastery architect.",
    leaveBalance: { casual: 10, sick: 8, privilege: 12, blessings: 3 },
    salary: { basic: 78000, hra: 31200, allowances: 12000, pf: 3800, tax: 7500 },
    assignedChannels: ["Polish Aptitude With Kapil"]
  },
  {
    id: "SYM008",
    sno: 8,
    ecode: "SYM008",
    name: "Manju Kushwaha",
    designation: "Industry Ready Solution Engineer",
    reportsTo: "Trisha Ghosh",
    email: "manju.kushwaha@sarlayash.com",
    role: "employee",
    phone: "+91 98110 01008",
    department: "Corporate Compliance & EdTech",
    location: "Headquarters",
    joiningDate: "2023-05-02",
    status: "Active",
    avatar: "✨",
    bio: "Corporate ethics, POSH knowledge facilitation, and talent readiness engineer.",
    leaveBalance: { casual: 8, sick: 6, privilege: 10, blessings: 2 },
    salary: { basic: 77000, hra: 30800, allowances: 12000, pf: 3700, tax: 7200 },
    assignedChannels: ["Mysteries Of POSH with Kapil"]
  },
  {
    id: "SYM009",
    sno: 9,
    ecode: "SYM009",
    name: "Tarunika A",
    designation: "Industry Ready Solution Engineer",
    reportsTo: "Trisha Ghosh",
    email: "tarunika.a@sarlayash.com",
    role: "employee",
    phone: "+91 98110 01009",
    department: "Communication & Expression Engineering",
    location: "Learning Studio",
    joiningDate: "2023-06-15",
    status: "Active",
    avatar: "🎙️",
    bio: "Mastering professional articulation, corporate communication, and 'Mind Your Words' initiatives.",
    leaveBalance: { casual: 10, sick: 8, privilege: 13, blessings: 3 },
    salary: { basic: 76000, hra: 30400, allowances: 11000, pf: 3600, tax: 7000 },
    assignedChannels: ["Mind Your Words With Kapil"]
  },
  {
    id: "SYM010",
    sno: 10,
    ecode: "SYM10",
    name: "Madhumita Adak",
    designation: "Industry Ready Solution Engineer",
    reportsTo: "Trisha Ghosh",
    email: "madhumita.adak@sarlayash.com",
    role: "employee",
    phone: "+91 98110 01010",
    department: "Student Outreach & Mentorship",
    location: "Tech Campus",
    joiningDate: "2023-08-01",
    status: "Active",
    avatar: "🌟",
    bio: "Passionate engineer focusing on campus outreach, student success, and community engagement.",
    leaveBalance: { casual: 11, sick: 9, privilege: 12, blessings: 3 },
    salary: { basic: 75000, hra: 30000, allowances: 11000, pf: 3500, tax: 6800 },
    assignedChannels: ["SarlaYash Mission"]
  }
];

export const INITIAL_CHANNELS = [
  // LinkedIn Channels
  {
    id: "li-1",
    platform: "LinkedIn",
    name: "Polish Aptitude With Kapil",
    url: "https://www.linkedin.com/company/polish-aptitude-with-kapil-sarlayash/home/?viewAsMember=true",
    assignedTo: "Nidhi Rathore",
    assignedEcode: "SYM007",
    followers: "14.2K",
    postsThisMonth: 18,
    status: "Active & High Impact"
  },
  {
    id: "li-2",
    platform: "LinkedIn",
    name: "AI Ladder With Kapil | Powered by SarlaYash",
    url: "https://www.linkedin.com/company/ai-ladder-with-kapil-powered-by-sarlayash/home/?viewAsMember=true",
    assignedTo: "Amber Khanum",
    assignedEcode: "SYM004",
    followers: "32.5K",
    postsThisMonth: 24,
    status: "Trending / Flagship"
  },
  {
    id: "li-3",
    platform: "LinkedIn",
    name: "DSA Unfiltered With Kapil | Powered By SarlaYash",
    url: "https://www.linkedin.com/company/dsa-unfiltered-with-kapil-powered-by-sarlayash/home/?viewAsMember=true",
    assignedTo: "Arpan Mandal",
    assignedEcode: "SYM005",
    followers: "28.9K",
    postsThisMonth: 20,
    status: "Active & High Impact"
  },
  {
    id: "li-4",
    platform: "LinkedIn",
    name: "Mind Your Words With Kapil | Powered By SarlaYash",
    url: "https://www.linkedin.com/company/mind-your-words-with-kapil-powered-by-sarlayash/home/?viewAsMember=true",
    assignedTo: "Tarunika A",
    assignedEcode: "SYM009",
    followers: "19.4K",
    postsThisMonth: 16,
    status: "Active"
  },
  {
    id: "li-5",
    platform: "LinkedIn",
    name: "SarlaYash Mission",
    url: "https://www.linkedin.com/company/sarlayash-mission/home/?viewAsMember=true",
    assignedTo: "Madhumita Adak",
    assignedEcode: "SYM010",
    followers: "45.1K",
    postsThisMonth: 28,
    status: "Official Enterprise Page"
  },
  {
    id: "li-6",
    platform: "LinkedIn",
    name: "Mysteries Of POSH With Kapil | Powered By SarlaYash",
    url: "https://www.linkedin.com/company/mysteries-of-posh-with-kapil-powered-by-sarlayash/home/?viewAsMember=true",
    assignedTo: "Manju Kushwaha",
    assignedEcode: "SYM008",
    followers: "11.8K",
    postsThisMonth: 12,
    status: "Compliance & Ethics Spotlight"
  },
  {
    id: "li-7",
    platform: "LinkedIn",
    name: "Cyber IQ With Kapil | Powered By SarlaYash",
    url: "https://www.linkedin.com/company/cyber-iq-with-kapil-powered-by-sarlayash/home/?viewAsMember=true",
    assignedTo: "Abhishek Kaundal",
    assignedEcode: "SYM006",
    followers: "21.6K",
    postsThisMonth: 15,
    status: "Active & High Impact"
  },

  // YouTube Channels
  {
    id: "yt-1",
    platform: "YouTube",
    name: "SarlaYash Mission | Powered By Kapil",
    url: "https://www.youtube.com/@SarlaYash",
    assignedTo: "Kapil Narula",
    assignedEcode: "SYM001",
    followers: "185K",
    postsThisMonth: 14,
    status: "Main YouTube Channel"
  },
  {
    id: "yt-2",
    platform: "YouTube",
    name: "AI Ladder 🪜 With Kapil",
    url: "https://www.youtube.com/@AILadderWithKapil",
    assignedTo: "Amber Khanum",
    assignedEcode: "SYM004",
    followers: "96.4K",
    postsThisMonth: 22,
    status: "Assigned: Amber (Super Hit 🚀)"
  },
  {
    id: "yt-3",
    platform: "YouTube",
    name: "HR Mirror With Kapil",
    url: "https://www.youtube.com/@HRMIrrorWithKapil",
    assignedTo: "Trisha Ghosh",
    assignedEcode: "SYM003",
    followers: "38.2K",
    postsThisMonth: 10,
    status: "Active Leadership Stream"
  },
  {
    id: "yt-4",
    platform: "YouTube",
    name: "DSA Unfiltered With Kapil",
    url: "https://www.youtube.com/@DSAUnfilteredWithKapil",
    assignedTo: "Arpan Mandal",
    assignedEcode: "SYM005",
    followers: "74.8K",
    postsThisMonth: 19,
    status: "Active Series"
  },
  {
    id: "yt-5",
    platform: "YouTube",
    name: "Mysteries Of POSH with Kapil",
    url: "https://www.youtube.com/@MysteriesOfPOSHwithKapil",
    assignedTo: "Manju Kushwaha",
    assignedEcode: "SYM008",
    followers: "26.3K",
    postsThisMonth: 8,
    status: "Special Initiative"
  },
  {
    id: "yt-6",
    platform: "YouTube",
    name: "Mind Your Words With Kapil",
    url: "https://www.youtube.com/@MindYourWordsWithKapil",
    assignedTo: "Tarunika A",
    assignedEcode: "SYM009",
    followers: "41.5K",
    postsThisMonth: 12,
    status: "Active Series"
  },

  // Facebook Channels
  {
    id: "fb-1",
    platform: "Facebook",
    name: "AI Ladder With Kapil | Powered by SarlaYash",
    url: "https://www.facebook.com/profile.php?id=61596655379456",
    assignedTo: "Amber Khanum",
    assignedEcode: "SYM004",
    followers: "18.3K",
    postsThisMonth: 15,
    status: "Active"
  },
  {
    id: "fb-2",
    platform: "Facebook",
    name: "Mind Your Words With Kapil | Powered By SarlaYash",
    url: "https://www.facebook.com/profile.php?id=61596795923454",
    assignedTo: "Tarunika A",
    assignedEcode: "SYM009",
    followers: "12.7K",
    postsThisMonth: 11,
    status: "Active"
  },
  {
    id: "fb-3",
    platform: "Facebook",
    name: "DSA Unfiltered With Kapil",
    url: "https://www.facebook.com/profile.php?id=61596548044176",
    assignedTo: "Arpan Mandal",
    assignedEcode: "SYM005",
    followers: "15.9K",
    postsThisMonth: 14,
    status: "Active"
  },
  {
    id: "fb-4",
    platform: "Facebook",
    name: "Cyber IQ With Kapil | Powered By SarlaYash",
    url: "https://www.facebook.com/profile.php?id=61596715407108",
    assignedTo: "Abhishek Kaundal",
    assignedEcode: "SYM006",
    followers: "9.8K",
    postsThisMonth: 9,
    status: "Active"
  },
  {
    id: "fb-5",
    platform: "Facebook",
    name: "SarlaYash Mission Powered By Kapil",
    url: "https://www.facebook.com/SarlaYashMissionPoweredByKapil/",
    assignedTo: "Madhumita Adak",
    assignedEcode: "SYM010",
    followers: "54.2K",
    postsThisMonth: 22,
    status: "Official Community Hub"
  }
];

export const INITIAL_LEAVES = [
  {
    id: "LV-2026-001",
    employeeId: "SYM004",
    employeeName: "Amber Khanum",
    leaveType: "Casual Leave",
    startDate: "2026-11-20",
    endDate: "2026-11-21",
    daysCount: 2,
    duration: "Full Day",
    reason: "Attending National AI Summit as guest panelist & family function.",
    appliedOn: "2026-11-14",
    status: "Pending", // Pending, Approved, Rejected
    managerName: "Sathursan Kamalanathan",
    managerRemarks: ""
  },
  {
    id: "LV-2026-002",
    employeeId: "SYM005",
    employeeName: "Arpan Mandal",
    leaveType: "Privilege Leave",
    startDate: "2026-11-27",
    endDate: "2026-11-28",
    daysCount: 2,
    duration: "Full Day",
    reason: "Family wedding and personal travel to hometown.",
    appliedOn: "2026-11-12",
    status: "Pending",
    managerName: "Sathursan Kamalanathan",
    managerRemarks: ""
  },
  {
    id: "LV-2026-003",
    employeeId: "SYM007",
    employeeName: "Nidhi Rathore",
    leaveType: "Sick Leave",
    startDate: "2026-11-10",
    endDate: "2026-11-10",
    daysCount: 1,
    duration: "Full Day",
    reason: "Severe viral fever and doctor visit.",
    appliedOn: "2026-11-09",
    status: "Approved",
    managerName: "Trisha Ghosh",
    managerRemarks: "Approved. Take care and get well soon."
  },
  {
    id: "LV-2026-004",
    employeeId: "SYM008",
    employeeName: "Manju Kushwaha",
    leaveType: "SarlaYash Blessings Leave",
    startDate: "2026-11-18",
    endDate: "2026-11-18",
    daysCount: 1,
    duration: "Full Day",
    reason: "Community social service drive and spiritual study camp.",
    appliedOn: "2026-11-13",
    status: "Approved",
    managerName: "Trisha Ghosh",
    managerRemarks: "Wonderful cause. Approved with Blessings."
  },
  {
    id: "LV-2026-005",
    employeeId: "SYM006",
    employeeName: "Abhishek Kaundal",
    leaveType: "Casual Leave",
    startDate: "2026-11-24",
    endDate: "2026-11-25",
    daysCount: 2,
    duration: "Full Day",
    reason: "Personal banking and urgent domestic maintenance.",
    appliedOn: "2026-11-15",
    status: "Pending",
    managerName: "Sathursan Kamalanathan",
    managerRemarks: ""
  }
];

export const INITIAL_ATTENDANCE = [
  // Today's attendance seed records
  {
    id: "ATT-TODAY-01",
    employeeId: "SYM001",
    employeeName: "Kapil Narula",
    date: "2026-11-16",
    checkIn: "08:45 AM",
    checkOut: null,
    workMode: "Office - Executive Suite",
    status: "Present",
    notes: "Leadership strategy alignment & vision review."
  },
  {
    id: "ATT-TODAY-02",
    employeeId: "SYM002",
    employeeName: "Sathursan Kamalanathan",
    date: "2026-11-16",
    checkIn: "09:02 AM",
    checkOut: null,
    workMode: "Office",
    status: "Present",
    notes: "Q4 Roadmap sprint planning & engineering sync."
  },
  {
    id: "ATT-TODAY-03",
    employeeId: "SYM003",
    employeeName: "Trisha Ghosh",
    date: "2026-11-16",
    checkIn: "09:12 AM",
    checkOut: null,
    workMode: "Office",
    status: "Present",
    notes: "POSH workshop briefing & talent performance check."
  },
  {
    id: "ATT-TODAY-04",
    employeeId: "SYM004",
    employeeName: "Amber Khanum",
    date: "2026-11-16",
    checkIn: "09:20 AM",
    checkOut: null,
    workMode: "Office - AI Lab",
    status: "Present",
    notes: "Shooting episode 14 of AI Ladder With Kapil."
  },
  {
    id: "ATT-TODAY-05",
    employeeId: "SYM005",
    employeeName: "Arpan Mandal",
    date: "2026-11-16",
    checkIn: "09:25 AM",
    checkOut: null,
    workMode: "Remote / Work From Home",
    status: "Present",
    notes: "DSA Trees & Graphs live session preparation."
  },
  {
    id: "ATT-TODAY-06",
    employeeId: "SYM006",
    employeeName: "Abhishek Kaundal",
    date: "2026-11-16",
    checkIn: "09:28 AM",
    checkOut: null,
    workMode: "Office",
    status: "Present",
    notes: "Security testing and server audit."
  },
  {
    id: "ATT-TODAY-07",
    employeeId: "SYM007",
    employeeName: "Nidhi Rathore",
    date: "2026-11-16",
    checkIn: "09:15 AM",
    checkOut: null,
    workMode: "Office",
    status: "Present",
    notes: "Aptitude question vault generation for students."
  },
  {
    id: "ATT-TODAY-08",
    employeeId: "SYM008",
    employeeName: "Manju Kushwaha",
    date: "2026-11-16",
    checkIn: "09:35 AM",
    checkOut: null,
    workMode: "Office",
    status: "Late Mark",
    notes: "Traffic jam; POSH case study curation."
  },
  {
    id: "ATT-TODAY-09",
    employeeId: "SYM009",
    employeeName: "Tarunika A",
    date: "2026-11-16",
    checkIn: "09:18 AM",
    checkOut: null,
    workMode: "Remote / Work From Home",
    status: "Present",
    notes: "Verbal communication & interview scripts formulation."
  },
  {
    id: "ATT-TODAY-10",
    employeeId: "SYM010",
    employeeName: "Madhumita Adak",
    date: "2026-11-16",
    checkIn: "09:10 AM",
    checkOut: null,
    workMode: "Office",
    status: "Present",
    notes: "Student placement drive coordination."
  }
];

export const INITIAL_HOLIDAYS_AND_EVENTS = [
  { id: "EV-01", date: "2026-01-26", title: "Republic Day", type: "Holiday", color: "red" },
  { id: "EV-02", date: "2026-03-04", title: "Holi - Festival of Colors", type: "Holiday", color: "red" },
  { id: "EV-03", date: "2026-04-14", title: "Dr. B.R. Ambedkar Jayanti", type: "Holiday", color: "red" },
  { id: "EV-04", date: "2026-05-01", title: "Labor Day / Spring Festival", type: "Holiday", color: "red" },
  { id: "EV-05", date: "2026-08-15", title: "Independence Day", type: "Holiday", color: "red" },
  { id: "EV-06", date: "2026-10-02", title: "Gandhi Jayanti", type: "Holiday", color: "red" },
  { id: "EV-07", date: "2026-11-08", title: "Diwali - Festival of Lights", type: "Holiday", color: "red" },
  { id: "EV-08", date: "2026-11-16", title: "Today: Q4 Sprint Review & Tech Demo", type: "Company Event", color: "gold" },
  { id: "EV-09", date: "2026-11-20", title: "AI Ladder Live Masterclass (with Kapil & Amber)", type: "Live Broadcast", color: "cyan" },
  { id: "EV-10", date: "2026-11-25", title: "SarlaYash Blessings Fellowship Showcase", type: "Milestone", color: "purple" },
  { id: "EV-11", date: "2026-12-05", title: "SarlaYash Foundation Annual Gala 2026", type: "Company Event", color: "gold" },
  { id: "EV-12", date: "2026-12-25", title: "Christmas Day", type: "Holiday", color: "red" }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ANN-001",
    title: "✨ Welcome to SarlaYash Universe ERP & Blessings Earning Portal!",
    author: "Kapil Narula (Founder)",
    date: "2026-11-15",
    category: "Founder's Vision",
    priority: "High",
    content: "Welcome team to the next-generation SarlaYash Enterprise ERP. As we scale the SarlaYash Universe across our channels, institutions, and learners, this portal empowers each of you to track attendance, manage leaves, amplify our content reach, and earn life-changing rewards under our SarlaYash Blessings Internships & Earning Model: 'Choose your target. Create the impact. Prove the results. Earn your reward.' Let us build with unyielding dedication!"
  },
  {
    id: "ANN-002",
    title: "📈 Q4 Channel Growth & Content Publishing Guidelines",
    author: "Sathursan Kamalanathan (CEO)",
    date: "2026-11-12",
    category: "Operations",
    priority: "Medium",
    content: "Kudos to Amber for scaling 'AI Ladder 🪜 With Kapil' past 96K subscribers! Please ensure all solution engineers submit weekly channel performance telemetry every Friday before 6:00 PM."
  },
  {
    id: "ANN-003",
    title: "🛡️ POSH Awareness Week & Safe Workplace Commitment",
    author: "Trisha Ghosh (CPO)",
    date: "2026-11-10",
    category: "People & Culture",
    priority: "High",
    content: "In alignment with 'Mysteries Of POSH With Kapil', SarlaYash upholds a zero-tolerance policy against any form of harassment. Our Internal Complaints Committee (ICC) is at your service 24x7. Access our full policy in the Knowledge Base."
  }
];

export const INITIAL_EARNING_TARGETS = [
  {
    id: "EARN-01",
    employeeEcode: "SYM004",
    employeeName: "Amber Khanum",
    targetTitle: "AI Ladder YouTube 100K Subscribers Milestone",
    category: "Channel Growth & EdTech Impact",
    targetImpactMetric: "100,000 Subscribers & 1M Views",
    currentProgress: 96400,
    targetValue: 100000,
    unit: "Subscribers",
    rewardTier: "Diamond Champion",
    rewardAmount: "₹50,000 Special Bonus + Gold Crest",
    proofSubmitted: "https://www.youtube.com/@AILadderWithKapil (Analytics submitted)",
    status: "In Progress (96.4%)",
    deadline: "2026-12-15"
  },
  {
    id: "EARN-02",
    employeeEcode: "SYM005",
    employeeName: "Arpan Mandal",
    targetTitle: "DSA Masterclass Problem Repository (100 Optimal Solutions)",
    category: "Technical Curriculum",
    targetImpactMetric: "100 High-Quality DSA Video Walkthroughs",
    currentProgress: 88,
    targetValue: 100,
    unit: "Walkthroughs",
    rewardTier: "Gold Innovator",
    rewardAmount: "₹35,000 Incentive",
    proofSubmitted: "GitHub: sarlayash-dsa-vault/commit-tree",
    status: "In Progress (88%)",
    deadline: "2026-11-30"
  },
  {
    id: "EARN-03",
    employeeEcode: "SYM007",
    employeeName: "Nidhi Rathore",
    targetTitle: "Industry Aptitude Test Engine (5000 Active Student Assessments)",
    category: "EdTech Platform",
    targetImpactMetric: "5,000 Students Assessed with >90% satisfaction",
    currentProgress: 5000,
    targetValue: 5000,
    unit: "Students",
    rewardTier: "Diamond Champion",
    rewardAmount: "₹45,000 Reward Approved",
    proofSubmitted: "https://assessments.sarlayash.org/reports/q3",
    status: "Verified & Rewarded 🎉",
    deadline: "2026-11-10"
  },
  {
    id: "EARN-04",
    employeeEcode: "SYM006",
    employeeName: "Abhishek Kaundal",
    targetTitle: "Cyber IQ Practical Labs & Penetration Testing Demos",
    category: "Cybersecurity Training",
    targetImpactMetric: "25 Hands-on CTF Sandbox Modules",
    currentProgress: 20,
    targetValue: 25,
    unit: "Modules",
    rewardTier: "Silver Achiever",
    rewardAmount: "₹25,000 Reward",
    proofSubmitted: "Labs environment deployed on cloud sandbox",
    status: "In Progress (80%)",
    deadline: "2026-12-01"
  }
];

export const COMPANY_POLICIES = [
  {
    id: "POL-01",
    title: "SarlaYash Code of Professional Excellence",
    category: "Core Values",
    summary: "Integrity, learner-first mindset, intellectual honesty, and extreme ownership across all projects.",
    lastUpdated: "2026-10-01"
  },
  {
    id: "POL-02",
    title: "Prevention of Sexual Harassment (POSH) Enterprise Policy",
    category: "Workplace Safety & Compliance",
    summary: "Comprehensive guidelines ensuring a respectful, safe, inclusive workplace for every gender, guided by 'Mysteries Of POSH With Kapil'.",
    lastUpdated: "2026-09-15"
  },
  {
    id: "POL-03",
    title: "Attendance & Flexible Hybrid Working Hours",
    category: "HR & Operations",
    summary: "Core collaboration window: 09:30 AM to 06:30 PM. Daily punch-in required. 2 Work-From-Home days permitted per week upon manager intimation.",
    lastUpdated: "2026-10-15"
  },
  {
    id: "POL-04",
    title: "SarlaYash Blessings Leave & Reward Entitlement",
    category: "Blessings & Wellness",
    summary: "3 days of paid Blessings Leave annually for community service, spiritual retreats, or personal renewal without deduction from casual quota.",
    lastUpdated: "2026-10-20"
  }
];
