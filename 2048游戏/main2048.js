var board = new Array();//4*4的格子
var score = 0;//游戏分数
$(document).ready(function(){
	newgame();
})
function newgame(){
	//初始化棋盘格
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
		for(var j = 0;j<4;j++){
			board[i][j] =0;
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
					top:getPosTop(i,j)+50,
					left:getPosLeft(i,j)+50,
				});
			}else{
				theNumberCell.css({
					width: '100px',
					height: '100px',
					top:getPosTop(i,j),
					left:getPosLeft(i,j),
					backgroundColor:getNumberBackgroundColor(board[i][j]),
					color:getNumberColor(board[i][j]),
				});
				theNumberCell.text(board[i][j]);
			}
		}
	}
}
function generateOneNumber(){
	if(false){
		return false;
	}else{
		//随机一个位置,随机一个数
		var  randx = parseInt(Math.floor(Math.random()*4));
		var  randy = parseInt(Math.floor(Math.random()*4));
		while(true){
			if(board[randx][randy]==0){
				break;
			}else{
				randx = parseInt(Math.floor(Math.random()*4));
		        randy = parseInt(Math.floor(Math.random()*4));
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
			if (moveLeft()) {
				generateOneNumber();
				isgameover();
			}
			break;
		case 38://up
			if (moveUp()) {
				generateOneNumber();
				isgameover();
			}
			break;
		case 39://right
			if (moveRight()) {
				generateOneNumber();
				isgameover();
			}
			break;
		case 40://down
			if (moveDown()) {
				generateOneNumber();
				isgameover();
			}
			break;
		default:
			break;
	}
})
function isgameover(){
	if(nomove(board)){
		gameover();
	}
}
function gameover(){
	console.log("gameover")
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
						}else if(board[k][j] == board[i][j]&&onBlockHorizontalY(i,k,j,board)){
							showMoveAnimation(i,j,k,j);
							board[k][j] += board[i][j];
							score+=board[i][j];
							updateScore(score)
							board[i][j]=0;
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
						}else if(board[k][j] == board[i][j]&&onBlockHorizontalY(k,i,j,board)){
							showMoveAnimation(i,j,k,j);
							board[k][j] += board[i][j];
							score+=board[i][j];
							updateScore(score);
							board[i][j]=0;
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
					}else if(board[i][k]== board[i][j]&&onBlockHorizontal(i,j,k,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						score+=board[i][j];
						updateScore(score);
						board[i][j] = 0;
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
						}else if(board[i][k]== board[i][j]&&onBlockHorizontal(i,k,j,board)){
							//move
							showMoveAnimation(i,j,i,k);
							//add
							board[i][k] += board[i][j];
							score+=board[i][j];
							updateScore(score);
							board[i][j] = 0;
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