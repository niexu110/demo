/**
 * Created by Administrator on 2017/9/9.
 */
$(function(){
    var slider=$(".slider"),
     carouselSliderDiv=$(".carousel-slider div"),
     carouselSliderDiv2=$(".carousel-slider2 div"),
     carouselSlider=$(".carousel-slider"),
     carouselSlider2=$(".carousel-slider2"),
     guideItem=$(".guide-item"),
     guideItem2=$(".guide-item2"),
     carouselItem=$(".carousel-item span"),
     carouselItem2=$(".carousel-item2 span");
    $(".menu span").on("click",function(e){
        e.preventDefault();
        $(this).addClass("active").siblings(".active").removeClass("active");
        var type=parseInt($(this).attr("data-type"));
       type===1?slider.css({marginLeft:"0",transition:"all .5s linear"}):slider.css({marginLeft:"-1200px",transition:"all .5s linear"})
    });
    $(".meiList li").on("click",function(){
        $(".pop").show();
    });
    $(".close").click(function(){
        $(".pop").hide();
    })
    var width=carouselSliderDiv.width(),height=carouselSliderDiv2.height();
    carouselSlider.width(width*carouselSliderDiv.length);
    carouselSlider2.height(height*carouselSliderDiv2.length);
    var index=0,index2=0;
    function fn(){
        if(index>=carouselSliderDiv.length){
            index=0;
            carouselItem.removeClass('active');
            guideItem.removeClass('active2');
            guideItem.eq(index).addClass('active2');
            carouselItem.eq(index).addClass('active');
            carouselSlider.css({marginLeft:"0",transition:"all 0s"});
        }else{
            carouselItem.removeClass('active');
            guideItem.removeClass('active2');
            carouselItem.eq(index).addClass('active');
            guideItem.eq(index).addClass('active2');
            carouselSlider.css({marginLeft:-index*width,transition:"all .5s linear"});
            index++;
        }
    }
    function fn2(){
        if(index2>carouselSliderDiv2.length-1){
            index2=0;
            carouselItem2.removeClass('active');
            guideItem2.removeClass('active2');
            guideItem2.eq(index2).addClass('active2');
            carouselItem2.eq(index2).addClass('active');
            carouselSlider2.css({marginTop:"0",transition:"all 0s"});
        }else{
            carouselItem2.removeClass('active');
            guideItem2.removeClass('active2');
            carouselItem2.eq(index2).addClass('active');
            guideItem2.eq(index2).addClass('active2');
            carouselSlider2.css({marginTop:-index2*height,transition:"all .5s linear"});
            index2++;
        }
    }
    var timer= setInterval(fn,2000);
    var timer2= setInterval(fn2,2000);
    $(".guide-item a").hover(function(){
        clearInterval(timer)},
        function(){timer=setInterval(fn,2000);});
    $(".guide-item2 a").hover(function(){
            clearInterval(timer2)},
        function(){timer2=setInterval(fn2,2000);});
});
