# Frontend Task Manager (Todo Item Card)

A testable, responsive Todo Item Card application designed with a premium light-blue aesthetic.

## How to Run Locally

Since this is a vanilla HTML/CSS/JS application with no build steps, running it locally is incredibly simple:

1. Clone the repository or download the files.
2. Open `index.html` directly in your web browser (Chrome, Firefox, Safari, Edge).
3. Alternatively, you can use a local server like VS Code's "Live Server" extension for a better development experience (hot-reloading).

## Decisions Made

- **Vanilla Technology Stack**: Chosen HTML5, CSS3, and regular JavaScript without a framework like React or Vue. This keeps the project lightweight, eliminates dependencies, and makes the application blazing fast.
- **Light Blue Aesthetic**: Implemented a modern design with clean, flat colors and smooth corners to create a premium feel while utilizing a straightforward, semantic CSS structure.
- **Accessibility & Testing Best Practices**:
  - `data-testid` attributes are utilized on crucial layout elements to allow for E2E automated frameworks (like Cypress or Playwright) to hook into the UI effortlessly.
  - Form validation with `required` tags and basic semantic HTML ensures functional usability.
- **Time Remaining Calculation**: Using a `setInterval` loop to check the due date against the current time every minute to update the "remaining time" counter dynamically without freezing the main thread.

## Any Trade-offs

- **Framework Agnostic vs State Management**: By using Vanilla JS, DOM manipulation and state management (like adding, editing, or deleting a todo) are tightly coupled. In a larger application with many interconnected components, this would become difficult to maintain, making a framework like React or Svelte heavily preferred.
- **Data Persistence**: Currently, todos are dynamically appended to the DOM for immediate user feedback. However, since a database or `localStorage` implementation isn't actively persisting them, refreshing the browser clears newly added tasks. Persistence was omitted to focus purely on the core frontend UI requirements of the isolated card state.
- **CSS Variable Consolidation**: For the sake of making the CSS very approachable, explicit, and easy to maintain by developers of all skill levels, advanced layout mechanisms (like deep element masking) and heavy CSS variables were traded for hard-coded hex colors and simpler layouts. This is less scalable for a massive design system but vastly easier to edit without breaking side-effects.
