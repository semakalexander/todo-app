import { combineReducers } from 'redux'
import tasks from './tasks'

const rootReducer = combineReducers({
  tasks,
})

export type RootReducer = ReturnType<typeof rootReducer>
export default rootReducer
