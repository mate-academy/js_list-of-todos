const table = document.getElementById('table');
const todos = 'https://jsonplaceholder.typicode.com/todos';
const users = 'https://jsonplaceholder.typicode.com/users';

async function crearedTable() {
  const todosList = await fetch(todos).then(response => response.json());
  const todoUsers = await fetch(users).then(response => response.json());

  for (key of todosList) {
    const tr = document.createElement('tr');
    const [email, name, task] = [todoUsers.find(user => user.id === key.userId).email,
    todoUsers.find(user => user.id === key.userId).name,
    key.completed ? 'positive' : 'warning'];
    tr.innerHTML = `<td>${key.title}</td>
                    <td><a href = "mailto:${email}">${name}</a></td>
                    <td class="${task}">${key.completed ? 'Виконанно' : 'Забито'}</td>`;
                    
    table.append(tr);
  }
}

crearedTable();
