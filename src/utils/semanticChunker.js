// Deterministic semantic chunker & vector search engine simulation for RecallLog

// Stopwords to exclude during tokenization
const STOPWORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can", "could", "did", "do", "does", "doing", "don't", "down", "during", "each", "few", "for", "from",
  "further", "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him", "himself",
  "his", "how", "i", "if", "in", "into", "is", "isn't", "it", "its", "itself", "just", "me", "more",
  "most", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "our",
  "ours", "ourselves", "out", "over", "own", "same", "she", "should", "so", "some", "such", "than", "that",
  "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this", "those",
  "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "were", "what", "when",
  "where", "which", "while", "who", "whom", "why", "with", "would", "you", "your", "yours"
]);

// Semantic synonym map for conversational retrieval enhancement
const SYNONYMS = {
  "margin": ["margins", "gross", "profit", "floor", "economics", "68%"],
  "cost": ["costs", "bills", "spend", "reduce", "82%", "overhead", "pricing"],
  "mike": ["growth", "executive", "board", "margin", "acv"],
  "limit": ["limits", "guardrails", "window", "tokens", "1500", "bounds"],
  "edge": ["local", "quantization", "silicon", "laptop", "device", "chips"],
  "haptic": ["haptics", "pulse", "vibration", "interaction", "physical", "tick"],
  "spatial": ["walk", "gesture", "spatial", "ui", "3-tiered"],
  "elena": ["researcher", "podcast", "quantization", "vance", "memory"],
  "wasm": ["webassembly", "cloudflare", "tokenizer", "latency", "workers"]
};

export function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s%]/g, " ")
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOPWORDS.has(token));
}

export function searchMemoryLogs(query, logs) {
  if (!query || query.trim() === "") return [];

  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  // Expand query with synonyms
  const expandedQuery = new Set(queryTokens);
  queryTokens.forEach(t => {
    if (SYNONYMS[t]) {
      SYNONYMS[t].forEach(syn => expandedQuery.add(syn));
    }
  });

  const allChapters = [];
  logs.forEach(log => {
    log.chapters.forEach(chapter => {
      allChapters.push({
        ...chapter,
        logTitle: log.title,
        logDate: log.date,
        logId: log.id,
        logType: log.type
      });
    });
  });

  // Score each chapter
  const scored = allChapters.map(chapter => {
    const chapterTokens = tokenize(
      `${chapter.title} ${chapter.speaker} ${chapter.topic} ${chapter.keyTakeaway} ${chapter.quote} ${chapter.text}`
    );
    const chapterSet = new Set(chapterTokens);

    let matchCount = 0;
    let boost = 0;

    queryTokens.forEach(token => {
      if (chapterSet.has(token)) {
        matchCount += 3; // direct match weight
      } else {
        // check substring / partial match
        for (let ct of chapterSet) {
          if (ct.includes(token) || token.includes(ct)) {
            matchCount += 1.5;
            break;
          }
        }
      }
    });

    expandedQuery.forEach(token => {
      if (chapterSet.has(token)) {
        boost += 1;
      }
    });

    // Check specific high-intent phrase overlaps
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("mike") && chapter.speaker?.toLowerCase().includes("mike")) boost += 5;
    if (lowerQuery.includes("target margin") && chapter.topic?.includes("margin")) boost += 8;
    if (lowerQuery.includes("context window") && chapter.topic?.includes("context")) boost += 8;
    if (lowerQuery.includes("spatial haptics") && chapter.topic?.includes("haptics")) boost += 8;
    if (lowerQuery.includes("webassembly") && chapter.topic?.includes("latency")) boost += 8;

    const rawScore = matchCount + boost;
    // Normalize to cosine similarity simulation (between 68% and 99.2%)
    const similarity = Math.min(
      99.4,
      Math.max(45.0, Number((65 + Math.tanh(rawScore / 6) * 33.5).toFixed(1)))
    );

    return {
      chapter,
      rawScore,
      similarity
    };
  });

  // Filter relevant items and sort
  return scored
    .filter(item => item.rawScore > 0)
    .sort((a, b) => b.rawScore - a.rawScore);
}

// Convert user uploaded raw text or note into a structured RecallLog object
export function chunkRawTextIntoLog(title, rawText, speakerName = "Voice Note") {
  const paragraphs = rawText
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 20);

  const words = rawText.split(/\s+/).filter(Boolean).length;
  const estSeconds = Math.max(30, Math.round(words / 2.5)); // ~150 wpm
  const minutes = Math.floor(estSeconds / 60);
  const seconds = estSeconds % 60;
  const durationStr = `${minutes}m ${seconds.toString().padStart(2, "0")}s`;

  const chapters = [];
  const chunkSize = Math.max(1, Math.ceil(paragraphs.length / 3));

  for (let i = 0; i < paragraphs.length; i += chunkSize) {
    const chunkParagraphs = paragraphs.slice(i, i + chunkSize);
    const combinedText = chunkParagraphs.join(" ");
    const chapterWords = combinedText.split(/\s+/).filter(Boolean);
    const firstSentence = combinedText.split(".")[0] || "Topical segment notes";
    
    const startSec = Math.round((i / paragraphs.length) * estSeconds);
    const endSec = Math.round(Math.min(estSeconds, ((i + chunkSize) / paragraphs.length) * estSeconds));
    
    const startMin = Math.floor(startSec / 60);
    const startRem = startSec % 60;
    const endMin = Math.floor(endSec / 60);
    const endRem = endSec % 60;
    const tsStr = `${startMin.toString().padStart(2, "0")}:${startRem.toString().padStart(2, "0")} - ${endMin.toString().padStart(2, "0")}:${endRem.toString().padStart(2, "0")}`;

    chapters.push({
      id: `c-custom-${Date.now()}-${i}`,
      title: firstSentence.slice(0, 48) + "...",
      timestamp: tsStr,
      startSeconds: startSec,
      speaker: speakerName,
      topic: "custom-reflection",
      keyTakeaway: chunkParagraphs[0]?.slice(0, 110) + "..." || "Key conversational takeaway captured.",
      quote: chunkParagraphs[0]?.slice(0, 140) + "..." || combinedText.slice(0, 140),
      text: combinedText
    });
  }

  return {
    id: `log-custom-${Date.now()}`,
    title: title || "Conversational Voice Session",
    type: "voice-memo",
    duration: durationStr,
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    recordedAt: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    source: "Browser Micro-Intake (.txt / Mic)",
    participants: [speakerName],
    totalWords: words,
    vectorChunksCount: chapters.length,
    summary: paragraphs[0] ? paragraphs[0].slice(0, 150) + "..." : "Imported voice transcript indexed into local vector memory.",
    chapters: chapters.length > 0 ? chapters : [
      {
        id: `c-custom-${Date.now()}-0`,
        title: "Conversational Reflection",
        timestamp: "00:00 - " + durationStr,
        startSeconds: 0,
        speaker: speakerName,
        topic: "reflection",
        keyTakeaway: rawText.slice(0, 100) + "...",
        quote: rawText.slice(0, 140),
        text: rawText
      }
    ]
  };
}
