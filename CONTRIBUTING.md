# Contributing to JS & Angular Interview Prep 🚀

Thank you for your interest in contributing! This repository is dedicated to clean, readable JavaScript and Angular interview solutions, design patterns, and mental models.

---

## 🛠️ Contribution Guidelines

### 1. Adding a New JavaScript Solution
When adding a new solution file (e.g. `lru_cache.js`):
- **Modern ES6+**: Use concise, modern JavaScript features (closures, rest/spread, async/await, `Object.hasOwn`, etc.).
- **Self-Contained**: Include executable test cases at the bottom of the file with clear `console.log` output.
- **Mental Models & Notes**: Include comments explaining edge cases, why certain patterns were chosen, and interview talking points.

### 2. Adding Angular Concepts
When adding Angular topics:
- Include clean TypeScript examples with template and component code.
- Explain lifecycle hooks, RxJS patterns (e.g. `debounceTime`, `takeUntilDestroyed`), and change detection implications.

### 3. Local Verification & README Sync
Before committing:
1. **Run your file locally**:
   ```bash
   node your_file.js
   ```
   Ensure it executes with 0 errors and all assertions log as expected.
2. **Auto-update the README table of contents**:
   ```bash
   node update_readme.js
   ```

### 4. Submitting a Pull Request
1. Fork the repo and create your branch:
   ```bash
   git checkout -b feat/your-topic-name
   ```
2. Commit your changes with a clear message:
   ```bash
   git commit -m "feat: add LRU cache implementation and test cases"
   ```
3. Push to your branch and open a Pull Request targeting `main`.
4. Our automated GitHub Actions CI pipeline will run all test files to verify your solution.
