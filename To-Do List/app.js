const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');

// main function to load all the event listeners
loadEventListeners();

function loadEventListeners() {

    //fetching tasks even after pageload
    document.addEventListener('DOMContentLoaded', getTasks);

    //for adding task
    form.addEventListener('submit', addTask);

    //for removing task
    taskList.addEventListener('click', removeTask);

    //clearing all tasks
    clearBtn.addEventListener('click', clearTasks);

    //filters the tasks 
    filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        const li = document.createElement('li');
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);
    })
}

function addTask(e) {
    if(taskInput.value === '')
    {
        alert("add a task");
    }

    const li = document.createElement('li');
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);

    storeTasksInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

function storeTasksInLocalStorage(task) {
          let tasks;
          if(localStorage.getItem('tasks') === null) {
              tasks = [];
          } 
          else {
              tasks = JSON.parse(localStorage.getItem('tasks')); // for fetching json 
          }

          tasks.push(task);

          localStorage.setItem('tasks', JSON.stringify(tasks)); // for converting javascript value to json
} 

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove(); 
            removeTasksFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTasksFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task, index) {
        if(taskItem.textContent == task) {
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function clearTasks() {
   
    while(taskList.firstChild) {
        taskList.firstChild.remove();
    }
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
          const text = e.target.value.toLowerCase();

          document.querySelectorAll('.collection-item').forEach(function(task) {
              const item = task.firstChild.textContent;
              if(item.toLowerCase().indexOf(text) != -1){
                  task.style.display = 'block';
              }
              else {
                  task.style.display = 'none';
              }
          });
}

