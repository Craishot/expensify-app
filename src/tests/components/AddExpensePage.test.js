import React from 'react';
import { shallow } from 'enzyme';

import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

// Setup code to be run before each test
let startAddExpense, history, wrapper;
beforeEach(() => {
    // Setup function spies
    startAddExpense = jest.fn();
    history = { push: jest.fn() };

    // Shallow render component and store resulting render
    wrapper = shallow(<AddExpensePage startAddExpense={ startAddExpense } history={ history } />);
});


// Test for correct form rendering
test('should render AddExpensePage component correctly', () => {
    // Check for snapshot match
    expect(wrapper).toMatchSnapshot();
});


// Test that onSubmit is being called correctly
test('should handle onSubmit', () => {
    // Call the onSubmit function in the ExpenseForm component
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);

    // Check for correct call from history and onSubmit functions
    expect(history.push).toHaveBeenCalledWith('/');
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[0]);
});