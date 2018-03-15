$(function(){
	var d_code;
	var tel11=$('.d_tel').text();
	var tel=$('.d_tel').text();
	tel=tel.replace(tel.substring(3,tel.length-4),"****");
	$('.d_tel').text(tel)
	$(".d_allmoney").on("click",function(){
		$(".d_all").val($('.d_nowbill>span').text())
	});
	$(".d_song").on("click",function(){
		$.ajax({
			type:"get",
			url:d_Http+"index.php/sendsms",
			data:{
				tel:tel11,
				type:0
			},
			success:function(data){
				console.log(data)
				if(data.code==200){
					d_code=data.data.code
					var d_cont=60;
					var d_timeout=setInterval(function(){
						d_cont--
						$(".d_sendyz").text(d_cont+"s");
						d_yanzheng=false;
						$(".d_song").css({"color":"#488CFF","border-style":"dotted"})
						if(d_cont<0){
							$(".d_song").text("重新发送");
							clearInterval(d_timeout)
							d_cont=60;
							d_yanzheng=true
							$(".d_song").css({"color":"#488CFF","border-style":"solid"})
						}
					},1000)
				}else{
					$(".d_popupbox").html(data.massage);setTimeout(show,500);setTimeout(hide,2000);
				}
			}
		});
	})
	$(".d_sure").on("click",function(){
		if($(".d_all").val()=="" || $(".d_all").val()>$('.d_nowbill>span').text()){
			$(".d_popupbox").html("请输入可提现范围内金额");setTimeout(show,500);setTimeout(hide,1500);
		}else if($(".d_nickname").val()==""){
			$(".d_popupbox").html("请输入您的真实姓名");setTimeout(show,500);setTimeout(hide,1500);
		}else if($(".d_code").val()=="" || $(".d_code").val()!=d_code){
			$(".d_popupbox").html("请输入正确的验证码");setTimeout(show,500);setTimeout(hide,1500);
		}else{
			$("#form").submit();
		}
	});
	
})
