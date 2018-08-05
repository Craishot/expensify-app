import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters'; 

// Expense List Filters Component
export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    // Handle date change from the date range picker component
    onDatesChange = ({ startDate, endDate }) => {
        // Dispatch actions to change the start and end dates for the filter in the redux store
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    // Handle focus change for the date range picker component
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };

    // Handle change in the text filter input
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    //
    onSortChange = (e) => {
        if(e.target.value === 'amount') {
            this.props.sortByAmount();
        } 
        else if(e.target.value === 'date') {
            this.props.sortByDate();
        }
        else {
            throw 'Invalid sortBy type...'
        }
    };

    render() {
        return (
            <div>
                { /* Text filter */ }
                <input 
                    type='text' 
                    value={ this.props.filters.text } 
                    onChange={ this.onTextChange }
                />
                { /* Sort by dropdown */ }
                <select 
                    value={ this.props.filters.sortBy } 
                    onChange={ this.onSortChange }>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                { /* Date range filter */ }
                <DateRangePicker 
                    startDate={ this.props.filters.startDate }
                    endDate={ this.props.filters.endDate }
                    onDatesChange={ this.onDatesChange }
                    focusedInput={ this.state.calendarFocused }
                    onFocusChange={ this.onFocusChange }
                    showClearDates={ true }
                    numberOfMonths={ 1 }
                    isOutsideRange={ () => false }
                />
            </div>
        );
    };
};

// Give Expense List Filters component access to redux store
const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

// Map dispatch function to the props
const mapDispatchToProps = (dispatch) => {
    return {
        setTextFilter: (text) => dispatch(setTextFilter(text)),
        sortByDate: () => dispatch(sortByDate()),
        sortByAmount: () => dispatch(sortByAmount()),
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate))
    };
};


// Default export
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);