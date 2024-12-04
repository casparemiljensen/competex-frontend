interface ServiceWorkerRegistration {
    sync: SyncManager;
  }
  
  interface SyncManager {
    register(tag: string): Promise<void>;
  }
  