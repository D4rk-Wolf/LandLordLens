# Tests

This directory contains unit tests for the LandlordLens application.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

- `setup.js` - Test environment configuration
- `lib/` - Tests for library functions
  - `subscription.test.js` - Subscription utility tests
  - `middleware/` - Middleware tests
    - `sanitize.test.js` - Input sanitization tests

## Adding New Tests

1. Create test files with `.test.js` or `.spec.js` extension
2. Place them in the appropriate directory structure
3. Use Jest's testing utilities
4. Follow the existing test patterns

## Coverage

Coverage reports are generated in the `coverage/` directory when running `npm run test:coverage`.
