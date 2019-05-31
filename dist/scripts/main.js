'use strict';

function createToDoList(tasks, people) {
  const listHeaders = {
    title: 'Task',
    name: 'Assigned for...',
    email: '',
    completed: 'Completed',
  };
  const tasksToDo = document.createElement('table');
  const listCaption = document.createElement('caption');
  listCaption.textContent = 'To Do list:';
  tasksToDo.appendChild(listCaption);
  const listBody = document.createElement('tbody');
  const listHeader = document.createElement('thead');
  let listRow;
  let listCell;

  listRow = listHeader.insertRow();
  for (const header in listHeaders) {
    if (listHeaders[header] !== '') {
      listCell = document.createElement('th');
      listCell.setAttribute('scope', 'col');
      listCell.textContent = listHeaders[header];
      // listCell.classList.add('');
      listRow.appendChild(listCell);
    }
  }
  tasksToDo.appendChild(listHeader);

  tasks.forEach((task) => {
    const checkBox = document.createElement('input');
    const { userId, title, completed } = task;
    const { name, email } = people.find(person => {
      const { id } = person;
      return id === userId;
    });

    listRow = listBody.insertRow();
    listCell = listRow.insertCell();
    listCell.textContent = title;
    listCell = listRow.insertCell();
    listCell.innerHTML = `<a href="mailto:${email}">${name}</a>`;
    listCell = listRow.insertCell();
    checkBox.type = 'checkbox';
    checkBox.checked = completed;
    listCell.appendChild(checkBox);

    listBody.appendChild(listRow);
  });
  tasksToDo.appendChild(listBody);
  return tasksToDo;
};

function main() {
  let tasksToDo;
  let users;

  const requestToDoList = new XMLHttpRequest();
  requestToDoList.open('GET', 'https://jsonplaceholder.typicode.com/todos');
  requestToDoList.responseType = 'json';
  requestToDoList.send();

  requestToDoList.addEventListener('loadend', () => {
    const requestUsers = new XMLHttpRequest();

    if (requestToDoList.status !== 200) {
      alert(
        `Cann't request tasks list!\nError ${requestToDoList
          .status}: ${requestToDoList.statusText}`);
    } else {
      tasksToDo = requestToDoList.response;
    }

    requestUsers.open('GET', 'https://jsonplaceholder.typicode.com/users');
    requestUsers.responseType = 'json';
    requestUsers.send();
    requestUsers.addEventListener('loadend', () => {
      if (requestUsers.status !== 200) {
        alert(
          `Cann't request users list!\nError ${requestUsers
            .status}: ${requestUsers.statusText}`
        );
      } else {
        users = requestUsers.response;
        if (tasksToDo && users) {
          document.body.appendChild(createToDoList(tasksToDo, users));
        }
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', main);

console.log('Thank you, mate academy!');
