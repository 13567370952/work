$(document).ready(function(){
	hd();
  cpzx();
  bzzx();
  jjff()
});
function cpzx(){
  var now = 0;
  function go(num){
    $(".cpzxx .ye").css({"display":"none"}).eq(num).css({"display":"block"});
    $(".cpzxx .dian li").removeClass("active").eq(num).addClass('active');
  }
  $(".cpzxx .zuo").click(function(){
    now--;
    if(now<0){
      now=1;
    }
    go(now);
  })
  $(".cpzxx .you").click(function(){
    now++;
    if(now>1){
      now=0;
    }
    go(now);
  })
  $(".cpzxx .dian li").each(function(index) {
    $(this).click(function() {
      now = index;
      go(index);
    });
  });
}
function hd(){
	var now = 0;
  var time = setInterval(function(){
    now++;
    if(now > 4){
      now = 0;
    }
    goToSlide(now);
    },5000);
	function goToSlide(num){
    clearTimeout(time);
    time = setInterval(function(){
    now++;
    if(now > 4){
      now = 0;
    }
    goToSlide(now);
    },5000);
    $(".banner").animate({
      marginLeft : (-100 * num) + "%"
    },1000);
    $(".banner li").removeClass("active").eq(num).addClass("active");
  }
  $(".banner ul li").each(function(index){
    $(this).click(function(){
      now = index;
      goToSlide(index);
    });
  });
  $(".banner .zuo").click(function(){
  	now--;
  	if(now<0){
  		now=4;
  	}
  	goToSlide(now);
  })
  $(".banner .you").click(function(){
  	now++;
  	if(now>4){
  		now=0;
  	}
  	goToSlide(now);
    
  })
};
function bzzx(){
  $(".dlnav .bzzx").bind("mouseover",function(){
     $(".dlnav .bzzx ul").show();
  })
  $(".dlnav .bzzx").bind("mouseout",function(){
     $(".dlnav .bzzx ul").hide();
  })
  $(".dlnav .bzzx ul li").click(function(){
    $(".dlnav .bzzx ul").hide();
  })
}
function jjff(){
  $(".wmnav .jjfa").mouseover(function(){
    $(".wmnav .jjfa ul").show();
  })
  $(".wmnav .jjfa").mouseout(function(){
    $(".wmnav .jjfa ul").hide();
  })
  $(".wmnav .jjfa ul li").click(function(){
    $(".wmnav .jjfa ul").hide();
  })
}