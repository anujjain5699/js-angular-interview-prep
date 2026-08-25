function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    const copy = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepClone(obj[key])
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