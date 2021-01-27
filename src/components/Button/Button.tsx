import React from 'react'

import './button.scss'

interface IButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
}

const Button = ({ text, onClick, disabled = false }: IButtonProps) => {
  return (
    <button className="todo-button" disabled={disabled} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
