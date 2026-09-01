/*
5. Implement a **once() function**
    
    Create a utility that runs the given function only the first time.
    const init = once(() => {
  console.log("Initialized");
  return 42;
});

init(); // "Initialized"
init(); // nothing
init(); // nothing
*/

function once(fn) {
    let cancelled = false;

    return function (...args) {
        if (!cancelled) {
            cancelled = true
            return fn(...args)
        } else {
            return undefined
        }
    }
}

const init = once(() => {
    console.log("initialized")
    return 42;
})

console.log(init());
console.log(init());
console.log(init());