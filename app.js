/* FIREBASE CONFIG */

const firebaseConfig = {
apiKey: "PASTE_KEY",
authDomain: "PASTE_DOMAIN",
projectId: "PASTE_ID",
appId: "PASTE_APP"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

/* AUTH */

function signup(){

let email=document.getElementById("email").value
let pass=document.getElementById("password").value

auth.createUserWithEmailAndPassword(email,pass)

}

function login(){

let email=document.getElementById("email").value
let pass=document.getElementById("password").value

auth.signInWithEmailAndPassword(email,pass)

}

function googleLogin(){

let provider=new firebase.auth.GoogleAuthProvider()

auth.signInWithPopup(provider)

}

function logout(){

auth.signOut()

}

auth.onAuthStateChanged(user=>{

if(user){

document.getElementById("loginPage").style.display="none"

document.getElementById("dashboard").style.display="block"

document.getElementById("userEmail").innerText=user.email

}else{

document.getElementById("loginPage").style.display="block"

}

})

/* UI */

function openTool(id){

document.querySelectorAll(".tool").forEach(t=>{
t.style.display="none"
})

document.getElementById(id).style.display="block"

}

function toggleDark(){

document.body.classList.toggle("dark")

}

/* COPY */

function copyText(id){

let text=document.getElementById(id).innerText

navigator.clipboard.writeText(text)

}

/* AI */

let requests=0

function askAI(){

let prompt=document.getElementById("prompt").value

document.getElementById("result").innerText="Thinking..."

setTimeout(()=>{

document.getElementById("result").innerText="AI response for "+prompt

requests++

document.getElementById("requestCount").innerText=requests

},1000)

}

/* TOOLS */

function generateContent(){

let p=document.getElementById("contentPrompt").value

document.getElementById("contentResult").innerText="Article about "+p

}

function generateCaption(){

let p=document.getElementById("captionPrompt").value

document.getElementById("captionResult").innerText="🔥 Caption for "+p

}

function generateHashtags(){

let p=document.getElementById("hashtagPrompt").value

document.getElementById("hashtagResult").innerText="#"+p+" #viral #trend"

}

/* EDITOR */

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
