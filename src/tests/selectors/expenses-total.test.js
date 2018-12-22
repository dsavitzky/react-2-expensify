import selectExpensesTotal from '../../selectors/expenses-total'
import getVisibleExpenses from '../../selectors/expenses'
import { expenses } from '../fixtures/expenses'

test('should sum amounts of list of expenses', () => {
    const total = selectExpensesTotal(expenses)
    expect(total).toBe(995)
})
test('should sum expense amounts with filters applied', () => {
    const filteredExpenses = getVisibleExpenses(expenses, { text: 'gum' })
    const total = selectExpensesTotal(filteredExpenses)
    expect(total).toBe(495)
})
test('should sum expense amounts with filters applied', () => {
    const filteredExpenses = getVisibleExpenses(expenses, { text: 'poo' })
    const total = selectExpensesTotal(filteredExpenses)
    expect(total).toBe(500)
})