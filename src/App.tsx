import React, { useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from './screens/Dashboard/Dashboard'
import Incompleted from './screens/Incompleted/Incompleted'

import Tabs from './components/Tabs/Tabs'

import * as tasksService from './services/tasks'
import * as tasksActions from './redux/actions/tasks'

import './App.scss'

const TABS = {
  DASHBOARD: 'dashboard',
  INCOMPLETED: 'incompleted',
  COMPLETED: 'completed',
}

function App() {
  const dispatch = useDispatch()

  const tabs = useMemo(
    () => [
      {
        id: TABS.DASHBOARD,
        label: 'Dashboard',
      },
      {
        id: TABS.INCOMPLETED,
        label: 'Incompleted',
      },
      {
        id: TABS.COMPLETED,
        label: 'Completed',
      },
    ],
    []
  )

  useEffect(() => {
    const tasks = tasksService.getTasks()

    dispatch(tasksActions.setTasks(tasks))
  }, [dispatch])

  return (
    <div className="app">
      <Tabs tabs={tabs} />

      <div className="content">
        <Switch>
          <Route exact path={`/${TABS.DASHBOARD}`}>
            <Dashboard />
          </Route>

          <Route exact path={`/${TABS.INCOMPLETED}`}>
            <Incompleted />
          </Route>

          <Route exact path={`/${TABS.COMPLETED}`}>
            <div>completed</div>
          </Route>

          <Redirect to="/dashboard" />
        </Switch>
      </div>
    </div>
  )
}

export default App
