import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../service/Competition/competition.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent implements OnInit{
  competitions: any[] = []
  displayedColums: string[] = [];

  constructor(private competitionService: CompetitionService) {}

  ngOnInit(): void {
    this.competitionService.getCompetitions().subscribe(data => {
      this.competitions = data.map(competition => ({
        title: competition.competition,
        data: competition.data,
        columns: competition.data.length > 0 ? Object.keys(competition.data[0]) : []
      }));
    })
  }

}
