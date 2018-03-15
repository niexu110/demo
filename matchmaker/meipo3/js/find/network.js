/**
 * Created by Administrator on 2017/11/25.
 */
$(function(){
    var a=$(".content a"),page=0,time="all .4s linear";
    ainimet();
    $(".look").click(function(){
        a.css({ left:"0",opacity:"0",top:"0", transition:time, "-webkit-transition": time});
    //发送ajax获取下一组数据如果有数据清除$(".content).html("");
    //    然后append()进入,在调用 ainimet()；方法OK；

    });
    function ainimet(){
        if(a.length>0){
            var i=0;
            a.eq(i).css({ left:"5.5rem",opacity:"1",top:".6rem", transition:time, "-webkit-transition":time});
            a.eq(i+1).css({ left:"-5.5rem",opacity:"1",top:".5rem", transition:time, "-webkit-transition":time});
            a.eq(i+2).css({ opacity:"1",top:"-4rem", transition:time, "-webkit-transition":time});
            a.eq(i+3).css({ opacity:"1",top:"6rem", transition:time, "-webkit-transition":time});
            a.eq(i+4).css({ left:"-5rem",opacity:"1",top:"-5rem", transition:time, "-webkit-transition":time});
           
            a.eq(i+6).css({ left:"5rem",opacity:"1",top:"-5rem", transition:time, "-webkit-transition":time});
            a.eq(i+7).css({ left:"4.8rem",opacity:"1",top:"6rem", transition:time, "-webkit-transition":time});
            a.eq(i+8).css({ left:"-4.8rem",opacity:"1",top:"6rem", transition:time, "-webkit-transition":time});
            a.eq(i+9).css({opacity:"1",top:"10rem", transition:time, "-webkit-transition":time});
            a.eq(i+10).css({opacity:"1",top:"-8rem", transition:time, "-webkit-transition":time});
        };
    }
});
