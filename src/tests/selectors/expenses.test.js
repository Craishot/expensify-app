import moment from 'moment';
import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

// Test filtering expenses by text
test('should filter by text value', () => {
    // Filter test data to test filtering by text
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };

    // Test text filter behavior
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[2], expenses[1] ]);
});

// Test filtering expenses by start date
test('should filter by startDate', () => {
    // Filter test data to test filtering by startDate
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };

    // Test start date filter
    const result = selectExpenses(expenses ,filters);
    expect(result).toEqual([ expenses[2], expenses[0] ]);
});

// Test filtering expenses by end date
test('should filter by endDate', () => {
    // Filter test data to test filtering by endDate
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    };

    // Test end date filter
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[0], expenses[1] ]);
});

// Test sorting the expenses data by date
test('should sort by date', () => {
    // Filter test data to test sorting by date
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };

    // Test sorting by date
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[2], expenses[0], expenses[1] ]);
});

// Test sorting the expenses data by amount
test('should sort by amount', () => {
    // Filter test data to test sorting by amount
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };

    // Test sorting by amount
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[1], expenses[2], expenses[0] ]);
});