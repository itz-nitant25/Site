let canvas,ctx,drawing=false,layers=[];

window.onload=function(){
canvas=document.getElementById("canvas");
if(canvas){
ctx=canvas.getContext("2d");
canvas.width=700;canvas.height=400;
canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",draw);
canvas.addEventListener("mouseup",stopDraw);
}
let user=localStorage.getItem("user");
if(user){startApp(JSON.parse(user));}
}

/* LOGIN */
function login(){
let name=document.getElementById("nameInput").value;
let pic=document.getElementById("picInput").value;
let user={name:name,pic:pic};
localStorage.setItem("user",JSON.stringify(user));
startApp(user);
}

function startApp(user){
document.getElementById("loginPage").style.display="none";
document.getElementById("app").style.display="block";
document.getElementById("profileName").innerText=user.name;
document.getElementById("profilePic").src=user.pic;
document.getElementById("welcomeMsg").innerText="Hi "+user.name;
openPage("dashboard");
}

/* NAV */
function openPage(id){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

/* SETTINGS */
function toggleDark(){document.body.classList.toggle("dark");}
function logout(){localStorage.removeItem("user");location.reload();}

/* HELP AI */
function helpAI(){
let q=document.getElementById("helpInput").value;
document.getElementById("helpResult").innerText="AI: Try Editor or AI Tools!";
}

/* DRAW */
function drawMode(){drawing=true;}
function startDraw(e){drawing=true;ctx.beginPath();ctx.moveTo(e.offsetX,e.offsetY);}
function draw(e){if(!drawing) return; ctx.lineTo(e.offsetX,e.offsetY); ctx.stroke();}
function stopDraw(){drawing=false;}

/* TEXT */
function addText(){let text=prompt("Enter text");ctx.font="20px Arial";ctx.fillText(text,100,100);layers.push("Text: "+text);updateLayers();}

/* IMAGE UPLOAD */
function uploadImage(){
let input=document.createElement("input"); input.type="file";
input.onchange=function(e){
let file=e.target.files[0]; let img=new Image();
img.src=URL.createObjectURL(file);
img.onload=function(){ctx.drawImage(img,50,50,200,200);layers.push("Image Layer");updateLayers();}
}
input.click();
}

/* EXPORT */
function exportPNG(){let link=document.createElement("a");link.download="design.png";link.href=canvas.toDataURL();link.click();}

/* CLEAR */
function clearCanvas(){ctx.clearRect(0,0,canvas.width,canvas.height);layers=[];updateLayers();}

/* LAYERS */
function updateLayers(){document.getElementById("layers").innerText="Layers: "+layers.join(" | ");}

/* REAL AI CHAT */
async function askAI(){
let prompt=document.getElementById("prompt").value;
document.getElementById("result").innerText="Thinking...";
const response=await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{"Content-Type":"application/json","Authorization":"Bearer YOUR_API_KEY"},
body:JSON.stringify({model:"gpt-4o-mini",messages:[{role:"user",content:prompt}]})
});
const data=await response.json();
document.getElementById("result").innerText=data.choices[0].message.content;
}

/* AI IMAGE */
async function generateImage(){
let prompt=document.getElementById("imgPrompt").value;
const response=await fetch("https://api.openai.com/v1/images/generations",{
method:"POST",
headers:{"Content-Type":"application/json","Authorization":"Bearer YOUR_API_KEY"},
body:JSON.stringify({model:"gpt-image-1",prompt:prompt,size:"1024x1024"})
});
const data=await response.json();
let img=document.createElement("img");img.src=data.data[0].url;img.width=400;
document.getElementById("imageResult").innerHTML="";document.getElementById("imageResult").appendChild(img);
}
