import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, Square, Upload, FileText, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { chunkRawTextIntoLog } from '../utils/semanticChunker';

export default function UploadIntakeModal({ isOpen, onClose, onAddLog }) {
  const [activeTab, setActiveTab] = useState('record'); // 'record' | 'upload' | 'sample'
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcriptText, setTranscriptText] = useState('');
  const [sessionTitle, setSessionTitle] = useState('');
  const [speakerName, setSpeakerName] = useState('My Voice Memo');
  const [isProcessing, setIsProcessing] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  if (!isOpen) return null;

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Simulate real-time speech-to-text generation for the user
    setTranscriptText(
      `Quick voice thought on product strategy: We need to ensure that every search result returns a verbatim quoted sentence alongside the timestamp. The user shouldn't just get a summary; they need to hear the exact words spoken to trust the retrieval. Let's make sure our vector index maps back directly to raw audio millisecond offsets.`
    );
    if (!sessionTitle) {
      setSessionTitle("Voice Memo on Verbatim Retrieval Offsets");
    }
  };

  const handleLoadSample = (sampleType) => {
    if (sampleType === 'podcast') {
      setSessionTitle("Solo Reflection on Autonomous Workflows & Tool Use");
      setSpeakerName("Alex");
      setTranscriptText(
        `Autonomous agent architectures require strict boundary controls. When designing agent tool calling, if we let agents inspect files without explicit schema validation, prompt injection risks explode.\n\nOur rule should be simple: Every destructive action requires explicit human confirmation. We call this the Black Car protocol. In practice, this means write actions are gated behind a 2-step verification token, while read actions can stream at sub-10ms latency.`
      );
    } else {
      setSessionTitle("Product Review on Micro-SaaS Distribution");
      setSpeakerName("Sarah & Alex");
      setTranscriptText(
        `The biggest mistake builders make with micro-apps is trying to solve horizontal enterprise problems without distribution.\n\nIf you unbundle a single high-pain feature—like finding what someone said on a call last month—and give it sub-second search, you can charge $20/month with zero churn. The customer advisory board playbook works because it gives you direct access to 10 power users who tell you what to build next.`
      );
    }
    setActiveTab('upload');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSessionTitle(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setTranscriptText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transcriptText.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const newLog = chunkRawTextIntoLog(
        sessionTitle || "Voice Note Session",
        transcriptText,
        speakerName || "Speaker"
      );
      onAddLog(newLog);
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel-glow w-full max-w-2xl rounded-2xl p-6 relative border-recall-500/30 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-dark-800 border border-white/5"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-recall-600/30 border border-recall-500/40 flex items-center justify-center">
            <Mic className="w-5 h-5 text-recall-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Instant Voice & Transcript Intake</h2>
            <p className="text-xs text-slate-400">
              Deterministic chunking & local vector indexing with verbatim timestamp attribution
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-dark-900 rounded-xl border border-white/5 mb-6">
          <button
            onClick={() => setActiveTab('record')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'record'
                ? 'bg-recall-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Browser Mic Recorder</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'upload'
                ? 'bg-recall-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload .txt / .mp3</span>
          </button>
          <button
            onClick={() => setActiveTab('sample')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'sample'
                ? 'bg-recall-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>1-Click Sample</span>
          </button>
        </div>

        {/* Tab 1: Live Mic Recording */}
        {activeTab === 'record' && (
          <div className="text-center py-6 px-4 bg-dark-900/60 rounded-xl border border-white/5 mb-6">
            <div className="flex items-center justify-center gap-1.5 h-16 mb-4">
              {isRecording ? (
                <>
                  <div className="w-1.5 bg-recall-500 rounded-full animate-waveform" style={{ animationDelay: '0.1s' }} />
                  <div className="w-1.5 bg-indigo-400 rounded-full animate-waveform" style={{ animationDelay: '0.3s' }} />
                  <div className="w-1.5 bg-purple-400 rounded-full animate-waveform" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 bg-recall-400 rounded-full animate-waveform" style={{ animationDelay: '0.5s' }} />
                  <div className="w-1.5 bg-indigo-500 rounded-full animate-waveform" style={{ animationDelay: '0.4s' }} />
                  <div className="w-1.5 bg-purple-500 rounded-full animate-waveform" style={{ animationDelay: '0.15s' }} />
                </>
              ) : (
                <div className="text-xs text-slate-500 font-mono">Microphone idle • Press start to speak</div>
              )}
            </div>

            <div className="text-2xl font-mono font-bold text-white mb-4">
              {formatTimer(recordingSeconds)}
            </div>

            <div className="flex justify-center gap-3">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={handleStartRecording}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-recall-600 hover:bg-recall-500 text-white text-xs font-bold shadow-lg shadow-recall-500/30 transition-all"
                >
                  <Mic className="w-4 h-4" />
                  <span>Start Recording</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-500/30 transition-all animate-pulse"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Stop & Transcribe</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Sample Loader */}
        {activeTab === 'sample' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => handleLoadSample('podcast')}
              className="p-4 rounded-xl bg-dark-900 hover:bg-recall-950/40 text-left border border-white/5 hover:border-recall-500/40 transition-all group"
            >
              <FileText className="w-5 h-5 text-recall-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white mb-1">Black Car Agent Architecture</div>
              <p className="text-[11px] text-slate-400">
                Reflection on agent tool calling, human confirmation, and sub-10ms read latencies.
              </p>
            </button>

            <button
              onClick={() => handleLoadSample('business')}
              className="p-4 rounded-xl bg-dark-900 hover:bg-recall-950/40 text-left border border-white/5 hover:border-recall-500/40 transition-all group"
            >
              <FileText className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white mb-1">Micro-SaaS CAB Playbook</div>
              <p className="text-[11px] text-slate-400">
                Unbundling single-purpose tools, customer advisory boards, and zero-churn retention.
              </p>
            </button>
          </div>
        )}

        {/* Form Inputs for Metadata & Transcript */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Session / Meeting Title</label>
              <input
                type="text"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
                placeholder="e.g., Growth Strategy Huddle"
                className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-xs text-white focus:border-recall-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Speaker Attribution</label>
              <input
                type="text"
                value={speakerName}
                onChange={(e) => setSpeakerName(e.target.value)}
                placeholder="e.g., Alex & Sarah"
                className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-xs text-white focus:border-recall-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-slate-400">Transcript Content</label>
              <label className="text-[11px] text-recall-400 hover:text-recall-300 cursor-pointer">
                <span>Or load .txt file</span>
                <input type="file" accept=".txt,.json" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
            <textarea
              rows={4}
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              placeholder="Paste meeting transcript, podcast dialogue, or recorded voice note here..."
              className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-xs text-white focus:border-recall-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!transcriptText.trim() || isProcessing}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-recall-600 hover:bg-recall-500 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-recall-500/25 transition-all"
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Vector Indexing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Chunk & Index into Memory</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
