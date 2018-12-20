import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense, editExpense, removeExpense } from './actions/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'


const store = configureStore()

store.dispatch(addExpense({
    description: 'Water bill',
    amount: '8000',
    createdAt: 10
}))

store.dispatch(addExpense({
    description: 'Gas bill',
    amount: '4000',
    createdAt: 15
}))

store.dispatch(addExpense({
    description: 'Rent',
    amount: '109500',
    createdAt: 20
}))

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))