'use strict';

const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';

function fetchData(url) {
  return fetch(url)
    .then(response => response.json());
}

async function getData() {
  const users = await fetchData(usersUrl)
  const todos = await fetchData(todosUrl);
  const tbody = document.querySelector('.tbody');

  todos.forEach(item => {
    const row = document.createElement('tr');
    const currentUser = users.find(user => user.id === item.userId);

    row.innerHTML = `<td>${item.title}</td>
                     <td>
                      <a href="mailto:${currentUser}">
                        ${currentUser.name}
                      </a>
                     </td>
                     <td>${item.completed}</td>`;

    tbody.append(row);
  });
}

getData();