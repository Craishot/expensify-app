// Import needed libraries and components
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css';

// Configure redux store
const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 1000 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

// jsx to be rendered to the browser
const jsx = (
    <Provider store={ store }>
        <AppRouter />
    </Provider>
);

// Render app to browser
ReactDOM.render(jsx, document.querySelector('#app'));