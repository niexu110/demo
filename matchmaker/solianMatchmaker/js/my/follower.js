/**
 * Created by Administrator on 2017/7/26.
 */
$(function(){
    $(".matchmaker-box").click(function(){
        var uid=$(this).attr("title");
        skip("../matchmaker/visitingCard.html?uid="+uid);
    })
    var isOpen=true;
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
