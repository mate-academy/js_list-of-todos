'use strict'; 

const tableBody = document.getElementById('table-body'); 

async function getData(url) {
  const response = await fetch(url); 

  return response.json(); 
}

async function test() {
  let firstPart = await getData('https://jsonplaceholder.typicode.com/todos'); 
  let secondPart = await getData('https://jsonplaceholder.typicode.com/users'); 
  
  for (let i = 0; i < firstPart.length; i++) {
    let tr = document.createElement('tr'); 
    let line = ''; 
    line += `<td>${firstPart[i].title}</>`; 
    let currentIdObj = secondPart.find((person) => firstPart[i].userId === person.id);
    line += `<td>${currentIdObj.email}</td>`; 
    line += `<td>${firstPart[i].completed}</td>`;
    tr.innerHTML = line;
    tableBody.append(tr);
  }
}

test(); 