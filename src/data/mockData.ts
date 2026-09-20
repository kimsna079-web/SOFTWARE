import { FeatureModule, WorkflowStep, PricingPlan, Testimonial, FaqItem, SpecRow } from '../types';

export const CORE_MODULES: FeatureModule[] = [
  {
    id: 'full-verify',
    title: 'Full Verify Registration',
    badge: { text: 'HOT', variant: 'hot' },
    icon: 'fa-solid fa-user-plus',
    description: 'Generate authentic, phone-verified accounts instantly. Handles everything from global OTP extraction to automatic cookie acceptance without lifting a finger.',
    tags: ['Phone OTP', 'Auto Cookie', 'Multi-Country', 'Post-Reg Setup'],
    color: '#ef4444',
    lightBg: 'rgba(239, 68, 68, 0.08)',
    fullDetails: [
      'Automatic virtual number acquisition via SMS APIs (SMS-Man, 5Sim, etc.)',
      'Real-time OTP extraction and instant injection with zero timeouts',
      'Headless and headful multi-browser spoofing with modern browser fingerprints',
      'Automatic 2FA secret generator and cookie persistence in JSON format'
    ]
  },
  {
    id: 'no-verify',
    title: 'No Verify Registration',
    badge: undefined,
    icon: 'fa-solid fa-user-shield',
    description: 'Scale your campaigns instantly. Create high-volume accounts rapidly using email or custom data without needing phone verification.',
    tags: ['Email Based', 'High Volume', 'Custom Data', 'Fast Speed'],
    color: '#2563eb',
    lightBg: 'rgba(37, 99, 235, 0.08)',
    fullDetails: [
      'Rapid bulk account creation with temporary or domain webmail accounts',
      'Automated confirmation email inbox monitoring and token validation',
      'High-speed throughput designed for rapid tier-1 testing and warm-up funnels',
      'Clean IP rotation per session to avoid temporary IP rate limits'
    ]
  },
  {
    id: 'profile-builder',
    title: 'Smart Profile Builder',
    badge: { text: 'PRO', variant: 'pro' },
    icon: 'fa-solid fa-images',
    description: 'Make every account look 100% human. Automatically sets avatars, cover photos, bios, relationships, and education details in seconds.',
    tags: ['Avatar Upload', 'Cover Photo', 'Bio & City', 'Education'],
    color: '#8b5cf6',
    lightBg: 'rgba(139, 92, 246, 0.08)',
    fullDetails: [
      'Randomized AI human avatar matching appropriate age and gender settings',
      'Unique high-res cover photos with randomized metadata stripping (EXIF wipe)',
      'Localized bio generation, workplace, high school, university, and hometown',
      'Privacy settings tuning (friends-only or public defaults configurable)'
    ]
  },
  {
    id: 'page-creation',
    title: 'Page Creation Automation',
    badge: { text: 'NEW', variant: 'new' },
    icon: 'fa-brands fa-facebook',
    description: 'Launch business pages on autopilot. Fills names, categories, and bios across multiple accounts simultaneously via stealth desktop mode.',
    tags: ['Desktop Mode', 'Custom Names', 'Auto-Select', 'Bulk Pages'],
    color: '#10b981',
    lightBg: 'rgba(16, 185, 129, 0.08)',
    fullDetails: [
      'Simultaneous multi-page spawning across designated healthy parent accounts',
      'Niche category matching, category auto-complete and description templates',
      'Stealth desktop canvas simulation that passes Facebook behavioral checks',
      'Instant extraction of Page ID, access token, and vanity URLs'
    ]
  },
  {
    id: 'active-interaction',
    title: 'Active Interaction Mode',
    badge: undefined,
    icon: 'fa-solid fa-hand-pointer',
    description: 'Warm up accounts seamlessly. Drives organic engagement through automated reactions, comments, and feed scrolling with smart cookie fallback.',
    tags: ['Auto React', 'Cookie Login', 'Smart Fallback', 'Live Status'],
    color: '#f59e0b',
    lightBg: 'rgba(245, 158, 11, 0.08)',
    fullDetails: [
      'Human-like mouse curves, variable scroll speeds, and reading pauses',
      'Organic feed interactions (Love, Like, Care reactions with randomized intervals)',
      'Video watching duration simulation with sound toggle variation',
      'Direct cookie authentication eliminating repeated password prompts'
    ]
  },
  {
    id: 'proxy-system',
    title: 'Proxy & Multi-Window System',
    badge: undefined,
    icon: 'fa-solid fa-network-wired',
    description: 'Run multiple isolated browser windows concurrently. Assign dedicated HTTP/SOCKS5 proxies to each account in an organized grid layout.',
    tags: ['HTTP/SOCKS5', 'Per-Account', '5–20 Windows', 'Grid Arrange'],
    color: '#6366f1',
    lightBg: 'rgba(99, 102, 241, 0.08)',
    fullDetails: [
      'Support for Residential, Mobile (4G/5G rotating), Datacenter, and ISP proxies',
      'Individual canvas, WebGL, WebRTC, audio fingerprint, and timezone isolation',
      'Automatic auto-arrange grid on monitors for live multi-window inspection',
      'Live ping and geo-location health check before launching browser profile'
    ]
  },
  {
    id: 'bulk-import',
    title: 'Bulk Import — CSV, TXT, Excel',
    badge: undefined,
    icon: 'fa-solid fa-file-excel',
    description: 'Import your entire database in one click. Fully supports CSV, TXT, and Excel formats along with cookie column integration.',
    tags: ['CSV / TXT', 'Excel .xlsx', 'Cookie Column', 'One-Click'],
    color: '#ec4899',
    lightBg: 'rgba(236, 72, 153, 0.08)',
    fullDetails: [
      'Multi-column mapping wizard for names, birthdays, emails, numbers, passwords',
      'Support for Base64 cookies and JSON cookie arrays',
      'Smart deduplication and syntax validation prior to queue insertion'
    ]
  },
  {
    id: 'live-dashboard',
    title: 'Live Results Dashboard',
    badge: undefined,
    icon: 'fa-solid fa-chart-bar',
    description: 'Track every move in real time. Monitor step-by-step progress visually, review detailed logs, and export finished accounts to CSV instantly.',
    tags: ['Real-Time', 'Step Indicators', 'CSV Export', 'Log Viewer'],
    color: '#14b8a6',
    lightBg: 'rgba(20, 184, 166, 0.08)',
    fullDetails: [
      'Live execution log stream with color-coded info, warning, and success levels',
      'One-click export of registered accounts with full credentials and cookies',
      'Per-thread completion timers and success-rate analytics graphs'
    ]
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Configure',
    description: 'Choose your module, add proxies, and configure settings for your campaign.'
  },
  {
    step: 2,
    title: 'Import & Setup',
    description: 'Import your number list, account list, or Excel file. Configure profile photos and page names.'
  },
  {
    step: 3,
    title: 'Start Automation',
    description: 'Hit Start — multiple real Chrome browsers open automatically and begin working in the background.'
  },
  {
    step: 4,
    title: 'Monitor & Export',
    description: 'Watch live results in the dashboard. Export completed account data to CSV and use immediately.'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-1m',
    name: '1 Month License',
    price: '10',
    cents: '.00',
    billingPeriod: '$10.00/mo • Full Access',
    perMonth: '$10.00/mo',
    features: [
      'Full Verify Registration',
      'No Verify Registration',
      'Smart Profile Builder',
      'Page Creation',
      'Active Interaction Mode',
      'Multi-Window System',
      'Premium Support'
    ],
    whatsappText: 'Hi! I want to purchase PRO•SAN 1 Month'
  },
  {
    id: 'plan-3m',
    name: '3 Month License',
    price: '24',
    cents: '.99',
    billingPeriod: '$8.33/mo • Full Access',
    perMonth: '$8.33/mo',
    saveBadge: 'Save 17%',
    popular: true,
    features: [
      'All Features Included',
      'Full Verify Registration',
      'Smart Profile Builder',
      'Page Creation',
      'Active Interaction Mode',
      'Multi-Window System',
      'Premium Support'
    ],
    whatsappText: 'Hi! I want to purchase PRO•SAN 3 Month'
  },
  {
    id: 'plan-1y',
    name: '1 Year License',
    price: '84',
    cents: '.99',
    billingPeriod: '$7.08/mo • Full Access',
    perMonth: '$7.08/mo',
    saveBadge: 'Save 29%',
    features: [
      'All Features Included',
      'Full Verify Registration',
      'Smart Profile Builder',
      'Page Creation',
      'Active Interaction Mode',
      'Multi-Window System',
      '1 Full Year Priority Support'
    ],
    whatsappText: 'Hi! I want to purchase PRO•SAN 1 Year'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    quote: 'PRO•SAN completely changed my Facebook marketing workflow. I used to manually create 5 accounts a day — now I run 50+ overnight without a single issue.',
    name: 'Ahmed R.',
    role: 'Digital Marketer, Lahore',
    avatarLetter: 'A',
    stars: 5
  },
  {
    id: 'testi-2',
    quote: 'The Profile Builder is excellent — accounts look genuinely human. The Active Interaction module does a great job warming them up. Highly recommended.',
    name: 'Zaheer K.',
    role: 'SMM Agency Owner, Karachi',
    avatarLetter: 'Z',
    stars: 5
  },
  {
    id: 'testi-3',
    quote: 'The proxy integration and multi-window system are top-notch. I run 10 windows simultaneously and everything is smooth. Support is also very quick to respond.',
    name: 'Usman M.',
    role: 'FB Account Seller, Islamabad',
    avatarLetter: 'U',
    stars: 5
  }
];

