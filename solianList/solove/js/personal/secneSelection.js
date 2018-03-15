/**
 * Created by Administrator on 2017/3/16.
 */
$(function(){
    var url=d_http+"index.php/Home/Engagement/goods";
    var data={x:localStorage.getItem("x"),y:localStorage.getItem("y"),page:"0"};
    var  isOpen=true;
    _ajax.getAjax(url,data,"POST",function(res){
        console.log(res)
        shopList(res.data.goods,$(".sceneSelection ul"));
        $.each(res.data.cate,function(i,k){
            var html="<li title="+k.cat_id+"><img src="+k.mobileimg+" alt="+k.images+" title="+k.mobileimg+"><p>"+k.cat_name+"</p></li>";
            $(".personal_nav_box").append(html)
        });
        $(".personal_nav_box li").eq(0).addClass("active");
        $(".personal_nav_box li").eq(0).find("img").attr("src",$(".personal_nav_box li").eq(0).find("img").attr("alt"));
        $(".personal_nav li").click(function(e){
            e.preventDefault();
            var index=$(this).index();
            $(this).addClass('active').siblings(".active").removeClass('active');
            for(var i=0;i<$(".personal_nav li").length;i++){
                if(i==index){
                    $(".personal_nav li").eq(i).find("img").attr("src",$(".personal_nav li").eq(i).find("img").attr("alt"))
                }else{
                    $(".personal_nav li").eq(i).find("img").attr("src",$(".personal_nav li").eq(i).find("img").attr("title"))
                }
            }
            $(".sceneSelection ul").html("");
            data.cate_id=$(this).attr("title");data.page=0;
          _ajax.getAjax(url,data,"POST",function(res){
              console.log(res)
              if(res.code==404){
                  $(".sceneSelection ul").append(
                      "<li><p style='text-align:center; color:#999;margin-top:.5rem;'>亲！商家正在赶来...</p></li>"
                  );
              }else {
                  shopList(res.data.goods, $(".sceneSelection ul"));
              }
          })
        })
    })
    var clientH = Number(document.documentElement.clientHeight);
    var H=Number($("#pullUp").height());
    $(document).on('scroll',function(){
        if(isOpen){
            var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop+clientH);
            var H5Top=parseInt($('#pullUp').offset().top+H);
            if(docH>=H5Top-150){
                isOpen=false;
                data.page++;
                $("#pullUp").html("数据加载中......");
               _ajax.getAjax(url,data,"POST",function(res){
                   if(res.code==404){
                       $("#pullUp").html(res.massage);
                       setTimeout(function(){
                           $("#pullUp").html("");
                       },2500)
                       isOpen=true;
                   }else{
                      shopList(res.data.goods,$(".sceneSelection ul"));
                       isOpen=true;
                       $("#pullUp").html("");
                   }
               })
            }
        }
    })
})
function shopList(list,self){
    $.each(list,function(i,k){
        var html="<li class='shop_box' title="+k.goods_id+" alt="+k.s_id+">"+
            "<img src="+k.mobileimg+" class='itemImg'>"+
            "<div class='ItemContainer'>"+
            "<p>"+k.goods_name+"</p>"+
            "<p>"+k.addr+"</p>"+
            "<p><b style='color:#5793dd;font-size:.3rem;'>￥"+k.shop_price+"</b>"+
            "<span class='pull-right'>"+k.distance+"km</span></p></div></li>"
        self.append(html)
    })
    //场景切换
    $(".shop_box").click(function(){
        var num=$(this).attr("title"),s_id=$(this).attr("alt");
        setTimeout(function(){
            location.href="businessInfo.html?id="+num;
        },500)
    });
}






