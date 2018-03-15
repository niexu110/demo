$(function(){
     var type=1;
     $(".item").click(function(){
         type=$(this).attr("title");
         $(this).addClass("active").siblings(".active").removeClass("active") 
     })
     $(".reasonsBtn").click(function(){
          console.log(type);
          // 看看你们是否调取接口,不掉直接跳转
          skip("drawback.html")
     })
})