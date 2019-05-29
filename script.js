const table = document.querySelector('#table');

const first = fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json());

const second = fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json());

Promise.all([first, second])
  .then(([users, todos]) => {
    todos.forEach(task => {
      const row = document.createElement('tr');

      row.insertCell(0).innerHTML = task.title;

      const user = users[task.userId - 1];
      const userNameUrl = document.createElement('a');
      userNameUrl.innerHTML = user.name;
      userNameUrl.setAttribute('href', user.email);
      row.insertCell(1).append(userNameUrl);

      row.insertCell(2).innerHTML = task.completed;

      table.append(row);
    });
  })
