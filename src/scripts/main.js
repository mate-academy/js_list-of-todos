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
  const [todos, users] = [list[0], list[1]];

  return table.innerHTML = `
    ${todos.map(item => `
      <tr>
        <td>${item.title}</td>
         <td>
           <a href="mailto:${users[item.userId - 1].email}">${users[item.userId -1].name}</a>
         </td>
         <td class="${item.completed ? "completed" : "in-progress"}">
           ${item.completed ? "Completed" : "In Progress"}
         </td>
       </tr>
     `).join('')}
 `
};


