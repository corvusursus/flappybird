const cvs = document.getElementById("canvas");  
const ctx = cvs.getContext("2d");
let frames = 0;
const DEGREE = Math.PI/180;
const sprite = new Image();
sprite.src = "./image/spritesheet.jpg";
const scoresMock = {
bestScore: 123,
};


const background = {
sX : 0,
sY : 0,
w : 275,
h : 226,
x : 0,
y : 254,
    
draw : function(){
ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h); 
ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
}
};

const underground = {
sX: 276,
sY: 0,
w: 224,
h: 112,
x: 0,
y: 368,
dx : 2,
draw : function(){
ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
},  
update : function(){
if(state.current === state.startGame){
this.x = (this.x - this.dx)%(this.w/2);
}
}
};

const getReady = {
sX : 0,
sY : 228,
w : 173,
h : 152,
x : 84,
y : 80,
    
draw: function(){
if(state.current === state.getReady){
ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
}
}   
}

const gameOver = {
sX : 175,
sY : 228,
w : 225,
h : 202,
x : 58,
y : 90,
    
draw: function(){
if(state.current === state.gameOver){
ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);}
}
};

function draw(){
ctx.fillStyle = "#48b6c2";
ctx.fillRect(0, 0, 340, 480);
background.draw();
pipes.draw();
underground.draw();
bird.draw();
getReady.draw();
gameOver.draw();
score.draw(ctx);
}

function update(){
bird.update();
underground.update();
pipes.update();
}

function loop(){
update();
draw();
frames++;
requestAnimationFrame(loop);
}
sprite.onload = function() {
loop(); 
};
