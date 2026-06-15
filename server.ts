import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry headers
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// 1. API: Evaluate conversation transcript
app.post("/api/evaluate", async (req, res) => {
  const { transcript } = req.body;

  if (!transcript || transcript.trim() === "") {
    return res.status(400).json({ error: "Transcript is required" });
  }

  if (!ai) {
    return res.status(500).json({
      error: "Gemini API client not configured. Please ensure process.env.GEMINI_API_KEY is active.",
    });
  }

  try {
    const prompt = `
You are the advanced English/Multilingual Evaluation Engine for VODA Bi's VOTEST platform, specializing in automated HR screening, compliance checking, and capability testing for the financial advisory sector.

You are given a transcript of a conversation between a Wealth Manager/Advisory Applicant and a Client. 

Evaluate the transcript closely based on these critical criteria:
1. THE PROPRIETARY BANTCQ FRAMEWORK:
   - Budget: Did the applicant discuss the investable funds/savings amount (confirming clients with $50,000 or $500,000 backgrounds) and the 1% annual fee?
   - Authority: Did they confirm the client has sole signature/discretionary authority over the funds?
   - Needs: Did they validate and cushion the client's anxiety about market volatility, or ignore their worries?
   - Timeline: Did they establish when the client wants to invest or transition custody?
   - Compliance: Did they explicitly state that investments carry risk of loss and avoid guaranteeing outputs?
   - Question: Did the applicant use open-ended questions to guide the client rather than declarative pitches?

2. LINGUISTIC METRICS:
   - Calculate the Talk/Listen ratio (Speech Share) in "Talk:Listen" percentage format.
   - Flag any instances of overlapping speech/interruptions.
   - Detect excessive/awkward silence or rapid-response tempo indicating impatience.
   - Continuous words-per-minute (WPM) flow feedback.

3. COMPLIANCE CHECKLIST STANDARDS:
   - Point 1: "Stated Mandatory Risk Disclosure" (PASS or FAIL)
   - Point 2: "Avoided Performance Guarantees" (PASS or FAIL)
   - Point 3: "Objection Cushioning" (PASS or FAIL)

Applicant Transcript:
"""
${transcript}
"""

Ensure your response is valid JSON strictly compliant with the required schema. Ensure every property is realistically fleshed out and matches the content of the transcript. Do not assume or hallucinate outside the context of the transcript, but derive an accurate evaluation representing compliance status.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            applicant_name: {
              type: Type.STRING,
              description: "The name of the applicant. If not explicitly found in the transcript, infer it or default to Candidate.",
            },
            position: {
              type: Type.STRING,
              description: "E.g. Wealth Manager, Financial Advisor, or Junior wealth advisor.",
            },
            overall_metrics: {
              type: Type.OBJECT,
              properties: {
                score: {
                  type: Type.INTEGER,
                  description: "Total overall score between 0 and 100.",
                },
                tier: {
                  type: Type.STRING,
                  description: "Tier evaluated: 'Gold' (scores 90+), 'Silver' (scores 60-89), or 'Bronze' (scores <60).",
                },
                hire_recommendation: {
                  type: Type.STRING,
                  description: "E.g. Direct Hire, Review, or Do Not Hire.",
                },
                talk_listen_ratio: {
                  type: Type.STRING,
                  description: "Calculated ratio e.g. '45:55' or '72:28'. Ensure the sum of ratio values equals 100.",
                },
              },
              required: ["score", "tier", "hire_recommendation", "talk_listen_ratio"],
            },
            executive_summary: {
              type: Type.OBJECT,
              properties: {
                strengths: { type: Type.STRING },
                weaknesses: { type: Type.STRING },
              },
              required: ["strengths", "weaknesses"],
            },
            compliance_checklist: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  checkpoint: {
                    type: Type.STRING,
                    description: "The checkpoint evaluated. You must evaluate exactly these checkpoints: 'Stated Mandatory Risk Disclosure', 'Avoided Performance Guarantees', and 'Objection Cushioning'.",
                  },
                  status: {
                    type: Type.STRING,
                    description: "'PASS' or 'FAIL' based on behavior.",
                  },
                  critique: {
                    type: Type.STRING,
                    description: "Concrete feedback explaining the reasoning for the status.",
                  },
                  ideal_example: {
                    type: Type.STRING,
                    description: "Explicit model answer of what the candidate should have said in this scenario.",
                  },
                },
                required: ["checkpoint", "status", "critique", "ideal_example"],
              },
            },
            bantcq_scoring: {
              type: Type.ARRAY,
              description: "Assess all 6 dimensions of the proprietary BANTCQ Framework: Budget, Authority, Needs, Timeline, Compliance, Question.",
              items: {
                type: Type.OBJECT,
                properties: {
                  criterion: {
                    type: Type.STRING,
                    description: "Must be exactly one of: 'Budget', 'Authority', 'Needs', 'Timeline', 'Compliance', or 'Question'.",
                  },
                  status: {
                    type: Type.STRING,
                    description: "'PASS' or 'FAIL'.",
                  },
                  score: {
                    type: Type.INTEGER,
                    description: "Competency rating from 0 (very poor/omitted) to 10 (perfectly executed).",
                  },
                  evidence: {
                    type: Type.STRING,
                    description: "The exact quote or lack of from the transcript.",
                  },
                  critique: {
                    type: Type.STRING,
                    description: "Direct analytical critique explaining the score based on BANTCQ definitions.",
                  },
                  ideal_example: {
                    type: Type.STRING,
                    description: "The ideal verbal phrasing the candidate should have spoken.",
                  },
                },
                required: ["criterion", "status", "score", "evidence", "critique", "ideal_example"],
              },
            },
            linguistic_metrics: {
              type: Type.OBJECT,
              properties: {
                talk_listen_ratio: {
                  type: Type.STRING,
                  description: "Ratio represented as Talk:Listen, e.g., '72:28'.",
                },
                overlapping_speech: {
                  type: Type.OBJECT,
                  properties: {
                    detected: { type: Type.BOOLEAN },
                    frequency: { type: Type.STRING, description: "e.g., 'High (3 times)', 'None', or 'Low'." },
                    details: { type: Type.STRING, description: "Specific details of interruption patterns." },
                  },
                  required: ["detected", "frequency", "details"],
                },
                excessive_silence: {
                  type: Type.OBJECT,
                  properties: {
                    detected: { type: Type.BOOLEAN },
                    details: { type: Type.STRING, description: "Explanation of pauses or lack of pauses." },
                  },
                  required: ["detected", "details"],
                },
                pacing_feedback: {
                  type: Type.STRING,
                  description: "Feedback on candidate speaking pace, transition times, and tone warmth.",
                },
              },
              required: ["talk_listen_ratio", "overlapping_speech", "excessive_silence", "pacing_feedback"],
            },
            tier_upgrade_advisor: {
              type: Type.OBJECT,
              properties: {
                primary_bottleneck: { type: Type.STRING },
                coaching_prompt_seed: {
                  type: Type.STRING,
                  description: "A tailored message to an HR Manager on how to coach this applicant from their current tier to the next tier, prompting a 5-minute training drill.",
                },
              },
              required: ["primary_bottleneck", "coaching_prompt_seed"],
            },
          },
          required: [
            "applicant_name",
            "position",
            "overall_metrics",
            "executive_summary",
            "compliance_checklist",
            "bantcq_scoring",
            "linguistic_metrics",
            "tier_upgrade_advisor",
          ],
        },
      },
    });

    const text = response.text ? response.text.trim() : "";
    if (!text) {
      throw new Error("Empty response received from Gemini API");
    }

    const jsonResult = JSON.parse(text);
    return res.json(jsonResult);
  } catch (error: any) {
    console.error("Evaluation API Error:", error);
    return res.status(500).json({
      error: "Error processing the transcript evaluation.",
      details: error.message || error,
    });
  }
});

// 2. API: Coaching Drill Engine (Interactive Virtual Coach Chat)
app.post("/api/coaching-drill", async (req, res) => {
  const { messages, coaching_seed } = req.body;

  if (!ai) {
    return res.status(500).json({
      error: "Gemini API client not configured. Please ensure process.env.GEMINI_API_KEY is active.",
    });
  }

  try {
    const chatHistory = messages || [];
    const lastMessage = chatHistory[chatHistory.length - 1];

    const systemPrompt = `
You are the Custom Coach Generator inside the VODA Bi VOTEST HR module.
Your role is to simulate a highly realistic, interactive, 5-minute financial role-play drill or coaching session for HR professionals, using the coaching seed provided:

Coaching Seed context: "${coaching_seed}"

Rules:
1. Act as a senior trainer. Be supportive, concise, and focused on financial regulations and fee cushioning.
2. In your first turn, outline a simple, rapid 3-step role-play drill or micro-practice scenario (e.g. 'Client pushes back on the 1% fee angrily; how do you respond?').
3. Guide the user through the drill step-by-step. Keep responses short and actionable (under 4-5 sentences/points).
4. Evaluate any inputs the user types and provide instant constructive feedback.
`;

    // Format chat messages for Gemini GenAI chat or general content
    // Let's map messages Array to Gemini parts
    const processedContents = chatHistory.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: processedContents,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return res.json({ response: response.text });
  } catch (error: any) {
    console.error("Coaching API Error:", error);
    return res.status(500).json({
      error: "Error processing the coaching conversation.",
      details: error.message || error,
    });
  }
});

// Serve Vite dynamic development server or compiled static production files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VOTEST Evaluation Engine running on http://localhost:${PORT}`);
  });
}

startServer();
