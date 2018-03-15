var data={send:0,pay_type:1,uid:localStorage.getItem("uid"),token:MD5(localStorage.getItem("uid")+SL)};
window.onload=function(){
	var obj=JSON.parse(localStorage.getItem('s_object'));
		//缓存赋值、判断接送、判断AA？
	if(obj==null){
		return;
	}else{
		//男女
		obj.sex==0?($(".right s").text('男女不限'),data.sex=0)
		:(obj.sex==1?($(".right s").text('男'),data.sex=1):($(".right s").text('女'),data.sex=2))
		//判断接送 0不接送  1接送
		if(obj.send == 1){
			$(".send span:eq(0) i").addClass("curr");
			$(".send span:eq(1) i").removeClass("curr");
			data.send=1
		}else if(obj.send == 0){
			$(".send span:eq(1) i").addClass("curr");
			$(".send span:eq(0) i").removeClass("curr");
			data.send=0
		}
		//判断方式    1我请客 2aa  3请我吧
		if(obj.pay_type == 1){
			$(".type span:eq(0) i").addClass("curr");
			$(".type span:eq(1) i").removeClass("curr");
			$(".type span:eq(2) i").removeClass("curr");	
			data.pay_type=1;
		}else if(obj.pay_type == 2){
			$(".type span:eq(0) i").removeClass("curr");
			$(".type span:eq(2) i").removeClass("curr");
			$(".type span:eq(1) i").addClass("curr");
			data.pay_type=2;
		}else if(obj.pay_type == 3){
			$(".type span:eq(0) i").removeClass("curr");
			$(".type span:eq(1) i").removeClass("curr");
			$(".type span:eq(2) i").addClass("curr");
			data.pay_type=3;
		}
		$(".timeData s").text(obj.date_time);
		data.date_time=obj.date_time;
		$("textarea").val(obj.other);
		obj.other==undefined?($(".num").text(0),data.other="")
		:($(".num").text(obj.other.length),data.other=obj.other);
	}
	//判断场景是否选择
	if(JSON.parse(localStorage.getItem('b_object')) != null){
		 data.goods_id=JSON.parse(localStorage.getItem('b_object')).shop_id;
		$(".info i").text(JSON.parse(localStorage.getItem('b_object')).shop_name);
		$(".info strong").text(JSON.parse(localStorage.getItem('b_object')).shop_address);
		$(".select").css("display","none");
		$(".info").css("display","block");
	}else{
		$(".select").css("display","block");
		$(".info").css("display","none");
	}
	localStorage.removeItem("s_object");
	localStorage.removeItem("b_object");
}
function show(){
	$(".d_popupbox").css("display","block")
}
function hide(){
	$(".d_popupbox").css("display","none")
}
$(function(){
	//获取当前时间
	var myDate=new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate());
	var url=document.location.toString();
	var dataId=url.substring(url.indexOf('=')+1,url.length);
	var OBJ=JSON.parse(localStorage.getItem("b_object"));
	//判断一对一还是一对多
	if(url.indexOf('=')=='-1' || dataId == 0){
		data.m_uid=0;
		data.type="2";
		data.sex=0;
		$(".sex").show();
	}else{
		data.m_uid=url.substring(url.indexOf('=')+1,url.length);
		data.type="1";
		$(".sex").hide();
	}
	//选择按钮添加样式
	$("p span").on("click",function(){
		$(this).find("i").addClass("curr");
		$(this).siblings("span").find("i").removeClass("curr")
	})
	//性别弹框显示
	$(".sex").on("click",function(){
		$(".cover").show();
	})
	//关闭性别弹框
	$(document).on("click",".cover,.close",function(){
		$(".cover").hide();
	})
	//选择性别
	$(".cover div p").on("click",function(){
		var num=$(this).attr("title")
		data.sex=num;
		$(".right s").text($(this).text());
	})
	//计算输入的字数
	$("textarea").bind("propertychange input",function(){
		data.other=$(this).val();
		$(".num").text($(this).val().length);
	})
	//时间显示
	$("#time").change(function(){
        var str=$("#time").val().replace("T"," ");
        $(".timeData s").text(str); 
        data.date_time=str;
   })
	$(".type span").click(function(){
		$(this).children().addClass("curr").siblings("curr").removeClass("curr");
		data.pay_type=$(this).attr("title");
	})
	$(".send span").click(function(){
		$(this).children().addClass("curr").siblings("curr").removeClass("curr");
		data.send=$(this).attr("title");
	})
	//场景选择
	
	$('.select').on("click",function(){
		localStorage.setItem("s_object",JSON.stringify(data));
		location.href = "secneSelection.html";
	})
	//更换场景
	$('.replace').on("click",function(){
		localStorage.setItem("s_object",JSON.stringify(data));
		location.href = "secneSelection.html";
	})

	//点击上一步清空缓存
	$(".back").on("click",function(){ 
		localStorage.removeItem("s_object");
		localStorage.removeItem("b_object");
		location.href="personalIndex.html"
	})
	//关闭遮罩层
	$(".box").on("click",function(){
		$(this).hide();
	})
	//查看约会进度
	$(".btn_b").on("click",function(){
		location.href = "";
	})
	$("#btn").click(function(){
		 var time=data.date_time;
		 if(data.goods_id == undefined){
		 	$(".d_popupbox").html("请选择约会场景");
		 	setTimeout(show,500);
		 	setTimeout(hide,2000);
		 }else if(time==undefined){
		 	$(".d_popupbox").html("请选择时间");
		 	setTimeout(show,500);
		 	setTimeout(hide,2000);
		 }else if((new Date(time)).getTime()/1000<(new Date(myDate)).getTime()/1000){
		 	$(".d_popupbox").html("时间选择错误");
		 	setTimeout(show,500);
		 	setTimeout(hide,2000);
		 }else if($("textarea").val() == ""){
		 	$(".d_popupbox").html("请填写约会说明");
		 	setTimeout(show,500);
		 	setTimeout(hide,2000);
		 }else if($("textarea").val().length < 10){
		 	$(".d_popupbox").html("约会说明最少10个字");
		 	setTimeout(show,500);
		 	setTimeout(hide,2000);
		 }else{
			 var url = d_http+"index.php/Home/Engagement/pub_since";
			 var self=$(".bomb");
		 	 _ajax.getAjax(url,data,"POST",function(res){
				if(data.m_uid ===0){
					$(".box").show();
				}else{
					$(".success p").eq(0).text("您已经向"+localStorage.getItem("n_nickname")+"发起了约会邀请");
					$(".success p").eq(1).text("请等待对方回复");
					$(".box").show();
				}
				localStorage.removeItem("s_object");
				localStorage.removeItem("b_object");
			 })
		 }
	})

	$(".box").on("click",function(){
		$(this).hide();
		location.href='../../src/personal/personalAppointment.html';
	});
	// 查看约会进度
	$('.btn_b').on('click',function(event){      
		event.stopPropagation(); 
		localStorage.setItem("d_classfiy","2")
		location.href='../../src/myself/mydate.html';
	});
})
