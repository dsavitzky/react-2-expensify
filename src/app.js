import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { startSetExpenses } from './actions/expenses'
import { login, logOut } from './actions/auth'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'

const store = configureStore()

const app = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

let hasRendered = false
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(app, document.getElementById('root'))
        hasRendered = true
        if (history.location.pathname === '/') {
            history.push('/dashboard')
        }
    }
    return
}

ReactDOM.render(<p>Loading ...</p>, document.getElementById('root'))

firebase.auth().onAuthStateChanged(user => {
    if (user) {
            store.dispatch(login(user.uid))
            store.dispatch(startSetExpenses()).then(() => {
            renderApp() 
        })
    } else {
        store.dispatch(logOut())
        renderApp()
        history.push('/')
    }
})