import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { Store } from '@ngrx/store'
import { Exercise } from '../models/exercise'
import { selectPastTraining } from '../store/training-reducer'
import { LoadPast } from '../store/training-actions'

@Component({
  selector: 'app-past-training',
  templateUrl: `./past-training.component.html`,
  styles: [
    `
      table {
        width: 100%;
      }
    `,
  ],
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'duration', 'calories', 'status', 'date']
  pastData: MatTableDataSource<Exercise>
  pageSize = 10

  @ViewChild(MatSort)
  sort: MatSort

  @ViewChild(MatPaginator)
  paginator: MatPaginator

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(new LoadPast())
    this.store.select(selectPastTraining).subscribe(pastData => {
      this.pastData = new MatTableDataSource(pastData)
      this.pastData.paginator = this.paginator
    })
  }

  ngAfterViewInit() {
    this.pastData.sort = this.sort
    this.pastData.paginator = this.paginator
  }

  filter(search: string) {
    this.pastData.filter = search.trim().toLowerCase()
  }
}
