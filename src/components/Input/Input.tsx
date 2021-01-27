import React, { ChangeEvent } from 'react'

import './input.scss'

interface IInputProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const Input = ({ value, onChange, placeholder = '' }: IInputProps) => {
  return (
    <input
      className="todo-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default Input
