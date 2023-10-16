declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST?: string;
      PORT?: string;
      DATABASE_URL: string;
    }
  }
}

export {};
