# My Advanced Todo Card (Stage 1a)

Hey! 👋 This is the **Stage 1a** version of my Todo Item Card project for the HNG 14 internship. I've taken my baseline Stage 0 component and transformed it into a fully interactive and stateful experience by adding several "app-like" features using vanilla HTML, CSS, and JS.

## 🚀 Key Changes: From Stage 0 to Stage 1a

The jump from Stage 0 to Stage 1a was all about moving from a static "display" card to a dynamic "interactive" card. Here are the specific upgrades I implemented:

### 1. Fully Functional Editing Mode
*   **What was in Stage 0**: Just an "Edit" button that didn't do anything (or just alerted/logged).
*   **What's in Stage 1a**: Clicking "Edit" now toggles an inline **Edit Form** (`data-testid="test-todo-edit-form"`). You can live-edit the Title, Description, Priority, and Due Date. I also added **Save** and **Cancel** buttons to commit or discard those changes.

### 2. Advanced Status & Synchronization
*   **What was in Stage 0**: A simple checkbox and a "Pending/Done" label.
*   **What's in Stage 1a**: I added a **Status Dropdown** (`test-todo-status-control`) with three states: *Pending*, *In Progress*, and *Done*. I also wrote custom JS to keep the checkbox and dropdown perfectly in sync—toggling one updates the other instantly.

### 3. Smart "Time Management" Engine
*   **What was in Stage 0**: Hardcoded due date and a basic "Due in X days" string.
*   **What's in Stage 1a**:
    *   **Granular Strings**: The timer now calculates specific relative time (e.g., "Due in 3 hours" or "Overdue by 1 day").
    *   **Live Updates**: The timer refreshes every 30 seconds automatically.
    *   **Overdue Indicator**: A dedicated visual badge (`data-testid="test-todo-overdue-indicator"`) pops up and turns the text red if the task passes its deadline.
    *   **Completed State**: Once a task is "Done," the timer stops and displays a clean "Completed" message.

### 4. Collapsible Context
*   **What was in Stage 0**: The description was always visible, regardless of length.
*   **What's in Stage 1a**: I added a **Collapsible Container** (`test-todo-collapsible-section`). If the description is long, it auto-collapses and shows a "Show more" button (`test-todo-expand-toggle`) to keep the layout tidy.

### 5. Visual Hierarchy & Priority
*   **What was in Stage 0**: Just a priority text label.
*   **What's in Stage 1a**: Added a **Priority Indicator Dot** (`test-todo-priority-indicator`) that changes color (Green/Amber/Red) to give instant visual feedback on task urgency. I also added the "is-done" styling, which strikes through the title and mutes the card's colors.

## 🎨 Design Decisions

*   **Modern Aesthetics**: I stuck with a "Glassmorphism" light feel and the **Outfit** Google Font to give it a premium, modern look.
*   **Micro-interactions**: I added subtle transitions for cards when they are marked as done or deleted to make the app feel "alive."
*   **Responsive Flow**: I redesigned the layout to handle mobile stacking, ensuring the edit form and tags wrap perfectly on small screens (down to 320px).

## ♿ Accessibility Notes

Accessibility was a high priority for 1a:
*   **ARIA Labels**: All icon-only buttons have clear `aria-label` tags.
*   **Aria-Live**: The timer uses `aria-live="polite"` so screen readers can announce time updates without being intrusive.
*   **Focus Management**: Focus is intelligently trapped during editing and returned to the edit button once you're done.
*   **Keyboard Ready**: Every single interactive element is reachable and usable via the Tab key.

## ⚠️ Known Limitations

*   **No Long-term Persistence**: Since this is a vanilla frontend task, there’s no backend or `localStorage`. Refreshing the page will reset the tasks to their default values.
*   **Static Tags**: The category tags (Work/Urgent) are currently static displays for this stage.

---
*Built with ❤️ by Favour Damian*