// Initialize parents array if not exist
if(!localStorage.getItem("parents")) localStorage.setItem("parents", JSON.stringify([]));

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
  document.getElementById("regMsg").textContent="Registration successful! Redirecting to login...";

  // Clear fields
  document.getElementById("regName").value="";
  document.getElementById("regEmail").value="";
  document.getElementById("regPassword").value="";

  // Redirect after 2 seconds
  setTimeout(()=>{
    window.location.href="index.html";
  },2000);
};
