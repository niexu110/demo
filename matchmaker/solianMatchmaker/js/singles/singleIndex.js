/**
 * Created by Administrator on 2017/7/6.
 */
$(function(){
    $(".single-title,.btnSingle").click(function(){
        skip("recruit.html");
    });
    $(".single-tj").click(function(e){
       var uid=$(this).attr("title");
       skip("recommend.html?uid="+uid);
    })
    $(".single-main-sex div").click(function(){
        $(this).addClass("active").siblings(".active").removeClass("active");
        var num=$(this).attr("title");
        if(num==0){
            $(".man-box").css("display","block");
            $(".women-box").css("display","none");
        }else{
            $(".women-box").css("display","block");
            $(".man-box").css("display","none");
        }
    })
})
