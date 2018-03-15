$(function(){
	var uid=localStorage.getItem("uid");
    var html="<div class='content-box' style='position: fixed;left:0;bottom:0;right:0;top:0;background:rgba(0,0,0,.5);z-index: 9999;'>" +
        "<div style='position:absolute;width: 5.26rem;height:5.5rem;background:#fff;text-align:center;top:30%;left:1.12rem '>" +
        "<img src='img/n_wanshan.png' class='img' style='position: absolute;width:1.2rem;height:1.2rem;top:-.6rem;left:2.03rem;border-radius: 50%;'>" +
        "<h3 style='margin-top:1rem;margin-bottom:.4rem;font-size: .38rem;color:#333;font-weight: bold;'>完善信息</h3>" +
        "<p style='font-size: .24rem;color:#363636;height:.6rem;line-height: .6rem;'>听说你上得了厅堂，下得了厨房。开得起好车,</p>" +
        "<p style='font-size: .24rem;color:#363636;height:.6rem;line-height: .6rem;'>买得起新房。但是为什么没人知道呢？</p>" +
        "<h4 style='font-size: .28rem;color:#5793dd;height:.6rem;line-height: .6rem;'>赶快来完善你的个人资料吧！</h4>" +
        "<div style='width:3.8rem;height:.6rem;margin:.5rem auto;'>" +
        "<span class='upGo pull-left' style='width:1.6rem;height:.6rem;line-height: .6rem;font-size: .3rem;background: #5793dd;color:#fff;border-radius:4px; '>立刻就去</span>" +
        "<span class='closed pull-right' style='width:1.6rem;height:.6rem;line-height: .6rem;font-size: .3rem;border:1px solid #5793dd;color:#5793dd;border-radius:4px;'>稍后再说</span></div>" +
        "</div></div>"
    judge(localStorage.getItem("listType"));
    function judge(num) {
        if(num==0){
            $(document.body).append(html);
            $(".upGo").click(function(){
                location.href="src/myself/personage.html";
                localStorage.removeItem("listType");
            });
            $(".closed").click(function(){
                $(".content-box").hide();
                localStorage.removeItem("listType");
            })
        }else{
            return;
        }
    }
	//弹框
	var that=$(".bomb");
	function fadeTagle(self,msg,src){
	    self.find("img").attr("src",src);
	    self.find("p").text(msg);
	    self.fadeIn();
	    setTimeout(function(){
	        self.fadeOut();
	    },1500)
	}
	//推荐和附近请求
    var dataObj={
    	dataId:1,
    	el:$('.proposePeople>ul'),
    	page:0,
    	dataAddress:'Index/index',
    	age:localStorage.getItem("age"),
			height:localStorage.getItem("height"),
			address:localStorage.getItem("address"),
			sex:localStorage.getItem('sex'),
			propse:true,
			near:false,
			love:false,
			h_type:1
    };
    //恋圈数据请求
	var loveData={
		lovePage:0,
		htmlImgClass:'',
		htmlImg:'',
		xid:'',
		by_uid:''
	}
    if(localStorage.getItem("d_find")=="1"){
		$(".prop").addClass("color").siblings().removeClass("color");
		$(".suspend").show();
		$(".headRight>span").text("筛选")
		$(this).addClass('color').find('s').show();
		$(this).siblings('p').removeClass('color');
		$('.nearby').hide();
		$('.lovely').hide();
		$('.proposePeople').show();
		$('.nearbyPeople').hide();
		$('.lovePeople').hide();
		$('.headRight>span').show();
		$('.headRight>a').hide();
		$('.banner').show();
		dataObj.dataId=1;
		dataObj.dataAddress='Index/index';
		dataObj.page=0;
		dataObj.h_type=1;
		dataObj.el=$('.proposePeople>ul');
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;	
		dataObj.propse=true;
		dataObj.near=false;
		dataObj.love=false;
	}else if(localStorage.getItem("d_find")=="2"){
		$(".near").addClass("color").siblings().removeClass("color");
		$(".suspend").show();
		$(".headRight>span").text("筛选")
		$(this).addClass('color').find('s').show();
		$(this).siblings('p').removeClass('color');
		$('.propose').hide();
		$('.lovely').hide();
		$('.nearbyPeople').show();
		$('.proposePeople').hide();
		$('.lovePeople').hide();
		$('.headRight>span').show();
		$('.headRight>a').hide();
		$('.banner').show();
		dataObj.dataId=2;
		dataObj.dataAddress='Index/nearby';
		dataObj.page=0;
		dataObj.h_type=2;
		dataObj.el=$('.nearbyPeople>ul');
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
		dataObj.propse=false;
		dataObj.near=true;	
		dataObj.love=false;
	}else if(localStorage.getItem("d_find")=="3"){
		$('.lovePeople').show();
		$('.nearbyPeople').hide();
		$('.proposePeople').hide();
		$(".love").addClass("color").siblings().removeClass("color");
		$(".suspend").hide();
		$(".headRight>span").text("发布")
		$(this).addClass('color').find('s').show();
		$(this).siblings('p').removeClass('color');
		$('.propose').hide();
		$('.nearby').hide();
		$('.headRight>a').show();
		$('.banner').hide();
		dataObj.dataId=3;
		dataObj.dataAddress='Article/condition_index';
		dataObj.page=0;
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
		getLoveData(loveData);
		dataObj.propse=false;
		dataObj.near=true;	
		dataObj.love=true;
	}
    
	var map, geolocation,x,y;
	if(localStorage.getItem('x')==null){
		x="108.921016";y="34.269211";
		getData(dataObj);
	}else{
		x=localStorage.getItem('x');y=localStorage.getItem('y');
		getData(dataObj);
	}
	map = new AMap.Map('container', {
	    resizeEnable: true
	});
	setTimeout(function(){
		map.plugin('AMap.Geolocation', function() {
	    geolocation = new AMap.Geolocation({
	    	enableHighAccuracy: true,
	        timeout: 10000,
	        buttonOffset: new AMap.Pixel(10, 20),
	        zoomToAccuracy: true
	    });
	    map.addControl(geolocation);
	    geolocation.getCurrentPosition();
	    AMap.event.addListener(geolocation, 'complete', onComplete);
	    AMap.event.addListener(geolocation, 'error', onError);
 	});
	},1000)
	 //解析定位结果
	 function onComplete(data) {
	    x=data.position.getLng()+'';
	    y=data.position.getLat()+'';
	    localStorage.setItem('x',x);
	    localStorage.setItem('y',y);
			getData(dataObj);
	 }
	//解析定位错误信息
	function onError(data) {
	    x=108.940175+'';
	    y=34.341568+'';
	    localStorage.setItem('x',x);
	    localStorage.setItem('y',y);
	    getData(dataObj);
	}
    //请求banner数据
	$.ajax({
		type:'post',
		url:d_http+'/index.php/Home/Index/banner',
		data:{token:MD5(SL)},
		success:function(data){
			var bannerWidth=$('.banner').width();
			var len=data.data.length;
			$('.banner>ul').width(bannerWidth*len);
			for(var i=0;i<len;i++){
				$('.banner>ul').append('<li><a href="javascript:void(0);"><img src="'+data.data[i].images+'/shuffling" alt=""></a></li>');
				$('.banner>p').append('<span></span>');
			}
			$('.banner>p>span').eq(0).addClass('addBg');
			//banner轮播
			var index=0;
			setInterval(function(){
				if(index>=len){
					index=0;
					$('.banner>p>span').removeClass('addBg')
					$('.banner>p>span').eq(index).addClass('addBg');
					$('.banner>ul').css('left',0);
				}else{
					$('.banner>p>span').removeClass('addBg')
					$('.banner>p>span').eq(index).addClass('addBg');
					$('.banner>ul').css('left',-index*bannerWidth);
					index++;
				}	
			},3000);
		}
	});	
	
    //发布按钮
    $(".headRight span").on("click",function(){
    	//点击发布
    	if($(this).text() == "发布"){
    		if(uid == null){
					localStorage.setItem("url", window.location.href)
					localStorage.setItem("d_find","3");
					location.href = "src/login/login.html";
				}else{
					localStorage.setItem("d_find","3");
					location.href = "src/find/publish.html";
				}
		//点击筛选
    	}else if($(this).text() == "筛选"){
    		if(dataObj.h_type==1){
    			localStorage.setItem("d_find","1");
    			location.href='src/find/filter.html';
    		}else if(dataObj.h_type==2){
    			localStorage.setItem("d_find","2");
    			location.href='src/find/filter.html';
    		}
    	}	
    });
	//点击推荐
	$('.prop').on('click',function(){
		localStorage.setItem("d_find","1");
		$(".suspend").show();
		$(".headRight>span").text("筛选")
		$(this).addClass('color').find('s').show();
		$(this).siblings('p').removeClass('color');
		$('.nearby').hide();
		$('.lovely').hide();
		$('.proposePeople').show();
		$('.nearbyPeople').hide();
		$('.lovePeople').hide();
		$('.headRight>span').show();
		$('.headRight>a').hide();
		$('.banner').show();
		dataObj.dataId=1;
		dataObj.dataAddress='Index/index';
		dataObj.page=0;
		dataObj.h_type=1;
		dataObj.el=$('.proposePeople>ul');
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;	
		dataObj.propse=true;
		dataObj.near=false;
		dataObj.love=false;
		// $('.proposePeople>ul').html('');
		getData(dataObj);
	});
	// 点击附近
	$('.near').on('click',function(){
		localStorage.setItem("d_find","2");
		$(".suspend").show();
		$(".headRight>span").text("筛选")
		$(this).addClass('color').find('s').show();
		$(this).siblings('p').removeClass('color');
		$('.propose').hide();
		$('.lovely').hide();
		$('.nearbyPeople').show();
		$('.proposePeople').hide();
		$('.lovePeople').hide();
		$('.headRight>span').show();
		$('.headRight>a').hide();
		$('.banner').show();
		dataObj.dataId=2;
		dataObj.dataAddress='Index/nearby';
		dataObj.page=0;
		dataObj.h_type=2;
		dataObj.el=$('.nearbyPeople>ul');
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
		dataObj.propse=false;
		dataObj.near=true;	
		dataObj.love=false;
		// $('.nearbyPeople>ul').html('');
		getData(dataObj);
	});
	//点击恋圈
	$('.love').on('click',function(){
		localStorage.setItem("d_find","3");
		$(".suspend").hide();
		$(".headRight>span").text("发布")
		$(this).addClass('color').find('s').show();
		$(this).siblings('p').removeClass('color');
		$('.propose').hide();
		$('.nearby').hide();
		$('.lovePeople').show();
		$('.nearbyPeople').hide();
		$('.proposePeople').hide();
		$('.headRight>a').show();
		$('.banner').hide();
		dataObj.dataId=3;
		dataObj.dataAddress='Article/condition_index';
		dataObj.page=0;
		// dataObj.el=$('.lovePeople>ul');
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
		getLoveData(loveData);
		dataObj.propse=false;
		dataObj.near=true;	
		dataObj.love=true;
	});
	
	function getData(obj){
		if(obj.dataId==1){
			getAjax(obj);
		}else if(obj.dataId==2){
			getAjax(obj);
		}
	}
	// 恋圈请求函数
	var html='';			
	function getLoveData(loveData){
		if(localStorage.getItem('uid')!=null){
			uid=localStorage.getItem('uid');
		}
		$.ajax({
			type:'post',
			url:d_http+'/index.php/Home/Article/condition_index',
			data:{
				uid    : uid,
				id     : loveData.xid,
				by_uid : loveData.by_uid,
				page:loveData.lovePage,
				token:MD5(SL)
			},
			success:function(data){
				if(data.code==200){
					loveData.lovePage +=1;
					dataObj.love=true;
					for(var i=0;i<data.data.length;i++){
						if(data.data[i].image==''){
							data.data[i].image='img/icon/d_head.png';
						}else{
							data.data[i].image=data.data[i].image+'/head';
						}
						//性别判断
						if(data.data[i].sex==2){
							sexSrc='img/icon/x_girl_icon.png';
							sexClass='sexGirl';
						}else{
							sexSrc='img/icon/x_boy_icon.png';
							sexClass='sexBoy';
						}
						//点赞判断
						if(localStorage.getItem('uid')==null){
							yesZan='img/icon/x_noZan_iocn.png';
						}else{
							if(data.data[i].like==0){
								yesZan='img/icon/x_noZan_iocn.png';
							}else{
								yesZan='img/icon/x_yesZan_iocn.png';
							}
						}
						//动态图片个数判断
						if(data.data[i].images.length==0){
							loveData.htmlImgClass='imgNone';
							loveData.htmlImg='';
						}else if(data.data[i].images.length==1){
							loveData.htmlImgClass='imgOne';
							loveData.htmlImg='';
							loveData.htmlImg='<li><img alt="'+data.data[i].images[0]+'" src="'+data.data[i].images[0]+'/photos"></li>'
						}else if(data.data[i].images.length==2||data.data[i].images.length==4){
							loveData.htmlImgClass="imgTwo";
							loveData.htmlImg='';
							for(var j=0;j<data.data[i].images.length;j++){
								loveData.htmlImg+='<li><img alt="'+data.data[i].images[j]+'" src="'+data.data[i].images[j]+'/photos"></li>';	
							}
						}else{
							loveData.htmlImgClass="imgMore";
							loveData.htmlImg='';
							for(var j=0;j<data.data[i].images.length;j++){
								loveData.htmlImg+='<li><img alt="'+data.data[i].images[j]+'" src="'+data.data[i].images[j]+'/photos"></li>'
							}
						}
						var d_delete="";
						if(data.data[i].uid==uid){
							d_delete="删除";
						}else{
							d_delete="";
						}
						$('.lovePeople>ul.loveTotal').append('<li class="loveItem"><div class="itemLeft"><a href="src/find/personalcarte.html?dataId='+data.data[i].uid+'"><img src="'+data.data[i].image+'"></a></div><div class="itemRight" alt="'+data.data[i].id+'"><div class="rightTop"><h1>'+data.data[i].nickname+'<s>'+ format(data.data[i].time).replace(/\//g, '-') +'</s></h1><p><span class="'+sexClass+'"><img src="'+sexSrc+'" alt="">'+data.data[i].age+'</span><span>魅力值：'+data.data[i].charm+'</span></p></div><div class="rightBottom"><p class="userText">'+data.data[i].title+'</p><ul class="album '+loveData.htmlImgClass+'"'+'">'+loveData.htmlImg+'</ul><h2>'+data.data[i].address+'</h2><div class="commentMsg"><div class="commentLeft"><span class="dz"><s>'+data.data[i].give+'</s>点赞</span><span>'+data.data[i].read+'阅读</span><span>'+data.data[i].comment+'评论</span><span class="d_delete" style="color:#5397DD" title="'+data.data[i].id+'">'+d_delete+'</span></div><div class="commentRight"><img data-like="'+data.data[i].like+'" class="like" alt="'+data.data[i].id+'" src="'+yesZan+'"><img class="discuss" alt="'+data.data[i].id+'" src="img/icon/x_comment_icon.png" alt=""></div></div></div></div></li>');
						
					}
					//删除自己恋圈动态
					$("ul.loveTotal .d_delete").on("click",function(event){
						event.stopPropagation(); 
						var d_title=$(this).attr("title");
						var index=$("ul.loveTotal .d_delete").index(this);
						$("#deleteBox").show();
						$(".btnOK").click(function(event){//点击确认
							event.stopPropagation(); 
							$("#deleteBox").hide();
							$.ajax({
					            type:"POST",
					            url:d_http+"index.php/home/Article/condition_delete",
					            data:{id:d_title,uid:uid},
					            success:function(data){
					                if(data.code==200){
					                   	$("ul.loveTotal .loveItem").eq(index).hide();
					                }else{
					                    fadeTagle(that,"网络请求错误！请稍后","../../img/icon/h_bombClose.png");
					                }
					            }
					        })
						});
						$(".btnClose").click(function(event){
					        event.stopPropagation();
					        $("#deleteBox").hide();
					    })
					})
					// 点击查看大图
				 	var imgSrc=[];
					var lens,indexs;
					var colse=true;
					$('.album li').on('click',function(event){
						event.stopPropagation();
						var startX=0;
						var $w=$('.showImg').width();	
						$('.mask').show();
					    $('.showImg').show();
						lens=$(this).parent().find('img').length;
						indexs=$(this).index();
						$(this).parent().find('img').each(function(){
							imgSrc.push($(this).attr('alt'));
						});
						$('.showImg ul').width(imgSrc.length*$w).css('left',-indexs*$w);
						for(var i=0;i<lens;i++){
							$('.showImg ul').append('<li><img src="'+imgSrc[i]+'"></li>');
						}
						$('.showImg ul').on('touchstart',function(event){
				    		var touch = event.originalEvent.changedTouches[0];
				    		startX=touch.pageX;
				    	});
				    	$('.showImg ul').on('touchend',function(event){
				    		var touch = event.originalEvent.changedTouches[0];
				    		endX=touch.pageX;
				    		var left=$('.showImg ul').position().left; 
				    		if(endX>startX){
				    			if(indexs==0){
				    				indexs=0;
				    				$('.showImg ul').css({'left':0})
				    			}else{
				    				if(colse){
				    					colse=false;
				    					$('.showImg ul').animate({'left':left+$w},800,function(){
					    					left=$('.showImg ul').position().left;
					    					colse=true;
					    					if(indexs==0){
							    				indexs=0;
							    				$('.showImg ul').css({'left':0})
							    			}else{
					    						indexs--;
							    			}
					    				});
				    				}
				    			}	
				    		}
				    		if(endX<startX){
				    			if(indexs==lens-1){
				    				indexs=lens-1;
				    				$('.showImg ul').css({'left':-(lens-1)*$w});
				    			}else{
				    				if(colse){
				    					colse=false;
				    					$('.showImg ul').stop().animate({'left':left-$w},800,function(){
					    					left=$('.showImg ul').position().left;
					    					colse=true;
					    					if(indexs==lens-1){
							    				indexs=lens-1;
							    				$('.showImg ul').css({'left':-(lens-1)*$w});
							    			}else{
							    				indexs++;
							    			}
					    				});
				    				}
				    			}	
				    		}
				    	});
					});
					// 隐藏展示区域
					$('.showImg ul li').on('click',function(){
						$('.mask').hide();
						$('.showImg').hide(500);
						$('.showImg ul').html('');
						$('.showImg ul').width('0px').css('left','0px'); 
						imgSrc=[];
						len=0;
					});	
					$('.showImg').on('click',function(){
						$('.mask').hide();
						$('.showImg').hide(500);
						$('.showImg ul').html('');
						$('.showImg ul').width('0px').css('left','0px'); 
						imgSrc=[];
						len=0;
					});	
					$('.mask').on('click',function(){
						$('.mask').hide();
						$('.showImg').hide(500);
						$('.showImg ul').html('');
						$('.showImg ul').width('0px').css('left','0px');
						imgSrc=[]; 
						len=0;
					});	
					//点击点赞
					$(".like").on("click",function(event){
						event.stopPropagation();
						var self=$(this);
						var count=parseInt($('.dz>s').eq(self.parents('.loveItem').index()).html());
						var dId=$(this).attr('alt');
						var uider=localStorage.getItem('uid');
						if(uider==null){
							localStorage.setItem("url", window.location.href)
							location.href = "src/login/login.html";
						}else{
							$.ajax({
								type:'post',
								url:d_http+'/index.php/Home/Article/condition_like',
								data:{
									uid: uider,
									id: dId,
									token:MD5(SL)
								},
								success:function(data){
									if(data.code==200){
										if(data.data==1){
											self.attr("src","img/icon/x_yesZan_iocn.png");
											count++;
											$('.dz>s').eq(self.parents('.loveItem').index()).html(count)
										}else{
											self.attr("src","img/icon/x_noZan_iocn.png");
											if(count<=0){
												count=0;
											}else{
												count--;
											}
											
											$('.dz>s').eq(self.parents('.loveItem').index()).html(count)
										}
									}
								}
							});	
						}	
					});
					//点击评论
					$(".discuss").on("click",function(event){
						event.stopPropagation();
						if(uid == null){
							localStorage.setItem("url", window.location.href)
							location.href = "src/login/login.html";
						}else{
							var href = $(this).parent().parent().parent().parent().prev("div").find("a").attr("href");
							loveData.by_uid = href.substring(href.indexOf('=')+1,href.length);
							loveData.xid = $(this).attr("alt");
							localStorage.setItem("d_find","3");
							location.href = "src/find/state.html?id="+loveData.xid;
						}
					});
					//点击的进入评论页面
					$('.itemRight').on('click',function(){
						if(uid==null){
							localStorage.setItem("url", location.href)
							localStorage.setItem("d_find","3");
							location.href = "src/login/login.html";
						}else{
							localStorage.setItem("d_find","3");
							location.href = "src/find/state.html?id="+$(this).attr('alt');
						}
					});	
				}else{
					$('#bottomSS').html('没有数据');
					setTimeout(function(){
						$('#bottomSS').html('');
					},1500);
					dataObj.love=true;
				}
			}
		});
	}
	//推荐和附近数据请求
	function getAjax(obj){
		$.ajax({
			type:'post',
			url:d_http+'/index.php/Home/'+obj.dataAddress,
			data:{
				x:x,
		      	y:y,
		       	token:MD5(x+y+SL),
		       	page:obj.page,
		       	sex:obj.sex,
		       	age:obj.age,
		       	height:obj.height,
		       	citys:obj.address
			},
			success:function(data){
				
				if(data.code==200){
					if(obj.page==0){
						obj.el.html('');
					}
					obj.page+=1;
					var charm='';
					var len=data.data.length;
					for (var i = 0; i< len; i++) {
						if(data.data[i].charm==''||data.data[i].charm==undefined||data.data[i].charm[i]==null){
							charm='img/icon/x_halfLove_icon.png';
						} 
						if(data.data[i].charm==1){
							charm='img/icon/x_halfLove_icon.png';
						}else if(data.data[i].charm==2){
							charm='img/icon/x_oneLove_icon.png';
						}else if(data.data[i].charm==3){
							charm='img/icon/x_oneHalfLove_icon.png';
						}else if(data.data[i].charm==4){
							charm='img/icon/x_twoLove_icon.png';
						}else if(data.data[i].charm==5){
							charm='img/icon/x_twoHalfLove_icon.png';
						}else if(data.data[i].charm==6){
							charm='img/icon/x_threeLove_icon.png';
						}else if(data.data[i].charm==7){
							charm='img/icon/x_threeHalfLove_icon.png';
						}else if(data.data[i].charm==8){
							charm='img/icon/x_fourLove_icon.png';
						}else if(data.data[i].charm==9){
							charm='img/icon/x_fourHalfLove_icon.png';
						}else{
							charm='img/icon/x_fiveLove_icon.png';
						}
						if(data.data[i].image==''){
							data.data[i].image='img/icon/d_head.png';
						}else{
							data.data[i].image=data.data[i].image+'/head';
						}
						//判断性别
						if(data.data[i].sex==2){
							sexSrc='img/icon/x_girl_icon.png';
							sexClass='girl';

						}else{
							sexSrc='img/icon/x_boy_icon.png';
							sexClass='boy';
						}
						if(data.data[i].hongbao==1){
							//金币掉落参数
							var heightH=document.documentElement.clientHeight;
							var total=parseInt(Math.random()*15+30); //随机金币总个数
							var startLeft=''; //随机初始左边距离
							var scalN='';
							var rotateN=''
							var near=["linear","ease","ease-in","ease-out","ease-in-out"];
							var nearIndex='';
							var nsers='';//动画曲线
							var delay=''; 
							var Img='';
							obj.el.append('<li class="hogbao"><a  data-id="'+data.data[i].uid+'" href="##"><div class="proposeLeft"><img src="'+data.data[i].image+'"></div><div class="proposeRight"><h1>'+data.data[i].nickname+'<span>'+data.data[i].distance+'km</span></h1><p><span class="'+sexClass+'"><img src="'+sexSrc+'"><s>'+data.data[i].age+'</s></span><i>'+data.data[i].constellation+'</i><i>魅力值：<img class="charm" src="'+charm+'" alt=""></i></p><h6>'+data.data[i].myideal+'</h6></div></a></li>');
							$(".hogbao").on("click",function(){
								if(uid==null){
									localStorage.setItem("url",window.location.href);
									location.href="src/login/login.html"
								}else{
									$('.containerss').show();
									document.getElementById('music').play();
									$('.con').html(Img);
									for (var i = 0; i <total; i++) {
										nearIndex=parseInt(Math.random()*5);			
										startLeft=(Math.random()*5.5+0.5).toFixed(2)+'rem';
										scalN=Math.random()*0.5+0.5;			
										rotateN=parseInt(Math.random()*180+180)
										Img+='<img style="left:'+startLeft+';transform:scale('+scalN+');tranform:rotate('+rotateN+'deg);" src="img/x_jinbi_icon.png" alt="">';
									}
									$('.con').append(Img);
									$('.con img').each(function(){
										nears=near[nearIndex];
										delay=parseInt(Math.random()*5)
										$(this).css({
											'animation-name':'move',
											'animation-duration':Math.random()*1+'s',
											'animation-timing-function':'linear',
											'animation-delay':delay,
											'animation-iteration-count':2
										})
									});
									Img='';
									var hUid=$(this).find('a').attr('data-id')
									setTimeout(function(){
										$('.con').html(Img);
										$('.containerss').hide();
										if(dataObj.h_type==1){
							    			localStorage.setItem("d_find","1");
							    			location.href='src/find/hbDetails.html?id='+hUid
							    		}else if(dataObj.h_type==2){
							    			localStorage.setItem("d_find","2");
							    			location.href='src/find/hbDetails.html?id='+hUid
							    		}
									},1000);
								}
							})
							if(obj.dataId==1){
								dataObj.propse=true;
							}else if(obj.dataId==2){
								dataObj.near=true;
							}
						}else{
							obj.el.append('<li><a  data-id="'+data.data[i].uid+'" href="src/find/personalcarte.html?dataId='+data.data[i].uid+'"><div class="proposeLeft"><img src="'+data.data[i].image+'"></div><div class="proposeRight"><h1>'+data.data[i].nickname+'<span>'+data.data[i].distance+'km</span></h1><p><span class="'+sexClass+'"><img src="'+sexSrc+'"><s>'+data.data[i].age+'</s></span><i>'+data.data[i].constellation+'</i><i>魅力值：<img class="charm" src="'+charm+'" alt=""></i></p><h6>'+data.data[i].myideal+'</h6></div></a></li>');
							if(obj.dataId==1){
								dataObj.propse=true;
							}else if(obj.dataId==2){
								dataObj.near=true;
							}
						}	
					}
				}else{
					if(obj.dataId==1){
						$('#bottomS').html('数据已到底.......');
						setTimeout(function(){
							$('#bottomS').html('');
						},1500);
						dataObj.propse=true;
					}else if(obj.dataId==2){
						$('#bottom').html('数据已到底.......');
						setTimeout(function(){
							$('#bottom').html('');
						},1500);
						dataObj.near=true;
					}else if(obj.dataId==3){
						$('#bottom').html('数据已到底.......');
						setTimeout(function(){
							$('#bottom').html('');
						},1500);
						dataObj.near=true;
					}
				}		
			}
		});
	}
	//发红包切换按钮
	$(".suspend").on("click",function(){
		if(localStorage.getItem('userData') == null){
			localStorage.setItem("url", window.location.href);
			location.href = "src/login/login.html";
		}else{
			
			if($(this).hasClass('xShow')){
				$('.fabu').hide();
				$('.fahongbao').hide();
				$(this).removeClass('xShow');
			}else{
				$('.fabu').show();
				$('.fahongbao').show();
				$(this).addClass('xShow');
			}
		}
		// 点击发红包
		$('.fahongbao').on('click',function(){
			if(dataObj.h_type==1){
    			localStorage.setItem("d_find","1");
    			location.href="src/find/sendOut.html?type="+dataObj.h_type
    		}else if(dataObj.h_type==2){
    			localStorage.setItem("d_find","2");
    			location.href="src/find/sendOut.html?type="+dataObj.h_type
    		}
		});
		$('.fabu').on('click',function(){
			if(uid == null){
				localStorage.setItem("url", window.location.href)
				location.href = "src/login/login.html";
			}else{
				location.href = "src/find/publish.html";
			}
		});
	});
	//加载更多
    var clientH = Number(document.documentElement.clientHeight);
    var height5=Number($('#bottomS').height());
    $(document).on('scroll',function(){
    	if(dataObj.dataId==1){
    		if(dataObj.propse){
    			var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
    			var H5Top=parseInt($('#bottomS').offset().top+height5);
    			if(docH>=H5Top-150){
    				dataObj.propse=false;
    				$('#bottomS').html('数据加载中......');
    				getAjax(dataObj);
    			}
    		}
    	}else if(dataObj.dataId==2){
    		if(dataObj.near){
    			var docHs=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
    			var H5Tops=parseInt($('#bottom').offset().top+height5);
    			if(docHs>=H5Tops-150){
    				dataObj.near=false;
    				$('#bottom').html('数据加载中......');
					getAjax(dataObj);
    			}
    		}
    	}else if(dataObj.dataId==3){
    		if(dataObj.love){
				var docHss=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
				var H5Topss=parseInt($('#bottomSS').offset().top+height5);
				if(docHss>=H5Topss-150){
					dataObj.love=false;
					$('#bottomSS').html('数据加载中......');
					getLoveData(loveData);
				}
			}
    	}
    });
    //时间戳
	function add0(m) {
    	return m < 10 ? '0' + m : m
	}
	function format(shijianchuo) {
	    var time = new Date(shijianchuo * 1000);
	    var y = time.getFullYear();
	    var m = time.getMonth() + 1;
	    var d = time.getDate();
	    var h = time.getHours();
	    var mm = time.getMinutes();
	    var s = time.getSeconds();
	     var times = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
	    return times;
	}
	/* 下拉刷新 */
	var slide = function (option) {
	    var defaults={
	        d_container:'',
	        next:function(){}
	    }
	    var start,
	            end,
	            length,
	            isLock = false,//是否锁定整个操作
	            isCanDo = false,//是否移动滑块
	            isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
	            hasTouch = 'ontouchstart' in window && !isTouchPad;
	    var obj = document.querySelector(option.d_container);
	    var d_loading=obj.firstElementChild;
	    var offset=d_loading.clientHeight;
	    var objparent = obj.parentElement;
	    /*操作方法*/
	    var fn =
	    {
	        //移动容器
	        translate: function (diff) {
	            obj.style.webkitTransform='translate3d(0,'+diff+'px,0)';
	            obj.style.transform='translate3d(0,'+diff+'px,0)';
	        },
	        //设置效果时间
	        setTransition: function (time) {
	            obj.style.webkitTransition='all '+time+'s';
	            obj.style.transition='all '+time+'s';
	        },
	        //返回到初始位置
	        back: function () {
	            fn.translate(0 - offset);
	            //标识操作完成
	            isLock = false;
	        },
	        addEvent:function(element,event_name,event_fn){
	            if (element.addEventListener) {
	                element.addEventListener(event_name, event_fn, false);
	            } else if (element.attachEvent) {
	                element.attachEvent('on' + event_name, event_fn);
	            } else {
	                element['on' + event_name] = event_fn;
	            }
	        }
	    };
	    fn.translate(0-offset);
	    fn.addEvent(obj,'touchstart',start);
	    fn.addEvent(obj,'touchmove',move);
	    fn.addEvent(obj,'touchend',end);
	    fn.addEvent(obj,'mousedown',start)
	    fn.addEvent(obj,'mousemove',move)
	    fn.addEvent(obj,'mouseup',end)
	    //滑动开始
	    function start(e) {
	        if (objparent.scrollTop <= 0 && !isLock) {
	            var even = typeof event == "undefined" ? e : event;
	            //标识操作进行中
	            isLock = true;
	            isCanDo = true;
	            //保存当前鼠标Y坐标
	            start = hasTouch ? even.touches[0].pageY : even.pageY;
	            //消除滑块动画时间
	            fn.setTransition(0);
	            d_loading.innerHTML='下拉刷新数据';
	        }
	        return false;
	    }
	
	    //滑动中
	    function move(e) {
	        if (objparent.scrollTop <= 0 && isCanDo) {
	            var even = typeof event == "undefined" ? e : event;
	            //保存当前鼠标Y坐标
	            end = hasTouch ? even.touches[0].pageY : even.pageY;
	            if (start < end) {
	                even.preventDefault();
	                //消除滑块动画时间
	                fn.setTransition(0);
	                //移动滑块
	                if((end-start-offset)/2<=150) {
	                    length=(end - start - offset) / 2;
	                    fn.translate(length);
	                }
	                else {
	                    length+=0.3;
	                    fn.translate(length);
	                }
	            }
	        }
	    }
	    //滑动结束
	    function end(e) {
	        if (isCanDo) {
	            isCanDo = false;
	            //判断滑动距离是否大于等于指定值
	            if (end - start >= offset) {
	                //设置滑块回弹时间
	                fn.setTransition(1);
	                //保留提示部分
	                fn.translate(0);
	                //执行回调函数
	                d_loading.innerHTML='正在刷新数据';
	                if (typeof option.next == "function") {
	                    option.next.call(fn, e);
	                }
	            } else {
	                //返回初始状态
	                fn.back();
	            }
	        }
	    }
	}
	slide({d_container:"#d_container",next: function (e) {
	    //松手之后执行逻辑,ajax请求数据，数据返回后隐藏加载中提示
	    var that = this;
	    setTimeout(function () {
	    	location.reload();
	        that.back.call();
	    }, 500);
	}});
});