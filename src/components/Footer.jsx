import React from 'react';
import { Mic, Shield, Sparkles, Terminal } from 'lucide-react';

export default function Footer({ onOpenCab }) {
  const keywords = [
    "conversational memory search ai",
    "voice log search tool",
    "semantic meeting note retrieval",
    "second brain voice recorder"
  ];

  return (
    <footer className="mt-16 border-t border-white/10 bg-dark-950/80 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-recall-600/40 border border-recall-500/30 flex items-center justify-center">
                <Mic className="w-4 h-4 text-recall-300" />
              </div>
              <span className="font-bold text-lg text-white">RecallLog</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The private conversational second brain for founders, podcasters, and researchers. Search raw audio thoughts and past meetings with verbatim quoted timestamps and client-side vector security.
            </p>
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 pt-1">
              <Terminal className="w-3.5 h-3.5 text-recall-400" />
              <span>Slug: /tools/conversational-memory-log-retrieval</span>
            </div>
          </div>

          {/* Targeted SEO Keywords */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Semantic Search Engine
            </h4>
            <ul className="space-y-1.5">
              {keywords.map((kw, i) => (
                <li key={i} className="text-xs text-slate-400 hover:text-recall-300 transition-colors">
                  <span className="text-recall-500 mr-1.5">•</span>
                  {kw}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Architecture & Trust
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-Knowledge IndexedDB</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Deterministic Cosine Vectors</span>
              </li>
              <li>
                <button
                  onClick={onOpenCab}
                  className="text-xs text-recall-400 hover:text-recall-300 underline font-semibold"
                >
                  Customer Advisory Board (70% Off)
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} RecallLog Technologies Inc. All rights reserved.</p>
          <p className="text-[11px]">
            Engineered with sub-second vectorization & client-side cryptographic isolation.
          </p>
        </div>
      </div>
    </footer>
  );
}
