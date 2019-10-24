'use strict';

function getUrl(url) {
  return fetch(url)
      .then(response => response.json());
}

Promise.all(
    [
      getUrl('https://jsonplaceholder.typicode.com/todos'),
      getUrl('https://jsonplaceholder.typicode.com/users')
    ]
).then(data => todoItems(data));

const todoItems = (data => {
  const todoList = data[0];
  const userNames = data[1];
  const table = document.querySelector('#tbody');

  return table.innerHTML = `
      ${todoList.map(item => `
        <tr>
          <td>${item.title}</td>
          <td>
            <a href="mailto:${userNames[item.userId - 1].email}">${userNames[item.userId -1].name}</a>
          </td>
          <td class="${item.completed ? 'positive' : 'negative'}">
            ${item.completed ? "Completed" : "In Progress"}
          </td>
        </tr>
      `).join('')}
  `
});
