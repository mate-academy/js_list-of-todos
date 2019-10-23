'use strict';
const tableBody = document.getElementsByTagName('tbody')[0];

async function gettingInfo(url)  {
  return fetch(url).then(response => response.json());
}

async function creatingTable() {
  const toDoList = await gettingInfo('https://jsonplaceholder.typicode.com/todos');
  const usersList = await gettingInfo('https://jsonplaceholder.typicode.com/users');
  
  for (const key of toDoList) {
    const tableRow = document.createElement('tr');
    const userEmail = usersList.find(user => user.id === key.userId).email;
    tableRow.innerHTML = `<td>${key.title}</td>
                    <td><a href = "mailto:${userEmail}">${userEmail}</a></td>
                    <td>${key.completed}</td>`;
    tableBody.append(tableRow);
  }
}

creatingTable();