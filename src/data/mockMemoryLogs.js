export const INITIAL_LOGS = [
  {
    id: "log-q3-strategy",
    title: "Q3 Board Strategy & Unit Economics Review",
    type: "meeting",
    duration: "42m 18s",
    date: "October 08, 2026",
    recordedAt: "10:30 AM EST",
    source: "Zoom Sync / Web Audio",
    participants: ["Mike (Head of Growth)", "Sarah (VP Engineering)", "Alex (Founder)"],
    totalWords: 4820,
    vectorChunksCount: 8,
    summary: "Strategic alignment on enterprise pricing, target margin floors, and customer payback velocity ahead of the Q4 expansion push.",
    chapters: [
      {
        id: "c-101",
        title: "Executive Pipeline & Expansion Targets",
        timestamp: "02:15 - 12:40",
        startSeconds: 135,
        speaker: "Mike (Head of Growth)",
        topic: "pipeline-targets",
        keyTakeaway: "Targeting $2.4M ARR by end of Q4; shifting focus from SMB self-serve to outbound mid-market.",
        quote: "We cannot rely on organic PLG alone for the enterprise tier. We need direct SDR cadences on accounts with 50+ engineers.",
        text: "Mike opened the session walking through the revised growth model. 'If we keep relying on pure self-serve, our blended ACV sits at $480/mo. Shifting outbound to accounts with 50+ engineers immediately pushes ACV up to $2,400/mo without increasing support headcount.'"
      },
      {
        id: "c-102",
        title: "Gross Margin Floor & Unit Economics",
        timestamp: "18:42 - 25:10",
        startSeconds: 1122,
        speaker: "Mike (Head of Growth)",
        topic: "margins-and-pricing",
        keyTakeaway: "Agreed on strict 68% gross margin floor for enterprise tiers to absorb dedicated vector compute overhead.",
        quote: "We have to maintain a 68% gross margin floor on enterprise tiers, even when clients demand private dedicated VPC inference. No exceptions.",
        text: "Alex asked about server cost spikes. Mike responded firmly: 'We have to maintain a 68% gross margin floor on enterprise tiers, even when clients demand private dedicated VPC inference. No exceptions. Any contract below 68% gross margin requires explicit CEO sign-off.'"
      },
      {
        id: "c-103",
        title: "Infrastructure Scaling & Local Embeddings",
        timestamp: "27:15 - 38:00",
        startSeconds: 1635,
        speaker: "Sarah (VP Engineering)",
        topic: "infrastructure-latency",
        keyTakeaway: "Migrating chunk vectorization to client-side WebAssembly to reduce Cloudflare Workers bills by 82%.",
        quote: "By compiling the tokenizer and mini-embedding model directly into WebAssembly, the client browser handles 90% of the vector indexing work locally.",
        text: "Sarah presented the latency benchmarking results: 'By compiling the tokenizer and mini-embedding model directly into WebAssembly, the client browser handles 90% of the vector indexing work locally. That drops our external vector DB ingestion bills by 82% instantly.'"
      }
    ]
  },
  {
    id: "log-edge-ai-podcast",
    title: "Edge AI & Local Vector Latency Deep Dive (Podcast Ep 41)",
    type: "podcast",
    duration: "58m 10s",
    date: "October 04, 2026",
    recordedAt: "2:00 PM EST",
    source: "Riverside Studio Audio (.m4a)",
    participants: ["Dr. Elena Vance (AI Systems Researcher)", "Alex (Host)"],
    totalWords: 7420,
    vectorChunksCount: 12,
    summary: "Deep architectural dissection of on-device neural processing, quantization limits, and sub-millisecond retrieval on consumer silicon.",
    chapters: [
      {
        id: "c-201",
        title: "Quantization Trade-offs & 4-bit Precision",
        timestamp: "11:20 - 21:05",
        startSeconds: 680,
        speaker: "Dr. Elena Vance",
        topic: "quantization-precision",
        keyTakeaway: "4-bit GGML quantization retains 97.8% of semantic retrieval fidelity while cutting memory footprint by 75%.",
        quote: "For embedding tasks, 4-bit integer quantization has virtually zero perceptual degradation compared to FP16, but frees up 3GB of VRAM.",
        text: "Dr. Vance explained the mathematical bounds of quantization: 'For embedding tasks, 4-bit integer quantization has virtually zero perceptual degradation compared to FP16, but frees up 3GB of VRAM on laptop chips. You can run 200k vectors in memory without stutter.'"
      },
      {
        id: "c-202",
        title: "Context Window Guardrails for Edge Models",
        timestamp: "34:12 - 42:30",
        startSeconds: 2052,
        speaker: "Dr. Elena Vance",
        topic: "context-limits",
        keyTakeaway: "Optimal chunk size on edge hardware is 1,500 tokens to preserve sub-20ms Time-To-First-Token (TTFT).",
        quote: "Keep the active chunk context under 1,500 tokens for sub-20ms TTFT on Apple Silicon and Snapdragon X chips.",
        text: "Alex asked what happens when founders dump 30,000-token transcripts into small local models. Dr. Vance warned: 'Keep the active chunk context under 1,500 tokens for sub-20ms TTFT on Apple Silicon and Snapdragon X chips. Beyond 2,000 tokens, memory bandwidth saturates and retrieval crawls.'"
      }
    ]
  },
  {
    id: "log-spatial-walk",
    title: "Spatial UI & Haptic Interaction Brainstorm (Walk Note)",
    type: "voice-memo",
    duration: "14m 25s",
    date: "September 29, 2026",
    recordedAt: "6:45 PM PST",
    source: "Apple Watch Voice Memo (.m4a)",
    participants: ["Alex (Solo Reflection)"],
    totalWords: 1890,
    vectorChunksCount: 4,
    summary: "Audio reflection captured while walking through Golden Gate Park on haptic feedback curves and spatial memory navigation.",
    chapters: [
      {
        id: "c-301",
        title: "The 3-Tiered Haptic Pulse Framework",
        timestamp: "08:15 - 11:30",
        startSeconds: 495,
        speaker: "Alex",
        topic: "haptics-interaction",
        keyTakeaway: "Defined the 3-tiered haptic feedback pattern: micro-tick on snap, dual-pulse on commit, soft hum on hover.",
        quote: "Let's use the 3-tiered haptic pulse pattern: Micro-tick on snap, dual-pulse on commit, and a gentle 40Hz resonant hum on hover.",
        text: "Thinking out loud as I walk: 'The UI feels dead without physical grounding. Let's use the 3-tiered haptic pulse pattern: Micro-tick on snap, dual-pulse on commit, and a gentle 40Hz resonant hum on hover. When the user scrubs through past voice memories, the wheel should click like a mechanical safe.'"
      }
    ]
  }
];

export const PRESET_QUERIES = [
  {
    text: "What did Mike say our Q3 target margin was?",
    expectedTarget: "c-102",
    badge: "Unit Economics"
  },
  {
    text: "What was the recommended context window limit for edge models?",
    expectedTarget: "c-202",
    badge: "Technical Specs"
  },
  {
    text: "What framework did we agree on for spatial haptics?",
    expectedTarget: "c-301",
    badge: "Product Design"
  },
  {
    text: "How much did client-side WebAssembly reduce server costs?",
    expectedTarget: "c-103",
    badge: "Cloud Infrastructure"
  }
];
