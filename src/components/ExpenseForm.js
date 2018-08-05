import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

// ExpenseFrom component for use in user adding and editing expenses
export default class ExpenseForm extends React.Component {
    constructor(props) {
        // Dont break stuffs
        super(props);

        // Setup component initial state
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }

    // Handler for change in description text input 
    onDescriptionChange = (e) => {
        // Get new description value from event object and save it to the component state
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    // Handler for change in amount number input
    onAmountChange = (e) => {
        const amount = e.target.value;

        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };

    // Handler for change in note textarea
    onNoteChange = (e) => {
        // Get new note value from event object and save it to the component state
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    // Handler for date change for the SingleDatePicker component
    onDateChange = (createdAt) => {
        if(createdAt) {
            this.setState(() => ({ createdAt }))
        }
    };

    // Handler for change in focus for the SingleDatePicker component
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    // Handler for form submit
    onSubmit = (e) => {
        // Prevent default behavior on form submit
        e.preventDefault();

        //
        if(!this.state.description || !this.state.amount) {
            // Update error state to display error message to the user
            this.setState(() => ({ error: "Please provide description and amount." }));
        }
        else {
            // Clear error state and submit form with correct data
            this.setState(() => ({ error: '' }));

            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, 
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };

    // Component render function
    render() {
        return (
            <div>
                {}
                { this.state.error && <p>{ this.state.error }</p> }
                <form onSubmit={ this.onSubmit }>
                    { /* Expense Description Text Input */ }
                    <input 
                        type="text"
                        placeholder="Description"
                        value={ this.state.description }
                        onChange={ this.onDescriptionChange }
                        autoFocus
                    />
                    { /* Expense Amount Number Input */ }
                    <input 
                        type="text"
                        placeholder="Amount"
                        value={ this.state.amount }
                        onChange={ this.onAmountChange }
                    />
                    { /* Expense Date Picker (third party component) */ }
                    <SingleDatePicker 
                        date={ this.state.createdAt }
                        onDateChange={ this.onDateChange }
                        focused={ this.state.calendarFocused }
                        onFocusChange={ this.onFocusChange }
                        numberOfMonths={ 1 }
                        isOutsideRange={ () => false }
                    />
                    { /* Expense Note Text Area */ }
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        onChange={ this.onNoteChange }
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    }
}