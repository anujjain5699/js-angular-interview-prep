function infiniteCurry(...args) {
    // 🎒 CLOSURE HAPPENS HERE:
    // Return an inner function that collects subsequent arguments.
    return function (...nextArgs) {
        // 1. BASE CASE (Exit Condition):
        // If nextArgs is empty '()' -> STOP and compute the sum!
        if (nextArgs.length === 0) {
            return args.reduce((sum, current) => sum + current, 0);
        }

        // 2. RECURSIVE CASE:
        // If arguments were passed, merge old 'args' (from closure) with 'nextArgs'
        // and pass them back to infiniteCurry to continue the chain.
        return infiniteCurry(...args, ...nextArgs);
    };
}

// ------------------- TESTING -------------------

console.log(infiniteCurry(1)(2)(3)());                // Output: 6
console.log(infiniteCurry(1)(2)(3)(4)(5)());          // Output: 15
console.log(infiniteCurry(10)(20)(30)(40)(50)(60)()); // Output: 210

// It also works with multiple arguments in any step:
console.log(infiniteCurry(1, 2)(3, 4)(5)());          // Output: 15


/*
In Infinite Currying, since the function can take any number of calls (e.g., curried(1)(2)(3)(4)(5)...), JavaScript needs a signal to know when to stop collecting arguments and return the final answer.

The standard interview pattern is calling it with empty parentheses () at the end as the stop signal.

/*
+-----------------+---------------------------------------------------------------+--------------------------------------------------------------------+
| Feature         | Fixed Currying (curried(1)(2)(3))                             | Infinite Currying (infiniteCurry(1)(2)(3)...())                    |
+-----------------+---------------------------------------------------------------+--------------------------------------------------------------------+
| Stop Condition  | Checks if total arguments reached a limit (args.length >= 3)  | Checks if the current call has no arguments (nextArgs.length === 0)|
| Call Count      | Fixed (e.g., exactly 3 calls)                                 | Dynamic (as many calls as you want until ())                       |
| Last Call       | (3) returns the number                                        | () (empty call) returns the number                                 |
+-----------------+---------------------------------------------------------------+--------------------------------------------------------------------+
*/