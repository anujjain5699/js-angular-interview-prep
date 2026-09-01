/*
Create an **object from a string path**
    
    Convert a string path into a nested object.
    
    createObject("a.b.c=10");
    // { a: { b: { c: 10 } } }
 */
//appraoch 1:Building backwards (Inside-Out)
function createObject(str) {

    let newstr = str.split('=') //a.b.c & 10
    let str2 = newstr[1]
    let str3 = newstr[0].split('.').reverse()

    // CHANGE 1: Get the actual string "c" instead of the number 2
    let last_key = str3[0]

    let last_value = str2
    let newObj = { [last_key]: last_value }

    // CHANGE 2: Loop over the rest of the array starting from index 1 (gets "b", then "a")
    for (let item of str3.slice(1)) {
        console.log(item)

        // CHANGE 3: Overwrite newObj entirely to wrap it in the new key
        newObj = { [item]: newObj }

        console.log('item:', item, newObj)
    }

    // JSON.stringify helps console.log print nested objects instead of [Object]
    console.log(JSON.stringify(newObj, null, 2))

}
createObject("a.b.c=10");


//approach 2: Building forwards (Left-to-Right)
function createObject2(str) {
    let [pathStr, valueStr] = str.split('=');
    let keys = pathStr.split('.'); // ['a', 'b', 'c']
    let parsedValue = isNaN(valueStr) ? valueStr : Number(valueStr);

    let result = {};
    let current = result; // 'current' is a reference to the inner object

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];

        // If it's the last key, assign the value
        if (i === keys.length - 1) {
            current[key] = parsedValue;
        } else {
            // Otherwise, create a new empty object and move the pointer inside it
            current[key] = {};
            current = current[key];
        }
    }

    console.log(JSON.stringify(result, null, 2));
    return result;
}

createObject2("a.b.c=10");
