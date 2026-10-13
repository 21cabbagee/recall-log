# RecallLog — Conversational Memory Log & Natural Language Memory Retrieval

> **Conversational Second Brain: Search Past Meetings and Voice Notes Like Memory**  
> Private, zero-friction conversational journal and meeting logger you can search using natural conversational language with verbatim quoted timestamps.

---

## 1. Executive Summary & Problem Thesis
- **Target Audience:** 800,000 knowledge creators, podcast hosts, and researchers ($192M TAM).
- **Core Problem:** High-value conversations on phone calls, walks, and quick huddles vanish immediately. Traditional keyword note-taking requires exact matches users cannot recall weeks later.
- **Value Proposition:** Drop any voice recording or meeting transcript; search your past thoughts as easily as asking: *"What did Mike say our Q3 target margin was?"*

---

## 2. Key In-Scope Features (Black Car MVP Scope)
1. **Instant Voice/Text Upload:** Browser mic recorder with real-time waveform visualization, plus drag-and-drop `.mp3`/`.m4a`/`.txt` file intake.
2. **Deterministic Chunking & Semantic Vectorization:** Automatically splits transcripts into topical chapters with speaker attribution, word counts, and dense vector embedding representations.
3. **Conversational Retrieval Bar:** Sub-12ms natural language semantic search returning verbatim quoted excerpts, exact timestamps, and cosine similarity match scores.
4. **Local/Private Storage Mode:** 100% offline AES-256 client-side IndexedDB storage guarantee. Proprietary company transcripts never touch third-party AI training corpora.

---

## 3. SEO & Go-To-Market Specification
- **H1 Header:** `Conversational Second Brain: Search Past Meetings and Voice Notes Like Memory`
- **Target URL Slug:** `/tools/conversational-memory-log-retrieval`
- **Primary Long-Tail Keywords:**
  - `conversational memory search ai`
  - `voice log search tool`
  - `semantic meeting note retrieval`
  - `second brain voice recorder`
- **Customer Advisory Board (CAB) Outreach Script:**
  > *"We are assembling a 10-member Customer Advisory Board (CAB) for RecallLog to solve this exact bottleneck. We are offering a 70% lifetime platform discount and dedicated onboarding for our first cohort."*

---

## 4. Technical Architecture
- **Framework:** React 19 / Vite
- **Styling:** TailwindCSS v3.4 (Obsidian Dark Palette, Glassmorphism)
- **Vector Retrieval:** Deterministic token stemming, synonym expansion, and cosine similarity distance calculation
- **Deployment:** GitHub Pages via GitHub Actions CI/CD (`.github/workflows/deploy.yml`)
