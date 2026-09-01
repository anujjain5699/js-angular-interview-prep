// -------------------------------------------------------------
// 1. DEBOUNCE (The Elevator Door Analogy)
// "Wait until user stops doing the action for `delay` ms"
// -------------------------------------------------------------
function debounce(fn, delay) {
    let timer;

    return function (...args) {
        // Clear previous timer if called again before delay finishes
        clearTimeout(timer);

        // Set new timer
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

/*
We write and return a new function so we can give our original function a private
timer memory box, and hand back an upgraded "smart" version that waits before
running.

const search = debounce((text) => {
  console.log("Searching for:", text);
}, 500);

input.addEventListener("input", (e) => {
  search(e.target.value);
});

*/

// -------------------------------------------------------------
// 2. THROTTLE (The Video Game Gun Cooldown Analogy)
// "Run once, then ignore all calls until `delay` cooldown is over"
// -------------------------------------------------------------
function throttle(fn, delay) {
    let isWaiting = false;

    return function (...args) {
        // If cooldown is active, ignore the call
        if (isWaiting) return;

        // Execute function
        fn(...args);

        // Turn on cooldown
        isWaiting = true;

        // Turn off cooldown after delayc
        setTimeout(() => {
            isWaiting = false;
        }, delay);
    };
}

// -------------------------------------------------------------
// TESTING & DEMO
// -------------------------------------------------------------
function log(type, msg) {
    console.log(`[${type}] ${msg} at ${new Date().toLocaleTimeString()}`);
}

const debouncedSearch = debounce((text) => log("DEBOUNCE", text), 500);
const throttledScroll = throttle((text) => log("THROTTLE", text), 500);

console.log("=== Triggering Debounce (Spamming 3 times) ===");
debouncedSearch("Search 'a'");
setTimeout(() => debouncedSearch("Search 'ap'"), 600)
// debouncedSearch("Search 'ap'");
debouncedSearch("Search 'apple'"); // Only this last one will execute after 500ms!

/*
Time:   0ms                                     500ms      600ms                                  1100ms
        ├─────────────────────────────────────────┼──────────┼───────────────────────────────────────┤
        │                                         │          │                                       │
Action: • 'a' scheduled (cancelled instantly ❌)  • 'apple'  • 'ap' arrives & starts 500ms timer     • 'ap'
        • 'apple' scheduled for 500ms ✅           FIRES! 🎉                                         FIRES! 🎉
        • 600ms delayed trigger scheduled

*/


console.log("=== Triggering Throttle (Spamming 3 times) ===");
throttledScroll("Scroll 100px");   // Executes immediately!
throttledScroll("Scroll 200px");   // Ignored
throttledScroll("Scroll 300px");   // Ignored

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce, throttle };
}

/*
Snippet 1: Angular Debounce (Search Input)
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  template: `
    <!-- On every user keystroke, trigger onSearch -->
    <input 
      type="text" 
      (input)="onSearch($event)" 
      placeholder="Search products..." 
    />
  `
})
export class SearchComponent implements OnInit, OnDestroy {
  // 1. Create a Subject to act as an event stream
  private searchSubject = new Subject<string>();
  private subscription!: Subscription;

  ngOnInit() {
    // 2. Set up the debounced stream
    this.subscription = this.searchSubject
      .pipe(
        debounceTime(500),        // ⏳ Wait 500ms after the user stops typing
        distinctUntilChanged()    // 🚫 Ignore if the value hasn't changed
      )
      .subscribe((searchText) => {
        this.fetchResults(searchText);
      });
  }

  // 3. Push every keystroke value into the Subject
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  fetchResults(query: string) {
    console.log('Searching API for:', query);
  }

  // 4. Clean up subscription to prevent memory leaks
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
Explanation:
Subject<string>: Acts as a pipe where we push every keystroke using .next(value).
debounceTime(500): Waits for a 500ms pause in typing before emitting the latest value.
distinctUntilChanged(): Prevents duplicate API calls if the search term didn't change (e.g. user pressed arrow keys).
ngOnDestroy(): Unsubscribes from the stream when the component is destroyed.


Snippet 2: Angular Throttle (Button Click / Spam Prevention)
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-submit-button',
  template: `
    <!-- User can click multiple times, but action only triggers once per second -->
    <button (click)="onSubmitClick()">Submit Order</button>
  `
})
export class SubmitButtonComponent implements OnInit, OnDestroy {
  // 1. Create a Subject to capture click events
  private clickSubject = new Subject<void>();
  private subscription!: Subscription;

  ngOnInit() {
    // 2. Set up the throttled stream
    this.subscription = this.clickSubject
      .pipe(
        throttleTime(1000) // 🔫 Fire immediately on 1st click, ignore all clicks for 1000ms
      )
      .subscribe(() => {
        this.placeOrder();
      });
  }

  // 3. Push click event into Subject
  onSubmitClick() {
    this.clickSubject.next();
  }

  placeOrder() {
    console.log('Order submitted successfully!');
  }

  // 4. Clean up subscription to prevent memory leaks
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
Explanation:
Subject<void>: Collects all button clicks.
throttleTime(1000): Executes the first click immediately, then turns on a 1-second cooldown during which all extra clicks are dropped.
ngOnDestroy(): Unsubscribes when navigating away to keep memory clean.

Debounce → clear + wait
Throttle → lock + release
*/