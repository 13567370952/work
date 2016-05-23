var board = new Array();//4*4的格子
var score = 0;//游戏分数
var hasConfliced = new Array();
//用于手机触控的变量
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
$(document).ready(function(){
	documentWidth = window.screen.availWidth;//当前设备可以使用的宽度
	gridContainerWidth = 0.92*documentWidth;//游戏大方块的宽度
	cellSideLength = 0.18*documentWidth;//每个小方块的宽度
	cellSpace = 0.04*documentWidth;//间距
	prepareForMobile();//移动端
	newgame();
})
function prepareForMobile(){
	if(documentWidth>500){
		gridContainerWidth=500;
		cellSideLength =100;
		cellSpace = 20;
	}
	$("#grid-container").css({
		"width":gridContainerWidth-2*cellSpace,
		 "height":gridContainerWidth-2*cellSpace,
		 "padding":cellSpace,
		 "border-radius":gridContainerWidth*0.02
	});
	$(".grid-cell").css({
		"width":cellSideLength,
		"height":cellSideLength,
		"border-radius":0.02*cellSideLength
	})
}
function newgame(){
	//初始化棋盘格
	$("#score").text(0);
	init();
	//随机两个生成两个数字
	generateOneNumber();
	generateOneNumber();
}
function init(){
	for(var i = 0;i<4;i++){
		for(var j = 0;j<4;j++){
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css({
				top:getPosTop(i,j),
				left:getPosLeft(i,j)
			});
		}
	}
	//初始化board数组 让它们的数字为0
	for(var i = 0;i<4;i++){
		board[i] = new Array();
		hasConfliced[i] = new Array;
		for(var j = 0;j<4;j++){
			board[i][j] =0;
			hasConfliced[i][j] = false;
		}
	}
	updataBoardView();
}
function updataBoardView(){
	$(".number-cell").remove();
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $("#number-cell-"+i+"-"+j);
			if (board[i][j] == 0) {
				theNumberCell.css({
					width: '0px',
					height: '0px',
					top:getPosTop(i,j)+cellSideLength/2,
					left:getPosLeft(i,j)+cellSideLength/2,
				});
			}else{
				theNumberCell.css({
					width: cellSideLength,
					height: cellSideLength,
					top:getPosTop(i,j),
					left:getPosLeft(i,j),
					backgroundColor:getNumberBackgroundColor(board[i][j]),
					color:getNumberColor(board[i][j]),
				});
				theNumberCell.text(board[i][j]);
			}
			hasConfliced[i][j] = false;
			if(board[i][j]>512){
				$(".number-cell").css({
					"line-height":cellSideLength+"px",
					"font-size":0.4*cellSideLength+"px"
				});
			}else{
				$(".number-cell").css({
					"line-height":cellSideLength+"px",
					"font-size":0.4*cellSideLength+"px"
				});
			}
		}
	}
}
function generateOneNumber(){
	for(var i = 0;i<4;i++){
		for(var j = 0;j<4;j++){
			if(board[i][j]>512){
				$("#number-cell-"+i+"-"+j).css({
					"font-size":0.4*cellSideLength+"px"
				})
			}else{
				$("#number-cell-"+i+"-"+j).css({
					"font-size":0.4*cellSideLength+"px"
				})
			}
		}
	}
	if(false){
		return false;
	}else{
		//随机一个位置,随机一个数
		var  randx = parseInt(Math.floor(Math.random()*4));
		var  randy = parseInt(Math.floor(Math.random()*4));
		var times = 0;
		while(times<50){
			if(board[randx][randy]==0){
				break;
			}else{
				randx = parseInt(Math.floor(Math.random()*4));
		        randy = parseInt(Math.floor(Math.random()*4));
			}
			times++;
		}
		if(times==50){
			for(var i = 0;i<4;i++){
				for(var j = 0;j<4;j++){
					if(board[i][j] == 0){
						randx = i;
						randy = j;
					}
				}
			}
		}
		var randNumber = Math.random()<0.5?2:4;
		board[randx][randy] = randNumber;
		showNumberWithAnimation(randx,randy,randNumber);
		return true;
	}
}
$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://LEFT
		event.preventDefault();//阻止事件发生默认效果
			if (moveLeft()) {
				generateOneNumber();
				isgameover();
			}
			break;
		case 38://up
		event.preventDefault();//阻止事件发生默认效果
			if (moveUp()) {
				generateOneNumber();
				isgameover();
			}
			break;
		case 39://right
		event.preventDefault();//阻止事件发生默认效果
			if (moveRight()) {
				generateOneNumber();
				isgameover();
			}
			break;
		case 40://down
		event.preventDefault();//阻止事件发生默认效果
			if (moveDown()) {
				generateOneNumber();
				isgameover();
			}
			break;
		default:
			break;
	}
});
//添加监听器
document.addEventListener("touchstart",function(event){
	startx =event.touches[0].pageX;
	starty =event.touches[0].pageY;
});
document.addEventListener("touchmove",function(event){
	event.preventDefault();
});
document.addEventListener("touchend",function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;
	var deltax = endx - startx;
	var deltay = endy - starty;
	//判断是否滑动了
	if(Math.abs(deltax)<0.3*documentWidth&&Math.abs(deltay)<0.3*documentWidth){
		return;
	}
	//x 
	if(Math.abs(deltax)>=Math.abs(deltay)){
		if (deltax>0) {
			if (moveRight()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",310)
			}
		}else{
			if (moveLeft()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",310)
			}
		}
	}else{//y
		if(deltay>0){
			if (moveDown()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",310)
			}
		}else{
			if (moveUp()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",310)
			}
		}
	}
});
function isgameover(){
	if(nomove(board)){
		gameover();
	}
}
function gameover(){
	alert("gameover,你的最终得分是"+score);
}
function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}else{
		for(var i=2;i>=0;i--){
			for(var j=0;j<4;j++){
				if(board[i][j]!=0){
					for(var k=3;k>i;k--){
						if(board[k][j] == 0&&onBlockHorizontalY(i,k,j,board)){
							showMoveAnimation(i,j,k,j);
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[k][j] == board[i][j]&&onBlockHorizontalY(i,k,j,board)&&!hasConfliced[k][j]){
							showMoveAnimation(i,j,k,j);
							board[k][j] += board[i][j];
							score+=board[i][j];
							updateScore(score);
							board[i][j]=0;
							hasConfliced[k][j] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout("updataBoardView()",200 );
		return true;
	}
}
function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}else{
		for(var i = 1;i<4;i++){
			for(var j = 0;j<4;j++){
				if(board[i][j]!=0){
					for(var k = 0 ;k<i;k++){
						if(board[k][j]==0&&onBlockHorizontalY(k,i,j,board)){
							showMoveAnimation(i,j,k,j);
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[k][j] == board[i][j]&&onBlockHorizontalY(k,i,j,board)&&!hasConfliced[k][j]){
							showMoveAnimation(i,j,k,j);
							board[k][j] += board[i][j];
							score+=board[i][j];
							updateScore(score);
							board[i][j]=0;
							hasConfliced[k][j] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout("updataBoardView()",200 );
		return true;
	}
}
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}else{
		for(var i = 0;i<4;i++){
			for(var j=2;j>=0;j--){
				if(board[i][j]!=0){
				for(var k = 3;k>j;k--){
					if(board[i][k]==0&&onBlockHorizontal(i,j,k,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k]== board[i][j]&&onBlockHorizontal(i,j,k,board)&&!hasConfliced[i][k]){
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						score+=board[i][j];
						updateScore(score);
						board[i][j] = 0;
						hasConfliced[i][k] = true;
						continue;
					}
				}
			}
			}
		}
		setTimeout("updataBoardView()",200 );
		return true;
	}
}
function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}else{
		for(var i = 0;i<4;i++){
			for(var j = 1;j<4;j++){
				if(board[i][j]!=0){
					for(var k = 0 ;k<j;k++){
						if(board[i][k]==0 && onBlockHorizontal(i,k,j,board)){
							//move
							showMoveAnimation(i,j,i,k);
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[i][k]== board[i][j]&&onBlockHorizontal(i,k,j,board)&&!hasConfliced[i][k]){
							//move
							showMoveAnimation(i,j,i,k);
							//add
							board[i][k] += board[i][j];
							score+=board[i][j];
							updateScore(score);
							board[i][j] = 0;
							hasConfliced[i][k] = true;
							continue;
						}
					}
				}
			}
		}
		setTimeout("updataBoardView()", 200 );
		return true;
	}
}