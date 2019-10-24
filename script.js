function table() {
  const table = document.querySelector('.table');
  table.innerHTML = `
  <table class="ui red table">
    <thead>
      <th>TODO item</th>
      <th>The name of the user</th>
      <th>Completed</th>
    </thead>
    <tbody id='tableBody'></tbody>
  </table>
  `;

  const creator = async function(url) {
    let response = await fetch(url);
    return response.json();
  }

  const list = async function () {
    const todoList = await creator(`https://jsonplaceholder.typicode.com/todos`);
    const usersList = await creator(`https://jsonplaceholder.typicode.com/users`);
    const tbody = document.getElementById('tableBody');

    for (let todo of todoList) {
      const tdTodo = document.createElement('td');
      const tdComplete = document.createElement('td');
      const rows = document.createElement('tr');

      tdTodo.textContent = todo.title;
      tdComplete.textContent = todo.completed;

      if (todo.completed) {
        tdComplete.className = 'positive';
        tdComplete.innerHTML = `<i class="icon checkmark"></i> true`;
      } else {
        tdComplete.className = 'negative';
        tdComplete.innerHTML = `<i class="icon close"></i> false`;
      }

      for (let user of usersList) {
        if (user.id === todo.userId) {
          const tdName = document.createElement('td');

          todo.userId = user;
          tdName.textContent = todo.userId.email;
          rows.append(tdTodo, tdName, tdComplete);
          tbody.appendChild(rows);
        }
      }
    }
  }
  list();
}
table();
