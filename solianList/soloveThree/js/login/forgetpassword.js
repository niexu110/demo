$(function(){
	var d_reg=/^1[3|4|5|8|7][0-9]{9}$/;
	var d_regpassword=/^([!-~]){6,18}$/;
	var d_yanzheng=false;//倒计时判断
	var d_code;
	var d_change=false;//注册按钮判断
	$(".d_tel").on("change",function(){
		if($(".d_tel").val()==""){
			Bombbox("手机号不能为空","2000");
			d_yanzheng=false;
		}else if(!d_reg.test($('.d_tel').val())){
			Bombbox("手机号填写错误","2000");
			d_yanzheng=false;
		}else{
			d_yanzheng=true;
		}
	});
	$(".d_yanz").on("change",function(){
		if($(".d_yanz").val()==""){
			Bombbox("验证码不能为空","2000");
		}else if($(".d_yanz").val()!=d_code){
			Bombbox("验证码填写错误","2000");
		}
	});
	var clicknum=1;
	if(clicknum==1){
		$(".d_clickcode").on("click",function(){
			clicknum++
			if(d_yanzheng==true){
				$.ajax({
					type:"get",
					url:https+"/sendsms",
					data:{
						tel:$('.d_tel').val(),
						type:1
					},
					success:function(data){
						console.log(data)
						if(data.code==200){
							clicknum=1
							d_code=data.data.code
							var d_cont=60;
							var d_timeout=setInterval(function(){
								d_cont--
								$(".d_clickcode").text(d_cont+"s");
								d_yanzheng=false;
								if(d_cont<0){
									$(".d_clickcode").text("重新发送");
									clearInterval(d_timeout)
									d_cont=60;
									d_yanzheng=true
								}
							},1000)
						}else{
							Bombbox(data.message,"1000");
						}
					}
				});
			}
		});
	}
	$(".d_ggpassword").on("change",function(){
		if($(".d_ggpassword").val()==""){
			Bombbox("密码不能为空","2000");
		}else if(!d_regpassword.test($('.d_ggpassword').val())){
			Bombbox("密码为数字或字母(大小写)或特殊符号  6--18位","3000");
		}
	});
	$('input').bind('input propertychange', function() {
		if(!d_reg.test($('.d_tel').val()) || $(".d_yanz").val()!=d_code || !d_regpassword.test($('.d_ggpassword').val())){
			$(".d_btngg").css("background","#fdc2c7");
			d_change=false;
		}else{
			$(".d_btngg").css("background","#f83444");
			d_change=true;
		}
	});
	$(".d_btngg").on("click",function(){
		if(d_change==true){
			$("#form").submit();
		}
	});
})
