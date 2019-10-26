let table = document.querySelector('#table');

async function getData(url) {
  return await fetch(url)
    .then(response => response.json());
}

Promise.all([getData('https://jsonplaceholder.typicode.com/users'),
  getData('https://jsonplaceholder.typicode.com/todos')])
  .then(([users, todos]) => {
    todos.forEach(task => {
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

