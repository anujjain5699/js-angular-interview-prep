/*
2. Implement **currying**
    
    Convert a normal function into a curried function.
    
    ```jsx
    sum(1, 2, 3);
    curriedSum(1)(2)(3)
    ```
*/


function curried(...args) {
    // 1. BASE CASE (Exit Condition):
    // Check if we have collected 3 or more arguments.
    if (args.length >= 3) {
        // If yes, sum all collected numbers and return the final answer.
        return args.reduce((sum, current) => sum + current, 0);
    }

    // 2. RECURSIVE CASE (Where Closure is Created):
    // We don't have 3 arguments yet, so return a new inner function.
    //
    // 🎒 CLOSURE HAPPENS HERE:
    // This inner function is born inside 'curried'.
    // It automatically captures and "remembers" the current 'args' array in its closure.
    return function (...nextArgs) {
        // When this inner function is called later:
        // - 'args' comes from its CLOSURE (previous arguments remembered).
        // - 'nextArgs' comes from the NEW function call (e.g. the next parenthesis).

        // Merge previous args + new args and pass them back to curried()
        return curried(...args, ...nextArgs);
    };
}

// ------------------- TESTING -------------------

console.log(curried(1)(2)(3)); // Output: 6
console.log(curried(1, 2)(3)); // Output: 6
console.log(curried(1)(2, 3)); // Output: 6
console.log(curried(1, 2, 3)); // Output: 6

/*
Step-by-Step Memory Breakdown:
const fn1 = curried(1); is called:

JavaScript creates a scope for this call where args = [1].
It defines and returns the inner function.
Because that inner function mentions args, JavaScript attaches a Closure containing { args: [1] } to fn1.
curried(1) finishes running, but args = [1] is not deleted from memory because fn1 is holding onto it.
const fn2 = fn1(2); is called:

fn1 receives nextArgs = [2].
Inside fn1, it looks for args. It finds args = [1] inside its closure backpack.
It computes: curried(...[1], ...[2]) $\rightarrow$ which calls curried(1, 2).
Memory Diagram
text
1. curried(1) executes:
   ┌───────────────────────────────┐
   │ Outer Scope:                  │
   │   args = [1]                  │
   │                               │
   │   Returned Function (fn1):    │
   │     ┌───────────────────────┐ │
   │     │ Closure: args = [1]   │ │  ◄── fn1 packs 'args' into its closure
   │     └───────────────────────┘ │
   └───────────────────────────────┘
2. When you call fn1(2) later:
   fn1 looks inside its Closure ──► finds args = [1]
   fn1 receives parameter       ──► nextArgs = [2]
   Combined Call                ──► curried(1, 2)
In summary: JavaScript engines keep outer variables alive in memory as long as any returned inner function still references them.
*/


/*
Step-by-Step Explanation in Simple Words
Let's trace what happens when you run curried(1)(2)(3):

Call 1: curried(1)
args is [1].
args.length is 1 (which is less than 3).
It returns the inner function (...nextArgs).
Closure: This returned function packs args = [1] into its memory backpack.
Call 2: (2)
The returned function is called with 2.
nextArgs becomes [2].
It takes [1] from its closure backpack and combines it with [2].
It calls curried(1, 2).
curried(1, 2) runs $\rightarrow$ args is now [1, 2] (length < 3).
It returns a new function whose closure backpack now holds args = [1, 2].
Call 3: (3)
The new function is called with 3.
nextArgs becomes [3].
It takes [1, 2] from its closure backpack and combines it with [3].
It calls curried(1, 2, 3).
curried(1, 2, 3) runs $\rightarrow$ args is now [1, 2, 3] (length $\ge$ 3).
Final Result: It stops returning functions, calculates 1 + 2 + 3, and returns 6.
*/