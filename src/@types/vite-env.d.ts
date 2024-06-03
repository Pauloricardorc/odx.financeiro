/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_SERVICE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
