/**
 * Created by Administrator on 2017/7/8.
 */
$(function(){
    $(".card-album-img").click(function(){
        $(".imgList").fadeIn(200);
    });
    $(".goBack").click(function(){
        $(".imgList").fadeOut(200);
    })
    //滑动
    var $w=$("body").width();
    var imgList=$(".imgList-content img"),mashImg=$(".mash-ul li img");
    var len=imgList.length;
    var slide=false;
    var index=0,left=0,startX=0,endX=0;
    $(".mash-ul").width($w*len);
    $(".num-2").text(len);
    imgList.click(function(){
        index=$(this).index();
        $(".num-1").text(index+1);
        $(".mash-imgList").fadeIn(100);
        $(".mash-ul").css({marginLeft:-index*$w});
    })
    mashImg.on("touchstart",function(e){
        var touch = e.originalEvent.changedTouches[0];
        startX=touch.pageX;
        slide=true;
    });
    mashImg.on("touchend",function(e){
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
        $("#lookTop").append("<img src='../../image/icon/fx.png' >").css("display","block");
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

        })
    })
    //点击喜欢
    $(".vip-love").click(function(){
        var self=$(this);
        var uid=self.attr("alt"),type=self.attr("title");
            if(type==0){
                self.attr("title",1);
                self.attr("src","../../image/icon/lloves.png");
            }else{
                self.attr("title",0);
                self.attr("src","../../image/icon/licks.png");
            }
    })
    $(".vip-msg").click(function(){
        $(".pop").show();
    })
    $(".btn").click(function(){$(".pop").hide();})
    $(".vip-btn").click(function(){
        alert("发约会请求")
    })
})