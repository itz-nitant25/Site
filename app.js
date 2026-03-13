let canvas
let ctx
let drawing=false

window.onload=function(){

canvas=document.getElementById("canvas")

if(canvas){

ctx=canvas.getContext("2d")

canvas.width=700
canvas.height=400

canvas.addEventListener("mousedown",startDraw)
canvas.addEventListener("mouseup",stopDraw)
canvas.addEventListener("mousemove",draw)

}

let user=localStorage.getItem("user")

if(user){

let data=JSON.parse(user)

startApp(data)

}

}


function login(){

let name=document.getElementById("nameInput").value

let pic=document.getElementById("picInput").value

let user={name:name,pic:pic}

localStorage.setItem("user",JSON.stringify(user))

startApp(user)

}


function startApp(user){

document.getElementById("loginPage").style.display="none"

document.getElementById("app").style.display="block"

document.getElementById("profileName").innerText=user.name

document.getElementById("profilePic").src=user.pic

document.getElementById("welcomeMsg").innerText="Hi "+user.name

openPage("dashboard")

}


function openPage(id){

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active")
})

document.getElementById(id).classList.add("active")

}


function logout(){

localStorage.removeItem("user")

location.reload()

}


function toggleDark(){

document.body.classList.toggle("dark")

}


/* HELP AI */

function helpAI(){

let q=document.getElementById("helpInput").value

document.getElementById("helpResult").innerText="AI: Try using the editor or tools!"

}


/* DRAW */

function drawMode(){
drawing=true
}

function startDraw(e){
drawing=true
ctx.beginPath()
ctx.moveTo(e.offsetX,e.offsetY)
}

function draw(e){

if(!drawing) return

ctx.lineTo(e.offsetX,e.offsetY)

ctx.stroke()

}

function stopDraw(){
drawing=false
}


/* TEXT */

function addText(){

let text=prompt("Enter text")

ctx.font="20px Arial"

ctx.fillText(text,50,50)

}


/* CLEAR */

function clearCanvas(){

ctx.clearRect(0,0,canvas.width,canvas.height)

}
