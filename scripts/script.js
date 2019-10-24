'use strict';
const tableBody = document.getElementById('tableBody');

function gettingInfo(url)  {
  return fetch(url).then(response => response.json());
}

async function creatingTable() {
  const toDoList = await gettingInfo('https://jsonplaceholder.typicode.com/todos');
  const usersList = await gettingInfo('https://jsonplaceholder.typicode.com/users');

  for (const key of toDoList) {
    const tableRow = document.createElement('tr');
    const userEmail = usersList.find(user => user.id === key.userId).email;
    const userName = usersList.find(user => user.id === key.userId).name;
    const taskProgress = key.completed ? 'green checkmark icon' : 'window close icon red';
    
    tableRow.innerHTML = `<td>${key.title}</td>
                          <td><a href = "mailto:${userEmail}">${userName}</a></td>
                          <td><i class="${taskProgress}"></i>${key.completed}</td>`;
    
    tableBody.append(tableRow);
  }
}

creatingTable();
