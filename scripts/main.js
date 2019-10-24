'use strict'

const tbody = document.querySelector('#tbody');

async function loadData(url) {
  const response = await fetch(url);
  return response.json();
}

async function completeTable() {
  const todoList = await loadData('https://jsonplaceholder.typicode.com/todos');
  const users = await loadData('https://jsonplaceholder.typicode.com/users');
  for (let i = 0; i < todoList.length; i++) {
    const tr = document.createElement('TR');
    const currentUser = users.find(user => user.id === todoList[i].userId);
    tr.innerHTML = `
      <td class="cell">${todoList[i].title}</td>
      <td class="cell"><a href="mailto:${currentUser.email}">${currentUser.name}<a></td>
      <td class="cell">${todoList[i].completed}</td>
    `;
    tbody.append(tr);
  }
}

completeTable();
