import React, { useCallback, useState } from 'react'
import moment from 'moment'
import classnames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import Checkbox from '../Checkbox/Checkbox'
import DatePicker from '../DatePicker/DatePicker'
import Input from '../Input/Input'

import * as tasksService from '../../services/tasks'
import * as tasksActions from '../../redux/actions/tasks'

import PencilIcon from '../icons/Pencil'
import CheckMarkIcon from '../icons/CheckMark'
import CopyIcon from '../icons/Copy'
import TrashIcon from '../icons/Trash'

import { ITask } from '../../types/task'

import './task.scss'

interface ITaskProps {
  task: ITask
  withDuplicateButton?: boolean
}

const Task = ({ task, withDuplicateButton = false }: ITaskProps) => {
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

  const copyTask = useCallback(() => {
    const duplicate: ITask = {
      id: uuidv4(),
      description: task.description,
      due: null,
      isCompleted: false,
    }

    tasksService.addTask(duplicate)

    dispatch(tasksActions.addTask(duplicate))

    toast.success(`Task "${task.description}" was duplicated`)
  }, [task, dispatch])

  const removeTask = useCallback(() => {
    tasksService.removeTask(task)

    dispatch(tasksActions.removeTask(task))

    toast.success(`Task "${task.description}" was removed`)
  }, [task, dispatch])

  return (
    <div
      className={classnames({
        'todo-task': true,
        checked: task.isCompleted,
        past: moment(task.due).isBefore(moment()),
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

        {withDuplicateButton && <CopyIcon onClick={copyTask} />}

        <TrashIcon onClick={removeTask} />
      </div>
    </div>
  )
}

export default Task
