const score= {
best : parseInt(localStorage.getItem("best")) || 0,
value : 0,
    
draw : function(){  
ctx.fillStyle = '#ffffff';
ctx.strokeStyle = '#ffffff';
        
if(state.current == state.startGame){
ctx.lineWidth = 2;
ctx.font = "35px Teko";
ctx.fillText(this.value, 170, 50);
ctx.strokeText(this.value, 170, 50);
}else if(state.current == state.gameOver){

ctx.font = "20px Teko";
ctx.fillText(this.value, 225, 186);
ctx.strokeText(this.value, 225, 186);

ctx.fillText(this.best, 225, 228);
ctx.strokeText(this.best, 225, 228);
}
},
reset : function(){
this.value = 0;
}
}



