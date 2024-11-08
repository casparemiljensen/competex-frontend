import { Component, OnInit } from '@angular/core';
import { EventPageService } from '../service/event-page/event-page.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent implements OnInit {
  competitionData: any[] = [];
  judgeData: any[] = [];
  displayedColumns: string[] = [];
  isLoading = true;

  constructor(private eventPageService: EventPageService) {}

  ngOnInit(): void {
    
    //Fetch judge data
    this.eventPageService.getJudge().subscribe(data => {
      this.judgeData = data;
      this.isLoading = false;
    });

    //Fetch competition data
    this.eventPageService.getCompetitions().subscribe(data => {
      this.competitionData = data;
    });
  }
}