import { Component, Input, OnInit, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-DataTable',
  templateUrl: './DataTable.component.html',
  styleUrls: ['./DataTable.component.css'],
})
export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() dataSource!: any[];
  @Input() displayedColumns: string[] = [];  // Default to an empty array to handle dynamic columns

  tableDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.initializeTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      this.initializeTable();
    }
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
  }

  private initializeTable(): void {
    if (this.dataSource && this.dataSource.length > 0) {
      // Dynamically set columns based on the keys of the first object in dataSource
      this.displayedColumns = Object.keys(this.dataSource[0]);
      this.tableDataSource.data = this.dataSource;
    }
  }
}
