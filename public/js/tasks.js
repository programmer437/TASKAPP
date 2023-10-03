const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const newTaskInput = document.getElementById('new-task');
const logoutButton = document.getElementById('logout');
const body=document.querySelector("body")

// Add an event listener to the Logout button
logoutButton.addEventListener('click', () => {
    // Perform a logout action (clear cookies, etc.) and then redirect to the login page
    window.location.href = 'login.html';
});

// Function to fetch and display tasks
const displayTasks = async () => {
    try {
        const response = await axios.get('/api/v1/tasks');
        

        if (response.status === 201) {
            const tasks = response.data.tasks;

            // Clear the task list
            taskList.innerHTML = '';

            // Display tasks
            tasks.forEach((task) => {
                const taskItem = document.createElement('div');
                taskItem.textContent = task.name;
                taskList.appendChild(taskItem);
            });
            
        }
        
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Handle 401 error
            errors(401);
        } else {
            console.error('Failed to fetch tasks.', error);
        }
    }
};
const errors = (errorCode) => {
    if (errorCode === 401) {
        // Create an h1 element
        const h1Element = document.createElement('h1');
        h1Element.textContent = 'You have been logged out';

        // Clear the body content and append the h1 element
        body.innerHTML = '';
        body.appendChild(h1Element);
    }
};
// Initial task list display

// Add an event listener to the task form for adding new tasks
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newTask = newTaskInput.value;

    try {
        const response = await axios.post('/api/v1/tasks', { name: newTask });
        console.log(response.status)

        if (response.status === 201) {
            // Clear the input field and update the task list
            newTaskInput.value = '';
            displayTasks();
        }else{
            body.innerHTML=""
            errors(response.status);
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Handle 401 error
            errors(401);
        } else {
            console.error('Failed to fetch tasks.', error);
        }
    }
});


displayTasks();

