'use strict';
const table = document.querySelector('table');
const tbody = document.createElement('tbody');
table.appendChild(tbody);
const errorInfo = document.querySelector('#errorinfo');
const serverUrl = ' https://jsonplaceholder.typicode.com/';

const state = {
  users: null,
  todos: null,
  todoList: null,
  loading: false

}

function isLoaded() {
  return state.todoList !== null;
}

function isReceived() {
  return state.todos && state.users;
}

function sendRequest(url, handler) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', handler(request));
  request.send();
}

const requestTodosHandler = request => () => {
  const parseTodos = JSON.parse(request.responseText);
  state.todos = parseTodos;
  checkData();
}

const requestUsersHandler = request => () => {
  const parseUsers = JSON.parse(request.responseText);
  state.users = parseUsers;
  checkData();
}

function checkData() {
  if (!isReceived()) return;
  const todosListMap = state.todos.map(todo => ({...todo,
    user: state.users.find(user => user.id === todo.userId)})
  );
  state.todoList = todosListMap;
  state.loading = false;
  fillTable();
}

function loadData() {
  state.loading = true;
  state.todoList = null;
  sendRequest(`${serverUrl}todos`, requestTodosHandler);
  sendRequest(`${serverUrl}users`, requestUsersHandler);
}

function fillTable() {
  state.todoList.forEach((todo) => {
    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = todo.title;
    row.appendChild(titleCell);

    const userCell = document.createElement('td');
    if (todo.user) {
      const userLink = document.createElement('a');
      userLink.textContent = todo.user.name;
      userLink.setAttribute('href', `mailto:${todo.user.email}`);
      userCell.appendChild(userLink);
    } else {
      userCell.textContent = todo.userId;
    }
    row.appendChild(userCell);

    const completedCell = document.createElement('td');
    completedCell.textContent = todo.completed;
    row.appendChild(completedCell);

    tbody.appendChild(row);
    table.classList.remove('hidden');
  });
}

loadData();
