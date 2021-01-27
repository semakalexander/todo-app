import { TasksActions, ITasksState } from '../../types/redux/tasks'
import { ADD_TASK, REMOVE_TASK, SET_TASKS, UPDATE_TASK } from '../actions/tasks'

const initialState: ITasksState = {
  items: [],
}

const tasksReducer = (
  state = initialState,
  action: TasksActions
): ITasksState => {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, items: action.payload }

    case ADD_TASK:
      return { ...state, items: [...state.items, action.payload] }

    case UPDATE_TASK:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      }

    case REMOVE_TASK:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      }
    default:
      return state
  }
}

export default tasksReducer
