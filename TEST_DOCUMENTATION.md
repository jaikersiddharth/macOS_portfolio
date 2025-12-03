# Test Suite Documentation

## Overview

This test suite provides comprehensive coverage for the Welcome component, App component, and component exports that were added in the current branch. The suite includes **74 test cases** across 3 test files.

## Test Infrastructure

### Configuration Files

#### `vitest.config.js`
- Configures Vitest as the test runner
- Sets up jsdom environment for React component testing
- Configures path aliases matching the Vite configuration
- Enables CSS processing in tests
- Sets up coverage reporting with v8 provider

#### `src/test/setup.js`
- Extends Vitest's expect with jest-dom matchers
- Configures automatic cleanup after each test
- Mocks browser APIs (matchMedia, IntersectionObserver, ResizeObserver)
- Ensures consistent test environment

## Test Files

### 1. `src/components/__tests__/Welcome.test.jsx` (44 tests)

Tests the Welcome component which features:
- Text rendering with individual character spans
- GSAP animations on mouse hover
- Variable font weight transitions
- Complex mouse interaction calculations

#### Test Categories:

**Rendering (7 tests)**
- Basic component rendering
- Section with correct ID
- Subtitle and title text content
- Small screen message
- CSS class application

**Text Rendering with renderText function (8 tests)**
- Span element generation for each character
- CSS class application to spans
- Space to non-breaking space conversion
- Font weight initialization (subtitle: 100, title: 400)

**GSAP Animation Setup (4 tests)**
- useGSAP hook invocation
- Event listener setup (mousemove, mouseleave)
- Event listener cleanup on unmount

**Mouse Interaction Behavior (4 tests)**
- Ref attachment to DOM elements
- GSAP animation triggering on hover
- Font weight calculation based on mouse distance

**Font Weight Configuration (2 tests)**
- Subtitle weight range (100-400)
- Title weight range (400-900)

**Edge Cases and Error Handling (7 tests)**
- Null reference handling
- Undefined props handling
- Rapid re-render stability
- Mouse leave event handling
- Special character rendering (apostrophes)
- DOM structure preservation after interactions

**Accessibility (4 tests)**
- Semantic HTML (section, h1, p)
- Proper heading hierarchy
- Text readability with non-breaking spaces

**Performance and Optimization (3 tests)**
- Refs usage for performance
- Memory leak prevention (cleanup verification)
- Efficient span rendering (< 100ms)

**Integration with lucide-react (1 test)**
- Container import handling

**CSS Classes and Styling (3 tests)**
- Tailwind class application verification

**Mathematical Calculations (2 tests)**
- Distance-based font weight calculation
- Exponential decay formula (Math.exp(-(distance²)/(2*10000)))

### 2. `src/components/__tests__/App.test.jsx` (16 tests)

Tests the App component integration with Navbar and Welcome components.

#### Test Categories:

**Rendering (5 tests)**
- Component mounting without errors
- Main element as root container
- Navbar component presence
- Welcome component presence
- Both components rendered together

**Component Order (2 tests)**
- Navbar renders before Welcome
- Correct component hierarchy (2 children)

**Integration (2 tests)**
- Barrel export imports work correctly
- Re-render handling

**Edge Cases (3 tests)**
- Rendering with no props
- Stable structure across re-renders
- No unexpected elements

**Accessibility (2 tests)**
- Semantic main element
- Proper document structure

**Component Exports (2 tests)**
- Default export verification
- Valid React component

### 3. `src/components/__tests__/index.test.js` (14 tests)

Tests the barrel export file that centralizes component exports.

#### Test Categories:

**Named Exports (5 tests)**
- Navbar default export from Navbar.jsx
- Welcome named export from Welcome.jsx
- Both exports from index.js
- Function component type verification

**Export Integrity (3 tests)**
- Component references maintained through barrel export
- No unexpected exports (only Navbar and Welcome)

**Import Paths (3 tests)**
- #components alias resolution
- Barrel export imports
- Direct component imports

**Module Structure (2 tests)**
- Valid ES module structure
- No circular dependencies

**Type Safety (1 test)**
- Components usable as React components

## Running the Tests

### Install Dependencies
```bash
npm install
```

### Run Tests (Watch Mode)
```bash
npm test
```
This starts Vitest in watch mode, automatically re-running tests when files change.

