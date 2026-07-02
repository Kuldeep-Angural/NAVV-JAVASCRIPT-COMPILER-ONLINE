import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import BugReportIcon from '@mui/icons-material/BugReport';
import DifferenceIcon from '@mui/icons-material/Difference';
import HtmlIcon from '@mui/icons-material/Html';
import JavascriptIcon from '@mui/icons-material/Javascript';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import DrawIcon from '@mui/icons-material/Draw';
export const FONT_SIZES = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
export const THEMES = ['vs-dark', 'light', 'hc-black', 'vs', 'hc-light', 'high-contrast'];
export const STORAGE_KEY = 'source-code';

export const INSTAGRAM_LINK = 'https://www.instagram.com/kul_frames?igsh=MWhsYjZoM28yYm1wOA%3D%3D&utm_source=qr';
export const FACEBOOK_LINK = 'https://www.facebook.com/share/18mtNbHFCj/?mibextid=wwXIfr';
export const SNAPCHAT_LINK = 'https://snapchat.com/t/GmakICEN';
export const LINKEDIN_LINK = 'https://www.linkedin.com/in/kuldeep-angural-485a13252?utm_source=share_via&utm_content=profile&utm_medium=member_ios';
export const STATIC_CODE_SNIPPET = `// Welcome to NavvJS - Online JavaScript Compiler
// This is a simple JavaScript code snippet to get you started.

function greet(name) {
  return \`Hello, \${name}!\`;
}

const userName = 'World';
console.log(greet(userName)); // Output: Hello, World!
`;

export const PRODUCTS_LIST = [
  {
    title: 'JS Compiler',
    description: 'Write, execute and debug JavaScript instantly with a fast online compiler.',
    icon: <JavascriptIcon sx={{ fontSize: 50 }} />,
    color: '#F7DF1E',
    link: '/jscompiler',
  },
  {
    title: 'HTML Previewer',
    description: 'Create beautiful HTML pages with live preview support and instant rendering.',
    icon: <HtmlIcon sx={{ fontSize: 50 }} />,
    color: '#E44D26',
    link: '/htmlcompiler',
  },
  {
    title: 'JSON Diff',
    description: 'Compare two JSON objects visually and identify changes within seconds.',
    icon: <DifferenceIcon sx={{ fontSize: 50 }} />,
    color: '#4CAF50',
    link: '/jsondiff',
  },
  {
    title: 'NotePad',
    description: 'Create and edit text files with a simple and intuitive interface.',
    icon: <DrawIcon sx={{ fontSize: 50 }} />,
    color: '#4CAF50',
    link: '/notepad',
  },
];

export const FEATURES_LIST = [
  {
    title: 'AI Code Generation',
    icon: <PsychologyIcon color="primary" />,
    desc: 'Generate production-ready code from natural language prompts.',
  },
  {
    title: 'AI Bug Fixes',
    icon: <BugReportIcon color="primary" />,
    desc: 'Automatically detect errors and receive intelligent fixes.',
  },
  {
    title: 'Code Refactoring',
    icon: <AutoFixHighIcon color="primary" />,
    desc: 'Improve readability, maintainability and performance with one click.',
  },
  {
    title: 'Lightning Fast',
    icon: <SpeedIcon color="primary" />,
    desc: 'Instant compilation and live previews for rapid development.',
  },

  {
    title: 'Secure',
    icon: <SecurityIcon color="primary" />,
    desc: 'Run and manage code in a secure environment.',
  },
  {
    title: 'AI Code Explanation',
    icon: <MenuBookIcon color="primary" />,
    desc: 'Understand complex code instantly with clear, AI-generated explanations.',
  },
];

export const NOTEPAD_LANGUAGES = [
  { label: 'Plain Text', value: 'plaintext' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'HTML', value: 'html' },
  { label: 'XML', value: 'xml' },
  { label: 'YAML', value: 'yaml' },
];
