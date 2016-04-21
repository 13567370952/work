$(function () {
	pxqh()
	ip()
})
function ip(){
	$(".xdyzt input:checkbox").css({"display":"none"});
	$(".xdyzt input:radio").css({"display":"none"});
	if($(".xdyzt .dz input").attr("checked")){
		 $(".xdyzt .dz label").addClass("yd");
	}
	$(".xdyzt .dzz label").each(function(index){
		$(this).click(function(){
			$(".xdyzt .dz label").removeClass("yd");
			$(".xdyzt .dzz label").removeClass("yd").eq(index).addClass("yd");
		})
	})
	$(".xdyzt .dz label").click(function(){
		$(".xdyzt .dzz label").removeClass("yd");
		$(this).addClass("yd");
	})
	$(".xdyzt .ddbz label").click(function(){
		if($(".xdyzt .ddbz label").hasClass("yd")){
			$(this).removeClass("yd");
		}
		else{
			$(this).addClass("yd");
		}
		return false;
	})
}
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
	$(".fwsczt .an").each(function(index,el){
		$(this).click(function(){
			$(".fwsczt .an").removeClass("active").eq(index).addClass("active");
		})
	})
}