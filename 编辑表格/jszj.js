
function px() {
		$("tbody").each(function(index) {
			$("tbody .xh").eq(index).html(index+1);
		});
}
function tj() {
		$(".cz .tj").bind("click",function(){
		var $clone = $(this).parents("tbody").clone();
		$(this).parents("tbody").after($clone);
	})
}
$(function(){
        xbqh();
        px();
})
function xbqh(){
	$(".xb").bind("click",function(){
		$(".xb h3 span").removeClass("active");
		$(".xb h3").css({"display":"none"});
		$(".xb ul").css({"display":"none"});
		$(this).find('h3').css({"display":"block"});
		$(this).find('ul').css({"display":"block"});
		event.stopPropagation(); 
	})
	$(".xb h3 span").bind("click",function(){
		if($(this).hasClass('active')){
			$(this).parent().siblings('ul').css({"display":"block"});
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
			$(this).parent().siblings('ul').css({"display":"none"});
		}
		return false;
	})
	$(".xb ul li").bind("click",function(){
		$(".xb h3 span").addClass("active");
		$(this).parent().find("li").removeClass("active");
		$(this).addClass('active');
		$(this).parent().css({"display":"none"});
		event.stopPropagation();
		$(this).parent().siblings('h3').find('.c').html($(this).html());
		$(this).parent().parent().find(".a").html($(this).html());
	});
	$("body").bind("click",function(){
		$("body .xb h3").css({"display":"none"});
		$("body .xb ul").css({"display":"none"});
	})
	
	$(".cz .sc").bind("click",function(){
		 $(this).parents("tbody").remove();
		 px();
	})
}