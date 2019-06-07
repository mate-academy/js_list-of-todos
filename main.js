'use strict';

const container = document.getElementById('container');
const urlTODO = 'https://jsonplaceholder.typicode.com/todos';
const urlUsers = 'https://jsonplaceholder.typicode.com/users';
let todos = null;
let users = null;
  	 
  const xhrTODO = new XMLHttpRequest();
  xhrTODO.open('GET', urlTODO, true);
	xhrTODO.responseType = 'json';
	xhrTODO.addEventListener('load', ()=>{
    todos = xhrTODO.response;
   
      if( todos !== null && users !== null) {
        render();
      }
	  });

  xhrTODO.send();

  const xhrUsers = new XMLHttpRequest();
  xhrUsers.open('GET', urlUsers, true);
  xhrUsers.responseType = 'json';
  xhrUsers.addEventListener('load', ()=>{
    users = xhrUsers.response;

      if( todos !== null && users !== null) {
        render();
      }
    });

  xhrUsers.send();
     	   
  function render() {
    const headerCells = ['title', 'name', 'status'];
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tRows = document.createElement('tr');
    const tBody = document.createElement('tbody');
    headerCells.forEach((el) => {

      const th = document.createElement('th');
      th.innerHTML = `${el}`
      tRows.append(th);
    });

    container.append(table);
    thead.append(tRows);
    table.append(thead, tBody);
    todos.forEach((el) => {

      const tr = document.createElement('tr');
      tr.className = `user_id_${el.userId}`;
      const user = getUser(el.userId);
      const td = document.createElement('td');    
      tBody.append(tr);
      tr.insertAdjacentHTML('beforeend', `
        <td>${el.title}</td>
        <td><a href="mailto:${user.email}">${user.name}</a></td>
        <td>${el.completed ? 'completed'  : 'active'}</td>
      `);
      tr.lastElementChild.className = `${tr.lastElementChild.innerHTML}`;
    });
  }

function getUser(userId) {
  for (const user of users) {
    if (userId === user.id) return user;
    };
};


