import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Check if the environment is production and if the service worker is available in the browser
if (environment.production && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/ngsw-worker.js') // Ensure the correct path to your service worker
    .then(() => console.log('Service Worker registered.'))
    .catch((err) => console.error('Service Worker registration failed:', err));
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true
  })
  .catch(err => console.error(err));
