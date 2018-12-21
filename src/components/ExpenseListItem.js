import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

const ExpenseListItem =  ({ description, amount, createdAt, id }) => (
    <li>
        <p>Description: <Link to={`/edit/${id}`}>{description}</Link></p>
        <p>Amount: {numeral(amount / 100).format('$0,0.00')}</p>
        <p>Created at: {moment(createdAt).format('MMMM Do, YYYY')}</p>
    </li>
)

export default ExpenseListItem