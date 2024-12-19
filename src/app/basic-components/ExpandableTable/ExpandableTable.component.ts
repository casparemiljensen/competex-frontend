import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-ExpandableTable',
  templateUrl: './ExpandableTable.component.html',
  styleUrl: './ExpandableTable.component.css',
})
export class ExpandableTableComponent implements OnChanges {
  @Input() ExpandableTables: any[] = [];
  displayedColumns: string[] = [];
  isLoading = true;
  noCompetitions = false;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ExpandableTables:', this.ExpandableTables);
    if (
      changes['ExpandableTables'] &&
      this.ExpandableTables &&
      this.ExpandableTables.length > 0
    ) {
      this.displayedColumns =
        this.ExpandableTables[0].data.length > 0
          ? Object.keys(this.ExpandableTables[0].data[0])
          : [];
      this.isLoading = false;
      this.noCompetitions = false;
    } else if (
      changes['ExpandableTables'] &&
      this.ExpandableTables.length == 0
    ) {
      this.noCompetitions = true;
      console.warn('No data provided for ExpandableTable.');
      this.isLoading = false;
    }
  }
}
