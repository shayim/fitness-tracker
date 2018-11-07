import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Exercise } from '../models/exercise'

@Injectable({ providedIn: 'root' })
export class TrainingService {
  constructor(private http: HttpClient) {}

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
}
