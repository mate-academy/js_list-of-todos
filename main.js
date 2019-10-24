const urlTODOs = 'https://jsonplaceholder.typicode.com/todos';
const urlUsers = 'https://jsonplaceholder.typicode.com/users';

const render = (item) => {
  const tableBody = document.getElementById('todo-items');
  const row = document.createElement('tr');

  const TODOitem = document.createElement('td');
  TODOitem.classList.add('TODOitem');
  TODOitem.textContent = item.title;
  row.append(TODOitem);

  const user = document.createElement('td');
  user.classList.add('userName');
  const userEmailRef = document.createElement('a');
  userEmailRef.textContent = item.user.name;
  userEmailRef.setAttribute('href', `mailto:${item.user.email}`);
  user.append(userEmailRef);
  row.append(user);

  const status = document.createElement('td');
  status.classList.add('item-status');
  status.textContent = item.completed ? 'Completed' : 'In progress';
  row.append(status);

  tableBody.append(row);
};


const getList = async () => {
  return fetch(urlTODOs)
    .then(response => response.json());
};

const getUsers = async () => {
  return fetch(urlUsers)
    .then(response => response.json());
};

const getData = async () => {
  const [users, items] = await Promise.all([getUsers(), getList()]);
  // const usersPromise = getUsers();
  // const listPromise = getList();
  // const users = await usersPromise;
  // const list = await listPromise;

  console.log(users);
  console.log(items);

  const hash = {};
  users.forEach(user => {
    hash[user.id] = user;
  });

  items.forEach(item => {
    item.user = hash[item.userId];
  });

  items.forEach(render);
};
getData();

