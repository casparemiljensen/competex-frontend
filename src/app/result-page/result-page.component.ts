import { Component, input, OnInit } from '@angular/core';
import { ResultService } from '../service/Result/result.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.css'
})
export class ResultPageComponent implements OnInit{
  results: any[] = []
  eventName: string = '';
  creator: string = '';
  date: string = '';
  eventId: string = '';

  isLoading = true;


  constructor(
    private resultservice: ResultService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('eventId') || '';
      console.log(this.eventId);
      this.fetchEventResults(this.eventId)
    })
  }

  fetchEventResults(eventId: string){
    // to do: make getresults have id param
    this.resultservice.getResult().subscribe(data => {
      this.isLoading = false;
      this.eventName = "Stævnenavn";
      this.creator = "Arrangør";
      this.date = "dato"
      this.results = data;
    })
  }
}
