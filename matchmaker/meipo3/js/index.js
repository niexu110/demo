/**
 * Created by Administrator on 2017/7/13.
 */
$(function(){
    var type=1,isOpen=true;
    $(".matchmaker-close").click(function(e){
        e.stopPropagation();
        $(".matchmaker-DR").slideUp(500);
    });
    $(".matchmaker-friend-looks,.matchmaker-looks").click(function(e){
        e.stopPropagation();
        var str=$(this).attr("title");
        localStorage.setItem("maker",str);
        skip("matchmaker/matchmakerAll.html");
    })
    $(".matchmaker-star-ul li,.matchmaker-nominate-box,.matchmaker-friend-box").click(function(){
        skip("matchmaker/matchmakerIntroduces.html")
    });
    $(".mold img").click(function(e){
        e.stopPropagation();
        var uid=$(this).attr("alt");
        skip("matchmaker/visitingCard.html?uid="+uid);
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
