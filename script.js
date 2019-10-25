let urlTodo = 'https://jsonplaceholder.typicode.com/todos';
let urlUsers = 'https://jsonplaceholder.typicode.com/users';
let table = document.querySelector('#table');
let users = fetch(urlUsers)
  .then(response => response.json());
let todo = fetch(urlTodo)
  .then(response => response.json());
Promise.all([users, todo])
  .then(([users, todo]) => {
    todo.forEach(task => {
      let tr = document.createElement('tr');
      tr.insertCell(0).innerHTML = task.title;
      let user = users[task.userId];
      let userNameUrl = document.createElement('a');
      userNameUrl.innerHTML = user.name;
      userNameUrl.setAttribute('href', user.email);
      tr.insertCell(1).append(userNameUrl);
      tr.insertCell(2).innerHTML = task.completed;
      table.append(tr);
    });
  });

