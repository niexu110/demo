/**
 * Created by Administrator on 2017/7/7.
 */
$(function(){
    var isOpen=true;
    var str=localStorage.getItem("maker");
    str==1? $(".header-title").text("明星媒婆"):$(".header-title").text("好友媒婆");
    $(".matchmaker-box").click(function(){
        skip("matchmakerIntroduces.html");
    })
    var clientH = Number(document.documentElement.clientHeight);
    var H=Number($(".pullUp").height());
    $(document).on('scroll',function(){
        if(isOpen){
            var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop+clientH);
            var H5Top=parseInt($('.pullUp').offset().top+H);
            if(docH>H5Top-150){
                isOpen=false;
                $(".pullUp").html("数据加载中...");
                console.log("加载媒婆数据");
            }
        }
    })
})