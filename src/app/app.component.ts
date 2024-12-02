import { Component, OnInit } from '@angular/core';
import { CheckForUpdateService } from './check-for-update.service';
import { CachePrimerService } from './service/CachePrimer/cache-primer.service';
import { SyncService } from './service/SyncService/sync.service';  // Import SyncService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent implements OnInit {
  title = 'CompeteX';

  constructor(
    private checkForUpdateService: CheckForUpdateService, 
    private cachePrimerService: CachePrimerService,
    private syncService: SyncService  
  ) {}

  ngOnInit(): void {
    this.cachePrimerService.primeCache();

    if (navigator.onLine) {
      this.syncService.processQueue();
    }

    window.addEventListener('online', () => {
      console.log('CompeteX is back online');
      this.syncService.processQueue();  
    });

    window.addEventListener('offline', () => {
      console.log('CompeteX is offline');
    });
  }
}
