import { ITask } from '../types/task'

export const byDate: (task1: ITask, task2: ITask) => -1 | 0 | 1 = (t1, t2) => {
  if (t1.isCompleted) {
    if (t2.isCompleted) return 0
    return 1
  }

  return -1
}
