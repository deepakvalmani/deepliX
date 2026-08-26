/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CALENDLY_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly [key: string]: string | boolean | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
