// child_ removed: fires when a child object is removed
database.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// child_changed: fires when on of the children objects changes
database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// child_added: fires when a child object is added to firebase
// also fires for all existing children
database.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// database.ref('notes').push({
//   title: 'Projects',
//   body: 'Book thing'
// });

// database.ref('notes').set(notes);

// ref gives us a reference to a certain part of our database
// if we do not pass anything into ref() we will access the database root

// set can be called on a reference to set a value for that reference
// Set returns a promise, therefore we can call then and catch on it
// database.ref().set({
//   name: 'Trent',
//   age: 22,
//   stressLevel: 6,
//   job: {
//     title: 'Softward Developer',
//     company: 'Google'
//   },
//   location: {
//     city: 'Denver',
//     state: 'CO',
//     country: 'United States'
//   }
// }).then(() => {
//   console.log('Data saved to firebase');
// }).catch((e) => {
//   console.log(e);
// });

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
// });

// using / gives access to data nested in an object in the database

// database.ref().remove()
//   .then(() => {
//     console.log('Data was removed.');
//   }).catch((e) => {
//     console.log('Could not remove data.', e);
//   });

// *** Fetching Data from Firebase ***

// database.ref().once('value')
//   .then((snapshot) => {
//     // Store data retrieved from firebase in a variable
//     const val = snapshot.val();

//     // Print message to the screen
//     console.log(val.name + ' is a ' + val.job.title + ' at ' + val.job.company + '.');
//   })
//   .catch((e) => {
//     console.log('Unable to fetch data.', e);
//   });

// // Subscribe to firebase data changes
// database.ref().on('value', (snapshot) => {
//   // Store data retrieved from firebase in a variable
//   const val = snapshot.val();

//   // Print message to the screen
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`);
// });

// // Update data after 5 seconds
// setTimeout(() => {
//   database.ref().update({
//     name: 'Chris',
//     'job/title': 'Shelf Stocker',
//     'job/company': 'Walmart'
//   });
// }, 5000);