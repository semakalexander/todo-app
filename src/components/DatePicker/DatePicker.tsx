import React, { ChangeEvent } from 'react'
import ReactDatePicker from 'react-datepicker'

import './datePicker.scss'

interface IDatePickerProps {
  date: Date | null
  onDateChange: (date: Date) => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  placeholderText?: string
  readOnly?: boolean
}

const DatePicker = ({
  date,
  onDateChange,
  placeholderText = '',
  readOnly = false,
}: IDatePickerProps) => {
  return (
    <div className="todo-date-picker">
      <ReactDatePicker
        dateFormat="dd/MM/yyyy"
        selected={date}
        onChange={onDateChange}
        className="todo-input"
        placeholderText={placeholderText}
        readOnly={readOnly}
      />
    </div>
  )
}

export default DatePicker
