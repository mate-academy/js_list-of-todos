'use strict'; 

const container = document.querySelector('tbody'); 

async function getData(url) {
  const response = await fetch(url); 
  
  return response.json(); 
}

async function generateTable() {
  const todoList = await getData('https://jsonplaceholder.typicode.com/todos'); 
  const usersList = await getData('https://jsonplaceholder.typicode.com/users'); 

  for (let item of todoList) {
    let title;
    let email;
    let name;
    let checker;

    for (let user of usersList) {
      if (item.userId === user.id) {
        title = `${item.title}`;
        email = `${user.email}`;
        name = `${user.name}`;
        checker = item.completed;
        break;
      }
    }

    function generateItem() {
      let tr = document.createElement('tr');
      let link = document.createElement('a');
      let td = document.createElement('td');
      td.textContent = title;
      tr.append(td);
      td = document.createElement('td');
      link.setAttribute(`href`, `mailto:${email}`)
      link.textContent = name;
      td.append(link);
      tr.append(td);
      td = document.createElement('td');
      td.textContent = checker;
      checker ? td.classList.add('correct') : td.classList.add('incorrect')
      tr.append(td);
      container.append(tr);
    }

    generateItem()

  }

    
}

generateTable();