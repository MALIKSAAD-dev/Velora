import { NextResponse } from 'next/server';
import { scrapeWebsite } from '@/lib/scraper';
import { analyzeWebsiteData } from '@/lib/agents/analyzer';
import { generateProposal } from '@/lib/agents/proposalGenerator';

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Step 1: Scrape Website
        console.log(`[1/3] Scraping start: ${url}`);
        const markdownContent = await scrapeWebsite(url);

        if (!markdownContent) {
            return NextResponse.json({ error: 'Failed to extract content from the URL' }, { status: 500 });
        }

        // Extract a "Company Name" guess from the URL
        const companyName = new URL(url).hostname.replace('www.', '').split('.')[0].toUpperCase();

        // Step 2: Analyze Data using GPT OSS 120b
        console.log(`[2/3] Analyzing data for ${companyName}`);
        const analysis = await analyzeWebsiteData(markdownContent);

        // Step 3: Generate Proposal using Llama 3.3 70b
        console.log(`[3/3] Generating proposal...`);
        const proposal = await generateProposal(companyName, analysis);

        console.log(`[Done] Process complete.`);

        return NextResponse.json({
            success: true,
            data: proposal,
        });
    } catch (error: unknown) {
        console.error('Research API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
