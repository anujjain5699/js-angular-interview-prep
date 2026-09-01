/*
Flatten an **array** without using `Array.prototype.flat()`

flattenArray([1, [2, [3, [4]]]]);
// [1, 2, 3, 4]
*/

function flattenArray(arr) {
    if (!Array.isArray(arr)) {
        return arr;
    }

    let newArr = [];
    
    for (let item of arr) {
        if (Array.isArray(item)) {
            /* 
             * This is totally fine for most cases. However, if the inner array is massive 
             * (e.g., 100,000+ items), the spread operator `...` might cause a "Maximum 
             * call stack size exceeded" error because it tries to pass all items as 
             * separate arguments to .push().
             *
             * To be incredibly safe, you could use .concat() instead, which handles 
             * huge arrays safely:
             */
            // newArr.push(...flattenArray(item));
            newArr = newArr.concat(flattenArray(item));
        } else {
            newArr.push(item);
        }
    }
    
    return newArr;
}

console.log(flattenArray([1, [2, [3, [4]]]]));