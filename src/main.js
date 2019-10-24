'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const xhrToDo = new XMLHttpRequest();

    xhrToDo.open('GET', 'https://jsonplaceholder.typicode.com/todos');
    xhrToDo.send();

    createTable()
    xhrToDo.onload = function() {
        const xhrUsers = new XMLHttpRequest();
        xhrUsers.open('GET', 'https://jsonplaceholder.typicode.com/users');
        xhrUsers.send();
        xhrUsers.onload = function() {
            const users = JSON.parse(xhrUsers.response);
            const todoList = JSON.parse(xhrToDo.response);
            
            for (let user of users){
                for (let todo of todoList){
                    if (todo.userId === user.id) {
                        createRow(`${todo.title}`, `${user.name}`, `${user.email}`, `${todo.completed}`)
                    }

                }
            }
        }

    };
});

const body = document.querySelector('body');
const table = document.createElement('table');
table.className = 'table';
function createTable () {
    table.insertAdjacentHTML('afterbegin',
        '<thead>' +
        '<tr>' +
        '<th>ToDo</th><th>Name</th><th>Completed</th>' +
        '</tr>' +
        '</thead>')
    body.append(table)
}
const row = document.createElement('tr')
function createRow(todo, name, address, completed) {
    table.insertAdjacentHTML('beforeend',
        `<tr>
            <td>${todo}</td>
            <td><a href="mailto:${address}">${name}</a></td>
            <td>${completed}</td>
            </tr>`)
    body.append(table)
}
