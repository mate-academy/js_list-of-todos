'use script';

const getData = function (url) {
  return fetch(url).then(response => response.json());
}

const renderTable = async function() {
  const userList = await getData('https://jsonplaceholder.typicode.com/users');
  const toDoList = await getData('https://jsonplaceholder.typicode.com/todos');

  const tbody = document.querySelector('#toDoTable');
  for(toDo of toDoList) {
    const tableRow = document.createElement('tr');
    const user = userList.find(user => user.id === toDo.userId);

    tableRow.innerHTML = `<td>${toDo.completed ? '<i class="big check circle outline icon"></i>' : '<i class="big circle outline icon"></i>'}</td>
    <td>${toDo.title}</td>
    <td><a href="mailto:${user.email}" alt="Send email to ${user.username}">${user.username}</a></td>`

    tbody.append(tableRow);
  }
}; renderTable();