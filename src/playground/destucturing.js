const person = {
    name: 'Trent',
    age: 22,
    location: {
        city: 'Denver',
        temp: 89
    }
};

// *** Object Descructuring ***
const {name: firstName = 'Anonymous', age} = person;

console.log(`${firstName} is ${age}.`);

const { city: cityName, temp: temperature } = person.location;

if(cityName && temperature) {
    console.log(`It's ${temperature} in ${cityName}`)
}

// Challenge thingy
const book = {
    title: 'The Subtle Art Of Not Giving A Fuck',
    author: 'Mark Mnason',
    publisher: {
        name: 'Penguin'
    }
}

const {name: publisherName = 'Self-Published'} = book.publisher;

console.log(publisherName);

// *** Array Destructuring ***
const address = [
    "111 Main St",
    "New York City",
    "NY",
    "12345"
];

const [/* street */, city, state = "CO" , /* zip */] = address;

console.log(`You are in ${city}, ${state}.`);

const item = [
    'Coffee (hot)',
    '$2.00',
    '$2.50',
    '$2.75'
];

const [itemName, /*small price*/, mediumPrice, /*large price*/] = item;

console.log(`A medium ${itemName} cost ${mediumPrice}`);