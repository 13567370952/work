$(function(){
	$("body").on("click",".menuleft li",function(){
		$(".active").removeClass("active");
		$(this).addClass("active");
		numeName();
		 return false;
	})
	$("#btnAdd1").bind("click",function(){
		$(".active").removeClass("active");
		$(this).siblings("ul").append("<li class='active'><span>菜单名称</span><ul class='menugroupTwo'></ul><div class='btngroup btntwo'><span class='demoSpan1'></span></div></li>");
		menugroupOneWidth($(this).siblings("ul").children().length);
		twoWith()
		twoTop();
		numeName();
	})
	$("body").on("click",".btntwo",function(){
		$(".active").removeClass("active");
		$(this).addClass("active");
		$(this).siblings("ul").append("<li class='active'><span>菜单名称</span></li>");
		twoTop();
		if($(this).siblings("ul").children("li").length==5){
			$(this).hide();
		}
		numeName();
		return false;
	})
	$(".menuright .left input").focus(function(){
		$(this).css({"border":"1px solid #3498DB"});
	})
	$(".menuright .left input").blur(function(){
		$(this).css({"border":"1px solid #ccc"});
	});
	numeName();
	twoWith();
	twoTop();
})
//主菜单的宽度
function menugroupOneWidth(length){
	switch(length){
		case 0:
		break;
		case 1:
		$("#menugroupOne>li").css({"width":"294px"});
		break;
		case 2:
		$("#menugroupOne>li").css({"width":"146px"});
		break;
		case 3:
		$("#btnAdd1").hide();
		$("#menugroupOne>li").css({"width":"142px"});
	}
}
//二级菜单的宽度
function twoWith(){
	var btntwoWidth=$(".btntwo").parent().width();
	// var top = $(".menugroupTwo").children().length*44;
	$(".btntwo").css({
		"width":(btntwoWidth-16)+"px",
	});
	$(".menugroupTwo").css({
		"width":(btntwoWidth-14)+"px",
		});
}
//二级菜单的宽度
function twoTop(){
	$(".menugroupTwo").each(function(){
		topNum = $(this).children("li").length*44;
		$(this).css({
			"top":-(topNum+16)+"px"
		})
		$(this).siblings(".btntwo").css({
			"top":-(topNum+60)+"px"
		})
		if($(this).children("li").length==0){
			$(this).siblings(".btntwo").css({
			"top":-(topNum+54)+"px"
			})
		}
	})
}
//右边 菜单名称级别的编写
function numeName(){
	if($(".active").parent().hasClass("menugroupTwo")){
		$(".numeGrade").html("二级菜单");
	}else{
		$(".numeGrade").html("一级菜单");
	}
	$(".numeName").html($(".active span").html());
}