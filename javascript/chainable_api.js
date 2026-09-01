function computeAmount() {
    let amount = 0;

    return {
        lacs(lakhs) {
            amount += 100000 * lakhs;
            return this;
        },

        crore(crores) {
            amount += 10000000 * crores;
            return this;
        },

        valueof() {
            return amount;
        }
    };
}

console.log(
    computeAmount()
        .lacs(10)
        .crore(2)
        .valueof()
);

/*
 * Because of a JavaScript feature called Closures, the methods inside that returned object 
 * "remember" and share access to that `let amount = 0;` variable, even after computeAmount() 
 * finishes running.
 *
 * So the flow looks exactly like this:
 *
 * Start: amount is 0
 * After .lacs(10): It updates that shared amount memory to 1000000 (10 lacs), and returns the object.
 * After .crore(2): It takes the same object, looks at the same shared amount memory (which is currently 
 *                  1000000), adds 20000000 to it, and returns the object.
 * After .valueof(): It looks at that shared amount one last time (now 21000000) and returns it.
 */