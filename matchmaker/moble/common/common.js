document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
$(function(){
    var slide=false,left=0,startY=0,endY=0;
    var item=$(".muse li"),muse=$(".muse"),
        index=0, h=$(".views").height(),len=item.length;
        item.height(h);
    $(".look").on("click",function(){
        index++;
        muse.css({marginTop:-index*h,transition:"all .5s linear", "-webkit-transition":"all .5s linear"})
    });
    item.on("touchstart",function(e){
        var touch = e.originalEvent.changedTouches[0];
        startY=touch.pageY;
        slide=true;
    });
    item.on("touchend",function(e){
        var touch = e.originalEvent.changedTouches[0];
        endY=touch.pageY;
        if(slide){
            slide=false;
            if(startY>endY&&index<len-1){
                index++;
                muse.css({
                    marginTop:-index*h,
                    transition:"all .4s linear",
                    "-webkit-transition":"all .5s linear"
                })
            }else if(startY<endY&&index>0){
                index--;
                muse.css({
                    marginTop:-index*h,
                    transition:"all .4s linear",
                    "-webkit-transition":"all .5s linear"
                })
            }
        }
    });
    $(".present").click(function(){location.href="about.html"});

});



