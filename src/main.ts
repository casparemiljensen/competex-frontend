import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/ngsw-worker.js').then(() => {
    console.log('Angular Service Worker registered');
    return navigator.serviceWorker.register('/custom-sw.js');
  }).then(() => {
    console.log('Custom Service Worker registered');
  }).catch((err) => {
    console.error('Service Worker registration failed:', err);
  });
}


platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true
  })
  .catch(err => console.error(err));
