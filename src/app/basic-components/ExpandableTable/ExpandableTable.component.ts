import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ExpandableTable',
  templateUrl: './ExpandableTable.component.html',
  styleUrl: './ExpandableTable.component.css'
})
export class ExpandableTableComponent implements OnChanges {
  @Input() ExpandableTables: any[] = [];
  displayedColumns: string[] = [];
  isLoading = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ExpandableTables'] && this.ExpandableTables && this.ExpandableTables.length > 0) {
      this.displayedColumns = this.ExpandableTables[0].data.length > 0 ? Object.keys(this.ExpandableTables[0].data[0]) : [];
      this.isLoading = false;
    }
  }
}
