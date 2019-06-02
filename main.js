"use strict";

const theadInner = ["title", "name", "description"];

class Element {
  constructor(tag, innerText) {
    this.tag = tag;
    this.innertext = innerText;
  }
  render() {
    const element = document.createElement(this.tag);

    element.textContent = this.innertext;
    return element;
  }
}

function listOfUsers() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users", false);
  xhr.send();
  try {
    return JSON.parse(xhr.responseText);
  } catch (e) {
    throw new Error("invalid JSON");
  }
}

function listOfTodo() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://jsonplaceholder.typicode.com/todos", false);
  xhr.send();
  try {
    return JSON.parse(xhr.responseText);
  } catch (e) {
    throw new Error("invalid JSON");
  }
}
const users = listOfUsers().map(user => {
  return {
    id: user.id,
    email: user.email,
    name: user.name
  };
});

const todo = listOfTodo().map(user => {
  return {
    id: user.userId,
    title: user.title,
    completed: user.completed
  };
});

const table = new Element("table").render();
const thead = new Element("thead").render();

table.append(thead);

theadInner.forEach(elem => {
  const th = new Element("th", elem).render();

  thead.append(th);
});

users.forEach(user => {
  const a = todo.filter(elem => elem.id === user.id);

  a.forEach(elem => {
    const tr = new Element("tr").render();
    table.append(tr);

    const td1 = new Element("td").render();
    const p = new Element("p", elem.title).render();
    td1.append(p);
    tr.append(td1);

    const td2 = new Element("td").render();
    const href = new Element("a", user.name).render();
    td2.append(href);
    href.setAttribute("href", `${user.email}`);
    tr.append(td2);

    const td3 = new Element("td").render();
    const status = new Element("p", elem.completed).render();
    td3.append(status);
    tr.append(td3);
  });
});

document.body.append(table);
