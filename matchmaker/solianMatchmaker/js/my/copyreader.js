var province;//省
var town;//市
function city(classname){
	$(".d_hideBox").show();
	$(".d_town").empty();
	$(".d_province").empty();
	$.ajax({
		 type:"GET",
		 url:"../../city.json",
		 dataType:"json",
		 success:function(data){
		 	console.log(data)
		 	var citylist=data.citylist;
		 	console.log(citylist[0].name)
		 	for(var i in citylist){
		 		$(".d_province").append("<li grade="+i+" title='"+i+"'>"+citylist[i].name+"</li>")
		 	}
		 	var town=citylist[0].city[0].name;
		 	$(".d_town").append("<li>"+town+"</li>")
		 	var citynum;
		 	$(".d_province>li").on("click",function(){
				province=$(this).text()
				$(this).css({"background":"#FF704F","color":"#ffffff"});
				$(this).siblings().css({"background":"#ffffff","color":"#111111"});
				citynum=$(this).attr("title")
				town=[]
				var dd=citylist[citynum].city
				for(var i in dd){
			        town.push(dd[i].name)
				}
				console.log(town)
			 	$(".d_town").empty();
			 	for(var i in town){
			 		$(".d_town").append("<li>"+town[i]+"</li>")
			 	}
			 	town=$(".d_town>li").eq(0).text()
			 	$(".d_town>li").on("click",function(){
			 		$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#111111"});
			 		console.log($(this).text())
			 		town=$(this).text()
			 	})
			 	$(".d_citytitle>p").on("click",function(){
					$(classname).text(province+"-"+town);
					$(classname).css("color","#111111");
					$(".d_hideBox").hide();
				});
			});
		 }
	})
	$(".d_citytitle>span").on("click",function(){
		$(".d_hideBox").hide();
	});
}
$(function(){
	$.ajax({
		type:"get",
		url:d_Http+"index.php/getdata",
		data:{
			
		},
		success:function(data){
			if(data.code==200){
				var industrylist=data.data.industry;
				$(".d_jobBox").empty();
				for(var i in industrylist){
					$(".d_jobBox").append("<li>"+industrylist[i]+"</li>")
				}
				$(".d_jobBox>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
						$(".d_hyba>div").text($(this).text())
						$(".d_reForm").show();
						$(".d_hangy").hide();
				});
			}
			
		}
	})
	$(".d_hyback").on("click",function(){
		$(".d_reForm").show();
		$(".d_hangy").hide();
	})
	$(".d_cityBox").on("click",function(){
		city(".d_city")
	})
	$(".d_hyba").on("click",function(){
		$(".d_reForm").hide();
		$(".d_hangy").show();
	})
	
	/* 头像上传 */
	$(".d_alterimg").on("click",function(){
		$(".d_fileForm>div").eq(0).show();
		$(".d_reForm").eq(0).hide();
	});
	$(".imgLeft").on("click",function(){
		$(".d_fileForm>div").eq(0).hide();
		$(".d_reForm").eq(0).show();
	});
	$(".imgLeft").on("click",function(){
		if(knowfrom==1){
			$(".d_fileForm>div").eq(0).hide();
			$(".d_form>div").eq(3).show();
		}else if(knowfrom==2){
			$(".d_fileForm>div").eq(0).hide();
			$(".d_formTwo>div").eq(2).show();
		}
	})
	var $input = document.getElementsByName("files")[0];
	var $img = document.getElementById("upLoadImg");
	var $canvas = document.getElementById("canvas");
	//选择图片

	$input.addEventListener("change",function(){
		$img.src = getFileUrl(this);
	},false);

	var myCrop;
	require(["jquery", 'hammer', 'tomPlugin', "tomLib", 'hammer.fake', 'hammer.showtouch'], function($, hammer, plugin, T) {
		document.addEventListener("touchmove", function(e){
//				e.preventDefault();
		});
		var opts = {
				cropWidth: $canvas.width,
				cropHeight: $canvas.height
		},
		previewStyle = {
			x: 0,
			y: 0,
			scale: 1,
			rotate: 0,
			ratio: 1
		},
		transform = T.prefixStyle("transform"),
		myCrop = T.cropImage({
			bindFile: $("input[name='files']"),
			enableRatio: false, //是否启用高清,高清得到的图片会比较大
			canvas: $canvas, //放一个canvas对象
			cropWidth: opts.cropWidth, //剪切大小
			cropHeight: opts.cropHeight,
			bindPreview: $("#upLoadImg"), //绑定一个预览的img标签
			useHammer: true, //是否使用hammer手势，否的话将不支持缩放
			oninit: function() {

			},
			onLoad: function(data) {
				//用户每次选择图片后执行回调
				resetUserOpts();
				previewStyle.ratio = data.ratio;
				$(".image").attr("src", data.originSrc).css({
					width: data.width,
					height: data.height
				}).css(transform, 'scale(' + 1 / previewStyle.ratio + ')');
				myCrop.setCropStyle(previewStyle)
			}
		});

		function resetUserOpts() {
			$("canvas").hammer('reset');
			previewStyle = {
				scale: 1,
				x: 0,
				y: 0,
				rotate: 0
			};
			$(".image").attr("src", '');
		};
		$("canvas").hammer({
			gestureCb: function(o) {
				//每次缩放拖拽的回调
				$.extend(previewStyle, o);
				$(".image").css(transform, "translate3d(" + previewStyle.x + 'px,' + previewStyle.y + "px,0) rotate(" + previewStyle.rotate + "deg) scale(" + (previewStyle.scale / previewStyle.ratio) + ")")
			}
		});
		$(".d_button").on("click", function() {
			myCrop.setCropStyle(previewStyle);
			var src = myCrop.getCropFile({});
			$(".d_photo").attr("src",src)
			$(".d_fileForm>div").eq(0).hide();
			$(".d_reForm").eq(0).show();
		});
	});
})
