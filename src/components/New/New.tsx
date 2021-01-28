import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'

import Button from '../Button/Button'
import DatePicker from '../DatePicker/DatePicker'
import Input from '../Input/Input'

import * as tasksService from '../../services/tasks'
import * as tasksActions from '../../redux/actions/tasks'

import './new.scss'

const New = () => {
  const dispatch = useDispatch()

  const [description, setDescription] = useState<string>('')
  const [due, setDue] = useState<Date | null>(null)

  const onDescriptionChange = useCallback(event => {
    setDescription(event.target.value)
  }, [])

  const onDateChange = useCallback((date: Date): void => {
    setDue(date)
  }, [])

  const createTask = useCallback(() => {
    const task = {
      id: uuidv4(),
      description,
      due,
      isCompleted: false,
    }

    tasksService.addTask(task)

    dispatch(tasksActions.addTask(task))

    setDescription('')
    setDue(null)

    toast.success(`New task "${task.description}" was created`)
  }, [description, due, dispatch])

  return (
    <div className="new-task-container">
      <p className="instructions-text">Fill the fields below</p>

      <Input
        value={description}
        onChange={onDescriptionChange}
        placeholder="type your awesome task here"
      />

      <DatePicker
        date={due}
        onDateChange={onDateChange}
        placeholderText="click here to set a due date for task"
      />

      <Button text="Create" onClick={createTask} disabled={!description} />
    </div>
  )
}

export default New
