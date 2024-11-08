import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CompetitionService } from '../../service/Competition/competition.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent implements OnChanges {
  @Input() competitions: any[] = [];
  displayedColumns: string[] = [];
  isLoading = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['competitions'] && this.competitions && this.competitions.length > 0) {
      this.displayedColumns = this.competitions[0].data.length > 0 ? Object.keys(this.competitions[0].data[0]) : [];
      this.isLoading = false;
    }
  }
}
