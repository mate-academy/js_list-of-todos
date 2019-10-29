const BASE_URL = 'https://jsonplaceholder.typicode.com';
const TODOS = 'todos';
const USERS = 'users';
const TODO_LIST = document.querySelector(".todolist");
let listOfTodos = [];

const toDoColumns = ['name', 'title', 'completed'];

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
        if (toDoColumns.includes(key)) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }
};
const generateTable = (table, data) => {
    for (let element of data) {
        let row = table.insertRow();
        for (let key in element) {
            if (toDoColumns.includes(key)) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                appendChildToCell(key, text, element[key], cell)
            }
        }
    }
};

const appendChildToCell= (key, text, element, cell) => {
    if (key === 'name') {
        let a = document.createElement("a");
        a.appendChild(text);
        a.href = element;
        cell.appendChild(a);
    } else {
        cell.appendChild(text);
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
            todoListNew.email = users[j].email;
        }
    }
};





