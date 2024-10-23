import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  displayedColumns: string[] = ['id', 'name', 'age'];
  dataSource = ELEMENT_DATA;
}

export interface UserData {
  id: string;
  name: string;
  age: number;
}

const ELEMENT_DATA: UserData[] = [
  {id: '1', name: 'John Doe', age: 25},
  {id: '2', name: 'Jane Smith', age: 30},
  {id: '3', name: 'Michael Brown', age: 22},
  {id: '4', name: 'Lisa White', age: 27}
];

