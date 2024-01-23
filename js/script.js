const addButton = document.querySelector('button');
const input = document.querySelector('input');
const ul = document.querySelector('ul');
document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(taskText => createTask(taskText));
});

addButton.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (taskText !== '') {
    createTask(taskText);
    input.value = '';
    saveTasks();
  }
});

ul.addEventListener('click', (event) => {
  const element = event.target;
  if (element.classList.contains('edit-btn')) {
    editTask(element.parentElement);
  } else if (element.classList.contains('dlt-btn')) {
    deleteTask(element.parentElement);
    saveTasks();
  }
});

function createTask(taskText) {
  const li = document.createElement('li');
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  const editSpan = document.createElement('span');
  editSpan.classList.add('material-symbols-outlined', 'edit-btn');
  editSpan.textContent = 'edit';
  const deleteSpan = document.createElement('span');
  deleteSpan.classList.add('material-symbols-outlined', 'dlt-btn');
  deleteSpan.textContent = 'delete';
  li.appendChild(taskSpan);
  li.appendChild(editSpan);
  li.appendChild(deleteSpan);
  ul.prepend(li);
}

function editTask(taskElement) {
  const newText = prompt('Edit your task:', taskElement.firstChild.textContent.trim());
  if (newText !== null) {
    taskElement.firstChild.textContent = newText;
    saveTasks();
  }
}

function deleteTask(taskElement) {
  taskElement.remove();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.todo_item li span:first-child').forEach(span => {
    const taskText = span.textContent.trim();
    tasks.push(taskText);
  });
  tasks.reverse();
  localStorage.setItem('tasks', JSON.stringify(tasks));
}