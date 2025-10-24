import {
  IconLayoutDashboard,
  IconMicrophone,
  IconChartBar,
  IconFileText,
  IconPalette,
  IconPhone,
  IconMessage,
  IconMail,
  IconCalendar,
  IconLock,
  IconSettings,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";

const Menuitems = [
  {
    navlabel: true,
    subheader: "MAIN",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "AI FEATURES",
  },
  {
    id: "voice-types",
    title: "Voice Types",
    icon: IconMicrophone,
    href: "/voice-types",
    locked: true,
  },
  {
    id: "email-management",
    title: "Email Management",
    icon: IconMail,
    href: "/email-management",
  },
  {
    id: "appointments",
    title: "Appointments",
    icon: IconCalendar,
    href: "/appointments",
  },
  {
    navlabel: true,
    subheader: "ANALYTICS & REPORTS",
  },
  {
    id: "performance-analytics",
    title: "Performance Analytics",
    icon: IconChartBar,
    href: "/performance-analytics",
  },
  {
    id: "reports",
    title: "Reports",
    icon: IconFileText,
    href: "/reports",
  },
  {
    navlabel: true,
    subheader: "RECORDINGS & TRANSCRIPTS",
  },
  {
    id: "call-recordings",
    title: "Call Recordings",
    icon: IconPhone,
    href: "/call-recordings",
    locked: true,
  },
  {
    id: "chat-transcripts",
    title: "Chat Transcripts",
    icon: IconMessage,
    href: "/chat-transcripts",
  },
  {
    navlabel: true,
    subheader: "SETTINGS",
  },
  {
    id: "theme-customization",
    title: "Theme Customization",
    icon: IconPalette,
    href: "/theme-customization",
  },
  {
    navlabel: true,
    subheader: "AUTH",
  },
  {
    id: "login",
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: "register",
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
];

export default Menuitems;


