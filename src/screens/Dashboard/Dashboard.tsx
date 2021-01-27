import React, { useMemo } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import New from '../../components/New/New'
import TasksList from '../../components/TasksList/TasksList'

import { byDate } from '../../helpers/sorting'

import { RootReducer } from '../../redux/reducers'
import { ITask } from '../../types/task'

import './dashboard.scss'

const Dashboard = () => {
  const items = useSelector<RootReducer, ITask[]>(store => store.tasks.items)

  console.log('items', items)
  const tasks = useMemo(() => {
    return items
      .filter(
        task => !task.due || moment(task.due).isBefore(moment().endOf('day'))
      )
      .sort(byDate)
  }, [items])

  return (
    <div className="dashboard">
      <TasksList tasks={tasks} />

      <New />
    </div>
  )
}

export default Dashboard
