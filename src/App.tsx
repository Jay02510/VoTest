import React, { useState, useEffect, useRef, useMemo } from "react";
import { PRESET_CANDIDATES } from "./presets";
import { EvaluationResult, PresetCandidate, BantcqCheck } from "./types";
import CandidateSelector from "./components/CandidateSelector";
import { AnimatePresence, motion } from "motion/react";
import {
  ShieldCheck,
  AlertTriangle,
  Award,
  TrendingUp,
  Cpu,
  Bookmark,
  ChevronRight,
  Send,
  Sparkles,
  RefreshCw,
  Search,
  MessageSquare,
  HelpCircle,
  Clock,
  User,
  Activity,
  Briefcase,
  Check,
  X,
  Mail,
  Copy,
  Info,
  BookOpen,
  DollarSign,
  Users,
  Heart,
  Calendar,
  Volume2,
  Mic,
  Zap,
  ListFilter,
  Globe
} from "lucide-react";

const translations = {
  en: {
    title: "VOTEST",
    subtitle: "VODA Bi Conversational Intelligence Auditing Panel // English/Korean Global Portal",
    presetLabel: "SELECT REAL-TIME COMPLIANCE REPORT PRESETS:",
    statusLabel: "Status:",
    statusActive: "Candidate Evaluation Scorecard Active",
    activeCandidate: "Active Candidate",
    targetRole: "Target Role",
    pitchTheme: "PITCH THEME:",
    themeLight: "Light",
    themeDark: "Dark",
    activeFileLabel: "Active Screening Candidate File // VODA BI VOTEST",
    competencyRating: "VOTEST COMPETENCY RATING",
    gradeLabel: "EVALUATION GRADE",
    recommendationLabel: "HIRE RECOMMENDATION",
    strengthsLabel: "DETECTED CONSULTATIVE STRENGTHS",
    weaknessesLabel: "AREAS FOR CORE CLINICAL IMPROVEMENT",
    coachingRoadmapButton: "Open AI Training Assistant Co-Pilot",
    metricsTitle: "AUTOMATED CORE CONVERSATIONAL METRICS",
    talkRatioLabel: "Talk/Listen Ratio",
    wpmSpeedLabel: "Candidate WPM Speed Gauge",
    tempoAnalysis: "Tempo Speech Analysis",
    overlappingLabel: "Overlap Interruptions",
    silentGapsLabel: "Silent Gaps",
    dashboardTab: "Analytics Dashboard",
    timelineTab: "Sequence Checklist",
    matrixTab: "BANTCQ Matrix",
    sandboxTab: "Try Transcript Ingestion",
    showingEntries: "Showing {start} to {end} of {total} entries",
    pageLabel: "PAGE",
    flipBtn: "Flip",
    customDrillsTitle: "DEPLOY DIRECT INTERACTIVE REMEDIATION DRILLS",
    customDrillsSubtitle: "Target key vulnerabilities immediately. Clicking a drill injects specific regulatory simulations into the AI Co-Pilot drawer.",
    complianceExplainerTitle: "Automated Feedback & Required SEC Action Steps",
    complianceExplainerDesc: "Review and deploy interactive scenarios for failed criteria.",
    seeIdealExecution: "See Ideal Execution",
    noAuditedEvidence: "NO AUDITED EVIDENCE LOGGED",
    interactiveStatusToggle: "Interactive Status Toggle",
    transcriptEvidenceHeading: "Transcript Evidence (검출 대사)",
    idealPhrasingHeading: "Ideal Compliance Phrasing (모범 발화 예시)",
    segmentHeader: "Segment & Korean Param (평가 항목)",
    coachingPromptSeedTitle: "AI ASSISTANT INTERACTIVE WORKPLACE",
    coachingInputPlaceholder: "Practice responding to the client's objection here...",
    coachingSendBtn: "Send Practice Reply",
    coachingGenerating: "Coach Analyzing Response...",
    instantFeedbackRoadmap: "⚡ INSTANT FEEDBACK & ROADMAP",
  },
  ko: {
    title: "VOTEST (보테스트)",
    subtitle: "VODA Bi 대화형 AI 규제 준수 심사 패널 // 한국어 및 영어 글로벌 포털",
    presetLabel: "실시간 규제 준수 보고서 프리셋 선택:",
    statusLabel: "상태:",
    statusActive: "지원자 평가 스코어카드 활성화됨",
    activeCandidate: "평가 대상자",
    targetRole: "목표 직무",
    pitchTheme: "테마 변경:",
    themeLight: "라이트",
    themeDark: "다크",
    activeFileLabel: "현재 진행 중인 심사 지원자 파일 // VODA BI VOTEST",
    competencyRating: "VOTEST 역량 평가 등급",
    gradeLabel: "평가 등급",
    recommendationLabel: "채용 추천 의견",
    strengthsLabel: "감지된 상담 우수 역량 (강점)",
    weaknessesLabel: "주요 클리니컬 개선 과제 (약점)",
    coachingRoadmapButton: "AI 트레이닝 어시스턴트 코파일럿 열기",
    metricsTitle: "자동화된 핵심 대화 메트릭 지표",
    talkRatioLabel: "본인 발화 대 청취 비율 (Talk/Listen)",
    wpmSpeedLabel: "지원자 분당 발화 속도 측정 (WPM)",
    tempoAnalysis: "말하기 속도 및 전반 템포 분석",
    overlappingLabel: "동시 발화 및 중단 횟수 (Overlap)",
    silentGapsLabel: "어색한 침묵 및 공백 발생 (Silent)",
    dashboardTab: "경영진 대시보드",
    timelineTab: "구간별 체크리스트",
    matrixTab: "BANTCQ 종합 매트릭스",
    sandboxTab: "가상 인터뷰 실습실/원고 추가",
    showingEntries: "총 {total}개 항목 중 {start} ~ {end} 표시 중",
    pageLabel: "페이지",
    flipBtn: "전환",
    customDrillsTitle: "대화 분석 기반 1:1 맞춤형 실습 훈련 배포",
    customDrillsSubtitle: "감지된 취약점에 맞춘 롤플레잉 상황극을 배포합니다. 훈련 카드를 클릭하면 AI 코파일럿에 실시간 규제 시뮬레이션이 로드됩니다.",
    complianceExplainerTitle: "자동 피드백 및 필수 SEC 조치 단계",
    complianceExplainerDesc: "실패한 기준에 대해 상호 대화식 시나리오를 검토하고 배포해 보세요.",
    seeIdealExecution: "모범 예시 보기",
    noAuditedEvidence: "심사 대상 증거가 검출되지 않음",
    interactiveStatusToggle: "인터랙티브 합격/실패 강제 전환",
    transcriptEvidenceHeading: "전체 녹취 증거 대사 (Transcript Evidence)",
    idealPhrasingHeading: "모범 규제 준수 발화 (Ideal Compliance)",
    segmentHeader: "평가 항목 및 상세 부문 (Criterion)",
    coachingPromptSeedTitle: "AI 어시스턴트 개인 대화형 훈련소",
    coachingInputPlaceholder: "여기에 클라이언트 의견에 대응할 모범 상담원 답변을 연습해보세요...",
    coachingSendBtn: "연습 답변 전송",
    coachingGenerating: "코치가 회원님의 답변을 실시간 채점 중...",
    instantFeedbackRoadmap: "⚡ 즉각 피드백 및 목표 로드맵",
  }
};

const parseMessageContentInline = (text: string) => {
  const parts = [];
  let currentText = text;
  let starIdx = currentText.indexOf("**");
  
  while (starIdx !== -1) {
    if (starIdx > 0) {
      parts.push({ text: currentText.substring(0, starIdx), isBold: false });
    }
    
    const nextStarIdx = currentText.indexOf("**", starIdx + 2);
    if (nextStarIdx !== -1) {
      const boldText = currentText.substring(starIdx + 2, nextStarIdx);
      parts.push({ text: boldText, isBold: true });
      currentText = currentText.substring(nextStarIdx + 2);
    } else {
      parts.push({ text: currentText.substring(starIdx), isBold: false });
      currentText = "";
    }
    starIdx = currentText.indexOf("**");
  }
  
  if (currentText) {
    parts.push({ text: currentText, isBold: false });
  }

  return parts.map((p, pIdx) => {
    if (p.isBold) {
      return (
        <strong 
          key={pIdx} 
          className="text-orange-400 font-extrabold px-1 py-0.5 rounded-md bg-orange-500/10 inline-block align-baseline"
        >
          {p.text}
        </strong>
      );
    }
    return <span key={pIdx}>{p.text}</span>;
  });
};

const parseMessageContent = (text: string) => {
  if (!text) return null;
  
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    let isHeading = false;
    let headingLevel = 0;
    let processedLine = line;
    
    if (line.startsWith("### ")) {
      isHeading = true;
      headingLevel = 3;
      processedLine = line.substring(4);
    } else if (line.startsWith("## ")) {
      isHeading = true;
      headingLevel = 2;
      processedLine = line.substring(3);
    } else if (line.startsWith("# ")) {
      isHeading = true;
      headingLevel = 1;
      processedLine = line.substring(2);
    }
    
    const parts = [];
    let currentText = processedLine;
    let starIdx = currentText.indexOf("**");
    
    while (starIdx !== -1) {
      if (starIdx > 0) {
        parts.push({ text: currentText.substring(0, starIdx), isBold: false });
      }
      
      const nextStarIdx = currentText.indexOf("**", starIdx + 2);
      if (nextStarIdx !== -1) {
        const boldText = currentText.substring(starIdx + 2, nextStarIdx);
        parts.push({ text: boldText, isBold: true });
        currentText = currentText.substring(nextStarIdx + 2);
      } else {
        parts.push({ text: currentText.substring(starIdx), isBold: false });
        currentText = "";
      }
      starIdx = currentText.indexOf("**");
    }
    
    if (currentText) {
      parts.push({ text: currentText, isBold: false });
    }

    const renderedParts = parts.map((p, pIdx) => {
      if (p.isBold) {
        return (
          <strong 
            key={pIdx} 
            className="text-orange-400 font-extrabold px-1.5 py-0.5 rounded-md bg-orange-500/10 inline-block align-baseline tracking-normal"
          >
            {p.text}
          </strong>
        );
      }
      return <span key={pIdx}>{p.text}</span>;
    });

    if (isHeading) {
      if (headingLevel === 1) {
        return <h1 key={lineIdx} className="text-sm font-black uppercase text-orange-400 mt-3 mb-1.5 border-b border-slate-800 pb-1">{renderedParts}</h1>;
      }
      if (headingLevel === 2) {
        return <h2 key={lineIdx} className="text-xs font-bold uppercase text-sky-400 mt-2.5 mb-1.5">{renderedParts}</h2>;
      }
      return <h3 key={lineIdx} className="text-xs font-bold text-slate-200 mt-2 mb-1">{renderedParts}</h3>;
    }

    if (line.trim().startsWith("• ") || line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const cleanLine = line.replace(/^[\s•\-*]+/, "");
      return (
        <li key={lineIdx} className="ml-4 pl-1 list-disc text-slate-300 mt-1 leading-relaxed">
          {parseMessageContentInline(cleanLine)}
        </li>
      );
    }

    return (
      <p key={lineIdx} className="min-h-[1.25em] mt-1.5 leading-relaxed text-slate-300 font-sans">
        {renderedParts}
      </p>
    );
  });
};

