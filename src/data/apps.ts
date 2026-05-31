export interface AppChangelog {
  version: string;
  date: string;
  notes: string[];
}

export interface AndroidApp {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  iconGradient: string; // Gradient class or css styles
  iconSvg: string;       // Custom inline SVG path for clean presentation
  version: string;
  size: string;
  releaseDate: string;
  playStoreUrl: string;
  apkUrl: string;
  category: string;
  accentColor: string;  // Hex or HSL color for page decoration
  features: string[];
  specs: {
    minSdk: string;
    targetSdk: string;
    architecture: string;
    permissions: string[];
  };
  changelog: AppChangelog[];
}

export const androidApps: AndroidApp[] = [
  {
    id: "aether-player",
    slug: "aether-player",
    title: "Aether Player",
    tagline: "High-Fidelity Audio Engine & Fluid Gestures",
    description: "An elegant, minimalist audio player crafted for music purists. Features a powerful custom audio engine, high-fidelity equalizer, and rich modern design.",
    longDescription: "Aether Player redefines local music playback on Android. Built with a custom low-latency C++ audio engine, it offers pixel-perfect visualizations, gapless playback, and a clean, clutter-free user experience. Aether bypasses Android's default audio mixer, ensuring bit-perfect output up to 24-bit/192kHz audio. With customizable themes, glassmorphism UI layouts, and seamless gestures, managing your music library becomes an art form.",
    iconGradient: "linear-gradient(135deg, #00f5ff 0%, #7b2cbf 100%)",
    iconSvg: "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z", // SVG music note
    version: "2.4.1",
    size: "14.2 MB",
    releaseDate: "2026-04-12",
    playStoreUrl: "https://play.google.com/store/apps/details?id=tech.salev.aetherplayer",
    apkUrl: "https://salev.tech/downloads/aether-player-v2.4.1.apk",
    category: "Music & Audio",
    accentColor: "hsl(190, 100%, 50%)",
    features: [
      "24-bit Bit-Perfect audio playback support.",
      "10-band hardware-accelerated parametric equalizer.",
      "Dynamic glassmorphism UI with interactive player theme options.",
      "Smart casting to DLNA/Chromecast devices with zero latency.",
      "Offline lyrics integration with automated metadata scraping."
    ],
    specs: {
      minSdk: "Android 8.0 (API 26)",
      targetSdk: "Android 14 (API 34)",
      architecture: "arm64-v8a, armeabi-v7a, x86_64",
      permissions: [
        "READ_EXTERNAL_STORAGE",
        "READ_MEDIA_AUDIO",
        "FOREGROUND_SERVICE",
        "INTERNET"
      ]
    },
    changelog: [
      {
        version: "2.4.1",
        date: "2026-05-10",
        notes: [
          "Fixed a potential crash during casting initialization.",
          "Optimized audio rendering engine for 20% lower battery consumption.",
          "Updated UI transitions to support Android 14 dynamic back gesture."
        ]
      },
      {
        version: "2.4.0",
        date: "2026-04-12",
        notes: [
          "Major rewrite of the C++ playback core.",
          "Added parametric EQ engine.",
          "Redesigned player queue management screen."
        ]
      }
    ]
  },
  {
    id: "nova-vault",
    slug: "nova-vault",
    title: "Nova Vault",
    tagline: "Zero-Knowledge Biometric Encryption",
    description: "An ultra-secure, decentralized vault to safeguard your files, sensitive notes, and login credentials utilizing military-grade AES-256 GCM encryption.",
    longDescription: "Nova Vault puts file security back in your hands. Using a Zero-Knowledge proof mechanism, your files are encrypted locally on your device before they touch any cloud interface or secondary memory. Even if your device is compromised, military-grade AES-256 GCM encryption protects your documents. Combined with rapid biometric unlock, automated stealth modes, and cloud syncing via secure self-hosted protocols, it represents the pinnacle of mobile data privacy.",
    iconGradient: "linear-gradient(135deg, #ab47fa 0%, #f43f5e 100%)",
    iconSvg: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-13a10 10 0 0 0-10 10c0 5.25 10 10 10 10s10-4.75 10-10A10 10 0 0 0 12 2Z", // SVG vault/shield outline
    version: "1.8.0",
    size: "8.7 MB",
    releaseDate: "2026-05-20",
    playStoreUrl: "https://play.google.com/store/apps/details?id=tech.salev.novavault",
    apkUrl: "https://salev.tech/downloads/nova-vault-v1.8.0.apk",
    category: "Tools & Security",
    accentColor: "hsl(270, 95%, 65%)",
    features: [
      "Zero-Knowledge local-first security architecture.",
      "Biometric identification (Fingerprint & Face Unlock) support.",
      "Stealth mode: camouflage icon and secondary decoy vault setup.",
      "Self-hosted WebDAV, Nextcloud, and Drive secure sync options.",
      "Local password generator with strength validation indicators."
    ],
    specs: {
      minSdk: "Android 9.0 (API 28)",
      targetSdk: "Android 14 (API 34)",
      architecture: "arm64-v8a, x86_64",
      permissions: [
        "USE_BIOMETRIC",
        "WRITE_EXTERNAL_STORAGE",
        "MANAGE_EXTERNAL_STORAGE",
        "INTERNET"
      ]
    },
    changelog: [
      {
        version: "1.8.0",
        date: "2026-05-20",
        notes: [
          "Implemented decentralized cloud sync utilizing WebDAV protocols.",
          "Enhanced cryptographic performance by 15% using native assembly.",
          "Improved Android BiometricPrompt theme consistency."
        ]
      },
      {
        version: "1.7.2",
        date: "2026-03-05",
        notes: [
          "Fixed a localization bug in password generator recommendations.",
          "Added dark theme optimizations for AMOLED screens."
        ]
      }
    ]
  },
  {
    id: "zenit-journal",
    slug: "zenit-journal",
    title: "Zenit Journal",
    tagline: "Minimalist AI-Enhanced Micro-Journaling",
    description: "A gorgeous, private journal app to record thoughts and reflect on your days. Includes secure database storage, markdown parsing, and AI sentiment analysis.",
    longDescription: "Zenit Journal helps you process thoughts and track moods without the friction of typing long paragraphs. With localized AI mood analysis, custom daily reminders, and markdown notation, Zenit acts as a quiet garden for your mind. Your journal entries remain fully offline, protected by high-grade local databases. Export entries easily to standard markdown format at any time to preserve your history forever.",
    iconGradient: "linear-gradient(135deg, #10b981 0%, #00f5ff 100%)",
    iconSvg: "M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Zm0-3a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z", // SVG Zen circle
    version: "3.0.2",
    size: "11.1 MB",
    releaseDate: "2026-05-28",
    playStoreUrl: "https://play.google.com/store/apps/details?id=tech.salev.zenitjournal",
    apkUrl: "https://salev.tech/downloads/zenit-journal-v3.0.2.apk",
    category: "Lifestyle & Productivity",
    accentColor: "hsl(150, 80%, 45%)",
    features: [
      "On-device AI sentiment and mood analysis (100% offline).",
      "Full Markdown support with live preview editor styling.",
      "Interactive statistics displaying mood charts and word clouds.",
      "Auto-backup to local device directory or private Dropbox API.",
      "Custom themes inspired by nature and minimalist palettes."
    ],
    specs: {
      minSdk: "Android 8.0 (API 26)",
      targetSdk: "Android 14 (API 34)",
      architecture: "arm64-v8a, armeabi-v7a, x86_64",
      permissions: [
        "RECEIVE_BOOT_COMPLETED",
        "WRITE_EXTERNAL_STORAGE",
        "INTERNET"
      ]
    },
    changelog: [
      {
        version: "3.0.2",
        date: "2026-05-28",
        notes: [
          "Introduced localized mood correlation statistics screen.",
          "Fixed markdown list rendering inside the text editor.",
          "Resolved notification scheduling delays on Android 14."
        ]
      }
    ]
  }
];
