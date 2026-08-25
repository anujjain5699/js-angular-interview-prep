function deepClone(obj,map=new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    // Handle circular references / shared objects:
    // We store a mapping from the original object's reference -> its clone in `map`.
    // Conceptual example (addresses for clarity):
    //   original obj at address 1001 -> clone object at address 1002
    //   map internally looks like: { 1001 => 1002 }
    // When we see the same original reference again we must return the already-created
    // clone instead of making a new one. `map.has(obj)` checks identity (reference),
    // not object shape. So `map.has(obj)` is like checking `map.has(1001)` in the example.
    // That preserves cycles and shared sub-objects in the cloned graph.
    if (map.has(obj)) return map.get(obj); // <- handles circular refs

    const copy = Array.isArray(obj) ? [] : {};
    map.set(obj,copy)

    for (let key in obj) {
        // Use the original `hasOwnProperty` method via `.call` for safety.
        // Why not `obj.hasOwnProperty(key)`?
        // - `obj` might be created with `Object.create(null)` and therefore
        //   has no `hasOwnProperty` method.
        // - `obj` might shadow/override `hasOwnProperty` with a different function.
        // Calling `Object.prototype.hasOwnProperty.call(obj, key)` ensures we always
        // run the built-in check with `this` set to `obj`.
        // Example:
        //   const o = Object.create(null);
        //   o.a = 1;
        //   // o.hasOwnProperty === undefined
        //   Object.prototype.hasOwnProperty.call(o, 'a') // true
        if (Object.prototype.hasOwnProperty.call(obj,key)) {
            copy[key] = deepClone(obj[key],map)
        }
    }

    return copy;
}

const obj = {

    name: "Anuj",
    age: 23,
    address: {
        city: "Delhi",
        state: "Delhi"
    }
};

const copy = deepClone(obj);

obj.address.city = "Mumbai";

console.log("original")
console.log(obj);
console.log("cloned")
console.log(copy);


const user = { name: "Anuj" };
user.myself = user; // Circular reference
const clonedUser = deepClone(user);
console.log('Circular reference example')
console.log(clonedUser.name); // "Anuj"
console.log(clonedUser.myself === clonedUser);
/*
deepClone(obj)
  ├── deepClone("Anuj")  ──► returns "Anuj"
  ├── deepClone(23)      ──► returns 23
  └── deepClone(address) ──► creates new innerCopy = {}
        ├── deepClone("Delhi") ──► returns "Delhi"
        └── deepClone("Delhi") ──► returns "Delhi"
        └── returns innerCopy to copy["address"]

*/