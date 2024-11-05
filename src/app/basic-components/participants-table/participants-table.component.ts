import { Component, Input, OnInit, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-participants-table',
  templateUrl: './participants-table.component.html',
  styleUrls: ['./participants-table.component.css'],
})
export class ParticipantsTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() dataSource!: any[];
  @Input() displayedColumns!: string[];

  tableDataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.tableDataSource.data = this.dataSource;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      this.tableDataSource.data = this.dataSource;
    }
  }

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
  }
}