import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-participants-table',
  templateUrl: './participants-table.component.html',
  styleUrls: ['./participants-table.component.css'],
})
export class ParticipantsTableComponent implements OnInit, AfterViewInit {
  @Input() dataSource!: any[];
  @Input() displayedColumns!: string[];

  tableDataSource = new MatTableDataSource<any>(this.dataSource);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.tableDataSource.data = this.dataSource;
    console.log('DataSource:', this.dataSource);
    console.log('DisplayedColumns:', this.displayedColumns);
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
  }
}
