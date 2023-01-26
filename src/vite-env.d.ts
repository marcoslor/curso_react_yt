/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_HOSTNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
