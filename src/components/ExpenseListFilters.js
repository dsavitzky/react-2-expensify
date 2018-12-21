import React from 'react'
import { connect } from 'react-redux'
import { setTextFilter, sortBy, setDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates'

export class ExpenseListFilters extends React.Component {

    state = {
        calendarFocused: null
    }
    
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }

    onFocusChange = calendarFocused => {
        this.setState(() => ({ calendarFocused }))
    }

    onTextChange = e => { 
        this.props.setTextFilter(e.target.value)
    }
    
    onSort = e => {
        this.props.sortBy(e.target.value)
    }

    render() {
        return (
            <div>
                <input 
                    type="text"
                    value={this.props.filters.text}
                    onChange={this.onTextChange} />
                <select 
                    name="" 
                    id="" 
                    value={this.props.filters.sortBy}
                    onChange={this.onSort}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    endDate={this.props.filters.endDate}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({ filters: state.filters })

const mapDispatchToProps = dispatch => ({
    setTextFilter: text => dispatch(setTextFilter(text)),
    sortBy: target => dispatch(sortBy(target)),
    setStartDate: startDate => dispatch(setDate('startDate', startDate)),
    setEndDate: endDate => dispatch(setDate('endDate', endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)