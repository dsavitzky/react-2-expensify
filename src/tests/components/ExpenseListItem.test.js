import React from 'react'
import { shallow } from 'enzyme'
import ExpenseListItem from '../../components/ExpenseListItem'
import { expenses } from '../fixtures/expenses'
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

test('should render ExpenseListItem with expense', () => {

    const wrapper = shallow(<ExpenseListItem {...expenses[1]} />)
    expect(wrapper).toMatchSnapshot()
})