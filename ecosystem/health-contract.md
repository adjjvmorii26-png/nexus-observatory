# Health Contract

The first observatory pass deliberately avoids fake precision.

| Signal | Meaning |
|---|---|
| verified | Directly checked |
| inferred | Derived from known metadata |
| unknown | No trustworthy observation exists |
| attention | Concrete follow-up is indicated |

## Minimum future pulse

For each repository, attempt:

1. repository accessibility
2. default branch existence
3. agent instructions presence
4. CI workflow presence
5. test/build command discoverability
6. secret-surface scan
7. deployment configuration discovery
8. recent workflow result

Emit raw evidence alongside status so a human can audit the conclusion.
