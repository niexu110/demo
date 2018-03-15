$(function(){
	var d_reg=/^1[3|4|5|8|7][0-9]{9}$/;
	var d_regpassword=/^([!-~]){6,18}$/;
//	登录
	var d_dl=false;
	$(".d_signin").on("click",function(){
		$(".d_signin>p").css("color","#f83444");
		$(".d_signin>img").css("display","block");
		$(".d_register>p").css("color","#FFFFFF");
		$(".d_register>img").css("display","none");
		$(".d_branchcontent").show();
		$(".d_registercontent").hide();
	});
	$(".d_username").on("change",function(){
		if($(".d_username").val()==""){
			Bombbox("手机号不能为空","1000");
		}else if(!d_reg.test($('.d_username').val())){
			Bombbox("手机号填写错误","1000");
		}
	});
	$(".d_dlpassword").on("change",function(){
		if($(".d_dlpassword").val()==""){
			Bombbox("密码不能为空","1000");
		}else if(!d_regpassword.test($('.d_dlpassword').val())){
			Bombbox("密码为数字或字母(大小写)或特殊符号  6--18位","2000");
		}
	});
	$('input').bind('input propertychange', function() {
		if(!d_reg.test($('.d_username').val()) || !d_regpassword.test($('.d_dlpassword').val())){
			$(".d_btndl").css("background","#fdc2c7");
			d_dl=false;
		}else{
			$(".d_btndl").css("background","#f83444");
			d_dl=true;
		}
	});
	$(".d_btndl").on("click",function(){
		if(d_dl==true){
			$("#branchform").submit();
		}
	});
	
//	注册
	$(".d_register").on("click",function(){
		$(".d_register>p").css("color","#f83444");
		$(".d_register>img").css("display","block");
		$(".d_signin>p").css("color","#FFFFFF");
		$(".d_signin>img").css("display","none");
		$(".d_branchcontent").hide();
		$(".d_registercontent").show();
	});
	var d_yanzheng=false;//倒计时判断
	var d_code;
	var d_zc=false;//注册按钮判断
	$(".d_tel").on("change",function(){
		if($(".d_tel").val()==""){
			Bombbox("手机号不能为空","1000");
			d_yanzheng=false;
		}else if(!d_reg.test($('.d_tel').val())){
			Bombbox("手机号填写错误","1000");
			d_yanzheng=false;
		}else{
			d_yanzheng=true;
		}
	});
	$(".d_yanz").on("change",function(){
		if($(".d_yanz").val()==""){
			Bombbox("验证码不能为空","1000");
		}else if($(".d_yanz").val()!=d_code){
			Bombbox("验证码填写错误","1000");
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
						type:0
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
							Bombbox(data.message,"2000");
						}
					}
				});
			}
		});
	}
	$(".d_zcpassword").on("change",function(){
		if($(".d_zcpassword").val()==""){
			Bombbox("密码不能为空","1000");
		}else if(!d_regpassword.test($('.d_zcpassword').val())){
			Bombbox("密码为数字或字母(大小写)或特殊符号  6--18位","2000");
		}
	});
	$('input').bind('input propertychange', function() {
		if(!d_reg.test($('.d_tel').val()) || $(".d_yanz").val()!=d_code || !d_regpassword.test($('.d_zcpassword').val())){
			$(".d_btnzc").css("background","#fdc2c7");
			d_zc=false;
		}else{
			$(".d_btnzc").css("background","#f83444");
			d_zc=true;
		}
	});
	$(".d_btnzc").on("click",function(){
		localStorage.setItem("d_username",$('.d_tel').val());
		localStorage.setItem("d_password",$('.d_zcpassword').val());
		localStorage.setItem("d_code",$('.d_yanz').val());
		localStorage.setItem("d_yqcode",$('.d_yqcode').val());
		if(d_zc==true){
			location.href="register.html";
		}
	});
})
