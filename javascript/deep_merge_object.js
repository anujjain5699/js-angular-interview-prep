/**
 * Deep Merge / Copy Objects
 * 
 * Write a JavaScript function to deep merge `obj2` into `obj1`.
 * - Nested objects are recursively merged (preserving target keys not in source).
 * - Arrays and primitive values in source overwrite target values.
 * 
 * Example:
 * obj1 = {a: 1, b: {x: 2, y: 3, z:4}, e: [5,6,7], g: 9}
 * obj2 = {f: 1, b: {x: 8, y: 9}, e: [3,7], t: 9}
 * 
 * Output:
 * {
 *   a: 1,
 *   b: { x: 8, y: 9, z: 4 }, // z is preserved!
 *   e: [ 3, 7 ],             // Arrays are overwritten
 *   g: 9,
 *   f: 1,
 *   t: 9
 * }
 */

/**
 * Helper function to check if a value is a plain object (excluding arrays and null)
 * @param {*} item 
 * @returns {boolean}
 */
function isObject(item) {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merges properties from source object into target object.
 * 
 * @param {Object} target - The object that receives merged properties
 * @param {Object} source - The object providing properties to merge
 * @returns {Object} The merged target object
 */
function deepMerge(target, source) {
  // Return target if source is invalid or not an object
  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  // Iterate over all own keys of the source object
  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];

    // If both values are plain objects, perform recursive deep merge
    if (isObject(targetValue) && isObject(sourceValue)) {
      deepMerge(targetValue, sourceValue);
    } else {
      // Otherwise overwrite (arrays, primitives, null/undefined, functions)
      target[key] = sourceValue;
    }
  });

  return target;
}

// --- Test Execution ---

const obj1 = { a: 1, b: { x: 2, y: 3, z: 4 }, e: [5, 6, 7], g: 9 };
const obj2 = { f: 1, b: { x: 8, y: 9 }, e: [3, 7], t: 9 };

const result = deepMerge(obj1, obj2);

console.log('Merged Output:');
console.log(result);
