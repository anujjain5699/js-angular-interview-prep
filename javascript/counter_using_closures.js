/*
4. Create a **counter using closures**
    
    Implement `increment`, `decrement`, and `reset` methods using private state.
    
    ```jsx
    const counter = createCounter(5);
    
    console.log(counter.increment()); // 6
    console.log(counter.increment()); // 7
    console.log(counter.decrement()); // 6
    console.log(counter.reset());     // 5
    ```
*/

function createCounter(start = 0) {
    let count = start;
    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        reset() {
            count = start;
            return count;
        }
    }
}
const counter = createCounter(5);

console.log(counter.increment()); // 6
console.log(counter.increment()); // 7
console.log(counter.decrement()); // 6
console.log(counter.reset());     // 5