const table = document.querySelector('.todos');

function loadApi(url) {
  return fetch(url)
    .then(responce => responce.json())
    .then(data => data)
}
  
function loadItems() {
  Promise.all([
    loadApi('https://jsonplaceholder.typicode.com/todos'),
    loadApi('https://jsonplaceholder.typicode.com/users'),
  ])
  .then(([items, users]) => {
    return render(items, users);
  })
}
  
loadItems();

function createTemplate(item, user) {
  return `
    <tr>
      <td>${item.title}</td>
      <td><a href="mailto:${user.email}">${user.name}</a></td>
      <td>${item.completed}</td>
    </tr>
  `;
}

function render(items, users) {
  items.forEach(item => {
    const owner = users.find((user) => user.id === item.userId);
    const tr = createTemplate(item, owner);
    table.insertAdjacentHTML('beforeend', tr);
  });
}
