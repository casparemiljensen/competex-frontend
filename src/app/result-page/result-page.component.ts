import { Component, input, OnInit } from '@angular/core';
import { ResultService } from '../service/Result/result.service';

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


  constructor(private resultservice: ResultService) {}

  ngOnInit(): void {
    this.resultservice.getResult().subscribe(data => {
      this.eventName = "Stævnenavn";
      this.creator = "Arrangør";
      this.date = "dato"
      this.results = data;
    console.log(this.results);
  });
  }
}
