$(function(){
	$(".d_nav>li").on("click",function(){
		$(this).addClass("d_navli").siblings().removeClass("d_navli")
		var index=$(".d_nav>li").index(this);
		$(".d_likebox>div").eq(index).show().siblings().hide();
	});
	$(".d_boxson").click(function(){
		var uid=$(this).attr('title');
		skip("地址/"+uid)
	})
})
