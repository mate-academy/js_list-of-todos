'use strict';

const headers = ['Id', 'Task', 'Responsible', 'Status'];
let listOfTasks;
let listOfUsers; 

getXMLHttpRequest('https://jsonplaceholder.typicode.com/todos', (response) => {
  listOfTasks = response;
  getXMLHttpRequest('https://jsonplaceholder.typicode.com/users', (response) => {
    listOfUsers = response;
    renderTable();
  });
});

function getXMLHttpRequest(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', () => {
    callback(xhr.response);
  })
}

function getData(task, header) {
  const user = listOfUsers.find(user => user.id === task.userId);

  switch(header.toLowerCase()) {
    case 'id':
      return task.id;
    case 'task':
      return task.title;
    case 'responsible':
      const link = document.createElement('a');
      link.setAttribute('href', `mailto:${user.email}`);
      link.innerHTML = user.name;
      return link.outerHTML;
    case 'status': 
      if(task.completed) {
        return 'Done';
      }
      return 'In proccess';
  }
}

function createCells(headers, type, data) {
  const tr = document.createElement('tr');
  const cells = headers.map((cell, index) => {
    const td = document.createElement(type);
    if(type === 'th'){
      td.textContent = headers[index];
    } else {
      td.innerHTML = getData(data, headers[index]);
    }
    return td;
  })

  tr.append(...cells);
  return tr;
}


function renderTable() {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  thead.append(createCells(headers, 'th'));
  listOfTasks.forEach(task => {
    tbody.append(createCells(headers, 'td', task));
  })
  table.append(thead, tbody);
  document.querySelector('body').append(table);
}