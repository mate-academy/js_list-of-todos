const BASE_URL = 'https://jsonplaceholder.typicode.com';
const TODOS = 'todos';
const USERS = 'users';

let listOfTodos = [];

const getAll = (url) => {
    return fetch(`${BASE_URL}/${url}`)
        .then(response => response.json())
};

const getItem = (url, id) => {
    return fetch(`${BASE_URL}/${url}/${id}`)
        .then(response => response.json())
};

const init = async () => {
  const todos = await getAll(TODOS);
  const users = await getAll(USERS);

  for (let i = 0; i < todos.length; i++) {
      const obj = todos[i];
      listOfTodos[i] = {};
      for (let j = 0; j < users.length; j++) {
          if (users[j].id === todos[i].userId) {
              listOfTodos[i].name = users[j].name;
          }
      }
      listOfTodos[i].title = obj.title;
      listOfTodos[i].completed = obj.completed;
  }

  console.log(listOfTodos);
};

init();

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}
function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (let key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}
let table = document.querySelector("table");
let data = Object.keys(listOfTodos[0]);
generateTableHead(table, data);
generateTable(table, listOfTodos);
