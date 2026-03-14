// PAGE SWITCH

function openPage(id){

document.querySelectorAll(".page").forEach(p=>{

p.classList.remove("active")

})

document.getElementById(id).classList.add("active")

}


// DARK MODE

function toggleTheme(){

document.body.classList.toggle("dark")

}


// CANVAS

const canvas=new fabric.Canvas("canvas")

const brushSlider=document.getElementById("brushSize")


// DRAW MODE

function drawMode(){

canvas.isDrawingMode=true

canvas.freeDrawingBrush.width=parseInt(brushSlider.value)

}


// TEXT

function addText(){

const text=new fabric.IText("Text",{left:100,top:100})

canvas.add(text)

updateLayers()

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

updateLayers()

})

}

reader.readAsDataURL(file)

}

input.click()

}


// EXPORT

function exportPNG(){

const link=document.createElement("a")

link.href=canvas.toDataURL()

link.download="design.png"

link.click()

}


// LAYERS

function updateLayers(){

const list=document.getElementById("layerList")

list.innerHTML=""

canvas.getObjects().forEach((obj,i)=>{

const li=document.createElement("li")

li.innerText=obj.type+" "+i

list.appendChild(li)

})

}

canvas.on("object:added",updateLayers)


// BG REMOVE DEMO

function removeBG(){

alert("AI Background remover needs API")

}


// VIDEO

const videoUpload=document.getElementById("videoUpload")

const videoPlayer=document.getElementById("videoPlayer")

videoUpload.onchange=function(){

const file=this.files[0]

videoPlayer.src=URL.createObjectURL(file)

}


// TIMELINE

const timeline=document.getElementById("timeline")

timeline.oninput=function(){

videoPlayer.currentTime=(videoPlayer.duration*this.value)/100

}


// PLAY

function playVideo(){

videoPlayer.play()

}


// PAUSE

function pauseVideo(){

videoPlayer.pause()

}
