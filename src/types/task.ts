export interface ITask {
  id: string
  description: string
  due: Date | null
  isCompleted: boolean
}
