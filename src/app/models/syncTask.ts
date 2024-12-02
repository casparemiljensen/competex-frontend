export class SyncTask<T> {
    constructor(
      public url: string,
      public body: T,
      public params?: string
    ) {}
  }
  