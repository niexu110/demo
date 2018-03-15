/**
 * Created by Administrator on 2017/7/6.
 */
$(function(){
    $(".introduce-main-sex div").click(function(){
        $(this).addClass("active").siblings(".active").removeClass("active");
        var num=$(this).attr("title");
        if(num==0){
            $(".women-box").css("display","block");
            $(".man-box").css("display","none");
        }else{
            $(".man-box").css("display","block");
            $(".women-box").css("display","none");
        }
    });
    $(".introduce-relative").click(function(){
      var uid=$(this).attr("title");
        skip("visitingCard.html?uid="+uid);
     });
    $(".introducesFX").click(function () {
         $("#lookTop").append("<img src='../../image/img/chakanfenxiang.png' >").css("display","block");
         setTimeout(function(){
             $("#lookTop").css("display","none").html("");
         },3000)

    });
    $(".introduce-lh").click(function(){
          $("#lookTop").append("<div class='vod'><p class='vod-jb'>举报</p>"+
            "<p class='vod-close'>取消</p></div>").css("display","block");
          $(".vod-close").click(function(){
              $("#lookTop").css("display","none").html("");
          })
    })
})