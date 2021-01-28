import moment from 'moment'

import { ITask } from '../types/task'

export const byDue: (task1: ITask, task2: ITask) => -1 | 0 | 1 = (t1, t2) => {
  const mDue1 = moment(t1.due)
  const mDue2 = moment(t2.due)

  if (mDue1.valueOf() === mDue2.valueOf()) return 0

  return mDue1.isBefore(mDue2) ? -1 : 1
}
