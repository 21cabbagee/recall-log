import React, { useState } from 'react';
import { TrendingUp, Search, Clock, Zap, DollarSign, CheckCircle2, FileText, Sparkles } from 'lucide-react';

/**
 * OutcomeChart for RecallLog (Bklit UI + Julien Bek $1:$6 Sequoia Framework + Larry Ellison ROI Engine)
 * Compares $6,300/mo human note-taking assistants & lost executive search hours ($6 layer)
 * with Instant Conversational Memory Autopilot ($1 software layer).
 */
export default function OutcomeChart({
  serviceName = "Autonomous Conversational Memory & Meeting Retrieval",
  defaultMonthlyHours = 20, // hours of executive recordings per month
  onCtaClick
}) {
  const [hours, setHours] = useState(defaultMonthlyHours);

  // Legacy human services: $35/hour virtual assistant manual review & transcription + $150/hr executive time lost searching past transcripts
  // Estimated monthly cost: ~$190 per recorded hour
  const legacyServicesCost = hours * 190;
  // RecallLog software fee: $29/mo base + $1.50/hour processed
  const autoSoftwareCost = 29 + Math.round(hours * 1.5);
  const netExecutiveSavings = legacyServicesCost - autoSoftwareCost;
  const savingsPercent = Math.round(((legacyServicesCost - autoSoftwareCost) / legacyServicesCost) * 100);

  const maxCost = Math.max(legacyServicesCost, 1);
  const legacyBarHeight = 100;
  const autoBarHeight = Math.max(Math.round((autoSoftwareCost / maxCost) * 100), 8);

  return (
    <div className="relative rounded-2xl border border-indigo-500/30 bg-slate-950/90 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border bg-slate-900 border-indigo-500/40 text-indigo-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            The Sequoia Equation: Software ($1) vs $6,000/mo Virtual Assistants ($6)
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Knowledge Retrieval Economics: <span className="text-indigo-400">{savingsPercent}% Overhead Slashed</span>
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Human assistants spend 15 hours a week re-listening to Zoom recordings and writing messy Google Doc summaries nobody reads. RecallLog turns your raw audio into an instant queryable second brain.
          </p>
        </div>

        <div className="text-right bg-slate-900/80 border border-indigo-500/30 rounded-xl p-3 px-4 min-w-[200px]">
          <span className="text-[11px] text-slate-400 block font-medium">Monthly Executive Value Saved</span>
          <span className="text-2xl md:text-3xl font-black text-indigo-400">
            ${netExecutiveSavings.toLocaleString()}
          </span>
          <span className="text-[10px] text-indigo-300/80 flex items-center justify-end gap-1 font-semibold font-mono">
            <TrendingUp className="w-3 h-3" /> 200ms Verbatim Retrieval
          </span>
        </div>
      </div>

      {/* Interactive Volume Slider */}
      <div className="py-6 border-b border-white/10">
        <div className="flex items-center justify-between text-sm mb-3">
          <label className="text-slate-300 font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            Monthly Recorded Audio & Zoom Meeting Hours:
          </label>
          <span className="text-base font-bold text-white bg-slate-900 px-3 py-1 rounded-lg border border-indigo-500/30 font-mono">
            {hours} Hours / mo (${(legacyServicesCost * 12).toLocaleString()}/yr Overhead)
          </span>
        </div>
        <input 
          type="range" 
          min={5} 
          max={60} 
          step={5}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
        />
        <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
          <span>5 Hours (Solo Founder)</span>
          <span>20 Hours (Executive Team)</span>
          <span>60+ Hours (Full Engineering & Product Org)</span>
        </div>
      </div>

      {/* Bklit UI Visual Comparison Chart & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
        {/* SVG Visual Bars */}
        <div className="md:col-span-5 bg-slate-900 rounded-xl p-5 border border-white/10">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between font-mono">
            <span>Knowledge Management Costs</span>
            <span className="text-[10px] text-slate-500">Live ROI Calculation</span>
          </div>

          <div className="space-y-4">
            {/* Legacy Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Human VAs & Lost Search Hours ($6 Layer)
                </span>
                <span className="font-mono font-bold text-rose-300">${legacyServicesCost.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-950 rounded-lg overflow-hidden border border-rose-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-rose-600 to-indigo-600 transition-all duration-300 rounded-lg"
                  style={{ width: `${legacyBarHeight}%` }}
                />
              </div>
            </div>

            {/* Autonomous Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-indigo-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  RecallLog Neural Memory Autopilot ($1 Layer)
                </span>
                <span className="font-mono font-bold text-indigo-300">${autoSoftwareCost.toLocaleString()}</span>
              </div>
              <div className="h-6 w-full bg-slate-950 rounded-lg overflow-hidden border border-indigo-950/40">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 rounded-lg shadow-lg shadow-indigo-500/30"
                  style={{ width: `${autoBarHeight}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Annual Net Corporate Value Reclaimed:</span>
            <span className="text-sm font-bold text-indigo-400">+${(netExecutiveSavings * 12).toLocaleString()}</span>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="md:col-span-7 space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Instant Conversational Question Answering</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Ask natural questions like "What was the agreed price with Supplier X?" and jump directly to the exact spoken sentence and audio timestamp.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Zero Note-Taking Friction</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Never ask engineers or founders to type notes during brainstorming sessions. Just talk; RecallLog segments chapters and action items automatically.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Private Client-Side Indexing</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Confidential board discussions and strategic voice memos are encrypted locally. Zero third-party training data leakage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
