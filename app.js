function openTool(id){

let tools=document.querySelectorAll(".tool");

tools.forEach(t=>{
t.classList.remove("active");
});

document.getElementById(id).classList.add("active");

}

function generateContent(){
let topic=document.getElementById("contentInput").value;

document.getElementById("contentResult").innerText=
"AI content about "+topic;
}

function generateCaption(){
let topic=document.getElementById("captionInput").value;

document.getElementById("captionResult").innerText=
"Amazing caption for "+topic+" ✨";
}

function generateScript(){
let topic=document.getElementById("scriptInput").value;

document.getElementById("scriptResult").innerText=
"Intro: Today we talk about "+topic;
}
