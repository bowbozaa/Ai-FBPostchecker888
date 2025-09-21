import axios from 'axios';

// --- ส่วนนี้คือโค้ดของดิฉัน ที่มีความสามารถครบถ้วน (Caching, Logging) ---
const cache = new Map<string, { data: any; timestamp: number }>();

async function callGraphApi(path: string, userAccessToken: string) {
  const cacheKey = `${path}`;
  const ttl = process.env.FB_CACHE_TTL_SECONDS ? parseInt(process.env.FB_CACHE_TTL_SECONDS, 10) * 1000 : 300 * 1000;

  const cached = cache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp < ttl)) {
    console.log(`[Facebook Graph API] Returning cached data for key: ${cacheKey}`);
    return cached.data;
  }

  console.log(`[Facebook Graph API] Fetching fresh data for key: ${cacheKey}`);
  try {
    const baseUrl = 'https://graph.facebook.com/v20.0';
    const url = `${baseUrl}${path}`;
    const response = await axios.get(url, { params: { access_token: userAccessToken } });
    cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
    return response.data;
  } catch (error: any) {
    console.error('[Facebook Graph API Error]', {
      path: path,
      statusCode: error.response?.status,
      response: error.response?.data,
      timestamp: new Date().toISOString(),
    });
    // โยน error ต่อเพื่อให้ฟังก์ชันที่เรียกใช้จัดการต่อได้
    throw error;
  }
}

// --- ส่วนนี้คือการนำโค้ดของคุณ Mossad มาปรับใช้ ---

type FBError = { message: string; type?: string; code?: number; fbtrace_id?: string };
export type FBPageItem = { id: string; name: string; access_token?: string; category?: string };

/**
 * ฟังก์ชันสำหรับดึงรายชื่อเพจโดยเฉพาะ
 * โดยเรียกใช้ callGraphApi ที่มี Caching และ Logging อยู่แล้ว
 */
export async function getUserPages(userAccessToken: string): Promise<FBPageItem[]> {
  try {
    // เรียกใช้ฟังก์ชันกลางที่เรามีอยู่
    const json = await callGraphApi('/me/accounts', userAccessToken);
    return (json.data || []) as FBPageItem[];
  } catch (error: any) {
    // สร้าง Error message ในรูปแบบที่คุณ Mossad แนะนำ
    const err: FBError = error.response?.data?.error || { message: `HTTP ${error.response?.status || 'Error'}` };
    throw new Error(`FB_ERROR: ${err.message} (type=${err.type || "?"}, code=${err.code || "?"})`);
  }
}