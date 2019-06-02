const requests = ['todos', 'users'];
const data = [];

  requests.forEach(function(item){
    const request = new XMLHttpRequest();
    request.open('GET', `https://jsonplaceholder.typicode.com/${item}`, false);
    request.addEventListener('load', function() {
    data.push(JSON.parse(this.response));
    });
    request.send();
  })
  const [todos, users] = data;
 
  renderTable(todos, users);

 function renderTable(todos, users) {
  let table = document.querySelector('#table');
  let userName;
  let userEmail;
  table.insertAdjacentHTML('beforeend', `
    <thead>
      <th>Title</th><th>Name</th><th>Status</th>
    </thead>
    <tbody></tbody`);
  for (let item of todos) {
    let isCompleted;
    item.completed ? isCompleted = 'completed' : isCompleted = 'not completed'
    for (let user of users) {
      if(item.userId === user.id) {
        userName = user.name;
        userEmail = user.email;
        break;
      }
    }
    table.tBodies[0].insertAdjacentHTML('beforeend', `
    <tr>
      <td>${item.title}</td><td><a href="mailto:${userEmail}">${userName}</a></td><td>${isCompleted}</td>
    </tr>`)
  } 
 }
