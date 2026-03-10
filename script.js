const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("taskCounter");
const searchInput = document.getElementById("searchInput");
const darkToggle = document.getElementById("darkToggle");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

taskList.innerHTML="";

let filteredTasks = tasks.filter(task => {

if(filter==="active") return !task.completed;
if(filter==="completed") return task.completed;

return true;

});

const searchText = searchInput.value.toLowerCase();

filteredTasks = filteredTasks.filter(task =>
task.text.toLowerCase().includes(searchText)
);

filteredTasks.forEach((task,index)=>{

const li = document.createElement("li");

if(task.completed) li.classList.add("completed");

li.innerHTML = `
<div>
<span>${task.text}</span>
<span class="date">${task.date || ""}</span>
</div>
<div>
<button class="complete">✓</button>
<button class="delete">X</button>
</div>
`;

li.querySelector(".complete").onclick = ()=>{
task.completed = !task.completed;
saveTasks();
renderTasks();
};

li.querySelector(".delete").onclick = ()=>{
tasks.splice(index,1);
saveTasks();
renderTasks();
};

taskList.appendChild(li);

});

counter.textContent = tasks.length + " Tasks";
}

addTaskBtn.onclick = ()=>{

const text = taskInput.value.trim();

if(text==="") return;

tasks.push({
text:text,
date:dueDate.value,
completed:false
});

taskInput.value="";
dueDate.value="";

saveTasks();
renderTasks();
};

searchInput.addEventListener("input",renderTasks);

filterButtons.forEach(btn=>{
btn.onclick = ()=>{
filter = btn.dataset.filter;
renderTasks();
};
});

darkToggle.onclick = ()=>{
document.body.classList.toggle("dark");
};

renderTasks();
