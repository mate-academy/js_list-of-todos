'use strict';

function load(url, f) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onload = function() {
    const data = JSON.parse(xhr.responseText);
   f(data);    
}
}

function createTable(data) {
    const table = document.createElement('table');
    const title = ['Title', 'Author', 'State'];
    const thead = table.appendChild(document.createElement('thead'));
    const tr = thead.appendChild(document.createElement('tr'));
    title.forEach((item)=>{
      const th = tr.appendChild(document.createElement('th'));
      th.innerHTML = item;
    })
      data.forEach((item)=> {
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          table.appendChild(tr);
          tr.appendChild(td);
          tr.classList.add(`id-${item.userId}`);
          td.innerHTML = item.title;
          const td1 = tr.appendChild(document.createElement('td'));
          td1.innerHTML = item.completed ? 'complete' : 'working';
          td1.classList.add(`${td1.innerHTML}`);
      })
      const container = document.querySelector('#container');
      container.appendChild(table); 
}

function createAuthor(data) {
  data.forEach((author)=> {
    const id = document.querySelectorAll(`.id-${author.id}`);
    id.forEach((elem)=> {
      const td = document.createElement('td');
      elem.insertBefore(td, elem.lastElementChild);
      td.innerHTML = `<a href=${author.email}>${author.name}</a>`;
    })
  })
}

load('https://jsonplaceholder.typicode.com/todos', createTable);
load('https://jsonplaceholder.typicode.com/users', createAuthor);