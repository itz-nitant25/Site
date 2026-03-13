// ----- FIREBASE SETUP -----
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "YOUR_FIREBASE_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// LOGIN & SIGNUP
function login(){
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email,password)
    .then(res => startApp(res.user))
    .catch(err => alert(err.message));
}
function signup(){
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email,password)
    .then(res => startApp(res.user))
    .catch(err => alert(err.message));
}

auth.onAuthStateChanged(user => {
  if(user) startApp(user);
});

// START APP
function startApp(user){
  document.getElementById("loginPage").style.display="none";
  document.getElementById("app").style.display="flex";
  const username = user.email.split('@')[0];
  document.getElementById("profileName").innerText=username;
  document.getElementById("welcomeMsg").innerText="Hi "+username;
}

// NAVIGATION
function openPage(id){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
function logout(){
  auth.signOut().then(()=>location.reload());
}
function toggleDark(){
  document.body.classList.toggle("dark");
}

// ----- CANVAS EDITOR -----
let canvas,ctx,drawing=false,objects=[],selectedTool="";

window.onload = function(){
  canvas=document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = 500;

  canvas.onmousedown = function(e){
    if(selectedTool==="draw"){
      drawing=true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX,e.offsetY);
    }
  }
  canvas.onmousemove = function(e){
    if(drawing && selectedTool==="draw"){
      ctx.lineTo(e.offsetX,e.offsetY);
      ctx.stroke();
    }
  }
  canvas.onmouseup = function(){
    drawing=false;
  }
}

// DRAW TOOL
function drawMode(){selectedTool="draw";}

// TEXT
function addText(){
  let text = prompt("Enter text:");
  if(text){
    ctx.font="24px Arial";
    ctx.fillText(text,50,50);
    objects.push({type:"text",value:text});
    updateLayers();
  }
}

// UPLOAD IMAGE
function uploadImage(){
  const input=document.createElement("input");
  input.type="file";
  input.onchange = function(e){
    const file=e.target.files[0];
    let img=new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      ctx.drawImage(img,0,0,canvas.width,canvas.height);
      objects.push({type:"image",src:img.src});
      updateLayers();
    }
  }
  input.click();
}

// EXPORT PNG
function exportPNG(){
  const link=document.createElement("a");
  link.download="toolpilot_design.png";
  link.href=canvas.toDataURL();
  link.click();
}

// CLEAR
function clearCanvas(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  objects=[];
  updateLayers();
}

// LAYERS
function updateLayers(){
  document.getElementById("layers").innerText="Layers: "+objects.map(o=>o.type).join(" | ");
}

// ----- REAL AI IMAGE GENERATOR -----
async function generateAIImage(){
  let prompt = document.getElementById("imgPrompt").value;
  document.getElementById("imageResult").innerText="Generating...";
  const res=await fetch("https://api.openai.com/v1/images/generations",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer YOUR_OPENAI_KEY"
    },
    body:JSON.stringify({
      model:"gpt-image-1",
      prompt:prompt,
      size:"1024x1024"
    })
  });
  const data=await res.json();
  const imgUrl=data.data[0].url;
  document.getElementById("imageResult").innerHTML=`<img src="${imgUrl}">`;
}
