import { Component, OnInit } from '@angular/core';
import { EventPageService } from '../service/event-page/event-page.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent implements OnInit {
  table: any[] = [];
  displayedColumns: string[] = [];
  isLoading = true;

  constructor(private eventPageService: EventPageService) {}

  ngOnInit(): void {
    this.eventPageService.getJudge().subscribe(data => {
      this.table = data;
      this.displayedColumns = data.length > 0 ? Object.keys(data[0]) : [];
      this.isLoading = false;
      console.log(this.table);
    });
  }
}