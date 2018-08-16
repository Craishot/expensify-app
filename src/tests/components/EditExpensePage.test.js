import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

// setup 
let startEditExpense, startRemoveExpense, history, wrapper;
beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };

    wrapper = shallow(
        <EditExpensePage 
        startEditExpense={ startEditExpense } 
            startRemoveExpense={ startRemoveExpense }
            history={ history } 
            expense={ expenses[0] }
        />
    );
});

// Test that EditExpensePage component renders correctly
test('should render EditExpensePage correctly', () => {
    // Check for snapshot match
    expect(wrapper).toMatchSnapshot();
});


// Test that editExpense is being called correctly
test('should handle onSubmit to edit an expense correctly', () => {
    // Call the onSubmit prop on the ExpenseForm component
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);

    // Check that onSubmit was called with the correct params
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});


// Test that removeExpense is being called correctly
test('should handle onClick to remove an expense correctly', () => {
    // Call the onClick prop attached to the button on EditExpensePage
    wrapper.find('button').prop('onClick')();

    // Check that onClick was called correctly
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
});