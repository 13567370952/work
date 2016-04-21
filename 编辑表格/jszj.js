$(function(){
        xbqh()
})
function xbqh(){
    $(".xb input").bind("focus",function(){
        $(this).find("h3").show();
         $(this).find("ul").show();
    })
}