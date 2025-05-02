declare interface ImportMetaEnv {
    readonly VITE_SOCKET_URL: string;
    // other env variables...
  }
  
  declare interface ImportMeta {
    readonly env: ImportMetaEnv;
  }