$(function(){
	$(".value").each(function(){
		if($(this).html() < 0){
			$(this).addClass("curr");
		}else{
			$(this).removeClass("curr");
		}
	});
})
