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
}