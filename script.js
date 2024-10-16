document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');
    const allTasksBtn = document.getElementById('all-tasks-btn');
    const completedTasksBtn = document.getElementById('completed-tasks-btn');
    const pendingTasksBtn = document.getElementById('pending-tasks-btn');
    const clearAllBtn = document.getElementById('clear-all-btn');
  
    let tasks = [];
  
    // Add a new task
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value;
      if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
      }
    });
  
    // Render tasks to the DOM
    function renderTasks(filter = 'all') {
      taskList.innerHTML = '';
  
      tasks
        .filter(task => {
          if (filter === 'all') return true;
          if (filter === 'completed') return task.completed;
          if (filter === 'pending') return !task.completed;
        })
        .forEach((task, index) => {
          const taskItem = document.createElement('li');
          taskItem.className = task.completed ? 'completed' : '';
          taskItem.innerHTML = `
            ${task.text}
            <button onclick="toggleComplete(${index})">✔️</button>
            <button onclick="deleteTask(${index})">❌</button>
          `;
          taskList.appendChild(taskItem);
        });
    }
  
    // Toggle task completion
    window.toggleComplete = (index) => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    };
  
    // Delete a task
    window.deleteTask = (index) => {
      tasks.splice(index, 1);
      renderTasks();
    };
  
    // Filter tasks
    allTasksBtn.addEventListener('click', () => renderTasks('all'));
    completedTasksBtn.addEventListener('click', () => renderTasks('completed'));
    pendingTasksBtn.addEventListener('click', () => renderTasks('pending'));
  
    // Clear all tasks
    clearAllBtn.addEventListener('click', () => {
      tasks = [];
      renderTasks();
    });
  });
  