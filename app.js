// FIREBASE CONFIG

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

// SIGNUP

function signup(){

let email=document.getElementById("email").value

let password=document.getElementById("password").value

auth.createUserWithEmailAndPassword(email,password)

.then(res=>startApp(res.user))

}

// START APP

function startApp(user){

document.getElementById("loginPage").style.display="none"

document.getElementById("app").style.display="flex"

let name=user.email.split("@")[0]

document.getElementById("username").innerText=name

document.getElementById("welcome").innerText="Hi "+name

}

// LOGOUT

function logout(){

auth.signOut().then(()=>location.reload())

}

// PAGE NAVIGATION

function openPage(id){

document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"))

document.getElementById(id).classList.add("active")

}

// THEME

function toggleTheme(){

document.body.classList.toggle("dark")

}

// IMAGE EDITOR

let canvas = new fabric.Canvas('canvas')

function drawMode(){

canvas.isDrawingMode=true

}

function addText(){

let text=new fabric.IText("Text",{

left:100,
top:100

})

canvas.add(text)

updateLayers()

}

function uploadImage(){

const input=document.createElement("input")

input.type="file"

input.onchange=e=>{

const file=e.target.files[0]

const reader=new FileReader()

reader.onload=function(f){

fabric.Image.fromURL(f.target.result,function(img){

img.scaleToWidth(300)

canvas.add(img)

updateLayers()

})

}

reader.readAsDataURL(file)

}

input.click()

}

function applyFilter(){

let obj=canvas.getActiveObject()

if(!obj) return

obj.filters=[new fabric.Image.filters.Grayscale()]

obj.applyFilters()

canvas.renderAll()

}

function exportPNG(){

let link=document.createElement("a")

link.href=canvas.toDataURL()

link.download="design.png"

link.click()

}

function updateLayers(){

let list="Layers: "

canvas.getObjects().forEach(o=>{

list+=o.type+" "

})

document.getElementById("layers").innerText=list

}

// VIDEO EDITOR

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

let text=prompt("Caption text")

let div=document.createElement("div")

div.innerText=text

document.getElementById("videoCaptions").appendChild(div)

}

// CAPTION EDITOR

function copyCaption(){

let text=document.getElementById("captionText")

text.select()

document.execCommand("copy")

alert("Copied")

}
