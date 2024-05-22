const state = {
current : 0,
getReady : 0,
startGame : 1,
gameOver : 2
};

const startBtn = {
    x : 120,
    y : 263,
    w : 83,
    h : 29
};

canvas.addEventListener("click", function(event){
switch(state.current){
case state.getReady: state.current = state.startGame;
SWOOSHING.play();
break;

case state.startGame: if(bird.y - bird.radius <= 0) return;
bird.flap();
FLAP.play();
break;

case state.gameOver:
let rect = cvs.getBoundingClientRect();
let clickX = event.clientX - rect.left;
let clickY = event.clientY - rect.top;
            
if(clickX >= startBtn.x && 
clickX <= startBtn.x + startBtn.w &&
clickY >= startBtn.y && 
clickY <= startBtn.y + startBtn.h){
pipes.reset();
bird.speedReset();
score.reset();
state.current = state.getReady;
}
break;
}
});
