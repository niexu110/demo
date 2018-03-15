var userObj=JSON.parse(localStorage.getItem('userData'));
var Height=window.screen.availHeight;
$(function(){
    var url=d_http+"index.php/home/Engagement/date_index";
    var url1=d_http+"index.php/Home/engagement/recommend_index";
    var data={page:0,lat:localStorage.getItem("x"), lng:localStorage.getItem("y")};
    $("#FB_fixed").css("height",Height); $("#FB_box").css("height",Height);
    var height=$(".FB_fixed_box").height();
    _ajax.getAjax(url,"","GET",function(res){
        var banner=res.data.banner, list=res.data.list,assortment=res.data.assortment,merchant=res.data.merchant;
        for(var k in banner){
            $(".personal_imgs ul") .append("<li><img src="+banner[k].images+"></li>")
            $(".personal_radius").append("<span></span>")}
        $('.personal_radius span').eq(0).addClass('act');
        var width=$(".personal_imgs ul li").width();
        $(".personal_imgs ul").width(width*banner.length);
        var index=0;
        setInterval(function(){
            if(index>=banner.length){
                index=0;
                $('.personal_radius span').removeClass('act');
                $('.personal_radius span').eq(index).addClass('act');
                $(".personal_imgs ul").css("margin-left",0);
            }else{
                $('.personal_radius span').removeClass('act');
                $('.personal_radius span').eq(index).addClass('act');
                $(".personal_imgs ul").css("margin-left",-index*width);
                index++;
            }
        },2000)
        //四大项
        for(var k in list){
            if(list[k].recommend==1){
                $(".personal_mian_oneUl").append("<li title="+list[k].id+"><span class='left-img'>"+
                    "<img src="+list[k].images+"></span><span class='right-content'>"+
                    "<p>"+list[k].title+"</p><em>"+list[k].mood+"</em></span>"+
                    "<img src='../../img/n_tj.png' id='Bname'></li>")
            }else{
                $(".personal_mian_oneUl").append("<li title="+list[k].type+"><span class='left-img'>"+
                    "<img src="+list[k].images+"></span><span class='right-content'>"+
                    "<p>"+list[k].title+"</p><em>"+list[k].mood+"</em></span></li>")
            }
        }
        $(".personal_mian_oneUl li").click(function(){
            var strId=$(this).attr("title");
            if(strId==1){location.href="personalAppointment.html"}
            if(strId==2){if(userObj==null){
                localStorage.setItem("url",window.location.href);   location.href="../../src/login/login.html";
                }else{  $("#FB_box").css("display","block") ; }}
            if(strId==3){location.href="../../src/team/teamIndex.html"}
            if(strId==4){ if(userObj==null){
                localStorage.setItem("url",window.location.href);   location.href="../../src/login/login.html";
            }else{localStorage.setItem("d_classfiy","1");location.href="../../src/myself/mydate.html";}}
        })
        //热门推送
        for(var k in assortment){
            if(assortment[k].hot==1){
                $(".personal_mian_titleBox ol").append("<li> <img src="+assortment[k].images+"><h1>"+assortment[k].name+"</h1>"+
                    "<img src='../../img/n_hot.png' id='Iname'></li>")
            }else{
                $(".personal_mian_titleBox ol").append("<li> <img src="+assortment[k].images+"><h1>"+assortment[k].name+"</h1></li>")
            }
        }
        $(".personal_mian_titleBox ol li").on("click",function(){
            location.href="canvass.html";
        })
        //热门推荐商家
        for(var k in merchant){
            if(merchant[k].logo==null){
                $(".ul").append("<li title="+merchant[k].goods_id+"><span><img src='../../img/n_ly.png'></span><p>"+merchant[k].shop_name+"</p></li>")
            }else{ $(".ul").append("<li title="+merchant[k].goods_id+"><span><img src="+merchant[k].logo+"></span><p>"+merchant[k].shop_name+"</p></li>");}
        }
        var W=$(".ul li").width();
        $(".ul").width(W*merchant.length+180+"px");
        $(".ul li").click(function(){  var shop_id=$(this).attr("title");var object={m_uid:0,sex:0}; localStorage.setItem("s_object",JSON.stringify(object));  location.href="businessInfo.html?id="+shop_id;
        });
        $(".left_a").click(function(){  location.href="sendDate.html";});
        $("#FB_fixed").click(function(){$("#FB_fixed").css("display","none");})
        $("#FB_box").click(function(){$("#FB_box").css("display","none");})
    })
    _ajax.getAjax(url1,data,"POST",function(res){
          orderLists(res.data,$(".personal_mian_appointment"));
        var  isOpen=true;
        var clientH = Number(document.documentElement.clientHeight);
        var H=Number($("#pullUp").height());
        $(document).on('scroll',function() {
            if (isOpen) {
                var docH = parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
                var H5Top = parseInt($('#pullUp').offset().top + H);
                if (docH > H5Top-150) {
                    isOpen = false;   data.page++;
                    $("#pullUp").html("数据加载中......");
                    _ajax.getAjax(url1,data,"POST",function(res){
                        if(res.code==404){
                            isOpen=false;   $("#pullUp").html("<p style='color:#5793dd;'>点击查看更多约会</p>");
                            $("#pullUp p").click(function(){location.href="personalAppointment.html";})
                        }else{
                            isOpen=true;$("#pullUp").html("加载完毕");
                            orderLists(res.data,$(".personal_mian_appointment"));
                            $(".personal_mian_appointment_opt #yhBtn").click(function(e){
                                e.stopPropagation();  var id= $(this).attr("title"),f_uid=$(this).attr("data-alt"),text=$(this).attr("alt");
                                 var that=$(".bomb");
                                if(userObj==null){
                                    localStorage.setItem("url",window.location.href);
                                    location.href="../../src/login/login.html";
                                }else{
                                    if(userObj.uid==f_uid){
                                        fadeTagle(that,"不可以参加自己的约会哦","../../img/icon/h_bombClose.png")
                                    }else{
                                        $(".btnOK").attr("title",id);  $(".CanName").text(text);
                                        $("#FB_fixed").css("display","block");
                                    }
                                }
                            })
                        }
                    });
                }
            }
        });
        $(".btnOK").click(function(){
            var datas={}, that=$(".bomb");
            var order_id= $(this).attr("title");
            datas.uid=userObj.uid;  datas.eid=order_id;
            datas.token=MD5(userObj.uid+order_id+SL);
            var url=d_http+"index.php/Home/Engagement/user_apply";
            $("#FB_fixed").css("display","none");
            _ajax.getAjax(url,datas,"POST",function (res) {
                if(res.code==200){
                    $(this).removeAttr("title");
                    fadeTagle(that,res.massage,"../../img/icon/h_report.png")
                }else{
                    fadeTagle(that,res.massage,"../../img/icon/h_bombClose.png")
                }
            })
        })
        $(".btnClose").click(function(){
            $("#FB_fixed").slideUp(500);
            $(".btnOK").removeAttr("title")
        })
        $(".personal_mian_appointment_opt #yhBtn").click(function(e){
            e.stopPropagation();  var id= $(this).attr("title"),f_uid=$(this).attr("data-alt"),text=$(this).attr("alt");
            var that=$(".bomb");
            if(userObj==null){
                localStorage.setItem("url",window.location.href);
                location.href="../../src/login/login.html";
            }else{
                if(userObj.uid==f_uid){
                    fadeTagle(that,"这是您自己发布的约会哦","../../img/icon/h_bombClose.png")
                }else{
                    $("#FB_fixed").css("display","block");
                    $(".btnOK").attr("title",id);$(".CanName").text(text);
                }
            }
        })
    });
});
function orderLists(list,self){
    for(var k in list){
        if(list[k].goods_id ==0){
            list[k].mood_time==""?list[k].time="时间不限":list[k].time=format(list[k].mood_time);
            list[k].image===""?list[k].image="../../img/icon/d_head.png":list[k].image=list[k].image+'/head';
            list[k].sex==="1"?(list[k].img="../../img/n_boys.png",list[k].class="age")
                :(list[k].img="../../img/n_girl.png",list[k].class="ages");
            self.append(
                "<div class='personal_mian_appointment_details' >"+
                "<img src='../../img/n_zdy.png' class='Start'><div class='personal_mian_appointment_top_box'title="+list[k].id+">"+
                "<div class='personal_mian_appointment_leftImg pull-left' title="+list[k].fid+" >"+
                "<img src="+list[k].image+"></div><div class='personal_mian_appointment_rightContent pull-right'>"+
                "<p class='p_title'>"+list[k].object+"</p>"+
                "<p><em>"+list[k].nickname+"</em><span class="+list[k].class+"><img src="+list[k].img+"><b>"+list[k].age+"</b></span></p>"+
                "<p>"+list[k].addr+"</p><p><span>"+list[k].time+"</span></p>"+
                "</div></div> <div class='personal_mian_appointment_opt'>"+
                "<span id='yhBtn' title="+list[k].id+" data-alt="+list[k].fid+" alt="+list[k].nickname+"><img src='../../img/n_tx.png'>和TA约</span><span id='ltBtn'><img src='../../img/n_lt.png'>和TA聊</span></div></div>"+
                "<p class='lines'></p>")
        }else{
            list[k].mood_time==""?list[k].time="时间不限":list[k].time=format(list[k].mood_time);
            list[k].image===""?list[k].image="../../img/icon/d_head.png":list[k].image=list[k].image+'/head';
            list[k].type==="1"?list[k].treatWay="../../img/n_wqk.png":
                (list[k].type==="2"?list[k].treatWay="../../img/n_aaz.png"
                    :list[k].treatWay="../../img/n_qwb.png");
            list[k].sex==="1"?(list[k].img="../../img/n_boys.png",list[k].class="age")
                :(list[k].img="../../img/n_girl.png",list[k].class="ages");
            self.append(
                "<div class='personal_mian_appointment_details' >"+
                "<img src="+list[k].treatWay+" class='Start'><div class='personal_mian_appointment_top_box'title="+list[k].id+">"+
                "<div class='personal_mian_appointment_leftImg pull-left' title="+list[k].fid+" >"+
                "<img src="+list[k].image+"></div><div class='personal_mian_appointment_rightContent pull-right'>"+
                "<p class='p_title'>["+list[k].object+"]"+list[k].goods_name+"</p>"+
                "<p><em>"+list[k].nickname+"</em><span class="+list[k].class+"><img src="+list[k].img+"><b>"+list[k].age+"</b></span></p>"+
                "<p>"+list[k].addr+"</p><p><span>"+list[k].time+"</span> <span class='pull-right JL'>"+list[k].distance+"km</span></p>"+
                "</div></div> <div class='personal_mian_appointment_opt'>"+
                "<span id='yhBtn' title="+list[k].id+" data-alt="+list[k].fid+" alt="+list[k].nickname+"><img src='../../img/n_tx.png'>和TA约</span><span id='ltBtn'><img src='../../img/n_lt.png'>和TA聊</span></div></div>"+
                "<p class='lines'></p>")
        }
    }
    $(".personal_mian_appointment").find("div").eq(0).find("img").eq(0).addClass("starts");
    $(".personal_mian_appointment_top_box").click(function(){
        var order_id=$(this).attr('title');
        location.href="joinData.html?id="+order_id;
    })
    $(" #ltBtn").click(function(){
        location.href="../myself/download.html"
    })
    $(".personal_mian_appointment_leftImg").click(function(e){
        e.stopPropagation();
        var id=$(this).attr("title");
        location.href="../../src/find/personalcarte.html?fid="+id;
    })
}