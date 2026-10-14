import React from 'react';
import { Search, Sparkles, Shield, Clock, Zap, ArrowRight } from 'lucide-react';
import { PRESET_QUERIES } from '../data/mockMemoryLogs';
import ParticlesCanvas from './ParticlesCanvas';

export default function Hero({ onSelectPreset, onOpenUpload }) {
  return (
    <section className="relative pt-12 pb-8 overflow-hidden">
      <ParticlesCanvas color="99, 102, 241" />
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-recall-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-recall-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-recall-400" />
          <span>Zero-Friction Conversational Knowledge Vault</span>
        </div>

        {/* Target Exact SEO H1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          Conversational Second Brain: <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-recall-400 via-indigo-300 to-purple-400">
            Search Past Meetings and Voice Notes Like Memory
          </span>
        </h1>

        {/* Value Proposition Body */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          Drop any voice recording or meeting transcript; search your past thoughts as easily as asking:{' '}
          <span className="text-recall-300 font-semibold italic">
            "What did Mike say our Q3 target margin was?"
          </span>{' '}
          Zero Google Doc note-taking required. Instant verbatim timestamps, deterministic chapters, and 100% private client-side indexing.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-recall-600 to-indigo-600 hover:from-recall-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-recall-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Record or Drop Audio Log</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#search-engine"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-800/80 hover:bg-dark-750 text-slate-200 font-medium border border-white/10 hover:border-white/20 transition-all"
          >
            <Search className="w-4 h-4 text-recall-400" />
            <span>Try Live Conversational Search</span>
          </a>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          <div className="glass-panel p-3.5 rounded-xl text-left border-white/5">
            <div className="flex items-center gap-2 text-recall-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Latency</span>
            </div>
            <div className="text-xl font-bold text-white">&lt; 12ms</div>
            <p className="text-[11px] text-slate-400">Sub-second local retrieval</p>
          </div>

          <div className="glass-panel p-3.5 rounded-xl text-left border-white/5">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Confidentiality</span>
            </div>
            <div className="text-xl font-bold text-emerald-300">100% Offline</div>
            <p className="text-[11px] text-slate-400">AES-256 client IndexedDB</p>
          </div>

          <div className="glass-panel p-3.5 rounded-xl text-left border-white/5">
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Accuracy</span>
            </div>
            <div className="text-xl font-bold text-white">Verbatim TS</div>
            <p className="text-[11px] text-slate-400">Timestamp quote attribution</p>
          </div>

          <div className="glass-panel p-3.5 rounded-xl text-left border-white/5">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">TAM Focus</span>
            </div>
            <div className="text-xl font-bold text-white">$192M TAM</div>
            <p className="text-[11px] text-slate-400">800k creators & founders</p>
          </div>
        </div>

        {/* 1-Click Preset Queries Showcase */}
        <div className="glass-panel p-4 rounded-2xl max-w-3xl mx-auto border-recall-500/20 text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              1-Click Sample Memory Searches:
            </span>
            <span className="text-[11px] text-slate-400">Click to run instant query</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_QUERIES.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => onSelectPreset(preset.text)}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-900 hover:bg-recall-950/60 text-xs font-medium text-slate-300 hover:text-white border border-white/10 hover:border-recall-500/50 transition-all text-left"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-recall-400 group-hover:scale-125 transition-transform" />
                <span>{preset.text}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                  {preset.badge}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
