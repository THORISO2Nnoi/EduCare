// Initialize empty parents/children if not exist
if(!localStorage.getItem("parents")) localStorage.setItem("parents", JSON.stringify([]));
if(!localStorage.getItem("children")) localStorage.setItem("children", JSON.stringify([]));

// Parent Login
document.getElementById("loginParentBtn").onclick = ()=>{
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const parents = JSON.parse(localStorage.getItem("parents"));
  const parent = parents.find(p=>p.email===email && p.password===password);
  if(parent){
    localStorage.setItem("userType","parent");
    localStorage.setItem("userId", parent.id);
    window.location.href="parent.html";
    return;
  }
  document.getElementById("loginError").textContent="Parent not found!";
};

// Parent Registration
document.getElementById("registerParentBtn").onclick = ()=>{
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if(!name || !email || !password){
    document.getElementById("regMsg").style.color="red";
    document.getElementById("regMsg").textContent="All fields are required!";
    return;
  }

  let parents = JSON.parse(localStorage.getItem("parents"));
  if(parents.find(p=>p.email===email)){
    document.getElementById("regMsg").style.color="red";
    document.getElementById("regMsg").textContent="Email already registered!";
    return;
  }

  const id = Date.now();
  parents.push({id, name, email, password});
  localStorage.setItem("parents", JSON.stringify(parents));

  document.getElementById("regMsg").style.color="green";
  document.getElementById("regMsg").textContent="Registration successful! You can now login.";

  document.getElementById("regName").value="";
  document.getElementById("regEmail").value="";
  document.getElementById("regPassword").value="";
};

// Learner login
document.getElementById("loginChildBtn").onclick = ()=>{
  const name = document.getElementById("childName").value.trim();
  const children = JSON.parse(localStorage.getItem("children")) || [];
  const child = children.find(c=>c.name.toLowerCase() === name.toLowerCase());
  
  if(child){
    // Save childId and userType
    localStorage.setItem("userType","learner");
    localStorage.setItem("childId", child.id);
    window.location.href="learner.html";
    return;
  }

  document.getElementById("loginError").textContent="Learner not found!";
};

