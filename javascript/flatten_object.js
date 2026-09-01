/**
 Flatten a **nested object**
    
   Convert a deeply nested object into a flat object using dot notation.
    
    flattenObject({ a: { b: { c: 1 } } });
    // { "a.b.c": 1 }
   
 */

function flattenObj(obj) {
    if (typeof obj !== 'object') {
        return obj
    }

    let newObj = {}
    console.log(`object: `, obj)

    for (let key in obj) {
        console.log(`key: ${key}, typeof: ${typeof obj[key]}`)
        if (typeof obj[key] === 'object') {
            let result = flattenObj(obj[key])
            console.log(`flatten call ${key},result: `, result)

            //loop through inner object and create combined keys
            for (let innerKey in result) {
                newObj[`${key}.${innerKey}`] = result[innerKey]
            }
        } else {
            newObj[key] = obj[key]
        }
        console.log(`newObj with key`, key, newObj)
    }
    return newObj
}

// console.log(flattenObj({ a: { b: { c: 1 } } }))

console.log(flattenObj({
    x: 1,
    a: { b: 2 },
    y: 3
})
)
//{ x: 1, 'a.b': 2, y: 3 }
