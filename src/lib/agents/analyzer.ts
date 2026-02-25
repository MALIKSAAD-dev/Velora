import { Groq } from "groq-sdk";

// Use Environment Variable for security
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const client = new Groq({ apiKey: GROQ_API_KEY });

export async function analyzeWebsiteData(scrapedContent: string) {
    const prompt = `
You are an elite business analyst. You have been given the scraped content of a company's website in Markdown format.

Your ONLY job is to analyze THIS specific company's operations and identify real operational gaps.

DO NOT mention "Velora AI" or any specific product. DO NOT write a proposal. DO NOT sell anything.

Instead, analyze the scraped content and identify:
1. What industry is this company in?
2. Who is the decision maker / CEO (extract from the website if available)
3. What manual processes are visible on their site (contact forms, manual booking, no chatbot, etc.)
4. What automation opportunities exist specific to THEIR business
5. What is their biggest operational weakness based on their digital presence

Output a structured JSON with these exact fields:
- company_name
- industry
- decision_maker (name if found, otherwise "Team" + company name)
- operational_gaps (array of specific gaps found)
- automation_opportunities (array of specific opportunities)
- estimated_hours_lost_per_week (realistic number based on their size)

Website Content to Analyze:
"""
${scrapedContent.substring(0, 14000)} // Limiting size to fit within Groq's 8K TPM free tier
"""
Return ONLY a valid JSON object. Do not wrap it in markdown codeblocks like \`\`\`json. Just the raw JSON.
`;

    try {
        const completion = await client.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_completion_tokens: 4000,
            top_p: 1,
            reasoning_effort: "medium", // Specific to the requested setup
            stream: false,
        });

        return completion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error("Error analyzing website:", error);
        throw error;
    }
}
