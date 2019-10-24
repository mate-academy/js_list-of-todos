'use strict';

function getData(url) {
    return fetch(url)
        .then(response => response.json());
}

Promise.all(
    [
        getData('https://jsonplaceholder.typicode.com/todos'),
        getData('https://jsonplaceholder.typicode.com/users')
    ]
).then(list => createList(list));

const createList = (list) => {
    const table = document.querySelector('#tbody');

    return table.innerHTML = `
      ${list[0].map(item => `
        <tr>
          <td>${item.title}</td>
          <td>
            <a href="mailto:${list[1][item.userId - 1].email}">${list[1][item.userId -1].name}</a>
          </td>
          <td class="${item.completed ? "completed" : "in-progress"}">
            ${item.completed ? "Completed" : "In Progress"}
          </td>
        </tr>
      `).join('')}
  `
};


