'use strict';

const tableContainer = document.createElement('div');
tableContainer.className = 'table-container';
document.querySelector('body').append(tableContainer);

const table = document.createElement('table');
tableContainer.append(table);
table.className = 'todo-list-table';

const thead = document.createElement('thead');
const tbody = document.createElement('tbody');
table.append(thead, tbody);

const theadItems = ['To Do Item', 'Name', 'Status'];

for(let i = 0; i < theadItems.length; i++){
  const theadItem = document.createElement('th');
  theadItem.textContent = theadItems[i];
  thead.append(theadItem);
}

function setNameCell(user, usersInfoArray) {
  const cellName = document.createElement('td');
  const userName = usersInfoArray.find(person => person.id === user.userId).name;
  const emailAdd = usersInfoArray.find(person => person.id === user.userId).email;
  cellName.innerHTML = `<a href=mailto: ${emailAdd}>${userName}</a>`;

  return cellName;
}

function setTodoItemCell(user) {
  const cellTitle = document.createElement('td');
  cellTitle.textContent = user.title;

  return cellTitle;
}

function setStatusCell(user) {
  const cellStatus = document.createElement('td');
  cellStatus.textContent = user.completed ? 'done' : 'not-yet';
  cellStatus.dataset.status = user.completed ? 'done' : 'not-yet';

  return cellStatus;
}

(async () => {
  let response = await fetch('https://jsonplaceholder.typicode.com/todos');
  let todoList = await response.json();

  let response2 = await fetch('https://jsonplaceholder.typicode.com/users');
  let usersInfo = await response2.json();


  for (const user of todoList) {
    const tr = document.createElement('tr');

    const cellItem = setTodoItemCell(user);
    const cellName = setNameCell(user, usersInfo);
    const cellStatus = setStatusCell(user);

    tr.append(cellItem, cellName, cellStatus);

    tbody.append(tr);
  }

})();
