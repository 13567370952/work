$(function(){
        xbqh()
})
function xbqh(){
    $(".xb").bind("click",function(){
        $(this).find("h3").show();
         $(this).find("ul").show();
    })
    $("body").bind("mouseout",function(){
       $(".xb").find("h3").css({"display":"none"})
         $(".xb").find("ul").css({"display":"none"})
    })
}