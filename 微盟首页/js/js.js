$(document).ready(function(){
	hd();
});
function hd(){
	var now = 0;
	function goToSlide(num){
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
   var time = setInterval(function(){
    now++;
    if(now > 4){
      now = 0;
    }
    goToSlide(now);
  	},5000);
};