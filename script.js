document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const todoForm = document.getElementById('add-todo-form');
    const newTodoInput = document.getElementById('new-todo-title');
    const newTodoDate = document.getElementById('new-todo-date');
    const newTodoDescription = document.getElementById('new-todo-description');

    // --- Card Setup Logic ---
    function setupCard(card) {
        const completeToggle = card.querySelector('[data-testid="test-todo-complete-toggle"]');
        const statusLabel = card.querySelector('[data-testid="test-todo-status"]');
        const timeRemaining = card.querySelector('[data-testid="test-todo-time-remaining"]');
        const editBtn = card.querySelector('[data-testid="test-todo-edit-button"]');
        const deleteBtn = card.querySelector('[data-testid="test-todo-delete-button"]');
        const dueDateElement = card.querySelector('[data-testid="test-todo-due-date"]');

        const DUE_DATE = new Date(dueDateElement.getAttribute('datetime'));

        function updateTimeRemaining() {
            const now = new Date();
            const diff = DUE_DATE - now;
            
            if (diff <= 0) {
                if (Math.abs(diff) < 60000) {
                    timeRemaining.textContent = "Due now!";
                } else {
                    const hoursPast = Math.floor(Math.abs(diff) / (1000 * 60 * 60));
                    if (hoursPast < 1) {
                        timeRemaining.textContent = `Overdue by ${Math.floor(Math.abs(diff) / (1000 * 60))} minutes`;
                    } else if (hoursPast < 24) {
                        timeRemaining.textContent = `Overdue by ${hoursPast} hour${hoursPast > 1 ? 's' : ''}`;
                    } else {
                        const daysPast = Math.floor(hoursPast / 24);
                        timeRemaining.textContent = `Overdue by ${daysPast} day${daysPast > 1 ? 's' : ''}`;
                    }
                }
                timeRemaining.classList.add('is-overdue');
                return;
            }

            timeRemaining.classList.remove('is-overdue');
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (days > 1) {
                timeRemaining.textContent = `Due in ${days} days`;
            } else if (days === 1) {
                timeRemaining.textContent = "Due tomorrow";
            } else if (hours >= 1) {
                timeRemaining.textContent = `Due in ${hours} hour${hours > 1 ? 's' : ''}`;
            } else if (minutes >= 1) {
                timeRemaining.textContent = `Due in ${minutes} minute${minutes > 1 ? 's' : ''}`;
            } else {
                timeRemaining.textContent = "Due now!";
            }
        }

        completeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                card.classList.add('is-done');
                statusLabel.textContent = "Done";
            } else {
                card.classList.remove('is-done');
                statusLabel.textContent = "In Progress";
            }
        });

        editBtn.addEventListener('click', () => {
            const currentTitle = card.querySelector('.todo-title').textContent;
            const newTitle = prompt("Edit task title:", currentTitle);
            if (newTitle) {
                card.querySelector('.todo-title').textContent = newTitle;
            }
        });

        deleteBtn.addEventListener('click', () => {
            const confirmed = confirm("Are you sure you want to delete this task?");
            if (confirmed) {
                card.classList.add('is-deleting');
                setTimeout(() => {
                    card.remove();
                }, 300);
            }
        });

        updateTimeRemaining();
        setInterval(updateTimeRemaining, 60000);
    }

    // --- Initialize existing cards ---
    document.querySelectorAll('.todo-card').forEach(setupCard);

    // --- Add New Task ---
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = newTodoInput.value.trim();
        const dueDateValue = newTodoDate.value;
        const description = newTodoDescription.value.trim();

        if (!title || !dueDateValue) {
            alert("Please fill in both the title and the due date.");
            return;
        }

        const dueDate = new Date(dueDateValue);

        // Clone the first card as a template
        const template = document.querySelector('.todo-card');
        if (!template) {
            console.error("Template card not found!");
            return;
        }

        const newCard = template.cloneNode(true);
        newCard.classList.remove('is-done', 'is-deleting');
        
        // Reset values
        newCard.querySelector('[data-testid="test-todo-title"]').textContent = title;
        newCard.querySelector('[data-testid="test-todo-complete-toggle"]').checked = false;
        newCard.querySelector('[data-testid="test-todo-status"]').textContent = "In Progress";
        newCard.querySelector('[data-testid="test-todo-description"]').textContent = description || "No description provided.";
        
        const timeElement = newCard.querySelector('.todo-due-date');
        timeElement.setAttribute('datetime', dueDate.toISOString());
        timeElement.textContent = `Due ${dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
        
        // Ensure unique IDs for checkbox and labels
        const uniqueId = 'todo-' + Date.now();
        const checkbox = newCard.querySelector('.todo-checkbox');
        const label = newCard.querySelector('.todo-label');
        checkbox.id = uniqueId;
        label.setAttribute('for', uniqueId);

        todoList.appendChild(newCard);
        setupCard(newCard);
        
        // Reset form
        todoForm.reset();
        newTodoInput.focus();
    });
});
