/**
 * Created by Administrator on 2017/3/7.
 */
var goods_id=null;
$(function(){
    var URL = document.location.toString();
    goods_id = URL.substring(URL.lastIndexOf("=") + 1, URL.length);
    if(localStorage.getItem("dd")==1){
    	$(".btn").hide();
    	$(".hide").css("margin-bottom","0")
    	localStorage.removeItem("dd");
    }else{
    	$(".btn").show();
    }
    $.ajax({
        type:"POST",
        url:d_http+"index.php/Home/Engagement/goods_detail",
        data: {
            id:goods_id
        },
        success: function(data) {
            var list=data.data;
        	var b_object = {
			    shop_id :goods_id ,
//				food_id : ,
				shop_name : list.goods_name,
				shop_address: list.address,
			};
            money=list.shop_price;
            price=money;
            $("#time").text(format(list.start_time)+"-"+format(list.end_time))
            $("#price").text(list.shop_price)
            $("#market").text("门市价:￥"+list.market_price)
            $(".title b").text(list.goods_name);
            $(".img").attr("src",list.mobileimg);
            $(".Descrition_span").text(list.goods_brief);
            $(".Descrition_span1").text(list.goods_name);
            $(".Descrition_span2").text(list.shop_price+"元");
            $(".release_moneys em").text(list.shop_price+"元");
            $(".Descrition_span3").text(list.address);
            $(".Descrition_ambient_address span").text(list.address);
            $(".phone").attr("href","tel://"+list.phone);
            $(".n_tell").attr("href","tel://"+list.phone);
            $(".title p").text(list.address);
            $(".Descrition_ambient_address em").text(list.phone);
            $(".Descrition_box_two").html("<h1>服务内容:</h1>"+list.goods_desc);
            $(".Descrition_ambient_content").html(list.details);
            $(".Descrition_ambient_content p").removeAttr("style");
		    $(".btn").on("click",function(){
    			localStorage.setItem("b_object",JSON.stringify(b_object));
		    	location.href="sendDate.html?id="+JSON.parse(localStorage.getItem('s_object')).m_uid;
		    })
        }
    })
    //评论
    $.ajax({
        type:"POST",
        url:d_http+"index.php/Home/Engagement/discuss",
        data: {
            goods_id:goods_id,
            token:MD5(goods_id+SL)
        },
        success:function(data){
        }
    })
  	$(".nav a").click(function(){
		if($(this).index() == 1 || $(this).index() == 2){
			$("body").css("background","#fff")
		}else{
			$("body").css("background","#f3f3f3")
		}
		var index = $(this).index(); 
     	$(this).addClass("curr").siblings("a").removeClass("curr");      
     	$(".box .box_b").eq(index).addClass('actives').siblings(".actives").removeClass('actives');
   });
    $(".tab_nav span").click(function(){
		$(this).addClass("curr_nav").siblings("span").removeClass("curr_nav");
     	var index = $(this).index();
    	$(".list").eq(index).addClass("actives").siblings(".list").removeClass("actives");
    });
    $('.count .list').on('touchstart',function(event){
		var touch = event.originalEvent.changedTouches[0];
		startX=touch.pageX;
	});
//  $(".count .list").on("touchend",function(event){
//  	var move = $(this).index();
//  	var touch = event.originalEvent.changedTouches[0];
//		endX=touch.pageX;
//		if(endX>startX){
//			if(move > 0){
//				$(".tab_nav span").eq(move-1).addClass("curr_nav").siblings().removeClass("curr_nav");
//				$(this).removeClass("actives").prev(".list").addClass("actives");
//			}
//		}else{
//			if(move < 2){
//				$(".tab_nav span").eq(move+1).addClass("curr_nav").siblings().removeClass("curr_nav");
//				$(this).removeClass("actives").next(".list").addClass("actives");
//			}	
//		}
// })
    $(".go").click(function(){
      window.history.back(-1);
    })
})