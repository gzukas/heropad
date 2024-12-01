declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HEROPAD_HOST?: string;
      HEROPAD_PORT?: string;
      HEROPAD_DB_URL: string;
      HEROPAD_PQIDS_SALT?: string;
      HEROPAD_CORS_ORIGIN?: string;
      HEROPAD_LOG_LEVEL?: string;
    }
  }
}

export {};
