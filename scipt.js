'use strict';

let todos;
let users;

async function getISON(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

let urlTodo = 'https://jsonplaceholder.typicode.com/todos';
let urlUsers = 'https://jsonplaceholder.typicode.com/users';

async function getData() {
  todos = await getISON(urlTodo);
  users = await getISON(urlUsers);
}
function Fun () {
  let tbody = document.querySelector('#body-of-tale');
  for (let i = 0; i < todos.length; i++) {
    const tr = document.createElement('tr');
    const tdItem = document.createElement('td');
    tdItem.innerText = todos[i].title;
    const tdUser = document.createElement('td');
    let userObject;
    userObject = users.find(user => user.id === todos[i].userId);
    let userLink = document.createElement('a');
    userLink.innerText = userObject.name;
    userLink.href = `mailto:${userObject.email}`;
    tdUser.append(userLink);
    let tdIsCompleted = document.createElement('td');
    tdIsCompleted.innerText = todos[i].completed;
    tdIsCompleted.classList.add(`${(tdIsCompleted.innerText === 'true' ? 'completed' : 'uncompleted')}`);
    tr.append(tdItem,tdUser,tdIsCompleted);
    tbody.append(tr);
  }
}
getData().then(Fun);


