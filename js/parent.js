const token = localStorage.getItem("token");
const parentId = localStorage.getItem("parentId");

document.querySelector(".logoutBtn").onclick = () => {
  localStorage.clear();
  window.location.href = "index.html";
};

// Fetch children
async function loadChildren() {
  const res = await fetch("http://localhost:5000/api/parent/children/" + parentId, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const children = await res.json();

  const select = document.getElementById("childSelect");
  select.innerHTML = "";
  children.forEach(c => {
    let opt = document.createElement("option");
    opt.value = c._id;
    opt.textContent = c.name;
    select.appendChild(opt);
  });
}
loadChildren();

// Add Task
document.getElementById("addTaskBtn").onclick = async () => {
  const title = document.getElementById("taskInput").value;
  const time = document.getElementById("timeInput").value;
  const childId = document.getElementById("childSelect").value;

  if (!title || !time) return alert("Enter task and time");
  
  await fetch("http://localhost:5000/api/tasks/add", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ childId, title, time })
  });

  document.getElementById("taskInput").value = "";
  document.getElementById("timeInput").value = "";
  alert("Task added!");
};

// Add Reminder
document.getElementById("addReminderBtn").onclick = async () => {
  const text = document.getElementById("reminderInput").value;
  const childId = document.getElementById("childSelect").value;

  if (!text) return alert("Enter reminder");

  await fetch("http://localhost:5000/api/reminders/add", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ childId, text })
  });

  document.getElementById("reminderInput").value = "";
  alert("Reminder sent!");
};
