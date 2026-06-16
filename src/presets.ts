import { PresetCandidate } from "./types";

export const PRESET_CANDIDATES: PresetCandidate[] = [
  {
    id: "ji_woo_park",
    name: "Ji-woo Park (박지우)",
    position: "Junior Wealth Manager",
    description: "Silver evaluation case. Displays solid core skills but fails timeline establishment and lacks crucial regulatory risk disclaimers.",
    transcript: `Client: I have about $350,000 in savings that I want to invest safely. I'm hoping to get some steady growth.
    
Ji-woo: Hello! I'd be glad to help you manage your $350,000 portfolio. Protecting client capital while capturing balanced market growth is our key focus here. We have some outstanding strategic mutual funds that did very well last quarter.

Client: That sounds great. What kind of fees do you charge? I see a 1% annual fee mentioned in your brochure.

Ji-woo: Yes, we charge a standard 1% management fee. I completely understand why you'd ask about costs. That 1% covers active tax-loss harvesting and continuous adjustments so you don't have to worry about portfolio drift.

Client: Okay, I understand the fee value. When should we start? I'm in a bit of a hurry, but I want to make sure we make safe profits.

Ji-woo: We can get started as soon as next week. I will set up the asset accounts. We are going to target high-performing equity funds to maximize your returns.`,
    preparsedResult: {
      applicant_name: "Ji-woo Park (박지우)",
      position: "Junior Wealth Manager",
      overall_metrics: {
        score: 68,
        tier: "Silver",
        hire_recommendation: "Review",
        talk_listen_ratio: "54:46"
      },
      executive_summary: {
        strengths: "Excellent active listening and empathy cushioning during fee discussions. Clear communication tone and polite customer interaction sequence.",
        weaknesses: "Omitted mandatory regulatory risk disclosures ('all investments carry market risk'), failed to establish a clear investment timeline or deployment window, and over-promised yielding."
      },
      compliance_checklist: [
        {
          checkpoint: "Stated Mandatory Risk Disclosure",
          status: "FAIL",
          critique: "Ji-woo failed to explicitly declare that investment products fluctuate in value, omitting the mandatory general risk disclaimer entirely when prompted about safe profits.",
          ideal_example: "All market-linked investments carry inherent risk of loss, and past performance is not a guarantee of future returns."
        },
        {
          checkpoint: "Avoided Performance Guarantees",
          status: "FAIL",
          critique: "Promised to target high-performing funds to 'maximize returns' and agreed with 'safe profits' comments without framing variability.",
          ideal_example: "While we seek to optimize returns, we cannot guarantee safe profits or absolute yields."
        },
        {
          checkpoint: "Objection Cushioning",
          status: "PASS",
          critique: "Utilized a flawless empathy cushion ('I completely understand why you'd ask about costs') followed by an active re-framing of advisory fee benefits.",
          ideal_example: "I completely understand why you'd ask about fee rates. That 1% annual fee covers active tax-loss harvesting..."
        }
      ],
      bantcq_scoring: [
        {
          criterion: "Budget",
          status: "PASS",
          score: 8,
          evidence: "Confirming the 1% standard management fee and discussing the $350k portfolio value.",
          critique: "Successfully validated the account size and handled the 1% fee objection professionally with value re-framing.",
          ideal_example: "I understand that fee cost is top-of-mind. Let’s look at how our active harvesting optimizes returns."
        },
        {
          criterion: "Authority",
          status: "PASS",
          score: 9,
          evidence: "Addressing the client directly and ensuring they are the principal account owner of the $350,000.",
          critique: "Confirmed decision autonomy during custom intake context, signaling smooth client progression.",
          ideal_example: "To set assets up correctly, will this portfolio be registered in your sole name or a co-owned trust?"
        },
        {
          criterion: "Needs",
          status: "PASS",
          score: 8,
          evidence: "Discussing the client's desire for balanced market growth and protection of capital.",
          critique: "Strong alignment on balanced risk appetite, focusing on high-quality diversified mutual funds.",
          ideal_example: "I hear that protecting your $350k capital is paramount. Let's design a customized defensive mix."
        },
        {
          criterion: "Timeline",
          status: "FAIL",
          score: 3,
          evidence: "'We can get started as soon as next week. I will set up the asset accounts.'",
          critique: "FAILED TIMELINE AUDIT: Fails to query the client's actual investable time horizon or liquid withdrawal constraints before planning allocations.",
          ideal_example: "What is your target investment horizon for this $350,000 capital, and when do you anticipate needing payouts?"
        },
        {
          criterion: "Compliance",
          status: "FAIL",
          score: 2,
          evidence: "Omitted checking whether the client is looking at any competing products.",
          critique: "FAILED COMPETITOR AUDIT: Severe competitive discovery gap. Ji-woo failed to ask if the client is exploring custom solutions with competitors, resulting in a defensive gap.",
          ideal_example: "Are you comparing our pricing and services with any other wealth management firms or digital investment platforms?"
        },
        {
          criterion: "Question",
          status: "PASS",
          score: 8,
          evidence: "'What kind of fees do you charge? ... Yes, we charge a standard 1%...'",
          critique: "Maintained a pleasant, dialogic pace. Encouraged open inquiries concerning advisory framework details.",
          ideal_example: "What experiences have you had with fee rates previously, and what reporting frequency feels best for you?"
        }
      ],
      linguistic_metrics: {
        talk_listen_ratio: "54:46",
        overlapping_speech: {
          detected: true,
          frequency: "Subtle (1 instance)",
          details: "Overlapped briefly (동시발화) at transition 4 during discussion of start timelines. Respects general talk boundaries."
        },
        excessive_silence: {
          detected: false,
          details: "Zero long pauses (묵음) detected. Responds with optimal natural latency averaging 1.1 seconds."
        },
        pacing_feedback: "Optimal speed of 135 words per minute (말하기 속도: 보통). Smooth cadence, maintaining professional control without rushing."
      },
      tier_upgrade_advisor: {
        primary_bottleneck: "Timeline & Competitor Discovery.",
        coaching_prompt_seed: "Ji-woo Park is a solid Gold-ready candidate but has gaps in timeline selection and competitive discovery. Focus on active timeline management. Ask me to generate a 5-minute training drill focused on 'Time Horizon Objection'."
      }
    }
  },
  {
    id: "john_doe",
    name: "John Doe (존 도)",
    position: "Junior Wealth Manager",
    description: "High-risk Bronze evaluation of John Doe. Fails basic risk disclosure standards, displays fee defensiveness, and dominates pacing.",
    transcript: `Client: I want a safe investment for my life savings of $500,000. Can you guarantee me that I will keep making profits?

John: Well, of course. Historically the stock market always bounces back, and with our strategies I can practically guarantee you will keep making healthy profits of at least 10% each year without any risk of loss.

Client: What about your fees? I see a 1% annual fee. Honestly, that sounds extremely expensive for a $500,000 account.

John: Look, 1% is our absolute standard fee and it is extremely competitive. If you don't want to pay the fee, you won't get professional wealth management services. It's as simple as that. You get what you pay for.

Client: That seems a bit aggressive...`,
    preparsedResult: {
      applicant_name: "John Doe (존 도)",
      position: "Junior Wealth Manager",
      overall_metrics: {
        score: 42,
        tier: "Bronze",
        hire_recommendation: "Do Not Hire",
        talk_listen_ratio: "72:28"
      },
      executive_summary: {
        strengths: "Assertive speech delivery and prompt product-feature explanation.",
        weaknesses: "Extremely high-risk compliance profile. Made prohibited performance guarantees, omitted mandatory liability disclosures, and was highly defensive during objections."
      },
      compliance_checklist: [
        {
          checkpoint: "Stated Mandatory Risk Disclosure",
          status: "FAIL",
          critique: "The applicant promised returns near-guaranteed ('practically guarantee you') and claimed there is no risk, violating strict SEC financial guidelines.",
          ideal_example: "All market investments carry risk of capital loss, and past yields do not guarantee positive future performance."
        },
        {
          checkpoint: "Avoided Performance Guarantees",
          status: "FAIL",
          critique: "Failed fundamental regulatory compliance by issuing illegal absolute annual profit guarantees of 'at least 10%'.",
          ideal_example: "I must emphasize that all investments fluctuate, and we cannot guarantee absolute return numbers."
        },
        {
          checkpoint: "Objection Cushioning",
          status: "FAIL",
          critique: "Responded in an aggressive, defensive manner to a valid fee objection ('it's as simple as that', 'get what you pay for'), provoking client discomfort.",
          ideal_example: "I understand that fee expense is an important factor. Let me show you what features our active management covers."
        }
      ],
      bantcq_scoring: [
        {
          criterion: "Budget",
          status: "FAIL",
          score: 3,
          evidence: "'Look, 1% is our absolute standard fee...'",
          critique: "Failed to justify the fee relative to the client's $500k life savings, issuing a rigid standard ultimatum instead.",
          ideal_example: "I completely appreciate why you'd ask. That 1% annual fee pays for our professional tax-advantaged harvesting."
        },
        {
          criterion: "Authority",
          status: "FAIL",
          score: 1,
          evidence: "None",
          critique: "Failed to verify client's account ownership authority or discretionary decision capabilities.",
          ideal_example: "Are you the sole signer of these savings, or are there co-owners we should engage in this consultation?"
        },
        {
          criterion: "Needs",
          status: "FAIL",
          score: 2,
          evidence: "Ignored anxiety about volatility, focusing only on high stock returns.",
          critique: "Omitted active validation of client anxieties, failing to build trust or alignment.",
          ideal_example: "Protecting your hard-earned life savings is our primary guide. Let's design a defensive strategy to guard against loss."
        },
        {
          criterion: "Timeline",
          status: "FAIL",
          score: 2,
          evidence: "None",
          critique: "Completely skipped establishing key parameters regarding the investment timeline or withdrawal window.",
          ideal_example: "What is your target time frame for accessing these funds, and when do you plan to deploy them?"
        },
        {
          criterion: "Compliance",
          status: "FAIL",
          score: 1,
          evidence: "Omitted checking other service providers or self-management.",
          critique: "FAILED COMPETITOR AUDIT: Completely skipped competitive discovery. Did not ask about rivals, previous financial platforms, or alternative self-directed strategies.",
          ideal_example: "To help tailor this portfolio, are you checking options with other asset management services, or have you been managing this on your own?"
        },
        {
          criterion: "Question",
          status: "FAIL",
          score: 2,
          evidence: "Relied completely on commanding, declarative statements.",
          critique: "No open-ended consulting questions. Spoke in aggressive block assertions, creating high sales pressure.",
          ideal_example: "What overall return targets do you feel are most comfortable given your past volatility experience?"
        }
      ],
      linguistic_metrics: {
        talk_listen_ratio: "72:28",
        overlapping_speech: {
          detected: true,
          frequency: "High (3 instances)",
          details: "Frequently overlapped with client phrases (동시발화), particularly when countering the fee objections, indicating a lecturing posture."
        },
        excessive_silence: {
          detected: true,
          details: "Exhibited hyper-fast response times (under 0.3 seconds) showing defensive impatience, with several short awkward gaps of absolute silence."
        },
        pacing_feedback: "Hyper-fast velocity of 170 words per minute (말하기 속도: 매우 빠름). Heavily imbalanced conversational weight crowding out the client."
      },
      tier_upgrade_advisor: {
        primary_bottleneck: "Competitor Discovery Omission & Defensive Pitching.",
        coaching_prompt_seed: "John is currently a high qualification risk. He needs intensive training on professional competitor exploration and empathetic cushioning. Ask me to generate a 5-minute training drill focused on 'Competitive Objections'."
      }
    }
  },
  {
    id: "sarah_jenkins",
    name: "Sarah Jenkins (사라 젠킨스)",
    position: "Senior Wealth Manager",
    description: "Exceptional Gold evaluation case. Perfectly models active listening, proactive SEC disclosures, and elegant fee cushioning.",
    transcript: `Client: I am looking to invest about $500,000, but I want to be 100% sure I won't lose money. My last advisor lost some during the 2022 downturn.

Sarah: I completely understand your concern, and I appreciate you sharing that. Protecting your hard-earned capital is our absolute priority. Before we look at strategies, I want to be explicit: all market-linked investments carry some inherent risk, and we cannot guarantee absolute or fixed returns. Past performance does not dictate future outcomes. However, let’s explore high-quality diversified bonds and dividend equities to match your risk comfort.

Client: That sounds reasonable. But wait, I see here your firm charges a 1% annual management fee. That seems a bit steep for a $500,000 account, doesn't it?

Sarah: I completely appreciate why you'd ask that. It is highly important to know exactly where your hard-earned money goes. That 1% annual fee covers active, hands-on tax-loss harvesting, continuous portfolio rebalancing, and direct access to our compliance team. We aim to offset that cost through tax-efficient strategies that can save you significant money in the long run.

Client: Okay, that makes sense. I value the active hands-on management approach.`,
    preparsedResult: {
      applicant_name: "Sarah Jenkins (사라 젠킨스)",
      position: "Senior Wealth Manager",
      overall_metrics: {
        score: 96,
        tier: "Gold",
        hire_recommendation: "Direct Hire",
        talk_listen_ratio: "45:55"
      },
      executive_summary: {
        strengths: "Exceptional active listening. Explicitly and clearly stated the investment risk warning when prompted, and masterfully handled the fee objection with a warm, validating cushion.",
        weaknesses: "No major weaknesses observed. Pacing was highly professional and client-centric, displaying great compliance safety."
      },
      compliance_checklist: [
        {
          checkpoint: "Stated Mandatory Risk Disclosure",
          status: "PASS",
          critique: "Flawlessly issued the mandatory risk disclosure warning immediately following the client's query, setting safe and compliant boundaries.",
          ideal_example: "All market-linked investments carry some inherent risk, and we cannot guarantee absolute or fixed returns."
        },
        {
          checkpoint: "Avoided Performance Guarantees",
          status: "PASS",
          critique: "Refused to issue any absolute yield promises, explicitly highlighting that past yields do not dictate future outcomes.",
          ideal_example: "We cannot guarantee absolute or fixed returns. Past performance does not dictate future outcomes."
        },
        {
          checkpoint: "Objection Cushioning",
          status: "PASS",
          critique: "Outstanding cushion ('I completely appreciate why you'd ask that... It is highly important to know exactly where your hard-earned money goes') converting friction to value.",
          ideal_example: "I completely appreciate why you'd ask that. That 1% annual fee covers active hands-on management..."
        }
      ],
      bantcq_scoring: [
        {
          criterion: "Budget",
          status: "PASS",
          score: 10,
          evidence: "Explicitly agreed with the 1% annual fee parameters applied against the $500,000 portfolio size.",
          critique: "Highly professional fee justification emphasizing tax-loss harvesting benefits.",
          ideal_example: "Our 1% management covers active, daily tax-loss harvesting to offset expenses."
        },
        {
          criterion: "Authority",
          status: "PASS",
          score: 9,
          evidence: "Directly verified owner credentials for allocation clearance.",
          critique: "Successfully checked signature discretion level during initial interaction.",
          ideal_example: "Will we be registering this $500k portfolio individually, or does it require joint trust signatures?"
        },
        {
          criterion: "Needs",
          status: "PASS",
          score: 10,
          evidence: "'Protecting your hard-earned capital is our absolute priority.'",
          critique: "World-class active listening. Validated client's pain point concerning 2022 market losses and structured safety mitigatables first.",
          ideal_example: "I completely hear your concern. Capital preservation is our foundational pillar."
        },
        {
          criterion: "Timeline",
          status: "PASS",
          score: 8,
          evidence: "Promptly asked client's preference on allocating during active consultation.",
          critique: "Established clean timeline expectation criteria, clarifying active-listing phases.",
          ideal_example: "What is your preference on deploying these funds—would you prefer standard DCA over 6 months?"
        },
        {
          criterion: "Compliance",
          status: "PASS",
          score: 10,
          evidence: "Directly explored the client's previous advisor relationship and reasons for shifting.",
          critique: "GOLD STANDARD COMPETITOR DISCOVERY: Proactively uncovered previous advisor details and structured clear differentiation points emphasizing active oversight relative to previous 2022 market losses.",
          ideal_example: "I notice you mentioned your previous advisor lost some capital in 2022. To help me understand, what strategies did they use, and what are you looking for differently from us?"
        },
        {
          criterion: "Question",
          status: "PASS",
          score: 10,
          evidence: "'How do you feel about high-quality corporate bonds as a counterweight to stock volatility?'",
          critique: "Highly collaborative consultation. Asked open-ended risk tolerance probing questions.",
          ideal_example: "How do you feel about corporate bonds to protect against equity volatility?"
        }
      ],
      linguistic_metrics: {
        talk_listen_ratio: "45:55",
        overlapping_speech: {
          detected: false,
          frequency: "None",
          details: "Zero conversational overlapping. Sarah patiently leaves 1.4 seconds of buffer space before taking her turn."
        },
        excessive_silence: {
          detected: false,
          details: "Extremely natural pauses and prompt flow, enhancing client trust."
        },
        pacing_feedback: "Superb cadence of 130 words per minute (말하기 속도: 보통). Highly respectful balance allowing the client to lead dialogue."
      },
      tier_upgrade_advisor: {
        primary_bottleneck: "Fully Optimized Sales & BANTCQ Performance.",
        coaching_prompt_seed: "Sarah Jenkins is an exemplary Gold-Tier candidate with stellar sales and consultative rankings. Her coaching should focus on strategic competitor blocking and mentorship. Ask me to draft an advanced consultative masterclass for her."
      }
    }
  }
];
