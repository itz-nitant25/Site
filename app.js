// FIREBASE

const firebaseConfig = {

apiKey:"YOUR_FIREBASE_KEY",
authDomain:"YOUR_PROJECT.firebaseapp.com",
projectId:"YOUR_PROJECT"

};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// LOGIN

function login(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

auth.signInWithEmailAndPassword(email,password)

.then(res=>startApp(res.user))

}

function signup(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

auth.createUserWithEmailAndPassword(email,password)

.then(res=>startApp(res.user))

}

function startApp(user){

let name=user.email.split("@")[0]

document.getElementById("username").innerText=name
document.getElementById("welcome").innerText="Hi "+name

}

// LOGOUT

function logout(){

auth.signOut()

document.getElementById("username").innerText="Guest"

}

// NAVIGATION

function openPage(id){

document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"))

document.getElementById(id).classList.add("active")

}

// THEME

function toggleTheme(){

document.body.classList.toggle("dark")

}

// CANVA EDITOR

let canvas=new fabric.Canvas("canvas")

let history=[]
let redoStack=[]

function saveState(){

history.push(JSON.stringify(canvas))

}

canvas.on("object:added",saveState)

function undo(){

if(history.length<2)return

redoStack.push(history.pop())

canvas.loadFromJSON(history[history.length-1])

}

function redo(){

if(!redoStack.length)return

let state=redoStack.pop()

history.push(state)

canvas.loadFromJSON(state)

}

// DRAW

function drawMode(){

canvas.isDrawingMode=true

}

// TEXT

function addText(){

let text=new fabric.IText("Text",{left:100,top:100})

canvas.add(text)

}

// SHAPE

function addRectangle(){

let rect=new fabric.Rect({

left:150,
top:150,
fill:"blue",
width:80,
height:80

})

canvas.add(rect)

}

// UPLOAD IMAGE

function uploadImage(){

const input=document.createElement("input")

input.type="file"

input.onchange=e=>{

const file=e.target.files[0]

const reader=new FileReader()

reader.onload=f=>{

fabric.Image.fromURL(f.target.result,img=>{

img.scaleToWidth(300)

canvas.add(img)

})

}

reader.readAsDataURL(file)

}

input.click()

}

// EXPORT

function exportPNG(){

let link=document.createElement("a")

link.href=canvas.toDataURL()

link.download="design.png"

link.click()

}

// REMOVE BG (demo)

function removeBg(){

alert("Background remover AI requires API")

}

// VIDEO

const videoUpload=document.getElementById("videoUpload")
const videoPlayer=document.getElementById("videoPlayer")

videoUpload.onchange=function(){

const file=this.files[0]

videoPlayer.src=URL.createObjectURL(file)

}

function playVideo(){

videoPlayer.play()

}

function pauseVideo(){

videoPlayer.pause()

}

function addCaption(){

let text=prompt("Caption")

let div=document.createElement("div")

div.innerText=text

document.getElementById("videoCaptions").appendChild(div)

}

// AI CAPTION

async function generateCaption(){

let prompt=document.getElementById("captionPrompt").value

let res=await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer YOUR_OPENAI_KEY"
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[{role:"user",content:"Write social media caption for "+prompt}]

})

})

let data=await res.json()

document.getElementById("captionText").value=data.choices[0].message.content

}
