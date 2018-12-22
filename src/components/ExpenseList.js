import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral'

export const ExpenseList = props => (

    <React.Fragment>
        <h2>You have {props.expenses.length === 1 ? '1 expense' : `${props.expenses.length} expenses`} { props.expenseTotal === 0 ? '' : `totaling ${numeral(props.expenseTotal / 100).format('$0,0.00')}`}</h2>
        <ul>
            {
                props.expenses.length === 0 ? (
                    ''
                ) : (
                    props.expenses.map((expense) => (
                    <ExpenseListItem key={expense.id} {...expense} />
            ))
                )
            }
            
        </ul>
    </React.Fragment>
)

const mapStateToProps = state => {

    const selectedExpenses = selectExpenses(state.expenses, state.filters)
    return {
        expenses: selectedExpenses,
        expenseTotal: selectExpensesTotal(selectedExpenses)
    }
}

export default connect(mapStateToProps)(ExpenseList)