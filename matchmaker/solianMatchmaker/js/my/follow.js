$(function(){
	$(".list").click(function(){
		var uid = $(this).attr("title");
		skip('../matchmaker/matchmakerIntroduces.html?m_uid='+uid)
	})
})
