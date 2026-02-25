import axios from 'axios';

// Use Environment Variable for security
const ZENROWS_API_KEY = process.env.FIRECRAWL_API_KEY;

export async function scrapeWebsite(url: string) {
  try {
    // We use the ZenRows API endpoint to fetch the URL content
    // We can pass css_extractor or utilize Javascript rendering if needed
    // For standard text/markdown logic, ZenRows returns raw HTML natively or JSON based on params

    const response = await axios({
      url: 'https://api.zenrows.com/v1/',
      method: 'GET',
      params: {
        'url': url,
        'apikey': ZENROWS_API_KEY,
        'js_render': 'true',
        'premium_proxy': 'true',
        // To ensure we don't get blocked and get plain text easily:
        'markdown_response': 'true' // Experimental/unofficial flag, usually we need to convert HTML to Markdown manually
      },
    });

    // If ZenRows returns direct HTML, we need to ensure the LLM receives clean text
    const responseData = response.data;

    if (!responseData) {
      throw new Error(`ZenRows returned empty data for ${url}`);
    }

    return typeof responseData === 'string' ? responseData : JSON.stringify(responseData);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("ZenRows API Error:", error.response.status, error.response.data);
      throw new Error(`ZenRows API failed with status ${error.response.status}. Check your ZenRows API Key.`);
    }
    console.error("Error scraping website with ZenRows:", error);
    throw error;
  }
}
