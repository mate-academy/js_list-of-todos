const table = document.querySelector('tbody');
const BaseUrl = 'https://jsonplaceholder.typicode.com/';

const getDataFromServer = async(url) => {
  const response = await fetch(`${BaseUrl}${url}`)
  return response.json();
};

const getTodosWithUsers = (todos, users) => {
  return todos.map(item => ({
    ...item,
    user: users.find(user => user.id === item.userId),
  }));
};

const getTodosList = async () => {
  const todosandUser = await Promise.all([
    getDataFromServer('todos'),
    getDataFromServer('users')
  ]);
  const todosWithUsers = getTodosWithUsers(todosandUser[0], todosandUser[1]);

  todosWithUsers.forEach(todo => {
    table.innerHTML += `
      <tr>
        <td>
          ${todo.title}
        </td>
        <td>
          <a href="mailto:${todo.user.email}">
            ${todo.user.name}
          </a>
        </td>
        <td class=${todo.completed ? "active" : "non-active"}>
          ${todo.completed}
        </td>
      </tr>
    `
  });
};

getTodosList();
