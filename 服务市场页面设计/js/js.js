$(function () {
	pxqh()
})
function pxqh(){
	$(".fwsczt .left li").each(function(index){
		$(this).click(function(){
			$(".fwsczt .left li").removeClass("active");
			$(this).addClass("active");
		})
	})
	$(".fwsczt .jg").click(function(){
		if($(".fwsczt .jg").hasClass("active")&&$(".fwsczt .jg").hasClass("s")){
			$(".fwsczt .jg img").attr("src","img/x.png");
			$(".fwsczt .jg").removeClass("s");
		}
		else if($(".fwsczt .jg").hasClass("active")){
			$(".fwsczt .jg img").attr("src","img/s.png");
			$(".fwsczt .jg").addClass("s");
		}
	})
	$(".fwsczt .an").each(function(index){
		$(this).click(function(){
			$(".fwsczt .an").removeClass("active").eq(index).addClass("active");
		})
	})
}