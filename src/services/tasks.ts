import moment from 'moment'

import { ITask } from '../types/task'
import { get, set } from '../utils/localStorage'

const TASKS = 'tasks'

export const getTasks = (): ITask[] => {
  const tasks = get(TASKS)

  if (!tasks) return []

  const parsedTasks: ITask[] = JSON.parse(tasks)

  return parsedTasks.map(task => {
    if (!task.due) return task

    return { ...task, due: moment(task.due).toDate() }
  })
}

export const setTasks = (tasks: ITask[]): void => {
  set(
    'tasks',
    JSON.stringify(
      tasks.map(task => {
        if (!task.due) return task

        return { ...task, due: moment(task.due).format() }
      })
    )
  )
}

export const addTask = (task: ITask): void => {
  const tasks = getTasks()

  setTasks([...tasks, task])
}

export const updateTask = (task: ITask): boolean => {
  const tasks = getTasks()

  if (!tasks.find(t => t.id === task.id)) {
    return false
  }

  setTasks(tasks.map(t => (t.id === task.id ? task : t)))

  return true
}
