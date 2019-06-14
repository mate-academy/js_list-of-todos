'use strict'

const table = document.querySelector('.todo');

function getDate(url) {
  return fetch(url)
    .then(response => response.json())
}

Promise.all(
  [getDate('https://jsonplaceholder.typicode.com/todos'), 
   getDate('https://jsonplaceholder.typicode.com/users')],
).then(([todos, users]) => {
    todos.forEach(todo => {
     const row = createRows(todo, users.find(user => user.id === todo.userId));
     table.insertAdjacentHTML('beforeend', row);
    })
});

function createRows(todoItem, user) {
  return `
    <tr>
      <td>${todoItem.title}</td>
      <td>
        <a href="${user.email}">${user.name}</a>
      </td>
      <td>${todoItem.completed}</td>
    </tr>
  `
};
