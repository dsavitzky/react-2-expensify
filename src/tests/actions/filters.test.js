import { setTextFilter, sortBy, setDate } from '../../actions/filters'
import moment from 'moment'

test('should create filter object with provided text', () => {
    const filter = setTextFilter('test')
    expect(filter).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'test'
    })
})

test('should create filter object with default empty string', () => {
    const filter = setTextFilter()
    expect(filter).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})

test('should create sort filter with provided key', () => {
    const filter = sortBy('date')
    expect(filter).toEqual({
        type: 'SORT_BY',
        key: 'date'
    })
})

test('should create date filter with proper end/start declaration', () => {
    const date = moment()
    const filter = setDate('startDate', date)
    expect(filter).toEqual({
        type: 'SET_DATE',
        which: 'startDate',
        date
    })
})