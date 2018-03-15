$(function(){
	$(".d_nav>p").on("click",function(){
		$(this).addClass("d_change").siblings().removeClass("d_change");
		var index=$(".d_nav>p").index(this);
		$(".d_contentBox>div").eq(index).show().siblings().hide();
	})
})
