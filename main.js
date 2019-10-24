const apis = [
  'https://jsonplaceholder.typicode.com/todos',
  'https://jsonplaceholder.typicode.com/users',
]

function createPromise(url) {
  return fetch(url).then(resp => resp.json())
}

function getAllData(apis) {
  return Promise.all(apis.map(url => createPromise(url)))
}

function init() {
  getAllData(apis).then((responses) => render(responses))
}

function render(dataArrs) {
  const [todos, users] = dataArrs;
  let tbodyEl = document.getElementById('todos');

  todos.forEach(todo => {
    let user = users.find(user => user.id === todo.userId);
    let todoEl = document.createElement('tr');
    todoEl.innerHTML = `
      <td>${ todo.title }</td>
      <td><a href="mailto:${ user.email }">${ user.name }</a></td>
      <td>${ todo.completed }</td>
    `;

    tbodyEl.appendChild(todoEl);
  });

}

document.addEventListener('DOMContentLoaded', init);
