var board = new Array();//4*4的格子
var score = 0;//游戏分数
$(document).ready(function(){
	newgame();
})
function newgame(){
	//初始化棋盘格
	init();
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
			board[i][j] =128;
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