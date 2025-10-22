export const env = {
  facebookAccessToken: import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN || '',
  facebookPageId: import.meta.env.VITE_FACEBOOK_PAGE_ID || '',
  lineNotifyToken: import.meta.env.VITE_LINE_NOTIFY_TOKEN || '',
  googleSheetsId: import.meta.env.VITE_GOOGLE_SHEETS_ID || '',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;

export function validateEnv(throwOnMissing = false) {
  const requiredEnvVars = [
    { key: 'VITE_FACEBOOK_ACCESS_TOKEN', value: env.facebookAccessToken },
    { key: 'VITE_FACEBOOK_PAGE_ID', value: env.facebookPageId },
  ];

  const missing = requiredEnvVars
    .filter(({ value }) => !value)
    .map(({ key }) => key);

  return {
    valid: missing.length === 0,
    missing,
  };
}
