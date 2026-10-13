import React from 'react';
import { Mic, ShieldCheck, Database, Users, Sparkles } from 'lucide-react';

export default function Header({ isPrivateMode, setIsPrivateMode, onOpenCab }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-dark-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-recall-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-recall-500/25 border border-indigo-400/30">
            <Mic className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                Recall<span className="text-recall-400">Log</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-recall-500/20 text-recall-300 border border-recall-500/30">
                v1.0 Local Memory
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Conversational Second Brain & Semantic Audio Vault
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Privacy Toggle / Status Badge */}
          <button
            onClick={() => setIsPrivateMode(!isPrivateMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isPrivateMode
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                : 'bg-dark-800 text-slate-300 border-white/10 hover:border-white/20'
            }`}
            title="Toggle client-side IndexedDB privacy storage"
          >
            {isPrivateMode ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">100% Client IndexedDB</span>
                <span className="md:hidden">Private</span>
              </>
            ) : (
              <>
                <Database className="w-3.5 h-3.5 text-indigo-400" />
                <span>Cloud Sync Mode</span>
              </>
            )}
          </button>

          {/* Customer Advisory Board CTA */}
          <button
            onClick={onOpenCab}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-recall-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-recall-500/20 hover:shadow-recall-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all border border-indigo-400/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Join CAB (70% Off)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
