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
    this.competitionService.getCompetitions().subscribe(data =>{
      this.competitions = data;
      console.log('Competitions:', this.competitions);
      if ( this.competitions.length > 0 ) {
        this.displayedColums = Object.keys(this.competitions[0])
      }
    })
    // this.tables = PARTICIPANT_DATA
    // this.tables = [
    //   {
    //     data: [
    //       { id: 1, name: 'Alice', age: 24 },
    //       { id: 2, name: 'Bob', age: 30 }
    //     ],
    //     columns: ['id', 'name', 'age']
    //   },
    //   {
    //     data: [
    //       { product: 'Table', price: 300 },
    //       { product: 'Chair', price: 150 }
    //     ],
    //     columns: ['product', 'price']
    //   }
    // ];
  }

}
