import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm  from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <ExpenseForm 
                    expense={ this.props.expense }
                    onSubmit={ this.onSubmit }
                />
                <button onClick={ this.onRemove }>Remove</button>
            </div>
        );
    }
};

// Map the component state to the props
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;
        })
    };
};

// Map dispatch functions to the props
const mapDispatchToProps = (dispatch) => {
    return {
        editExpense: (id, expense) => dispatch(editExpense(id, expense)),
        startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
    };
};

// Default export connected to the redux store
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);