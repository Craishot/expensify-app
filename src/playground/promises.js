const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('This is my resolved data');
    reject('Something went wrong');
  }, 5000);
});

console.log('before');

// States that when the promise has completed to run this function
// This allows the program to keep running while it waits for the promise to resolve
// If you pass a second argument into then it will act as the catch handler
promise.then((data) => {
  console.log('1', data);
}).catch((error) => {
  console.log('error: ', error);
});

console.log('after');

// When a promise is resolved or rejected, it cannot be resolved or rejected again

// We can only resolve a single value, therefore it can be helpful to resolve with an obect
// to gain access to multiple pieces of data