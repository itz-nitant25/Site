let requests=0

function openTool(id){

document.querySelectorAll(".tool").forEach(t=>{
t.classList.remove("active")
})

document.getElementById(id).classList.add("active")

}

function toggleDark(){
document.body.classList.toggle("dark")
}

function copyText(id){
let text=document.getElementById(id).innerText
navigator.clipboard.writeText(text)
}

function saveUser(){
let name=document.getElementById("usernameInput").value
localStorage.setItem("user",name)
document.getElementById("userName").innerText=name
}

window.onload=function(){
let name=localStorage.getItem("user")
if(name){
document.getElementById("userName").innerText=name
}
}

function askAI(){

let prompt=document.getElementById("prompt").value

document.getElementById("result").innerText="Thinking..."

setTimeout(()=>{
document.getElementById("result").innerText="AI response for "+prompt
requests++
document.getElementById("count").innerText=requests
},1000)

}

function generateContent(){
let p=document.getElementById("contentPrompt").value
document.getElementById("contentResult").innerText="Article about "+p
}

function generateCaption(){
let p=document.getElementById("captionPrompt").value
document.getElementById("captionResult").innerText="Caption for "+p
}

function generateScript(){
let p=document.getElementById("scriptPrompt").value
document.getElementById("scriptResult").innerText="Script for "+p
}

function generateHashtags(){
let p=document.getElementById("hashtagPrompt").value
document.getElementById("hashtagResult").innerText="#"+p+" #viral #trend"
}

function generateEmail(){
let p=document.getElementById("emailPrompt").value
document.getElementById("emailResult").innerText="Subject: "+p
}

function generateBio(){
let p=document.getElementById("bioPrompt").value
document.getElementById("bioResult").innerText="Creator | "+p
}

function generateTitle(){
let p=document.getElementById("titlePrompt").value
document.getElementById("titleResult").innerText="10 Tips about "+p
}

function generateIdeas(){
let p=document.getElementById("ideasPrompt").value
document.getElementById("ideasResult").innerText="Idea: "+p+" tutorial"
}

function generateSummary(){
let p=document.getElementById("summaryPrompt").value
document.getElementById("summaryResult").innerText="Summary: "+p
}

function generateKeywords(){
let p=document.getElementById("keywordsPrompt").value
document.getElementById("keywordsResult").innerText=p+", guide, tutorial"
}

function addText(){

let div=document.createElement("div")

div.className="canvas-item"
div.innerText="Text"

div.style.left="50px"
div.style.top="50px"

makeDrag(div)

canvas.appendChild(div)

}

function addBox(){

let div=document.createElement("div")

div.className="canvas-item"

div.style.width="100px"
div.style.height="100px"
div.style.background="lightblue"

div.style.left="60px"
div.style.top="60px"

makeDrag(div)

canvas.appendChild(div)

}

function addCircle(){

let div=document.createElement("div")

div.className="canvas-item"

div.style.width="100px"
div.style.height="100px"
div.style.borderRadius="50%"
div.style.background="pink"

div.style.left="70px"
div.style.top="70px"

makeDrag(div)

canvas.appendChild(div)

}

function clearCanvas(){
canvas.innerHTML=""
}

function makeDrag(el){

let pos1=0,pos2=0,pos3=0,pos4=0

el.onmousedown=dragMouseDown

function dragMouseDown(e){

pos3=e.clientX
pos4=e.clientY

document.onmouseup=closeDrag
document.onmousemove=elementDrag

}

function elementDrag(e){

pos1=pos3-e.clientX
pos2=pos4-e.clientY

pos3=e.clientX
pos4=e.clientY

el.style.top=(el.offsetTop-pos2)+"px"
el.style.left=(el.offsetLeft-pos1)+"px"

}

function closeDrag(){

document.onmouseup=null
document.onmousemove=null

}

}
