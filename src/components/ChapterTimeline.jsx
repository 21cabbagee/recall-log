import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, Mic, User, Quote, Copy, Check, ChevronDown, ChevronUp, Tag, Sparkles } from 'lucide-react';

export default function ChapterTimeline({ logs, highlightedChapterId }) {
  const [expandedLogId, setExpandedLogId] = useState(logs[0]?.id);
  const [copiedChapterId, setCopiedChapterId] = useState(null);

  const handleCopyQuote = (quote, id) => {
    navigator.clipboard.writeText(quote);
    setCopiedChapterId(id);
    setTimeout(() => setCopiedChapterId(null), 2000);
  };

  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-recall-400" />
              <span>Indexed Memory Logs & Topical Chapters</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic semantic segmentation with timestamped quotes and speaker attribution
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded-lg bg-dark-900 border border-white/5 font-mono">
              {logs.length} Sessions
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-dark-900 border border-white/5 font-mono text-recall-300">
              {logs.reduce((acc, l) => acc + (l.chapters?.length || 0), 0)} Chapters Indexed
            </span>
          </div>
        </div>

        {/* Logs List */}
        <div className="space-y-6">
          {logs.map((log) => {
            const isExpanded = expandedLogId === log.id;

            return (
              <div
                key={log.id}
                className="glass-panel rounded-2xl overflow-hidden border-white/10 transition-all hover:border-white/20"
              >
                {/* Log Header Accordion Bar */}
                <div
                  onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                  className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-recall-950/60 border border-recall-500/30 flex items-center justify-center mt-0.5">
                      <Mic className="w-5 h-5 text-recall-400" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-white group-hover:text-recall-300 transition-colors">
                          {log.title}
                        </h3>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-dark-800 text-slate-300 border border-white/5">
                          {log.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {log.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          {log.duration}
                        </span>
                        <span>•</span>
                        <span className="text-slate-400">{log.totalWords} words</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-semibold text-recall-300">
                        {log.chapters.length} Chapters
                      </div>
                      <div className="text-[11px] text-slate-400">Dense vectors</div>
                    </div>
                    <button className="w-8 h-8 rounded-lg bg-dark-900 border border-white/5 flex items-center justify-center text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Log Summary */}
                <div className="px-5 pb-3 text-xs text-slate-300 border-b border-white/5 bg-dark-950/30">
                  <p className="line-clamp-2 italic text-slate-400">"{log.summary}"</p>
                </div>

                {/* Expanded Chapters Grid */}
                {isExpanded && (
                  <div className="p-5 space-y-4 bg-dark-950/50">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                      <span>Topical Segmentation & Key Decision Timeline:</span>
                      <span className="text-recall-400 text-[11px]">Click quote to copy</span>
                    </div>

                    <div className="space-y-3">
                      {log.chapters.map((chapter) => {
                        const isHighlighted = highlightedChapterId === chapter.id;

                        return (
                          <div
                            key={chapter.id}
                            id={chapter.id}
                            className={`p-4 rounded-xl border transition-all ${
                              isHighlighted
                                ? 'bg-recall-950/50 border-recall-400 ring-2 ring-recall-500/30 shadow-lg'
                                : 'bg-dark-900/80 border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-dark-950 text-recall-300 border border-recall-500/20">
                                  {chapter.timestamp}
                                </span>
                                <span className="text-xs font-bold text-white">{chapter.title}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                  <User className="w-3 h-3 text-slate-500" />
                                  {chapter.speaker}
                                </span>
                                <button
                                  onClick={() => handleCopyQuote(chapter.quote, chapter.id)}
                                  className="p-1 rounded bg-dark-800 hover:bg-dark-750 text-slate-400 hover:text-white transition-colors"
                                  title="Copy verbatim quote"
                                >
                                  {copiedChapterId === chapter.id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Key Takeaway Bullet */}
                            <div className="mb-2 text-xs text-slate-300 flex items-start gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
                              <span>{chapter.keyTakeaway}</span>
                            </div>

                            {/* Verbatim Quoted Excerpt */}
                            <div className="bg-dark-950/70 p-2.5 rounded-lg border border-white/5 text-xs text-slate-200 italic flex items-start gap-2">
                              <Quote className="w-3.5 h-3.5 text-recall-400/60 flex-shrink-0 mt-0.5" />
                              <span>"{chapter.quote}"</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
