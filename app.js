
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions sa date
function getTime(){
  var mydate = new Date();
  var year = mydate.getFullYear();
    if(year < 1000){
        year +=1900
    }
  var day = mydate.getDay();
  var month = mydate.getMonth();
  var daym = mydate.getDate();
  var dayarray = new Array("Sunday,","Monday,","Tuesday,","Wednesday,","Thursday,","Friday,","Saturday,");
  var montharray =  new Array("January","February","March","April","May","June","July","August","September","October","November","December",);
// Function sa time
  var currentTime = new Date();
  var h = currentTime.getHours();
  var m = currentTime.getMinutes();
  var s =  currentTime.getSeconds();
      if (h == 24){
            h = 0;
      } else if (h > 12){
        h = h - 0;
      }
      if(h < 10){
        h = "0"+ h;
      }
      if(m < 10){
        m = "0" + m;
      }
      if (s < 10){
        s = "0" + s;
      }
      var myClock = document.getElementById("timeDate");
      myClock.textContent = "" +dayarray[day]+ " " +daym+ " " +montharray[month]+ " " +year+" |  " +h+ ":" +m+ ":" +s;
      myClock.innerText = "" +dayarray[day]+ " " +daym+ " " +montharray[month]+ " " +year+" |  " +h+ ":" +m+ ":" +s;
     
      setTimeout("getTime()",1000);
    

}
getTime();
//Functions sa site

function addTodo(e) {
  e.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
 
  saveLocalTodos(todoInput.value);
  
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";

  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {

    const todo = item.parentElement;
    todo.classList.add("fall");

    removeLocalTodos(todo);
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
  
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

