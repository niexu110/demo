/**
 * Created by Administrator on 2017/6/28.
 */
$(function(){
    var data={cmd:800001,token:MD5(SL),page:0,lat:localStorage.getItem("x"),lng:localStorage.getItem("y")}
    _ajax.getAjax(d_http,{cmd: 800003,token:MD5(SL)},"POST",function(res){
        var list=res.data;
         $.each(list,function(i,k){
             var html=" <li title="+k.cat_id+" class='titleItem'><img src="+k.mobileimg+" ><p>"+k.cat_name+"</p></li>";
             $(".group-nav-box").append(html);
         })
        var w=$(".titleItem").width();
        $(".group-nav-box").width(w*list.length+50);
    })
     _ajax.getAjax(d_http,data,"POST",function (res){
         var list=res.data;
         groupList(list);
     })
    var  isOpen=true;
    var clientH = Number(document.documentElement.clientHeight);
    var H=Number($("#pullUp").height());
    $(document).on('scroll',function() {
        if (isOpen) {
            var docH = parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
            var H5Top = parseInt($('#pullUp').offset().top + H);
            if (docH > H5Top - 150) {
                isOpen = false;   data.page++;
                $("#pullUp").html("数据加载中......");
                _ajax.getAjax(d_http,data,"POST",function(res){
                    if(res.code==="404"){
                        isOpen=false;$("#pullUp").html("暂无数据......");
                        $("#pullUp").fadeOut(3000)
                    }else{
                        groupList(res.data);
                        isOpen=true;$("#pullUp").html("加载完毕");
                    }
                })
            }
        }
    });
    $(".group-GL").click(function(){location.href="groupManage.html"})
    function groupList(list){
        $.each(list,function(i,k){
            k.date_time=formats(k.date_time);
            k.type==1?(k.className="SL",k.classAge="GF")
                :(k.type==2&&k.sex==1?(k.className="nikeName",k.classAge="age",k.img="../../img/n_boys.png")
                :(k.className="nikeName",k.classAge="ages",k.img="../../img/n_girl.png"))
            if(k.type==1){
                var html="<li class='group-item'><div class='group-title'>"+
                    "<img src="+k.image+" class='userImg pull-left'><p class='pull-left'>"+
                    "<span class="+k.className+">"+k.nickname+"</span><span class="+k.classAge+">官方</span> </p></div><div class='group-icon'>"+
                    "<img src="+k.images+"></div>"+
                    "<div class='group-footer'>"+
                    "<p>"+k.name+"</p>"+
                    "<h2>"+k.address+"</h2>"+
                    "<h2><span class='pull-left'>"+k.date_time.date+"<em style='margin-left:.2rem;'>"+k.date_time.time+"</em></span>"+
                    "<span class='pull-right'><em class='group-price'>￥"+k.price+"</em>/人</span></h2></div>"
                $(".group-UL").append(html);
            }else{
                var txt="<li class='group-item'><div class='group-title'>"+
                    "<img src="+k.image+" class='userImg pull-left'><p class='pull-left'>"+
                    "<span class="+k.className+">"+k.nickname+"</span>"+
                    "<span class="+k.classAge+"><img src="+k.img+" ><em>"+k.age+"</em>"+
                    "</span></p></div><div class='group-icon'>"+
                    "<img src="+k.images+"></div>"+
                    "<div class='group-footer'>"+
                    "<p>"+k.name+"</p>"+
                    "<h2>"+k.address+"</h2>"+
                    "<h2><span class='pull-left'>"+k.date_time.date+" <em style='margin-left:.2rem;'>"+k.date_time.time+"</em></span>"+
                    "<span class='pull-right'><em class='group-price'>￥"+k.price+"</em>/人</span></h2></div>";
                $(".group-UL").append(txt);
            }
        })
    }
})
