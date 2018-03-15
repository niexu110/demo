$(function(){
	$(".d_contentBox>div").on("click",function(){
		var index=$(".d_contentBox>div").index(this);
		$(".d_contentBox img").css({"height":"0.24rem","width":"0.14rem","margin-top":"0.38rem"});
		$(".d_contentBox img").attr("src","../../image/icon/d_open.png");
		$(".d_contentBox p").hide();
		$(".d_contentBox img").eq(index).css({"height":"0.14rem","width":"0.24rem","margin-top":"0.43rem"});
		$(".d_contentBox img").eq(index).attr("src","../../image/icon/d_noopen.png");
		$(".d_contentBox p").eq(index).show();
	})
})