export const MIN_SPECS: SpecRow[] = [
  { label: 'Operating System', value: 'Windows 10 (64-bit)', highlight: true },
  { label: 'Processor', value: 'Intel Core i3 / AMD Ryzen 3' },
  { label: 'Memory (RAM)', value: '8 GB' },
  { label: 'Storage', value: '200 MB available' },
  { label: 'Internet', value: 'Stable broadband' }
];

export const REC_SPECS: SpecRow[] = [
  { label: 'Operating System', value: 'Windows 11 (64-bit)', highlight: true },
  { label: 'Processor', value: 'Intel Core i5 / AMD Ryzen 5' },
  { label: 'Memory (RAM)', value: '12 GB' },
  { label: 'Storage', value: '1 GB available' },
  { label: 'Internet', value: 'High-speed broadband' }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Is PRO•SAN safe to use? Will Facebook ban my account?',
    answer: 'PRO•SAN uses advanced safety protocols, random delays, human-like mouse curves, and modern browser fingerprint masking. Over 500+ users run it safely every day. Using high-quality residential or mobile rotating proxies is always recommended for maximum longevity.'
  },
  {
    id: 'faq-2',
    question: 'Do you provide customer support?',
    answer: 'Absolutely! We offer direct live WhatsApp support, video tutorials, and a comprehensive knowledge base. Premium support response time is under 2 hours during active business hours.'
  },
  {
    id: 'faq-3',
    question: "What if I'm not tech-savvy? Is it easy to set up?",
    answer: 'PRO•SAN is designed for everyone — no coding or technical skills required. Our intuitive setup wizard guides you step-by-step in under 10 minutes. We also provide free AnyDesk/TeamViewer screen-sharing assistance if needed.'
  },
  {
    id: 'faq-4',
    question: 'How many accounts can be created per day?',
    answer: 'There is no hard software limit. It depends entirely on your PC specifications, number of simultaneous threads, and proxy bandwidth. With an i5/Ryzen 5 and 10 active browser windows, 500 to 1,000+ accounts per day is easily achievable.'
  },
  {
    id: 'faq-5',
    question: 'Where do I get phone numbers for registration?',
    answer: 'You can integrate virtual numbers from top SMS provider APIs (such as SMS-Man, 5Sim, OnlineSIM, or DaisySMS). The tool automatically requests numbers, receives incoming OTP codes, and validates them hands-free.'
  },
  {
    id: 'faq-6',
    question: 'Does it work on Mac or Linux?',
    answer: 'Currently, PRO•SAN is compiled natively for Windows 10/11 (64-bit). If you use Mac or Linux, you can run it smoothly inside Parallels Desktop, VMware, or on a cost-effective Windows Server VPS for 24/7 autonomous uptime.'
  },
  {
    id: 'faq-7',
    question: 'Is there a refund policy?',
    answer: 'All license sales are strictly non-refundable due to the digital software delivery model. We provide comprehensive one-on-one setup support via WhatsApp to guarantee you are completely configured and running successfully.'
  }
];
