import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

// setup 
let editExpense, removeExpense, history, wrapper;
beforeEach(() => {
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };

    wrapper = shallow(
        <EditExpensePage 
            editExpense={ editExpense } 
            removeExpense={ removeExpense }
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
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});


// Test that removeExpense is being called correctly
test('should handle onClick to remove an expense correctly', () => {
    // Call the onClick prop attached to the button on EditExpensePage
    wrapper.find('button').prop('onClick')();

    // Check that onClick was called correctly
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
});