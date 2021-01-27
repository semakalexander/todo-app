import React, { useMemo } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import Task from '../../components/Task/Task'

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
      .sort((t1, t2) => {
        if (t1.isCompleted) {
          if (t2.isCompleted) return 0
          return 1
        }

        return -1
      })
  }, [items])

  return (
    <div className="dashboard">
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  )
}

export default Dashboard
