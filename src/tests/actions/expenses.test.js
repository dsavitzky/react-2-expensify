import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { addExpense, editExpense, removeExpense, startAddExpense, setExpenses } from '../../actions/expenses'
import { expenses } from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

beforeEach(done => {
    const expensesData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt }
    })
    database.ref('expenses').set(expensesData).then(() => done())
})

test('should set up remove expense action object', () => {
    const action = removeExpense({ id: '123abc'})
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should edit expense action object', () => {
    const action = editExpense('abc123', {
        'description': 'changed',
        'note': 'new note'
    })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: {
            'description': 'changed',
            'note': 'new note'
        }
    })
})

test('should create expense object with provided values', () => {

    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database and store', done => {
    const store = createMockStore({})
    const expenseData = {
        description: 'rent',
        amount: 420000,
        note: '',
        createdAt: 9000000000000000
    }

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })

        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })

})

test('should add expense with defaults to database and store', done => {
    const store = createMockStore({})

    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                description: '', 
                note: '', 
                amount: 0,
                createdAt: 0 
            }
        })

        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then(snapshot => {
        expect(snapshot.val()).toEqual({
            description: '', 
            note: '', 
            amount: 0,
            createdAt: 0 
        })
        done()
    })
})

test('should set up expense action object with some data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})