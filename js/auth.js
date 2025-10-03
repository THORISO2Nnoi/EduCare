const API = "http://localhost:5000/api";

// Parent register
if(document.getElementById("registerForm")){
  document.getElementById("registerForm").onsubmit = async(e)=>{
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const res = await fetch(`${API}/parent/register`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,email,password})
    });
    if(res.ok){ alert("Registered! Please login."); window.location.href="index.html"; }
    else{ alert("Error registering"); }
  };
}

// Login (Parent or Learner)
if(document.getElementById("loginForm")){
  document.getElementById("loginForm").onsubmit = async(e)=>{
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Try parent login first
    if(password){
      const res = await fetch(`${API}/parent/login`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email:username,password})
      });
      const data = await res.json();
      if(data.parentId){
        localStorage.setItem("token", data.token);
        localStorage.setItem("parentId", data.parentId);
        window.location.href="parent.html";
      }else alert("Invalid parent credentials");
    } else {
      // Learner login
      const res = await fetch(`${API}/learner/login`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name:username})
      });
      const data = await res.json();
      if(data.childId){
        localStorage.setItem("childId", data.childId);
        window.location.href="learner.html";
      }else alert("Learner not found");
    }
  };
}
