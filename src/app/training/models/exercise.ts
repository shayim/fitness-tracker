export interface IExercise {
  id: string
  name: string
  duration: number
  date?: Date
  state?: 'completed' | 'cancelled' | null
}
