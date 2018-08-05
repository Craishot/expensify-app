import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';


// Check for correct form rendering (without data)
test('should render ExpenseForm correctly', () => {
    // Shallow render ExpenseForm component without data
    const wrapper = shallow(<ExpenseForm />);

    // Check for snapshot match
    expect(wrapper).toMatchSnapshot();
});


// Check for correct form rendering (with data)
test('should render ExpenseForm with expense data', () => {
    // Shallow render ExpenseForm compoenent with data from expenses fixture
    const wrapper = shallow(<ExpenseForm expense={ expenses[1] } />);

    // Check for snapshot match 
    expect(wrapper).toMatchSnapshot(); 
});


// Test for invalid form submission
test('should render error for invalid form submission', () => {
    // Shallow render ExpenseForm WITHOUT passing in any data
    const wrapper = shallow(<ExpenseForm />);

    // Simulate form submit with no data
    wrapper.find('form').simulate('submit', { 
        preventDefault: () => {}
     });

     // Check for correct error state to ensure correct behavior by component and check for snapshot match
     expect(wrapper.state('error').length).toBeGreaterThan(0);
     expect(wrapper).toMatchSnapshot();
});


// Test for correct updating of description state when it is changed
test('should set description on input change', () => {
    // Test description value
    const value = 'new description';

    // Shallow render the ExpenseForm component
    const wrapper = shallow(<ExpenseForm />);

    // Simulate a change in the description input
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });

    // Check for correct description state change from input change
    expect(wrapper.state('description')).toBe(value);
});


// Test for correct updating of note state when it is changed
test('should set note on textarea change', () => {
    // Test note value
    const value = 'new note';

    // Shallow render the ExpenseForm component
    const wrapper = shallow(<ExpenseForm />);

    // Simulate a change in the note textarea
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });

    // Check for correct note state change
    expect(wrapper.state('note')).toBe(value);
});


// Test that amount is set if the input for the amount is valid
test('should set amount if valid input', () => {
    // Test amount value (valid)
    const value = '10.50';

    // Shallow render ExpenseForm component
    const wrapper = shallow(<ExpenseForm />);

    // Simulate a change in the amount field using a valid value
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });

    // Check for correct amount state change
    expect(wrapper.state('amount')).toBe(value);
});


// Test that amount is not set if the input for the amount is not valid
test('should not set amount if invalid input', () => {
    // Test amount value (invalid)
    const value = '10.501';

    // Shallow render ExpenseForm component
    const wrapper = shallow(<ExpenseForm />);

    // Simulate a change in the amount field using an invalid value
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });

    // Check for no update to amount state
    expect(wrapper.state('amount')).toBe('');
});


// Test that on form submit that the error state is cleared and the form is submitted with the correct data
test('should call onSubmit prop for valid form submission', () => {
    // Create onSubmit spy
    const onSubmitSpy = jest.fn();
    
    // Shallow render ExpenseForm component
    const wrapper = shallow(<ExpenseForm expense={ expenses[0] } onSubmit={ onSubmitSpy } />);

    // Simulate form submission
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    // Ensure correct error state
    expect(wrapper.state('error')).toBe('');

    // Ensure that onSubmit was called with the correct data
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});


// Test that date changes correctly when changed using the SingleDatePicker component
test('should set new date on date change', () => {
    // Sample moment() instance for test
    const now = moment();

    // Shallow render ExpenseForm component
    const wrapper = shallow(<ExpenseForm />);

    // Call onDateChange method from SingleDatePicker component
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);

    // Ensure that createdAt state was changed correctly
    expect(wrapper.state('createdAt')).toEqual(now);
});


// Test that calendar focus correctly changes
test('should set calendar focus on change', () => {
    // Sample focusChange variable for test
    const focused = true;

    // Shallow render ExpenseForm component
    const wrapper = shallow(<ExpenseForm />);

    // Call onFocusChange method from SingleDatePicker component
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });

    // Ensure calendar focus was correctly updated
    expect(wrapper.state('calendarFocused')).toBe(focused);
});