$(function(){
	$(".d_lookhe").on("click",function(){
		skip("changewoman.html")
	})
	$(".d_btn2").click(function(){
		  var m_uid=$(this).attr("title");
		  skip("../../src/matchmaker/matchmakerIntroduces.html?uid="+m_uid)
	})
})
