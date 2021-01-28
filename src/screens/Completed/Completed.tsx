import React from 'react'
import { useSelector } from 'react-redux'

import TasksList from '../../components/TasksList/TasksList'

import { byDue } from '../../helpers/sorting'

import { RootReducer } from '../../redux/reducers'

import { ITask } from '../../types/task'

const Completed = () => {
  const items = useSelector<RootReducer, ITask[]>(store => store.tasks.items)

  const tasks = items.filter(item => item.isCompleted).sort(byDue)

  return (
    <div className="completed-tasks">
      <TasksList tasks={tasks} withDuplicateButton />
    </div>
  )
}

export default Completed
