const table = document.querySelector('.table');
table.innerHTML = `
    <thead>
      <th>TODO item</th>
      <th>User name</th>
      <th>Completed</th>
    </thead>
  `
const tableBody = document.createElement('tbody');
tableBody.classList.add('tableBody');

const askToServ = async function(url) {
  return fetch(url)
    .then(responce => responce.json());
}

const getData = async function() {
  return await Promise.all([askToServ(`https://jsonplaceholder.typicode.com/todos`), askToServ(`https://jsonplaceholder.typicode.com/users`)]);
}

const render = async function() {
  const [toDoList, usersList] = await getData();
  const userEmailMap = new Map();
  const userNameMap = new Map();

  for (let user of usersList) {
    userEmailMap.set(user.id, user.email);
    userNameMap.set(user.id, user.name);
  }

  for (let toDo of toDoList) {
    const row = document.createElement('tr');    
    const columnToDo = document.createElement('td');    
    const columnComplete = document.createElement('td');
    const columnName = document.createElement('td');  

    columnToDo.textContent = toDo.title;     
    columnComplete.textContent = toDo.completed;
    columnName.innerHTML = `<a href="mailto:${userEmailMap.get(toDo.userId)}">${userNameMap.get(toDo.userId)}</a>`;
    row.append(columnToDo, columnName, columnComplete);
    tableBody.appendChild(row);       
  }         
}
render();
table.appendChild(tableBody);    
