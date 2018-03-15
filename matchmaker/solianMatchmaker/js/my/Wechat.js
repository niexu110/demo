$(function(){
	$(".nav span").click(function(){
		$(this).find("i").addClass("curr");
		$(this).siblings().find("i").removeClass("curr");
		var index = $(this).index();
		$(".view .lists").eq(index).removeClass("hide").siblings(".lists").addClass("hide");
	})
	$(".sure").click(function(){
		$("#lookTop").hide()
	})
	$(".no").click(function(){
		var html = "<b>已拒绝</b>";
		$(this).parent().html(html);	
	})
	$(".yes").click(function(){
		var title = $(this).attr("title");
		if(title == 0){
			$("#lookTop").show();
			$(".boom1").show();
		}else{
			var html = '<a class="look" href="javascript:void(0)">查看微信号</a>';
			$(this).parent().html(html);
			$(".look").click(function(){
				console.log(111)
				$("#lookTop").show();
				$(".boom").show();
			})
		}
	})
	$("h6").click(function(){
		skip("wew")
	})
})
