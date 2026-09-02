/*
Implement **promiseTimeout(fn, t)**
    
Create a wrapper that rejects if the promise-returning function takes more than `t` milliseconds.  

const limited = promiseTimeout(fetchData, 2000);

limited()
  .then(console.log)
  .catch(console.error);
 */

function promiseTimeout(fn, time) {
  // fn = the original Promise-returning function; time = its time limit.
  // Return a new function instead of calling fn immediately.
  return function (...args) {
    // ...args stores arguments passed to the new function.
    // When this new function is called, return a Promise to the caller.
    return new Promise((resolve, reject) => {
      // These resolve and reject functions belong to this outer Promise.
      // Start the time limit. If it finishes first, reject the Promise.
      const timer = setTimeout(() => {
        reject(new Error("Promise timed out"));
      }, time);

      // Promise.resolve() creates an already-successful starter Promise.
      // It does not mean fn() has succeeded; it only starts the chain.
      Promise.resolve()
        // .then() expects a callback, so we give it a function to call later.
        // We use a callback instead of fn(...) directly so fn's result or
        // synchronous error becomes part of this Promise chain.
        .then(() => fn.apply(this, args))
        // () => ... is the callback; it runs fn when the chain reaches .then().
        // fn is the original function, apply() calls it, this preserves the
        // calling context, and args passes all arguments from the wrapper.
        .then((result) => {
          // fn succeeded first: cancel the timer and resolve with its result.
          clearTimeout(timer);
          // Give fn's result to the caller through the outer Promise.
          resolve(result);
        })
        .catch((error) => {
          // fn failed first: cancel the timer and reject with its error.
          clearTimeout(timer);
          // Give fn's error to the caller through the outer Promise.
          reject(error);
        });
    });
  };
}

// Demo function: it succeeds after 500 ms, before the 2000 ms limit.
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data loaded"), 500);
  });
}

// Create the timeout-protected version of fetchData.
const limited = promiseTimeout(fetchData, 2000);

// limited() returns the outer Promise, so .then() and .catch() can be used.
limited()
  .then(console.log)
  .catch(console.error);