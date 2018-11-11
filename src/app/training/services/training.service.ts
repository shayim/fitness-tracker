import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable, of, from } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { Exercise } from '../models/exercise'
import { Store, Action } from '@ngrx/store'
import { selectFinishedTraining } from '../store/training-reducer'

@Injectable({ providedIn: 'root' })
export class TrainingService {
  finished: Exercise[]
  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private store: Store<any>
  ) {
    this.store
      .select(selectFinishedTraining)
      .subscribe(finished => (this.finished = finished))
  }

  getAllExercises(): Observable<Exercise[]> {
    return this.http.get('api/exercises').pipe(
      map(exes => {
        // TODO hook up backend

        const exercises: Exercise[] = [
          {
            id: Math.floor(Math.random() * 10000000).toString(),
            name: 'Crunches',
            duration: 60,
            calories: 100,
          },
          {
            id: Math.floor(Math.random() * 10000000).toString(),
            name: 'Touch Toes',
            duration: 60,
            calories: 220,
          },
          {
            id: Math.floor(Math.random() * 10000000).toString(),
            name: 'Side Lunges',
            duration: 30,
            calories: 60,
          },
          {
            id: Math.floor(Math.random() * 10000000).toString(),
            name: 'Burpees',
            duration: 30,
            calories: 50,
          },
        ]
        return exercises
      })
    )
  }

  saveFinishedExercisesToFirebase(): string[] {
    const ids = []
    this.finished.forEach(exercise => {
      ids.push(exercise.id)
      this.afs
        .collection('finished')
        .add(exercise)
        .catch(err => console.log(err))
    })

    return ids
  }

  retrieveExercisesFromFirebase() {
    return this.afs
      .collection<any>('exercises')
      .snapshotChanges()
      .pipe(
        map(results =>
          results.map(result => {
            const id = result.payload.doc.id
            const exercise = result.payload.doc.data()

            return { id, ...exercise } as Exercise
          })
        )
      )
  }
}
