import { Component, OnInit } from '@angular/core';
import { CheckForUpdateService } from './check-for-update.service';
import { CachePrimerService } from './service/CachePrimer/cache-primer.service';
import { OfflineQueueService } from './service/offlineQueue/offline-queue.service';  // Import OfflineQueueService

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
    private offlineQueueService: OfflineQueueService  
  ) {}

  ngOnInit(): void {
    this.cachePrimerService.primeCache();
    this.offlineQueueService.processQueue();

    window.addEventListener('online', () => {
      console.log('CompeteX is back online, Syncing tasks');
      this.offlineQueueService.processQueue();
      console.log('Tasks synced');
    });

    window.addEventListener('offline', () => {
      console.log('CompeteX is offline');
    });
  }
}
