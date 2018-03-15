$(function(){
	var num=$(".d_box>.d_boxson").length;
	for(var i=0;i<num;i++){
		if($(".d_box .d_add").eq(i).text()=="加入"){
			$(".d_box .d_add").eq(i).css("color","#FF6F4F")
		}else{
			$(".d_box .d_add").eq(i).css("color","#666666")
		}
	}
	console.log(num)
})
