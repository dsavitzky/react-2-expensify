import expensesReducer from '../../reducers/expenses'
import { expenses } from '../fixtures/expenses'
import moment from 'moment'

const threeDaysLater = moment(0).add(3, 'days')
const fiveDaysLater = moment(0).add(5, 'days').valueOf()
const sevenDaysLater = moment(0).add(7, 'days')
const tenDaysLater = moment(0).add(10, 'days').valueOf()

test('it should remove an expense by id', () => {
    const state = expensesReducer(expenses, {
        type: 'REMOVE_EXPENSE',
        id: 3
    })
    expect(state).toEqual([
        expenses[0],
        expenses[1]
    ])
})

test('it should not remove an expense by id if id not found', () => {
    const state = expensesReducer(expenses, {
        type: 'REMOVE_EXPENSE',
        id: 10
    })
    expect(state).toEqual(expenses)
})

test('it should add an expense', () => {

    const expense = {
        id: 4,
        description: 'Rent',
        note: "January",
        createdAt: 5,
        amount: 1900000
    }

    const state = expensesReducer(expenses, {
        type: 'ADD_EXPENSE',
        expense

    })
    expect(state.map(a => a.id).sort()).toEqual([
        expense, ...expenses
    ].map(a => a.id).sort())
})

test('it should edit an expense', () => {
    const updates = {
        description: 'Blue',
        amount: 100000
    }
    const state = expensesReducer(expenses, {
        type: 'EDIT_EXPENSE',
        id: 2,
        updates
    })

    expect(state.map(a => a.id).sort()).toEqual([
        expenses[0],
        expenses[2],
        {
            id: 2,
            note: '',
            createdAt: fiveDaysLater,
            ...updates
        }
    ].map(a => a.id).sort())
})

test('it should not edit an expense with absent id', () => {
    const updates = {
        description: 'Blue',
        amount: 100000
    }
    const state = expensesReducer(expenses, {
        type: 'EDIT_EXPENSE',
        id: 2000,
        updates
    })

    expect(state).toEqual(expenses)

})