export default function App() {
  // Use "Ji-woo Park" (Silver, score 68%) as the initial target candidate
  const initialCandidate = PRESET_CANDIDATES.find(c => c.id === "ji_woo_park") || PRESET_CANDIDATES[0];
  
  const [activeCandidateId, setActiveCandidateId] = useState<string>(initialCandidate.id);
  const activeCandidate = PRESET_CANDIDATES.find(c => c.id === activeCandidateId) || PRESET_CANDIDATES[0];

  // Dynamic state for BANTCQ matrix to allow live overrides/toggles
  const [bantcqState, setBantcqState] = useState<BantcqCheck[]>(activeCandidate.preparsedResult.bantcq_scoring);

  // Modal of Ideal Execution Phrase
  const [executionModalItem, setExecutionModalItem] = useState<BantcqCheck | null>(null);

  // Tab navigation for main left area
  const [activeTab, setActiveTab] = useState<"dashboard" | "matrix" | "ingest">("dashboard");

  // Enterprise theme state: "light" (default for traditional pitch) vs "dark" (modern sleek)
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Bilingual Portal state: "en" vs "ko" to showcase globalization readiness
  const [lang, setLang] = useState<"en" | "ko">("en");

  const t = (key: keyof typeof translations["en"]) => {
    return translations[lang][key] || translations["en"][key];
  };

  // Selected timeline phase index for interactive exploration (default: 0 or first FAIL index)
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState<number>(0);

  // Pagination states to make large lists scorable and readable
  const [dashboardPage, setDashboardPage] = useState<number>(1);
  const [matrixPage, setMatrixPage] = useState<number>(1);

  // Reference for the detailed audit sequence container to enable jumping/scrolling
  const timelineDetailRef = useRef<HTMLDivElement>(null);

  // API loading states
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [isCoaching, setIsCoaching] = useState<boolean>(false);
  const [evalError, setEvalError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Chat Log inside AI Copilot Sidebar
  const [coachingChat, setCoachingChat] = useState<{ role: "user" | "model" | "system"; content: string; key?: string }[]>([
    {
      role: "model",
      content: initialCandidate.preparsedResult.tier_upgrade_advisor.coaching_prompt_seed,
      key: "roadmap"
    }
  ]);
  const [coachingInput, setCoachingInput] = useState<string>("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Slide-out drawer state for Co-Pilot
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Accessibility refs for focus trapping
  const drawerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);


  // Memoized Call Flow Events to prevent recalculation overhead in JSX renders
  const callFlowEvents = useMemo(() => {
    const budgetItem = bantcqState.find(b => b.criterion === "Budget");
    const authorityItem = bantcqState.find(b => b.criterion === "Authority");
    const needsItem = bantcqState.find(b => b.criterion === "Needs");
    const timelineItem = bantcqState.find(b => b.criterion === "Timeline");
    const complianceItem = bantcqState.find(b => b.criterion === "Compliance");
    const questionItem = bantcqState.find(b => b.criterion === "Question");

    return [
      {
        id: "opening",
        phase_name: "Opening Rapport",
        korean_name: "오프닝 및 라포",
        timestamp: "00:00 - 00:35",
        status: "PASS" as const,
        criterion: null,
        dialogue: activeCandidateId === "ji_woo_park" 
          ? `Client: I have about $350,000 in savings that I want to invest safely. I'm hoping to get some steady growth.\n\nJi-woo: Hello! I'd be glad to help you manage your $350,000 portfolio. Protecting client capital while capturing balanced market growth is our key focus here.`
          : activeCandidateId === "john_doe"
          ? `Client: I want a safe investment for my life savings of $500,050. Can you guarantee me that I will keep making profits?`
          : `Client: I am looking to invest about $500,000, but I want to be 100% sure I won't lose money. My last advisor lost some during the 2022 downturn.`,
        critique: "Polite initial engagement, showing standard warm introductory alignment.",
        ideal: "Hello! Thank you for consulting with us. Let's design a protective but growing allocation plan for copy of your $350k portfolio."
      },
      {
        id: "authority",
        phase_name: "Authority Verification",
        korean_name: "본인확인 및 계약권한",
        timestamp: "00:35 - 01:15",
        status: authorityItem?.status || "PASS",
        criterion: "Authority",
        dialogue: activeCandidateId === "ji_woo_park"
          ? `[Auditor Note] Confirmed directly that client Ji-woo is the sole decision maker and owner of the $350,000 funds.`
          : activeCandidateId === "john_doe"
          ? `[Auditor Note] FAILED AUTHORITY SEGMENT: Skipping verification of principal credentials or regulatory registration autonomy.`
          : `Sarah: Will we be registering this $500k portfolio individually, or does it require joint trust signatures?`,
        critique: authorityItem?.critique || "Confirmed decision-making credentials successfully.",
        ideal: authorityItem?.ideal_example || "To confirm asset credentials, will this allocation be individual, or is there a co-owner required to sign?"
      },
      {
        id: "needs",
        phase_name: "Needs Assessment",
        korean_name: "고객 니즈 진단",
        timestamp: "01:15 - 01:55",
        status: needsItem?.status || "PASS",
        criterion: "Needs",
        dialogue: activeCandidateId === "ji_woo_park"
          ? `Client: Steady growth but safe.\nJi-woo: Protecting capital while capturing balanced market growth is our key focus here. We have some outstanding mutual funds...`
          : activeCandidateId === "john_doe"
          ? `John: Historically the market bounces back, and with our strategies I can practically guarantee you will keep making healthy profits of at least 10%...`
          : `Sarah: Protecting your hard-earned capital is our absolute priority. Before we look at strategies, let's explore your risk limits...`,
        critique: needsItem?.critique || "Audited core growth parameters and volatility comfort levels.",
        ideal: needsItem?.ideal_example || "I hear capital preservation is a core focus. Let's trace your historical volatility comfort indices."
      },
      {
        id: "budget",
        phase_name: "Budget & Fees Check",
        korean_name: "예산 검증 및 수수료 안내",
        timestamp: "01:55 - 02:40",
        status: budgetItem?.status || "PASS",
        criterion: "Budget",
        dialogue: activeCandidateId === "ji_woo_park"
          ? `Client: What kind of fees do you charge? I see a 1% annual fee mentioned...\nJi-woo: Yes, we charge a standard 1%. That covers active tax-loss harvesting and continuous portfolio rebalancing.`
          : activeCandidateId === "john_doe"
          ? `Client: Fees sound expensive.\nJohn: Look, 1% is our absolute standard fee and it is extremely competitive. If you don't like it, you don't get management.`
          : `Sarah: I completely appreciate why you'd ask that. It is highly important to know exactly where your hard-earned money goes...`,
        critique: budgetItem?.critique || "Budget and fees handling checks.",
        ideal: budgetItem?.ideal_example || "I understand fee efficiency is critical to you. The 1% annual management fee works to secure tax rebalancing and asset protection."
      },
      {
        id: "timeline",
        phase_name: "Timeline Discovery",
        korean_name: "일정 수립 및 기간 조건",
        timestamp: "02:40 - 03:20",
        status: timelineItem?.status || "PASS",
        criterion: "Timeline",
        dialogue: activeCandidateId === "ji_woo_park"
          ? `Client: When should we start? I'm in a bit of a hurry...\nJi-woo: We can get started as soon as next week. I will set up the asset accounts.`
          : activeCandidateId === "john_doe"
          ? `[Auditor Note] Skipped asking client when they need liquidity or what their overall wealth deployment horizon is.`
          : `Sarah: What is your preference on deploying these funds—would you prefer standard DCA over 6 months?`,
        critique: timelineItem?.critique || "Timeline criteria audited.",
        ideal: timelineItem?.ideal_example || "What is your target investment horizon for this capital, and do you anticipate cash withdrawal needs?"
      },
      {
        id: "compliance",
        phase_name: "Regulatory Disclosure",
        korean_name: "규제 준수 및 리스크 고지",
        timestamp: "03:20 - 04:10",
        status: complianceItem?.status || "PASS",
        criterion: "Compliance",
        dialogue: activeCandidateId === "ji_woo_park"
          ? `Ji-woo: We are going to target high-performing equity funds to maximize your returns.`
          : activeCandidateId === "john_doe"
          ? `John: Practically guarantee you will keep making healthy profits of at least 10% each year without any risk of loss.`
          : `Sarah: Before we look at strategies, I want to be explicit: all market-linked investments carry some inherent risk, and past performance is not a guarantee...`,
        critique: complianceItem?.critique || "SEC guidelines alignment checklist audit.",
        ideal: complianceItem?.ideal_example || "By law, I must remind you that all market investments fluctuate, and we cannot guarantee rates of return."
      },
      {
        id: "closing",
        phase_name: "Closing & Questioning",
        korean_name: "질문 기회 및 마무리",
        timestamp: "04:10 - 05:00",
        status: questionItem?.status || "PASS",
        criterion: "Question",
        dialogue: activeCandidateId === "ji_woo_park"
          ? `Ji-woo: We can get started as soon as next week. I will set up the asset accounts.`
          : activeCandidateId === "john_doe"
          ? `[Auditor Note] Demanded absolute compliance with zero client dialogical interaction loops.`
          : `Sarah: How do you feel about high-quality corporate bonds as a counterweight to stock volatility?`,
        critique: questionItem?.critique || "End sequence check completed.",
        ideal: questionItem?.ideal_example || "What questions do you have about this checklist? Let's compile our action guidelines."
      }
    ];
  }, [activeCandidateId, bantcqState]);

  // Reset states when candidate profile changes
  useEffect(() => {
    const candidateData = PRESET_CANDIDATES.find(c => c.id === activeCandidateId) || PRESET_CANDIDATES[0];
    setBantcqState(candidateData.preparsedResult.bantcq_scoring);
    setDashboardPage(1);
    setMatrixPage(1);
    
    const seedMsg = candidateData.preparsedResult.tier_upgrade_advisor.coaching_prompt_seed;
    setCoachingChat([
      {
        role: "model",
        content: seedMsg,
        key: "roadmap"
      }
    ]);

    // Automatically highlight the first failing phase block to help HR managers immediately
    setTimeout(() => {
      const activeFails = candidateData.preparsedResult.bantcq_scoring.filter(b => b.status === "FAIL");
      if (activeFails.length > 0) {
        // Find the index of the first failing phase in call flow
        const failingCriterion = activeFails[0].criterion;
        const matchingIdx = ["opening", "authority", "needs", "budget", "timeline", "compliance", "closing"].findIndex(
          criterion => criterion.toLowerCase() === failingCriterion.toLowerCase()
        );
        if (matchingIdx !== -1) {
          setSelectedTimelineIndex(matchingIdx);
        } else {
          setSelectedTimelineIndex(0);
        }
      } else {
        setSelectedTimelineIndex(0);
      }
    }, 50);

  }, [activeCandidateId]);


  // Scroll co-pilot terminal
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [coachingChat]);

  // Focus trap & scroll lock for drawer
  useEffect(() => {
    if (!isDrawerOpen) return;
    const el = drawerRef.current;
    if (!el) return;
    const prev = document.activeElement as HTMLElement | null;
    el.focus();
    const focusable = (): HTMLElement[] => {
      const sel = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      return (Array.from(el.querySelectorAll(sel)) as HTMLElement[]).filter(n => !n.hasAttribute("disabled"));
    };
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const nodes = focusable();
      if (!nodes.length) return;
      const first = nodes[0]; const last = nodes[nodes.length - 1];
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    };
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setIsDrawerOpen(false); };
    document.addEventListener("keydown", trap);
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", trap);
      document.removeEventListener("keydown", close);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [isDrawerOpen]);

  // Focus trap for modal
  useEffect(() => {
    if (!executionModalItem) return;
    const el = modalRef.current;
    if (!el) return;
    const prev = document.activeElement as HTMLElement | null;
    el.focus();
    const focusable = (): HTMLElement[] => {
      const sel = 'button, [href], input, [tabindex]:not([tabindex="-1"])';
      return (Array.from(el.querySelectorAll(sel)) as HTMLElement[]).filter(n => !n.hasAttribute("disabled"));
    };
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const nodes = focusable();
      if (!nodes.length) return;
      const first = nodes[0]; const last = nodes[nodes.length - 1];
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    };
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setExecutionModalItem(null); };
    document.addEventListener("keydown", trap);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", trap);
      document.removeEventListener("keydown", close);
      prev?.focus();
    };
  }, [executionModalItem]);

  // Recalculate score and ratings dynamically based on active BANTCQ PASS/FAIL toggles
  const passCount = bantcqState.filter(b => b.status === "PASS").length;
  
  // Custom precise mapping to align score targets perfectly with user descriptions
  let dynamicScore = 0;
  if (passCount === 6) dynamicScore = 96;
  else if (passCount === 5) dynamicScore = 82;
  else if (passCount === 4) dynamicScore = 68; // Initialize Default (Ji-woo)
  else if (passCount === 3) dynamicScore = 52;
  else if (passCount === 2) dynamicScore = 38; // Initialize Fails
  else if (passCount === 1) dynamicScore = 20;
  else dynamicScore = 5;

  // Tier classification: Gold (90+), Silver (65-89), Bronze (below 65)
  let dynamicTier = "Bronze";
  let tierBadgeStyle = "bg-red-50 text-red-950 border-red-900 ring-2 ring-red-500/10";
  if (dynamicScore >= 90) {
    dynamicTier = "Gold";
    tierBadgeStyle = "bg-emerald-50 text-emerald-950 border-emerald-900 ring-2 ring-emerald-500/20";
  } else if (dynamicScore >= 65) {
    dynamicTier = "Silver";
    tierBadgeStyle = "bg-amber-50 text-amber-950 border-amber-900 ring-2 ring-amber-500/20";
  }

  // Hiring Status Recommendation
  let dynamicRec = "Do Not Hire";
  let recBadgeStyle = "bg-red-100 text-red-900 border-red-400";
  if (dynamicScore >= 90) {
    dynamicRec = "Direct Hire";
    recBadgeStyle = "bg-emerald-100 text-emerald-900 border-emerald-400";
  } else if (dynamicScore >= 65) {
    dynamicRec = "Review";
    recBadgeStyle = "bg-amber-100 text-amber-900 border-amber-400";
  }

  // Handle direct manual PASS/FAIL status toggle in matrix
  const handleToggleBantcq = (criterion: string) => {
    setBantcqState(prev => prev.map(b => {
      if (b.criterion === criterion) {
        const nextStatus = b.status === "PASS" ? "FAIL" : "PASS";
        const nextScore = nextStatus === "PASS" ? 9 : 2;
        return { ...b, status: nextStatus, score: nextScore };
      }
      return b;
    }));
  };

  // Generate pre-populated active advice based on failures
  const activeFails = bantcqState.filter(b => b.status === "FAIL");
  
  const getDynamicAIDirective = () => {
    if (activeFails.length === 0) {
      return `### AI Training Assistant Feedback // Compliant Status\n\nExcellent outcome! Private coaching is complete. ${activeCandidate.name} has satisfied all 6 consultation phases. High structural consistency achieved. No compliance risks detected. Recommend direct progression into advanced global client-facing roles.`;
    }

    const failedNames = activeFails.map(f => {
      if (f.criterion === "Compliance") return "Required Rules (Compliance) (규제 준수)";
      if (f.criterion === "Timeline") return "Timeline Establishment (일정 수립)";
      if (f.criterion === "Budget") return "Budget Verification (예산 확인)";
      if (f.criterion === "Needs") return "Needs Assessment (니즈 진단)";
      if (f.criterion === "Authority") return "Authority Confirmation (권한 검증)";
      if (f.criterion === "Question") return "Questioning Strategy (질문 전략)";
      return f.criterion;
    }).join("\n• ");

    return `### Feedback Summary // ${activeCandidate.name}\nRating: ${dynamicTier} Tier (${dynamicScore}% score)\n\n### Detected Gaps:\n• ${failedNames}\n\n### Tactical Coaching Command:\n${
      activeFails.some(f => f.criterion === "Compliance") && activeFails.some(f => f.criterion === "Timeline")
        ? "Priority training required on stating SEC Rule 206 Risk Declarations and Timeline constraints. Trigger the action cards below to deploy custom interactive drills."
        : activeFails.some(f => f.criterion === "Compliance")
        ? "Candidate failed Required Rules (Compliance). Guide the student on stating asset variability risk before making index claims."
        : "Build structured empathy cushions to counter advisory fee complaints."
    }`;
  };

  // Custom analysis logic for new inputs using live Gemini API proxy
  const handleAnalyze = async (transcript: string) => {
    setIsEvaluating(true);
    setEvalError(null);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Evaluation failed on the server.");
      }

      const customPreset: EvaluationResult = await response.json();

      // Inject custom candidate results directly to scorecard states!
      setBantcqState(customPreset.bantcq_scoring);
      setActiveTab("dashboard");
      
      const activeFails = customPreset.bantcq_scoring.filter(b => b.status === "FAIL");
      if (activeFails.length > 0) {
        const failingCriterion = activeFails[0].criterion;
        const matchingIdx = ["opening", "authority", "needs", "budget", "timeline", "compliance", "closing"].findIndex(
          criterion => criterion.toLowerCase() === failingCriterion.toLowerCase()
        );
        setSelectedTimelineIndex(matchingIdx !== -1 ? matchingIdx : 0);
      } else {
        setSelectedTimelineIndex(0);
      }

      setCoachingChat([
        { 
          role: "model", 
          content: `⚡ **Live Gemini Analysis Complete!**\n\nCustom Ingestion Score: **${customPreset.overall_metrics.score}% (${customPreset.overall_metrics.tier} Tier)**.\n\n**Primary Bottleneck Identified:**\n${customPreset.tier_upgrade_advisor.primary_bottleneck}\n\n*Feel free to deploy script drills or speak directly with the AI Virtual Coach using the terminal below.*` 
        }
      ]);
    } catch (err: any) {
      console.error("Evaluation trigger error:", err);
      setEvalError(err.message || "Failed to reach the Gemini Evaluation Service. Ensure process.env.GEMINI_API_KEY is defined.");
    } finally {
      setIsEvaluating(false);
    }
  };

  // Co-Pilot Fast Actions
  const handleGetScriptDrill = () => {
    setIsCoaching(true);
    const activeFailsList = bantcqState.filter(b => b.status === "FAIL");
    
    setTimeout(() => {
      let scriptContent = `**VOTEST Compliant Script Practice Drill** // For ${activeCandidate.name}\n\n`;
      
      if (activeFailsList.length === 0) {
        scriptContent += `All criteria are currently PASS. Let's practice high-level client relationship development:\n\n* **Mentorship Roleplay Scenario:**\n  - client: "I want to transition all portfolio properties to you."\n  - Advisor response (Golden phrase): "I appreciate your trust. Let us design a phased capital allocation strategy that stabilizes your current tax exposure."`;
      } else {
        scriptContent += `We have active failures. Focus on the following exercises:\n\n`;
        activeFailsList.forEach(fail => {
          scriptContent += `* **Exercise for ${fail.criterion}:**\n  - Simulated customer question: "Can you assure me my money is completely safe?"\n  - Correct verbal implementation: **"${fail.ideal_example}"**\n  - *Objective:* Avoid defensiveness and state constraints clearly first.\n\n`;
        });
      }

      setCoachingChat(prev => [
        ...prev,
        { role: "user", content: `Please provide a targeted practice drill for ${activeCandidate.name}.` },
        { role: "model", content: scriptContent }
      ]);
      setIsCoaching(false);
    }, 800);
  };

  const handleExplainFailure = () => {
    const activeFailsList = bantcqState.filter(b => b.status === "FAIL");
    let explanation = `**VOTEST System Diagnostic: Required Rules Failure Report for ${activeCandidate.name}**\n\n`;

    if (activeFailsList.length === 0) {
      explanation += `Excellent news: There are zero compliance breaches detected for ${activeCandidate.name}. They responded cleanly to fee disputes and outlined SEC risk declarations flawlessly.`;
    } else {
      activeFailsList.forEach((fail, idx) => {
        explanation += `${idx + 1}. **${fail.criterion === "Compliance" ? "Required Rules (Compliance)" : fail.criterion} Phase Failure**\n`;
        explanation += `   - *Root Cause critique:* ${fail.critique}\n`;
        explanation += `   - *VODA Bi Risk Index:* High liability threshold under FINRA Rule 2210 / SEC directives.\n`;
        explanation += `   - *How to Improve:* "${fail.ideal_example}"\n\n`;
      });
    }

    setCoachingChat(prev => [
      ...prev,
      { role: "user", content: `Explain the candidate's core compliance failures.` },
      { role: "model", content: explanation }
    ]);
  };

  const handleGenerateEmail = () => {
    const activeFailsList = bantcqState.filter(b => b.status === "FAIL");
    
    let failsListText = activeFailsList.map(f => `- ${f.criterion === "Compliance" ? "Required Rules (Compliance)" : f.criterion}`).join("\n");
    if (activeFailsList.length === 0) failsListText = "- All standard categories passed.";

    const emailBody = `Subject: Feedback on your VOTEST screening results - VODA Bi Advisor Team
 
Dear ${activeCandidate.name},
 
Thank you for completing your digital wealth manager screening process on VODA Bi's VOTEST evaluation platform.
 
Our automated feedback scorecard has graded your consultative compliance results:
- **Global Competency Score:** ${dynamicScore}%
- **Assessed Tier:** ${dynamicTier} Tier
- **Compliance Status:** ${activeFailsList.length === 0 ? "SEC COMPLIANT" : "RISK SENSITIVE"}
 
**Assessed Consultative Opportunities / Gaps:**
${failsListText}
 
**How to Improve:**
We encourage you to practice integrating explicit volatility warnings before presenting strategic investment growth projections. We have saved ideal execution phrases inside your candidate workbook.
 
Please reply to this transmission to coordinate your second interactive regulatory interview.
 
Best regards,
AI Training Assistant // VOTEST Global`;

    setCoachingChat(prev => [
      ...prev,
      { role: "user", content: `Generate Candidate Feedback Email.` },
      { role: "model", content: emailBody }
    ]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachingInput.trim() || isCoaching) return;

    const userText = coachingInput.trim();
    setCoachingInput("");

    const updatedChat = [
      ...coachingChat,
      { role: "user" as const, content: userText }
    ];
    setCoachingChat(updatedChat);
    setIsCoaching(true);

    try {
      const currentSeed = activeCandidate.preparsedResult.tier_upgrade_advisor.coaching_prompt_seed;

      const response = await fetch("/api/coaching-drill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedChat.map(m => ({ role: m.role, content: m.content })),
          coaching_seed: currentSeed
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to reach virtual coach.");
      }

      const resData = await response.json();
      setCoachingChat(prev => [
        ...prev,
        { role: "model" as const, content: resData.response }
      ]);
    } catch (err: any) {
      console.error(err);
      setCoachingChat(prev => [
        ...prev,
        { role: "system" as const, content: `⚠️ Error contacting the Coach: ${err.message || "Internal connection issue."}` }
      ]);
    } finally {
      setIsCoaching(false);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText("Draft Copied!");
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Korean translations and layout markers
  const getBantcqIcon = (criterion: string) => {
    switch (criterion) {
      case "Budget": return <DollarSign className="w-5 h-5 text-emerald-600" />;
      case "Authority": return <Users className="w-5 h-5 text-blue-600" />;
      case "Needs": return <Heart className="w-5 h-5 text-rose-600" />;
      case "Timeline": return <Calendar className="w-5 h-5 text-amber-600" />;
      case "Compliance": return <ShieldCheck className="w-5 h-5 text-purple-600" />;
      case "Question": return <HelpCircle className="w-5 h-5 text-sky-600" />;
      default: return <Check className="w-5 h-5 text-slate-600" />;
    }
  };

  const getKoreanLabel = (criterion: string) => {
    switch (criterion) {
      case "Budget": return "예산 검증";
      case "Authority": return "권한 검증";
      case "Needs": return "니즈 진단";
      case "Timeline": return "일정 수립";
      case "Compliance": return "규제 준수";
      case "Question": return "질문 전략";
      default: return "평가 항목";
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center p-0 md:p-6 font-sans transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-950" : "bg-slate-100"
    }`}>
      <div 
        id="main-votest-container" 
        className={`w-full max-w-[1280px] flex flex-col overflow-hidden border-4 md:border-8 transition-all duration-300 ${
          theme === "dark" 
            ? "bg-slate-900 text-slate-100 border-slate-800 shadow-[10px_10px_0px_0px_rgba(51,65,85,0.4)]" 
            : "bg-white text-slate-900 border-slate-950 shadow-[10px_10px_0px_0px_rgba(2,6,23,1)]"
        }`}
      >
        
        {/* TOP BRAND HEADER */}
        <header className={`border-b-4 min-h-[90px] flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4 transition-colors duration-300 ${
          theme === "dark" 
            ? "bg-slate-950 border-slate-850 text-white" 
            : "bg-slate-950 border-slate-950 text-white"
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white flex items-center justify-center shrink-0 rounded-xl border-2 border-slate-950">
              <Cpu className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tighter uppercase font-display block leading-none">
                  {t("title")}
                </span>
                <span className="text-[10px] bg-sky-600 text-white px-2 py-0.5 rounded-md font-bold font-mono">
                  v2.8-GLOBAL
                </span>
              </div>
              <span className="text-[11px] font-black text-slate-400 tracking-wider block uppercase leading-tight mt-1">
                {t("subtitle")}
              </span>
            </div>
          </div>

          {/* DYNAMIC CASE PRESET OVERRIDES */}
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <span className="text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase">
              {t("presetLabel")}
            </span>
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 gap-1">
              {PRESET_CANDIDATES.map((cand) => {
                const isActive = activeCandidateId === cand.id;
                let btnColor = "text-slate-400 hover:text-white";
                if (isActive) {
                  if (cand.preparsedResult.overall_metrics.tier === "Gold") {
                    btnColor = "bg-emerald-600 text-white shadow-sm font-extrabold";
                  } else if (cand.preparsedResult.overall_metrics.tier === "Silver") {
                    btnColor = "bg-amber-500 text-slate-950 shadow-sm font-extrabold";
                  } else {
                    btnColor = "bg-red-600 text-white shadow-sm font-extrabold";
                  }
                }

                return (
                  <button
                    key={cand.id}
                    onClick={() => setActiveCandidateId(cand.id)}
                    aria-pressed={activeCandidateId === cand.id}
                    className={`px-3 py-1.5 rounded-lg text-xs tracking-tight transition-all cursor-pointer whitespace-nowrap ${btnColor}`}
                  >
                    {cand.preparsedResult.overall_metrics.tier} ({cand.preparsedResult.overall_metrics.score}%)
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* STATUS DISCOVERY SUBHEADER BAR */}
        <div className={`px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 border-b-2 text-[11px] transition-colors duration-300 ${
          theme === "dark" 
            ? "bg-slate-950 text-slate-200 border-slate-850" 
            : "bg-slate-900 text-slate-200 border-slate-950"
        }`}>
          <div className="flex items-center gap-2 font-mono font-bold">
            <span className={`w-2.5 h-2.5 rounded-full motion-safe:animate-pulse ${dynamicScore >= 90 ? "bg-emerald-400" : dynamicScore >= 65 ? "bg-amber-400" : "bg-red-400"}`}></span>
            <span className="uppercase text-slate-400">{t("statusLabel")}</span>
            <span>{t("statusActive")}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{t("activeCandidate")}: <strong className="text-orange-400 font-mono">{activeCandidate.name}</strong></span>
            <span className="opacity-40">|</span>
            <span>{t("targetRole")}: <strong className="text-sky-300 font-mono font-bold">{lang === "ko" ? "자산 관리사" : "Wealth Manager"}</strong></span>
            
            {/* ADVANCED LIGHT / DARK TOGGLE FOR PITCHING */}
            <div className="flex items-center gap-1.5 ml-2 border-l border-slate-700 pl-3 shrink-0">
              <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest font-mono">{t("pitchTheme")}</span>
              <div className="bg-slate-950/80 border border-slate-800 p-0.5 rounded-lg flex gap-0.5">
                <button 
                  onClick={() => setTheme("light")}
                  className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-tight rounded-md transition-all cursor-pointer ${
                    theme === "light" 
                      ? "bg-white text-slate-950 font-extrabold" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Switch to Corporate Paper-White Light Theme"
                >
                  {t("themeLight")}
                </button>
                <button 
                  onClick={() => setTheme("dark")}
                  className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-tight rounded-md transition-all cursor-pointer ${
                    theme === "dark" 
                      ? "bg-sky-600 text-white font-extrabold" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Switch to Sleek Compliance Midnight Dark Theme"
                >
                  {t("themeDark")}
                </button>
              </div>
            </div>

            {/* BILINGUAL GLOBAL PORTAL TOGGLE */}
            <div className="flex items-center gap-1.5 ml-2 border-l border-slate-700 pl-3 shrink-0">
              <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest font-mono flex items-center gap-1">
                <Globe className="w-3 h-3 text-sky-400" />
                PORTAL LANG:
              </span>
              <div className="bg-slate-950/80 border border-slate-800 p-0.5 rounded-lg flex gap-0.5">
                <button 
                  onClick={() => setLang("en")}
                  className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-tight rounded-md transition-all cursor-pointer ${
                    lang === "en" 
                      ? "bg-sky-600 text-white font-extrabold" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="Switch portal interface to English"
                >
                  EN
                </button>
                <button 
                  onClick={() => setLang("ko")}
                  className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-tight rounded-md transition-all cursor-pointer ${
                    lang === "ko" 
                      ? "bg-sky-600 text-white font-extrabold" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title="한국어 모드로 인터페이스 전환"
                >
                  KO (한국어)
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* DASHBOARD CONTAINER GRID - FULL WIDTH */}
        <div className={`flex-grow flex flex-col min-h-[600px] transition-colors duration-300 ${
          theme === "dark" ? "bg-slate-900" : "bg-slate-50"
        }`}>
          
          {/* Main Panel Column (Full Width) */}
          <main className={`w-full flex flex-col border-b-4 transition-colors duration-300 ${
            theme === "dark" ? "bg-slate-950 border-slate-800" : "bg-white border-slate-950"
          }`}>
            
            {/* PANEL 1: GLOBAL APPLICANT OVERVIEW */}
            <div className={`p-6 md:p-8 border-b-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shrink-0 transition-colors duration-300 ${
              theme === "dark" ? "border-slate-800 bg-slate-900" : "border-slate-950 bg-white"
            }`}>
              
              {/* Left Column: Profile elements */}
              <div className="md:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-black text-slate-400 tracking-wider uppercase font-mono">
                  <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                  {t("activeFileLabel")}
                </div>
                
                <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight uppercase font-display leading-[1.1] transition-colors ${
                  theme === "dark" ? "text-white" : "text-slate-950"
                }`}>
                  {activeCandidate.name}
                </h1>
                
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                  {t("targetRole")}: {activeCandidate.position === "Junior Wealth Manager" && lang === "ko" ? "주니어 자산 관리사" : activeCandidate.position === "Senior Wealth Advisory Applicant" && lang === "ko" ? "시니어 자산 관리 전문가 지원자" : activeCandidate.position === "Compliance & Advisory Specialist" && lang === "ko" ? "규제 준수 및 전문 심사역" : activeCandidate.position}
                </p>

                <p className={`text-xs italic mt-2.5 leading-relaxed p-3 rounded-xl border transition-colors ${
                  theme === "dark" ? "bg-slate-950 text-slate-400 border-slate-850" : "bg-slate-50 text-slate-500 border-slate-200"
                }`}>
                  "{lang === "ko" && activeCandidate.id === "ji_woo_park" ? "실버 등급 지원자 사례. 기본적인 고객 응대와 수수료 설명은 우수하나, 의무화된 SEC 투자 가치 변동 위험(Risk Disclaimer) 공시와 구체적인 일정 협의를 누락했습니다." : lang === "ko" && activeCandidate.id === "john_doe" ? "브론즈 등급 지원자 사례. 매우 거친 상담 태도와 SEC 규제 공시 누락, 속도 조절 실패 및 감정 쿠셔닝 결여등 다수의 취약점이 발생했습니다." : lang === "ko" && activeCandidate.id === "hye_jin_kim" ? "골드 등급 지원자 완벽 이수 사례. 세심한 상담 호흡, 적극적인 경청과 완벽한 동의 수렴, SEC 투자 리스크 안내가 유기적으로 연결된 모범 사례입니다." : activeCandidate.description}"
                </p>

                {/* Executive Audit Strengths & Areas of core improvement (Korean and English depending on language) */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3.5 border-t border-dashed border-slate-200">
                  <div className={`p-3 rounded-xl border transition-colors ${
                    theme === "dark" ? "bg-slate-950/80 text-slate-300 border-slate-800" : "bg-emerald-50/40 text-slate-800 border-emerald-100/80"
                  }`}>
                    <span className="text-[10px] font-mono font-black text-emerald-600 block mb-1 uppercase tracking-wider">
                      ✔ {t("strengthsLabel")}
                    </span>
                    <p className="text-xs font-semibold leading-relaxed">
                      {lang === "ko" && activeCandidate.id === "ji_woo_park" ? "수수료 및 관리 비용 설명 과정에서 탁월한 감정 경청 공감 쿠션(Empathy Cushioning) 및 차분한 설득 스크립트를 시전했습니다." : lang === "ko" && activeCandidate.id === "john_doe" ? "단정적인 설명 구성을 과감하고 신속하게 풀어냈으며 고객이 질문에 신속하게 답변하는 모습을 보여줍니다." : lang === "ko" && activeCandidate.id === "hye_jin_kim" ? "극히 예외적인 경청 태도를 보여주어, 거부 반응에 즉각적으로 우수한 공허감 제거와 리스크 공시를 막힘없이 해냈습니다." : activeCandidate.preparsedResult.executive_summary.strengths}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl border transition-colors ${
                    theme === "dark" ? "bg-slate-950/80 text-slate-300 border-slate-800" : "bg-rose-50/40 text-slate-800 border-rose-100/80"
                  }`}>
                    <span className="text-[10px] font-mono font-black text-rose-700 block mb-1 uppercase tracking-wider">
                      ⚠ {t("weaknessesLabel")}
                    </span>
                    <p className="text-xs font-semibold leading-relaxed">
                      {lang === "ko" && activeCandidate.id === "ji_woo_park" ? "의무 규제 사항인 투자 손실 가능성 고지(Mandatory Risk Disclosure)를 누락했으며 자산 이동 계약 시점에 대한 타임라인 수립 단계가 공백으로 발견되었습니다." : lang === "ko" && activeCandidate.id === "john_doe" ? "주요 규제 공시 누락 및 과속 WPM(분당 말하기 속도) 연출, 고객 대답 끊기 및 불손한 억양 제어로 전 부문 규제 리스크 적색 지령을 획득했습니다." : lang === "ko" && activeCandidate.id === "hye_jin_kim" ? "감지된 약점 없음. 규제적, 비즈니스적 모든 평가 항목에서 최상의 기준을 만족하는 우수한 성과를 보였습니다." : activeCandidate.preparsedResult.executive_summary.weaknesses}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`px-3 py-1.5 border-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                    theme === "dark" 
                      ? "border-slate-800 bg-slate-800 text-slate-202 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.08)]" 
                      : "border-slate-950 shadow-[2px_2px_0px_0px_rgba(2,6,23,1)] " + tierBadgeStyle
                  }`}>
                    {lang === "ko" ? `${dynamicTier === "Gold" ? "골드" : dynamicTier === "Silver" ? "실버" : "브론즈"} 등급` : `${dynamicTier} Tier`}
                  </span>
                  <span className={`px-3 py-1.5 border-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                    theme === "dark" 
                      ? "border-slate-800 bg-slate-800 text-slate-202 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.08)]" 
                      : "border-slate-950 shadow-[2px_2px_0px_0px_rgba(2,6,23,1)] " + recBadgeStyle
                  }`}>
                    {lang === "ko" ? "채용 추천 의견" : "Recommendation"}: {lang === "ko" ? (dynamicRec === "Direct Hire" ? "즉시 채용" : dynamicRec === "Review" ? "심층 검토" : "채용 보류") : dynamicRec}
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Competency Score circular gauge */}
              <div className={`md:col-span-5 flex flex-col items-center justify-center p-5 border-4 rounded-2xl relative transition-all ${
                theme === "dark" 
                  ? "bg-slate-950 border-slate-850 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] text-white" 
                  : "bg-slate-50 border-slate-950 rounded-2xl shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] text-slate-950"
              }`}>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 absolute top-2 pb-1 border-b border-slate-800 w-11/12 text-center">
                  {t("competencyRating")}
                </span>
                
                <div className="relative flex items-center justify-center mt-4 mb-2" style={{ width: "110px", height: "110px" }}>
                  {/* Circular SVG Tracker */}
                  <svg className="w-full h-full transform -rotate-90" role="img" aria-label={`Competency score: ${dynamicScore}%`}>
                    <circle
                      cx="55"
                      cy="55"
                      r="44"
                      className={`fill-none ${theme === "dark" ? "stroke-slate-800" : "stroke-slate-200"}`}
                      strokeWidth="10"
                    />
                    <circle
                      cx="55"
                      cy="55"
                      r="44"
                      className={`fill-none transition-all duration-500 ${
                        dynamicScore >= 90 ? "stroke-emerald-500" : dynamicScore >= 65 ? "stroke-amber-500" : "stroke-rose-500"
                      }`}
                      strokeWidth="10"
                      strokeDasharray={2 * Math.PI * 44}
                      strokeDashoffset={2 * Math.PI * 44 - (dynamicScore / 100) * (2 * Math.PI * 44)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-black tracking-tight font-display ${theme === "dark" ? "text-white" : "text-slate-950"}`}>
                      {dynamicScore}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider border-t border-slate-800 pt-0.5 mt-0.5">Rating</span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center font-bold">
                  {dynamicScore >= 90 ? "COMPLIANT // SATISFACTORY" : dynamicScore >= 65 ? "QUALIFIED // PENDING DEEP DISCOVERY" : "CRITICAL RISK // FAIL STATUS"}
                </div>
              </div>

            </div>

            {/* TAB SELECTOR MENU */}
            <div className={`flex flex-nowrap overflow-x-auto text-xs shrink-0 select-none border-b-4 transition-colors duration-300 ${
              theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-950"
            }`}>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`px-5 py-4 font-black uppercase tracking-wider border-r-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  theme === "dark" ? "border-slate-800" : "border-slate-950"
                } ${
                  activeTab === "dashboard" 
                    ? "bg-slate-950 text-white" 
                    : theme === "dark"
                    ? "bg-slate-900 text-slate-400 hover:bg-slate-800"
                    : "bg-slate-100 text-slate-705 hover:bg-slate-200"
                }`}
              >
                <Activity className="w-4 h-4" />
                {t("dashboardTab")}
              </button>
              <button
                onClick={() => setActiveTab("matrix")}
                className={`px-5 py-4 font-black uppercase tracking-wider border-r-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  theme === "dark" ? "border-slate-800" : "border-slate-950"
                } ${
                  activeTab === "matrix" 
                    ? "bg-slate-950 text-white" 
                    : theme === "dark"
                    ? "bg-slate-900 text-slate-400 hover:bg-slate-800"
                    : "bg-slate-100 text-slate-705 hover:bg-slate-200"
                }`}
              >
                <ListFilter className="w-4 h-4" />
                {t("matrixTab")} ({passCount}/6 PASS)
              </button>
              <button
                onClick={() => setActiveTab("ingest")}
                className={`px-5 py-4 font-black uppercase tracking-wider flex items-center gap-2 border-r-2 border-slate-950 cursor-pointer transition-all whitespace-nowrap bg-sky-50 text-sky-950 hover:bg-sky-100 ${
                  activeTab === "ingest" ? "bg-sky-950 text-white!" : ""
                }`}
              >
                <Sparkles className="w-4 h-4 text-sky-600" />
                {t("sandboxTab")}
              </button>
            </div>

            {activeTab === "dashboard" && (
              <div className="p-6 md:p-8 space-y-8 flex-grow">
                {/* PANEL 2: COMMUNICATION METRICS PANEL */}
                <div className={`p-6 md:p-8 rounded-2xl transition-all duration-300 ${
                    theme === "dark" 
                      ? "bg-slate-900/40 border border-slate-800" 
                      : "bg-white border border-slate-100 shadow-sm"
                  }`}>
                    <h3 className={`text-xl font-bold font-display uppercase tracking-tight mb-4 ${
                      theme === "dark" ? "text-white" : "text-slate-950"
                    }`}>
                      {lang === "ko" ? "커뮤니케이션 분석 지표" : "Communication Metrics"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Sub-Panel A: Speaking vs. Listening (음성 점유율) */}
                      <div className={`p-4 rounded-xl flex flex-col justify-between transition-colors duration-300 ${
                        theme === "dark" ? "bg-slate-950/40 border border-slate-800" : "bg-slate-50/50 border border-slate-150"
                      }`}>
                        <div>
                          <div className={`flex items-center justify-between mb-2 p-2.5 rounded-lg border transition-colors ${
                            theme === "dark" ? "bg-slate-950 text-white border-slate-850" : "bg-slate-900 text-white border-slate-950"
                          }`}>
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="text-xs font-black uppercase tracking-tight truncate">Speaking vs. Listening (음성 점유율)</span>
                              
                              {/* TOOLTIP: Hide explanatory micro-copy under a [ ? ] standard hover icon */}
                              <div className="group relative inline-block cursor-help shrink-0 text-slate-400 hover:text-white z-20">
                                <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center font-mono text-[10px] font-black leading-none select-none">?</span>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 border border-slate-800 text-white text-[10px] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none leading-normal font-sans normal-case tracking-normal">
                                  Monitors agent speaking control vs client active listening. Recommended target ratio is between 40%-60%.
                                </div>
                              </div>
                            </div>
                            <Mic className="w-4 h-4 text-orange-400 shrink-0" />
                          </div>

                          <div className="flex justify-between text-xs font-mono font-extrabold mb-1.5 mt-3">
                            <span className="text-slate-950">Agent Talk: {activeCandidate.preparsedResult.linguistic_metrics.talk_listen_ratio.split(":")[0]}%</span>
                            <span className="text-sky-600">Client Listen: {activeCandidate.preparsedResult.linguistic_metrics.talk_listen_ratio.split(":")[1]}%</span>
                          </div>

                          {/* Beautiful Interactive visual balance bar */}
                          <div className={`w-full h-8 rounded-xl overflow-hidden flex shadow-inner border transition-colors ${
                            theme === "dark" ? "border-slate-800" : "border-slate-150"
                          }`}>
                            <div className="h-full bg-slate-950 flex items-center justify-center text-[10px] text-white font-mono font-bold" style={{ width: `${activeCandidate.preparsedResult.linguistic_metrics.talk_listen_ratio.split(":")[0]}%` }}>
                              AGENT ({activeCandidate.preparsedResult.linguistic_metrics.talk_listen_ratio.split(":")[0]}%)
                            </div>
                            <div className="h-full bg-sky-200 flex items-center justify-center text-[10px] text-sky-950 font-mono font-bold font-black" style={{ width: `${activeCandidate.preparsedResult.linguistic_metrics.talk_listen_ratio.split(":")[1]}%` }}>
                              CLIENT ({activeCandidate.preparsedResult.linguistic_metrics.talk_listen_ratio.split(":")[1]}%)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sub-Panel B: Pacing (WPM) (말하기 속도) */}
                      <div className={`p-4 rounded-xl flex flex-col justify-between transition-colors duration-300 ${
                        theme === "dark" ? "bg-slate-950/40 border border-slate-800" : "bg-slate-50/50 border border-slate-150"
                      }`}>
                        <div>
                          <div className={`flex items-center justify-between mb-2 p-2.5 rounded-lg border transition-colors ${
                            theme === "dark" ? "bg-slate-950 text-white border-slate-850" : "bg-slate-900 text-white border-slate-950"
                          }`}>
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="text-xs font-black uppercase tracking-tight truncate">Pacing (WPM) (말하기 속도)</span>
                              
                              {/* TOOLTIP: Hide explanatory micro-copy under a [ ? ] standard hover icon */}
                              <div className="group relative inline-block cursor-help shrink-0 text-slate-400 hover:text-white z-20">
                                <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center font-mono text-[10px] font-black leading-none select-none">?</span>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 border border-slate-800 text-white text-[10px] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none leading-normal font-sans normal-case tracking-normal">
                                  Audits conversational words per minute tempo to assure clients understand disclosure metrics. Recommended: 110-145 WPM.
                                </div>
                              </div>
                            </div>
                            <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                          </div>

                          <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-semibold leading-relaxed flex items-center justify-between">
                            <div>
                              <span className="font-mono text-sm block font-bold">
                                {activeCandidateId === "john_doe" ? "170 WPM (Fast)" : activeCandidateId === "ji_woo_park" ? "135 WPM (Optimal)" : "130 WPM (Optimal)"}
                              </span>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-md font-mono border font-black uppercase block ${
                              activeCandidateId === "john_doe" ? "bg-red-50 text-red-800 border-red-350" : "bg-emerald-50 text-emerald-800 border-emerald-355"
                            }`}>
                              {activeCandidateId === "john_doe" ? "FAST (속도: 매우 빠름)" : "OPTIMAL (속도: 보통)"}
                            </span>
                          </div>
                        </div>

                        {/* WPM gauge indicators zones */}
                        <div className="grid grid-cols-3 gap-1.5 text-xs text-center font-mono font-bold mt-4">
                          <div className={`p-1 rounded border transition-colors ${theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-500" : "bg-slate-100 border-slate-200 text-slate-400"}`}>Slow (&lt;110)</div>
                          <div className={`p-1 rounded border font-black transition-colors ${activeCandidateId !== "john_doe" ? "bg-emerald-100 text-emerald-950 border-emerald-500" : (theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-550" : "bg-slate-100 border-slate-205 text-slate-400")}`}>Optimal (110-145)</div>
                          <div className={`p-1 rounded border font-black transition-colors ${activeCandidateId === "john_doe" ? "bg-red-100 text-red-950 border-red-500" : (theme === "dark" ? "bg-slate-900 border-slate-800 text-slate-550" : "bg-slate-100 border-slate-250 text-slate-400")}`}>Fast (&gt;145)</div>
                        </div>
                      </div>

                      {/* Sub-Panel C: Interruptions & Pauses */}
                      <div className={`p-4 rounded-xl md:col-span-2 transition-colors duration-300 ${
                        theme === "dark" ? "bg-slate-950/40 border border-slate-800" : "bg-slate-50/50 border border-slate-150"
                      }`}>
                        <div className={`flex items-center justify-between mb-4 p-3 rounded-lg border transition-colors ${
                          theme === "dark" ? "bg-slate-950 text-white border-slate-850" : "bg-slate-900 text-white border-slate-950"
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black uppercase tracking-tight font-display">Interruptions & Pauses (발화 이상징후)</span>
                            
                            {/* TOOLTIP: Hide explanatory micro-copy under a [ ? ] standard hover icon */}
                            <div className="group relative inline-block cursor-help shrink-0 text-slate-400 hover:text-white z-20">
                              <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center font-mono text-[10px] font-black leading-none select-none">?</span>
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 border border-slate-800 text-white text-[10px] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none leading-normal font-sans normal-case tracking-normal">
                                Monitors speech overlap instances, user interruptions, and awkward silence or response gaps.
                              </div>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono font-bold bg-amber-900/50 text-amber-300 border border-amber-900 px-2 py-0.5 rounded">SYSTEM AUDIT</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          
                          {/* Interruption 1: Interruptions (동시발화) */}
                          <div className={`p-4 rounded-xl border transition-colors relative overflow-hidden ${
                            theme === "dark" ? "border-slate-800 bg-slate-900/40" : "border-slate-200 bg-white"
                          }`}>
                            <span className="text-xs font-mono font-black text-slate-550 dark:text-slate-400 tracking-wider uppercase block">
                              Interruptions (동시발화)
                            </span>
                            <div className="flex items-baseline gap-2 mt-2">
                              <span className="text-3xl font-extrabold text-slate-950 font-display">
                                {activeCandidateId === "john_doe" ? "3" : activeCandidateId === "ji_woo_park" ? "1" : "0"}
                              </span>
                              <span className="text-xs text-slate-550 font-bold uppercase font-mono">instances</span>
                            </div>
                            <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed mt-2 italic font-medium">
                              "{activeCandidate.preparsedResult.linguistic_metrics.overlapping_speech.details}"
                            </p>
                            {activeCandidateId === "john_doe" && (
                              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-400 motion-safe:animate-pulse" />
                            )}
                          </div>

                          {/* Interruption 2: Silent Gaps (묵음) */}
                          <div className={`p-4 rounded-xl border transition-colors relative overflow-hidden ${
                            theme === "dark" ? "border-slate-800 bg-slate-900/40" : "border-slate-200 bg-white"
                          }`}>
                            <span className="text-xs font-mono font-black text-slate-550 dark:text-slate-400 tracking-wider uppercase block">
                              Silent Gaps (묵음)
                            </span>
                            <div className="flex items-baseline gap-2 mt-2">
                              <span className="text-3xl font-extrabold text-slate-950 font-display">
                                {activeCandidateId === "john_doe" ? "1" : "0"}
                              </span>
                              <span className="text-xs text-slate-550 font-bold uppercase font-mono">instances</span>
                            </div>
                            <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed mt-2 italic font-medium">
                              {activeCandidateId === "john_doe" 
                                ? "Exhibited abrupt hesitation pauses during regulatory return inquiries." 
                                : "Zero excessive silent gaps. Interactive turn rhythm is professional."}
                            </p>
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>

                  {/* BANTCQ MATRIX & CALL FLOW INTEGRATED MODULE */}
                  <div className="space-y-6">
                    
                    {/* SECTION TITLE HEADER */}
                    <div className="border-t-2 border-dashed border-slate-200 pt-6">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-md font-black uppercase tracking-wider font-display shrink-0 ${
                          theme === "dark" ? "text-slate-200" : "text-slate-900"
                        }`}>
                          BANTCQ INDEX & DIAGNOSTIC TIMELINE
                        </h4>
                        
                        {/* TOOLTIP: Hide explanatory micro-copy under a [ ? ] standard hover icon */}
                        <div className="group relative inline-block cursor-help text-slate-400 hover:text-slate-600 z-20">
                          <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center font-mono text-[10px] font-black leading-none select-none">?</span>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-slate-900 border border-slate-800 text-white text-[10px] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none leading-normal font-sans normal-case tracking-normal">
                            Real-time linkage between Korea's core conversational benchmarks (BANTCQ 요인 분석) and the visual sequential timeline of the wealth advisory track.
                          </div>
                        </div>

                        <div className={`w-full h-0.5 ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}></div>
                      </div>
                    </div>

                    {/* TWO COLUMN GRID: BANTCQ ON LEFT, HORIZONTAL TIMELINE ON RIGHT */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left: Dynamic BANTCQ Checklist (Span 6) */}
                      <div className={`lg:col-span-6 p-5 border rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                        theme === "dark" 
                          ? "bg-slate-950/40 border-slate-800 text-slate-100" 
                          : "bg-white border-slate-100 text-slate-900 shadow-xs"
                      }`}>
                        <div className="flex flex-col h-full justify-between gap-4">
                          <div>
                            <div className="flex items-center justify-between mb-3 pb-2 border-b border-dashed border-slate-200">
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono">
                                BANTCQ AUDIT INDEX LISTING
                              </span>
                              <span className="text-xs font-mono text-slate-800 dark:text-slate-200 font-black bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded">
                                PAGE {dashboardPage}/2
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              {(() => {
                                const itemsPerPage = 3;
                                const paginated = bantcqState.slice((dashboardPage - 1) * itemsPerPage, dashboardPage * itemsPerPage);
                                return paginated.map((chk) => {
                                  const matchingIdx = callFlowEvents.findIndex(ev => ev.criterion === chk.criterion);
                                  const isSelected = selectedTimelineIndex === matchingIdx;
                                  
                                  return (
                                    <div 
                                      key={chk.criterion} 
                                      onClick={() => {
                                        if (matchingIdx !== -1) {
                                          setSelectedTimelineIndex(matchingIdx);
                                          timelineDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                        }
                                      }}
                                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                                        isSelected 
                                          ? (theme === "dark" ? "bg-slate-900 border-sky-500" : "bg-sky-50 border-sky-400 shadow-xs") 
                                          : (theme === "dark" ? "bg-slate-900/60 border-slate-850 hover:border-slate-755" : "bg-slate-50 border-slate-200 hover:border-slate-350")
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 max-w-[70%]">
                                        <div className="p-1.5 bg-white rounded-md border border-slate-200 shrink-0">
                                          {getBantcqIcon(chk.criterion)}
                                        </div>
                                        <div className="truncate">
                                          <div className="flex items-center gap-1.5">
                                            <span className={`font-extrabold text-xs truncate ${theme === "dark" ? "text-slate-205" : "text-slate-900"}`}>
                                              {chk.criterion === "Compliance" ? "Required Rules (Compliance)" : chk.criterion}
                                            </span>
                                            <span className="text-xs text-slate-650 dark:text-slate-400 shrink-0 font-mono font-semibold">
                                              ({getKoreanLabel(chk.criterion)})
                                            </span>
                                          </div>
                                          <div className={`text-xs truncate font-mono mt-0.5 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                                            {chk.status === "FAIL" ? "❌ Compliance Alert: Click to see FAIL log" : `✅ Passed: "${chk.evidence.substring(0, 24)}..."`}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-1.5 shrink-0">
                                        <span className={`px-2 py-0.5 text-xs font-extrabold uppercase tracking-widest rounded-md border ${
                                          chk.status === "PASS"
                                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                            : "bg-red-50 text-red-800 border-red-300 motion-safe:animate-pulse"
                                        }`}>
                                          {chk.status}
                                        </span>
                                        <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleToggleBantcq(chk.criterion);
                                          }}
                                          className={`px-2 py-0.5 rounded-lg border text-xs font-mono font-bold uppercase cursor-pointer transition-all ${
                                            theme === "dark" 
                                              ? "bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-300" 
                                              : "bg-white hover:bg-slate-100 border-slate-300 text-slate-700"
                                          }`}
                                          title="Click to toggle pass/fail simulation"
                                          aria-label={`Toggle ${chk.criterion} status (currently ${chk.status})`}
                                        >
                                          Flip
                                        </button>
                                      </div>
                                    </div>
                                  );
                                });
                              })()}
                            </div>
                          </div>

                          {/* Pagination Controls */}
                          <div className="flex items-center justify-between pt-3 border-t border-dashed border-slate-200 mt-2">
                            <span className="text-xs text-slate-600 dark:text-slate-400 font-bold font-sans">
                              Showing {((dashboardPage - 1) * 3) + 1} to {Math.min(6, dashboardPage * 3)} of 6 entries
                            </span>
                            <div className="flex gap-1">
                              <button
                                disabled={dashboardPage === 1}
                                onClick={() => setDashboardPage(1)}
                                className={`px-2 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                                  dashboardPage === 1 
                                    ? "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent cursor-not-allowed" 
                                    : "bg-white hover:bg-slate-50 border-slate-300 text-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-300"
                                }`}
                              >
                                1
                              </button>
                              <button
                                onClick={() => setDashboardPage(2)}
                                className={`px-2 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                                  dashboardPage === 2 
                                    ? "bg-slate-900 text-white border-slate-900 dark:bg-sky-600 dark:text-white dark:border-sky-600" 
                                    : "bg-white hover:bg-slate-50 border-slate-300 text-slate-850 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-300"
                                }`}
                              >
                                2
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Sequential Flow Progress Map (Span 6) */}
                      <div className={`lg:col-span-6 p-5 border rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                        theme === "dark" 
                          ? "bg-slate-950/40 border-slate-800 text-slate-100" 
                          : "bg-white border-slate-100 text-slate-900 shadow-xs"
                      }`}>
                        <div>
                          <div className="flex items-center justify-between mb-2 pb-2 border-b border-dashed border-slate-205">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 font-mono">
                                Conversation Timeline
                              </span>
                              
                              {/* TOOLTIP: Hide explanatory micro-copy under a [ ? ] standard hover icon */}
                              <div className="group relative inline-block cursor-help text-slate-400 hover:text-slate-600 z-20">
                                <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center font-mono text-[10px] font-black leading-none select-none">?</span>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 border border-slate-800 text-white text-[10px] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none leading-normal font-sans normal-case tracking-normal">
                                  Sequential phases of the wealth consultation. Click any node sequence dot to synchronize the transcripts and audit notes.
                                </div>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-amber-500 font-mono">
                              콜 플로우 분석
                            </span>
                          </div>

                          <div className="relative py-4 px-1.5 bg-slate-950/20 border border-slate-200/10 rounded-xl">
                            {/* Horizontal Line background */}
                            <div className="absolute top-[35px] left-5 right-5 h-1 bg-slate-200 rounded-full"></div>
                            
                            {/* Accent indicator line up to selected index */}
                            <div 
                              className="absolute top-[35px] left-5 h-1 bg-sky-500 rounded-full transition-all duration-300"
                              style={{ width: `${(selectedTimelineIndex / 6) * 91}%` }}
                            ></div>

                            <div className="relative flex justify-between items-center">
                              {callFlowEvents.map((event, idx) => {
                                const isSelected = selectedTimelineIndex === idx;
                                const isFail = event.status === "FAIL";
                                
                                let circleColor = "bg-emerald-500 ring-emerald-100 ring-4";
                                if (isFail) {
                                  circleColor = "bg-rose-500 ring-rose-100 ring-4 motion-safe:animate-pulse";
                                } else if (event.id === "opening") {
                                  circleColor = "bg-sky-500 ring-sky-100 ring-4";
                                }

                                return (
                                  <button
                                    key={event.id}
                                    onClick={() => setSelectedTimelineIndex(idx)}
                                    className="flex flex-col items-center focus:outline-none group relative cursor-pointer"
                                    style={{ width: "13%" }}
                                  >
                                    <span className="text-[10px] font-mono font-bold text-slate-400 mb-2 whitespace-nowrap">
                                      {event.timestamp.split(" ")[0]}
                                    </span>

                                    <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center transition-all duration-200 ${
                                      isSelected 
                                        ? "scale-125 ring-4 ring-orange-400 bg-orange-500 font-black z-10" 
                                        : "hover:scale-110 z-0"
                                    } ${circleColor}`}>
                                      <span className="text-[10px] text-white font-mono font-bold">
                                        {idx + 1}
                                      </span>
                                    </div>

                                    <span className={`text-[10px] mt-2 font-black uppercase tracking-tight leading-none text-center block max-w-[42px] truncate ${
                                      isSelected 
                                        ? "text-sky-500 font-extrabold mt-2.5 scale-105" 
                                        : "text-slate-400 group-hover:text-slate-600"
                                    }`}>
                                      {event.korean_name.split(" ")[0]}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="mt-4 p-2.5 bg-slate-950/40 border border-slate-800 rounded-xl flex items-center justify-between text-[10.5px] font-mono text-slate-300">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="w-2 h-2 rounded-full bg-sky-500 motion-safe:animate-pulse"></span>
                              <span className="text-slate-300 uppercase font-black text-[11px] shrink-0">TRACKING CO-ORDINATE:</span>
                              <span className="text-white font-extrabold truncate">
                                {callFlowEvents[selectedTimelineIndex].phase_name} ({callFlowEvents[selectedTimelineIndex].korean_name})
                              </span>
                            </div>
                            <span className="text-sky-300 font-black text-[11px] shrink-0 ml-1.5 font-mono">
                              {callFlowEvents[selectedTimelineIndex].timestamp}
                            </span>
                          </div>

                        </div>
                      </div>

                    </div>

                    {/* Full-width Timeline Dialogue Auditing Console */}
                    <div 
                      ref={timelineDetailRef} 
                      id="dialogue-auditing-console"
                      className={`p-5 md:p-6 border rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                        theme === "dark" 
                          ? "bg-slate-900/40 border-slate-800 text-slate-100" 
                          : "bg-white border-slate-100 text-slate-900 shadow-sm"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] bg-slate-950 text-white font-mono font-bold px-2 py-0.5 rounded border border-slate-800">
                              Segment {selectedTimelineIndex + 1}
                            </span>
                            <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded border ${
                              callFlowEvents[selectedTimelineIndex].status === "PASS"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : "bg-red-50 text-red-800 border-red-300 motion-safe:animate-pulse"
                            }`}>
                              {callFlowEvents[selectedTimelineIndex].status}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">
                            COMPLIANCE ASSESSMENT
                          </span>
                        </div>

                        <h3 className="text-lg font-bold uppercase tracking-tight mb-2">
                          {callFlowEvents[selectedTimelineIndex].phase_name} ({callFlowEvents[selectedTimelineIndex].korean_name})
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                          
                          {/* Simulated Dialogue Box */}
                          <div className="p-4 bg-slate-950 text-amber-105 rounded-xl border-l-4 border-amber-400 font-mono text-[11.5px] leading-relaxed flex flex-col justify-between shadow-sm">
                            <div>
                              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-amber-400 block mb-3 border-b border-amber-900/50 pb-1.5">
                                🎙️ Transcript:
                              </span>
                              <p className="whitespace-pre-wrap leading-relaxed italic select-all select-none">
                                {callFlowEvents[selectedTimelineIndex].dialogue}
                              </p>
                            </div>
                            <div className="mt-4 pt-2 border-t border-amber-950/40 text-[11px] text-slate-400 text-right font-mono font-medium">
                              Timestamp: {callFlowEvents[selectedTimelineIndex].timestamp}
                            </div>
                          </div>

                          {/* Critical Assessment & ideal phrasing suggestion */}
                          <div className={`p-4 rounded-xl border flex flex-col justify-between transition-colors ${
                            theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
                          }`}>
                            <div>
                              <span className="text-[11px] font-black font-mono text-slate-400 uppercase block mb-1">
                                Feedback Notes:
                              </span>
                              <p className={`text-xs leading-relaxed font-semibold mb-4 ${
                                theme === "dark" ? "text-slate-200" : "text-slate-800"
                              }`}>
                                {callFlowEvents[selectedTimelineIndex].critique}
                              </p>

                              <span className="text-[11px] font-black font-mono text-slate-400 uppercase block mb-1">
                                Ideal Response (권장 가이드 발언):
                              </span>
                              <div className="bg-emerald-50/90 border border-emerald-300 text-emerald-950 p-3 rounded-lg text-[11px] font-mono font-bold leading-normal italic">
                                "{callFlowEvents[selectedTimelineIndex].ideal}"
                              </div>
                            </div>

                            {/* Actions bar inside detailed segment */}
                            <div className="mt-4 flex flex-wrap justify-end gap-2 border-t border-dashed border-slate-250 pt-3">
                              {callFlowEvents[selectedTimelineIndex].status === "FAIL" && (
                                <button
                                  onClick={() => {
                                    const matchingBant = bantcqState.find(b => b.criterion === callFlowEvents[selectedTimelineIndex].criterion);
                                    if (matchingBant) {
                                      setExecutionModalItem(matchingBant);
                                    }
                                  }}
                                  className="px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-800 hover:bg-rose-100 text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors flex items-center gap-1 shrink-0"
                                >
                                  <Info className="w-3.5 h-3.5" />
                                  Explain compliance
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setIsCoaching(true);
                                  setIsDrawerOpen(true);
                                  setTimeout(() => {
                                    setCoachingChat(prev => [
                                      ...prev,
                                      { role: "user", content: `Generate script drill for ${callFlowEvents[selectedTimelineIndex].phase_name}` },
                                      { role: "model", content: `**VOTEST Realtime Drill Launched:** Here is the compliance scenario for **${callFlowEvents[selectedTimelineIndex].phase_name}**:\n\n* **Audited Failure Context:** "${callFlowEvents[selectedTimelineIndex].critique}"\n* **Your Goal Compliance Statement:** "${callFlowEvents[selectedTimelineIndex].ideal}"\n\nPracticing with current candidate file loaded.` }
                                    ]);
                                    setIsCoaching(false);
                                  }, 500);
                                }}
                                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase rounded-lg border border-slate-800 shadow-sm cursor-pointer decoration-none font-sans"
                              >
                                Deploy interactive drill
                              </button>
                            </div>

                          </div>

                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {activeTab === "matrix" && (
                <div className="space-y-6">
                  
                  {/* PANEL 3: SCRIPT COMPLIANCE & BANTCQ EVALUATION MATRIX */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 flex items-center justify-between mb-1">
                      <span>BANTCQ Evaluation Matrix</span>
                    </h2>
                    <h3 className={`text-xl font-bold font-display uppercase tracking-tight mb-3 transition-colors ${theme === "dark" ? "text-white" : "text-slate-950"}`}>
                      Script Practice & BANTCQ Evaluation Matrix
                    </h3>
                    <p className={`text-xs leading-relaxed max-w-3xl transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-650"}`}>
                      This scorecard evaluates client conversation compliance against standard interactive wealth management phases. 
                      <strong className={`block mt-1.5 transition-colors ${theme === "dark" ? "text-sky-455" : "text-slate-950"}`}>💡 Manager Pro-Tip (Dynamic Simulation): Click or interact with any item's "PASS" or "FAIL" state buttons below to dynamically override the grading scorecard and watch the competency gauges recalculate.</strong>
                    </p>
                  </div>

                  {/* HIGH FIDELITY INTERACTIVE SCORECARD TABLE */}
                  <div className={`border rounded-2xl overflow-hidden transition-all mt-4 ${
                    theme === "dark" 
                      ? "border-slate-800 bg-slate-950 bg-slate-900" 
                      : "border-slate-150 bg-white shadow-sm"
                  }`}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-900 text-white font-mono uppercase border-b border-slate-800 text-xs tracking-wider">
                            <th className="p-4 font-black">Segment & Korean Param (평가 항목)</th>
                            <th className="p-4 font-black text-center">Interactive Status Toggle</th>
                            <th className="p-4 font-black">Transcript Evidence (검출 대사)</th>
                            <th className="p-4 font-black text-right">Ideal Script & Advisor Action</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y transition-colors ${theme === "dark" ? "divide-slate-800" : "divide-slate-200"}`}>
                          {(() => {
                            const itemsPerPage = 3;
                            const paginated = bantcqState.slice((matrixPage - 1) * itemsPerPage, matrixPage * itemsPerPage);
                            return paginated.map((item, idx) => (
                              <tr key={idx} className={`transition-colors ${theme === "dark" ? "hover:bg-slate-900/40" : "hover:bg-slate-50/50"}`}>
                                
                                {/* Task header segment & Korean translation */}
                                <td className="p-4">
                                  <div className="flex items-center gap-2.5">
                                    <div className="shrink-0 p-1 bg-white rounded-md border border-slate-250">
                                      {getBantcqIcon(item.criterion)}
                                    </div>
                                    <div>
                                      <span className={`font-extrabold text-sm block transition-colors ${theme === "dark" ? "text-white" : "text-slate-950"}`}>
                                        {item.criterion === "Compliance" ? "Required Rules (Compliance)" : item.criterion === "Question" ? "Questioning Strategy" : `${item.criterion} Verification`}
                                      </span>
                                      <span className="font-mono text-xs text-slate-550 dark:text-slate-350 font-bold uppercase tracking-wider block mt-0.5">
                                        {getKoreanLabel(item.criterion)} // {item.score}/10 pts
                                      </span>
                                    </div>
                                  </div>
                                </td>

                                {/* Interactive pass fail toggler buttons */}
                                <td className="p-4 text-center">
                                  <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 select-none">
                                    <button
                                      onClick={() => handleToggleBantcq(item.criterion)}
                                      className={`px-3 py-1.5 text-xs uppercase font-black tracking-wider rounded-lg cursor-pointer transition-all ${
                                        item.status === "PASS"
                                          ? "bg-slate-900 text-emerald-400"
                                          : "text-slate-500 hover:text-slate-800"
                                      }`}
                                    >
                                      PASS
                                    </button>
                                    <button
                                      onClick={() => handleToggleBantcq(item.criterion)}
                                      className={`px-3 py-1.5 text-xs uppercase font-black tracking-wider rounded-lg cursor-pointer transition-all ${
                                        item.status === "FAIL"
                                          ? "bg-rose-600 text-white shadow-sm"
                                          : "text-slate-500 hover:text-slate-800"
                                      }`}
                                    >
                                      FAIL
                                    </button>
                                  </div>
                                </td>

                                {/* Evidence Dialogue Block */}
                                <td className="p-4 max-w-xs">
                                  {item.evidence && item.evidence !== "None" ? (
                                    <div className="bg-slate-950 text-amber-100 p-2.5 rounded-lg border-l-4 border-amber-400 font-mono text-xs leading-relaxed italic select-all">
                                      "{item.evidence}"
                                    </div>
                                  ) : (
                                    <span className="text-slate-600 dark:text-slate-400 font-bold uppercase text-xs block">
                                      ❌ NO AUDITED EVIDENCE LOGGED
                                    </span>
                                  )}
                                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
                                    {item.critique}
                                  </p>
                                </td>

                                {/* Action [See Ideal Execution] for Failures, else show model quote */}
                                <td className="p-4 text-right">
                                  {item.status === "FAIL" ? (
                                    <span className="block">
                                      <button
                                        onClick={() => setExecutionModalItem(item)}
                                        className="px-3 py-1.5 bg-rose-50 border-2 border-rose-950 text-rose-950 hover:bg-rose-100 text-xs font-black uppercase rounded-lg shadow-xs cursor-pointer transition-colors inline-flex items-center gap-1.5 motion-safe:animate-pulse"
                                      >
                                        <Info className="w-3.5 h-3.5 text-rose-700" />
                                        [See Ideal Execution]
                                      </button>
                                    </span>
                                  ) : (
                                    <span className="block italic text-emerald-800 dark:text-emerald-400 font-bold leading-relaxed max-w-xs ml-auto text-xs">
                                      "{item.ideal_example}"
                                    </span>
                                  )}
                                </td>

                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>

                    {/* Matrix Pagination Controls */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
                      <span className="text-xs text-slate-700 dark:text-slate-350 font-bold font-sans">
                        Showing {((matrixPage - 1) * 3) + 1} to {Math.min(6, matrixPage * 3)} of 6 entries
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          disabled={matrixPage === 1}
                          onClick={() => setMatrixPage(1)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-md border transition-all cursor-pointer ${
                            matrixPage === 1 
                              ? "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500 border-transparent cursor-not-allowed" 
                              : "bg-white hover:bg-slate-100 border-slate-300 text-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-300"
                          }`}
                        >
                          1
                        </button>
                        <button
                          onClick={() => setMatrixPage(2)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-md border transition-all cursor-pointer ${
                            matrixPage === 2 
                              ? "bg-slate-900 text-white border-slate-900 dark:bg-sky-600 dark:text-white dark:border-sky-600" 
                              : "bg-white hover:bg-slate-100 border-slate-300 text-slate-850 dark:bg-slate-950 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-300"
                          }`}
                        >
                          2
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === "ingest" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center justify-between mb-1">
                      <span>MULTILINGUAL AUDIO RECORDINGS INGESTION GATE // 발화 분석 모델</span>
                      <span className="font-mono text-slate-500">ENG / KOR MULTIMODAL</span>
                    </h2>
                    <h3 className="text-xl font-bold font-display text-slate-955 uppercase tracking-tight">
                      Deploy Custom Consultation Simulations
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 pb-4">
                      Test custom scenarios of advisor speech to see how VSTest grades disclaimers, fee complaints active cushioning, and acoustic timing metrics dynamically.
                    </p>
                  </div>

                  <CandidateSelector
                    onSelectCandidate={(cand, trans) => {
                      if (cand) {
                        setActiveCandidateId(cand.id);
                        setActiveTab("dashboard");
                      }
                    }}
                    selectedCandidateId={activeCandidateId}
                    onAnalyze={handleAnalyze}
                    isLoading={isEvaluating}
                  />

                  {evalError && (
                    <div className="p-4 bg-rose-50 border-2 border-red-900 rounded-xl text-xs text-red-950 font-bold flex gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-700 shrink-0" />
                      {evalError}
                    </div>
                  )}
                </div>
              )}

          </main>

          {/* Right Column: Sticky Sidebar 'VOTEST AI Advisor Co-Pilot' (Now a modern slide-out Drawer & FAB) */}
          {/* Co-Pilot Drawer Overlay Background Backdrop */}
          {isDrawerOpen && (
            <div 
              id="copilot-drawer-backdrop"
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 transition-opacity duration-300"
              onClick={() => setIsDrawerOpen(false)}
            />
          )}

          {/* Slide-out AI Assistant Drawer Panel */}
          <div
            id="copilot-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="AI Training Assistant"
            tabIndex={-1}
            className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-slate-950 text-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out border-l-4 border-slate-900 focus:outline-none ${
              isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b-2 border-slate-850 bg-slate-900 flex items-center justify-between gap-3 shrink-0 font-sans">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-slate-950 shrink-0 shadow-sm border border-orange-400">
                  <Sparkles className="w-4.5 h-4.5 text-slate-950" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold tracking-tight uppercase font-display leading-tight text-white">
                    AI Training Assistant
                  </h3>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-none mt-0.5">
                    Integrated SEC Practice Assistant
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-emerald-400 font-mono font-bold leading-none bg-emerald-950/80 border border-emerald-950 px-1.5 py-0.5 rounded">
                  ACTIVE
                </span>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Close AI Assistant Panel"
                  aria-label="Close AI Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Body Container */}
            <div className="flex-grow flex flex-col p-5 overflow-y-auto min-h-0 space-y-4">
              
              {/* Top Section (Automated Insight - subtly shaded card containing the 'Coaching Roadmap') */}
              <div className="bg-slate-900 border-2 border-orange-500/25 rounded-xl p-4 shadow-[0_4px_12px_rgba(249,115,22,0.06)] relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 p-1 px-2.5 bg-orange-500/15 border-l border-b border-orange-500/30 text-orange-400 font-mono text-[10px] font-black uppercase rounded-bl-lg">
                  INSIGHT
                </div>
                <span className="text-[11px] font-mono font-black text-orange-400 uppercase tracking-widest block mb-1.5">
                  ⚡ INSTANT FEEDBACK & ROADMAP
                </span>
                <div className="text-[11px] leading-relaxed text-slate-350 font-sans">
                  {parseMessageContent(getDynamicAIDirective())}
                </div>
              </div>

              <div className="text-[11px] font-mono font-black text-slate-400 uppercase tracking-widest block pb-1 border-b border-slate-800">
                AI ASSISTANT INTERACTIVE WORKPLACE
              </div>

              {/* Chat Messages */}
              <div className="space-y-4">
                {coachingChat.map((msg, index) => {
                  const isUser = msg.role === "user";
                  const isRoadmapBubble = msg.key === "roadmap";

                  return (
                    <div
                      key={index}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                    >
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        {isUser ? "USER EXECUTION" : "AI ASSISTANT"}
                      </span>
                      
                      <div
                        className={`p-3.5 rounded-xl leading-relaxed text-[11px] relative max-w-[90%] ${
                          isUser
                            ? "bg-slate-900 text-sky-300 border border-slate-800 rounded-tr-none font-mono"
                            : isRoadmapBubble
                            ? "bg-slate-900/60 text-slate-350 border border-slate-800 rounded-tl-none font-sans font-medium"
                            : "bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none font-sans"
                        }`}
                      >
                        <div className="leading-relaxed">{parseMessageContent(msg.content)}</div>

                        {/* Email copy helper */}
                        {msg.content.includes("Subject: Feedback") && (
                          <button
                            type="button"
                            onClick={() => handleCopyToClipboard(msg.content)}
                            className="mt-2.5 w-full py-1.5 bg-slate-850 hover:bg-slate-800 text-white font-bold text-[9px] uppercase tracking-wider flex items-center justify-center gap-1.5 border border-slate-700 rounded-lg transition-all cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            {copiedText || "Copy Email to Clipboard"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {isCoaching && (
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 italic">
                    <RefreshCw className="w-3 h-3 animate-spin text-orange-500" />
                    Advisor compiling compliance workouts...
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

            </div>

            {/* Bottom Section (Input Terminal & Quick Actions) */}
            <div className="p-5 border-t border-slate-800 bg-slate-900 flex flex-col gap-3.5 shrink-0">
              
              {/* Quick Action Pill Tags Container neatly positioned just above text input */}
              <div>
                <span className="text-[11px] font-mono font-extrabold text-slate-400 uppercase tracking-widest block mb-1.5">
                  ⚡ AI Assistant Quick Action Pill Tags
                </span>
                
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={handleGetScriptDrill}
                    disabled={isCoaching}
                    className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-orange-500/30 hover:border-orange-400 text-orange-300 font-mono text-[9px] font-bold uppercase rounded-full cursor-pointer transition-colors flex items-center gap-1 shrink-0"
                  >
                    <BookOpen className="w-3 h-3 text-orange-455" />
                    Script Drill
                  </button>
                  <button
                    type="button"
                    onClick={handleExplainFailure}
                    disabled={isCoaching}
                    className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-sky-500/30 hover:border-sky-400 text-sky-300 font-mono text-[9px] font-bold uppercase rounded-full cursor-pointer transition-colors flex items-center gap-1 shrink-0"
                  >
                    <AlertTriangle className="w-3 h-3 text-sky-455" />
                    Explain Fail
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerateEmail}
                    disabled={isCoaching}
                    className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 font-mono text-[9px] font-bold uppercase rounded-full cursor-pointer transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Mail className="w-3 h-3 text-emerald-455" />
                    Candidate Email
                  </button>
                </div>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask AI Assistant questions..."
                  value={coachingInput}
                  onChange={(e) => setCoachingInput(e.target.value)}
                  className="flex-grow bg-slate-950 text-white font-mono text-[10.5px] border border-slate-700 hover:border-slate-600 rounded-lg px-3 py-2.5 focus:outline-none focus:border-sky-500 placeholder-slate-600 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isCoaching || !coachingInput.trim()}
                  className="bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase px-3.5 rounded-lg cursor-pointer transition-colors flex items-center justify-center shrink-0 shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>

          {/* Floating Action Button (FAB) in the bottom right corner */}
          <button
            id="ask-copilot-fab"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open AI Training Assistant"
            aria-expanded={isDrawerOpen}
            className="fixed bottom-6 right-6 z-30 bg-sky-600 hover:bg-sky-500 text-white font-extrabold px-5 py-3.5 rounded-full shadow-[0_4px_25px_rgba(2,132,199,0.4)] border-2 border-white hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer group"
            title="Open AI Assistant Console"
          >
            <Sparkles className="w-4.5 h-4.5 text-white motion-safe:motion-safe:animate-pulse" />
            <span className="text-xs font-display tracking-widest uppercase">Ask AI Assistant</span>
          </button>

        </div>

        {/* INLINE BEST-PRACTICE EXAMPLE MODAL PORTAL */}
        <AnimatePresence>
          {executionModalItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
                onClick={() => setExecutionModalItem(null)}
              />
              
              <motion.div 
                ref={modalRef}
                tabIndex={-1}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative bg-white border-4 border-slate-950 max-w-lg w-full rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] overflow-hidden focus:outline-none"
              >
                <div className="flex items-center justify-between pb-3.5 border-b-2 border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-rose-50 border-2 border-rose-950 text-rose-950 rounded-xl">
                      <Award className="w-5 h-5 text-rose-700" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-950 text-base leading-tight">
                        Ideal Consultation Phrasing
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono tracking-wider font-bold uppercase leading-none">
                        {executionModalItem.criterion === "Compliance" ? "SEC Regulatory Accord Standards" : `${executionModalItem.criterion} Phase standard`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setExecutionModalItem(null)}
                    aria-label="Close ideal phrasing guide"
                    className="p-1 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Ideal phrase blockquote */}
                <div className="my-5 bg-slate-900 p-5 rounded-xl border-l-4 border-amber-400">
                  <span className="text-[9px] font-mono font-black uppercase text-amber-350 block mb-1.5">
                    🏆 COMPLIANT PHRASING MODEL // 이상적인 발언 가이드:
                  </span>
                  <blockquote className="text-sm font-semibold text-white leading-relaxed italic font-mono select-all">
                    "{executionModalItem.ideal_example}"
                  </blockquote>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                  <div className="font-black text-slate-800 text-[10px] uppercase tracking-wider mb-1">
                    CRITIQUE FROM VOTEST ENGINE // 자동 평가 피드백:
                  </div>
                  <p className="leading-relaxed font-semibold mb-2.5 text-slate-800">
                    {executionModalItem.critique}
                  </p>
                  <div className="text-[10px] text-slate-500 leading-normal border-t border-slate-200 pt-2 font-mono">
                    *By employing this standard formula, advisors establish legal defensive alignment, avoid false expectations, and successfully build trustworthy customer sequences.
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    onClick={() => setExecutionModalItem(null)}
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-white font-black text-xs uppercase rounded-lg border border-slate-950 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] cursor-pointer"
                  >
                    Dismiss Guide
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* SYSTEM AUDIT COMPANION FOOTER */}
        <footer className={`border-t-4 px-6 py-4 flex flex-col md:flex-row items-center justify-between text-[11px] gap-3 shrink-0 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-950 border-slate-800 text-slate-400"
            : "bg-white border-slate-950 text-slate-500"
        }`}>
          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <span className={`font-extrabold font-display ${theme === "dark" ? "text-slate-200" : "text-slate-900"}`}>VOTEST CONVERSATIONAL SYSTEMS</span>
            <span className="opacity-50">•</span>
            <span>VODA Bi English-Korean Translated Architecture</span>
            <span className="opacity-50">•</span>
            <span className={`font-mono ${theme === "dark" ? "text-sky-400" : "text-sky-600 hover:text-slate-950"}`}>
              7194-XQ // SEC RULINGS COMPLETE
            </span>
          </div>
          <div className="text-right font-mono text-[10px]">
            © 2026 VODA Bi Systems Inc. All security privileges active.
          </div>
        </footer>

      </div>
    </div>
  );
}
