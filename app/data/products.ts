export interface SpecMetadata {
  key: string;
  label: string;
  unit: string;
  higherIsBetter: boolean;
  type: "number" | "string";
}

export interface Category {
  name: string;
  uniqueName: string;
  iconName: string;
  specs: SpecMetadata[];
}

export interface Product {
  id: string;
  title: string;
  uniqueTitle: string; // url-friendly title
  category: string;    // uniqueName
  brand: string;
  thumbnail: string;   // Image URL or placeholder SVG path
  scoreValue: number;  // overall rating out of 100
  specs: Record<string, string | number>;
  pros: string[];
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    name: "Smartphones",
    uniqueName: "smartphones",
    iconName: "Smartphone",
    specs: [
      { key: "screenSize", label: "Screen Size", unit: '"', higherIsBetter: true, type: "number" },
      { key: "batteryCapacity", label: "Battery Capacity", unit: " mAh", higherIsBetter: true, type: "number" },
      { key: "cameraResolution", label: "Rear Camera", unit: " MP", higherIsBetter: true, type: "number" },
      { key: "ram", label: "RAM Capacity", unit: " GB", higherIsBetter: true, type: "number" },
      { key: "storage", label: "Storage Capacity", unit: " GB", higherIsBetter: true, type: "number" },
      { key: "weight", label: "Weight", unit: " g", higherIsBetter: false, type: "number" },
      { key: "thickness", label: "Thickness", unit: " mm", higherIsBetter: false, type: "number" },
      { key: "refreshRate", label: "Screen Refresh Rate", unit: " Hz", higherIsBetter: true, type: "number" }
    ]
  },
  {
    name: "Smartwatches",
    uniqueName: "smartwatches",
    iconName: "Watch",
    specs: [
      { key: "batteryLife", label: "Battery Life", unit: " hours", higherIsBetter: true, type: "number" },
      { key: "screenSize", label: "Screen Size", unit: '"', higherIsBetter: true, type: "number" },
      { key: "weight", label: "Weight", unit: " g", higherIsBetter: false, type: "number" },
      { key: "waterResistance", label: "Water Resistance Depth", unit: " m", higherIsBetter: true, type: "number" },
      { key: "storage", label: "Internal Storage", unit: " GB", higherIsBetter: true, type: "number" },
      { key: "hasGps", label: "Built-in GPS", unit: "", higherIsBetter: true, type: "string" }
    ]
  },
  {
    name: "CPUs",
    uniqueName: "cpus",
    iconName: "Cpu",
    specs: [
      { key: "cores", label: "Cores Count", unit: "", higherIsBetter: true, type: "number" },
      { key: "threads", label: "Threads Count", unit: "", higherIsBetter: true, type: "number" },
      { key: "baseClock", label: "Base Clock Frequency", unit: " GHz", higherIsBetter: true, type: "number" },
      { key: "boostClock", label: "Boost Clock Frequency", unit: " GHz", higherIsBetter: true, type: "number" },
      { key: "tdp", label: "Thermal Design Power (TDP)", unit: " W", higherIsBetter: false, type: "number" },
      { key: "cache", label: "L3 Cache Size", unit: " MB", higherIsBetter: true, type: "number" }
    ]
  },
  {
    name: "Graphics Cards",
    uniqueName: "gpus",
    iconName: "Cpu",
    specs: [
      { key: "vram", label: "Video Memory (VRAM)", unit: " GB", higherIsBetter: true, type: "number" },
      { key: "memoryBus", label: "Memory Bus Width", unit: "-bit", higherIsBetter: true, type: "number" },
      { key: "boostClock", label: "Boost Clock Speed", unit: " GHz", higherIsBetter: true, type: "number" },
      { key: "cores", label: "CUDA / Stream Cores", unit: "", higherIsBetter: true, type: "number" },
      { key: "tdp", label: "Power Draw (TDP)", unit: " W", higherIsBetter: false, type: "number" },
      { key: "dlssSupport", label: "AI Upscaling Support", unit: "", higherIsBetter: true, type: "string" }
    ]
  }
];

