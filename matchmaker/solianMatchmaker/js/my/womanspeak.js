$(function(){
	$(".d_addpeople").on("click",function(){
		$(".d_frist").hide();
		$(".d_selectdan").show();
		$(".d_list").append("<div class='d_listson'><img src='../../image/img/x_one.jpg' /><div class='d_box'><div></div></div></div>")
		$(".d_list .d_box").on("click",function(){
			var index=$(".d_list .d_box").index(this);
			$(".d_list .d_box").removeClass("d_change")
			$(this).addClass("d_change");
			var src=$(".d_list img").eq(index).attr("src")
			$(".d_sure").on("click",function(){//选择单身确定
				$(".d_frist").show();
				$(".d_selectdan").hide();
				$(".d_addpeople").attr("src",src)
			});
		});
	});
	$(".d_text textarea").on("input",function(){
		$("textarea").on("input",function(){
			$(".d_text span").text($('textarea').val().length)
		})
	})
	$(".d_backone").on("click",function(){//选择单身返回
		$(".d_frist").show();
		$(".d_selectdan").hide();
	});
	
	$(".d_fb").on("click",function(){
		$(".d_frist").hide();
		$(".d_fbhistory").show();
		$(".d_fblist").append("<div class='d_fblistson'><img src='../../image/img/x_one.jpg' /><div class='d_nickdate'><p>执着的承诺</p><span>2017.07.3</span></div><p class='d_delete'>删除</p><p class='d_revamp'>修改</p></div>")
		$(".d_fblist .d_delete").on("click",function(){
			//调用删除接口
			var index=$(".d_fblist .d_delete").index(this);
			$(".d_fblist .d_fblistson").eq(index).remove();
		})
		$(".d_fblist .d_revamp").on("click",function(){
			//调用修改接口
			
		})
	});
	$(".d_backtwo").on("click",function(){
		$(".d_frist").show();
		$(".d_fbhistory").hide();
	});
	//点击保存
	$(".d_save").on("click",function(){
		if($(".d_addpeople").attr("src")=="../../image/icons/d_addpeople.png"){
			$(".d_popupbox").html("请选择您的单身成员");setTimeout(show,500);setTimeout(hide,2000);
		}else if($('textarea').val().length<5){
			$(".d_popupbox").html("请填写您的意见建议（5-500字哦）！");setTimeout(show,500);setTimeout(hide,2500);
		}else{
			//调用保存接口
		}
	});
})
