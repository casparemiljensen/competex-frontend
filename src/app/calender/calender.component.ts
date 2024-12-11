import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'], 
})
export class CalenderComponent implements OnInit {
  title = 'Stævne kalender';


  // Inject the EventService
  constructor(
  ) {}

  ngOnInit(): void {

  };
}
