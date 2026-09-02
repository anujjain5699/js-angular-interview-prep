/*
Implement a **cache with expiration**

Store values with a time limit and automatically invalidate expired entries.
*/

class Cache {
  constructor(cleanupIntervalMs=1000) {
    this.store = new Map();
    this.cleanupTimer=null
    this.cleanupIntervals=cleanupIntervalMs
  }

  cleanUp() {
    const now = Date.now();
      this.store.forEach((value, key) => {
        if (value.expireAt < now) {
          this.store.delete(key);
        }
      });
  }

  startCleanUp(){
    if(this.cleanupTimer)return;

    this.cleanupTimer=setInterval(()=>{
        this.cleanUp()
    },this.cleanupIntervals)
  }

  stopCleanup(){
    if(this.cleanupTimer){
        clearInterval(this.cleanupTimer)
        this.cleanupTimer=null
    }
  }

  add(key, value, ttlMs) {
    //new Date() is useful when
    // we need a date object for formatting or display, but not for simple expiry comparisons.
    // const now = new Date();
    // const expireAt = new Date(now.getTime() + ttlMs);
    const expireAt = Date.now() + ttlMs;

    this.store.set(key, { value: value, expireAt: expireAt });
  }

  get(key) {
    const entry = this.store.get(key);

    if (!entry) {
      return { found: false, value: undefined };
    }

    if (entry.expireAt < Date.now()) {
      this.store.delete(key);
      return { found: false, value: undefined };
    }

    return { found: true, value: entry.value };
  }

  getAll() {
    this.store.forEach((value, key) => {
      console.log(`key: ${key} value: ${value.value}`);
    });
  }

  
}

const cache = new Cache();

cache.startCleanUp()

cache.add("item1", "item1", -3 * 1000);
cache.add("item12", "item12", 10000);
cache.add("item13", "item13", 1000);
cache.add("item14", "item14", 10000);
cache.add("item15", "item15", 0);

// console.log(cache.get("item1"));
// console.log(cache.get("item11"));

await new Promise((resolve) => setTimeout(resolve, 1000));

cache.getAll();

cache.stopCleanup()