window.onload=function(){
	var trystID=$.getPassArguments(location.href).id; //约会ID
	var uid=localStorage.getItem('uid'); //邀请我的详情，uid属于当前登录用户的uid
	$.ajax({
		type:'post',
		url:d_http+'index.php/Home/engagement/person_detail',
		data:{
			id:trystID,
			uid:uid
		},
		success:function(data){
			console.log(data)
			if(data.code==200){
				//头像判断
				if(data.data.image==''||data.data.image==null){
					data.data.image='../../img/icon/d_head.png';
				}else{
					data.data.image=data.data.image+'/head';
				}

				//性别判断和身份认证判断
				if(data.data.sex==1){
					$('.sex').attr('src','../../img//icon/n_boys.png');
					if(data.data.old_uid==0){
						$('.identity').attr('src','../../img/icon/x_approve_icon.png');
					}else{
						$('.identity').attr('src','../../img/icon/x_boyapprove_icon.png');
					}
				}else{
					$('.sex').attr('src','../../img//icon/n_girls.png');
					if(data.data.old_uid==0){
						$('.identity').attr('src','../../img/icon/x_approve_icon.png');
					}else{
						$('.identity').attr('src','../../img/icon/x_girlapprove_icon.png');
					}
				}
				//身份判断 1单身 2已婚 3情侣
				if(data.data.marry==1){
					data.data.marry='单身';
				}else if(data.data.marry==2){
					data.data.marry='已婚';
				}else if(data.data.marry==3){
					data.data.marry='情侣';
				}

				//买单方式判断
				if(data.data.type==1){
					data.data.type='我买单';
					$('.eatType img').attr('src','../../img/icon/x_alreadyBuy_icon.png');
				}else if(data.data.type==2){
					data.data.type='AA制';
					$('.eatType img').attr('src','../../img/icon/x_AA_icon.png');
				}else if(data.data.type==3){
					data.data.type='请我吧';
					$('.eatType img').attr('src','../../img/icon/x_alreadyBuy_icon.png');
				}
				//接送方式
				if(data.data.is_send==0){
					data.data.is_send='不负责接送';
					$('.meetType img').attr('src','../../img/icon/x_noMeetAndSend_icon.png');
				}else{
					data.data.is_send='负责接送';
					$('.meetType img').attr('src','../../img/icon/x_meetAndSend_icon.png');
				}

				//是否显示同意和拒绝按钮
				if(data.data.fb_status==0){
					$('.agreeMessage').show();
				}else{
					$('.agreeMessage').hide();
				}


				$('.theme h1 span').html(data.data.object); //约会主题
				$('.credit').html(data.data.credit);  //约会信用值
				$('.fans').html(data.data.fans); //粉丝
				$('.userCarte').attr('name',data.data.fid); //用户uid，便于后面跳转到名片页面时传参
				$('.userImg').attr('src',data.data.image);  //头像
				$('.inviteBottom h2').html(data.data.nickname); //昵称
				$('.city').html(data.data.city); //城市
				$('.age').html(data.data.age); //年龄
				$('.marry').html(data.data.marry); //身份 单身，已婚，情侣
				$('.eatType s').html(data.data.type);  //买单方式： 1 已买单  2 AA制
				$('.meetType s').html(data.data.is_send); //是否接送 0 不接送   1 接送
				$('.shopName').html(data.data.shop_name); //约会店名
				$('.shopAddress').html(data.data.addr); //约会地址
				$('.trystTime').html($.format(data.data.mood_time*1000,'a')); //约会时间
				$('.trystDirections').html(data.data.mood); //约会说明


				//点击头像跳转到名片页面
				$('.userCarte').on('click',function(){
					console.log($(this).attr('name'));
					location.href='../../src/find/personalcarte.html?uid='+$(this).attr('name');
				});

				//约会进度
				console.log(data.data.state.length)
				for(var i=0;i<data.data.state.length;i++){
					$('.tempo ul').append('<li><s></s><p>'+data.data.state[i].state_list+'</p><span>'+$.format(data.data.state[i].state_time*1000,'f')+'</span></li>');
				}
				var minusValue=parseFloat($('html').css('font-size'))*0.55;
				if(data.data.state.length==1){
					$('.line').hide();
				}else{
					$('.line').show().height($('.tempo li').height()*data.data.state.length-minusValue);
				}
				
				$('.tempo ul li').eq(0).find('s').addClass('now');
				$('.tempo ul li').eq(0).find('p').addClass('nows');
				$('.tempo ul li').eq(0).find('span').addClass('nows');
				

			}
			
		}
	});

	//点击同意
	$('.agree').on('click',function(){
		$.ajax({
			type:'post',
			url:d_http+'index.php/Home/engagement/person_agree',
			data:{
				uid:uid,
				eid:trystID,
				fb_status:1,
				token:MD5(uid+trystID+SL)
			},
			success:function(data){
				console.log(data)
				if(data.code==200){
					$('.agreeMessage').hide();
					$('.tempo ul').html('');
					for(var i=0;i<data.data.length;i++){
					$('.tempo ul').append('<li><s></s><p>'+data.data[i].state_list+'</p><span>'+$.format(data.data[i].state_time*1000,'f')+'</span></li>');
					}
					var minusValue=parseFloat($('html').css('font-size'))*0.55;
					if(data.data.length==1){
						$('.line').hide();
					}else{
						$('.line').show().height($('.tempo li').height()*data.data.length-minusValue);
					}
					
					$('.tempo ul li').eq(0).find('s').addClass('now');
					$('.tempo ul li').eq(0).find('p').addClass('nows');
					$('.tempo ul li').eq(0).find('span').addClass('nows');

				}
			}
		});
	});

	//点击拒绝
	$('.naysay').on('click',function(){
		$.ajax({
			type:'post',
			url:d_http+'index.php/Home/engagement/person_agree',
			data:{
				uid:uid,
				eid:trystID,
				fb_status:2,
				token:MD5(uid+trystID+SL)
			},
			success:function(data){
				console.log(data)
				if(data.code==200){
					$('.agreeMessage').hide();
					$('.tempo ul').html('');
					for(var i=0;i<data.data.length;i++){
					$('.tempo ul').append('<li><s></s><p>'+data.data[i].state_list+'</p><span>'+$.format(data.data[i].state_time*1000,'f')+'</span></li>');
					}
					var minusValue=parseFloat($('html').css('font-size'))*0.55;
					if(data.data.length==1){
						$('.line').hide();
					}else{
						$('.line').show().height($('.tempo li').height()*data.data.length-minusValue);
					}
					
					$('.tempo ul li').eq(0).find('s').addClass('now');
					$('.tempo ul li').eq(0).find('p').addClass('nows');
					$('.tempo ul li').eq(0).find('span').addClass('nows');
				}
			}
		});
	});
}