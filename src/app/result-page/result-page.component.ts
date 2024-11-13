import { Component, OnInit } from '@angular/core';
import { ResultService } from '../service/Result/result.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.css'
})
export class ResultPageComponent implements OnInit{
  results: any[] = []

  constructor(private resultservice: ResultService) {}

  ngOnInit(): void {
    this.resultservice.getResult().subscribe(data => {
      this.results = data;
    console.log(this.results);
  });
  }
}
