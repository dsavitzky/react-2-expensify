import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

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

    const expenseData = {
        description: 'New description',
        note: 'New note',
        amount: 100,
        createdAt: 15
    }
    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})

test('should set up with default', () => {
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '', 
            amount: 0, 
            createdAt: 0 
        }
    })
})