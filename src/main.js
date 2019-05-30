const table = document.querySelector('.todos');

function CreateTodosList(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    const parsedData = JSON.parse(xhr.responseText);

    return parsedData;
}

const items = CreateTodosList('https://jsonplaceholder.typicode.com/todos');
const users = CreateTodosList('https://jsonplaceholder.typicode.com/users');

function createTemplate(item, user) {
    return `
        <tr>
            <td>${item.title}</td>
            <td><a href="mailto:${user.email}">${user.name}</a></td>
            <td>${item.completed}</td>
        </tr>
    `;
}

items.forEach(item => {
    const owner = users.find((user) => user.id === item.userId);
    const tr = createTemplate(item, owner);
    table.insertAdjacentHTML('beforeend', tr);
});
