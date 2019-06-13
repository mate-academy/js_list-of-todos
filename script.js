'use strict';

const headers = ['task', 'user', 'completed'];

function createElement(content = '', tag = 'td') {
  const element = document.createElement(tag);

  typeof content === 'string' 
    ? element.textContent = content
    : element.appendChild(content);

  return element;
}

async function loadData() {
  const todosPromise = fetch('https://jsonplaceholder.typicode.com/todos');
  const usersPromise = fetch('https://jsonplaceholder.typicode.com/users');
  const [todosResponse, usersResponse] = await Promise.all([todosPromise, usersPromise]);
  const todos = await todosResponse.json();
  const users = await usersResponse.json();

  return {
    todos,
    users
  };
}

const createRow = usersMap => todo => {
  const {
    userId,
    title,
    completed,
  } = todo;
  const {
    email,
    name
  } = usersMap[userId];
  const row = createElement('', 'tr');
  const titleTd = createElement(title);
  const link = createElement(name, 'a');
  link.setAttribute('href', `mailto:${email}`);
  const userTd = createElement(link);
  const stateTd = createElement(completed ? 'Yes' : 'No');
  const status = completed ? 'done' : 'not-yet';
  stateTd.classList.add(status);

  row.append(titleTd, userTd, stateTd);

  return row;
};

function createTable({
  todos,
  users
}) {
  const usersMap = users
    .reduce((acc, user) => ({
      ...acc,
      [user.id]: user,
    }), {});

  const table = createElement('', 'table');
  const thead = createElement('', 'thead');
  const tbody = createElement('', 'tbody');
  const headRow = createElement('', 'tr');

  const heads = headers.map(title => createElement(title, 'th'));
  const rows = todos.map(createRow(usersMap));

  headRow.append(...heads);
  thead.append(headRow);
  tbody.append(...rows);
  table.append(thead, tbody);

  return table;
}

async function renderTODOs() {
  const data = await loadData();
  const table = createTable(data);

  document.body.append(table);
}

window.addEventListener('load', renderTODOs);
