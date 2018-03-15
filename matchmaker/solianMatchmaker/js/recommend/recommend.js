/**
 * Created by Administrator on 2017/7/13.
 */
$(function(){
    var page=0,page1=0;
    var provinces=[],citys=[];
    $.ajax({
        type:"GET",
        url:"../../city.json",
        dataType: "json",
        success:function(res){
           var list=res.citylist;
           for(var k in list){
               provinces.push(list[k]);
               citys.push(list[k].city);
           }
        }
    });
  var index2=0,left=0,startsX=0,endsX=0,slider=false;
  var $w=$(".groom-ul>li").width();
  var lens=$(".groomItem").length;
  $(".groom-ul").width($w*lens);
    $(".groomItem").on("touchstart",function(e){
        var touch = e.originalEvent.changedTouches[0];
        startsX=touch.pageX;
        slider=true;
    });
    $(".groomItem").on("touchend",function(e){
        var touch = e.originalEvent.changedTouches[0];
        endsX=touch.pageX;
        if(slider){
            slider=false;
            if(startsX>endsX&&index2<lens){
                index2++;
                left=$w*index2;
                $(".groom-ul").css({
                    marginLeft:-left,
                    transition:"all .4s linear"
                })
                if(index2==lens){$(".groom-ul").html("").removeAttr("style");loadMore(1,page)}
            }else if(startsX<endsX&&index2>0){
                index2--;
                left=index2*$w;
                $(".groom-ul").css({
                    marginLeft:-left,
                    transition:"all .4s linear"
                })
            }
        }
    });
    function loadMore(type,page){
        if(type==1){
            var html="<li class='groomItem'>第一页</li><li class='groomItem'>第二页</li><li class='groomItem'>第三页</li><li class='groomItem'>第四页</li><li class='groomItem'>第五页</li><li class='groomItem'>第刘页</li>";
            lens=6;index2=0;
            $(".groom-ul").append(html).width($w*lens);
            $(".groomItem").on("touchstart",function(e){
                var touch = e.originalEvent.changedTouches[0];
                startsX=touch.pageX;
                slider=true;
            });
            $(".groomItem").on("touchend",function(e){
                var touch = e.originalEvent.changedTouches[0];
                endsX=touch.pageX;
                if(slider){
                    slider=false;
                    if(startsX>endsX&&index2<lens){
                        index2++;
                        left=$w*index2;
                        $(".groom-ul").css({
                            marginLeft:-left,
                            transition:"all .4s linear"
                        })
                        if(index2==lens){$(".groom-ul").html("").removeAttr("style");loadMore(1,page)}
                    }else if(startsX<endsX&&index2>0){
                        index2--;
                        left=index2*$w;
                        $(".groom-ul").css({
                            marginLeft:-left,
                            transition:"all .4s linear"
                        })
                    }
                }
            });
        }else{

        }
    }
    $(".main-nav a").click(function(e){
        var start=$(this).attr("title");
        e.preventDefault();
        $(this).addClass("active").siblings(".active").removeClass("active");
        $($(this).attr("href")).addClass("active").siblings(".active").removeClass("active");
        if(start==1){
            $("#back-2").css("display","block");
        }else{
            $("#back-2").css("display","none");
        }

    });
    $("#back-2").click(function(){
        $(".filter").css("display","block");
    })
    $(".close").click(function(){
        $(".filter").css("display","none");
    })
    //筛选
    $(".ageItem").click(function(){
        $(".filter-list-box").fadeIn(200);
        $(".ageBox").fadeIn();
    })
    $(".ageBox ul li").click(function(){
        var txt=$(this).text();
        $(".ageP").text(txt);
        $(".ageInt").val(txt);
        $(".filter-list-box").fadeOut(200);
        $(".ageBox").fadeOut();
    })
    $(".heightItem").click(function(){
        $(".filter-list-box").fadeIn(200);
        $(".heightBox").fadeIn();
    })
    $(".heightBox ul li").click(function(){
        var txt=$(this).text();
        $(".heightP").text(txt);
        $(".heightInt").val(txt);
        $(".filter-list-box").fadeOut(200);
        $(".heightBox").fadeOut();
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
    })
    var pro="",ct="";
    $(".addressItem").click(function(){
        $(".filter-list-box").fadeIn(200);
        $(".addressBox").fadeIn();
        cityAdd(0,citys);
        for(var k in provinces){
            var html="<li class='proItem' title="+provinces[k].code+">"+provinces[k].name+"</li>";
            $(".pro-ul").append(html);
        }
        $(".proItem").click(function(){
            $(this).addClass("active").siblings(".active").removeClass("active");
            $(".ct-ul").html("");
            pro=$(this).text();
            var num=$(this).index();
            cityAdd(num,citys);
            $(".ctItem").click(function(){
                ct=$(this).text();
                $(".addressP").text(pro+" "+ct);
                $(".addressInt").val(pro+"-"+ct);
                $(".pro-ul").html("");
                $(".filter-list-box").fadeOut(200);
                $(".addressBox").fadeOut();
            })
        })
    });
    $(".user-content").click(function(){
        var uid=$(this).attr("title");
        skip("../matchmaker/visitingCard.html?uid="+uid)
    });
    $(".maker-img").click(function(e){
        e.stopPropagation();
        var m_uid=$(this).attr("alt");
        skip("../matchmaker/matchmakerIntroduces.html?uid="+m_uid)
    })
    $(".love").click(function(e){
        e.stopPropagation();
        //获取uid;
        var uid=$(this).attr("alt");
        //先发送ajax
        //成功换图片
        $(this).attr("src","../../image/icons/lloves.png");
    })
    function cityAdd(num,list){
        var obj=list[num];
        for(var k in obj){
            console.log(obj[k])
            var html="<li class='ctItem' title="+obj[k].code+">"+obj[k].name+"</li>";
            $(".ct-ul").append(html);
        }
    };
    //媒婆说滑动
    var index=0,startX=0,endX=0,slide=false;
    var len=$(".d3-ul li").length;
    $(".maker-say").eq(index).addClass("active");
    $(".matchmaker-header").eq(index).addClass("active");
    $(".maker-conversation").eq(index).addClass("active");
    $(".d3-ul li").eq(index).addClass("liItem");
    $(".d3-ul li").eq(index).css({
        width:"3.3rem", height:"3.3rem",
        opacity:"1", top:"0",
        transform:"translate3d(-1.5rem,0,1.5rem)"
});
    $(".d3-ul li").eq(index+1).css({
        width:"2.6rem", height:"2.6rem",
        top:".4rem", transform:"translate3d(-.7rem,0,1rem)"
    });
    $(".d3-ul li").eq(index+2).css({
        transform:"transform:translate3d(0,0,0)"
    });
    $(".d3-ul li").on("touchstart",function(e){
         var touch = e.originalEvent.changedTouches[0];
         startX=touch.pageX;
         slide=true;
        $(".liItem").click(function(e){
            e.stopPropagation();
            var uid=$(this).attr("title");
            skip("../matchmaker/visitingCard.html?uid="+uid);
        })
 });
    $(".d3-ul li").on("touchend",function(e){
        var touch = e.originalEvent.changedTouches[0];
        endX=touch.pageX;
        if(slide) {
            slide = false;
            if (startX >endX&&index<=len-2) {
                index++;
                $(".maker-say").eq(index).addClass("active");
                $(".maker-say").eq(index-1).removeClass("active");
                $(".matchmaker-header").eq(index).addClass("active");
                $(".matchmaker-header").eq(index-1).removeClass("active");
                $(".maker-conversation").eq(index).addClass("active");
                $(".maker-conversation").eq(index-1).removeClass("active");
                $(".d3-ul li").eq(index).addClass("liItem").siblings(".liItem").removeClass("liItem");
                $(".d3-ul li").eq(index).css({
                    width: "3.3rem", height: "3.3rem",
                    opacity: "1", top: "0",
                    transform: "translate3d(-1.5rem,0,1.5rem)",
                    transition: "all .2s linear"
                });

                $(".d3-ul li").eq(index - 1).css({
                    width: "2.6rem", height: "2.6rem",
                    top: ".4rem", transform: "translate3d(-3rem,0,1rem)",
                    transition: "all .2s linear", opacity: ".7"
                });
                $(".d3-ul li").eq(index + 1).css({
                    width: "2.6rem", height: "2.6rem", opacity: ".7",
                    top: ".4rem", transform: "translate3d(-.7rem,0,1rem)",
                    transition: "all .2s linear"
                });
                if (index >= 2&&index<=len-1) {
                    $(".d3-ul li").eq(index - 2).css({
                        width: "1.9rem", height: "1.9rem", opacity: ".7",
                        top: ".8rem", transform: "translate3d(-4.5rem,0,0)",
                        transition: "all .2s linear"
                    });
                }
            } else if (startX < endX&&index>0) {
                index--;
                $(".maker-say").eq(index).addClass("active");
                $(".maker-say").eq(index+1).removeClass("active");
                $(".matchmaker-header").eq(index).addClass("active");
                $(".matchmaker-header").eq(index+1).removeClass("active");
                $(".maker-conversation").eq(index).addClass("active");
                $(".maker-conversation").eq(index+1).removeClass("active");
                $(".d3-ul li").eq(index).addClass("liItem").siblings(".liItem").removeClass("liItem");
                $(".d3-ul li").eq(index).css({
                    width: "3.3rem", height: "3.3rem",
                    opacity: "1", top: "0",
                    transform: "translate3d(-1.5rem,0,1.5rem)",
                    transition: "all .2s linear"
                });
                $(".d3-ul li").eq(index + 1).css({
                    width: "2.6rem", height: "2.6rem",
                    top: ".4rem", transform: "translate3d(-.7rem,0,1rem)",
                    transition: "all .2s linear", opacity: ".7"
                });
                $(".d3-ul li").eq(index + 2).css({
                    width: "1.9rem", height: "1.9rem", opacity: ".7",
                    top: ".8rem", transform: "translate3d(0,0,0)",
                    transition: "all .2s linear"
                });
                if(index>=1){
                $(".d3-ul li").eq(index-1).css({
                    width: "2.6rem", height: "2.6rem",
                    top: ".4rem", transform: "translate3d(-3rem,0,1rem)",
                    transition: "all .2s linear", opacity: ".7"
                });
                }
            }
        }
    });
    $(".lighten-LT").click(function(){
        var html="<div class='lt-pop'><p>聊天请下载APP哦···</p><div class='lt-btn'>确定</div></div>";
        $(".pop").append(html).css("display","block");
        $(".lt-btn").click(function(){
            $(".pop").html("").css("display","none");
        })
    })
    $(".lighten-love").click(function(){
        //点击触发ajax
        //成功更换图片
        $(this).attr("src","../../image/icons/lloves.png");
    });
    $(".closes").click(function(){
        $(".pop-buy").fadeOut(100);
    })
    $(".lighten-WeiX").click(function(){
        var m_uid=$(this).attr("alt");
        $(".pop-buy").fadeIn(100);
        $(".pop-user").val(m_uid);
    
    });
    $(".pop-item").click(function(){
        $(this).addClass("active2").siblings(".active2").removeClass("active2");
        $(".pop-price").val($(this).attr("title"));
        $("#popBtn").attr("disabled",false)
    });
    $(".btnLT").click(function(){
        var m_uid=$(this).attr("alt");
            $(".pop-buy").fadeIn(100);
            $(".pop-user").val(m_uid);
    })
    var html=" <li class='groomItem'><div class='user-content' title="+uid+">"+
        "<img src="+img+" class='userImg'><div class='groom-nick'>"+
        "<p><span class='nick'>省钱</span><em>陕西&nbsp;西安</em></p><p>29岁·168cm·狮子座·设计师</p></div>"+
        " <img src="+image/icons/love.png+" class='love'></div>"+
        "<div class='matchmaker-box'><div class='matchmaker-user'>"+
        "<img src="+image/img/x_one.jpg+" class='maker-img lt'>"+
        "<span class='lt'>红娘<i>杜杜</i>推荐了TA</span>"+
        "<img src="+image/icons/weixin.png+" class='rt btnLT'></div>"+
        "<p>媒婆如果没有描述不显示</p>"+
        "<h1>推荐理由:<span>你俩都是IT界的二杆子</span></h1></div></li>"
})