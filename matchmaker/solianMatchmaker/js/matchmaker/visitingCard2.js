/**
 * Created by Administrator on 2017/7/8.
 */
$(function(){
    $(".card-album-img").click(function(){
        $(".imgList").fadeIn(200);
    });
    $(".goBack").click(function(){
        $(".imgList").fadeOut(200);
    });
    //滑动
    var $w=$("body").width();
    var len=$(".imgList-content img").length;
    var slide=false;
    var index=0,left=0,startX=0,endX=0;
    $(".mash-ul").width($w*len);
    $(".num-2").text(len);
    $(".imgList-content img").click(function(){
        index=$(this).index();
        $(".num-1").text(index+1);
        $(".mash-imgList").fadeIn(100);
        $(".mash-ul").css({marginLeft:-index*$w});
    })
    $(".mash-ul li img").on("touchstart",function(e){
        var touch = e.originalEvent.changedTouches[0];
        startX=touch.pageX;
        slide=true;
    });
    $(".mash-ul li img").on("touchend",function(e){
        var touch = e.originalEvent.changedTouches[0];
        endX=touch.pageX;
        if(slide){
            slide=false;
            if(startX>endX&&index<len-1){
                 index++;
                 $(".num-1").text(index+1);
                 left=$w*index;
                $(".mash-ul").css({
                    marginLeft:-left,
                    transition:"all .4s linear"
                })
            }else if(startX<endX&&index>0){
                index--;
                $(".num-1").text(index+1);
                left=index*$w;
                $(".mash-ul").css({
                    marginLeft:-left,
                    transition:"all .4s linear"
                })
            }
        }
    });
    $(".imgItem").click(function(){
        $(".mash-imgList").fadeOut(200);
        $(".mash-ul").css({marginLeft:0,transition:"all 0s linear"});
    })
    $(".introducesFX").click(function () {
        $("#lookTop").append("<img src='../../image/img/chakanfenxiang.png' >").css("display","block");
        setTimeout(function(){
            $("#lookTop").css("display","none").html("");
        },3000)
    });
    $(".introduce-lh").click(function(){
        $("#lookTop").append("<div class='vod'><h1 class='vod-lh'>拉黑</h1><p class='vod-jb'>举报</p>"+
            "<p class='vod-close'>取消</p></div>").css("display","block");
        $(".vod-close").click(function(){
            $("#lookTop").css("display","none").html("");
        });
        $(".vod-jb").click(function(){
            skip("report.html");
        });
    });
    //后需追加的
    $(".lighten-LT").click(function(){
        $(".pop").html("  <div class='lt-pop'><p>聊天请下载APP哦···</p><div class='lt-btn'>确定</div></div>").fadeIn(100);
        $(".lt-btn").click(function(){$(".pop").fadeOut(100);$(".lt-pop").remove();})
    });
    $(".lighten-WeiX").click(function(){
        var start=$(this).attr("title"),uid=$(this).attr("alt");
        if(start==1){
                $(".pop").html("  <div class='wx-pop'><img src='../../image/img/title.png'><span class='wx-tit'>填写微信号</span>" +
                    "<p>填写微信号后</p><p>才可申请添加微信</p><a href='#' class='btnA'>立刻填写</a></div>").fadeIn(100);
                $(".btnA").click(function(){$(".pop").fadeOut(100);$(".wx-pop").remove()})
        }else{
                $(".pop-buy").fadeIn(100);  $(".pop-user").val(uid);
        }
    })
    $(".closes").click(function(){
        $(".pop-buy").fadeOut(100);
    });
    $(".pop-item").click(function(){
        $(this).addClass("active2").siblings(".active2").removeClass("active2");
        $(".pop-price").val($(this).attr("title"));
        $("#popBtn").attr("disabled",false)
    });
});