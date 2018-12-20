import React from 'react'
import moment from 'moment'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : '',
            calendarFocused: false,
            error: ''
        }
    }

    onSubmit = e => {
        e.preventDefault()
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({
                error: true
            }))
        } else {
            this.setState(() => ({
                error: false
            })) 
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    }

    onDescriptionChange = e => {
        const description = e.target.value
        this.setState(() => ({ description }))
    }
    onAmountChange = e => {
        const amount = e.target.value
        if (!amount || /^\d+(\.\d{0,2})?$/.test(amount)) {
            this.setState(() => ({ amount }))
        }
    }
    onDateChange = createdAt => {
        if (createdAt) {
            this.setState(() => ({ createdAt }))
        }
    }
    onFocusChange = () => {
        this.setState(prevState => (
            {
                calendarFocused: !prevState.calendarFocused
            }
        ))
    }
    onNoteChange = e => {
        const note = e.target.value
        this.setState(() => ({ note }))
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                {this.state.error && <p>Please provide a description and amount</p>}
                <input
                    type="text"
                    placeholder="description"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    type="text"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt || moment()}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    placeholder="Enter a note"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>
                <button>{this.props.expense ? 'Edit' : 'Add'} expense</button>
            </form>
        )
    }
}