export const PRODUCTS: Product[] = [
  // Smartphones
  {
    id: "phone-iphone15promax",
    title: "Apple iPhone 15 Pro Max",
    uniqueTitle: "apple-iphone-15-pro-max",
    category: "smartphones",
    brand: "Apple",
    thumbnail: "📱",
    scoreValue: 92,
    description: "Apple's 2023 flagship featuring a titanium body, customizable Action button, powerful A17 Pro chip, and a 5x tetraprism optical zoom camera.",
    specs: {
      screenSize: 6.7,
      batteryCapacity: 4441,
      cameraResolution: 48,
      ram: 8,
      storage: 256,
      weight: 221,
      thickness: 8.25,
      refreshRate: 120
    },
    pros: [
      "Lightweight titanium chassis is very durable",
      "Industry-leading Apple A17 Pro 3nm chipset performance",
      "Superb 5x optical telephoto zoom camera quality",
      "Exceptional video recording capabilities"
    ]
  },
  {
    id: "phone-galaxys24ultra",
    title: "Samsung Galaxy S24 Ultra",
    uniqueTitle: "samsung-galaxy-s24-ultra",
    category: "smartphones",
    brand: "Samsung",
    thumbnail: "📸",
    scoreValue: 95,
    description: "Samsung's ultimate flagship phone equipped with a flat titanium frame, Snapdragon 8 Gen 3 for Galaxy, integrated S-Pen stylus, and advanced Galaxy AI features.",
    specs: {
      screenSize: 6.8,
      batteryCapacity: 5000,
      cameraResolution: 200,
      ram: 12,
      storage: 256,
      weight: 232,
      thickness: 8.6,
      refreshRate: 120
    },
    pros: [
      "Incredibly bright 2600-nits flat AMOLED display with anti-reflective glass",
      "Powerful integrated S-Pen stylus with low latency",
      "Stunning 200MP main camera and versatile dual zoom lens system",
      "7 years of official Android updates promised"
    ]
  },
  {
    id: "phone-pixel8pro",
    title: "Google Pixel 8 Pro",
    uniqueTitle: "google-pixel-8-pro",
    category: "smartphones",
    brand: "Google",
    thumbnail: "🤖",
    scoreValue: 88,
    description: "Google's smart flagship centered around the Tensor G3 processor, advanced AI photo editing tools like Magic Editor, and a polished matte glass design.",
    specs: {
      screenSize: 6.7,
      batteryCapacity: 5050,
      cameraResolution: 50,
      ram: 12,
      storage: 128,
      weight: 213,
      thickness: 8.8,
      refreshRate: 120
    },
    pros: [
      "Unmatched AI-powered photography and voice features",
      "Polished vanilla Android experience with 7 years of updates",
      "Top-tier display quality and temperature sensor feature",
      "Lighter in the hand compared to titanium flagships"
    ]
  },
  {
    id: "phone-oneplus12",
    title: "OnePlus 12",
    uniqueTitle: "oneplus-12",
    category: "smartphones",
    brand: "OnePlus",
    thumbnail: "⚡",
    scoreValue: 90,
    description: "The specs powerhouse featuring Snapdragon 8 Gen 3, a gorgeous 2K curved display, 100W ultra-fast charging, and Hasselblad camera tuning.",
    specs: {
      screenSize: 6.82,
      batteryCapacity: 5400,
      cameraResolution: 50,
      ram: 16,
      storage: 512,
      weight: 220,
      thickness: 9.15,
      refreshRate: 120
    },
    pros: [
      "Mind-blowing 100W wired and 50W wireless charging speeds",
      "Massive 5400mAh battery for 2-day usage",
      "Excellent value-for-money configuration (16GB RAM / 512GB standard)",
      "Gorgeous curved screen with high PWM dimming"
    ]
  },

  // Smartwatches
  {
    id: "watch-appleultra2",
    title: "Apple Watch Ultra 2",
    uniqueTitle: "apple-watch-ultra-2",
    category: "smartwatches",
    brand: "Apple",
    thumbnail: "⌚",
    scoreValue: 94,
    description: "Rugged and capable smartwatch designed for athletes and outdoor explorers, featuring a 49mm titanium case, dual-frequency GPS, and a 3,000-nit screen.",
    specs: {
      batteryLife: 36,
      screenSize: 1.92,
      weight: 61.4,
      waterResistance: 100,
      storage: 64,
      hasGps: "Yes (Dual-frequency)"
    },
    pros: [
      "Extremely bright 3000-nits screen visible in direct desert sunlight",
      "Rugged aerospace-grade titanium case with flat sapphire front crystal",
      "Incredible dual-frequency GPS accuracy in dense forests and cities",
      "Customizable Action button for immediate workout controls"
    ]
  },
  {
    id: "watch-galaxy6classic",
    title: "Samsung Galaxy Watch 6 Classic",
    uniqueTitle: "samsung-galaxy-watch-6-classic",
    category: "smartwatches",
    brand: "Samsung",
    thumbnail: "🧭",
    scoreValue: 89,
    description: "Classic design meets modern health metrics, bringing back the fan-favorite rotating mechanical bezel with an upgraded dual-core processor.",
    specs: {
      batteryLife: 40,
      screenSize: 1.5,
      weight: 59,
      waterResistance: 50,
      storage: 16,
      hasGps: "Yes (L1 GPS)"
    },
    pros: [
      "Satisfying mechanical rotating physical bezel for easy navigation",
      "Comprehensive body composition analysis (BIA sensor)",
      "Polished WearOS 4 experience with Google Assistant",
      "Bright, high-resolution circular display"
    ]
  },
  {
    id: "watch-garminfenix7",
    title: "Garmin Fenix 7 Sapphire Solar",
    uniqueTitle: "garmin-fenix-7",
    category: "smartwatches",
    brand: "Garmin",
    thumbnail: "🌲",
    scoreValue: 91,
    description: "An absolute battery monster built for long expeditions. Features solar charging, offline topographical maps, and button controls alongside a touchscreen.",
    specs: {
      batteryLife: 432, // 18 days in smartwatch mode
      screenSize: 1.3,
      weight: 73,
      waterResistance: 100,
      storage: 32,
      hasGps: "Yes (Multi-band)"
    },
    pros: [
      "Exceptional battery life that lasts weeks instead of hours",
      "Solar charging panel integrated into the watch face",
      "In-depth recovery and training metrics for hardcore athletes",
      "Preloaded worldwide offline maps"
    ]
  },

  // CPUs
  {
    id: "cpu-i9-14900k",
    title: "Intel Core i9-14900K",
    uniqueTitle: "intel-core-i9-14900k",
    category: "cpus",
    brand: "Intel",
    thumbnail: "💻",
    scoreValue: 93,
    description: "Intel's high-performance 14th gen desktop CPU utilizing a hybrid architecture with 8 Performance-cores and 16 Efficient-cores.",
    specs: {
      cores: 24,
      threads: 32,
      baseClock: 3.2,
      boostClock: 6.0,
      tdp: 125,
      cache: 36
    },
    pros: [
      "Blazing fast 6.0 GHz boost frequency out of the box",
      "Outstanding multitasking and creator workflow rendering speed",
      "Excellent compatibility with both DDR4 and DDR5 RAM platforms",
      "Intel Application Optimization (APO) support for games"
    ]
  },
  {
    id: "cpu-ryzen7950x3d",
    title: "AMD Ryzen 9 7950X3D",
    uniqueTitle: "amd-ryzen-9-7950x3d",
    category: "cpus",
    brand: "AMD",
    thumbnail: "🏎️",
    scoreValue: 96,
    description: "AMD's premier gaming and productivity chip, leveraging 3D V-Cache technology on one CCD to deliver unprecedented gaming frame rates.",
    specs: {
      cores: 16,
      threads: 32,
      baseClock: 4.2,
      boostClock: 5.7,
      tdp: 120,
      cache: 128
    },
    pros: [
      "Unmatched gaming performance thanks to huge 128MB L3 cache",
      "Extremely power efficient compared to Intel's top-end chips",
      "Full 16 cores for heavy rendering work",
      "AM5 platform longevity support"
    ]
  },

  // GPUs
  {
    id: "gpu-rtx4090",
    title: "NVIDIA GeForce RTX 4090",
    uniqueTitle: "nvidia-geforce-rtx-4090",
    category: "gpus",
    brand: "NVIDIA",
    thumbnail: "🎮",
    scoreValue: 98,
    description: "The absolute pinnacle of consumer graphics card performance, featuring Ada Lovelace architecture, 24GB of G6X VRAM, and AI Frame Generation.",
    specs: {
      vram: 24,
      memoryBus: 384,
      boostClock: 2.52,
      cores: 16384,
      tdp: 450,
      dlssSupport: "DLSS 3.5 (Frame Gen + Ray Recon)"
    },
    pros: [
      "Crushes any game at 4K resolution with ray tracing maxed out",
      "DLSS 3 Frame Generation offers massive frame rate boosts",
      "Outstanding performance in AI workloads, stable diffusion, and video editing",
      "Huge 24GB frame buffer prevents memory bottlenecking"
    ]
  },
  {
    id: "gpu-rx7900xtx",
    title: "AMD Radeon RX 7900 XTX",
    uniqueTitle: "amd-radeon-rx-7900-xtx",
    category: "gpus",
    brand: "AMD",
    thumbnail: "🔥",
    scoreValue: 90,
    description: "AMD's flagship graphics card utilizing a chiplet design, packing 24GB of VRAM, and offering outstanding traditional rasterization performance.",
    specs: {
      vram: 24,
      memoryBus: 384,
      boostClock: 2.5,
      cores: 6144,
      tdp: 355,
      dlssSupport: "FSR 3 (Fluid Motion Frames)"
    },
    pros: [
      "Excellent raw rasterization performance at a lower price point",
      "24GB of high-speed memory with a wide 384-bit bus width",
      "DisplayPort 2.1 support for ultra-high refresh rate monitors",
      "Standard dual 8-pin power connectors (no melting cable worries)"
    ]
  }
];

