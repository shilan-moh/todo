//selector
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todos");

//EventListener
todoBtn.addEventListener("click", todoadd);
todoList.addEventListener("click", removecheck);
filterOptions.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getLocalTodos);

//functions
function todoadd(addEve) {
  addEve.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = `<li>${todoInput.value}</li>
              <span><i class="fa-solid fa-trash-alt"></i></span>
            
              <span><i class="fa-solid fa-clipboard-check"></i></span>
            
          `;
  todoDiv.innerHTML = newTodo;

  todoList.appendChild(todoDiv);
  saveLocalTodos(todoInput.value);
  todoInput.value = "";
}

function removecheck(e) {
  const classList = [...e.target.classList];
  const item = e.target;
  //console.log(item.parentElement.parentElement);
  if (classList[1] === "fa-trash-alt") {
    const todo = item.parentElement.parentElement;
    removeLocalTodo(todo);
    todo.remove();
  } else if (classList[1] === "fa-clipboard-check") {
    const todo2 = item.parentElement.parentElement;
    todo2.classList.toggle("completed");
  }
}

function filterTodo(e) {
  console.log(todoList.childNodes);
  const todos2 = [...todoList.childNodes];
  todos2.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let saveTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  saveTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(saveTodos));
}
function getLocalTodos() {
  let saveTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  saveTodos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = `<li>${todo}</li>
              <span><i class="fa-solid fa-trash-alt"></i></span>
            
              <span><i class="fa-solid fa-clipboard-check"></i></span>
            
          `;
    todoDiv.innerHTML = newTodo;

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodo(todo) {
  let saveTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filterTodos = saveTodos.filter((t) => t !== todo.children[0].innerText);
  localStorage.setItem("todos", JSON.stringify(filterTodos));
}
