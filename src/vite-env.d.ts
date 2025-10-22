/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FACEBOOK_ACCESS_TOKEN: string;
  readonly VITE_FACEBOOK_PAGE_ID: string;
  readonly VITE_LINE_NOTIFY_TOKEN: string;
  readonly VITE_GOOGLE_SHEETS_ID: string;
  readonly VITE_GOOGLE_CREDENTIALS_PATH: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_N8N_WEBHOOK_URL: string;
  readonly VITE_NODE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
