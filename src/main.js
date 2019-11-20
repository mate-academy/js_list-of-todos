const table = document.querySelector('tbody');
const BaseUrl = 'https://jsonplaceholder.typicode.com/';

const getDataFromServer = async(url) => {
  const response = await fetch(`${BaseUrl}${url}`)
  return response.json();
};

const getTodosWithUsers = (todos, users) => {
  return todos.map(item => ({
    ...item,
    user: users.find(elem => elem.id === item.userId),
  }));
};

const getTodosList = async () => {
  const todosandUser = await Promise.all([
    getDataFromServer('todos'),
    getDataFromServer('users')
  ]);
  const todosWithUsers = getTodosWithUsers(todosandUser[0], todosandUser[1]);

  todosWithUsers.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>
          ${item.title}
        </td>
        <td>
          <a href="mailto:${item.user.email}">
            ${item.user.name}
          </a>
        </td>
        <td class=${item.completed ? "active" : "non-active"}>
          ${item.completed}
        </td>
      </tr>
    `
  });
};

getTodosList();
