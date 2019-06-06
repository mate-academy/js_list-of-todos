const requests = ['todos', 'users'];
const data = {};

  requests.forEach(function(item){
    const request = new XMLHttpRequest();
    request.open('GET', `https://jsonplaceholder.typicode.com/${item}`);
    request.addEventListener('load', function() {
    data[item] = JSON.parse(this.response);
      if (data.todos && data.users) {
        renderTable(data.todos, data.users);
      }
    });
    request.send();
  })

 function renderTable(todos, users) {
  let table = document.querySelector('#table');
  
  table.insertAdjacentHTML('beforeend', `
    <thead>
      <th>Title</th><th>Name</th><th>Status</th>
    </thead>
    <tbody></tbody`);
    
  for (let item of todos) {
    const isCompleted = item.completed ? 'completed' : 'not completed'
    const user = users.filter(user => user.id === item.userId);
    const userName = user[0].name;
    const userEmail = user[0].email;

    table.tBodies[0].insertAdjacentHTML('beforeend', `
    <tr>
      <td>${item.title}</td><td><a href="mailto:${userEmail}">${userName}</a></td><td>${isCompleted}</td>
    </tr>`)
  } 
 }
