var radius= 8;
var ml = 10;
var mt = 10;
const endTime = new Date(2016,3,23,18,57,59);//截止时间 月份是从0开始的
var curSeconds = 0;
var balls = [];
var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
var one =1;
var oldhours;
var oldMintues;
var oldSeconds;
window.onload = function(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext("2d");
	setInterval(function(){
		render(context);
		upDate();
	},50);
}
function upDate(){
	
}
function getcurSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime()-curTime.getTime();
	ret = Math.round(ret/1000);//毫秒变秒
	return ret > 0 ? ret : 0;
}
function render(cxt) {
	cxt.clearRect(0,0,1024,768);
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
		if(oldhours!=parseInt(curSeconds/3600)){
			console.log("小时")
			hours=oldhours=parseInt(curSeconds/3600);
		}
		if(oldMintues!=parseInt((curSeconds-hours*3600)/60)){
			console.log("分钟")
			minutes = oldMintues=parseInt((curSeconds-hours*3600)/60);
		}
		if(oldSeconds!=curSeconds%60){
			console.log("秒")
			seconds = oldSeconds = curSeconds%60;
		}
	}
	renderDigit(ml,mt,parseInt(hours/10),cxt)
	renderDigit(ml+15*(radius+1),mt,parseInt(hours%10),cxt)
	renderDigit(ml+30*(radius+1),mt,10,cxt)
	renderDigit(ml+39*(radius+1),mt,parseInt(minutes/10),cxt)
	renderDigit(ml+54*(radius+1),mt,parseInt(minutes%10),cxt)
	renderDigit(ml+69*(radius+1),mt,10,cxt)
	renderDigit(ml+78*(radius+1),mt,parseInt(seconds/10),cxt)
	renderDigit(ml+93*(radius+1),mt,parseInt(seconds%10),cxt)
}	
function renderDigit(x,y,num,cxt){
	 cxt.fillStyle = "rgb(0,102,153)";
	 for(var i = 0;i<digit[num].length;i++){
	 	for(var j = 0;j<digit[num][i].length;j++){
	 		if(digit[num][i][j] == 1){
	 			cxt.beginPath();
	 			cxt.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI);
	 			cxt.closePath();
	 			cxt.fill();
	 		}
	 	}
	 }
}