  // to load list of task
document.addEventListener("DOMTaskListLoaded", loadAllTasks);
let editIndex = -1;

function addTask() {
    let taskInput = document.getElementById("task");
    let taskValue = taskInput.value.trim();
    if (taskValue === "") return;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (editIndex === -1) {
        tasks.push(taskValue);
    } else {
        tasks[editIndex] = taskValue;
        editIndex = -1;
        document.getElementById("addBtn").innerHTML = "<i class='fas fa-plus'></i>";
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskInput.value = "";
}
function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<p>${task}</p>
         <div>
         <button onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
         <button onclick="removeTask(${index})"><i class="fas fa-trash"></i></button>
         </div>`;
        taskList.appendChild(li);
    });
}

function loadAllTasks() {
    renderTasks();
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    document.getElementById("task").value = tasks[index];
    editIndex = index;
    document.getElementById("addBtn").innerHTML = "<i class='fa-regular fa-bookmark'></i>";
}

function removeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function clearAllTask(){
    localStorage.removeItem('tasks');
    renderTasks();
}
