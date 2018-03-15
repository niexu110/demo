$(function(){
	var d_index=localStorage.getItem("d_index");
	$(".d_txback").on("click",function(){
		if(d_index==1){
			location.href="../../src/index.html"
		}else if(d_index==2){
			location.href="../../../meipo3/xml/index2.html"
		}
	});
	$(".d_jump").on("click",function(){
		if(d_index==1){
			location.href="../../src/index.html"
		}else if(d_index==2){
			location.href="../../../meipo3/xml/index2.html"
		}
	});
	$(".d_txnext").on("click",function(){
		$("#form").submit();
	});
})
