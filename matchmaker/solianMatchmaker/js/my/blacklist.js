$(function(){
	$(".remove").click(function(){
		var id = $(this).siblings("img").attr("title");
		$(this).parent().parent().remove();
	})
})
