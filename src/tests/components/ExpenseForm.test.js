import React from 'react'
import { shallow } from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm'
import { expenses } from '../fixtures/expenses'
import { createSerializer } from 'enzyme-to-json';
import moment from 'moment'

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm correctly with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[2]}/>)
    expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })
    expect(wrapper.state('error')).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {

    const value = 'New description'

    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(0).simulate('change', {
        target: { value } 
    })

    expect(wrapper.state('description')).toBe('New description')

})

test('should set note on textarea change', () => {

    const value = 'New note'

    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('textarea').at(0).simulate('change', {
        target: { value } 
    })

    expect(wrapper.state('note')).toBe('New note')

})

test('should update amount with valid entry', () => {

    const value = '19.00'

    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value } 
    })

    expect(wrapper.state('amount')).toBe('19.00')

})

test('should update amount with invalid entry', () => {

    const value = 'abcde'

    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: { value } 
    })

    expect(wrapper.state('amount')).toBe('')

})

test('should call onSubmit with proper arg', () => {
    const onSubmitSpy = jest.fn()
    const { description, note, amount, createdAt } = expenses[2]
    const wrapper = shallow(<ExpenseForm expense={expenses[2]} onSubmit={onSubmitSpy}/>)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })
    expect(onSubmitSpy).toHaveBeenCalledWith({
        description,
        note,
        amount,
        createdAt
    })
})

test('should set new date on change', () => {
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(moment())
    expect(wrapper.state('createdAt')).toEqual(moment())
})

test('should set focus on change', () => {
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')()
    expect(wrapper.state('calendarFocused')).toBeTruthy()
})