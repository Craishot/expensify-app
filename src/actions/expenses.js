import uuid from 'uuid';
import database from '../firebase/firebase';

// component calls action generator
// action generator return object
// component dispatches object
// redux store changes

// components calls action generator
// action generator returns a function
// component dispatches function
// function runs (has the ability to dispatch other actions and do whatever it wants)

/* Add Expense Actions */

// ADD_EXPENSE 
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

// Function to dispatch addExpense action and add expense to database
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        // Setup default values
        const {
            description= '', 
            note = '', 
            amount = 0, 
            createdAt = 0 
        } = expenseData;

        // Variable to be pushed into the firebase database
        const expense = { 
            description,
            note,
            amount,
            createdAt
         };

        // Push the expense into the database 
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};



/* Remove Expense Actions */

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }));
        });
    }
};



/* Edit Expense Actions */

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    }
};


/* Set Expenses Actions */

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: "SET_EXPENSES",
    expenses
});

// 1. Fetch all expense data once
// 2. Parse that data into an array
// 3. Dispatch SET_EXPENSES

export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses').once('value').then((snapshot) => {
            const expenses = [];

            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setExpenses(expenses));
        });
    }
};
