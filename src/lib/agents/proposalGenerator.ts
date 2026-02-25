import { Groq } from "groq-sdk";

// Use Environment Variable for security
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const client = new Groq({ apiKey: GROQ_API_KEY });

export async function generateProposal(companyName: string, analysisText: string) {
    const prompt = `
You are an expert technical sales engineer writing a hyper-personalized business proposal.

You have received a structured JSON analysis of a specific company. Your job is to write a proposal that feels like it was written by someone who deeply researched THIS company specifically.

Rules:
- NEVER use placeholder text like "Target Company Decision Maker" — use the actual company name and decision maker from the analysis
- NEVER mention generic products — propose solutions specific to their exact gaps
- Every gap mentioned must reference something real found on their website
- ROI estimates must be based on their specific industry and company size
- The cold email must start with a specific observation about their business, not a generic intro

Output valid JSON with these exact fields:
- "decision_maker_name" (actual name or "Team at [Company Name]")
- "cold_email" (subject line + full personalized email body)
- "proposal" (full markdown proposal with these sections: Executive Summary, Current State Analysis, Specific Operational Gaps, Proposed AI Solutions tailored to their gaps, ROI Estimate, Next Steps)

Here is the analysis to base your pitch on:
"""
${analysisText}
"""

Return ONLY a valid JSON object. Do not wrap it in markdown codeblocks like \`\`\`json. Just the raw JSON.
`;

    try {
        const completion = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.8,
            max_completion_tokens: 4000,
            top_p: 1,
            stream: false,
        });

        const responseContent = completion.choices[0]?.message?.content || "{}";

        // Attempt to parse JSON safely
        try {
            const parsed = JSON.parse(responseContent);
            return parsed;
        } catch (initialError) {
            console.warn("Failed to parse LLM JSON directly, attempting extraction fallback...");
            try {
                // Find the first { and the last }
                const firstBrace = responseContent.indexOf('{');
                const lastBrace = responseContent.lastIndexOf('}');
                if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                    const jsonString = responseContent.substring(firstBrace, lastBrace + 1);
                    return JSON.parse(jsonString);
                }
            } catch (e) {
                console.error("JSON fallback extraction failed.");
            }
            console.error("RAW LLM OUTPUT:", responseContent);
            throw new Error("Failed to parse LLM JSON output. Check server logs for raw output.");
        }
    } catch (error) {
        console.error("Error generating proposal:", error);
        throw error;
    }
}
