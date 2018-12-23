import React, { Fragment } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import AddExpensePage from '../components/AddExpensePage'
import DashboardPage from '../components/DashboardPage'
import EditExpensePage from '../components/EditExpensePage'
import NotFoundPage from '../components/NotFoundPage'
import LoginPage from '../components/LoginPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'


export const history = createHistory()

const AppRouter = () => (
    <Router history={history}>
        <Fragment>
            <Switch>
                <PublicRoute
                    path="/"
                    component={LoginPage}
                    exact={true}
                />
                <PrivateRoute
                    path="/dashboard"
                    component={DashboardPage}
                />
                <PrivateRoute
                    path="/create"
                    component={AddExpensePage}
                />
                <PrivateRoute
                    path="/edit/:id"
                    component={EditExpensePage}
                />
                <Route
                    component={NotFoundPage}
                />
            </Switch>
        </Fragment>
    </Router>
)

export default AppRouter