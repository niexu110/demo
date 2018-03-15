var industrylist=[];//行业
var province;//省
var town;//市
function city(classname,inpname,inpnamecopy){
	$(".d_hideBox").show();
	$.ajax({
		type:"GET",
		url:"Home/city.json",
		dataType:"json",
		success:function(res){
			var citylist=res.citylist;
			for(var i in citylist){
				$(".d_province").append("<li title='"+i+"' name='"+citylist[i].code+"'>"+citylist[i].name+"</li>")
			}
			var town=res.citylist[0].city[0].name;
			var citynum;
			$(".d_province>li").on("click",function(){
				province=$(this).text();
				shpro=$(this).attr("name");
				$(this).css({"background":"#FF704F","color":"#ffffff"});
				$(this).siblings().css({"background":"#ffffff","color":"#111111"});
				citynum=$(this).attr("title")
				town=[]
				var dd=citylist[citynum].city
				for(var i in dd){
					town.push(dd[i])
				}
				$(".d_town").empty();
				for(var i in town){
					$(".d_town").append("<li name='"+town[i].code+"'>"+town[i].name+"</li>")
				}
				town=$(".d_town>li").eq(0).text()
				$(".d_town>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#111111"});
					town=$(this).text();
					ctyop=$(this).attr("name");
				})
				$(".d_citytitle>p").on("click",function(){
					$(classname).text(province+"-"+town);
					$(inpname).val(shpro);
					$(inpnamecopy).val(ctyop);
					$(".d_province>li").css({"background":"#ffffff","color":"#111111"});
					$(".d_town>li").css({"background":"#ffffff","color":"#111111"});
					$(classname).css("color","#111111");
					$(".d_hideBox").hide();
				});
			});
		}
	})
	$(".d_citylist").on("click",function(e){
		e.stopPropagation();
	})
	$(".d_hideBox").on("click",function(){
		$(".d_hideBox").hide();
	})
	$(".d_citytitle>span").on("click",function(){
		$(".d_hideBox").hide();
	});
}
$(function(){
	$.ajax({
		type:"GET",
		url:d_Http+"index.php/getdata",
		data:{
			
		},
		success:function(data){
			if(data.code==200){
				industrylist=data.data.industry;

				/* 完善资料 */
				$(".d_cityResult").on("click",function(){
					city(".d_cityResult","input[name='province']","input[name='city']")
				})
				$(".d_tradeselect").on("click",function(){
					$(".d_formTwo").hide();
					$(".d_zhiy").show();
				})
				$(".d_hyback").on("click",function(){
					$(".d_formTwo").show();
					$(".d_zhiy").hide();
				});
				for(var i in industrylist){
					$(".d_jobBox").append("<li>"+industrylist[i]+"</li>")
				}
				$(".d_jobBox>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
					$("input[name='industry']").val($(this).text());
					$(".d_tradeselect>span").text($(this).text())
					$(".d_tradeselect>span").css("color","#111111")
					$(".d_formTwo").show();
					$(".d_zhiy").hide();
				});
				$(".d_zlnext").on("click",function(){
					if($(".d_phototow").attr("src")=="../../image/icons/d_photo.png"){
						$(".d_popupbox").html("请上传您的真实头像");setTimeout(show,500);setTimeout(hide,2000);
					}else if($(".d_nicknames").val().length<2 || $(".d_nicknames").val().length>7){
						$(".d_popupbox").html("请输入(昵称为2-7个字)");setTimeout(show,500);setTimeout(hide,2000);
					}else if($(".d_cityResult").text()=="点击选择城市"){
						$(".d_popupbox").html("请选择您所在的城市");setTimeout(show,500);setTimeout(hide,2000);
					}else if($(".d_tradeselect>span").text()=="请选择"){
						$(".d_popupbox").html("请选择您从事的行业");setTimeout(show,500);setTimeout(hide,2000);
					}else if($(".d_post").val()==""){
						$(".d_popupbox").html("请简单介绍您的职位情况");setTimeout(show,500);setTimeout(hide,2000);
					}else{
						$("input[name='nickname']").val($(".d_nicknames").val());
						$("input[name='industry']").val($(".d_tradeselect>span").text());
						$("input[name='introduction']").val($(".d_post").val());
						$("#form").submit();
					}
				})
				$(".d_phototow").on("click",function(){
					$(".d_formTwo").hide();
					$(".d_fileForm>div").show();
				})
			}
		}
	});
	
	//头像
	$(".imgLeft").on("click",function(){
		$(".d_formTwo").show();
		$(".d_fileForm>div").hide();
	})
	var $input = document.getElementById("upLoadInt");
	var $img = document.getElementById("upLoadImg");
	var $canvas = document.getElementById("canvas");
	//选择图片
	$input.addEventListener("change",function(){
		$img.src = getFileUrl(this);
	},false);

	var myCrop;
	require(["jquery", 'hammer', 'tomPlugin', "tomLib", 'hammer.fake', 'hammer.showtouch'], function($, hammer, plugin, T) {
		document.addEventListener("touchmove", function(e){
//							e.preventDefault();
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
			bindFile: $("#upLoadInt"),
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
		$("button").on("click", function() {
			myCrop.setCropStyle(previewStyle);
			var src = myCrop.getCropFile({});
			$(".d_phototow").attr("src",src)
			$("input[name='image']").val(src);
			$(".d_formTwo").show();
			$(".d_fileForm>div").hide();
		});
	});
})
