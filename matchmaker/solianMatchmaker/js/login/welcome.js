$(function(){
	$(".view a").click(function(){
		$(this).addClass("curr").siblings("a").removeClass("curr");
	})
	$(".button").click(function(){
		if($(".woman").hasClass("curr")){
			skip("../index2.html");
		}else if($(".single").hasClass("curr")){
			skip("../index.html");
		}
	})
})
