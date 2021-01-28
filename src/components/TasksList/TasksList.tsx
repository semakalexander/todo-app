import React from 'react'

import Task from '../Task/Task'

import { ITask } from '../../types/task'

import './tasksList.scss'

interface ITasksListProps {
  tasks: ITask[]
  withDuplicateButton?: boolean
}

const TasksList = ({ tasks, withDuplicateButton = false }: ITasksListProps) => {
  return (
    <div className="todo-tasks-list">
      {!tasks.length && <p className="empty-text">There is no tasks yet</p>}

      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          withDuplicateButton={withDuplicateButton}
        />
      ))}
    </div>
  )
}

export default TasksList
