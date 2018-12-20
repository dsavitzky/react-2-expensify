import selectExpenses from '../../selectors/expenses'
import moment from 'moment'
import { expenses } from '../fixtures/expenses'

const threeDaysLater = moment(0).add(3, 'days')
const fiveDaysLater = moment(0).add(5, 'days').valueOf()
const sevenDaysLater = moment(0).add(7, 'days')
const tenDaysLater = moment(0).add(10, 'days').valueOf()

test('should filter by text value', () => {
    const selection = selectExpenses(expenses, {
        text: 'gum',
        sortBy: '',
        startDate: '',
        endDate: ''
    })
    expect(selection.sort()).toEqual([
        expenses[0],
        expenses[2]
    ].sort())
})

test('should filter by text value -- one result', () => {
    const selection = selectExpenses(expenses, {
        text: 'ren',
        sortBy: '',
        startDate: '',
        endDate: ''
    })
    expect(selection.sort()).toEqual([
        expenses[1],
    ].sort())
})

test('should filter by dates', () => {
    const selection = selectExpenses(expenses, {
        text: '',
        sortBy: '',
        startDate: threeDaysLater,
        endDate: sevenDaysLater
    })
    expect(selection.sort()).toEqual([
       expenses[1],
    ].sort())
})

test('should filter by dates with multiple results', () => {
    const selection = selectExpenses(expenses, {
        text: '',
        sortBy: '',
        startDate: threeDaysLater,
        endDate: moment(tenDaysLater)
    })
    expect(selection.sort()).toEqual([
        expenses[1],
        expenses[2]
    ].sort())
})

test('should sort by date descending', () => {
    const selection = selectExpenses(expenses, {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    })
    expect(selection).toEqual([
        expenses[2],
        expenses[1],
        expenses[0]
    ].sort())
})

test('should sort by amount descending and filter text', () => {
    const selection = selectExpenses(expenses, {
        text: 'gum',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    })
    expect(selection).toEqual([
        expenses[2],
        expenses[0]
    ].sort())
})