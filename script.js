function table() {
    let table = document.querySelector('.table');
    table.innerHTML = `
    <table class="ui inverted table">
        <thead>
            <th>TODO item</th>
            <th>The name of the user</th>
            <th>Completed</th>
        </thead>
        <tbody id='tableBody'></tbody>
    </table>
    `

    let list = async function () {
        let response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
        let todoList = await response.json();
        let response1 = await fetch(`https://jsonplaceholder.typicode.com/users`)
        let usersList = await response1.json();
        let tbody = document.getElementById('tableBody')
        for (let todo of todoList) {    
            let tdTodo = document.createElement('td');    
            let tdComplete = document.createElement('td');  
            let rows = document.createElement('tr');
            tdTodo.textContent = todo.title;     
            tdComplete.textContent = todo.completed;
            for (let user of usersList) {
                if (user.id === todo.userId){
                    let tdName = document.createElement('td');
                    todo.userId = user;
                    tdName.textContent = todo.userId.email;
                    rows.append(tdTodo, tdName, tdComplete);
                    tbody.appendChild(rows); 
                }
            }                          
        }         
    }
    list()    
}
table();