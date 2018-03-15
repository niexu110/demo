var userObj=JSON.parse(localStorage.getItem('userData'));
var uid=null;
var page=0;
var str=0;
var Height=window.screen.availHeight;
var status,old_uid;//status 0是审核中 1是审核通过 2失败 old_uid 0未认证 1以认证
$(function(){
    $("#FB_fixed").css("height",Height);$("#FB_box").css("height",Height);
    var height=$(".FB_fixed_box").height();
    var top=(Height-height)/2;
    $(".FB_fixed_box").css("top",top);
    if(userObj!=null){
        $.ajax({
            type:"POST",
            url:d_http+"index.php/Home/Index/identity_list",
            data:{uid:userObj.uid},
            success:function(res){
                status=res.data.status;
                old_uid=res.data.old_uid;
            }
        })
    }
    $.ajax({
        type:"POST",
        url:d_http+"index.php/Home/Engagement/index",
        data:{x:localStorage.getItem("x"), y:localStorage.getItem("y"), page:page, token:MD5(SL)},
        success:function(data){
            var list=data.data.fb_list;
            var category=data.data.category;
            if(list.length==0){
                $('.personal_main').append(
                    "<div style='text-align: center;color:#999;font-size: .28rem;padding-top:.5rem;'>暂无此类约会...</div>")
                $("#pullUp").html("");
            }else {
            tabulation(list,$('.personal_main'));
            }
            for(var k in category){
                category[k].cat_id==1?category[k].cat_id=0:"";
                $(".personal_nav_box").append(
                    "<li title="+category[k].cat_id+"><img src="+category[k].mobileimg+" alt="+category[k].images+" title="+category[k].mobileimg+"><p>"+category[k].cat_name+"</p></li>")}
            $(".personal_nav_box li").eq(0).addClass("active");
            $(".personal_nav_box li").eq(0).find("img").attr("src",$(".personal_nav_box li").eq(0).find("img").attr("alt"));
            $(".personal_nav li").click(function(e){
                e.preventDefault();
                var self=$(this),index=self.index();
                self.addClass('active').siblings(".active").removeClass('active');
                for(var i=0;i<$(".personal_nav li").length;i++){
                    if(i==index){
                        $(".personal_nav li").eq(i).find("img").attr("src",$(".personal_nav li").eq(i).find("img").attr("alt"))
                    }else{
                        $(".personal_nav li").eq(i).find("img").attr("src",$(".personal_nav li").eq(i).find("img").attr("title"))
                    }
                }
                $('.personal_main').html("");
                page=0;
                var num=self.attr('title');
                str=num;
                orderList(localStorage.getItem("x"),localStorage.getItem("y"),page,num,1)
            })
        }
    })
    $("#FB_fixed").click(function(){$("#FB_fixed").css("display","none");})
    $("#FB_box").click(function(){$("#FB_box").css("display","none");})
    $(".personal_FB").click(function(){
        if(userObj==null){
            localStorage.setItem("url",window.location.href);  location.href="../../src/login/login.html";
        }else{
            if(type==0){
                imgJudge(type);
            }else{
                if(status!=1){
                    stat(status)
                }else{
                    if(old_uid==0){
                        ordUid(old_uid);
                    }else{
                        $("#FB_box").css("display","block") ;
                    }
                }
            }
        }
    });
    $(".btnOK").click(function(){
        var order_id= $(this).attr("title");
        $("#FB_fixed").css("display","none");
        joinDate(userObj.uid,order_id);
    })
    $(".btnClose").click(function(){
        $("#FB_fixed").slideUp(500);
    })
    $(".left_a").click(function(){location.href="sendDate.html";})
});
var  isOpen=true;
var clientH = Number(document.documentElement.clientHeight);
var H=Number($("#pullUp").height());
$(document).on('scroll',function(){
    if(isOpen){
        var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop+clientH);
        var H5Top=parseInt($('#pullUp').offset().top+H);
        if(docH>H5Top-150){
            isOpen=false;
            page++;
            $("#pullUp").html("数据加载中......");
            orderList(localStorage.getItem("x"),localStorage.getItem("y"),page,str,2)
        }
    }
})
function orderList(x,y,page,num,type){
    if(type==1){
        $.ajax({
            type:"POST",
            url:d_http+"index.php/Home/Engagement/index",
            data:{x:localStorage.getItem("x"), y:localStorage.getItem("y"), page:page, cat_id:num, token:MD5(SL)},
            success:function(data){
                var list=data.data.fb_list;
                if(list.length==0){
                    $('.personal_main').append(
                        "<div style='text-align: center;color:#999;font-size: .28rem;padding-top:.5rem;'>暂无此类约会...</div>")
                    $("#pullUp").html("");
                }else {
                    tabulation(list,$('.personal_main'));
                }
            }
        })
    }else if(type==2){
        $.ajax({
            type:"POST",
            url:d_http+"index.php/Home/Engagement/index",
            data:{x:localStorage.getItem("x"), y:localStorage.getItem("y"), page:page, cat_id:num, token:MD5(SL)},
            success:function(data){
                var list=data.data.fb_list;
                if(list.length==0){
                    $("#pullUp").html("暂无数据....");
                    setTimeout(function(){
                        $("#pullUp").html("");
                    },2500);
                    isOpen=true;
                }else{
                   tabulation(list,$('.personal_main'));
                    isOpen=true;
                    $("#pullUp").html("");
                    //参加约会
                }
            }
        })
    }
}
function tabulation(list,self) {
        for (var k in list) {
            if (list[k].goods_id == 0) {
                list[k].mood_time == "" ? list[k].time = "时间不限" : list[k].time = format(list[k].mood_time);
                list[k].image === "" ? list[k].image = "../../img/icon/d_head.png" : list[k].image = list[k].image + '/head';
                list[k].sex === "1" ? (list[k].img = "../../img/n_boys.png", list[k].class = "age")
                    : (list[k].img = "../../img/n_girl.png", list[k].class = "ages");
                self.append(
                    "<div class='personal_mian_appointment_details' >" +
                    "<img src='../../img/n_zdy.png' class='Start'><div class='personal_mian_appointment_top_box'title=" + list[k].id + ">" +
                    "<div class='personal_mian_appointment_leftImg pull-left' title=" + list[k].fid + ">" +
                    "<img src=" + list[k].image + "></div><div class='personal_mian_appointment_rightContent pull-right'>" +
                    "<p class='p_title'>" + list[k].object + "</p>" +
                    "<p><em>" + list[k].nickname + "</em><span class=" + list[k].class + "><img src=" + list[k].img + "><b>" + list[k].age + "</b></span></p>" +
                    "<p>" + list[k].addr + "</p><p><span>" + list[k].time + "</span></p>" +
                    "</div></div> <div class='personal_mian_appointment_opt'>" +
                    "<span id='yhBtn' title=" + list[k].id +" data-alt="+list[k].fid+" alt="+list[k].nickname+"><img src='../../img/n_tx.png'>和TA约</span><span id='ltBtn'><img src='../../img/n_lt.png'>和TA聊</span></div></div>" +
                    "<p class='lines'></p>")
            } else {
                list[k].mood_time == "" ? list[k].time = "时间不限" : list[k].time = format(list[k].mood_time);
                list[k].image === "" ? list[k].image = "../../img/icon/d_head.png" : list[k].image = list[k].image + '/head';
                list[k].type === "1" ? list[k].treatWay = "../../img/n_wqk.png" :
                    (list[k].type === "2" ? list[k].treatWay = "../../img/n_aaz.png"
                        : list[k].treatWay = "../../img/n_qwb.png");
                list[k].sex === "1" ? (list[k].img = "../../img/n_boys.png", list[k].class = "age")
                    : (list[k].img = "../../img/n_girl.png", list[k].class = "ages");
                self.append(
                    "<div class='personal_mian_appointment_details' >" +
                    "<img src=" + list[k].treatWay + " class='Start'><div class='personal_mian_appointment_top_box'title=" + list[k].id + ">" +
                    "<div class='personal_mian_appointment_leftImg pull-left' title=" + list[k].fid + ">" +
                    "<img src=" + list[k].image + "></div><div class='personal_mian_appointment_rightContent pull-right'>" +
                    "<p class='p_title'>[" + list[k].object + "]" + list[k].goods_name + "</p>" +
                    "<p><em>" + list[k].nickname + "</em><span class=" + list[k].class + "><img src=" + list[k].img + "><b>" + list[k].age + "</b></span></p>" +
                    "<p>" + list[k].addr + "</p><p><span>" + list[k].time + "</span> <span class='pull-right JL'>" + list[k].juli + "km</span></p>" +
                    "</div></div> <div class='personal_mian_appointment_opt'>" +
                    "<span id='yhBtn' title=" + list[k].id +" data-alt="+list[k].fid+" alt="+list[k].nickname+"><img src='../../img/n_tx.png'>和TA约</span><span id='ltBtn'><img src='../../img/n_lt.png'>和TA聊</span></div></div>" +
                    "<p class='lines'></p>")
            }

        }
        $(".personal_mian_appointment_top_box").click(function(){
            var order_id=$(this).attr('title')
            location.href="joinData.html?id="+order_id;
        })
       $(".personal_mian_appointment_opt #yhBtn").click(function(e){
           e.stopPropagation();  var id= $(this).attr("title"),f_uid=$(this).attr("data-alt"),text=$(this).attr("alt");
           var that=$(".bomb");
           if(userObj==null){
               localStorage.setItem("url",window.location.href);   location.href="../../src/login/login.html";
           }else{
              if(userObj.uid==f_uid){
                   fadeTagle(that,"这是您自己发布的约会哦","../../img/icon/h_bombClose.png")
               }else{
                  if(type==0){
                      imgJudge(type);
                  }else{
                      if(status!=1){
                          stat(status)
                      }else{
                          if(old_uid==0){
                              ordUid(old_uid);
                          }else{
                              $(".btnOK").attr("title",id);  $(".CanName").text(text);
                              $("#FB_fixed").css("display","block");
                          }
                      }
                  }
               }
          }
    })
        $(".personal_mian_appointment_leftImg").click(function(e){
            e.stopPropagation();
            var id=$(this).attr("title");
            location.href="../../src/find/personalcarte.html?fid="+id;
        })
        $(" #ltBtn").click(function(){
            location.href="../myself/download.html"
        })
}
function joinDate(uid,id){
    $.ajax({
        type:"POST",
        url:d_http+"index.php/Home/Engagement/user_apply",
        data:{uid:uid, eid:id, token:MD5(uid+id+SL)},
        success:function(res) {
            if (res.code == 200) {
                fadeTagle($(".bomb"),res.massage,"../../img/icon/h_report.png")
            } else {
                fadeTagle($(".bomb"),res.massage,"../../img/icon/h_bombClose.png")
            }
        }
    })
}

