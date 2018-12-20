import React, { Fragment } from 'react'
import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'

const DashboardPage = () => (
    <Fragment>
        <ExpenseListFilters />
        <ExpenseList />
    </Fragment>
)

export default DashboardPage