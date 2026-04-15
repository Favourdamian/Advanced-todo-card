# My Todo Item Card - HNG 14 Task

Hey! 👋 This is my Todo Item Card application that I built for the HNG 14 bootcamp. I wanted to create a responsive, highly functional task management card that looks great and is perfectly set up for testing.

## What I built

I put together this card using just semantic HTML, CSS, and some vanilla JavaScript. Here are some of the main things I focused on:

- **Semantic HTML**: I made sure the HTML is fully accessible, using optimized DOM structures and functional ARIA labels.
- **Testing Ready**: Every functional element is mapped with explicit `data-testid` tags so automated grading tests (like Cypress or Playwright) can easily find and interact with them.
- **Dynamic CSS**: The layout is built with Flexbox configurations so it smoothly transitions and comfortably snaps into any viewport scale.
- **Inline Editing**: I added features that allow you to dynamically modify task descriptions, toggle checkmarks, and swap drop-down statuses beautifully.
- **Action Buttons**: It comes with a complete UI setup for "Edit" and "Delete" actions using crisp SVG icons.

## Decisions I Made

While building this, I made a few key technical decisions to keep things efficient:

- **Vanilla Technology Stack**: I chose HTML5, CSS3, and regular JavaScript without any frameworks. This keeps the project lightweight and blazing fast.
- **Light Blue Aesthetic**: I went with a modern design using clean, flat colors and smooth corners to create a premium feel.
- **Accessibility & Testing Best Practices**: I used `data-testid` attributes on crucial elements so automated frameworks can hook into the UI effortlessly.
- **Time Remaining Calculation**: I used a `setInterval` loop to check the due date every minute and update the timer live.

## Trade-offs

Since this was a focused task, I had to make some trade-offs:

- **Vanilla JS vs State Management**: By using Vanilla JS, the code is simple but state management is tightly coupled with the DOM. For a much larger app, I'd definitely reach for a framework like React.
- **Data Persistence**: Todos aren't currently saved to `localStorage` or a database. I focused purely on the frontend UI and card state for this requirement.
- **CSS Simplicity**: I traded complex CSS variables for simpler, explicit styles to make the code as readable and easy to maintain as possible for other developers.

## How to run my code locally

It's super simple to review my work since I built it natively without any node modules, framework compilers, or package managers!

**The easiest way:**
1. Just download or clone this repository to your computer.
2. Open the `todo-item-card` folder.
3. Double-click the `index.html` file and it will open right up in your default web browser!

**If you use VS Code:**
1. Open the project folder in VS Code.
2. Make sure you have the "Live Server" extension installed.
3. Right-click on `index.html` and hit **"Open with Live Server"**. It'll open up in your browser and update live if you want to play around with the code!

---
*Built with ❤️ by Favour Damain*