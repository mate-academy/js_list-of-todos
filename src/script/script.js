const BASE_URL = 'https://jsonplaceholder.typicode.com';
const TODOS = 'todos';
const USERS = 'users';
const TODO_LIST = document.querySelector(".todolist");
let listOfTodos = [];

const getAll = (url) => {
    return fetch(`${BASE_URL}/${url}`)
        .then(response => response.json())
};

const init = async () => {
    const todos = await getAll(TODOS);
    const users = await getAll(USERS);

    fetchTodoItems(todos, users);

    let data = Object.keys(listOfTodos[0]);
    generateTableHead(TODO_LIST, data);
    generateTable(TODO_LIST, listOfTodos);
};

init();

const generateTableHead = (table, data) => {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
};
const generateTable = (table, data) => {
    for (let element of data) {
        let row = table.insertRow();
        for (let key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
};

const fetchTodoItems = (todos, users) => {
    for (let i = 0; i < todos.length; i++) {
        listOfTodos[i] = {};

        appendUserToTodoList(todos[i], listOfTodos[i], users);
        listOfTodos[i].title = todos[i].title;
        listOfTodos[i].completed = todos[i].completed;
    }
};

const appendUserToTodoList = (todolistOld, todoListNew, users) => {
    for (let j = 0; j < users.length; j++) {
        if (users[j].id === todolistOld.userId) {
            todoListNew.name = users[j].name;
        }
    }
};





