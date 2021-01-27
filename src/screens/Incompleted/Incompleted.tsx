import React from 'react'
import { useSelector } from 'react-redux'

import TasksList from '../../components/TasksList/TasksList'
import New from '../../components/New/New'

import { byDate } from '../../helpers/sorting'

import { RootReducer } from '../../redux/reducers'

import { ITask } from '../../types/task'

const Incompleted = () => {
  const items = useSelector<RootReducer, ITask[]>(store => store.tasks.items)

  const tasks = items.filter(item => !item.isCompleted).sort(byDate)

  return (
    <div>
      <TasksList tasks={tasks} />

      <New />
    </div>
  )
}

export default Incompleted
