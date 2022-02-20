'use strict';

const descriptionTask = document.querySelector('#description-task'),
      addTaskBtn = document.querySelector('#add-task-btn'),
      todosWrapper = document.querySelector('.todos-wrapper');
let tasks;
let todoItemElement = [];

if (!localStorage.tasks) {
    tasks = [];
} else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">
                ${task.description}
            </div>
            <div class="buttons">
                <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
            </div>
        </div>
    `;
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTask = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTask];
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = '';
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((task, index) => {
            todosWrapper.innerHTML += createTemplate(task, index); 
        });
        todoItemElement = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();

const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElement[index].classList.add('checked');
    } else {
        todoItemElement[index].classList.remove('checked');
    }
    updateLocalStorage();
    fillHtmlList();
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(descriptionTask.value));
    
    updateLocalStorage();
    fillHtmlList();
    descriptionTask.value = '';
});

const deleteTask = (index) => {
    todoItemElement[index].classList.add('delition')
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocalStorage();
        fillHtmlList();
    }, 1000);
}

