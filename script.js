const baseUrl = 'https://jsonplaceholder.typicode.com';

const getResponse = async (url) => {
  const response = await fetch(url);

  return response.json();
}

const createTable = async () => {
  const tableHeaders = ['Todo item', 'User email', 'Is completed'];
  const todos = await getResponse(`${baseUrl}/todos`);
  const users = await getResponse(`${baseUrl}/users`);

  const table = document.createElement('table');
  table.className = 'ui center aligned celled table';
  const tHead = document.createElement('thead');
  const tBody = document.createElement('tbody');

  const headerRow = document.createElement('tr');

  for (const header of tableHeaders) {
    const th = document.createElement('th');
    th.textContent = header;
    th.classList.add('td');
    headerRow.appendChild(th);
  }

  tHead.appendChild(headerRow);

  let user = {};
  for (const todo of todos) {
    const tableRow = document.createElement('tr');
    const todoItem = document.createElement('td');
    const userContainer = document.createElement('td');
    const isCompleted = document.createElement('td');
    const userLink = document.createElement('a');

    if (todo.userId !== user.id) {
      user = users.find(user => user.id === todo.userId);
    }
    
    todoItem.textContent = todo.title;
    isCompleted.textContent = todo.completed;
    userLink.textContent = user.name;
    userLink.href = `mailto:${user.email}`;

    isCompleted.className = todo.completed ? 'positive' : 'negative';

    userContainer.appendChild(userLink);
    tableRow.append(todoItem, userContainer, isCompleted);

    tBody.appendChild(tableRow);
  }

  table.appendChild(tHead);
  table.appendChild(tBody);

  document.body.appendChild(table);
}

createTable();