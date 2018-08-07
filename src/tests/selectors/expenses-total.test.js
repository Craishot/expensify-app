import getExpensesTotal from '../../selectors/expenses-total';

import expenses from '../fixtures/expenses';

// Test for correct behavior of getExpensesTotal when given an empty array
test('should return 0 if no expenses', () => {
    // Call getExpensesTotal with an empty array
    const expensesTotal = getExpensesTotal([]);

    // Check for correct return value
    expect(expensesTotal).toBe(0);
});


// Test for correct behavior of getExpensesTotal when given an array with a single item
test('should correctly add up a single expense', () => {
    // Call getExpensesTotal with only one item
    const expensesTotal = getExpensesTotal([ expenses[0] ]);

    // Check for correct return value
    expect(expensesTotal).toBe(195);
});


// Test for correct behavior of getExpenseTotal when given an array with multiple items
test('should correctly add up multiple expenses', () => {
    // Call getExpensesTotal with multiple items
    const expensesTotal = getExpensesTotal(expenses);

    // Check for correct return value
    expect(expensesTotal).toBe(114195);
});