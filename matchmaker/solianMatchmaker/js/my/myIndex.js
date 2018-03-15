/**
 * Created by Administrator on 2017/7/6.
 */
$(function(){
    $(".my-bj").click(function(){
        skip("copyreader.html");
    })
    $(".startsWitch").click(function(){
          localStorage.setItem("start",2);
    });
    $(".start-box").click(function(){
        $(".main").css("display","block")
    })
    $(".cdImg").click(function(){
          $(".main").css("display","none")
    });

    $(".user-content>img").click(function(){
        var m_uid=$(this).attr("alt");
        skip("../matchmaker/matchmakerIntroduces.html?uid="+m_uid);
    })
    $("#btn").click(function(){
        $(".fxBox").show();
        setTimeout(function(){
            $(".fxBox").hide();
        },2500)
    })
})