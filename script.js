const todoform = document.querySelector('form');
const todoinput = document.getElementById('todo-input');
const todolistul = document.getElementById('todo-list');
let alltodos = getodos();
updatetodolist();

// Load todos from localStorage when page loads
window.addEventListener("DOMContentLoaded", () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  if (savedTodos && Array.isArray(savedTodos)) {
    alltodos = savedTodos;
    updatetodolist();
  }
});

todoform.addEventListener('submit', function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoinput.value.trim();
  if (todoText.length > 0) {
    todoobject ={
        Text:todoText,
        complete:false
    }
    alltodos.push(todoobject);
    updatetodolist();
    savetodos();
    todoinput.value = "";
  }
}

function updatetodolist() {
  todolistul.innerHTML = "";
  alltodos.forEach((todo, todoindex) => {
    const todoitem = createtodoitem(todo, todoindex);
    todolistul.append(todoitem);
  });
}

function createtodoitem(todo, todoindex) {
  const todoli = document.createElement("li");
  const todoid = "todo-" + todoindex;
  const todoText= todo.Text;

  todoli.classList.add("todo");
  todoli.innerHTML = `
    <input type="checkbox" id="${todoid}">
    <label class="custom-checkbox" for="${todoid}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#000000" fill="">
        <path d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10Z"
              stroke="currentColor" stroke-width="2"></path>
        <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </label>
    <label for="${todoid}" class="todo-text">${todoText}</label>
    <button class="delete-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#000000" fill="white">
        <path d="M19.5 5.5L18.88 15.52C18.72 18.09 18.64 19.37 18 20.29C17.68 20.74 17.27 21.13 16.8 21.42C15.84 22 14.56 22 11.99 22C9.42 22 8.14 22 7.18 21.41C6.7 21.12 6.3 20.74 5.98 20.28C5.34 19.36 5.26 18.08 5.1 15.52L4.5 5.5"
              stroke="#141B34" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M3 5.5h18M16.05 5.5L15.37 4.09C14.92 3.16 14.69 2.69 14.3 2.4C14.21 2.33 14.12 2.27 14.03 2.22C13.59 2 13.07 2 12.03 2C10.97 2 10.43 2 9.99 2.23C9.9 2.29 9.81 2.35 9.72 2.41C9.32 2.72 9.1 3.2 8.66 4.17L8.05 5.5"
              stroke="#141B34" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M9.5 16.5v-6M14.5 16.5v-6" stroke="#141B34" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  `;

  // Delete button logic
  const deleteButton = todoli.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    alltodos.splice(todoindex, 1);
    updatetodolist();
    savetodos();
  });

  return todoli;
}

function savetodos() {
  const todosjson = JSON.stringify(alltodos);
  localStorage.setItem("todos", todosjson);
}
function getodos (){
    const todoss = localStorage.getItem("todos") || "[]";
    return JSON.parse(todoss);
}