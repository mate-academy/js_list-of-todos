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


const getData = async (url) => {
    return fetch(url)
        .then(response => response.json());
};

const init = async () => {
    const [users, todos] = await Promise.all([getData(urlUsers), getData(urlTODOs)]);

    todos.forEach(todo => {
        todo.user = users.find(user => user.id === todo.userId);
    });

    todos.forEach(render);
};
init();
