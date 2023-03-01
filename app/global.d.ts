interface Window {
  dataLayer: unknown[];
}

interface ImportMetaEnv {
  /**
   * Client-side configuration for the production, test/QA, and local
   * development environments. See `core/config.ts`, `vite.config.ts`.
   */
  readonly VITE_CONFIG: string;
}

declare const __DEV__: boolean;
