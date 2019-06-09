'use strict';

function loadData(url) {
    const xhr  = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onload = function() {
      const data = JSON.parse(xhr.responseText);
      createTable(data);
    }
}

function getData(url) {
  return fetch(url)
    .then(data => data.json())
}

Promise.all(
  [getData('https://jsonplaceholder.typicode.com/todos'),
  getData('https://jsonplaceholder.typicode.com/users')])
  .then(data => {
    createTable(data[0]);
    addAuthor(data[1]);
  })
    
function createTable(data) {
  const table = document.createElement('table');
  data.forEach((item) => {
    const itemRow = document.createElement('tr');
    const itemTitle = document.createElement('td');
    table.appendChild(itemRow);
    itemRow.appendChild(itemTitle);
    itemRow.classList.add(`data-${item.userId}`);
    itemTitle.innerHTML = item.title;
    const itemCompleted = itemRow.appendChild(document.createElement('td'));
    itemCompleted.innerHTML = item.completed;
  })
  const container = document.querySelector('#container');
  container.appendChild(table);
}

function addAuthor(data) {
  data.forEach((author) => {
    const authors = document.querySelectorAll(`.data-${author.id}`);
    authors.forEach((item) => {
      const itemAuthor = document.createElement('td');
      item.insertBefore(itemAuthor, item.lastElementChild);
      itemAuthor.innerHTML = `<a href=${author.email}>${author.name}</a>`;
    })
  })
}