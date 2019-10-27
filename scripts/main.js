'use strict';
const url = 'https://jsonplaceholder.typicode.com/';
const tableBody = document.getElementById('table_body');

function getInfo(URL) {
  return fetch(URL).then(responce => responce.json());
}

async function createTable() {
  const [toDos, users] = await Promise.all([
    getInfo(`${url}todos`),
    getInfo(`${url}users`)
    ]);

  for (const todo of toDos) {
    const row = document.createElement('tr');
    const email = users.find(user => user.id === todo.userId).email;
    const name = users.find(user => user.id === todo.userId).name;
    let className = todo.completed ? 'positive' : 'negative';

    row.innerHTML = `<td>${todo.title}</td>
                     <td><a href="mailto:${email}">${name}</a></td>
                     <td class="${className}">${todo.completed}</td>`;

    tableBody.append(row);
  }
}

createTable();
