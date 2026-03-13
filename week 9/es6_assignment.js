// task 1: variables
const course = "Web Programming";
let students = 30;
students += 5;
console.log("Course:",course);
console.log("Total Students:", students);

// task 2: arrow function square
const square = num => num * num;
square(4);

// task 3: template literals
let name = "Alice";
let age = 21;
let city = "Dallas";
console.log(`My name is ${name}, I am ${age} years old, and I live in ${city}.`)

// task 4: array destructuring
let fruits = ["Apple", "Banana", "Cherry"];
let {firstFruit, secondFruit, thirdFruit} = fruits;
console.log(firstFruit);
console.log(secondFruit);
console.log(thirdFruit);

// task 5: task destructuring
const student = {
    name: "John",
    major: "Computer Science",
    year: 2
}
let {name2, major, year} = student;
console.log(name2);
console.log(major);
console.log(year);

// task 6: spread operator
let arr1 = [1,2,3];
let arr2 = [4,5,6];
let arr3 = [...arr1, ...arr2];
console.log(arr3);

// task 7: map
let numbers = [1,2,3,4];
let tripled = numbers.map(num => num * 3);
console.log(doubled)

// task 8: filter
let numbers2 = [5,10,15,20,25];
let out = numbers2.filter(num => num > 15);
console.log(out);

// task 9: forEach
let colors = ["Red", "Green", "Blue"];
colors.forEach(color => {
    console.log(color)
})