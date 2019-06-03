'use strict';

function getURL(url) {
 return fetch(url)
    .then(response => response.json())
};

Promise.all(
  [getURL('https://jsonplaceholder.typicode.com/todos'),
    getURL('https://jsonplaceholder.typicode.com/users')]
).then(data=>{
  createTable(data[0]);
  createAuthor(data[1])
})

function createTable(data) {
    const table = document.createElement('table');
    const titleTable = ['Title', 'Author', 'State'];
    const thead = table.appendChild(document.createElement('thead'));
    const tr = thead.appendChild(document.createElement('tr'));
    titleTable.forEach((titleName)=>{
      const th = tr.appendChild(document.createElement('th'));
      th.innerHTML = titleName;
    })
      data.forEach((todoItem)=>{
          const tr = document.createElement('tr');
          const td = document.createElement('td');
          table.appendChild(tr);
          tr.appendChild(td);
          tr.classList.add(`id-${todoItem.userId}`);
          td.innerHTML = todoItem.title;
          const td1 = tr.appendChild(document.createElement('td'));
          td1.innerHTML = todoItem.completed ? 'complete' : 'working';
          td1.classList.add(`${td1.innerHTML}`);
      })
      const container = document.querySelector('#container');
      container.appendChild(table); 
}

function createAuthor(data) {
  data.forEach((author)=>{
    const id = document.querySelectorAll(`.id-${author.id}`);
    id.forEach((elem)=>{
      const td = document.createElement('td');
      elem.insertBefore(td, elem.lastElementChild);
      td.innerHTML = `<a href=${author.email}>${author.name}</a>`;
    })
  })
}