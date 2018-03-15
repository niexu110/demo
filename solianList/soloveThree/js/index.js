/**
 * Created by Administrator on 2017/8/30.
 */
$(function(){
    var index=0,startX=0,endX=0,slide=false;
    var imgLi=$(".star-user-ul li"),userDiv=$(".star-user-box");
    var len=imgLi.length;
    userDiv.eq(index).addClass("active");
    imgLi.eq(index).addClass("liItem").css({
        bottom:".6rem",left:"0",opacity:"1",width:"6.9rem",height:"6.9rem",
        transform:"translate3d(0,0,1rem)",zIndex:"3","-webkit-transform": "translate3d(0,0,.5rem)"
    });
    imgLi.eq(index+1).css({
        bottom:".3rem",left:".15rem",opacity:".6",width:"6.6rem",height:"6.6rem",
        transform:"translate3d(0,0,.5rem)",zIndex:"2","-webkit-transform": "translate3d(0,0,.5rem)"
    });
    imgLi.on("touchstart",function(e){
        var touch = e.originalEvent.changedTouches[0];
        startX=touch.pageX;
        slide=true;
        e.stopPropagation();
        $(".liItem").click(function(e){
            e.stopPropagation();
            var uid=$(this).attr("title");
            skip("../src/find/visitingCard.html");
        })
    });
    imgLi.on("touchend",function(e){
        var touch = e.originalEvent.changedTouches[0];
        endX=touch.pageX;
        if(slide) {
            slide = false;
            if (startX >endX&&index<=len-2) {
                index++;
                userDiv.eq(index).addClass("active");
                userDiv.eq(index-1).removeClass("active");
                imgLi.eq(index).addClass("liItem").siblings(".liItem").removeClass("liItem");
                imgLi.eq(index).css({
                    bottom:".6rem",left:"0",opacity:"1",width:"6.9rem",height:"6.9rem",
                    transform:"translate3d(0,0,1rem)",zIndex:"3",transition: "all .2s linear",
                    "-webkit-transition": "all .5s linear","-webkit-transform": "translate3d(0,0,1rem)"
                });
                imgLi.eq(index+1).css({
                    bottom:".3rem",left:".15rem",opacity:".6",width:"6.6rem",height:"6.6rem",
                    transform:"translate3d(0,0,.5rem)",zIndex:"2",transition: "all .2s linear",
                    "-webkit-transition": "all .5s linear","-webkit-transform": "translate3d(0,0,.5rem)"
                });
                imgLi.eq(index-1).css({
                    bottom:".3rem",left:"0",opacity:"1",width:"7rem",height:"7rem",
                    transform:"translate3d(-8rem,0,2rem)",zIndex:"20",transition: "all .5s linear",
                    "-webkit-transition": "all .5s linear","-webkit-transform": "translate3d(-8rem,0,2rem)"
                });

            } else if (startX < endX&&index>0) {
                index--;
                userDiv.eq(index).addClass("active");
                userDiv.eq(index+1).removeClass("active");
                imgLi.eq(index).addClass("liItem").siblings(".liItem").removeClass("liItem");
                imgLi.eq(index+1).css({
                    bottom:".3rem",left:".15rem",opacity:".6",width:"6.6rem",height:"6.6rem",
                    transform:"translate3d(0,0,.5rem)",zIndex:"2",transition: "all .2s linear",
                    "-webkit-transition": "all .5s linear","-webkit-transform": "translate3d(0,0,.5rem)"
                });
                imgLi.eq(index).css({
                    bottom:".6rem",left:"0",opacity:"1",width:"6.9rem",height:"6.9rem",
                    transform:"translate3d(0,0,1rem)",zIndex:"3",transition: "all .5s linear",
                    "-webkit-transition": "all .5s linear","-webkit-transform": "translate3d(0,0,1rem)"
                });
                imgLi.eq(index+2).css({
                    bottom:"0",left:".3rem",opacity:".2",width:"6.3rem",height:"6.3rem",
                    transform:"translate3d(0,0,0)",zIndex:"1",transition: "all .2s linear",
                    "-webkit-transition": "all .5s linear","-webkit-transform": "translate3d(0,0,0)"
                });
            }
        }
    });
    //点击喜欢
    $(".bind-love").click(function(e){
        e.stopPropagation();
         var _this=$(this);
         var uid=_this.attr("alt"),type=_this.attr("title");
         console.log(uid,type)
      //      发送ajax
        if(type==0){
             _this.attr("title",1);
             _this.attr("src","../image/icon/lloves.png");
        }else{
            _this.attr("title",0);
            _this.attr("src","../image/icon/love.png");
        }
    });
    //签到
    var myDate = new Date();
    var day=myDate.getDay();
    var pop=$(".pop-sign"),pop2=$(".pop-sign2");
    var newDay=localStorage.getItem("day");
    console.log("今天星期"+day,"缓存星期"+newDay);
    if(newDay==day){
        pop2.hide();
    }else{
        pop2.show();
    }
    $(".dayBtn").click(function(){
        //发送ajax成功后显示
        pop2.hide();pop.show();
    });
    pop.click(function(){pop.hide();});
    $(".closeBtn").click(function(){pop2.hide();localStorage.setItem("day",day);})
    //筛选
    var str=76,arr=221;
    /*定义年龄等变量*/
    var age="",height="",num,num2;
    $(".ageItem").click(function(){
        for(var i=18;i<str;i++){
            $(".age-ul").append("<li title="+i+">"+i+"岁</li>");
            $(".age-ul2").append("<li title="+(i+1)+">"+(i+1)+"岁</li>");
        }
        $(".age-ul").prepend("<li>不限</li>");
        $(".filter-list-box").fadeIn(200);
        $(".ageBox").fadeIn();
        $(".age-ul li").click(function(){
            if($(this).index()==0){
                $(".ageP").text($(this).text());
                $(".ageInt").val($(this).text());
                $(".filter-list-box").fadeOut(200);
                $(".ageBox").fadeOut();
                $(".age-ul").html("");
                $(".age-ul2").html("");
            }else{
                $(this).addClass("active").siblings(".active").removeClass("active");
                age=$(this).text();
                num=$(this).attr("title");
            }
        })
        $(".age-ul2 li").click(function(){
            if($(this).attr("title")<=num){
                alert("选择不符合标准");
            }else{
                $(".ageP").text(age+"-"+$(this).text());
                $(".ageInt").val(num+"-"+$(this).attr("title"));
                $(".filter-list-box").fadeOut(200);
                $(".ageBox").fadeOut();
                $(".age-ul").html("");
                $(".age-ul2").html("");
            }
        })
    });

    $(".heightItem").click(function(){
        for(var i=120;i<arr;i++){
            $(".hei-ul").append("<li title="+i+">"+i+"cm</li>");
            $(".hei-ul2").append("<li title="+(i+1)+">"+(i+1)+"cm</li>");
        }
        $(".hei-ul").prepend("<li>不限</li>")
        $(".filter-list-box").fadeIn(200);
        $(".heightBox").fadeIn();
        $(".hei-ul li").click(function(){
            if($(this).index()==0){
                $(".heightP").text($(this).text());
                $(".heightInt").val($(this).text());
                $(".filter-list-box").fadeOut(200);
                $(".heightBox").fadeOut();
                $(".hei-ul").html("");
                $(".hei-ul2").html("");
            }else{
                $(this).addClass("active").siblings(".active").removeClass("active");
                height=$(this).text();
                num2=$(this).attr("title")
            }
        });
        $(".hei-ul2 li").click(function(){
            if($(this).attr("title")<=num2){
                alert("选择不符合标准");
            }else {
                $(".heightP").text(height+"-"+$(this).text());
                $(".heightInt").val(num2+"-"+$(this).attr("title"));
                $(".filter-list-box").fadeOut(200);
                $(".heightBox").fadeOut();
                $(".hei-ul").html("");
                $(".hei-ul2").html("");
            }
        })
    })
    $(".marryItem").click(function(){
        $(".filter-list-box").fadeIn(200);
        $(".marryBox").fadeIn();
    })
    $(".marryBox ul li").click(function(){
        var txt=$(this).text();
        $(".marryP").text(txt);
        $(".marryInt").val(txt);
        $(".filter-list-box").fadeOut(200);
        $(".marryBox").fadeOut();
    })
    $(".eduItem").click(function(){
        $(".filter-list-box").fadeIn(200);
        $(".eduBox").fadeIn();
    })
    $(".eduBox ul li").click(function(){
        var txt=$(this).text();
        $(".eduP").text(txt);
        $(".eduInt").val(txt);
        $(".filter-list-box").fadeOut(200);
        $(".eduBox").fadeOut();
    });
    $(".filter-btn").click(function(){
        $(".filter").css("display","block");
    })
     $(".close").click(function(){
         $(".filter").css("display","none");
     })
})