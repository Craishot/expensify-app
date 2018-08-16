// Import needed libraries and components
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';

// Configure redux store
const store = configureStore();

// jsx to be rendered to the browser
const jsx = (
    <Provider store={ store }>
        <AppRouter />
    </Provider>
);

// Render loading message while waiting for database fetch
ReactDOM.render(<p>Loading...</p>, document.querySelector('#app'));

store.dispatch(startSetExpenses()).then(() => {
    // Render app to browser with data from firebase
    ReactDOM.render(jsx, document.querySelector('#app'));
})