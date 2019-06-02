'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const table = document.querySelector('.table');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    let todoColumn = xhr.response;
    todoColumn.forEach(item => {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      tr.setAttribute('class', `id-${item.userId}`);
      td.textContent = item.title;
      tr.append(td);
      table.append(tr);
    })
    const request = new XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/users');
    request.responseType = 'json';
    request.send();
    request.addEventListener('load', function () {
      let namesColumn = request.response;
      namesColumn.forEach(item => {
        const index = item.id;
        let rows = document.querySelectorAll(`.id-${index}`);
        rows.forEach(el => {
          if(el.getAttribute("class") === `id-${item.id}`) {
            const td = document.createElement('td');
            td.innerHTML = `<a href="${item.email}">${item.name}</a>`;
            el.append(td);
          }
        })
      
      })

      console.log(namesColumn);
    })
  });


});