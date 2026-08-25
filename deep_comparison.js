/**
Implement **deep comparison** of two nested objects    
Compare two values deeply and return whether they are equal.    
deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }); // true
 */

function deepEqual(a, b) {
    if (a === b) return true

    if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
        //deepEqual(5, "hello") or deepEqual(null, {})
        return false
    }

    if (Array.isArray(a) !== Array.isArray(b)) {
        return false
    }

    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) {
        return false
    }

    for (const key of keysA) {
        // if (!b.hasOwnProperty(key) || !deepEqual(a[key], b[key])) {
        //     return false
        // }
        if (!Object.hasOwn(b, key) || !deepEqual(a[key], b[key])) {
            return false
        }
    }

    return true
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: NaN, b: { c: 2 } }, { a: NaN, b: { c: 2 } })); // false


/*
KEY NOTES:
===================================================================================
1. Why Object.hasOwn(b, key) or Object.prototype.hasOwnProperty.call(b, key)?
===================================================================================
`b.hasOwnProperty(key)` works for 99% of standard objects, but crashes in 2 edge cases:

--- Edge Case A: Objects with No Prototype (Object.create(null)) ---
const b = Object.create(null); // Has NO prototype, so b.hasOwnProperty is undefined
b.a = 1;

b.hasOwnProperty("a");                         // ❌ Uncaught TypeError: b.hasOwnProperty is not a function
Object.hasOwn(b, "a");                         // ✅ true (Safe!)
Object.prototype.hasOwnProperty.call(b, "a");  // ✅ true (Safe!)

--- Edge Case B: Shadowed Property (Key named "hasOwnProperty") ---
const user = {
    name: "Anuj",
    hasOwnProperty: "some-custom-value" // Shadows the prototype method!
};

user.hasOwnProperty("name");                         // ❌ Uncaught TypeError: user.hasOwnProperty is not a function
Object.hasOwn(user, "name");                         // ✅ true (Safe!)
Object.prototype.hasOwnProperty.call(user, "name");  // ✅ true (Safe!)

===================================================================================
Summary Recommendation:
- Modern ES2022+: Use `Object.hasOwn(obj, key)` (Concise & Safe)
- Classic ES5+:   Use `Object.prototype.hasOwnProperty.call(obj, key)`
===================================================================================

2. Why NaN === NaN is false:
const x = NaN;
const y = NaN;
console.log(x === y); // ❌ Output: false

/**
 * // ============================================================================
// CASE 1: Why `===` fails on NaN
// ============================================================================
console.log(NaN === NaN); // ❌ false (IEEE-754 standard: NaN is never equal to anything, even itself)

const a = { x: NaN };
const b = { x: NaN };

// If deepEqual ONLY uses `a === b`:
// a.x === b.x (NaN === NaN) evaluates to false!
// ❌ deepEqual(a, b) incorrectly returns false!


// ============================================================================
// CASE 2: Why the global `isNaN()` is dangerous (Type Coercion Flaw)
// ============================================================================
// The global isNaN() tries to convert the value to a number first:
console.log(isNaN("hello"));     // ❌ true!  (Number("hello") is NaN, so it thinks "hello" is NaN)
console.log(isNaN(undefined));   // ❌ true!  (Number(undefined) is NaN)
console.log(isNaN({}));          // ❌ true!  (Number({}) is NaN)

// Danger in deepEqual if you write: if (isNaN(a) && isNaN(b)) return true;
// isNaN("apple") is true, and isNaN("banana") is true!
// ❌ deepEqual("apple", "banana") would incorrectly return TRUE!


// ============================================================================
// CASE 3: Why `Number.isNaN()` is safe (Strict Check, No Coercion)
// ============================================================================
// Number.isNaN() ONLY returns true if the value is ACTUALLY the value NaN:
console.log(Number.isNaN(NaN));         // ✅ true
console.log(Number.isNaN("hello"));     // ✅ false (it's a string, not NaN)
console.log(Number.isNaN(undefined));   // ✅ false
console.log(Number.isNaN({}));          // ✅ false

// In deepEqual:
// if (Number.isNaN(a) && Number.isNaN(b)) return true;
// ✅ deepEqual(NaN, NaN) -> true
// ✅ deepEqual("apple", "banana") -> false


// ============================================================================
// CASE 4: The Modern 1-Liner: `Object.is(a, b)`
// ============================================================================
// Object.is() has built-in SameValue semantics:
console.log(Object.is(1, 1));           // ✅ true
console.log(Object.is("test", "test")); // ✅ true
console.log(Object.is(NaN, NaN));       // ✅ true (handles NaN equality natively!)
console.log(Object.is("hello", "world"));// ✅ false

 */