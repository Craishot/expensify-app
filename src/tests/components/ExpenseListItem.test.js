import React from 'react';
import { shallow } from 'enzyme';

import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

// Test that 
test('should render ExpenseListItem with a given expense', () => {
    const wrapper = shallow(<ExpenseListItem { ...expenses[1] } />);
    expect(wrapper).toMatchSnapshot();
});