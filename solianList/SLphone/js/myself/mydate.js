/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
//uid=333;
$(function(){
	$('#bottomSS').hide();$('#bottomS').hide();$('#bottomSSS').hide()
	$(".d_content2").hide()
	$(".d_content3").hide()
	var n=0;//判断点击
	var mydate1=1,mydate2=0,mydate3=0;mydate4=0;
	var page1=0,page2=0,page3=0;page4=0;
	mydate1=1;
	//点击右上角分类
	$(".d_righttop").hide();
	$("html").on("click",function(){
		$(".d_righttop").hide()
		console.log("点击")
	});
	$(".d_dateclassify").on("click",function(){
		event.stopPropagation(); 
		n=n+1;
		if(n%2==0){
			$(".d_righttop").hide();
		}else if(n%2==1){
			$(".d_righttop").show();
		}
	});
	$(".d_righttop li").on("click",function(){
		$(this).addClass("d_li1").siblings().removeClass("d_li1");
		//event.stopPropagation(); 
	})
	/* 删除已过期函数封装 */
	function removepast(classname,type){
		event.stopPropagation(); 
		$(classname+' .d_contentlist').on('touchstart',function(event){						
			var touch = event.originalEvent.changedTouches[0];
			startX=touch.pageX;
		});
	    $(classname+" .d_contentlist").on("touchend",function(event){
	    	var move = $(this).index();
	    	console.log(move)
	    	if($(classname+" .d_state").eq(move).html()=="已过期"){
	    		var touch = event.originalEvent.changedTouches[0];
				endX=touch.pageX;
				if(startX > endX){
					var index=$(classname+" .d_contentlist").index(this)
					$(classname+" .d_remove").eq(index).show()
					$(classname+" .d_contentlist").eq(index).css("margin-left","-1.2rem")
					$(classname+" .d_remove").eq(index).on("click",function(){
						console.log("55")
						var id=$(this).attr("title");
						console.log("id:"+id+"uid:"+uid)
						$.ajax({
							type:"post",
							url:d_http+"index.php/Home/Engagement/del_date",
							data:{
								id:id,
								uid:uid,
								type:type,//表示删除我的约会中已过期
								token:MD5(uid+id+SL)
							},
							success:function(data){
								console.log(data)
								if(data.code==200){
									$(classname+" .d_contentlist").eq(index).hide()
								}else{
									console.log(data.massage)
								}
							}
						});
					})
				}else if(startX < endX){
					var index=$(classname+" .d_contentlist").index(this)
					$(classname+" .d_contentlist").eq(index).css("margin-left","0.24rem")
					$(".d_imghead").eq(index).show();
					$(classname+" .d_remove").eq(index).hide()
				}
	  	 	}
		})
	}
	/* 邀请我的 */
	function invme(status,page){
		$.ajax({
			type:"POST",
			url:d_http+"index.php/Home/Engagement/invite_list",
			data:{
				uid:uid,
				status:status,//0:全部    1：确认中   2：已同意   3：已拒绝   4：已过期
				page:page,
				token:MD5(uid+SL)
			},
			success:function(data){
				$(".d_content1>div").empty();
				if(data.code==200){
					$(".d_navlist").after("")
					var list=data.data;
					console.log(list)
					for(var i in list){
						list[i].mood_time=format(list[i].mood_time).substr(0, 10) ;
						console.log(list[i].mood_time)
						//fb_status (0:确认中  1:已同意  2:已拒绝  3:已过期)
	     				if(list[i].fb_status==0){
	     					list[i].f_status="确认中"
	     				}else if(list[i].fb_status==1){
	     					list[i].f_status="已同意"
	     				}else if(list[i].fb_status==2){
	     					list[i].f_status="已拒绝"
	     				}else if(list[i].fb_status==3){
	     					list[i].f_status="已过期"
	     				};
	     				if(list[i].image==null){//默认头像
	     					list[i].image="../../img/icon/d_head.png"
	     				};
	     				if(list[i].sex==1){//性别图标显示
	     					list[i].seximg="../../img/icon/x_boy_icon.png";
	     				}else if(list[i].sex==2){
	     					list[i].seximg="../../img/icon/x_girl_icon.png";
	     				};
	     				$(".d_content1>div").append("<div class='d_contentlist' self='"+list[i].id+"' name='"+list[i].fb_type+"' title='"+list[i].uid+"'><img class='d_imghead' src='"+list[i].image+"' /><div class='d_contentconeter'><div class='d_head'><p>"+list[i].nickname+"</p><div class='d_sexage'><img src="+list[i].seximg+" /><span>"+list[i].age+"</span></div></div><p class='d_eatorother'>"+list[i].object+"</p><span class='d_shopname'>"+list[i].goods_name+"</span></div><div class='d_state'>"+list[i].f_status+"</div><div class='d_remove' title='"+list[i].id+"'>删除</div></div>")
						if(list[i].sex==1){//性别背景切换
	     					$(".d_content1 .d_sexage").eq(i).css("background","#5397DD");
	     				}else if(list[i].sex==2){
	     					$(".d_content1 .d_sexage").eq(i).css("background","#feb3c5");
	     				};
					}
					$(".d_content1 .d_contentlist").on("click",function(){
						event.stopPropagation(); 
						localStorage.setItem("goodid",$(this).attr("title"));
						var goodid=$(this).attr("self");
						window.location.href="oneInvited.html?id="+goodid
						
						console.log(22222);
					});
					/* 删除已过期 */
					
					removepast(".d_content1",1);
						
				}
			}
		});
	}
	invme();
	/*我发起的*/
	function myinv(status,page){
		$.ajax({
			type:"POST",
			url:d_http+"index.php/Home/Engagement/issue",
			data:{
				uid:uid,
				type:2,
				status:status,
				page:page,
				token:MD5(uid+SL)
			},
			success:function(data){
				$(".d_content2>div").empty()
				if(data.code==200){
					var list=data.data
					console.log(list)
					for(var i in list){
						
						list[i].mood_time=format(list[i].mood_time).substr(0, 10);
						if(list[i].fb_status==0){
	     					list[i].f_status="确认中"
	     				}else if(list[i].fb_status==1){
	     					list[i].f_status="已同意"
	     				}else if(list[i].fb_status==2){
	     					list[i].f_status="已拒绝"
	     				}else if(list[i].fb_status==3){
	     					list[i].f_status="已过期"
	     				};
	     				if(list[i].image==null){//默认头像
	     					list[i].image="../../img/icon/d_head.png"
	     				};
	     				if(list[i].sex==1){//性别图标显示
	     					list[i].seximg="../../img/icon/x_boy_icon.png";
	     					console.log(list[i].seximg)
	     				}else if(list[i].sex==2){
	     					list[i].seximg="../../img/icon/x_girl_icon.png";
	     					console.log(list[i].seximg)
	     				};
	     				$(".d_content2>div").append("<div class='d_contentlist' self='"+list[i].id+"' name='"+list[i].fb_type+"' title='"+list[i].uid+"'><img class='d_imghead' src='"+list[i].image+"' /><div class='d_contentconeter'><div class='d_head'><p>"+list[i].nickname+"</p><div class='d_sexage'><img src="+list[i].seximg+" /><span>"+list[i].age+"</span></div></div><p class='d_eatorother'>"+list[i].object+"</p><span class='d_shopname'>"+list[i].goods_name+"</span></div><div class='d_state'>"+list[i].f_status+"</div><div class='d_remove' title='"+list[i].id+"'>删除</div></div>")
						if(list[i].sex==1){//性别背景切换
	     					$(".d_content2 .d_sexage").eq(i).css("background","#5397DD");
	     				}else if(list[i].sex==2){
	     					$(".d_content2 .d_sexage").eq(i).css("background","#feb3c5");
	     				};
	     				if(list[i].goods_id==0){//如果为自定义约会   goodsid=0;下方显示地址
	     					$(".d_content2 .d_shopname").eq(i).html(list[i].addr);
	     				};
					}
					$(".d_content2 .d_contentlist").on("click",function(){
						
						var sheid=$(this).attr("title");
						var goodid=$(this).attr("self");
						if($(this).attr("name")==1){
							window.location.href="oneInvite.html?id="+goodid
						}else if($(this).attr("name")==2){
							window.location.href="oneToMore.html?uid="+sheid+"&id="+goodid
						}
						
					});
					/* 删除已过期 */
						removepast(".d_content2",1);
					
				}
			}
		});
	};
	/* 我参加的 */
	function myjoin(statusjoin,page){
		$.ajax({
			type:"POST",
			url:d_http+"index.php/Home/Engagement/joindate",
			data:{
				uid:uid,
				status:statusjoin,
				page:page,
				token:MD5(uid+SL)
			},
			success:function(data){
				$(".d_content3>div").empty();
				if(data.code==200){
					var list=data.data
					console.log(list)
					for(var i in list){
						list[i].mood_time=format(list[i].mood_time).substr(0, 10);
						if(list[i].fb_status==0){
	     					list[i].f_status="确认中"
	     				}else if(list[i].fb_status==1){
	     					list[i].f_status="已同意"
	     				}else if(list[i].fb_status==2){
	     					list[i].f_status="已拒绝"
	     				}else if(list[i].fb_status==3){
	     					list[i].f_status="已过期"
	     				};
	     				if(list[i].image==null){//默认头像
	     					list[i].image="../../img/icon/d_head.png"
	     				};
	     				if(list[i].sex==1){//性别图标显示
	     					list[i].seximg="../../img/icon/x_boy_icon.png";
	     				}else if(list[i].sex==2){
	     					list[i].seximg="../../img/icon/x_girl_icon.png";
	     				};
	     				$(".d_content3>div").append("<div class='d_contentlist' self='"+list[i].id+"' name='"+list[i].fb_type+"' title='"+list[i].uid+"'><img class='d_imghead' src='"+list[i].image+"' /><div class='d_contentconeter'><div class='d_head'><p>"+list[i].nickname+"</p><div class='d_sexage'><img src="+list[i].seximg+" /><span>"+list[i].age+"</span></div></div><p class='d_eatorother'>"+list[i].object+"</p><span class='d_shopname'>"+list[i].goods_name+"</span></div><div class='d_state'>"+list[i].f_status+"</div><div class='d_remove' title='"+list[i].id+"'>删除</div></div>")
						if(list[i].sex==1){//性别背景切换
	     					$(".d_content3 .d_sexage").eq(i).css("background","#5397DD");
	     				}else if(list[i].sex==2){
	     					$(".d_content3 .d_sexage").eq(i).css("background","#feb3c5");
	     				};
	     				if(list[i].goods_id==0){//如果为自定义约会   goodsid=0;下方显示地址
	     					$(".d_content3 .d_shopname").eq(i).html(list[i].addr);
	     				};
					}
					$(".d_content3 .d_contentlist").on("click",function(){
						var sheid=$(this).attr("title");
						var goodid=$(this).attr("self");
						window.location.href="oneToMore.html?uid="+sheid+"&id="+goodid+"&mydate=3"
					});
					/* 删除已过期 */
					removepast(".d_content3",2);
				}
			}
		});
	}
	//二级导航切换
	$(".d_navlist p").on("click",function(){
		$(this).addClass("d_navclass").siblings().removeClass("d_navclass");
		var index=$(".d_navlist p").index(this)
		$(".d_contentBox>div").eq(index).show().siblings().hide()
	})
	
	//点击导航栏
	$("#d_icp1").on("click",function(){
		$(".d_righttop li:first").addClass("d_li1").siblings().removeClass("d_li1");//弹框初始化
		mydate1=1;mydate2=0;mydate3=0;page2=0;page3=0;
		console.log(mydate1)
		$(".d_content2").hide();
		$(".d_content3").hide();
		$(".d_content4").hide();
		invme(0);
	})
	if(mydate1==1){
		$(".d_all").on("click",function(){invme(0,0);});
		$(".d_sure").on("click",function(){invme(1,0);});
		$(".d_agree").on("click",function(){invme(2,0);});
		$(".d_noagree").on("click",function(){invme(3,0);});
		$(".d_past").on("click",function(){invme(4,0);});
	}
	$("#d_icp2").on("click",function(){
		$(".d_righttop li:first").addClass("d_li1").siblings().removeClass("d_li1");//弹框初始化
		mydate2=2;mydate1=0;mydate3=0;page1=0;page3=0;
		console.log(mydate2)
		$(".d_content1").hide();
		$(".d_content3").hide();
		$(".d_content4").hide();
		myinv(0);
		if(mydate2==2){
			console.log("我发起的")
			$(".d_all").on("click",function(){myinv(0,0);});
			$(".d_sure").on("click",function(){myinv(1,0);});
			$(".d_agree").on("click",function(){myinv(2,0);});
			$(".d_noagree").on("click",function(){myinv(3,0);});
			$(".d_past").on("click",function(){myinv(4,0);});
		}
	})
	$("#d_icp3").on("click",function(){//点击我参加的
		$(".d_righttop li:first").addClass("d_li1").siblings().removeClass("d_li1");//弹框初始化
		mydate4=0;mydate3=3;mydate2=0;mydate1=0;page2=0;page1=0;
		myjoin(0)
		if(mydate3==3){
			console.log("我发起的")
			$(".d_all").on("click",function(){myjoin(0,0);});
			$(".d_sure").on("click",function(){myjoin(1,0);});
			$(".d_agree").on("click",function(){myjoin(2,0);});
			$(".d_noagree").on("click",function(){myjoin(3,0);});
			$(".d_past").on("click",function(){myjoin(4,0);});
		}
	})
	$("#d_icp4").on("click",function(){
		mydate4=4;mydate3=0;mydate2=0;mydate1=0;page2=0;page1=0;
		
	})
	console.log(mydate1,mydate2)
	
	//加载更多
//	var clientH = Number(document.documentElement.clientHeight);
//  var height5=Number($('#bottomS').height());//加载更多
//  $(document).on('scroll',function(){
//		if(mydate1==1){//邀请我的
//			var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
//			if(docH==clientH){
//				docH=0
//			}else{
//				docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
//			}
//			var H5Top=parseInt($('#bottomS').offset().top+height5); //获取h5底部距离文档顶部的高度
//			if(docH>=H5Top){
//				$('#bottomS').show();$('#bottomSS').hide();$('#bottomSSS').hide()
//				$('#bottomS').html('数据加载中......');
//				page1++;
//				invme(status,page)
//			}
//		}else if(mydate2==2){
//			var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
//			if(docH==clientH){
//				docH=0
//			}else{
//				docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
//			}
//			var H5Top=parseInt($('#bottomSS').offset().top+height5); //获取h5底部距离文档顶部的高度
//			if(docH>=H5Top){
//				$('#bottomSS').show();$('#bottomS').hide();$('#bottomSSS').hide()
//				$('#bottomSS').html('数据加载中......');
//				page2++;
//				myinv(status,page2)
//			}
//		}else if(mydate3==3){
//			var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
//			if(docH==clientH){
//				docH=0
//			}else{
//				docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
//			}
//			var H5Top=parseInt($('#bottomSSS').offset().top+height5); //获取h5底部距离文档顶部的高度
//			if(docH>=H5Top){
//				$('#bottomSSS').show();$('#bottomS').hide();$('#bottomSS').hide()
//				$('#bottomSSS').html('数据加载中......');
//				page3++;
//				
//			}
//		}
//  })
    
})
