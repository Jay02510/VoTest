import React, { useState } from "react";
import { PRESET_CANDIDATES } from "../presets";
import { PresetCandidate } from "../types";
import { FileText, Sparkles, Send, HelpCircle, Check, AlertCircle } from "lucide-react";

interface CandidateSelectorProps {
  onSelectCandidate: (candidate: PresetCandidate | null, transcript: string) => void;
  selectedCandidateId: string | null;
  onAnalyze: (transcript: string) => void;
  isLoading: boolean;
}

export default function CandidateSelector({
  onSelectCandidate,
  selectedCandidateId,
  onAnalyze,
  isLoading,
}: CandidateSelectorProps) {
  const [customTranscript, setCustomTranscript] = useState<string>("");
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  const handleSelectPreset = (candidate: PresetCandidate) => {
    setIsCustomMode(false);
    onSelectCandidate(candidate, candidate.transcript);
  };

  const handleCustomMode = () => {
    setIsCustomMode(true);
    onSelectCandidate(null, customTranscript);
  };

  const handleCustomTranscriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCustomTranscript(val);
    if (isCustomMode) {
      onSelectCandidate(null, val);
    }
  };

  const handleRunAnalysis = () => {
    const activeTranscript = isCustomMode ? customTranscript : 
      (PRESET_CANDIDATES.find(c => c.id === selectedCandidateId)?.transcript || "");
    
    if (activeTranscript.trim() === "") return;
    onAnalyze(activeTranscript);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col gap-6" id="candidate-selector-panel">
      <div>
        <h2 className="text-xl font-display font-semibold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-sky-600" />
          Ingest Conversation Transcript
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Select a realistic candidate profile or paste a raw conversational dialogue to analyze regulatory compliance.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-650 dark:text-slate-300">
          Target Candidate Profiles
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PRESET_CANDIDATES.map((cand) => {
            const isSelected = !isCustomMode && selectedCandidateId === cand.id;
            let badgeColor = "bg-rose-50 text-rose-700 border-rose-200";
            if (cand.preparsedResult.overall_metrics.tier === "Gold") badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
            if (cand.preparsedResult.overall_metrics.tier === "Silver") badgeColor = "bg-amber-50 text-amber-700 border-amber-200";

            return (
              <button
                key={cand.id}
                id={`btn-preset-${cand.id}`}
                onClick={() => handleSelectPreset(cand)}
                className={`flex flex-col text-left p-4.5 rounded-xl border transition-all duration-200 group relative cursor-pointer ${
                  isSelected
                    ? "border-sky-500 bg-sky-50/50 ring-1 ring-sky-500"
                    : "border-slate-200 hover:border-slate-300 bg-slate-50/20 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between w-full gap-2">
                  <span className="font-semibold text-sm text-slate-900 group-hover:text-sky-600 transition-colors">
                    {cand.name}
                  </span>
                  <span className={`text-xs uppercase font-extrabold px-1.5 py-0.5 rounded-md border ${badgeColor}`}>
                    {cand.preparsedResult.overall_metrics.tier}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-1 line-clamp-1">{cand.position}</span>
                <span className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {cand.description}
                </span>
                
                {isSelected && (
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-sky-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-[1px] bg-slate-200 flex-grow" />
        <span className="text-xs font-bold text-slate-550 dark:text-slate-300 uppercase tracking-widest">or</span>
        <div className="h-[1px] bg-slate-200 flex-grow" />
      </div>

      {/* Custom Input Tab */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <button
            onClick={handleCustomMode}
            id="btn-custom-mode"
            className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              isCustomMode
                ? "bg-slate-900 text-white"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            Create Custom Evaluation Case
          </button>
          
          {isCustomMode && (
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">
              {customTranscript.trim() ? `${customTranscript.trim().split(/\s+/).length} words` : "0 words"}
            </span>
          )}
        </div>

        <div className="relative">
          <textarea
            id="custom-transcript-textarea"
            placeholder={
              "Format: \nClient: Can you guarantee me 12% profit? \nApplicant: Absolutely, our formulas guarantee positive returns... \n\nClick this box or paste a custom finance scenario to evaluate."
            }
            className={`w-full min-h-[220px] max-h-[355px] p-4 text-xs font-mono rounded-xl border leading-relaxed outline-none transition-all resize-y ${
              isCustomMode
                ? "border-slate-900 bg-white shadow-inner focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                : "border-slate-200 bg-slate-100/50 text-slate-500 cursor-not-allowed"
            }`}
            onClick={() => {
              if (!isCustomMode) handleCustomMode();
            }}
            value={isCustomMode ? customTranscript : ""}
            onChange={handleCustomTranscriptChange}
          />
          {!isCustomMode && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100/10 pointer-events-none rounded-xl" />
          )}
        </div>
      </div>

      {/* Key Criteria Legend */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col gap-2.5">
        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-slate-500" />
          Evaluation Engine Strict Safeguards
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
          <div className="flex gap-2 items-start">
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800">Financial Compliance:</strong> Candidates must explicitly mention investment risks and never assure absolute capital safety or fixed interest yields.
            </div>
          </div>
          <div className="flex gap-2 items-start">
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800">Objection Cushion:</strong> Financial advisors cannot get defensive on high advisory fee complaints; look for empathy cushions and active value re-framing.
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <button
        onClick={handleRunAnalysis}
        id="btn-run-analysis"
        disabled={isLoading || (isCustomMode && !customTranscript.trim())}
        className={`w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 cursor-pointer transition-all ${
          isLoading
            ? "bg-slate-400 cursor-not-allowed"
            : isCustomMode && !customTranscript.trim()
            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
            : "bg-sky-600 hover:bg-sky-700 active:bg-sky-800 shadow-md shadow-sky-600/10 hover:shadow-sky-600/20"
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Triggering Multilingual Audits...
          </>
        ) : (
          <>
            <Sparkles className="w-4.5 h-4.5 text-sky-100" />
            Evaluate Compliance & Metrics
          </>
        )}
      </button>
    </div>
  );
}
