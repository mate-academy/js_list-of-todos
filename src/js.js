const urlTodos = 'https://jsonplaceholder.typicode.com/todos';
const urlUsers = 'https://jsonplaceholder.typicode.com/users';

function fetchData (url) {
  return fetch(url)
  .then(response => response.json());
}

async function getData() {
  const todos = await fetchData(urlTodos);
  const users = await fetchData(urlUsers)
  const tbody = document.querySelector('.tbody');

  todos.forEach(element => {
    const row = document.createElement('tr');
    const currentUser = users.find(user => user.id === element.userId);

    row.innerHTML = `<td>${element.title}</td>
                      <td>
                      <a href="mailto:${currentUser}">
                        ${currentUser.name}
                      </a>
                      </td>
                      <td>${element.completed}</td>`;

    tbody.append(row);
  });
}

getData();