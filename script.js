
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const remainingBox = document.getElementById("remainingBox");
const completedBox = document.getElementById("completedBox");
const totalBox = document.getElementById("totalBox");
const currentDate = document.getElementById("currentDate");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 🌞 Display current date
const today = new Date();
currentDate.textContent = `📅 ${today.toDateString()}`;

function updateStats() {
  const remaining = tasks.filter(task => !task.completed).length;
  const completed = tasks.filter(task => task.completed).length;
  remainingBox.textContent = `🕒 Remaining: ${remaining}`;
  completedBox.textContent = `✅ Completed: ${completed}`;
  totalBox.textContent = `📋 Total Today: ${tasks.length}`;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item" + (task.completed ? " completed" : "");
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button class="complete-btn" onclick="toggleComplete(${index})">✓</button>
        <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
  updateStats();
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

renderTasks();