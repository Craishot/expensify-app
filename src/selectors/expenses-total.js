// Function to addup the amounts of a passed in array of expenses
export default (expenses) => {
    // Calculate sum of the amounts from each expenses array passed in
    return expenses
            .map((expense) => expense.amount)
            .reduce((sum, value) => sum + value, 0);
}