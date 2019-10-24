'use strict';

const container = document.querySelector('.tbody');
const data = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/todos'
];

function createPromise(url) {
  return fetch(url).then(resp => resp.json());
}

function getAllData(urls) {
  return Promise.all(urls.map(url => createPromise(url)));
}

function init() {
  getAllData(data).then((responses) => parseData(responses));
}

function parseData(dataArrs) {
  const [users, todos] = dataArrs;
  createTodos(users, todos);
}

document.addEventListener('DOMContentLoaded', init)

function getUserName(users, id) {
  return users.find(obj => obj.id === id);
}

function createTodos(users, todos) {
  for (let i = 0; i < todos.length; i++) {
    const user = getUserName(users, todos[i]['userId']);
    container.insertAdjacentHTML('beforeend', `
    <tr class="wrap">
      <td>${todos[i]['title']}</td>
      <td><a href="mailto:${user.email}">${user.name}</a></td>
      <td>${todos[i]['completed']}</td>
    </tr>
    `)
  }
}
