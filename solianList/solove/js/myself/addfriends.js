$(function(){
	var uid=localStorage.getItem("uid");
	var page=0;
	/*点击搜索*/
	$(".d_seek span").on("click",function(){
		$(".d_contentBox").empty();
		$.ajax({
			type:"post",
			url:d_http+"index.php/Home/user/info",
			data:{
				uid:uid,
				s_uid:$('.d_seek input').val(),
				page:page,
				token:MD5(uid+SL)
			},
			success:function(data){
				if(data.code==200){
					var list=data.data;
					for(var i in list){
						if(list[i].image==null || list[i].image==""){
							list[i].image="../../img/icon/d_head.png";
						}
						$(".d_contentBox").append("<div class='d_contentson'><img class='d_imghead' title='"+list[i].uid+"' src="+list[i].image+" /><div class='d_contentcenter'><h3>"+list[i].nickname+"</h3><p>"+list[i].myideal+"</p></div><div class='d_addfriend' title='"+list[i].uid+"'>添加好友</div></div>")
					}
					$(".d_contentBox .d_addfriend").on("click",function(){
						var fid=$(this).attr("title");
						$.ajax({
							type:"POST",
							url :d_http+"index.php/Home/User/firends",
							data: {
                                uid:uid,
                                f_uid:fid,
                                token:MD5(uid+fid+SL)
                            },
							success:function(data){
							 	if(data.code==200){
							 		$(".d_popupbox").html(data.massage)
					     			setTimeout(show,500)
					     			setTimeout(hide,2000)
							 	}else{
							 		$(".d_popupbox").html(data.massage)
					     			setTimeout(show,500)
					     			setTimeout(hide,2000)
							 	}
							}
						})
					});
					$(".d_contentBox .d_imghead").on("click",function(){
						var s_uid=$(this).attr("title");
						location.href="../../src/find/personalcarte.html?id="+s_uid
					});
				}else{
					$(".d_popupbox").html(data.massage)
	     			setTimeout(show,500)
	     			setTimeout(hide,2000)
				}
				
			}
		});
	})
})
	