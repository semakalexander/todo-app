import React, { useCallback, useState } from 'react'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'

import Checkbox from '../Checkbox/Checkbox'
import DatePicker from '../DatePicker/DatePicker'
import Input from '../Input/Input'

import * as tasksService from '../../services/tasks'
import * as tasksActions from '../../redux/actions/tasks'

import PencilIcon from '../icons/Pencil'
import CheckMarkIcon from '../icons/CheckMark'

import { ITask } from '../../types/task'

import './task.scss'

interface ITaskProps {
  task: ITask
}

const Task = ({ task }: ITaskProps) => {
  const dispatch = useDispatch()

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [description, setDescription] = useState<string>(task.description)
  const [due, setDue] = useState<Date | null>(task.due)

  const toggleTaskStatus = useCallback(() => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted }

    tasksService.updateTask(updatedTask)

    dispatch(tasksActions.updateTask(updatedTask))
  }, [task, dispatch])

  const onDescriptionChange = useCallback(event => {
    setDescription(event.target.value)
  }, [])

  const onDateChange = useCallback(date => {
    setDue(date)
  }, [])

  const onPencilClick = useCallback(() => {
    setIsEditing(true)
  }, [])

  const saveChanges = useCallback(() => {
    if (
      description === task.description &&
      due?.valueOf() === task.due?.valueOf()
    ) {
      setIsEditing(false)
      return
    }

    const updatedTask = { ...task, description, due }
    tasksService.updateTask(updatedTask)
    dispatch(tasksActions.updateTask(updatedTask))

    setIsEditing(false)
  }, [task, description, due, dispatch])

  return (
    <div
      className={classnames({
        'todo-task': true,
        checked: task.isCompleted,
      })}
    >
      <Checkbox checked={task.isCompleted} onClick={toggleTaskStatus} />

      <div className="right">
        {!isEditing && <span className="description">{task.description}</span>}
        {isEditing && (
          <Input value={description} onChange={onDescriptionChange} />
        )}

        {!task.due && !isEditing && (
          <span className="no-due-date-text">No due date</span>
        )}
        {(!!task.due || isEditing) && (
          <DatePicker
            date={isEditing ? due : task.due}
            onDateChange={onDateChange}
            readOnly={!isEditing}
          />
        )}

        {!task.isCompleted && !isEditing && (
          <PencilIcon onClick={onPencilClick} />
        )}
        {!task.isCompleted && isEditing && (
          <CheckMarkIcon onClick={saveChanges} />
        )}
      </div>
    </div>
  )
}

export default Task
