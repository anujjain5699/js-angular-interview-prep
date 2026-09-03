/**
 * Sort Array of Objects by Age
 * 
 * Problem:
 * Given an array of objects with 'name' and 'age' properties, sort the array based on 'age'.
 * 
 * Input:
 * const arr = [{name: "John", age: 24}, {name: "Mark", age: 30}, {name: "Mike", age: 20}];
 * 
 * Expected Output (Ascending):
 * [
 *   { name: "Mike", age: 20 },
 *   { name: "John", age: 24 },
 *   { name: "Mark", age: 30 }
 * ]
 */

/**
 * Sorts an array of objects by their 'age' property.
 * 
 * @param {Array<{name: string, age: number}>} array - The array to sort
 * @param {boolean} [ascending=true] - Sort direction (true for ascending, false for descending)
 * @returns {Array<{name: string, age: number}>} A new sorted array (immutable)
 */
function sortByAge(array, ascending = true) {
  if (!Array.isArray(array)) {
    throw new TypeError('Input must be an array');
  }

  // Create a shallow copy using spread operator to avoid mutating the original array
  return [...array].sort((a, b) => {
    return ascending ? a.age - b.age : b.age - a.age;
  });
}

// --- Execution & Verification ---

const arr = [
  { name: "John", age: 24 },
  { name: "Mark", age: 30 },
  { name: "Mike", age: 20 }
];

console.log('Original Array:', arr);

// Ascending order (youngest to oldest)
const sortedAsc = sortByAge(arr, true);
console.log('\nSorted by Age (Ascending):');
console.log(sortedAsc);

// Descending order (oldest to youngest)
const sortedDesc = sortByAge(arr, false);
console.log('\nSorted by Age (Descending):');
console.log(sortedDesc);

// In-place sorting example (mutates original array)
const arrInPlace = [...arr];
arrInPlace.sort((a, b) => a.age - b.age);
console.log('\nIn-place Sorted Array:');
console.log(arrInPlace);
