/**
 * Created by Administrator on 2017/7/15.
 */
$(function(){
    $(".my-bj").click(function(){
        skip("copyreaderdan.html");
    })
    $(".startsWitch").click(function(){
        localStorage.setItem("start",1);
    });
    $("#upLoad").change(function(e){
        e.stopPropagation();
        var imgFile = new FileReader();
        imgFile.readAsDataURL(this.files[0]);
        imgFile.onload=function(){
          var  src = this.result; //base64数据
            var html="<img src="+src+">";
            $(".album-list").prepend(html);
        }
    });
    $(".album-list img").click(function(){
        $(".imgList").fadeIn(200);
        $(".mash-imgList").fadeIn(100);
    })
    $(".album-num>img").click(function(){
        $(".imgList").fadeIn(200);

    });
    $(".user-content>img").click(function(){
        var m_uid=$(this).attr("alt");
        skip("../matchmaker/visitingCard.html?uid="+m_uid);
    })
    $(".goBack").click(function(){
        $(".imgList").fadeOut(200);
    })
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
})
function getURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) {
        url = window.createObjectURL(file);
    } else if (window.URL!=undefined) {
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) {
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}
function start(file) {
    var imgFile = new FileReader();
    imgFile.readAsDataURL(img.files[0]);
   var imgData = this.result; //base64数据
    return imgData;
}