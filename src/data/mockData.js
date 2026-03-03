
import { 
  FaTachometerAlt,
  FaProjectDiagram,
  FaSearch,
  FaCalendarAlt,
  FaBell,
  FaCog,
  FaHeadset
} from "react-icons/fa";

import { MdOutlineDashboardCustomize, MdOutlineCalendarToday, MdNotificationsNone, MdOutlineSettings, MdHelpOutline } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: MdOutlineDashboardCustomize },
  { id: 'projects', label: 'Projects', icon: BsClipboardCheck },
  { id: 'scans', label: 'Scans', icon:  GrDocumentText },
  { id: 'schedule', label: 'Schedule', icon: MdOutlineCalendarToday },
  { id: 'notifications', label: 'Notifications', icon: MdNotificationsNone },
  { id: 'settings', label: 'Settings', icon: MdOutlineSettings },
  { id: 'support', label: 'Support', icon: MdHelpOutline },
];

export const STATUS_ORDER = ['All', 'Completed', 'Scheduled', 'Failed'];

export const INITIAL_SCAN_ROWS = [
  {
    id: 'scan-001',
    name: 'Web App Servers',
    type: 'Greybox',
    status: 'Completed',
    progress: 100,
    vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
    lastScan: '4d ago',
  },
  {
    id: 'scan-002',
    name: 'Payment API',
    type: 'Greybox',
    status: 'Completed',
    progress: 100,
    vulnerabilities: { critical: 3, high: 8, medium: 13, low: 10 },
    lastScan: '1d ago',
  },
  {
    id: 'scan-003',
    name: 'Identity Service',
    type: 'Greybox',
    status: 'Completed',
    progress: 100,
    vulnerabilities: { critical: 2, high: 5, medium: 14, low: 21 },
    lastScan: '2d ago',
  },
  {
    id: 'scan-004',
    name: 'Public Gateway',
    type: 'Greybox',
    status: 'Completed',
    progress: 100,
    vulnerabilities: { critical: 1, high: 6, medium: 9, low: 17 },
    lastScan: '6h ago',
  },
  {
    id: 'scan-005',
    name: 'Admin Portal',
    type: 'Greybox',
    status: 'Scheduled',
    progress: 0,
    vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
    lastScan: 'Queued',
  },
  {
    id: 'scan-006',
    name: 'IoT Device Fleet',
    type: 'Blackbox',
    status: 'Failed',
    progress: 10,
    vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 },
    lastScan: '3d ago',
  },
  {
    id: 'scan-007',
    name: 'Temp Data Processor',
    type: 'Blackbox',
    status: 'Failed',
    progress: 10,
    vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 },
    lastScan: '3d ago',
  },
  {
    id: 'scan-008',
    name: 'Internal CRM',
    type: 'Greybox',
    status: 'Completed',
    progress: 100,
    vulnerabilities: { critical: 4, high: 7, medium: 16, low: 11 },
    lastScan: '5h ago',
  },
  {
    id: 'scan-009',
    name: 'Vendor Integrations',
    type: 'Greybox',
    status: 'Scheduled',
    progress: 0,
    vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
    lastScan: 'Tomorrow',
  },
];

export const FINDINGS = [
  {
    id: 'finding-1',
    severity: 'Critical',
    time: '10:45:23',
    title: 'SQL Injection in Authentication Endpoint',
    endpoint: '/api/users/profile',
    description:
      'Time-based blind SQL injection confirmed on user-controlled input during authentication flow.',
  },
  {
    id: 'finding-2',
    severity: 'High',
    time: '10:46:12',
    title: 'Unauthorized Access to User Metadata',
    endpoint: '/api/auth/login',
    description:
      'Authenticated low-privilege user was able to access metadata of other users. Access control checks are missing.',
  },
  {
    id: 'finding-3',
    severity: 'Medium',
    time: '10:47:41',
    title: 'Broken Authentication Rate Limiting',
    endpoint: '/api/search',
    description: 'No effective rate limiting detected on login attempts. Automated brute-force attempts remain possible.',
  },
];

export const ACTIVITY_LOG = [
  {
    id: 'a1',
    timestamp: '09:00:00',
    text: "I will begin a systematic penetration test on helpdesk.democorp.com. Let me start with reconnaissance and enumeration.",
    highlights: ['helpdesk.democorp.com'],
  },
  {
    id: 'a2',
    timestamp: '09:01:00',
    text: 'Good! target is online. Now let me perform port scanning to identify running services.',
    highlights: [],
  },
  {
    id: 'a3',
    timestamp: '09:02:00',
    text: 'Excellent reconnaissance results: Apache httpd 2.4.65 on port 80 (web server). Let me probe the web server first to understand its structure.',
    highlights: ['Apache httpd 2.4.65'],
  },
  {
    id: 'a4',
    timestamp: '09:03:00',
    text: 'Great! I found a login page for a Help Desk Platform. I can see a useful comment: TODO: Delete the testing account (test:test).',
    highlights: ['TODO: Delete the testing account', 'test:test'],
  },
  {
    id: 'a5',
    timestamp: '09:04:00',
    text: 'The POST method is not allowed on /password/test. Let me check what the JavaScript does. It posts to / which means the current page.',
    highlights: ['/password/test'],
  },
  {
    id: 'a6',
    timestamp: '09:05:00',
    text: 'It redirects back to /password/test. Let me check if there is an /api endpoint or look for other paths. Let me also try exploring with the test:test password directly on other endpoints.',
    highlights: ['/api', 'test:test'],
  },
  {
    id: 'a7',
    timestamp: '09:06:00',
    text: "Great! I can access the dashboard using the X-UserId: 10032 header. This suggests an IDOR vulnerability. I can access any user's dashboard by changing the X-UserId header.",
    highlights: ['X-UserId: 10032', 'IDOR vulnerability'],
  },
];

export const VERIFICATION_LOG = [
  {
    id: 'v1',
    timestamp: '09:08:20',
    text: 'Replaying payload set against /api/users/profile with randomized timing probes.',
    highlights: ['/api/users/profile'],
  },
  {
    id: 'v2',
    timestamp: '09:09:50',
    text: 'Loop 3/10 confirmed deterministic latency deltas on sleep-based SQL payloads.',
    highlights: ['Loop 3/10', 'SQL payloads'],
  },
  {
    id: 'v3',
    timestamp: '09:11:02',
    text: 'Verification complete. Marking exploitability confidence as high and attaching evidence artifacts.',
    highlights: ['exploitability confidence as high'],
  },
];
