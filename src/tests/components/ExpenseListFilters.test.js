import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, altFilters } from '../fixtures/filters'
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}))

let setTextFilter, sortBy, setDate, wrapper

beforeEach(() => {
    setTextFilter= jest.fn()
    sortBy = jest.fn()
    setDate = jest.fn()
    wrapper = shallow(
        <ExpenseListFilters
            setTextFilter={setTextFilter}
            sortBy={sortBy}
            setDate={setDate}
            filters={filters}
        />)
})

test('it should create ExpenseListFilters component', () => {
    expect(wrapper).toMatchSnapshot()
})

test('it should create ExpenseListFilters component with alt', () => {
    wrapper.setProps({
        filters: altFilters
    })
    expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
    wrapper.setProps({
        filters: altFilters
    })
    const event = {
        target: { value: altFilters.text }
      };
    wrapper.find('input').prop('onChange')(event)
    expect(setTextFilter).toHaveBeenLastCalledWith(altFilters.text)
})

test('should sort by Date', () => {
    wrapper.setProps({
        filters: altFilters
    })
    const event = {
        target: { value: altFilters.sortBy }
      };
    wrapper.find('select').prop('onChange')(event)
    expect(sortBy).toHaveBeenLastCalledWith(altFilters.sortBy)
})

test('should handle focus change', () => {
    const calendarFocused = 'endDate'
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused)
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})