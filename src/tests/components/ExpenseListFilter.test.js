import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { defaultFilters, altFilters } from '../fixtures/filters';

// Setup function to be run before each test
let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;
beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    wrapper = shallow(
        <ExpenseListFilters 
            filters={ defaultFilters }
            setTextFilter={ setTextFilter }
            sortByDate={ sortByDate }
            sortByAmount={ sortByAmount }
            setStartDate={ setStartDate }
            setEndDate={ setEndDate }
        />
    );
});


//
test('should render ExpenseListFilters component correctly', () => {
    // Check for snapshot match
    expect(wrapper).toMatchSnapshot();
});


//
test('should render ExpenseListFilters component with alt data correctly', () => {
    // Set filters prop to be the altFilters data
    wrapper.setProps({ 
        filters: altFilters
     });

     // Check for snapshot match
    expect(wrapper).toMatchSnapshot();
});


// Test for correct behavior when changing the text filter input
test('should handle text change', () => {
    // Test text value
    const value = 'Text Filter';

    // Simulate change in text filter input
    wrapper.find('input').simulate('change', {
        target: { value }
    });
    
    // Check that onChange correctly called setTextFilter
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});


// Test for correct behavior when selecting sort by date
test('should handle sort by date', () => {
    // Simulate changing to sort by date
    wrapper.find('select').simulate('change', {
        target: {
            value: 'date'
        }
    });

    // Check that onChange correctly challed sortByDate
    expect(sortByDate).toHaveBeenCalled();
});


// Test for correct behavior when selecting sort by amount
test('should handle sort by amount', () => {
    // Simualte changeing to sort by amount
    wrapper.find('select').simulate('change', {
        target: {
            value: 'amount'
        }
    });

    // Check that onChange correctly called sortByAmount
    expect(sortByAmount).toHaveBeenCalled();
});


// Test for correct changing of dates
test('should handle date changes', () => {
    // Test startDate and endDate value
    const startDate = moment(0).add(1, 'years');
    const endDate = moment(0).add(4, 'years');

    // Call onDatesChange method from the DateRangePicker component
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });

    // Check that onDateChange correctly calls setStartDate and setEndDate
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});


// Test for correct changing of focus with the DateRangePicker component
test('should handle date focus change', () => {
    // Test calendarFocused value
    const calendarFocused = 'startDate';

    // Call onFocusChange method from DateRangePicker component
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);

    // Check that calendarFocused state was correctly updated
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});