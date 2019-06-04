const table = document.querySelector('.todo');

function getRequest(url) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  const parsedData = JSON.parse(xhr.responseText);

  return parsedData;
}

const todos = getRequest('https://jsonplaceholder.typicode.com/todos');
const users = getRequest('https://jsonplaceholder.typicode.com/users');

function createRows(todoItem, user) {
  return `
    <tr>
      <td>${todoItem.title}</td>
      <td>
        <a href="${user.email}">${user.name}</a>
      </td>
      <td>${todoItem.completed}</td>
    </tr>
  `
}

for (let i = 0; i < todos.length; i++) {
  for (let b = 0; b < users.length; b++) {
    if (todos[i].userId === users[b].id) {
      let row = createRows(todos[i], users[b]);
      table.insertAdjacentHTML('beforeend', row);
    }
  }
}
