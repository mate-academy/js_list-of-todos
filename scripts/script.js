'use strict';
const tableBody = document.getElementsByTagName('tbody')[0];

function gettingInfo(url)  {
  return fetch(url).then(response => response.json());
}

async function creatingTable() {
  const toDoList = await gettingInfo('https://jsonplaceholder.typicode.com/todos');
  const usersList = await gettingInfo('https://jsonplaceholder.typicode.com/users');

  for (const key of toDoList) {
    const tableRow = document.createElement('tr');
    const userEmail = usersList.find(user => user.id === key.userId).email;
    const taskProgress = key.completed ? 'green checkmark icon' : 'window close icon red';
    
    tableRow.innerHTML = `<td>${key.title}</td>
                          <td><a href = "mailto:${userEmail}">${userEmail}</a></td>
                          <td><i class="${taskProgress}"></i>${key.completed}</td>`;
    
    tableBody.append(tableRow);
  }
}

creatingTable();