export interface BlogArticle {
  id: string;
  title: string;
  uniqueTitle: string;
  thumbnail: string;
  excerpt: string;
  date: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog-s24vsi15",
    title: "S24 Ultra vs iPhone 15 Pro Max: The Titanium Showdown",
    uniqueTitle: "s24-ultra-vs-iphone-15-pro-max-titanium-showdown",
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=60",
    excerpt: "We put the two titanium giants head-to-head to compare build strength, screen glare reduction, thermal throttling, and camera zoom details.",
    date: "May 15, 2026"
  },
  {
    id: "blog-gaming-cpus",
    title: "AMD 3D V-Cache: Why Intel is Struggling in Gaming Power",
    uniqueTitle: "amd-3d-v-cache-gaming-dominance",
    thumbnail: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=60",
    excerpt: "An in-depth look at how cache sizing impacts CPU gaming performance, frame times, and why AMD's Ryzen 3D processors hold the gaming crown.",
    date: "April 28, 2026"
  },
  {
    id: "blog-ai-upscaling",
    title: "DLSS 3.5 vs FSR 3: Comparing Frame Gen Artifacts",
    uniqueTitle: "dlss-vs-fsr-frame-generation-comparison",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=60",
    excerpt: "Exploring ghosting, UI shimmering, latency differences, and rendering fidelity in heavy titles like Cyberpunk 2077 and Alan Wake 2.",
    date: "March 10, 2026"
  },
  {
    id: "blog-fitness-smartwatches",
    title: "Garmin Maps vs Apple Watch GPS: Which is Best for Trails?",
    uniqueTitle: "garmin-vs-apple-gps-trail-navigation",
    thumbnail: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=600&auto=format&fit=crop&q=60",
    excerpt: "We take both watches out into the deep wilderness to test multi-band GPS routing, topographic layout responsiveness, and survival battery metrics.",
    date: "February 22, 2026"
  }
];
