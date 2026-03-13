let canvas,ctx,drawing=false,layers=[];

// Check trial and show popup if expired
function checkTrial(){
  let trialStart = localStorage.getItem("trialStart");
  if(!trialStart){
    localStorage.setItem("trialStart", Date.now());
    return true;
  }
  let now = Date.now();
  let diff = now - parseInt(trialStart);
  let oneDay = 24*60*60*1000;
  if(diff>oneDay){
    document.getElementById("trialPopup").style.display="flex";
    return false;
  }
  return true;
}

window.onload = function(){
  // Initialize app only if trial valid
  if(checkTrial()){
    let user = localStorage.getItem("user");
    if(user){startApp(JSON.parse(user));}
  }

  // Canvas
  canvas=document.getElementById("canvas");
  if(canvas){
    ctx=canvas.getContext("2d");
    canvas.width=700; canvas.height=400;
    canvas.addEventListener("mousedown",startDraw);
    canvas.addEventListener("mousemove",draw);
    canvas.addEventListener("mouseup",stopDraw);
  }
}

// Popup login/signup
function popupLogin(){
  let name = document.getElementById("popupName").value;
  let pass = document.getElementById("popupPass").value;
  if(name && pass){
    document.getElementById("trialPopup").style.display="none";
    localStorage.setItem("user", JSON.stringify({name:name,pic:"https://via.placeholder.com/70"}));
    startApp(JSON.parse(localStorage.getItem("user")));
  }
}

function popupSignUp(){
  let name = document.getElementById("popupName").value;
  let pass = document.getElementById("popupPass").value;
  if(name && pass){
    document.getElementById("trialPopup").style.display="none";
    localStorage.setItem("trialStart", Date.now());
    localStorage.setItem("user", JSON.stringify({name:name,pic:"https://via.placeholder.com/70"}));
    startApp(JSON.parse(localStorage.getItem("user")));
  }
}

// Start app
function startApp(user){
  document.getElementById("trialPopup").style.display="none";
  document.getElementById("app").style.display="block";
  document.getElementById("profileName").innerText=user.name;
  document.getElementById("profilePic").src=user.pic;
  document.getElementById("welcomeMsg").innerText="Hi "+user.name;
  openPage("dashboard");
}

// Navigation
function openPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Settings
function toggleDark(){document.body.classList.toggle("dark");}
function logout(){localStorage.removeItem("user");location.reload();}

// Help AI
function helpAI(){let q=document.getElementById("helpInput").value;document.getElementById("helpResult").innerText="AI: Use Editor / AI tools!";}

// Editor
function drawMode(){drawing=true;}
function startDraw(e){drawing=true;ctx.beginPath();ctx.moveTo(e.offsetX,e.offsetY);}
function draw(e){if(!drawing)return;ctx.lineTo(e.offsetX,e.offsetY);ctx.stroke();}
function stopDraw(){drawing=false;}
function addText(){let text=prompt("Enter text");ctx.font="20px Arial";ctx.fillText(text,100,100);layers.push("Text: "+text);updateLayers();}
function uploadImage(){let input=document.createElement("input");input.type="file";input.onchange=function(e){let file=e.target.files[0];let img=new Image();img.src=URL.createObjectURL(file);img.onload=function(){ctx.drawImage(img,50,50,200,200);layers.push("Image");updateLayers();}};input.click();}
function exportPNG(){let link=document.createElement("a");link.download="design.png";link.href=canvas.toDataURL();link.click();}
function clearCanvas(){ctx.clearRect(0,0,canvas.width,canvas.height);layers=[];updateLayers();}
function updateLayers(){document.getElementById("layers").innerText="Layers: "+layers.join(" | ");}

// AI Chat
async function askAI(){
  let prompt=document.getElementById("prompt").value;
  document.getElementById("result").innerText="Thinking...";
  const res=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer YOUR_API_KEY"},body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"user",content:prompt}]})});
  const data=await res.json();
  document.getElementById("result").innerText=data.choices[0].message.content;
}

// AI Image
async function generateImage(){
  let prompt=document.getElementById("imgPrompt").value;
  const res=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer YOUR_API_KEY"},body:JSON.stringify({model:"gpt-image-1",prompt:prompt,size:"1024x1024"})});
  const data=await res.json();
  let img=document.createElement("img"); img.src=data.data[0].url; img.width=400;
  document.getElementById("imageResult").innerHTML=""; document.getElementById("imageResult").appendChild(img);
}