### Run Tests Once
```bash
npm run test:run
```
Runs all tests once and exits (useful for CI/CD).

### Run Tests with UI
```bash
npm run test:ui
```
Opens a browser-based UI for interactive test exploration.

### Generate Coverage Report
```bash
npm run test:coverage
```
Generates a coverage report showing which lines are tested.

## Testing Strategy

### Mocking Strategy

**GSAP Mocking**
```javascript
vi.mock('gsap', () => ({
  default: {
    to: vi.fn((target, config) => {
      // Simulates animation by immediately applying final state
      // Returns mock methods (kill, pause, play)
    })
  }
}))
```

**@gsap/react Mocking**
```javascript
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((callback) => {
    const cleanup = callback()
    return cleanup
  })
}))
```

**Component Mocking (for App tests)**
```javascript
vi.mock('#components/Navbar.jsx', () => ({
  default: () => <nav data-testid="navbar">Navbar Component</nav>
}))
```

### Testing Principles

1. **User-Centric Testing**: Tests focus on behavior users experience, not implementation details
2. **Isolation**: Each test is independent and doesn't rely on others
3. **Comprehensive Coverage**: Tests cover happy paths, edge cases, and error conditions
4. **Accessibility First**: Semantic HTML and accessibility features are verified
5. **Performance Awareness**: Tests verify efficient rendering and cleanup

## Key Features Tested

### Welcome Component

**renderText Function**
- Converts strings to individual span elements
- Applies CSS classes to each span
- Converts spaces to non-breaking spaces (\u00A0)
- Sets initial font variation settings

**setupTextHover Function**
- Attaches event listeners (mousemove, mouseleave)
- Calculates distance from mouse to each letter
- Applies exponential decay formula for intensity
- Animates font weight based on intensity
- Returns cleanup function

**FONT_WEIGHTS Configuration**
```javascript
{
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 }
}
```

**Mathematical Formula**
```javascript
intensity = Math.exp(-(distance²) / (2 * 10000))
```
This creates a smooth falloff effect where letters closer to the mouse get heavier weights.

## Test Coverage Goals

- ✅ **Component Rendering**: All components render without errors
- ✅ **User Interactions**: Mouse events trigger expected behavior
- ✅ **Edge Cases**: Null values, undefined props, rapid interactions
- ✅ **Accessibility**: Semantic HTML, proper ARIA attributes
- ✅ **Performance**: Efficient rendering, proper cleanup
- ✅ **Integration**: Components work together correctly
- ✅ **Exports**: Module system works as expected

## Dependencies Added

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@vitest/ui": "^2.1.8",
    "jsdom": "^25.0.1",
    "vitest": "^2.1.8"
  }
}
```

## Continuous Integration

These tests are designed to run in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run Tests
  run: npm run test:run

- name: Generate Coverage
  run: npm run test:coverage
```

## Troubleshooting

### Common Issues

**Import errors with path aliases**
- Ensure `vitest.config.js` has the same aliases as `vite.config.js`

**GSAP-related errors**
- The mock should handle all GSAP.to calls
- Check that @gsap/react is properly mocked

**jsdom errors**
- Ensure jsdom is installed: `npm install -D jsdom`
- Verify `environment: 'jsdom'` in vitest.config.js

**Component not found errors**
- Check that mock paths match actual import paths
- Verify barrel exports in `src/components/index.js`

## Best Practices Followed

1. **Descriptive Test Names**: Each test clearly describes what it verifies
2. **AAA Pattern**: Arrange, Act, Assert structure
3. **Single Responsibility**: Each test verifies one thing
4. **Isolation**: Tests don't depend on each other
5. **Cleanup**: Resources are properly cleaned up
6. **Mocking**: External dependencies are mocked appropriately
7. **Accessibility**: Tests verify semantic HTML and ARIA attributes

## Future Enhancements

Potential areas for additional testing:
- Visual regression testing for animations
- Performance benchmarking for GSAP animations
- E2E tests with Playwright for full user flows
- Snapshot testing for component structure
- Integration tests with actual GSAP library

## Conclusion

This test suite provides robust coverage for the Welcome component, App integration, and component exports. With 74 tests covering rendering, interactions, edge cases, accessibility, and performance, you can confidently refactor and extend the codebase knowing that regressions will be caught early.

Happy Testing! 🎉