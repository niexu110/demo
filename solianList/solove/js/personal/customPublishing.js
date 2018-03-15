var time=new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate());
$(function () {
    var Height=window.screen.availHeight;
    var het=$("#RE_fixeds").height();
    var tops=(Height-het)/2;
    $("#RE_fixeds").css("top",tops);
    var sexObj=[{sex:"男",num:"1"},{sex:"女",num:"2"},{sex:"男女不限",num:"0"}],
         timeObj=[{title:"不限时间",num:"0"},{title:"指定时间",num:"1"},{title:"取消",num:"3"}];
    var url=d_http+"index.php/Home/engagement/object";
    var data={sex:"1",is_send:"1",uid:localStorage.getItem("uid"),token:MD5(localStorage.getItem("uid")+SL)},list={};
    _ajax.getAjax(url,"","GET",function(res){
        list=res.data;
    });
    $(".customTheme").click(function(){
        $("#inputTheme").attr("name","theme");
        $("#inputTheme").attr("placeholder","请选择或手动填写约会主题(15字内)");
        $.each(list,function(i,k){
            var html="<span>"+k+"</span>";   $(".custom-theme-content").append(html);
        });
        $(".custom-theme-content span").click(function(){
            $("[name='theme']").val($(this).text()); $(".customTheme em").text($(this).text());
            data.object=$(this).text();
        });
        $(".custom-ok").fadeIn(200);   $(".custom-themes").fadeIn(200);
        $(".SL_nav em").text("约会主题");  $(".IMG").attr("alt",2);
        $(".custom-ok").click(function(){
             $(this).fadeOut(200);  $(".IMG").attr("alt",1); $(".custom-theme-content").html("");
             $(".SL_nav em").text("发布约会");  $(".custom-themes").fadeOut(200); $("#inputTheme").val("");
        })
    });
    $(".customAddress").click(function(){
        $("#inputTheme").attr("name","address");
        $("#inputTheme").attr("placeholder","请手动填写约会地点(15字内)");
        $(".custom-ok").fadeIn(200);   $(".custom-themes").fadeIn(200);
        $(".SL_nav em").text("约会场景");  $(".IMG").attr("alt",2);
        $(".custom-ok").click(function(){
            $(this).fadeOut(200);  $(".IMG").attr("alt",1);
            $(".SL_nav em").text("发布约会");  $(".custom-themes").fadeOut(200);
            $("#inputTheme").val("");
        })
    });
    //选地址或主题
    $("#inputTheme").change(function(){
      if($(this).attr("name")==="theme"){
          $(".customTheme em").text($(this).val());
           data.object=$(this).val();
      }else{
          $(".customAddress em").text($(this).val());
          data.address=$(this).val();
      }
    })
    $(".IMG").click(function(){
        if($(this).attr("alt")==1){history.go(-1)}
        else{$(".custom-ok").fadeOut(200);  $(".SL_nav em").text("发布约会");
             $(".custom-themes").fadeOut(200);$(".custom-theme-content").html("");}
    });
    //选性别
    $(".customSex").click(function(e){
        e.stopPropagation();
        $(".customSexs").fadeIn(200);
       for(var k in sexObj){
           $(".customBox").append("<p title="+sexObj[k].num+">"+sexObj[k].sex+"</p>")
       };
        $(".customBox p").on("click",function(e){
            e.stopPropagation();  data.sex=$(this).attr("title");  $(".customBox").html("");
            $(".customSex em").text($(this).text()); $(".customSexs").fadeOut(200);
        })
    });
    //选时间
    $(".customTime").click(function(e){
        e.stopPropagation();
        $(".customSexs").fadeIn(200);
        for(var k in timeObj){
            if(timeObj[k].num==1){
                $(".customBox").append("<h2 title="+timeObj[k].num+">"+timeObj[k].title+"</h2>")
            }else if(timeObj[k].num==3){
                $(".customBox").append("<h3 title="+timeObj[k].num+">"+timeObj[k].title+"</h3>")
            }else{
                $(".customBox").append("<p title="+timeObj[k].num+">"+timeObj[k].title+"</p>")
            }
        };
        $(".customBox p").click(function(e){
            $(".customTime em").text($(this).text());
            $(".customSexs").fadeOut(200);    $(".customBox").html("");
        })
        $(".customBox h3").click(function(){
            $(".customSexs").fadeOut(200);    $(".customBox").html("");
        })
        $(".customBox h2").click(function(){
            var date=null;
           $(".customTimeBox").fadeIn(200);
           $(".customTimeBox").append("<p><em class='customClose'>取消</em><em class='customOk'>确定</em></p>"+
               "<h1>请选择时间</h1><input type='date'placeholder='点击选时间' id='timeClick'>");
           $("#timeClick").change(function(){
               date=$("#timeClick").val().replace("T"," ");
               $(".customTimeBox h1").text(date);
           })
            $(".customClose").click(function(){
                $(".customTime em").text("选择约会时间");
                $(".customSexs").fadeOut(200);  $(".customTimeBox").fadeOut(100);
                $(".customTimeBox").html("");   $(".customBox").html("");
            })
            $(".customOk").click(function(){
                if(date==null){
                    return;
                }else{
                  $(".customTime em").text(date);  data.date_time=date;
                  $(".customSexs").fadeOut(200);  $(".customTimeBox").fadeOut(100);
                  $(".customTimeBox").html("");   $(".customBox").html("");
                }
            })
        })
    })
    //接送
    $(".customPick").click(function(){
       $(".pickImg").attr("src","../../img/n_xuan.png");    $(".pickImgs").attr("src","../../img/n_Wxuan.png");
       data.is_send=$(".pickImg").attr("alt")
    });
    $(".customPicks").click(function(){
        $(".pickImgs").attr("src","../../img/n_xuan.png");  $(".pickImg").attr("src","../../img/n_Wxuan.png");
        data.is_send=$(".pickImgs").attr("alt")
    })
    //宣言
    $("#textarea").bind("input propertychange",function () {
        var len=$(this).val().length;  $(".custom-num").text(len+"/200");
        data.other=$(this).val();
    });
    $(".btn_b").click(function(){localStorage.setItem("d_classfiy","2");location.href="../../src/myself/mydate.html";});
    $(".customBtn").click(function(){
        url=d_http+"index.php/Home/Engagement/defined_since";
        var that=$(".bomb");
        data.object===undefined?fadeTagle(that,"请选择约会主题","../../img/icon/h_bombClose.png")
            :(data.address===undefined?fadeTagle(that,"请选择约会地点","../../img/icon/h_bombClose.png")
            :(data.other===undefined?fadeTagle(that,"请填写约会说明","../../img/icon/h_bombClose.png")
            :(data.other.length<10?fadeTagle(that,"说明最少10个字","../../img/icon/h_bombClose.png")
            :(((new Date(data.date_time)).getTime()/1000<(new Date(time)).getTime()/1000)?fadeTagle(that,"约会时间不能晚于当日时间","../../img/icon/h_bombClose.png")
              :_ajax.getAjax(url,data,"POST",function (res) {
                   if(res.code==200){$(".box").css("display","block");}
                    })))))
    })
})
