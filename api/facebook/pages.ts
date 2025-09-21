
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getUserPages } from '../../src/integrations/facebook';

/**
 * Vercel Serverless Function to fetch Facebook pages.
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Ensure we only handle GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 1. Get User Access Token from Environment Variables
  const userAccessToken = process.env.FB_USER_ACCESS_TOKEN;

  if (!userAccessToken) {
    console.error('[API /api/facebook/pages] Missing FB_USER_ACCESS_TOKEN environment variable.');
    return res.status(500).json({
      error: 'Server configuration error: Missing required access token.',
    });
  }

  try {
    // Call the specific function to get pages
    const pages = await getUserPages(userAccessToken);

    // Send the successful response
    return res.status(200).json({ data: pages });

  } catch (error: any) {
    // The error is already logged in a structured format by callGraphApi
    // We just need to return a generic server error response
    return res.status(502).json({ 
      error: 'Failed to fetch data from Facebook Graph API.',
      details: error.message, // Provide the simplified error message from the integration
    });
  }
}
