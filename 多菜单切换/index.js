var data=[{
	id:"1",
	name:"菜单1",
	action:"1",
	link:"www.baidu.com",
	module:"我也不知道填什么好",
	menu:[{
		id:"1-2",
		name:"菜单1-2",
		action:"1",
		link:"www.baidu.com",
		module:"我也不知道填什么好"
	},{
		id:"1-2",
		name:"菜单1-2",
		action:"1",
		link:"www.baidu.com",
		module:"我也不知道填什么好"
	},{
		id:"1-3",
		name:"菜单1-3",
		action:"1",
		link:"www.baidu.com",
		module:"我也不知道填什么好"
	},{
		id:"1-4",
		name:"菜单1-4",
		action:"1",
		link:"www.baidu.com",
		module:"我也不知道填什么好"
	}]
},{
	id:"2",
	name:"菜单2",
	action:"1",
	link:"www.baidu.com",
	module:"我也不知道填什么好",
	menu:[{
		id:"2-1",
		name:"菜单2-1",
		action:"1",
		link:"www.baidu.com",
		module:"我也不知道填什么好"
	},{
		id:"2-2",
		name:"菜单2-2",
		action:"1",
		link:"www.baidu.com",
		module:"我也不知道填什么好"
	},{
		id:"2-3",
		name:"菜单2-3",
		action:"1",
		link:"www.baidu.com",
		module:"我也不知道填什么好"
	},{
		id:"2-4",
		name:"菜单2-4",
		action:"1",
		link:"www.baidu.com",
		module:"我也不知道填什么好"
	}]
}]
$(function(){
	$("body").on("click",".menuleft li",function(){
		$(".active").removeClass("active");
		$(this).addClass("active");
		numeName();
		resetName();
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
		resetName();
		return false;
	})
	$(".menuright .left input").focus(function(){
		$(this).css({"border":"1px solid #3498DB"});
	})
	$(".menuright .left input").click(function(){
		return false;
	})
	$(".menuright .left input").blur(function(){
		$(this).css({"border":"1px solid #ccc"});
		return false;
	});
	//重命名
	$(".rename").bind("click",function(){
		$(this).hide();
		$(".save").show();
		$(".numeName").hide();
		$(".inputName").show();
		return false;
	});
	$(".save").bind("click",function(){
		$(this).hide();
		$(".rename").show();
		$(".inputName").hide();
		$(".active span").eq(0).html($(".inputName").val());
		numeName();
		$(".numeName").show();
		return false;
	});
	$("body").bind("click",function(){
		resetName();
	})
	$(".remove").bind("click",function(){
		$(".active").remove();
		menugroupOneWidth($("#menugroupOne").children().length);
		twoWith();
		twoTop();
	});
	josnHtml();
	numeName();
	twoWith();
	twoTop();
})
//根据josn控制HTML结构
function josnHtml(){
	var dataLength = data.length;
	for(var i=0;i<dataLength;i++){
		$("#menugroupOne").append("<li><span>菜单名称</span><ul class='menugroupTwo'></ul><div class='btngroup btntwo'><span class='demoSpan1'></span></div></li>")
		var menulength = data[i].menu.length;
		$("#menugroupOne>li").eq(i).attr("id",data[i].id);
		$("#menugroupOne>li>span").eq(i).html(data[i].name);
		for(var j=0;j<menulength;j++){
			$("#menugroupOne>li").eq(i).children("ul").append("<li><span>菜单名称</span></li>");
			$("#menugroupOne>li").eq(i).children("ul").children("li").eq(j).attr("id",data[i].menu[j].id);
			$("#menugroupOne>li").eq(i).children("ul").find("span").eq(j).html(data[i].menu[j].name);
		}
	}
	menugroupOneWidth(data.length);//根据1级菜单多少决定宽度
}
//重置右边的
function resetName(){
	$(".numeName").show();
	$(".inputName").hide();
	$(".save").hide();
	$(".rename").show();
}
//主菜单的宽度
function menugroupOneWidth(length){
	if(length<3){
		$("#btnAdd1").show();
	}
	switch(length){
		case 0:
		$("#btnAdd1").css({
			"width":"430px",
			"left":"0px"
		})
		break;
		case 1:
		$("#btnAdd1").css({
			"width":"134px",
			"left":"296px"
		})
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
//二级菜单的高度
function twoTop(){
	$(".menugroupTwo").each(function(){
		if($(this).children("li").length<5){
			$(this).siblings(".btntwo").show();
		}
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
function numeName(){
	if($(".active").parent().hasClass("menugroupTwo")){
		$(".numeGrade").html("二级菜单");
	}else{
		$(".numeGrade").html("一级菜单");
	}
	$(".numeName").html($(".active span").eq(0).html());
	$(".inputName").val($(".active span").eq(0).html());
}