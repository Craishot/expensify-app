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

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
