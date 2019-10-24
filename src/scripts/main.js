'use strict';

async function getData(url) {
    return await fetch(url)
        .then(response => response.json());
}

async function createToDoList () {
    const table = document.querySelector('#tbody');
    const toDoList = [await getData('https://jsonplaceholder.typicode.com/todos'),
    await getData('https://jsonplaceholder.typicode.com/users')];

    return table.innerHTML = `
      ${toDoList[0].map(item => `
        <tr>
          <td>${item.title}</td>
          <td>
            <a href="mailto:${toDoList[1][item.userId - 1].email}">${toDoList[1][item.userId -1].name}</a>
          </td>
          <td class="${item.completed === true ? "completed" : "in-progress"}">
            ${item.completed === true ? "Completed" : "In Progress"}
          </td>
        </tr>
      `).join('')}
  `
}

createToDoList();
