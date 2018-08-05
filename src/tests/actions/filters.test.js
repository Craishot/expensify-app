import moment from 'moment';
import { 
    setTextFilter, 
    sortByDate, 
    sortByAmount, 
    setStartDate, 
    setEndDate 
} from '../../actions/filters';



/* === Set Text Filter Test === */
// test setTextFilter using a passed in argument
test('should generate set text filter action object using passed in value', () => {
    // Sample text value to pass to setTextFilter to test behavior
    const text = 'filter text'
    
    // Test behavior of setTextFilter
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: text
    });
});

// test setTextFilter when no argument is passed in (default argument)
test('should generate set text filter action object using default value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});



/* === Sort By Date Test === */
test('should generate sort by date action object', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});



/* === Sort By Amount Test === */
test('should generate sory by amount action object', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});



/* === Set Start Date Test === */
test('should generate set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});



/* === Set End Date Test === */
test('should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
}); 