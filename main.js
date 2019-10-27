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
const todosUrl = `https://jsonplaceholder.typicode.com/todos`;
const usersUrl = `https://jsonplaceholder.typicode.com/users`;

const getDataByUrl = async function(url) {
  return fetch(url)
    .then(responce => responce.json());
}

const getData = async function() {
  return await Promise.all([getDataByUrl(todosUrl), getDataByUrl(usersUrl)]);
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
    row.classList.add('tableRows')    
    const columnToDo = document.createElement('td');   
    columnToDo.classList.add('td'); 
    const columnComplete = document.createElement('td');
    columnComplete.classList.add('td');
    const columnName = document.createElement('td');  
    columnName.classList.add('td');

    columnToDo.textContent = toDo.title;     
    columnComplete.textContent = toDo.completed;
    columnName.innerHTML = `<a href="mailto:${userEmailMap.get(toDo.userId)}">${userNameMap.get(toDo.userId)}</a>`;
    row.append(columnToDo, columnName, columnComplete);
    tableBody.appendChild(row);       
  }         
}
render();
table.appendChild(tableBody);    
