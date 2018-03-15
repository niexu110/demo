$(function(){
	var id = $(".img").attr("title") 
	var width = 160;
	var len1 = $(".ul1 li").length;
	var len2 = $(".ul2 li").length;
	$(".ul1").css("width",width*len1/100 + "rem");
	$(".ul2").css("width",width*len2/100 + "rem");
	$(".join").click(function(){
		$(".boom").css("display","block");
	})
	$(".close").click(function(){
		$(".boom").css("display","none");
	})
	$(".no").click(function(){
		$(".boom").css("display","none");
	})
})
