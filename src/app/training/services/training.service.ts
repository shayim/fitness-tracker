import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { AngularFirestore } from 'angularfire2/firestore'
import { zip } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Loaded, Loading } from 'src/app/loading-status.reducer'
import { Exercise } from '../models/exercise'
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

  // getAllExercises(): Observable<Exercise[]> {
  //   return this.http.get('api/exercises').pipe(
  //     map(exes => {
  //       // TODO hook up backend

  //       const exercises: Exercise[] = [
  //         {
  //           id: Math.floor(Math.random() * 10000000).toString(),
  //           name: 'Crunches',
  //           duration: 60,
  //           calories: 100,
  //         },
  //         {
  //           id: Math.floor(Math.random() * 10000000).toString(),
  //           name: 'Touch Toes',
  //           duration: 60,
  //           calories: 220,
  //         },
  //         {
  //           id: Math.floor(Math.random() * 10000000).toString(),
  //           name: 'Side Lunges',
  //           duration: 30,
  //           calories: 60,
  //         },
  //         {
  //           id: Math.floor(Math.random() * 10000000).toString(),
  //           name: 'Burpees',
  //           duration: 30,
  //           calories: 50,
  //         },
  //       ]
  //       return exercises
  //     })
  //   )
  // }

  saveFinishedExercisesToFirebase(): string[] {
    const ids = []
    this.finished.forEach(exercise => {
      ids.push(exercise.id)
      this.afs.collection('past').add(exercise)
    })

    return ids
  }

  retrieveExercisesFromFirebase() {
    this.store.dispatch(new Loading())

    return zip(
      this.afs.collection<any>('exercises').snapshotChanges(),
      this.afs
        .collection<any>('past')
        .valueChanges()
        .pipe(map(exes => exes.map(e => ({ ...e, date: e.date.toDate() }))))
    ).pipe(
      tap(() => this.store.dispatch(new Loaded())),
      map(results => {
        const exercises = results[0].map(result => {
          const id = result.payload.doc.id
          const exercise = result.payload.doc.data()

          return { id, ...exercise } as Exercise
        })

        const past = results[1] as Exercise[]

        return { exercises, past }
      })
    )
  }
}
