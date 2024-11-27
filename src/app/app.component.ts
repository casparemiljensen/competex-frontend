import { Component } from '@angular/core';
import { CheckForUpdateService } from './check-for-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CompeteX';
  constructor(private checkForUpdateService: CheckForUpdateService) {}

  ngOnInit(): void {
  }
}
