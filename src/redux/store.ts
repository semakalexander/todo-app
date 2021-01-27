import { createStore } from 'redux'
import { TasksActions } from '../types/redux/tasks'

import rootReducer, { RootReducer } from './reducers'

const store = createStore<RootReducer, TasksActions, unknown, unknown>(
  rootReducer
)

export default store
