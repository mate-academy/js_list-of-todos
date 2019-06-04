const table = document.querySelector('#table');
const items = createTodoSList('https://jsonplaceholder.typicode.com/todos');
const users = createTodoSList('https://jsonplaceholder.typicode.com/users');

function createTodoSList(url) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();

  const parseData = JSON.parse(xhr.responseText);

  return parseData;
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

items.forEach(item => {
  const user = users.find((user) => user.id === item.userId);
  const tr = createTemplate(item, user);
  table.insertAdjacentHTML('beforeend', tr);
});