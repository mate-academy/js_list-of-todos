'use strict';

document.addEventListener('DOMContentLoaded', function () {
  function getUrl(url) {
    return fetch(url)
      .then(response => response.json());
  }
  Promise.all(
    [getUrl('https://jsonplaceholder.typicode.com/todos'),
      getUrl('https://jsonplaceholder.typicode.com/users')]
   ).then(data => todoItems(data));


   const todoItems = (data) => {
    console.log(data);
    const toDoList = data[0];
    const userNames = data[1];
    const container = document.querySelector('.container');
    const titleName = ['TODO', 'User name', 'Status'];
    

   return container.innerHTML = `
      <table class="table">
        <thead>
          <tr>${titleName.map(item => `<td>${item}</td>`).join('')}</tr>
        </thead>
        <tbody>
          ${toDoList.map(item =>`<tr>
                                    <td>${item.title}</td>
                                    <td><a href=${userNames[item.userId - 1].email}>${userNames[item.userId - 1].name}</a></td>
                                    <td>${item.completed}</td>
                                </tr>`).join('')}
        </tbody>
      </table>
    `
  }
  
})

