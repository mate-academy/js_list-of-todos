'use strict';
const body = document.body;
const table = document.createElement('table');
body.append(table);
table.className = 'table';
const th = document.createElement('thead');
table.append(th);
const tr = document.createElement('tr');
th.append(tr);
const headers = ['list to do', 'user name', 'completed'];
for (let i = 0; i < headers.length; i++) {
    const td = document.createElement('td');
    td.textContent = headers[i];
    tr.append(td);
};

function load(URL) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL, false);
    xhr.send();
    const data = JSON.parse(xhr.responseText);
    return data;
};

const todos = load('https://jsonplaceholder.typicode.com/todos');
const users = load('https://jsonplaceholder.typicode.com/users');

function createTbody(item, user) {
    return `<tr><td>${item.title}</td><td><a href="mailto:${user.email}">${user.name}</td><td>${item.completed}</td></tr>`}

todos.forEach((item) => {
    const user = users.find(user => user.id === item.userId);
    const tbody = createTbody(item, user);
    th.insertAdjacentHTML('afterend', tbody);
});
