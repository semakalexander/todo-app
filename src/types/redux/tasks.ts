import {
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  REMOVE_TASK,
} from '../../redux/actions/tasks'

import { ITask } from '../task'

export interface ITasksState {
  items: ITask[]
}

export interface ISetTasksAction {
  type: typeof SET_TASKS
  payload: ITask[]
}

export interface IAddTaskAction {
  type: typeof ADD_TASK
  payload: ITask
}

export interface IUpdateTaskAction {
  type: typeof UPDATE_TASK
  payload: ITask
}

export interface IRemoveTaskAction {
  type: typeof REMOVE_TASK
  payload: ITask
}

export type TasksActions =
  | ISetTasksAction
  | IAddTaskAction
  | IUpdateTaskAction
  | IRemoveTaskAction
