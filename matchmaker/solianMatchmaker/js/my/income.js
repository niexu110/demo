$(function(){
	$("#remove").on("click",function(){
		var value = $("#num").val();
		var uid = $("#num").attr("title");
		var money = $("#money").html();
		if(value == "" || value > money){
			return false;
		}
	})
});
