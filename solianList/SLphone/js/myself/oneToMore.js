$(function(){
	var uid=localStorage.getItem("uid");
	//uid=333;
	var id;//约会id
	var s_uid;//约会对象id
	var d_type;//区分点击入口
	var URL = document.location.toString();
	console.log(URL)
	var arr=$.getPassArguments(URL);
	id=arr.id;
	s_uid=arr.uid;
	d_type=arr.mydate;
	console.log(s_uid,d_type)
	if(s_uid==0){
		s_uid=""
		$(".d_sureone").hide();//被邀请人员具体信息布局
	}else if(s_uid==uid){
		s_uid=""
		console.log("空")
	}
	console.log(s_uid)
	console.log(id,uid,s_uid)
	$.ajax({
		type:"post",
		url:d_http+"index.php/Home/engagement/many_detail",
		data:{
			id:id,//约会id
			uid:uid,//我的id
			s_uid:s_uid//约会对象uid 无则为空
		},
		success:function(data){
			console.log(data)
			if(data.code==200){
				var obj=data.data;
					if(obj.uid==0){
						$(".d_beizhu").hide();
					}else{
						$(".d_beizhu").show();
					}
					$(".d_dataxiny span").text(obj.credit);//约会信用值
					$(".d_headtop img").attr("src",obj.image);//头像
					$(".d_nickname").text(obj.nickname);//昵称
					$(".d_age").text(obj.age);//年龄
					$(".d_address").text(obj.city);//地址
					$(".d_goodsaddr span").text(obj.addr);//详细地址
					//自定义约会时间判断
					if(obj.mood_time==""){
						$(".d_goodstime span").text("时间不限");//时间
					}else{
						$(".d_goodstime span").text(format(obj.mood_time).substring(0,10));//时间
					}
					//当自定义约会shopname为空
					if(obj.shop_name=="" || obj.shop_name==null){
						$(".d_goodsname").text(obj.addr);
					}else{
						$(".d_goodsname").text(obj.shop_name);
					}
					if(obj.marry==1){
						$(".d_marry").text("单身");//单身
					}else if(obj.marry==1){
						$(".d_marry").text("已婚");//已婚
					}else if(obj.marry==1){
						$(".d_marry").text("情侣");//情侣
					}
					if(obj.sex==1){//1男2女
						$(".d_seximg").attr("src","../../img/icon/t_boy.png");
					}else{
						$(".d_seximg").attr("src","../../img/icon/t_girl.png");
					}
					if(obj.old_uid==0){//身份是否验证
						$(".d_shenfen").attr("src","../../img/icon/x_approve_icon.png");
					}else{
						if(obj.sex==1){
							$(".d_shenfen").attr("src","../../img/icon/x_boyapprove_icon.png");
						}else{
							$(".d_shenfen").attr("src","../../img/icon/x_girlapprove_icon.png");
						}
					}
					
					
				$(".d_morepeople span").text(obj.joincount);
				console.log(obj.joincount)
				var list=obj.joinuser;
				console.log(list)
				if(d_type==3){
					$(".d_morepeople").hide();
					$(".d_datain span").text(obj.joincount);//已接受邀请人d_dataxiny
				}else{
					$(".d_datain p").text("Ta的粉丝");//粉丝
					$(".d_datain span").text(obj.fans);//粉丝
					if(obj.joincount==0){//没有受邀人
						$(".d_peopleimg").hide();
					}else if(obj.joincount>5){//受邀人超过5人
						$(".d_moreheadimg").show();
						for(var i=0;i<list.length-1;i++){
							if(list[i].image==null || list[i].image==""){
								list[i].image="../../img/icon/d_head.png"
							}
							$(".d_peopleimg").prepend("<img class='d_headoneimg' title='"+list[i].uid+"' src="+list[i].image+" />")
						}
					}else if(obj.joincount<=5){//受邀人小雨5人
						$(".d_moreheadimg").hide();
						for(var i=0;i<list.length;i++){
							if(list[i].image==null){
								list[i].image="../../img/icon/d_head.png"
							}
							$(".d_peopleimg").prepend("<img class='d_headoneimg' title='"+list[i].uid+"' src="+list[i].image+" />")
						}
					}
					if(obj.uid==0){
						$(".d_peopleimg .d_headoneimg").on("click",function(){
							$(".d_tanbox").show();
							var cardid=$(this).attr("title");//好友uid
							$(".d_nosure").on("click",function(){$(".d_tanbox").hide();});//取消按钮
							$(".d_metodata").on("click",function(){//点击我要和Ta约会
								$.ajax({
									type:"post",
									url:d_http+"index.php/Home//engagement/selectuser",
									data:{
										eid:id,//约会id
										uid:uid,//我的id
										s_uid:cardid,//约会对象id
										token:MD5(uid+id+SL)
									},
									success:function(data){
										console.log(data)
									}
								});
							});
							$(".d_shemessage").on("click",function(){//点击我要查看Ta的资料
								location.href="../../src/find/personalcarte.html?id="+cardid
							});
						})
						
					}else{
						$(".d_peopleimg .d_headoneimg").on("click",function(){
							var cardid=$(this).attr("title");
							location.href="../../src/find/personalcarte.html?id="+cardid
						})
					}
				}
			}
			/* 约会进度 */
			console.log(obj.state)
			var statelist=obj.state;
			for(var i in statelist){
				$(".d_datejindumore").append("<li><p class='d_jinduDian'></p><span>"+statelist[i].state_list+"</span><p class='d_jindutime'>"+format(statelist[i].state_time).substring(0,16)+"</p></li>")
			}
		}
	});
})