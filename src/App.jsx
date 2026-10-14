import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ConversationalSearch from './components/ConversationalSearch';
import ChapterTimeline from './components/ChapterTimeline';
import PrivateStorageCard from './components/PrivateStorageCard';
import UploadIntakeModal from './components/UploadIntakeModal';
import CabModal from './components/CabModal';
import OutcomeChart from './components/OutcomeChart';
import Footer from './components/Footer';
import { INITIAL_LOGS } from './data/mockMemoryLogs';

export default function App() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [query, setQuery] = useState("What did Mike say our Q3 target margin was?");
  const [isPrivateMode, setIsPrivateMode] = useState(true);
  const [isCabOpen, setIsCabOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [highlightedChapterId, setHighlightedChapterId] = useState(null);

  const handleSelectPreset = (presetText) => {
    setQuery(presetText);
    const searchSection = document.getElementById('search-engine');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpToChapter = (logId, chapterId) => {
    setHighlightedChapterId(chapterId);
    setTimeout(() => {
      const el = document.getElementById(chapterId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleAddLog = (newLog) => {
    setLogs([newLog, ...logs]);
  };

  const handleClearLogs = () => {
    if (confirm("Reset local memory vault to defaults?")) {
      setLogs(INITIAL_LOGS);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-recall-500 selection:text-white">
      {/* Top Navbar */}
      <Header
        isPrivateMode={isPrivateMode}
        setIsPrivateMode={setIsPrivateMode}
        onOpenCab={() => setIsCabOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* SEO & High-Intent Hero */}
        <Hero
          onSelectPreset={handleSelectPreset}
          onOpenUpload={() => setIsUploadOpen(true)}
        />

        {/* Julien Bek $1:$6 Sequoia Framework + Bklit UI Outcome Engine */}
        <section className="px-4 sm:px-6 lg:px-8">
          <OutcomeChart onCtaClick={() => setIsCabOpen(true)} />
        </section>

        {/* Core Conversational Search Engine */}
        <ConversationalSearch
          query={query}
          setQuery={setQuery}
          logs={logs}
          onJumpToChapter={handleJumpToChapter}
        />

        {/* Topical Chapters & Indexed Logs */}
        <ChapterTimeline
          logs={logs}
          highlightedChapterId={highlightedChapterId}
        />

        {/* Private Local Storage Security Guarantee */}
        <PrivateStorageCard
          isPrivateMode={isPrivateMode}
          setIsPrivateMode={setIsPrivateMode}
          logs={logs}
          onClearLogs={handleClearLogs}
        />
      </main>

      {/* Modals */}
      <UploadIntakeModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddLog={handleAddLog}
      />

      <CabModal
        isOpen={isCabOpen}
        onClose={() => setIsCabOpen(false)}
      />

      {/* SEO Footer */}
      <Footer onOpenCab={() => setIsCabOpen(true)} />
    </div>
  );
}
