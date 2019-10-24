'use strict'; 

const tableBody = document.getElementById('table-body'); 

async function getData(url) {
  const response = await fetch(url); 

  return response.json(); 
}

async function createTable() {
  const todoList = await getData('https://jsonplaceholder.typicode.com/todos'); 
  const usersList = await getData('https://jsonplaceholder.typicode.com/users'); 

  for (let i = 0; i < todoList.length; i++) {
    let currentUser = todoList[i];
    todoList.forEach((todos) => {
      let user = usersList.find((user) => todos.userId === user.id)
      currentUser['user'] = user; 
    })
    const tr = document.createElement('tr'); 
    let line = ''; 
    line += `<td>${currentUser.title}</>`; 
    line += `<td>${currentUser.user.email}</td>`; 
    line += `<td>${currentUser.completed}</td>`;
    tr.innerHTML = line;
    tableBody.append(tr);
  }
}

createTable(); 