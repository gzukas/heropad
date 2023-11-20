declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST?: string;
      PORT?: string;
      DATABASE_URL: string;
      HASHID_SALT?: string;
      CORS_ORIGIN?: string;
    }
  }
}

export {};
