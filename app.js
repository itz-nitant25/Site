document.addEventListener("DOMContentLoaded",function(){

// PAGES

const dashboard=document.getElementById("dashboard")
const imagePage=document.getElementById("imagePage")
const videoPage=document.getElementById("videoPage")

function showPage(page){

dashboard.classList.remove("active")
imagePage.classList.remove("active")
videoPage.classList.remove("active")

page.classList.add("active")

}

// SIDEBAR BUTTONS

document.getElementById("btnDashboard").onclick=()=>showPage(dashboard)

document.getElementById("btnImage").onclick=()=>showPage(imagePage)

document.getElementById("btnVideo").onclick=()=>showPage(videoPage)

document.getElementById("btnTheme").onclick=()=>{

document.body.classList.toggle("dark")

}


// CANVAS

const canvas=new fabric.Canvas("canvas")

// DRAW

document.getElementById("drawBtn").onclick=function(){

canvas.isDrawingMode=true

}

// TEXT

document.getElementById("textBtn").onclick=function(){

const text=new fabric.IText("Text",{left:100,top:100})

canvas.add(text)

}

// UPLOAD

document.getElementById("uploadBtn").onclick=function(){

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

document.getElementById("exportBtn").onclick=function(){

const link=document.createElement("a")

link.href=canvas.toDataURL()

link.download="design.png"

link.click()

}


// VIDEO

const videoUpload=document.getElementById("videoUpload")
const videoPlayer=document.getElementById("videoPlayer")

videoUpload.onchange=function(){

const file=this.files[0]

videoPlayer.src=URL.createObjectURL(file)

}

document.getElementById("playBtn").onclick=function(){

videoPlayer.play()

}

document.getElementById("pauseBtn").onclick=function(){

videoPlayer.pause()

}

})
