export const environment = {
  // 기본 앱 설정
  appName: import.meta.env.VITE_APP_NAME || 'IndexedDB Auto Save',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',

  // 환경 플래그
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,

  // 데이터베이스 설정
  database: {
    name: import.meta.env.DEV ? 'AutoSaveDB_Dev' : 'AutoSaveDB',
    version: 1,
    stores: {
      text: 'text-store',
      saves: 'saves-store',
    },
    maxSaves: 10,
  },

  // 기능 설정
  features: {
    autoSave: true,
    debounceDelay: 1000,
    debounceDelayForServerSync: 5000,
    enableServerSync: import.meta.env.VITE_ENABLE_SERVER_SYNC === 'true',
  },

  // 개발 도구 설정
  devTools: {
    enableReduxDevTools: import.meta.env.DEV,
    enableLogging: import.meta.env.VITE_ENABLE_LOGGING === 'true',
    enableDebugMode: import.meta.env.DEV,
  },

  // API 설정 (향후 서버 동기화 기능을 위해)
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 5000,
  },
} as const;

// 타입 추출
export type Environment = typeof environment;

// 개발 환경에서 설정 검증
if (environment.isDevelopment) {
  console.log('Environment loaded:', environment);
}
