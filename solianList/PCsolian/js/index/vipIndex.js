$(function(){
	$(".d_vipbtn").on("click",function(){
		if(objectUser==undefined){
			location.href="../index.html"
		}else if(objectUser.is_vip==1){
			alert("您已是VIP")
			return false;
		}else{
			location.href="vipPay.html"
		}
	})
})


