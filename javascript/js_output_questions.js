/**
 * JavaScript Output-Based Interview Questions & Explanations
 * 
 * Question 4: Type Coercion & Operator Behavior
 * Question 5: Function Declaration Hoisting vs Function Expression Hoisting
 */

// ==========================================
// Question 4: Type Coercion & typeof
// ==========================================
console.log('--- Question 4 Output ---');

// 1. console.log(true + false)
// Explanation: The binary '+' operator converts booleans to numbers.
// Number(true) === 1 and Number(false) === 0.
// Thus, 1 + 0 === 1.
console.log('true + false  =>', true + false); // Output: 1

// 2. console.log("A" - "B")
// Explanation: The '-' operator attempts numeric coercion on both strings.
// Number("A") yields NaN and Number("B") yields NaN.
// NaN - NaN evaluates to NaN.
console.log('"A" - "B"       =>', "A" - "B"); // Output: NaN

// 3. console.log(typeof typeof 1)
// Explanation: Evaluates right-to-left.
// Step 1: `typeof 1` returns the string "number".
// Step 2: `typeof "number"` evaluates the type of the string "number", which is "string".
console.log('typeof typeof 1 =>', typeof typeof 1); // Output: string


// ==========================================
// Question 5: Hoisting Difference (Function Declaration vs Variable Expression)
// ==========================================
console.log('\n--- Question 5 Output & Explanation ---');

// Part A: Function Declaration
// Explanation: Function declarations are fully hoisted (both key name and function body).
// Thus, fun1 can be called anywhere in its scope before its actual line of definition.
console.log('Calling fun1(7, 8) before declaration:');
console.log('fun1(7, 8) =>', fun1(7, 8)); // Output: 15

function fun1(A, B) {
  return A + B;
}

// Part B: Variable Expression (var fun2)
// Explanation: Variables declared with `var` are hoisted with an initial value of `undefined`.
// The assignment `fun2 = (A, B) => ...` only happens during execution at runtime.
// Attempting to call `fun2()` before assignment tries to invoke `undefined()`, throwing a TypeError.
console.log('\nCalling fun2(7, 8) before assignment:');
try {
  fun2(7, 8);
} catch (error) {
  console.log('Caught Error:', error.message); // Output: TypeError: fun2 is not a function
}

var fun2 = (A, B) => {
  return A + B;
};

// Calling fun2 after definition line works as expected
console.log('Calling fun2(7, 8) after definition line:');
console.log('fun2(7, 8) =>', fun2(7, 8)); // Output: 15
