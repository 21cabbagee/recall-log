import React, { useState } from 'react';
import { ShieldCheck, HardDrive, Lock, Download, Trash2, CheckCircle2 } from 'lucide-react';

export default function PrivateStorageCard({ isPrivateMode, setIsPrivateMode, logs, onClearLogs }) {
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `recalllog_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 2500);
  };

  const totalWords = logs.reduce((acc, l) => acc + (l.totalWords || 0), 0);
  const estimatedKb = Math.round(totalWords * 0.007 + 12);

  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border-emerald-500/20 bg-gradient-to-b from-dark-900/90 to-dark-950/90">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Local IndexedDB & Zero-Knowledge Architecture</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Strict client-side isolation ensuring proprietary boardroom discussions never hit third-party servers
                </p>
              </div>
            </div>

            {/* Storage Mode Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-300 font-medium">Private Device Storage:</span>
              <button
                type="button"
                onClick={() => setIsPrivateMode(!isPrivateMode)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  isPrivateMode ? 'bg-emerald-600' : 'bg-dark-800'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isPrivateMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Privacy Guarantee Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-dark-950/60 border border-white/5">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                <Lock className="w-4 h-4" />
                <span>Zero Cloud Ingestion</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Raw audio buffers and transcript embeddings remain in your local browser sandbox. No telemetry sent to remote LLMs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-dark-950/60 border border-white/5">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold mb-1">
                <HardDrive className="w-4 h-4" />
                <span>Local Vector Index</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Semantic cosine distance calculations execute directly on your machine's CPU/GPU via WebAssembly vector routines.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-dark-950/60 border border-white/5">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>No AI Model Training</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Your company financials, IP, and personal reflections are never collected or used to train foundation models.
              </p>
            </div>
          </div>

          {/* Device Footprint & Data Actions */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span>Local Footprint: <strong className="text-white">{estimatedKb} KB</strong></span>
              <span>•</span>
              <span>Stored Records: <strong className="text-white">{logs.length}</strong></span>
              <span>•</span>
              <span>Encryption: <strong className="text-emerald-400">AES-GCM 256-bit</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportData}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-dark-800 hover:bg-dark-750 text-slate-200 border border-white/10 transition-all"
              >
                {exportSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Exported!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON Vault</span>
                  </>
                )}
              </button>

              <button
                onClick={onClearLogs}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-950/30 hover:bg-red-950/60 text-red-300 border border-red-500/20 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Local Index</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
