'use strict'

const connection = (url) => {
  return fetch(url)
    .then(response => response.json());
};

const data = async () => {
  const todos = await connection('https://jsonplaceholder.typicode.com/todos');
  const users = await connection('https://jsonplaceholder.typicode.com/users');

  const tbody = document.getElementsByClassName('tbody')[0];
  const keys = Object.keys(todos);

  keys.map(item => {
    const trow = document.createElement('tr');
    const value = todos[item];
    const tbody = document.getElementsByClassName('tbody')[0];
    const usersEmail = users.find(user => user.id === value.userId).email;
    const userName= users.find(user => user.id === value.userId).name;
    const completeness = value.completed ? 'completed' : 'failed';

    trow.className = value.completed ? 'positive' : 'negative';

    trow.innerHTML = `<td>${value.title}</td>
                     <td><a href = 'mailto:${usersEmail}'>${userName}</a></td>
                     <td>${completeness}</td>`;
    tbody.append(trow);
  });
};

data();
