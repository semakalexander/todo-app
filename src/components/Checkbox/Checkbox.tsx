import React from 'react'
import classnames from 'classnames'

import CheckMarkIcon from '../icons/CheckMark'

import './checkbox.scss'

interface ICheckboxProps {
  checked: boolean
  onClick: () => void
}

const Checkbox = ({ checked, onClick }: ICheckboxProps) => {
  return (
    <div
      className={classnames({
        'todo-checkbox': true,
        checked,
      })}
      onClick={onClick}
    >
      {checked && <CheckMarkIcon />}
    </div>
  )
}

export default Checkbox
