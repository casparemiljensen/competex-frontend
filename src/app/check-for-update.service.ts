import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CheckForUpdateService {
  constructor(appRef: ApplicationRef, updates: SwUpdate) {
    if (updates.isEnabled) {
      const appIsStable$ = appRef.isStable.pipe(
        first((isStable) => isStable === true)
      );
      const everySixSeconds$ = interval(6 * 1000); // 6 seconds
      const everySixSecondsOnceAppIsStable$ = concat(
        appIsStable$,
        everySixSeconds$
      );

      everySixSecondsOnceAppIsStable$.subscribe(async () => {
        try {
          const updateFound = await updates.checkForUpdate();
          if (updateFound) {
              document.location.reload();
          } else {
            console.log('Already on the latest version.');
          }
        } catch (err) {
          console.error('Failed to check for updates:', err);
        }
      });
    }
  }
}