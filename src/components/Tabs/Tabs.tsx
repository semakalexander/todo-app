import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import classnames from 'classnames'

import './tabs.scss'

type Tab = {
  label: string
  id: string
}

type TabsProps = {
  tabs: Tab[]
}

const Tabs = ({ tabs }: TabsProps) => {
  const location = useLocation()
  const pathname = location.pathname.replace('/', '')

  return (
    <div className="todo-tabs">
      {tabs.map(tab => (
        <Link
          to={`/${tab.id}`}
          key={tab.id}
          className={classnames({ tab: true, active: pathname === tab.id })}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}

export default Tabs
