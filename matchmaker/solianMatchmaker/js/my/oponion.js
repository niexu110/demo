//图片页面展示
	function he() {
		console.log($('.d_photo>ul>li').length)
	    if($('.d_photo>ul>li').length>2){
	    	$(".d_popupbox").html("相册图片不能超过3张");setTimeout(show,500);setTimeout(hide,2000);
	    	return;
	    }else{
		    var oFile = document.getElementById('d_btn').files[0];
		    var thisimg=oFile['name']
		    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
		    var oReader = new FileReader();
		    oReader.onload = function(e){
		    	$(".d_photo>ul").prepend("<li><img src="+e.target.result+" /></li>")
			};
		    oReader.readAsDataURL(oFile);
	    }
	}
$(function(){
	$("textarea").on("input",function(){
		$(".d_text span").text($('textarea').val().length)
	})
	$("#header>span").on("click",function(){
		if($('textarea').val().length<5){
			$(".d_popupbox").html("请填写您的意见建议（5-500字哦）！");setTimeout(show,500);setTimeout(hide,2500);
		}
	})
})
