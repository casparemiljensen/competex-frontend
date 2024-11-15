import { Component, OnInit } from '@angular/core';
import { EventPageService } from '../service/event-page/event-page.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent implements OnInit {
  ExpandableTableData: any[] = [];
  judgeData: any[] = [];
  displayedColumns: string[] = [];
  isLoading = true;

  // This is the tempory, to show how the pange changes give the view is creator of the event or not
  isCreator = true;

  constructor(private eventPageService: EventPageService) {}

  ngOnInit(): void {
    this.isLoading = false;
    
    //Fetch judge data
    this.eventPageService.getJudge().subscribe(data => {
      this.judgeData = data;
    });

    //Fetch ExpandableTable data
    this.eventPageService.getExpandableTables().subscribe(data => {
      this.ExpandableTableData = data;
    });
  }
}