function enterSite(){document.getElementById('intro').style.display='none'}

// MATRIX RESPONSIVE
const canvas=document.getElementById('matrix');
const ctx=canvas.getContext('2d');

function resizeCanvas(){
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
}
resizeCanvas();
window.addEventListener("resize",resizeCanvas);

const letters="01";
const fontSize=16;
let columns=canvas.width/fontSize;
let drops=[];

function initMatrix(){
columns=canvas.width/fontSize;
drops=[];
for(let x=0;x<columns;x++)drops[x]=1;
}
initMatrix();
window.addEventListener("resize",initMatrix);

function draw(){
ctx.fillStyle="rgba(0,0,0,0.15)";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle="#00ff00";
ctx.font=fontSize+"px monospace";
for(let i=0;i<drops.length;i++){
const text=letters.charAt(Math.floor(Math.random()*letters.length));
ctx.fillText(text,i*fontSize,drops[i]*fontSize);
if(drops[i]*fontSize>canvas.height&&Math.random()>0.975)drops[i]=0;
drops[i]++;
}}
setInterval(draw,45);

// LSB DEMO
const grid=document.getElementById('pixelGrid');
let originalValue=182;
let currentValue=182;

function updateDisplay(){
document.getElementById('originalDecimal').textContent=originalValue;
document.getElementById('originalBinary').textContent=originalValue.toString(2).padStart(8,'0');
document.getElementById('modifiedDecimal').textContent=currentValue;
document.getElementById('modifiedBinary').textContent=currentValue.toString(2).padStart(8,'0');
}

for(let i=0;i<64;i++){
const div=document.createElement('div');
div.classList.add('pixel');
div.addEventListener('click',()=>{
div.classList.toggle('active');
if(currentValue%2===0){currentValue++}else{currentValue--}
updateDisplay();
});
grid.appendChild(div);
}
updateDisplay();

// SCROLL
window.addEventListener('scroll',()=>{
const winScroll=document.documentElement.scrollTop;
const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
const scrolled=(winScroll/height)*100;
document.getElementById('progress').style.width=scrolled+"%";
document.body.style.background=`rgb(${2+scrolled/5}, ${4+scrolled/3}, ${10+scrolled/2})`;

const sections=document.querySelectorAll('section');
sections.forEach(sec=>{
const rect=sec.getBoundingClientRect();
if(rect.top<window.innerHeight-100){sec.classList.add('visible')}
})
});