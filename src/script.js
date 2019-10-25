'use strict';
const table = document.querySelector('.table');

async function formTable() {
  const items = await fetch('https://jsonplaceholder.typicode.com/todos')
  .then(responce => responce.json());

  const users = await fetch('https://jsonplaceholder.typicode.com/users')
  .then(responce => responce.json());

  items.forEach(item => {
    const user = users.find((user) => user.id === item.userId);
    const tr = formTableRow(item, user);
    table.insertAdjacentHTML('beforeend', tr);
  });
}

function formTableRow(item, user) {
  return `
    <tr>
      <td>${item.title}</td>
      <td><a href="mailto:${user.email}">${user.name}</a></td>
      <td>${item.completed}</td>
    </tr>
  `;
}

formTable();
