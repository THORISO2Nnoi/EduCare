const childId = localStorage.getItem("childId");

// Logout
document.querySelector(".logoutBtn").onclick = () => {
  localStorage.clear();
  window.location.href = "index.html";
};

// Load Tasks
async function loadTasks() {
  const res = await fetch("http://localhost:5000/api/tasks/" + childId);
  let tasks = await res.json();

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `${t.title} ⏰ ${t.time} - ${t.done ? "✅" : "❌"}`;
    
    const btn = document.createElement("button");
    btn.textContent = t.done ? "Undo" : "Done";
    btn.onclick = async () => {
      await fetch("http://localhost:5000/api/tasks/toggle/" + t._id, { method: "PUT" });
      loadTasks();
    };

    li.appendChild(btn);
    taskList.appendChild(li);
  });
}
loadTasks();

// Learner adds own task (max 5 per day)
document.getElementById("learnerAddTaskBtn").onclick = async () => {
  const title = document.getElementById("learnerTaskInput").value;
  const time = document.getElementById("learnerTimeInput").value;

  if (!title || !time) return alert("Enter task and time");

  // Check task count
  const res = await fetch("http://localhost:5000/api/tasks/" + childId);
  const tasks = await res.json();
  if (tasks.length >= 5) return alert("You can only add 5 tasks per day!");

  await fetch("http://localhost:5000/api/tasks/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ childId, title, time })
  });

  document.getElementById("learnerTaskInput").value = "";
  document.getElementById("learnerTimeInput").value = "";
  loadTasks();
};

// Load Reminders
async function loadReminders() {
  const res = await fetch("http://localhost:5000/api/reminders/" + childId);
  let reminders = await res.json();

  const reminderList = document.getElementById("reminderList");
  reminderList.innerHTML = "";

  reminders.forEach(r => {
    const li = document.createElement("li");
    li.textContent = r.text;
    reminderList.appendChild(li);
  });
}
loadReminders();
