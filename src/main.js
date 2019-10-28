'use strict'

const getData = (url) => {
  return fetch(url)
    .then(response => response.json());
};

const data = async () => {
  const [todos, users] = await
    Promise.all(
     [getData(`https://jsonplaceholder.typicode.com/todos`),
      getData(`https://jsonplaceholder.typicode.com/users`)
    ]);

  const tbody = document.getElementsByClassName('tbody')[0];
  const keys = Object.keys(todos);

  keys.map(item => {
    const trow = document.createElement('tr');
    const value = todos[item];
    const findUser = users.find(user => user.id === value.userId);
    const userEmail = findUser.email;
    const userName= findUser.name;
    const completeness = value.completed ? 'completed' : 'failed';

    trow.className = value.completed ? 'positive' : 'negative';

    trow.innerHTML = `
      <td>${value.title}</td>
      <td><a href = 'mailto:${userEmail}'>${userName}</a></td>
      <td>${completeness}</td>
    `;
    tbody.append(trow);
  });
};

data();
