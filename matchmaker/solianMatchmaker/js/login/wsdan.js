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
var province;//省
var town;//市
var knowfrom;//身份跳转
var list=[];//集合
var tradeselect=1;//行业选择
var birthday,d_education,d_industry,d_job,d_car,d_house,d_familybg,d_drink,d_smoke,d_hiero,d_dist,d_workandrest,d_pet,d_style;
var d_code;
var shpro,ctyop;
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

function heiage(star,end,startwo,classname,unit,inpname){
	$(".d_heightageBox").show();
	$(".d_heightagestar").empty();
	$(".d_heightageend").empty();
	$(".d_heightagestar").append("<li>不限</li>")
	for(var i=star;i<end;i++){
		$(".d_heightagestar").append("<li>"+i+"</li>")
	}
	for(var i=startwo;i<end;i++){
		$(".d_heightageend").append("<li>"+i+"</li>")
	}
	$(".d_heightagestar>li").on("click",function(){
		var heightstr=$(this).text();
		var heightend="";
		$(this).css({"background":"#FF704F","color":"#ffffff"});
		$(this).siblings().css({"background":"#ffffff","color":"#111111"});
		$(".d_heightageend").empty();
		for(var i=Number(heightstr)+1;i<end;i++){
			$(".d_heightageend").append("<li>"+i+"</li>")
		}
		if(heightstr=="不限"){
			$(".d_heighttitle>p").on("click",function(){
				$(classname).text(heightstr);
				$(inpname).val(heightstr);
				$(classname).css("color","#111111")
				$(".d_heightageBox").hide();
			})
		}else{
			$(".d_heightageend>li").on("click",function(){
				heightend=$(this).text();
				$(this).css({"background":"#FF704F","color":"#ffffff"});
				$(this).siblings().css({"background":"#ffffff","color":"#111111"});
				$(".d_heighttitle>p").on("click",function(){
					$(classname).text(heightstr+unit+"-"+heightend+unit);
					$(inpname).val(heightstr+"-"+heightend);
					$(classname).css("color","#111111")
					$(".d_heightageBox").hide();
				})
			})
		}
	})
	$(".d_heighttitle>span").on("click",function(){
		$(".d_heightageBox").hide();
	})
}
function onewindow(arrlist,classname,units,inpname){
	$(".d_one").show();
	$(".d_oneul").empty();
	for(var i in arrlist){
		$(".d_oneul").append("<li>"+arrlist[i]+"</li>")
	}
	$(".d_oneul>li").on("click",function(){
		var price=$(this).text();
		$(this).css({"background":"#FF704F","color":"#ffffff"});
		$(this).siblings().css({"background":"#ffffff","color":"#111111"});
		$(".d_onetitle>p").on("click",function(){
			$(classname).text(price+units);
			$(inpname).val(price)
			$(classname).css("color","#111111")
			$(".d_one").hide();
		})
	})
	$(".d_onetitle>span").on("click",function(){
		$(".d_one").hide();
	})
}
$(function(){
	$.ajax({
		type:"GET",
		url:d_Http+"/getdata",
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
				/* 选择身份  单身 已婚 */
				var d_rank=1;
				$(".d_rank>p").on("click",function(){
					$(this).addClass("d_change").siblings().removeClass("d_change");
					d_rank=$(this).attr("name");
				});
				$(".d_shfnext").on("click",function(){
					if(d_rank==1){
						$(".d_form>div").eq(3).show();
						$(".d_form>div").eq(2).hide();
					}else if(d_rank==2){
						$(".d_popupbox").html("既然已经结婚了，您还要加入单身团吗？还是安心当媒婆吧，帮助朋友脱单助人为快乐之本！");setTimeout(show,500);setTimeout(hide,5000);
					}
				});
				/*  头像昵称  */
				$(".d_photo").on("click",function(){
					knowfrom=1;
					$(".d_fileForm>div").eq(0).show();
					$(".d_form>div").eq(3).hide();
				});
				$(".d_wsback").on("click",function(){
					$(".d_form>div").eq(2).show();
					$(".d_form>div").eq(3).hide();
				});
				$("#showCityPicker").on("click",function(){
					$(".mui-poppicker").show();
				});
				$(".d_wsnext").on("click",function(){
					if($(".d_photo").attr("src")=="../../image/icons/d_photo.png"){
						$(".d_popupbox").html("请上传您的真实头像");setTimeout(show,500);setTimeout(hide,2000);
					}else if($(".d_nickname").val().length<2 || $(".d_nickname").val().length>7){
						$(".d_popupbox").html("请输入(昵称为2-7个字)");setTimeout(show,500);setTimeout(hide,2000);
					}else{
						$("input[name='nickname']").val($(".d_nickname").val());
						$(".d_form>div").eq(4).show();
						$(".d_form>div").eq(3).hide();
					}
				});
				/*  性别选择  */
				var d_sex=2;
				$(".d_sex>p").on("click",function(){
					$(this).addClass("d_change").siblings().removeClass("d_change");
					d_sex=$(this).attr("name");
				});
				$(".d_xbback").on("click",function(){
					$(".d_form>div").eq(3).show();
					$(".d_form>div").eq(4).hide();
				});
				$(".d_xbnext").on("click",function(){
					$("input[name='sex']").val(d_sex)
					$(".d_form>div").eq(5).show();
					$(".d_form>div").eq(4).hide();
				});
				/*   生日选择  */
				$(".d_srback").on("click",function(){
					$(".d_form>div").eq(4).show();
					$(".d_form>div").eq(5).hide();
				});
				var year=new Date().getFullYear();
				var varnum=1;
				$('.d_feteday').blur(function(){
					var date=$(".d_feteday").val();
					var str=date;
					date=date.split("-");
					if(year-date[0]>=18 && year-date[0]<75){
						varnum=2;
					}else{
						varnum=1;
						$(".d_popupbox").html("年龄必须18岁以上");setTimeout(show,500);setTimeout(hide,2000);
					}
				})
				$(".d_srnext").on("click",function(){
					if($(".d_feteday").val()==""){
						$(".d_popupbox").html("请选择您的生日");setTimeout(show,500);setTimeout(hide,2000);
					}else if(varnum==1){
						$(".d_popupbox").html("年龄必须18岁以上");setTimeout(show,500);setTimeout(hide,2000);
					}else{
						$("input[name='birthday']").val(Date.parse(new Date($('.d_feteday').val()))/1000);
						$(".d_form>div").eq(6).show();
						$(".d_form>div").eq(5).hide();
					}
				});
				$(".d_backmeipo").on("click",function(){
					$(".d_form>div").eq(1).show().siblings().hide();
				});
				/*  身高选择  */
				$(".d_sgback").on("click",function(){
					$(".d_form>div").eq(5).show();
					$(".d_form>div").eq(6).hide();
				});
				$(".d_sgnext").on("click",function(){
					if($(".d_height").text()=="请选择"){
						$(".d_popupbox").html("请选择您的身高");setTimeout(show,500);setTimeout(hide,2000);
					}else{
						$(".d_form>div").eq(27).show();
						$(".d_form>div").eq(6).hide();
					}
				});
				$(".d_height").on("click",function(){
					list=[]
					for(var i=120;i<221;i++){
						list.push(i)
					}
					onewindow(list,".d_height","cm","input[name='height']");
				})
				/*  体重选择  */
				$(".d_tzback").on("click",function(){
					$(".d_form>div").eq(6).show();
					$(".d_form>div").eq(27).hide();
				});
				$(".d_tznext").on("click",function(){
					if($(".d_weight").text()=="请选择"){
						$(".d_popupbox").html("请选择您的体重");setTimeout(show,500);setTimeout(hide,2000);
					}else{
						$(".d_form>div").eq(7).show();
						$(".d_form>div").eq(27).hide();
					}
				});
				$(".d_weight").on("click",function(){
					list=[]
					for(var i=30;i<151;i++){
						list.push(i)
					}
					onewindow(list,".d_weight","kg","input[name='weight']");
				})
				/*  选择收入  */
				$(".d_shrback").on("click",function(){
					$(".d_form>div").eq(27).show();
					$(".d_form>div").eq(7).hide();
				});
				$(".d_shrnext").on("click",function(){
					if($(".d_srmoney").text()=="请选择"){
						$(".d_popupbox").html("请选择您的收入");setTimeout(show,500);setTimeout(hide,2000);
					}else{
						$(".d_form>div").eq(8).show();
						$(".d_form>div").eq(7).hide();
					}
				});
				$(".d_srmoney").on("click",function(){
					onewindow(incomelist,".d_srmoney","","input[name='income']")
				})
				/*  选择学历   */
				$(".d_xlback").on("click",function(){
					$(".d_form>div").eq(7).show();
					$(".d_form>div").eq(8).hide();
				});
				for(var i in educationallist){
					$(".d_education").append("<li>"+educationallist[i]+"</li>")
				};
				$(".d_education>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
					$("input[name='edu']").val($(this).text());
					$(".d_form>div").eq(9).show();
					$(".d_form>div").eq(8).hide();
				});
				/*  爱情宣言  */
				$(".d_xyback").on("click",function(){
					$(".d_form>div").eq(8).show();
					$(".d_form>div").eq(9).hide();
				});
				$(".d_xynext").on("click",function(){
					if($(".d_textarea").val().length<2 || $(".d_textarea").val().length>150){
						$(".d_popupbox").html("请填写您的爱情宣言(2--150个字)");setTimeout(show,500);setTimeout(hide,2000);
					}else{
						$("input[name='declaration']").val($(".d_textarea").val());
						$(".d_form>div").eq(10).show();
						$(".d_form>div").eq(9).hide();
					}
				});
				/*  选择定位  */
				$(".d_rightimg").on("click",function(){
					city(".d_location","input[name='province']","input[name='city']")
				})
				$(".d_dwback").on("click",function(){
					$(".d_form>div").eq(9).show();
					$(".d_form>div").eq(10).hide();
				});
				$(".d_dwnext").on("click",function(){
					if($("input[name='province']").val()==""){
						$(".d_popupbox").html("请选择城市");setTimeout(show,500);setTimeout(hide,2000);
					}else{
						tradeselect=1;
						$(".d_hyskip").show();
						$(".d_form>div").eq(11).show();
						$(".d_form>div").eq(10).hide();
					}
				});
				/*  选择从事的行业  */
				$(".d_hyback").on("click",function(){
					if(tradeselect==1){
						$(".d_form>div").eq(10).show();
						$(".d_form>div").eq(11).hide();
					}else if(tradeselect==2){
						$(".d_form>div").eq(11).hide();
						$(".d_formTwo>div").eq(2).show();
					}

				});
				for(var i in industrylist){
					$(".d_jobBox").append("<li>"+industrylist[i]+"</li>")
				}
				$(".d_jobBox>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
					$("input[name='industry']").val($(this).text());
					var index=$(".d_jobBox>li").index(this);
					if(tradeselect==1){
						$(".d_form>div").eq(12).show();
						$(".d_form>div").eq(11).hide();
						/*  选择从事的职业  */
						$(".d_zyback").on("click",function(){
							$(".d_form>div").eq(11).show();
							$(".d_form>div").eq(12).hide();
						});
						$(".d_proBox").empty();
						for(var i in joblist[index]){
							$(".d_proBox").append("<li>"+joblist[index][i]+"</li>")
						}
						$(".d_proBox>li").on("click",function(){
							$(this).css({"background":"#FF704F","color":"#ffffff"});
							$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
							$("input[name='job']").val($(this).text());
							$(".d_form>div").eq(13).show();
							$(".d_form>div").eq(12).hide();
						});
					}else if(tradeselect==2){
						$(".d_tradeselect>span").text($(this).text())
						$(".d_tradeselect>span").css("color","#111111")
						$(".d_form>div").eq(11).hide();
						$(".d_formTwo>div").eq(2).show();
					}
				});

				/*  是否有车  */
				$(".d_ycback").on("click",function(){
					$(".d_form>div").eq(12).show();
					$(".d_form>div").eq(13).hide();
				});
				$(".d_cars>li").on("click",function(){
					var index=$(".d_cars>li").index(this);
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
					$("input[name='car']").val(index);
					$(".d_form>div").eq(14).show();
					$(".d_form>div").eq(13).hide();
				});
				/*  是否有房  */
				$(".d_yfback").on("click",function(){
					$(".d_form>div").eq(13).show();
					$(".d_form>div").eq(14).hide();
				});
				for(var i in houselist){
					$(".d_house").append("<li title='"+i+"'>"+houselist[i]+"</li>")
				}
				$(".d_house>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
					$("input[name='house']").val($(this).attr('title'));
					$(".d_form>div").eq(15).show();
					$(".d_form>div").eq(14).hide();
				});
				/*  毕业院校  */
				$(".d_byback").on("click",function(){
					$(".d_form>div").eq(14).show();
					$(".d_form>div").eq(15).hide();
				});
				$(".d_bynext").on("click",function(){
					if($(".d_school").val()==""){
						$(".d_popupbox").html("请填写您的毕业院校");setTimeout(show,500);setTimeout(hide,2000);
					}else{
						$("input[name='school']").val($(".d_school").val());
						$(".d_form>div").eq(16).show();
						$(".d_form>div").eq(15).hide();
					}
				});
				/*  家庭背景  */
				$(".d_jtback").on("click",function(){
					$(".d_form>div").eq(15).show();
					$(".d_form>div").eq(16).hide();
				});
				for(var i in familybglist){
					$(".d_homeback").append("<li title='"+i+"'>"+familybglist[i]+"</li>")
				}
				$(".d_homeback>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
					$("input[name='familybg']").val($(this).attr('title'));
					$(".d_form>div").eq(17).show();
					$(".d_form>div").eq(16).hide();
				});
				/*  家乡  */
				$(".d_youaddr").on("click",function(){
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
								$("input[name='hometown']").val($(this).text());
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
								})
								$(".d_citytitle>p").on("click",function(){
									$(".d_youaddr").text(province+"-"+town);
									$(".d_province>li").css({"background":"#ffffff","color":"#111111"});
									$(".d_town>li").css({"background":"#ffffff","color":"#111111"});
									$(".d_youaddr").css("color","#111111");
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
				})
				$(".d_jxback").on("click",function(){
					$(".d_form>div").eq(16).show();
					$(".d_form>div").eq(17).hide();
				});
				$(".d_jxnext").on("click",function(){
					if($("input[name='hometown']").val()==""){
						$(".d_popupbox").html("请选择您的家乡");setTimeout(show,500);setTimeout(hide,2000);
					}else{
						$(".d_form>div").eq(18).show();
						$(".d_form>div").eq(17).hide();
					}
				});
				/*  饮酒史  */
				$(".d_yjback").on("click",function(){
					$(".d_form>div").eq(17).show();
					$(".d_form>div").eq(18).hide();
				});
				for(var i in drinklist){
					$(".d_drink").append("<li title='"+i+"'>"+drinklist[i]+"</li>")
				}
				$(".d_drink>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
					$("input[name='drink']").val($(this).attr('title'));
					$(".d_form>div").eq(19).show();
					$(".d_form>div").eq(18).hide();
				});
				/*  吸烟史  */
				$(".d_xiyback").on("click",function(){
					$(".d_form>div").eq(18).show();
					$(".d_form>div").eq(19).hide();
				});
				for(var i in smokinglist){
					$(".d_smoke").append("<li title='"+i+"'>"+smokinglist[i]+"</li>")
				}
				$(".d_smoke>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
					$("input[name='smoking']").val($(this).attr('title'));
					$(".d_form>div").eq(20).show();
					$(".d_form>div").eq(19).hide();
				});
				/*  宗教信仰  */
				$(".d_zjback").on("click",function(){
					$(".d_form>div").eq(19).show();
					$(".d_form>div").eq(20).hide();
				});
				for(var i in belieflist){
					$(".d_hiero").append("<li title='"+i+"'>"+belieflist[i]+"</li>")
				}
				$(".d_hiero>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
					$("input[name='belief']").val($(this).attr('title'));
					$(".d_form>div").eq(21).show();
					$(".d_form>div").eq(20).hide();
				});
				/*  饮食习惯  */
				$(".d_ysback").on("click",function(){
					$(".d_form>div").eq(20).show();
					$(".d_form>div").eq(21).hide();
				});
				for(var i in dietlist){
					$(".d_dist").append("<li title='"+i+"'>"+dietlist[i]+"</li>")
				}
				$(".d_dist>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
					$("input[name='diet']").val($(this).attr('title'));
					$(".d_form>div").eq(22).show();
					$(".d_form>div").eq(21).hide();
				});
				/*  作息时间  */
				$(".d_zxback").on("click",function(){
					$(".d_form>div").eq(21).show();
					$(".d_form>div").eq(22).hide();
				});
				for(var i in restlist){
					$(".d_workandrest").append("<li title='"+i+"'>"+restlist[i]+"</li>")
				}
				$(".d_workandrest>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
					$("input[name='rest']").val($(this).attr('title'));
					$(".d_form>div").eq(23).show();
					$(".d_form>div").eq(22).hide();
				});
				/*  宠物  */
				$(".d_cwback").on("click",function(){
					$(".d_form>div").eq(22).show();
					$(".d_form>div").eq(23).hide();
				});
				for(var i in petlist){
					$(".d_pet").append("<li title='"+i+"'>"+petlist[i]+"</li>")
				}
				$(".d_pet>li").on("click",function(){
					$(this).css({"background":"#FF704F","color":"#ffffff"});
					$(this).siblings().css({"background":"#ffffff","color":"#FF704F"});
					$("input[name='pet']").val($(this).attr('title'));
					$(".d_form>div").eq(24).show();
					$(".d_form>div").eq(23).hide();
				});
				/*  民族  */
				$(".d_mzback").on("click",function(){
					$(".d_form>div").eq(23).show();
					$(".d_form>div").eq(24).hide();
				});
				$(".d_nation").on("click",function(){
					onewindow(nationlist,".d_nation","","input[name='nation']")
				})
				$(".d_mznext").on("click",function(){
					if($("input[name='nation']").val()==""){
						$(".d_popupbox").html("请选择您的民族");setTimeout(show,500);setTimeout(hide,2000);
					}else{
						$(".d_form>div").eq(25).show();
						$(".d_form>div").eq(24).hide();
					}
				});
				/*  兴趣爱好  */
				$(".d_xqback").on("click",function(){
					$(".d_form>div").eq(24).show();
					$(".d_form>div").eq(25).hide();
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
					$("input[name='style']").val(arrxq.join(','));
				});
				$(".d_xqnext").on("click",function(){
					if(arrxq==""){
						$(".d_popupbox").html("请选择你的兴趣爱好");setTimeout(show,500);setTimeout(hide,2000);
					}else{
						$(".d_form>div").eq(26).show();
						$(".d_form>div").eq(25).hide();
					}
				});
				/*  择偶标准  */
				$(".d_zoback").on("click",function(){
					$(".d_form>div").eq(25).show();
					$(".d_form>div").eq(26).hide();
				});
				$(".d_heightselect").on("click",function(){
					heiage(120,221,121,".d_heightselect>span","cm","input[name='rq_height']");
				});
				$(".d_ageselect").on("click",function(){
					heiage(18,76,19,".d_ageselect>span","岁","input[name='rq_age']")
				});
				$(".d_income").on("click",function(){
					onewindow(rq_incomelist,".d_income>span","","input[name='rq_income']")
				});
				$(".d_bacg").on("click",function(){
					onewindow(rq_educationallist,".d_bacg>span","","input[name='rq_edu']")
				});
				/* 完善资料 */
				$(".d_cityResult").on("click",function(){
					city(".d_cityResult","input[name='province']","input[name='city']")
				})
				$(".d_zlback").on("click",function(){
					$(".d_formTwo>div").eq(2).hide();
					$(".d_form>div").eq(1).show();
				})
				$(".d_tradeselect").on("click",function(){
					tradeselect=2;
					$(".d_hyskip").hide();
					$(".d_form>div").eq(11).show();
					$(".d_formTwo>div").eq(2).hide();
				})
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
						localStorage.removeItem("wx");
						localStorage.removeItem("d_type");
						localStorage.removeItem("d_tel");
						localStorage.removeItem("d_code");
						localStorage.removeItem("d_password");
						localStorage.setItem("d_index","2");
						$("#form").submit();
					}
				})
				$(".d_phototow").on("click",function(){
					knowfrom=2;
					$(".d_fileForm>div").eq(0).show();
					$(".d_formTwo>div").eq(2).hide();
				})
				//以后再填
				$(".d_skip").on("click",function(){
					localStorage.removeItem("wx");
					localStorage.removeItem("d_type");
					localStorage.removeItem("d_tel");
					localStorage.removeItem("d_code");
					localStorage.removeItem("d_password");
					localStorage.setItem("d_index","1");
					$("#form").submit();
				});
				//保存
				$(".d_save").on("click",function(){
					localStorage.removeItem("wx");
					localStorage.removeItem("d_type");
					localStorage.removeItem("d_tel");
					localStorage.removeItem("d_code");
					localStorage.removeItem("d_password");
					localStorage.setItem("d_index","1");
					$("#form").submit();
				});
			}
		}
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
			if(knowfrom==1){
				$(".d_photo").attr("src",src)
				$("input[name='image']").val(src);
				$(".d_fileForm>div").eq(0).hide();
				$(".d_form>div").eq(3).show();
			}else if(knowfrom==2){
				$(".d_phototow").attr("src",src);
				$("input[name='image']").val(src);
				$(".d_fileForm>div").eq(0).hide();
				$(".d_formTwo>div").eq(2).show();
			}

		});
	});
	/* 定位  */
	var map, geolocation,x,y;
	if(localStorage.getItem('x')==null){
		x="108.921016";y="34.269211";
	}else{
		x=localStorage.getItem('x');y=localStorage.getItem('y');
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
	}
	//解析定位错误信息
	function onError(data) {
		x=108.940175+'';
		y=34.341568+'';
		localStorage.setItem('x',x);
		localStorage.setItem('y',y);
	}
})
