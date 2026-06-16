export interface Metrics {
  score: number;
  tier: string; // "Gold" | "Silver" | "Bronze"
  hire_recommendation: string; // "Direct Hire" | "Review" | "Do Not Hire"
  talk_listen_ratio: string; // e.g., "50:50"
}

export interface ExecutiveSummary {
  strengths: string;
  weaknesses: string;
}

export interface ComplianceCheck {
  checkpoint: string;
  status: "PASS" | "FAIL";
  critique: string;
  ideal_example: string;
}

export interface TierUpgradeAdvisor {
  primary_bottleneck: string;
  coaching_prompt_seed: string;
}

export interface BantcqCheck {
  criterion: "Budget" | "Authority" | "Need" | "Timeline" | "Competitors" | "Questions";
  status: "PASS" | "FAIL";
  score: number; // 0 to 10 score for this metric
  evidence: string; // Specific excerpt or observation from transcript
  critique: string; // Explanatory analysis
  ideal_example: string; // Recommended best-practice statement
}

export interface LinguisticMetrics {
  talk_listen_ratio: string;
  overlapping_speech: {
    detected: boolean;
    frequency: string; // e.g., "High", "None", "Subtle (1 overlap detected)"
    details: string; // Explanation of overlaps
  };
  excessive_silence: {
    detected: boolean;
    details: string; // Explanation of awkward pauses or quick responses
  };
  pacing_feedback: string;
}

export interface EvaluationResult {
  applicant_name: string;
  position: string;
  overall_metrics: Metrics;
  executive_summary: ExecutiveSummary;
  compliance_checklist: ComplianceCheck[];
  tier_upgrade_advisor: TierUpgradeAdvisor;
  bantcq_scoring: BantcqCheck[]; // The proprietary BANTCQ Scorecard
  linguistic_metrics: LinguisticMetrics; // Conversational acoustics / timeline analytics
}

export interface PresetCandidate {
  id: string;
  name: string;
  position: string;
  description: string;
  transcript: string;
  preparsedResult: EvaluationResult;
}
