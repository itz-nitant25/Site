function showPage(id){

document.querySelectorAll(".page").forEach(p=>{

p.classList.remove("active")

})

document.getElementById(id).classList.add("active")

}


// THEME

function toggleTheme(){

document.body.classList.toggle("dark")

}


// IMAGE EDITOR

const canvas=new fabric.Canvas("canvas")

function enableDraw(){

canvas.isDrawingMode=true

}

function addText(){

const text=new fabric.IText("Text",{left:100,top:100})

canvas.add(text)

}

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

function exportPNG(){

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

function playVideo(){

videoPlayer.play()

}

function pauseVideo(){

videoPlayer.pause()

}
