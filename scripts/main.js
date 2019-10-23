'use strict'

const tbody = document.querySelector('#tbody');

async function loadData(url) {
	const response = await fetch(url);
	const json = await response.json();
	return json;
}

async function completeTable() {
	const todoList = await loadData('https://jsonplaceholder.typicode.com/todos');
	const users = await loadData('https://jsonplaceholder.typicode.com/users');
	for (let i = 0; i < todoList.length; i++) {
		const tr = document.createElement('TR');
		const currentUser = users.find(user => user.id == todoList[i].userId);
		tr.innerHTML = `
			<td>${todoList[i].title}</td>
			<td><a href="mailto:${currentUser.email}">${currentUser.name}<a></td>
			<td>${todoList[i].completed}</td>
		`;
		tbody.append(tr);
	}
}

completeTable();