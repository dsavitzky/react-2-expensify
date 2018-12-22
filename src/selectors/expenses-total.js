const selectExpensesTotal = expenses => {
    if (expenses.length) {
        return expenses.map(expense => expense.amount).reduce((a, b) => a + b)
    } else {
        return 0
    }
}

export default selectExpensesTotal