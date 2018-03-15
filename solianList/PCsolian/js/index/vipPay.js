$(function(){
	var uid=objectUser.uid;
	var orduid;//判断身份证是否认证
	var d_URL = document.location.toString();
	var done= d_URL.substring(d_URL.lastIndexOf("=") + 1, URL.length);
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/userindex",
		data: {
         	uid:uid,
            token:MD5(uid+SL)
     	},
     	success:function(data){
     		$(".d_username span").text(data.data.nickname);
			$(".d_qianm span").text(data.data.myideal);
			$(".d_headimg").attr("src",data.data.image);
			orduid=data.data.old_uid
			//判断是否支付成功
			if(done==1){
				$(".d_message>div").eq(2).removeClass("d_hide").siblings().addClass("d_hide")
				$(".d_nav>li").removeClass("d_licolor");
				$(".d_nav img").attr("src","../image/icon/d_landui.png")
			}else{
				//点击下一步
				if(orduid==0){
					$(".d_nextone").on("click",function(){
						if($(".d_name").val()==""){
							$(".d_i1").text("请填写您的真实姓名")
						}else if($(".d_identity").val()==""){
							$(".d_i1").text("");
							$(".d_i2").text("请填写您的身份证号")
						}else{
							$(".d_i1").text("");
							$(".d_i2").text("");
							var name=$(".d_name").val();
							var identity=$(".d_identity").val();
							$.ajax({
								type:"POST",
								url:d_http+"index.php/Home/Index/identity",
								data:{
									name:name,
									identity:identity,
									uid:uid,
									token:MD5(uid+SL)
								},
								success:function(data){
									if(data.code==200){
										$(".d_tixing").text(data.massage);
										$(".d_message>div").eq(1).removeClass("d_hide").siblings().addClass("d_hide");
									}else if(data.code==404){
										$(".d_tixing").text(data.massage);
									}
								}
							});
						}
						
					})
				}else if(orduid==1){
					$(".d_inparr").empty();
					$(".d_inparr").append("<p class='d_orduid'>亲！您的身份已认证，请直接点击下一步进行支付。</p>")
					$(".d_nextone").on("click",function(){
						$(".d_message>div").eq(1).removeClass("d_hide").siblings().addClass("d_hide")
						$(".d_nav>li").eq(1).removeClass("d_licolor");
						$(".d_nav img").eq(1).attr("src","../image/icon/d_landui.png")
					})
				};
			}
     	}
	})
	//点击缴纳保证金
	$(".d_nexttwo").on("click",function(){
		location.href="http://back.qinyikou.cc/index.php/Pay/com_phone?uid="+uid
	});
	//点击搜恋牵缘服务协议
	
	//点击返回上一步
	$(".d_laststep").on("click",function(){
		$(".d_message>div").eq(0).removeClass("d_hide").siblings().addClass("d_hide")
		$(".d_nav>li").eq(0).removeClass("d_licolor").siblings().addClass("d_licolor");
		$(".d_nav img").eq(1).attr("src","../image/icon/d_huidui.png")
	})
})
