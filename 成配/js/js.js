$(function(){
	$(".yiji>li").each(function(index){
		$(this).mouseover(function(){
			 $(this).css({color:"#000",background:"#f60"})
			 // $(this).children("ul").animate({height:$(this).children("ul").children().length*30+"px"});
			 $(this).children("ul").slideDown(1000);
			 return false;
		})
		$(this).mouseout(function(index){
			$(this).css({color:"#fff",background:"#125F31"});
			$(this).children("ul").slideUp(1000);
			 // $(this).children("ul").animate({height:"0px"})
		})
	});
	var num = 0;
	$(".dian>li").each(function(index){
		$(this).click(function(){
			$(".dian>li").removeClass("active");
			$(this).addClass("active");
			num = index;
			goside(index);
		})
	})
	$(".fangxiang .zuo").click(function(){
		num--;
		if(num<0){
			num=4;
		}
		goside(num);
		gosidenum(num);
	})
	$(".fangxiang .you").click(function(){
		num++;
		if(num>4){
			num=0;
		}
		goside(num);
		gosidenum(num);
	})
})
function gosidenum(num){
	$(".dian li").removeClass("active").eq(num).addClass("active");
}
function goside(num){
	$(".bannerimg").animate({left:-(num*100)+"%"});
}