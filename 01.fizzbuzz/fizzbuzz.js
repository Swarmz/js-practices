#!/usr/bin/env node

for (let num = 1; num <= 20; num++) {
  if (num % 5 === 0 && num % 3 === 0) {
    console.log("FizzBuzz");
  } else if (num % 5 === 0) {
    console.log("Buzz");
  } else if (num % 3 === 0) {
    console.log("Fizz");
  } else {
    console.log(`${num}`);
  }
}
