import React, { useMemo } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import New from '../../components/New/New'
import TasksList from '../../components/TasksList/TasksList'

import { byDue } from '../../helpers/sorting'
import { splitArrayByPredicate } from '../../helpers/array'

import { RootReducer } from '../../redux/reducers'
import { ITask } from '../../types/task'

import './dashboard.scss'

const Dashboard = () => {
  const items = useSelector<RootReducer, ITask[]>(store => store.tasks.items)

  const tasks = useMemo(() => {
    const pastOrCurrent = items.filter(
      task => !task.due || moment(task.due).isBefore(moment().endOf('day'))
    )

    const { suited, unsuited } = splitArrayByPredicate<ITask>(
      pastOrCurrent,
      item => item.isCompleted
    )

    return [...unsuited.sort(byDue), ...suited.sort(byDue)]
  }, [items])

  return (
    <div className="dashboard">
      <TasksList tasks={tasks} />

      <New />
    </div>
  )
}

export default Dashboard
