'use strict'; 

const tableBody = document.getElementById('table-body'); 

async function getData(url) {
  const response = await fetch(url); 

  return response.json(); 
}

async function createTable() {
  const firstPart = await getData('https://jsonplaceholder.typicode.com/todos'); 
  const secondPart = await getData('https://jsonplaceholder.typicode.com/users'); 
  
  for (let i = 0; i < firstPart.length; i++) {
    let currentUser = firstPart[i];
    firstPart.forEach((todos) => {
      let user = secondPart.find((user) => todos.userId === user.id)
      currentUser['user'] = user; 
    })
    console.log(currentUser); 
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