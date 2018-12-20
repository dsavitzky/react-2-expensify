import React from 'react'
import { Link } from 'react-router-dom'

const ExpenseListItem =  ({ description, amount, createdAt, id }) => (
    <li>
        <p>Description: <Link to={`/edit/${id}`}>{description}</Link></p>
        <p>Amount: {amount}</p>
        <p>Created at: {createdAt}</p>
    </li>
)

export default ExpenseListItem