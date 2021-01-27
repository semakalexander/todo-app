import { ITask } from '../../types/task'
import { TasksActions } from '../../types/redux/tasks'

export const SET_TASKS = 'SET_TASKS'
export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'

export const setTasks = (tasks: ITask[]): TasksActions => {
  return {
    type: SET_TASKS,
    payload: tasks,
  }
}

export const addTask = (task: ITask): TasksActions => {
  return {
    type: ADD_TASK,
    payload: task,
  }
}

export const updateTask = (task: ITask): TasksActions => {
  return {
    type: UPDATE_TASK,
    payload: task,
  }
}

export const removeTask = (task: ITask): TasksActions => {
  return {
    type: REMOVE_TASK,
    payload: task,
  }
}
