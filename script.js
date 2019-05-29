const table = document.querySelector("#table");

function getData(url) {
	let xml = new XMLHttpRequest();
	xml.open("GET", url, false);
	xml.send();

	return JSON.parse(xml.responseText);
}

function addRow(title, userEmail, userName, completed) {
	let row = table.insertRow();
	
	let titleCell = row.insertCell();
	titleCell.appendChild(document.createTextNode(title));
	
	let userCell = row.insertCell();
	let emailLink = document.createElement("a");
	emailLink.href = `mailto:${userEmail}`;
	emailLink.innerText = userName;
	userCell.appendChild(emailLink);
	
	let completedCell = row.insertCell();
	completedCell.appendChild(document.createTextNode(completed ? "yes" : "no"));
}

let todoList = getData("https://jsonplaceholder.typicode.com/todos");
let userList = getData("https://jsonplaceholder.typicode.com/users");

for(let i = 0; i < todoList.length; i++) {
	let rowTitle = todoList[i].title;
	let user = userList.find(user => user.id === todoList[i].userId);
	let rowCompleted = todoList[i].completed;
	
	addRow(rowTitle, user.email, user.name, rowCompleted);
}