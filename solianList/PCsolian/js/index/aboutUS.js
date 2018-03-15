function isIE(){
  return (document.all && window.ActiveXObject && !window.opera) ? true : false;
}
testfunc();
function testfunc(){
    if (isIE()) {
    	var img = document.getElementById("img");
    	img.style.width = "1920px";
    	img.style.height = "340px";
    	window.attachEvent("onload",function(){
		    aa();
			},false);
    }else {
   		window.addEventListener("load",function(){
		   	aa();
			},false);
    }
}
function aa(){
	$(function(){
		var link = window.location.href;
	 	var ret = link.split("?")[1];
	 	if(ret != undefined){
	 		$(".nav ul li").eq(3).addClass("curr");
		  $(".introduce").eq(3).addClass("show");
		  $(".nav ul li").on("click",function(){
					var index = $(this).index();
					$(this).addClass("curr").siblings().removeClass("curr");
					$(".introduce").eq(index).addClass("show").siblings().removeClass("show");
			})
	 	}else{
	 			$(".nav ul li").eq(0).addClass("curr");
			  $(".introduce").eq(0).addClass("show");
			  $(".nav ul li").on("click",function(){
					var index = $(this).index();
					$(this).addClass("curr").siblings().removeClass("curr");
					$(".introduce").eq(index).addClass("show").siblings().removeClass("show");
				})
		 	}	
    })
}
var map = new AMap.Map('maps', {
    resizeEnable: true,
    zoom:20,
    center: [108.92116,34.26903]
});
new AMap.Marker({
 	map: map,
 	position: [108.92116,34.26903],
 	icon: new AMap.Icon({
 		size: new AMap.Size(40, 50), //图标大小
 		image: "../image/address.png",
 		imageOffset: new AMap.Pixel(0, -60)
 	})
});
