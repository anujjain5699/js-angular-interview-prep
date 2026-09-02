/*
Implement an **LRU Cache**
    
Design a cache that removes the least recently used item when capacity is full.
    
Expected operations: `get` and `put` in `O(1)` time.
    
const cache = new LRUCache(2);

cache.put(1, "A");
cache.put(2, "B");
cache.get(1);      // "A"
cache.put(3, "C"); // removes key 2
cache.get(2);      // -1 or null

*/

class LRUCache {
  constructor(size) {
    // Map keeps insertion order: first is least recently used,
    // last is most recently used.
    this.size = size;
    this.cacheMap = new Map();
  }

  put(key, value) {
    if (this.cacheMap.has(key)) {
      // Delete before setting so an updated key moves to the newest position.
      this.cacheMap.delete(key);
    } else if (this.cacheMap.size >= this.size) {
      // Evict only when adding a new key to a full cache.
      const leastRecentlyUsedKey = this.cacheMap.keys().next().value;
      this.cacheMap.delete(leastRecentlyUsedKey);
    }

    // A new or updated key is now the most recently used entry.
    this.cacheMap.set(key, value);
  }

  get(key) {
    if (!this.cacheMap.has(key)) {
      // The found flag avoids confusing a missing key with a stored undefined value.
      return { found: false, value: undefined };
    }

    const value = this.cacheMap.get(key);

    // Reading a key makes it recently used, so move it to the end of the Map.
    this.cacheMap.delete(key);
    this.cacheMap.set(key, value);

    return { found: true, value };
  }

  getAll() {
    this.cacheMap.forEach((value, key) => {
      console.log(`key: ${key} value: ${value}`);
    });
  }
}

const cache = new LRUCache(3);

cache.put(1, "A");
cache.put(2, "B");
console.log('first get ALL before get any key')
cache.getAll();
console.log(cache.get(1)); // "A"
console.log('Second get ALL after get any key')
cache.getAll();
cache.put(3, "C");
cache.put(2, "B");
console.log(cache.get(2)); 
cache.getAll();
