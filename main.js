const table = document.getElementById('table');
const todos = 'https://jsonplaceholder.typicode.com/todos';
const users = 'https://jsonplaceholder.typicode.com/users';

function fetching(url) {
  return fetch(url).then(response => response.json());
}

async function crearedTable() {
  const todosList = await fetching(todos);
  const todoUsers = await fetching(users);

  for (todo of todosList) {
    const tr = document.createElement('tr');
    const [email, name, task] = [todoUsers.find(user => user.id === todo.userId).email,
    todoUsers.find(user => user.id === todo.userId).name,
    todo.completed ? 'positive' : 'warning'];
    tr.innerHTML = `<td>${todo.title}</td>
                    <td><a href = "mailto:${email}">${name}</a></td>
                    <td class="${task}">${todo.completed ? 'Виконанно' : 'Забито'}</td>`;
                    
    table.append(tr);
  }
}

crearedTable();
