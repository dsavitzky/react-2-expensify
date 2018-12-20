import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

const addExpense = (
    { 
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0 
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense]
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        case 'REMOVE_EXPENSE':
            return state.filter( ({ id }) => id !== action.id)
        default:
            return state
    }
}

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

const sortBy = (key = 'date') => ({
    type: 'SORT_BY',
    key
})

const setDate = (which = 'start', date) => ({
    type: 'SET_DATE',
    which,
    date
})

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY':
            return {
                ...state,
                sortBy: action.key
            }
        case 'SET_DATE':
            return {
                ...state,
                [action.which]: action.date
            }
        default:
            return state
    }
}

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter(expense => {

        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) 
                            || expense.note.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return b.createdAt - a.createdAt
        } else if (sortBy === 'amount') {
            return b.amount - a.amount
        }
    })
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

const unsubscribe = store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

const expenseOne   = store.dispatch(addExpense({ 
                                                description: 'Rent', 
                                                note: 'January', 
                                                amount: 300, 
                                                createdAt: 10 
                                            }))
const expenseTwo   = store.dispatch(addExpense({ 
                                                description: 'Coffee',
                                                amount: 100, 
                                                createdAt: 50 
                                            }))
const expenseThree = store.dispatch(addExpense({ 
                                                description: 'Books', 
                                                amount: 1000, 
                                                createdAt: 1020 
                                            }))

// store.dispatch(removeExpense({id: expenseOne.expense.id}))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))
// store.dispatch(setTextFilter('Januaryoiijog'))

store.dispatch(sortBy('amount'))
store.dispatch(sortBy('date'))

// store.dispatch(setDate('startDate', 10))
// store.dispatch(setDate('endDate', 20))


const demoState = {
    expenses: [{
        id: 'woowwo',
        description: 'January rent',
        note: 'Final payment',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
}