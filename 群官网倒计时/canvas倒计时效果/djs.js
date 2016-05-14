var radiusx=10;
var ml;
var mt=0;
var ww;
var wh;
const endTime = new Date(2016,4,17,19,04,45);//截止时间 月份是从0开始的
var curSeconds = 0;
var ballsx = [];
var balls = [];
var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
var one =1;
var oldhours;
var oldMintues;
var oldSeconds;
window.onload = function(){
	ww = document.body.clientWidth;
	wh = document.body.clientHeight; 
	ml  = Math.round(ww/10);
	radiusx = 10;
	var canvas = document.getElementById('canvas');
	canvas.width =ww;
	canvas.height = wh;
	var context = canvas.getContext("2d");
	for(var i = 0;i<200;i++){
			var R = Math.floor(Math.random()*225);
			var G = Math.floor(Math.random()*225);
			var B = Math.floor(Math.random()*225);
			var radius = Math.random()*4+2;
			var aBall = {
				color:"rgba("+255+","+255+","+255+","+0.2+")",
				radius:radius,
				x:Math.random()*(canvas.width-2*radius)+radius,
				y:Math.random()*(canvas.height-2*radius)+radius,
				vx:(Math.random()*5+5)*Math.pow(-1,Math.floor(Math.random()*100)),
				vy:(Math.random()*5+5)*Math.pow(-1,Math.floor(Math.random()*100))
			}
			balls[i] = aBall;
	}
	setInterval(function(){
		render(context);
		upDate(context);
	},50);
	ctblue(context);
}
function ctblue(cxt){
	var linearGrad  = cxt.createLinearGradient(0,0,0,cxt.canvas.height);
	linearGrad.addColorStop(0.0,"#C8E9DB");
	linearGrad.addColorStop(1.0,"#51A3C5");
	cxt.fillStyle = linearGrad;
	cxt.fillRect(0,0,cxt.canvas.width,cxt.canvas.height);
}
function upDate(cxt){
	updateBallsx();
	draw(cxt);
	updatex(cxt.canvas.width,cxt.canvas.height)
}
function updateBallsx(){
	for(var i = 0;i<ballsx.length;i++){
		ballsx[i].x+=ballsx[i].vx;
		ballsx[i].y+=ballsx[i].vy;
		ballsx[i].vy+=ballsx[i].g;
		if(ballsx[i].y>=wh-radiusx){
			ballsx[i].y=wh-radiusx;
			ballsx[i].vy = -ballsx[i].vy*0.65;
		}
	}
	var cnt = 0;
	for (var i = 0; i < ballsx.length; i++) {
		if(ballsx[i].x+radiusx>0&&ballsx[i].x-radiusx<ww){
			ballsx[cnt++]=ballsx[i];
		}
	}
	while(ballsx.length>Math.min(500,cnt)){
		ballsx.pop();
	}
}
function getcurSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime()-curTime.getTime();
	ret = Math.round(ret/1000);//毫秒变秒
	return ret > 0 ? ret : 0;
}
function render(cxt) {
	cxt.clearRect(0,0,ww,wh);
	ctblue(cxt);
	curSeconds = getcurSeconds();
	if(one == 1){
		 hours =parseInt(curSeconds/3600);
		 minutes = parseInt((curSeconds-hours*3600)/60);
		 seconds = curSeconds%60;
		 oldhours =hours;
		 oldMintues =minutes;
		 oldSeconds = seconds;
		 one=2;
	}else{
		if(parseInt(oldhours/10)!=parseInt(curSeconds/3600/10)){
			addBalls(ml,mt,parseInt(oldhours/10));
		}
		if(parseInt(oldhours%10)!=parseInt((curSeconds/3600)%10)){
			addBalls(ml+30*(radiusx+1),mt,parseInt(oldhours%10));
			hours=oldhours=parseInt(curSeconds/3600);
		}
		if(parseInt(oldMintues/10)!=parseInt((curSeconds-hours*3600)/60/10)){
			addBalls(ml+39*(radiusx+1),mt,parseInt(oldMintues/10));
		}
		if(parseInt(oldMintues%10)!=parseInt(((curSeconds-hours*3600)/60)%10)){
			addBalls(ml+54*(radiusx+1),mt,parseInt(oldMintues%10));
			minutes = oldMintues=parseInt((curSeconds-hours*3600)/60);
		}
		if(parseInt(oldSeconds/10)!=parseInt((curSeconds%60)/10)){
			addBalls(ml+78*(radiusx+1),mt,parseInt(oldSeconds/10));
		}
		if(parseInt(oldSeconds%10)!=parseInt((curSeconds%60)%10)){
			addBalls(ml+93*(radiusx+1),mt,parseInt(oldSeconds%10));
			seconds = oldSeconds = curSeconds%60;
		}
	}
	renderDigit(ml,mt,parseInt(hours/10),cxt)
	renderDigit(ml+15*(radiusx+1),mt,parseInt(hours%10),cxt)
	// renderDigit(ml+30*(radiusx+1),mt,10,cxt)
	renderDigit(ml+39*(radiusx+1),mt,parseInt(minutes/10),cxt)
	renderDigit(ml+54*(radiusx+1),mt,parseInt(minutes%10),cxt)
	// renderDigit(ml+69*(radiusx+1),mt,10,cxt)
	renderDigit(ml+78*(radiusx+1),mt,parseInt(seconds/10),cxt)
	renderDigit(ml+93*(radiusx+1),mt,parseInt(seconds%10),cxt)
	for(var i = 0; i<ballsx.length;i++){
		cxt.fillStyle=ballsx[i].color;
		cxt.beginPath();
		cxt.arc(ballsx[i].x,ballsx[i].y,radiusx,0,2*Math.PI,true);
		cxt.closePath();
		cxt.fill();
	}
}	
function addBalls(x,y,num){
	for(var i = 0;i<digit[num].length;i++){
		for(var j = 0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				var aBall ={
					x:x+j*2*(radiusx+1)+(radiusx+1),
					y:y+i*2*(radiusx+1)+(radiusx+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				ballsx.push(aBall);
			}
		}
	}
}
function renderDigit(x,y,num,cxt){
	 cxt.fillStyle = "rgb(0,102,153)";
	 for(var i = 0;i<digit[num].length;i++){
	 	console.log(digit[10].length)
	 	for(var j = 0;j<digit[num][i].length;j++){
	 		if(digit[num][i][j] == 1){
	 			cxt.beginPath();
	 			cxt.arc(x+j*2*(radiusx+1)+(radiusx+1),y+i*2*(radiusx+1)+(radiusx+1),radiusx,0,2*Math.PI);
	 			cxt.closePath();
	 			cxt.fill();
	 		}
	 	}
	 }
}
function draw(cxt){
		// cxt.clearRect(0,0,canvas.width,canvas.height);
		for(var i = 0;i<balls.length;i++){
			// cxt.globalCompositeOperation = "xor";
			cxt.fillStyle = balls[i].color;
			cxt.beginPath();
			cxt.arc(balls[i].x,balls[i].y,balls[i].radius,0,Math.PI*2);
			cxt.closePath();
			cxt.fill();
		}
	}
	function updatex(canvasWidth,canvasHeight){
		for(var i = 0;i<balls.length;i++){
			balls[i].x+=balls[i].vx;
			balls[i].y+=balls[i].vy;
			if((balls[i].x-balls[i].radius)<0){
				balls[i].vx = -balls[i].vx;
				balls[i].x = balls[i].radius;
			}
			if((balls[i].y-balls[i].radius)<0){
				balls[i].vy = -balls[i].vy;
				balls[i].y = balls[i].radius;
			}
			if((balls[i].x+balls[i].radius)>=canvasWidth){
				balls[i].vx=-balls[i].vx;
				balls[i].x=canvasWidth-balls[i].radius;
			}
			if((balls[i].y+balls[i].radius)>=canvasHeight){
				balls[i].vy=-balls[i].vy;
				balls[i].y = canvasHeight-balls[i].radius;
			}
		}
	}