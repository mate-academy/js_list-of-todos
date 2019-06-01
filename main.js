'use strict';
const table = document.querySelector('table');
const tbody = document.createElement('tbody');
table.appendChild(tbody);
const errorInfo = document.querySelector('div#errorinfo');

function getUser(users, userId) {
  return users.find((user)=> {
    return user.id === userId;
  });
}

function fillTable() {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://jsonplaceholder.typicode.com/users', false);
  request.send();
  if (request.status !== 200) {
    errorInfo.textContent = `Error get user table: ${request.status}`;
    return;
  }
  const users = JSON.parse(request.responseText);

  request.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);
  request.send();
  if (request.status !== 200) {
    errorInfo.textContent = `Error get TODOs table: ${request.status}`;
    return;
  }
  const todos = JSON.parse(request.responseText);
  let user;
  let a;
  todos.forEach((todo) => {
    const row = document.createElement('tr');

    let cell = document.createElement('td');
    cell.textContent = todo.title;
    row.appendChild(cell);

    cell = document.createElement('td');
    user = getUser(users, todo.userId);
    if (user) {
      a = document.createElement('a');
      a.textContent = user.name;
      a.setAttribute('href', `mailto:${user.email}`);
      cell.appendChild(a);
    } else {
      cell.textContent = todo.userId;
    }
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.textContent = todo.completed;
    row.appendChild(cell);

    tbody.appendChild(row);
  });
}
fillTable();

// "userId": 1,
//     "id": 1,
//     "title": "delectus aut autem",
//     "completed": false

// "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
//     "email": "Sincere@april.biz",
//     "address": {
//       "street": "Kulas Light",
//       "suite": "Apt. 556",
//       "city": "Gwenborough",
//       "zipcode": "92998-3874",
//       "geo": {
//         "lat": "-37.3159",
//         "lng": "81.1496"
