import { createStore } from 'redux';

// *** Action Generators ***
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy: decrementBy
});

const resetCount = () => ({
    type: 'RESET'
});

const setCount = ({ count }) => ({
    type: 'SET',
    count: count
});

// *** Reducers ***
// 1. Reducers are pure functions
// 2. Never change state or action 
const countReducer = (state = { count: 0 }, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.count
            };
        default:
            return state;
    }
};

// *** Creating a Redux Store ***
const store = createStore(countReducer);

console.log('Initial State:', store.getState());

// *** Watching Store Changes ***
// the below line subscibes the store, by calling unsubscribe() we will unsubscribe from the store
const unsubscribe = store.subscribe(() => {
    console.log("State Changed: ", store.getState());
});

// *** Redux Actions ***
// increment
store.dispatch(incrementCount({ incrementBy: 5 }));

console.log("Increment: ", store.getState());

// decrement
store.dispatch(decrementCount({ decrementBy: 10 }));

console.log("Decrement: ", store.getState());

// reset
store.dispatch(resetCount());

console.log("Reset: ", store.getState());

// set
store.dispatch(setCount({ count: 101 }));

console.log('SET: ', store.getState());