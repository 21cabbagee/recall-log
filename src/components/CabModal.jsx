import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Users, ArrowRight, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CabModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Founder / CEO',
    currentTool: 'Voice Memos / Apple Notes',
    useCase: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback safe
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel-glow w-full max-w-lg rounded-2xl p-6 sm:p-8 relative border-recall-500/40 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-dark-800 border border-white/5"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-recall-500/20 text-recall-300 text-xs font-bold uppercase tracking-wider mb-3 border border-recall-500/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Customer Advisory Board (Cohort 1)</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              Join the RecallLog Founding CAB
            </h2>

            {/* Verbatim Pitch Script Quote */}
            <div className="p-3.5 rounded-xl bg-recall-950/40 border border-recall-500/30 mb-6 text-xs text-slate-200 italic leading-relaxed">
              "We are assembling a 10-member Customer Advisory Board (CAB) for RecallLog to solve this exact bottleneck. We are offering a <strong>70% lifetime platform discount ($6/mo instead of $20/mo)</strong> and dedicated onboarding for our first cohort."
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Chen"
                  className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-xs text-white focus:border-recall-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-xs text-white focus:border-recall-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Function</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-xs text-white focus:border-recall-500 focus:outline-none"
                  >
                    <option value="Founder / CEO">Founder / CEO</option>
                    <option value="Podcast Host">Podcast Host</option>
                    <option value="Researcher / Scientist">Researcher / Scientist</option>
                    <option value="Product Lead">Product Lead</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Current Audio/Note Stack</label>
                  <select
                    value={formData.currentTool}
                    onChange={(e) => setFormData({ ...formData, currentTool: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-xs text-white focus:border-recall-500 focus:outline-none"
                  >
                    <option value="Voice Memos / Apple Notes">Voice Memos / Apple Notes</option>
                    <option value="Otter / Fireflies">Otter / Fireflies</option>
                    <option value="Notion AI">Notion AI</option>
                    <option value="Nothing (Memory)">Nothing (Lost to time)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">What conversational memory gets lost most often?</label>
                <textarea
                  rows={2}
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  placeholder="e.g., Specific numbers agreed on Zoom calls or framework names from podcasts..."
                  className="w-full px-3 py-2 bg-dark-900 border border-white/10 rounded-lg text-xs text-white focus:border-recall-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-recall-600 via-indigo-600 to-purple-600 hover:from-recall-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-recall-500/30 transition-all hover:scale-[1.01]"
                >
                  <span>Lock In 70% Lifetime Discount (Cohort 1)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strict limit: Only 10 seats allocated per quarter</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">You're On The Advisory Roster!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6 leading-relaxed">
              We've reserved your 70% lifetime discount code for <strong>{formData.email}</strong>. Our founding team will reach out within 24 hours for your 1-on-1 private vault onboarding session.
            </p>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-white text-xs font-semibold border border-white/10 transition-all"
            >
              Return to Conversational Vault
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
