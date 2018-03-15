$(function(){
	var rest=/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
	var sum=false;
	$(".d_youname").on("change",function(){
		if($(".d_youname").val().length<2){
			Bombbox("请输入您的真实姓名","1000");
		}
	});
	$(".d_shenfe").on("change",function(){
		console.log("DDD")
		if(!rest.test($(".d_shenfe").val())){
			Bombbox("身份证号填写错误","1000");
		}
	});
	$('input').bind('input propertychange', function() {
		if(!rest.test($(".d_shenfe").val()) || $(".d_youname").val().length<2){
			$(".d_sure").css("background","#fdc2c7");
			d_sum=false;
		}else{
			$(".d_sure").css("background","#f83444");
			d_sum=true;
		}
	});
	$(".d_sure").on("click",function(){
		if(d_sum==true){
			$("#form").submit();
		}
	})
	
})
