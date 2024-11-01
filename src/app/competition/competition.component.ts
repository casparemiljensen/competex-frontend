import { Component, OnInit } from '@angular/core';
import { PARTICIPANT_DATA } from '../mock-data/mock-participant';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent implements OnInit{
  
  public tables: any[] = [];

  ngOnInit(): void {
    
    // this.tables = PARTICIPANT_DATA
    this.tables = [
      {
        data: [
          { id: 1, name: 'Alice', age: 24 },
          { id: 2, name: 'Bob', age: 30 }
        ],
        columns: ['id', 'name', 'age']
      },
      {
        data: [
          { product: 'Table', price: 300 },
          { product: 'Chair', price: 150 }
        ],
        columns: ['product', 'price']
      }
    ];
  }

}
