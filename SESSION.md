# Current Session State (Handoff Tracker)

> **Purpose**: Read this file to seamlessly continue work across Antigravity and GitHub Copilot without losing context.

## Current Progress
- [x] **Parallel Async Limit**: Solved using the Worker Pool pattern in `parallel_limit.js` (including completion order `[2, 3, 1, 4]` and timeline traces).
- [x] **Fixed Currying (`sum(1)(2)(3)`)**: Solved and explained with closure deep-dive in `currying.js`.
- [x] **Infinite Currying (`infiniteCurry(1)(2)...()`)**: Solved with `()` terminator and test cases in `infiniteCurry.js`.
- [x] **Debounce & Throttle (Vanilla JS)**: 
  - Plain implementation without unnecessary complexity in `debounce_throttle.js`.
  - Detailed memory breakdown of `let timer` outer scope vs local calls.
  - Explanation of `...args` (rest operator) and factory wrapper patterns.
  - Complete millisecond timeline trace for both Debounce and Throttle.
- [x] **Angular Debounce & Throttle (RxJS)**:
  - Debounce for Search Input using `Subject<string>`, `debounceTime(500)`, `distinctUntilChanged()`, and `ngOnDestroy` unsubscription.
  - Throttle for Button Click spam protection using `Subject<void>`, `throttleTime(1000)`, and `ngOnDestroy`.
- [x] **Ponytail Plugin**: Installed and tested for concise, low-boilerplate code.
- [x] **Shared MCP Memory & Context Setup**: Configured for Antigravity and Copilot.
- [x] **Deep Comparison (`deepEqual(a, b)`)**: 
  - Solved in `deep_comparison.js`.
  - Edge cases documented: `NaN !== NaN` (handled via `Object.is` / `Number.isNaN`), `typeof null === 'object'`, `Array.isArray` differentiation (`[] !== {}`), and key length checking.
  - Safe key lookup using `Object.hasOwn(b, key)` / `Object.prototype.hasOwnProperty.call(b, key)`.
  - Loop safety: `for...of` on `Object.keys()` arrays vs `for...in`.
- [x] **Code Validation Skill**: Added `.agents/skills/code-validation/SKILL.md` enforcing validating/explaining code snippets in chat before modifying user files.
- [x] **CI/CD Automated Execution Gate**: Added `.github/workflows/test-solutions.yml` and updated `update-readme.yml` with Node.js `lts/*` for automated PR status checks.
- [x] **Autocomplete Search Box (Typeahead)**: Implemented and validated in `autocomplete_search.html` with real-time fetch, event delegation, DOM removal, and outside click dismissal.
- [x] **SQL Interview Practice**: Added table creation, data insertion, and CTE/Window Function partitioning query in `products_partition.sql`.
- [x] **Fill-Forward Category Problem**: Added a SQL example in `sql/fill_missing_category.sql` that carries the previous non-null category forward across NULL rows and includes an interview question plus expected output table.

## Next Planned Topics / Tasks
- [ ] Practice `promiseTimeout(fn, time)` edge cases and Promise.race
- [ ] Deep Clone & Shallow Clone implementations (including circular reference handling).
- [ ] LRU Cache implementation in JavaScript.
- [ ] Promises from scratch / `Promise.all`, `Promise.allSettled`, `Promise.race` polyfills.
- [ ] Event Emitter / PubSub pattern from scratch.
- [ ] Angular Lifecycle Hooks deep dive.

## Key Decisions & Mental Models
- **Code Validation First**: Never modify code files directly without first presenting and validating the snippet in conversation.
- **Deep Comparison**:
  - `Object.is(a, b)`: Modern standard for value equality, handles `Object.is(NaN, NaN) === true` without extra checks.
  - `Object.hasOwn(b, key)`: Safer than `b.hasOwnProperty()` for `Object.create(null)` and shadowed properties.
  - `for...of` for array values (keys list) vs `for...in` which iterates array indices.
- **Debounce**: Elevator door model (waits for silence, executes the **last** action).
- **Throttle**: Gun cooldown model (executes the **first** action immediately, ignores rapid spam until cooldown expires).
- **Rest/Spread (`...args`)**: A flexible container/backpack allowing functions to handle any number of arguments dynamically.
- **Worker Pool**: Avoids manual integer counting and recursion; uses `while` loops inside worker promises coordinated by `Promise.all(workers)`.
- Maintain minimal dependencies and standard library / idiomatic modern ES6+ first.

## Latest Completed Work
- Implemented and commented `javascript/promise_timeout.js`.
- The outer Promise controls the wrapper result; the timer rejects on timeout, while the function chain resolves or rejects it first.
- `Promise.resolve().then(() => fn.apply(this, args))` also converts synchronous throws into Promise rejections.


