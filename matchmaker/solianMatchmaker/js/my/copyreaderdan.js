var province;//省
var town;//市
function city(classname,inpname,inpnamecopy){
	$(".d_hideBox").show();
	$.ajax({
		 type:"GET",
		 url:"../../city.json",
		 dataType:"json",
		 success:function(res){
		 	var citylist=res.citylist;
		 	for(var i in citylist){
		 		$(".d_province").append("<li title='"+i+"'>"+citylist[i].name+"</li>")
		 	}
		 	var town=res.citylist[0].city[0].area;
		 	for(var i in town){
		 		$(".d_town").append("<li>"+town[i]+"</li>")
		 	}
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
			 	$(".d_town").empty();
			 	for(var i in town){
			 		$(".d_town").append("<li>"+town[i]+"</li>")
			 	}
			 	town=$(".d_town>li").eq(0).text()
			 	$(".d_town>li").on("click",function(){
			 		$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#111111"});
			 		town=$(this).text()
			 	})
			 	$(".d_citytitle>p").on("click",function(){
					$(classname).text(province+"-"+town);
					$(inpname).val(province);
					$(inpnamecopy).val(town);
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
function heiage(star,end,startwo,classname,unit,inpname){
	$(".d_hidetwo").show();
	$(".d_heightagestar").empty();
	$(".d_heightageend").empty();
	for(var i=star;i<end;i++){
		$(".d_heightagestar").append("<li>"+i+"</li>")
	}
	for(var i=startwo;i<end;i++){
		$(".d_heightageend").append("<li>"+i+"</li>")
	}
	$(".d_heightagestar>li").on("click",function(){
		var heightstr=$(this).text();
		$(this).css({"background":"#FF704F","color":"#ffffff"});
		$(this).siblings().css({"background":"#ffffff","color":"#111111"});
		$(".d_heightageend").empty();
		for(var i=Number(heightstr)+1;i<end;i++){
			$(".d_heightageend").append("<li>"+i+"</li>")
		}
		$(".d_heightageend>li").on("click",function(){
			var heightend=$(this).text();
			$(this).css({"background":"#FF704F","color":"#ffffff"});
			$(this).siblings().css({"background":"#ffffff","color":"#111111"});
			$(".d_heighttitle>p").on("click",function(){
				$(classname).text(heightstr+unit+"-"+heightend+unit);
				$(inpname).val(heightstr+"-"+heightend)
				$(classname).css("color","#111111")
				$(".d_hidetwo").hide();
			})
		})
	})
	$(".d_heightageBox>div").eq(1).on("click",function(e){
		e.stopPropagation();
	})
	$(".d_hidetwo").on("click",function(){
		$(".d_hidetwo").hide();
	})
	$(".d_heighttitle>span").on("click",function(){
		$(".d_hidetwo").hide();
	})
}
function onewindow(arrlist,classname,units,inpname){
	$(".d_hideone").show();
	$(".d_oneul").empty();
	for(var i in arrlist){
		$(".d_oneul").append("<li>"+arrlist[i]+"</li>")
	};
	$(".d_oneul>li").on("click",function(){

		var price=$(this).text();
		$(this).css({"background":"#FF704F","color":"#ffffff"});
		$(this).siblings().css({"background":"#ffffff","color":"#111111"});
		$(classname).text(price+units);
		$(inpname).val(price)
		$(classname).css("color","#111111")
		$(".d_hideone").hide();
	});
	$(".d_one").on("click",function(e){
		e.stopPropagation();
	})
	$(".d_hideone").on("click",function(){
		$(".d_hideone").hide();
	})
}
var belieflist=[];//信仰
var dietlist=[];//饮食习惯
var drinklist=[];//喝酒
var educationallist=[];//学历
var familybglist=[];//家庭状况
var houselist=[];//住房
var incomelist=[];//工资
var industrylist=[];//行业
var interestlist=[];//喜欢的异性类
var joblist;//工作
var nationlist=[];//民族
var petlist=[];//宠物
var restlist=[];//作息时间
var rq_educationallist=[];//筛选学历
var rq_incomelist=[];//筛选工资
var smokinglist=[];//是否吸烟
var stylelist=[];//兴趣爱好
var zodialist=[];//属相
var start=0;//进度
$(function(){
	var cc=$('.d_city').text()
	cc=cc.split("-");
	$("input[name='nickname']").val($(".d_nickname>input").val());
	$("input[name='province']").val(cc[0]);
	$("input[name='city']").val(cc[1]);
	$("input[name='height']").val($(".d_height>div").text());
	$("input[name='weight']").val($(".d_weight>div").text());
	$("input[name='income']").val($(".d_income>div").text());
	$("input[name='edu']").val($(".d_edu>div").text());
	$("input[name='declaration']").val($(".d_love>input").val());
	$("input[name='industry']").val($(".d_hyba>div").text());
	$("input[name='car']").val($(".d_car>div").text());
	$("input[name='house']").val($(".d_house>div").text());
	$("input[name='school']").val($(".d_school>input").val());
	$("input[name='familybg']").val($(".d_familybg>div").text());
	$("input[name='hometown']").val($(".d_hometown>div").text());
	$("input[name='drink']").val($(".d_drink>div").text());
	$("input[name='smoking']").val($(".d_smoking>div").text());
	$("input[name='belief']").val($(".d_belief>div").text());
	$("input[name='diet']").val($(".d_diet>div").text());
	$("input[name='rest']").val($(".d_rest>div").text());
	$("input[name='pet']").val($(".d_pet>div").text());
	$("input[name='nation']").val($(".d_nation>div").text());
	$("input[name='style']").val($(".d_style>div").text());
	$("input[name='rq_age']").val($(".d_rqage>div").text());
	$("input[name='rq_height']").val($(".d_rqheight>div").text());
	$("input[name='rq_income']").val($(".d_rqincome>div").text());
	$("input[name='rq_edu']").val($(".d_rqedu>div").text());
	$.ajax({
		type:"GET",
		url:d_Http+"index.php/getdata",
		data:{
			
		},
		success:function(data){
			if(data.code==200){
				belieflist=data.data.belief;
				dietlist=data.data.diet;
				drinklist=data.data.drink;
				educationallist=data.data.educational;
				familybglist=data.data.familybg;
				houselist=data.data.house;
				incomelist=data.data.income;
				industrylist=data.data.industry;
				interestlist=data.data.interest;
				joblist=data.data.job;
				nationlist=data.data.nation;
				petlist=data.data.pet;
				restlist=data.data.rest;
				rq_educationallist=data.data.rq_educational;
				rq_incomelist=data.data.rq_income;
				smokinglist=data.data.smoking;
				stylelist=data.data.style;
				zodialist=data.data.zodia;
				$(".d_nickname>input").on("change",function(){
					$("input[name='nickname']").val($('.d_nickname>input').val())
				})
				$(".d_jobBox").empty();
				for(var i in industrylist){
					$(".d_jobBox").append("<li>"+industrylist[i]+"</li>")
				}
				$(".d_jobBox>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
					$(".d_hyba>div").text($(this).text())
					$(".d_hangy").hide();
					$("input[name='industry']").val($(this).text());
				});
				$(".d_height").on("click",function(){
					var list=[]
					for(var i=150;i<201;i++){
						list.push(i)
					}
					onewindow(list,".d_height>div","cm","input[name='height']");
				});
				$(".d_weight").on("click",function(){
					var list=[]
					for(var i=30;i<151;i++){
						list.push(i)
					}
					onewindow(list,".d_weight>div","kg","input[name='weight']");
				});
				$(".d_edu").on("click",function(){
					onewindow(educationallist,".d_edu>div","","input[name='edu']");
				});
				$(".d_income").on("click",function(){
					onewindow(incomelist,".d_income>div","","input[name='income']");
				});
				$(".d_house").on("click",function(){
					onewindow(houselist,".d_house>div","","input[name='house']");
				});
				$(".d_car").on("click",function(){
					var list=["有车","无车","打算购买"]
					onewindow(list,".d_car>div","","input[name='car']");
				});
				$(".d_school>input").on("change",function(){
					$("input[name='school']").val($('.d_school>input').val())
				})
				$(".d_familybg").on("click",function(){
					onewindow(familybglist,".d_familybg>div","","input[name='familybg']");
				});
				$(".d_nation").on("click",function(){
					onewindow(nationlist,".d_nation>div","","input[name='nation']");
				});
				$(".d_hometown").on("click",function(){
					city(".d_hometown>div","input[name='hometown']","")
				});
				$(".d_smoking").on("click",function(){
					onewindow(smokinglist,".d_smoking>div","","input[name='smoking']");
				});
				$(".d_drink").on("click",function(){
					onewindow(drinklist,".d_drink>div","","input[name='drink']");
				});
				$(".d_belief").on("click",function(){
					onewindow(belieflist,".d_belief>div","","input[name='belief']");
				});
				$(".d_diet").on("click",function(){
					onewindow(dietlist,".d_diet>div","","input[name='diet']");
				});
				$(".d_rest").on("click",function(){
					onewindow(restlist,".d_rest>div","","input[name='rest']");
				});
				$(".d_pet").on("click",function(){
					onewindow(petlist,".d_pet>div","","input[name='pet']");
				});
				$(".d_love>input").on("change",function(){
					$("input[name='declaration']").val($('.d_love>input').val())
				})
				/*  兴趣爱好  */
				$(".d_style").on("click",function(){
					$(".d_like").show();
				});
				$(".d_xqback").on("click",function(){
					$(".d_like").hide();
				});
				for(var i in stylelist){
					$(".d_hobby").append("<li>"+stylelist[i]+"</li>")
				}
				var arrxq=[];
				$(".d_hobby>li").on("click",function(){
					if($(this).attr("title")==2){
						$(this).attr("title","1");
						$(this).css({"background":"#ffffff","color":"#FF704F"});
						for(var i in arrxq){
							if(arrxq[i]==$(this).text()){
								arrxq.splice(i,1);
							}
						}
					}else{
						arrxq.push($(this).text())
						if(arrxq.length<=5){
							$(this).css({"background":"#FF704F","color":"#ffffff"});
							$(this).attr("title","2");
						}else if(arrxq.length>5){
							arrxq.pop();
							$(".d_popupbox").html("最多选5项");setTimeout(show,500);setTimeout(hide,2000);
						}
					}
				});
				$(".d_xqnext").on("click",function(){
					if(arrxq==""){
						$(".d_popupbox").html("请选择你的兴趣爱好");setTimeout(show,500);setTimeout(hide,2000);
					}else{
						$("input[name='style']").val(arrxq.join(','));
						$(".d_style>div").text(arrxq.join(','))
						$(".d_like").hide();
					}
				});
				$(".d_rqage").on("click",function(){
					heiage(18,70,19,".d_rqage>div","岁","input[name='rq_age']")
				});
				$(".d_rqheight").on("click",function(){
					heiage(150,200,151,".d_rqheight>div","cm","input[name='rq_height']")
				});
				$(".d_rqincome").on("click",function(){
					onewindow(rq_incomelist,".d_rqincome>div","","input[name='rq_income']")
				});
				$(".d_rqedu").on("click",function(){
					onewindow(rq_educationallist,".d_rqedu>div","","input[name='rq_edu']")
				});
				
			}else{
				$(".d_popupbox").html("请求失败");setTimeout(show,500);setTimeout(hide,2000);
			}
			
		}
	})
	$(".d_hyback").on("click",function(){
		$(".d_hangy").hide();
	})
	$(".d_cityBox").on("click",function(){
		city(".d_city","input[name='province']","input[name='city']")
	})
	$(".d_hyba").on("click",function(){
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
		$(".d_button").on("click", function() {
			myCrop.setCropStyle(previewStyle);
			var src = myCrop.getCropFile({});
			$(".d_photo").attr("src",src)
			$(".d_bg").css("backgroundImage","url("+src+")")
			$(".d_fileForm>div").eq(0).hide();
			$(".d_reForm").eq(0).show();
		});
	});
	$(".d_save").on("click",function(){
		$("#form").submit();
	})
})
