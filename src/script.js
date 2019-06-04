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
    const titleList = ['Title', 'Author', 'State'];
    const thead = table.appendChild(document.createElement('thead'));
    const todoTitle = thead.appendChild(document.createElement('tr'));
    titleList.forEach((titleName)=>{
      const titleItem = todoTitle.appendChild(document.createElement('th'));
      titleItem.innerHTML = titleName;
    })
      data.forEach((todoItem)=>{
          const todoList = document.createElement('tr');
          const todoTitle = document.createElement('td');
          table.appendChild(todoList);
          todoList.appendChild(todoTitle);
          todoList.classList.add(`id-${todoItem.userId}`);
          todoTitle.innerHTML = todoItem.title;
          const todoState = todoList.appendChild(document.createElement('td'));
          todoState.innerHTML = todoItem.completed ? 'complete' : 'working';
          todoState.classList.add(`${todoState.innerHTML}`);
      })
      const container = document.querySelector('#container');
      container.appendChild(table); 
}

function createAuthor(data) {
  data.forEach((author)=>{
    const authorId = document.querySelectorAll(`.id-${author.id}`);
    authorId.forEach((elem)=>{
      const todoAuthor = document.createElement('td');
      elem.insertBefore(todoAuthor, elem.lastElementChild);
      todoAuthor.innerHTML = `<a href=${author.email}>${author.name}</a>`;
    })
  })
}