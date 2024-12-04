export class SyncTask<T> {
  id?: number;
  url: string;
  body: T;
  params: string;

  constructor(url: string, body: T, params: string) {
    this.url = url;
    this.body = body;
    this.params = params;
  }
}