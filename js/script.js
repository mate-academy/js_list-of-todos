'use strict';

const table = document.querySelector('#table');
const todoS = loadUrl('https://jsonplaceholder.typicode.com/todos');
const users = loadUrl('https://jsonplaceholder.typicode.com/users');

function loadUrl(url) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();

  return JSON.parse(xhr.responseText);
}

function createTemplate(item, user) {
  return `
      <tr>
          <td>${item.title}</td>
          <td><a href="mailto:${user.email}">${user.name}</a></td>
          <td>${item.completed}</td>
      </tr>
  `;
}

todoS.forEach(item => {
  const user = users.find((user) => user.id === item.userId);
  const tr = createTemplate(item, user);
  table.insertAdjacentHTML('beforeend', tr);
});
