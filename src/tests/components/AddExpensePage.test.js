import React from 'react'
import { shallow } from 'enzyme'
import { AddExpensePage } from '../../components/AddExpensePage'
import { createSerializer } from 'enzyme-to-json';
import { expenses } from '../fixtures/expenses'

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}))

let addExpense, history, wrapper

beforeEach(() => {
    addExpense = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(<AddExpensePage
                            startAddExpense={addExpense}
                            history={history}
                        />)
})

test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1])
})