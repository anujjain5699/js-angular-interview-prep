---
name: code-validation
description: Enforces validating code and explaining proposed changes in chat first rather than directly modifying workspace files without user confirmation.
---

# Code Validation and Modification Guidelines

## Core Rule: Validate Before Modifying Files
1. **Never directly overwrite or inject code snippets into user files** without first presenting, explaining, and validating the approach in conversation unless the user explicitly requests direct file edits.
2. **Present snippets in chat first**: Show the proposed logic, explain key edge cases, and clarify the syntax/rationale.
3. **Verify edge cases thoroughly**: Anticipate boundary conditions, type mismatches, empty/null states, and error handling before proposing solutions.
4. **Only modify files upon confirmation** or when explicitly directed to apply the changes.

