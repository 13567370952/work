window.onload = function(){
	var canvas = document.getElementById("canvas");
	// javascript中修改canvas尺寸
	// canvas.width=1024;
	// canvas.height=768;
	//判断浏览器是否支持canvas
	if(canvas.getContext("2d")){
		var context  = canvas.getContext("2d");
	}else{
		alert("当前浏览器不支持canvas,请更换浏览器后再试!");
	}
	context.beginPath();//开始
	context.moveTo(100,100);
	context.lineTo(700,700);
	context.lineTo(100,700);
	context.lineTo(100,100);
	context.closePath()//结束
	context.lineWidth=2;//宽度
	context.strokeStyle = "#ff0000";//颜色
	context.fillStyle= "#000";
	context.fill();
	context.stroke();//绘制线条
	context.beginPath();
	context.moveTo(200,100);
	context.lineTo(300,200);
	context.lineTo(400,100);
	context.lineTo(200,100);
	context.closePath();
	context.lineWidth= 3;
	context.strokeStyle = "#ccc";
	context.fillStyle = "black";
	context.fill();
	context.stroke();
    context.beginPath();
    context.strokeStyle = "red";
    context.lineWidth = 5;
    // context.arc(300,200,200,0.3*Math.PI,1.5*Math.PI);
    context.arc(300,200,200,0*Math.PI,0.5*Math.PI,true);
    context.closePath();
    context.stroke();
    context.strokeStyle = "#000";
    context.lineWidth = 5;
    context.fillStyle = "red";
    for(var i = 0 ;i<10;i++){
    	context.beginPath();
    	context.arc(50+i*100,60,40,0,2*(i+1)*Math.PI/10);
    	context.stroke();
    	context.fill();
    	context.closePath();
    }
}