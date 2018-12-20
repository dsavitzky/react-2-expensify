import filtersReducer from '../../reducers/filters'
import moment from 'moment'

test('it should update state with new text value', () => {
    const state = {
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }
    const reduction = filtersReducer(state, { type: 'SET_TEXT_FILTER', text: 'now'})

    expect(reduction).toEqual({
        text: 'now',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })

})

test('it should update sort property of state', () => {
    const state = {
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }
    const reduction = filtersReducer(state, { type: 'SORT_BY', key: 'amount'})

    expect(reduction).toEqual({
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })

})

test('it should set the specified date', () => {
    const state = {
        text: '',
        sortBy: '',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }
    const reduction = filtersReducer(state, { type: 'SET_DATE', which: 'endDate', date: moment(0)})

    expect(reduction).toEqual({
        text: '',
        sortBy: '',
        startDate: moment().startOf('month'),
        endDate: moment(0)
    })

})
