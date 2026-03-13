// FIREBASE

const firebaseConfig = {

apiKey:"YOUR_FIREBASE_KEY",
authDomain:"YOUR_PROJECT.firebaseapp.com",
projectId:"YOUR_PROJECT"

};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

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

document.getElementById("loginPage").style.display="none"
document.getElementById("app").style.display="flex"

let name=user.email.split("@")[0]

document.getElementById("username").innerText=name
document.getElementById("welcome").innerText="Hi "+name

}

// NAVIGATION

function showPage(id){

document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"))

document.getElementById(id).classList.add("active")

}

// LOGOUT

function logout(){

auth.signOut().then(()=>location.reload())

}

// DARK MODE

function toggleDark(){

document.body.classList.toggle("dark")

}

// FABRIC CANVAS

let canvas = new fabric.Canvas('canvas')

function addText(){

let text=new fabric.IText("Your Text",{

left:100,
top:100

})

canvas.add(text)

updateLayers()

}

function drawMode(){

canvas.isDrawingMode=true

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

function grayscale(){

let obj=canvas.getActiveObject()

if(!obj) return

obj.filters=[new fabric.Image.filters.Grayscale()]

obj.applyFilters()

canvas.renderAll()

}

function exportPNG(){

let url=canvas.toDataURL()

let link=document.createElement("a")

link.href=url
link.download="design.png"

link.click()

}

// LAYERS

function updateLayers(){

let list="Layers: "

canvas.getObjects().forEach((obj,i)=>{

list += obj.type+" "

})

document.getElementById("layers").innerText=list

}

// AI IMAGE

async function generateImage(){

let prompt=document.getElementById("prompt").value

let res=await fetch("https://api.openai.com/v1/images/generations",{

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

})

let data=await res.json()

document.getElementById("result").innerHTML=

`<img src="${data.data[0].url}" width="400">`

}
