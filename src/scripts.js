'use strict';

window.addEventListener('load', () => {

  function getData(url) {
    const xhr = new XMLHttpRequest;
    xhr.open('GET', url, false);
    xhr.send();
    return JSON.parse(xhr.responseText);
  }

  const toDos = getData('https://jsonplaceholder.typicode.com/todos');
  const users = getData('https://jsonplaceholder.typicode.com/users');



  function render(toDosList, usersList) {
    const table = document.getElementById('table');

    for ( let task of toDosList) {
      const row = document.createElement('tr');
      row.insertCell(0).innerText = task.title;
      
      const user = usersList[task.userId - 1];
      const link = document.createElement('a');
      link.innerText = user.name;
      link.setAttribute('href', 'mailto:email@address.com')
      row.insertCell(1).append(link);
      row.insertCell(2).innerText = task.completed;
      table.append(row);
    }
  }
  render(toDos, users);
});
