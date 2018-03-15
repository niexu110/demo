$(function(){
	//手机号
	$("input[type ='tel']").on("input",function(){
		var phone = $("input[type ='tel']").val();
	    if((/^1[3|5|8|7][0-9]{9}$/.test(phone))){
	    	$(".phone img").css("display","block");
	    }else{
	    	$(".phone img").css("display","none")
	    }
	})
	//输入密码
	$("input[type ='password']").on("input",function(){
		var password = $("input[type ='password']").val();
	    if((/^([!-~]){6,18}$/.test(password))){
	        $(".password img").css("display","block");
	    }else{
	    	$(".password img").css("display","none")
	    }
	})
	//按钮颜色
	$("input").bind('input propertychange',function(){
		if($(".phone img").css("display") === "block" && $(".password img").css("display") === "block" ){
			$("#btn").addClass("curr");
			$("#btn").attr("disabled",false)
		}else{
			$("#btn").attr("disabled",true);
			$("#btn").removeClass("curr");
		}
	})
	//点击登录
	$("#btn").on("click",function(){
		console.log(111)
//			$.ajax({
//				type:"post",
//				url:"",
//				success : function(){
//					
//				}
//			});
	})
})
