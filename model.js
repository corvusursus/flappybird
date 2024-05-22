
const bird = {
animation : [
{sX: 276, sY : 112},
{sX: 276, sY : 139},
{sX: 276, sY : 164},
{sX: 276, sY : 139}],
x : 50,
y : 150,
w : 34,
h : 26,
radius : 12,
frame : 0,
gravity : 0.25,
jump : 4.0,
speed : 0,
rotation : 0,
    
draw : function(){
let bird = this.animation[this.frame];        
ctx.save();
ctx.translate(this.x, this.y);
ctx.rotate(this.rotation);
ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h,- this.w/2, - this.h/2, this.w, this.h); 


ctx.restore();
},
    
flap : function(){
this.speed =- this.jump;
},
    
update: function(){   
this.period = state.current == state.getReady ? 10 : 5;
this.frame += frames%this.period == 0 ? 1 : 0;
this.frame = this.frame%this.animation.length; 

if(state.current === state.getReady){
this.y = 150;
this.rotation = 0 * DEGREE;
} else{
this.speed += this.gravity;
this.y += this.speed;
            
if(this.y + this.h/2 >= cvs.height - underground.h){
this.y = cvs.height - underground.h - this.h/2;
if(state.current === state.startGame){
state.current = state.gameOver;
DIE.play();
}
}

if(this.speed >= this.jump){
this.rotation = 90 * DEGREE;
this.frame = 1;
} else{
this.rotation = -25 * DEGREE;
}
}
},
speedReset : function(){
this.speed = 0;
}
}


const pipes = {
position : [],
top : {
sX : 553,
sY : 0
},
bottom:{
sX : 502,
sY : 0
},  
w : 53,
h : 400,
gap : 85,
maxYPos : -150,
dx : 2,
    
draw : function(){
for(let i  = 0; i < this.position.length; i++){
let p = this.position[i];           
let topYPos = p.y;
let bottomYPos = p.y + this.h + this.gap;
ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);  
ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);  
}
},
    
update: function(){
if(state.current !== state.startGame) return;
if(frames%100 == 0){
this.position.push({
x : cvs.width,
y : this.maxYPos * ( Math.random() + 1)
});
}
for(let i = 0; i < this.position.length; i++){
let p = this.position[i];          
let bottomPipeYPos = p.y + this.h + this.gap;
            
if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h){
state.current = state.gameOver;
HIT.play();
}

if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h){
state.current = state.gameOver;
HIT.play();
}           
p.x -= this.dx;           
if(p.x + this.w <= 0){
this.position.shift();
score.value += 1;
POINT.play();
score.best = Math.max(score.value, score.best);
localStorage.setItem("best", score.best);
}
}
}, 
reset : function(){
this.position = [];
}   
}
