import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Play, Pause, Volume2, Quote, ExternalLink, Check, Clock, User, Zap } from 'lucide-react';
import { searchMemoryLogs } from '../utils/semanticChunker';

export default function ConversationalSearch({
  query,
  setQuery,
  logs,
  onJumpToChapter
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [activePlaySnippet, setActivePlaySnippet] = useState(null);
  const [snippetProgress, setSnippetProgress] = useState(0);

  useEffect(() => {
    if (!query || query.trim() === '') {
      // Default to high-relevance sample query
      const defaultResults = searchMemoryLogs("What did Mike say our Q3 target margin was?", logs);
      setSearchResults(defaultResults.slice(0, 3));
    } else {
      const results = searchMemoryLogs(query, logs);
      setSearchResults(results.slice(0, 4));
    }
  }, [query, logs]);

  // Audio snippet playback simulation
  useEffect(() => {
    let interval;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setSnippetProgress(prev => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 5;
        });
      }, 150);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const togglePlayAudio = (chapterId) => {
    if (activePlaySnippet === chapterId && isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setActivePlaySnippet(chapterId);
      setIsPlayingAudio(true);
      setSnippetProgress(0);
    }
  };

  const copyQuote = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="search-engine" className="py-8 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Search Bar Container */}
        <div className="glass-panel-glow p-3 sm:p-4 rounded-2xl mb-8">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-recall-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything across past meetings... (e.g., 'What did Mike say our Q3 target margin was?')"
              className="w-full pl-12 pr-28 py-3.5 bg-dark-900/90 text-white placeholder-slate-400 rounded-xl border border-white/10 focus:outline-none focus:border-recall-500 focus:ring-2 focus:ring-recall-500/20 text-sm sm:text-base font-medium transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-20 text-xs text-slate-400 hover:text-white px-2 py-1"
              >
                Clear
              </button>
            )}
            <div className="absolute right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-dark-800 text-[11px] font-mono text-slate-300 border border-white/10 hidden sm:flex">
              <Zap className="w-3 h-3 text-recall-400" />
              <span>&lt; 9ms</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2.5 px-2 text-[11px] text-slate-400">
            <span>Natural language semantic vector indexing</span>
            <span>{searchResults.length} relevant excerpts retrieved</span>
          </div>
        </div>

        {/* Results Container */}
        <div className="space-y-4">
          {searchResults.length === 0 ? (
            <div className="glass-panel p-8 rounded-2xl text-center">
              <Sparkles className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-slate-200 mb-1">No direct memory match found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Try searching using broader terms like "margin", "edge AI", "haptics", or select one of the 1-click sample queries above.
              </p>
            </div>
          ) : (
            searchResults.map(({ chapter, similarity }, idx) => {
              const isFirst = idx === 0;
              const isPlaying = activePlaySnippet === chapter.id && isPlayingAudio;

              return (
                <div
                  key={chapter.id}
                  className={`rounded-2xl transition-all ${
                    isFirst
                      ? 'glass-panel-glow border-recall-500/40 p-5 sm:p-6'
                      : 'glass-panel p-4 sm:p-5 opacity-90 hover:opacity-100'
                  }`}
                >
                  {/* Top Bar: Match confidence & Source attribution */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-recall-500/20 text-recall-300 border border-recall-500/30">
                        <Sparkles className="w-3 h-3" />
                        {similarity}% Semantic Match
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span className="font-mono text-white font-semibold">{chapter.timestamp}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-dark-900 border border-white/5 text-slate-300">
                        {chapter.logTitle}
                      </span>
                    </div>
                  </div>

                  {/* Speaker & Title */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-recall-900/80 border border-recall-500/30 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-recall-300" />
                    </div>
                    <span className="text-xs font-semibold text-white">
                      {chapter.speaker}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-300 font-medium">{chapter.title}</span>
                  </div>

                  {/* Verbatim Quoted Memory Excerpt */}
                  <div className="relative pl-4 border-l-2 border-recall-400 my-3 py-1 bg-recall-950/20 rounded-r-xl pr-3">
                    <Quote className="w-4 h-4 text-recall-400/50 absolute -top-1 -left-2 fill-recall-400/20" />
                    <p className="text-sm sm:text-base text-slate-100 font-medium italic leading-relaxed">
                      "{chapter.quote}"
                    </p>
                  </div>

                  {/* Audio Player Simulator & Action Controls */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                    {/* Simulated Audio Player */}
                    <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                      <button
                        onClick={() => togglePlayAudio(chapter.id)}
                        className={`flex items-center justify-center w-8 h-8 rounded-lg text-white transition-all ${
                          isPlaying
                            ? 'bg-amber-600 hover:bg-amber-500 shadow-md shadow-amber-500/20'
                            : 'bg-recall-600 hover:bg-recall-500 shadow-md shadow-recall-500/20'
                        }`}
                        title={isPlaying ? "Pause snippet" : "Play audio timestamp"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="flex items-center gap-1">
                            <Volume2 className="w-3 h-3 text-recall-400" />
                            Audio Timestamp @ {chapter.timestamp.split(' - ')[0]}
                          </span>
                          <span className="font-mono text-slate-400">
                            {isPlaying ? `${Math.round(snippetProgress / 10)}s / 10s` : '10s snippet'}
                          </span>
                        </div>
                        {/* Audio track progress bar */}
                        <div className="w-full h-1.5 bg-dark-900 rounded-full overflow-hidden border border-white/5">
                          <div
                            className="h-full bg-gradient-to-r from-recall-500 to-indigo-400 transition-all duration-150 rounded-full"
                            style={{ width: `${isPlaying ? snippetProgress : 0}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Secondary Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyQuote(chapter.quote, chapter.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-dark-800 hover:bg-dark-750 text-slate-300 hover:text-white border border-white/10 transition-all"
                      >
                        {copiedId === chapter.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Quote className="w-3.5 h-3.5 text-slate-400" />
                            <span>Copy Quote</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onJumpToChapter(chapter.logId, chapter.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-recall-950/80 hover:bg-recall-900 text-recall-300 border border-recall-500/30 hover:border-recall-500/50 transition-all"
                      >
                        <span>View Chapter</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
