function getRequest(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    return JSON.parse(xhr.response);
}

const todo = getRequest('https://jsonplaceholder.typicode.com/todos');
const users = getRequest('https://jsonplaceholder.typicode.com/users');

function createElements(item, user) {
    return `
        <tr>
            <td>${item.title}</td>
            <td><a href="mailto:${user.email}">${user.name}</a></td>
            <td>${item.completed}</td>
        </tr>`;
}

function createList() {
    let table = document.createElement('table');
    table.insertAdjacentHTML('beforeend', '<tr><th>item</th><th>username</th><th>completed</th></tr>');
    for (let item of todo) {
        let user = users.find((u) => {
            return u.id === item.userId;
        });
        table.insertAdjacentHTML('beforeend', createElements(item, user));
    }
    document.body.append(table);
}

createList();

