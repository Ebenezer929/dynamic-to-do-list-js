document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Load tasks from Local Storage when page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            createTaskElement(taskText, false); // 'false' indicates not to save to Local Storage
        });
    }

    // Function to create a task element (separated from addTask for reusability)
    function createTaskElement(taskText, saveToStorage = true) {
        // Create a new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';
        
        // Add click event to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(li);
            updateLocalStorage(); // Update Local Storage after removal
        };
        
        // Append the remove button to the list item
        li.appendChild(removeButton);
        
        // Add the new task to the task list
        taskList.appendChild(li);

        if (saveToStorage) {
            updateLocalStorage();
        }
    }

    // Function to update Local Storage with current tasks
    function updateLocalStorage() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskElement => {
            // Get only the text content (excluding the remove button text)
            tasks.push(taskElement.childNodes[0].textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Main function to add a new task
    function addTask() {
        // Get and trim the task text from the input field
        const taskText = taskInput.value.trim();
        
        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        // Create and add the task element
        createTaskElement(taskText);
        
        // Clear the input field
        taskInput.value = "";
    }
    
    // Event listener for the Add Task button
    addButton.addEventListener('click', addTask);
    
    // Event listener for the Enter key in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
