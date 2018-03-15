$(function(){
	var uid=localStorage.getItem("uid")
	var page=0;
	var eid,otheruid;
	var URL = document.location.toString();
	var arr=$.getPassArguments(URL);
	eid=arr.id;
	otheruid=arr.otheruid;
	console.log(arr)
	console.log(eid)
	$.ajax({
		type:"post",
		url:d_http+"index.php/Home//engagement/moreuser",
		data:{
			eid:eid,//约会id
			page:page,
			token:MD5(eid+SL)
		},
		success:function(data){
			console.log(data)
			if(data.code==200){
				var list=data.data;
				for(var i in list){
					if(list[i].image=="" || list[i].image==null){
						list[i].image="../../img/icon/d_head.png";
					}
					$(".headimgBox").append("<img title='"+list[i].uid+"' src='"+list[i].image+"' />")
				}
				$(".headimgBox img").on("click",function(){
					if(otheruid==0){
						$(".d_tanbox").show();
						var cardid=$(this).attr("title");//好友uid
						$(".d_nosure").on("click",function(){$(".d_tanbox").hide();});//取消按钮
						$(".d_metodata").on("click",function(){//点击我要和Ta约会
							$.ajax({
								type:"post",
								url:d_http+"index.php/Home//engagement/selectuser",
								data:{
									eid:eid,//约会id
									uid:uid,//我的id
									s_uid:cardid,//约会对象id
									token:MD5(uid+eid+SL)
								},
								success:function(data){
									console.log(data)
								}
							});
						});
						$(".d_shemessage").on("click",function(){//点击我要查看Ta的资料
							location.href="../../src/find/personalcarte.html?id="+cardid
						});
					}else{
						var cardid=$(this).attr("title");
						location.href="../../src/find/personalcarte.html?id="+cardid
					}
				})
			}
			
		}
	});
})