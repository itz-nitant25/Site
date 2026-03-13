// FIREBASE CONFIG
const firebaseConfig = {
apiKey:"YOUR_FIREBASE_KEY",
authDomain:"YOUR_PROJECT.firebaseapp.com",
projectId:"YOUR_PROJECT",
appId:"YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// GOOGLE LOGIN
function googleLogin(){

auth.signInWithPopup(provider)
.then(res=>{

const user=res.user;

document.getElementById("profileName").innerText=user.displayName;

document.getElementById("profilePic").src=user.photoURL;

document.getElementById("welcomeMsg").innerText="Hi "+user.displayName;

document.getElementById("loginPopup").style.display="none";

})

}

// LOGOUT
function logout(){

auth.signOut().then(()=>{

location.reload()

})

}

// FREE TRIAL TIMER

setTimeout(()=>{

document.getElementById("loginPopup").style.display="flex"

},120000)

// NAVIGATION

function openPage(id){

document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"))

document.getElementById(id).classList.add("active")

}

// DARK MODE

function toggleDark(){

document.body.classList.toggle("dark")

}

// CANVAS

let canvas=document.getElementById("canvas")

let ctx

let drawing=false

window.onload=()=>{

canvas=document.getElementById("canvas")

ctx=canvas.getContext("2d")

canvas.width=canvas.offsetWidth

canvas.height=500

canvas.onmousedown=e=>{

drawing=true

ctx.beginPath()

ctx.moveTo(e.offsetX,e.offsetY)

}

canvas.onmousemove=e=>{

if(!drawing)return

ctx.lineTo(e.offsetX,e.offsetY)

ctx.stroke()

}

canvas.onmouseup=()=>{

drawing=false

}

}

// DRAW TOOL
function drawMode(){}

// TEXT

function addText(){

let text=prompt("Enter text")

ctx.font="24px Arial"

ctx.fillText(text,100,100)

}

// UPLOAD IMAGE

function uploadImage(){

const input=document.createElement("input")

input.type="file"

input.onchange=e=>{

const file=e.target.files[0]

const img=new Image()

img.src=URL.createObjectURL(file)

img.onload=()=>{

ctx.drawImage(img,0,0,canvas.width,canvas.height)

}

}

input.click()

}

// EXPORT

function exportPNG(){

const link=document.createElement("a")

link.download="design.png"

link.href=canvas.toDataURL()

link.click()

}

// AI IMAGE

async function generateAIImage(){

document.getElementById("loginPopup").style.display="flex"

}
