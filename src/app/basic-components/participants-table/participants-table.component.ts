import { AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-participants-table',
  templateUrl: './participants-table.component.html',
  styleUrl: './participants-table.component.css',
})
  
export class ParticipantsTableComponent implements OnInit {
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
  
  // columnsToDisplay: string[] = this.displayedColumns.slice();
  // public dataSource = new MatTableDataSource<any>();
  // public displayedColumns: string[] = [];
  
  ngOnInit(): void {
    console.log('DataSource:', this.dataSource); // Verify data here
    console.log('DisplayedColumns:', this.displayedColumns); 
    
    // this.dataSource.data = this.data;
    // this.displayedColumns = this.columns;
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
}

// Shold be dynamic depending on the requirments


