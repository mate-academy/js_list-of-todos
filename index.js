
async function getData() {
    const apiBase = 'https://jsonplaceholder.typicode.com/';
    const todosPromise = fetch(`${apiBase}todos`);
    const usersPromise = fetch(`${apiBase}users`);
    const [todosResponse, usersResponse] = await Promise.all([todosPromise, usersPromise]);
    const todos = await todosResponse.json();
    const users = await usersResponse.json();

    return { todos, users };
}

async function renderTable() {
    const container = document.getElementById('container');
    const data = await getData();
    const table = createTable(data);
    container.append(table);
}

function createTable({users, todos}) {
    const tableHeaders = ['TODOitem', 'Name', 'Status'];
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    tableHeaders.forEach( header => {
        const th = td.cloneNode();
        th.innerText = header;
        tr.appendChild(th);
    });
    thead.append(tr);
    const tbody = createTbody({users, todos});
    table.append(thead, tbody);

    return table;
}

function createTbody({users, todos}) {
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const a = document.createElement('a');
    todos.forEach( todo => {
        const row = tr.cloneNode();
        const todoTitle = td.cloneNode();
        todoTitle.innerText = todo.title;
        const user = users.find( person => {
            return person.id === todo.userId;
        });
        const doer = td.cloneNode();
        const email = a.cloneNode();
        email.innerText  = user.name;
        email.href = user.email;
        doer.appendChild(email);

        const completed = td.cloneNode();
        completed.innerText = todo.completed ? 'Done' : 'Not done';
        row.append(todoTitle, doer, completed);
        tbody.append(row);
    });
    return tbody;
}


window.addEventListener('load', renderTable);