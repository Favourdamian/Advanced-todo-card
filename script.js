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
        const statusControl = card.querySelector('[data-testid="test-todo-status-control"]');
        const timeRemaining = card.querySelector('[data-testid="test-todo-time-remaining"]');
        const editBtn = card.querySelector('[data-testid="test-todo-edit-button"]');
        const deleteBtn = card.querySelector('[data-testid="test-todo-delete-button"]');
        const dueDateElement = card.querySelector('[data-testid="test-todo-due-date"]');
        
        const priorityBadge = card.querySelector('[data-testid="test-todo-priority"]');
        const priorityText = priorityBadge ? priorityBadge.querySelector('.priority-text') : null;
        
        const titleElement = card.querySelector('[data-testid="test-todo-title"]');
        const descElement = card.querySelector('[data-testid="test-todo-description"]');
        const collapsibleSection = card.querySelector('[data-testid="test-todo-collapsible-section"]');
        const expandToggle = card.querySelector('[data-testid="test-todo-expand-toggle"]');
        const overdueIndicator = card.querySelector('[data-testid="test-todo-overdue-indicator"]');
        
        const editForm = card.querySelector('[data-testid="test-todo-edit-form"]');
        const editTitleInput = card.querySelector('[data-testid="test-todo-edit-title-input"]');
        const editDescInput = card.querySelector('[data-testid="test-todo-edit-description-input"]');
        const editPrioritySelect = card.querySelector('[data-testid="test-todo-edit-priority-select"]');
        const editDateInput = card.querySelector('[data-testid="test-todo-edit-due-date-input"]');
        const cancelBtn = card.querySelector('[data-testid="test-todo-cancel-button"]');

        let DUE_DATE = new Date(dueDateElement.getAttribute('datetime'));
        let timeInterval;

        function updateTimeRemaining() {
            if ((statusControl && statusControl.value === "Done") || (completeToggle && completeToggle.checked)) {
                timeRemaining.textContent = "Completed";
                timeRemaining.classList.remove('is-overdue');
                if (overdueIndicator) overdueIndicator.hidden = true;
                return;
            }

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
                if (overdueIndicator) overdueIndicator.hidden = false;
                return;
            }

            timeRemaining.classList.remove('is-overdue');
            if (overdueIndicator) overdueIndicator.hidden = true;
            
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

        function setStatus(status) {
            if (!statusControl || !completeToggle) return;
            statusControl.value = status;
            if (status === "Done") {
                card.classList.add('is-done');
                completeToggle.checked = true;
            } else {
                card.classList.remove('is-done');
                completeToggle.checked = false;
            }
            updateTimeRemaining();
        }

        if (completeToggle) {
            completeToggle.addEventListener('change', (e) => {
                setStatus(e.target.checked ? "Done" : "Pending");
            });
        }

        if (statusControl) {
            statusControl.addEventListener('change', (e) => {
                setStatus(e.target.value);
            });
        }

        if (editBtn) {
            editBtn.addEventListener('click', () => {
                card.classList.add('is-editing');
                if (editForm) editForm.hidden = false;
                editTitleInput.value = titleElement.textContent.trim();
                editDescInput.value = descElement.textContent.trim();
                
                let currentPriority = "Medium";
                if (priorityBadge.classList.contains('priority-high')) currentPriority = "High";
                if (priorityBadge.classList.contains('priority-low')) currentPriority = "Low";
                editPrioritySelect.value = currentPriority;
                
                const localIso = new Date(DUE_DATE.getTime() - DUE_DATE.getTimezoneOffset() * 60000).toISOString().slice(0,16);
                editDateInput.value = localIso;
                
                editTitleInput.focus();
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                card.classList.remove('is-editing');
                if (editForm) editForm.hidden = true;
                editBtn.focus();
            });
        }

        if (editForm) {
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                titleElement.textContent = editTitleInput.value.trim();
                descElement.textContent = editDescInput.value.trim();
                
                if (priorityBadge) {
                    priorityBadge.classList.remove('priority-low', 'priority-medium', 'priority-high');
                    priorityBadge.classList.add(`priority-${editPrioritySelect.value.toLowerCase()}`);
                    if (priorityText) priorityText.textContent = editPrioritySelect.value;
                }
                
                DUE_DATE = new Date(editDateInput.value);
                dueDateElement.setAttribute('datetime', DUE_DATE.toISOString());
                dueDateElement.textContent = `Due ${DUE_DATE.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
                
                card.classList.remove('is-editing');
                if (editForm) editForm.hidden = true;
                checkDescriptionLength();
                updateTimeRemaining();
                editBtn.focus();
            });
        }

        function checkDescriptionLength() {
            if (!descElement || !collapsibleSection || !expandToggle) return;
            if (descElement.textContent.trim().length > 100) {
                collapsibleSection.classList.add('collapsed');
                expandToggle.hidden = false;
                expandToggle.textContent = "Show more";
                expandToggle.setAttribute('aria-expanded', 'false');
            } else {
                collapsibleSection.classList.remove('collapsed');
                expandToggle.hidden = true;
            }
        }

        if (expandToggle) {
            expandToggle.addEventListener('click', () => {
                const isExpanded = expandToggle.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    collapsibleSection.classList.add('collapsed');
                    expandToggle.setAttribute('aria-expanded', 'false');
                    expandToggle.textContent = "Show more";
                } else {
                    collapsibleSection.classList.remove('collapsed');
                    expandToggle.setAttribute('aria-expanded', 'true');
                    expandToggle.textContent = "Show less";
                }
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                const confirmed = confirm("Are you sure you want to delete this task?");
                if (confirmed) {
                    card.classList.add('is-deleting');
                    clearInterval(timeInterval);
                    setTimeout(() => {
                        card.remove();
                    }, 300);
                }
            });
        }

        checkDescriptionLength();
        updateTimeRemaining();
        timeInterval = setInterval(updateTimeRemaining, 30000);
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
        
        const newStatusControl = newCard.querySelector('[data-testid="test-todo-status-control"]');
        if (newStatusControl) newStatusControl.value = "In Progress";
        
        const newDesc = newCard.querySelector('[data-testid="test-todo-description"]');
        if (newDesc) newDesc.textContent = description || "No description provided.";
        
        const newPriority = newCard.querySelector('[data-testid="test-todo-priority"]');
        if (newPriority) {
            newPriority.classList.remove('priority-low', 'priority-medium', 'priority-high');
            newPriority.classList.add('priority-medium');
            const newPriText = newPriority.querySelector('.priority-text');
            if (newPriText) newPriText.textContent = "Medium";
        }
        
        const timeElement = newCard.querySelector('.todo-due-date');
        timeElement.setAttribute('datetime', dueDate.toISOString());
        timeElement.textContent = `Due ${dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
        
        // Ensure unique IDs for checkbox, labels, edit forms, and collapsibles
        const uniqueId = 'todo-' + Date.now();
        
        const checkbox = newCard.querySelector('.todo-checkbox');
        const label = newCard.querySelector('.todo-label');
        checkbox.id = 'check-' + uniqueId;
        label.setAttribute('for', 'check-' + uniqueId);

        const editFields = ['edit-title', 'edit-description', 'edit-priority', 'edit-due-date'];
        editFields.forEach(idPrefix => {
            // Need to select by class or data-testid, otherwise selecting by id on clone gets the old id
            const el = newCard.querySelector(`[id^="${idPrefix}"]`);
            const lbl = newCard.querySelector(`label[for^="${idPrefix}"]`);
            if (el && lbl) {
                const newId = `${idPrefix}-${uniqueId}`;
                el.id = newId;
                lbl.setAttribute('for', newId);
            }
        });

        const collapsible = newCard.querySelector('.todo-collapsible');
        const expandBtn = newCard.querySelector('.expand-toggle');
        if (collapsible && expandBtn) {
            const colId = `desc-${uniqueId}`;
            collapsible.id = colId;
            expandBtn.setAttribute('aria-controls', colId);
        }

        todoList.appendChild(newCard);
        setupCard(newCard);
        
        // Reset form
        todoForm.reset();
        newTodoInput.focus();
    });
});