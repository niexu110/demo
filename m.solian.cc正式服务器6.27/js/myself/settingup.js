var uid=localStorage.getItem("uid");
$(function(){
	$(".d_button").on("click",function(){
		$(".d_box").css("display","block")
	})
	$(".d_quxiao").on("click",function(){
		$(".d_box").css("display","none")
	})
	$(".d_queding").on("click",function(){
		$.ajax({
			type:"post",
			url:d_http+"/index.php/Home/Index/line",
			data : {
				type : 2,
				uid  : uid
			},
			success : function(data){
				console.log(data)
                localStorage.clear();
                location.href="mypage.html";
			}
		});
	})
	$(".d_card").on("click",function(){
		window.location.href="../../src/find/personalcarte.html?id="+uid
	})
	var storage=window.localStorage.length
	if(storage>5){
		$(".d_clear span").html(storage*1.5+"kb");
	}else{
		$(".d_clear span").html("0kb");
	}
	var stor=window.localStorage;
	$(".d_clear").on("click",function(){
		/*window.localStorage*/
		localStorage.removeItem("d_key1");
		localStorage.removeItem("d_key2");
		localStorage.removeItem("faqid");
		localStorage.removeItem("n_nickname");
		localStorage.removeItem("n_sex");
		localStorage.removeItem("n_datauid");
		localStorage.removeItem("n_userimg");
		localStorage.removeItem("nickname");
		localStorage.removeItem("datauid");
		localStorage.removeItem("userimg");
		localStorage.removeItem("goodid");
		localStorage.removeItem("teamid");
		localStorage.removeItem("mygoodid");
		localStorage.removeItem("n_type");
		localStorage.removeItem("n_goodsid");
		localStorage.removeItem("n_goodsid1");
		localStorage.removeItem("sex");
		localStorage.removeItem("address");
		localStorage.removeItem("age");
		localStorage.removeItem("dataId");
		localStorage.removeItem("height");
		localStorage.removeItem("url");
		localStorage.removeItem("_AMap_maintcvcg");
		localStorage.removeItem("_AMap_AMap.Geolocation");
		localStorage.removeItem("k_position");
		localStorage.removeItem("d_money");
		localStorage.removeItem("d_publishText");
		localStorage.removeItem("d_imglist");
		localStorage.removeItem("d_sex");
		localStorage.removeItem("d_viptime");
		localStorage.removeItem("filterObj");
		if($(".d_clear span").html()=="0kb"){
			$(".d_popupbox").html("暂无内存可清理");
		}else{
			$(".d_popupbox").html("已加速清理"+(storage*1.5)+"kB");
		}
		//storage=2
		$(".d_clear span").html("0kb")
		setTimeout(show,500)
		setTimeout(hide,3000)
	})
})
