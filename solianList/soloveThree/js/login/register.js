$(function(){
	console.log(localStorage.getItem("d_code"))
	var belieflist,childrenlist,carlist,dietflist,marrylist,drinklist,educationallist,familybglist,houselist,incomelist,industrylist,interestlist,joblist,nationlist,openxitylist,petlist,report_typelist,restlist,rq_educationallist,rq_incomelist,smokinglist,stylelist,zodialist;
	$.ajax({
		type:"get",
		url:httpwindow+"getdata",
		data:{
			
		},
		success:function(data){
			console.log(data)
			if(data.code==200){
				$("input[name='username']").val(localStorage.getItem("d_username"));
				$("input[name='password']").val(localStorage.getItem("d_password"));
				$("input[name='code']").val(localStorage.getItem("d_code"));
				$("input[name='yqcode']").val(localStorage.getItem("d_yqcode"));
				belieflist=data.data.belief;
				carlist=data.data.car;
				childrenlist=data.data.children;
				dietlist=data.data.diet;//饮食习惯
				drinklist=data.data.drink;//喝酒
				educationallist=data.data.educational;
				familybglist=data.data.familybg;
				houselist=data.data.house;
				incomelist=data.data.income;
				industrylist=data.data.industry;//职业
				interestlist=data.data.interest;//性格
				joblist=data.data.job;
				nationlist=data.data.nation;
				openxitylist=data.data.openxity;//服务城市
				petlist=data.data.pet;
				report_typelist=data.data.report_type;//举报理由
				restlist=data.data.rest;//睡觉习惯
				rq_educationallist=data.data.rq_educational;
				rq_incomelist=data.data.rq_income;
				smokinglist=data.data.smoking;
				stylelist=data.data.style;//兴趣爱好
				zodialist=data.data.zodia;//属相
				marrylist=data.data.marry;//身份
				/* 选择身份 */
				for(var i in marrylist){
					$(".d_ul1").append("<li>"+marrylist[i]+"</li>")
				}
				$(".d_ul1 li").on("click",function(){
					$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
					var index=$(".d_ul1 li").index(this);
					$("input[name='marry']").val(index);
				});
				$(".d_sfnext").on("click",function(){
					if($("input[name='marry']").val()!=""){
						$(".d_bigBox>div").eq(0).hide();
						$(".d_bigBox>div").eq(1).show();
					}else{
						Bombbox("请选择您的身份","1000");
					}
				});
				/* 性别 */
				$(".d_sexback").on("click",function(){
					$(".d_bigBox>div").eq(0).show();
					$(".d_bigBox>div").eq(1).hide();
				});
				$(".d_ul2 li").on("click",function(){
					$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
					if($(this).text()=="男"){
						$("input[name='sex']").val("1");
					}else{
						$("input[name='sex']").val("2");
					}
				});
				$(".d_sexnext").on("click",function(){
					if($("input[name='sex']").val()!=""){
						$(".d_bigBox>div").eq(1).hide();
						$(".d_bigBox>div").eq(2).show();
					}else{
						Bombbox("选择您的性别","1000");
					}
				});
				/*  头像昵称  */
				$(".d_headback").on("click",function(){
					$(".d_bigBox>div").eq(1).show();
					$(".d_bigBox>div").eq(2).hide();
				});
				$(".d_headnext").on("click",function(){
//					if($("#previewResult").attr("src")=="../../image/icon/d_addhead.png"){
//						Bombbox("请上传您的真实头像","1000");
//					}else 
					if($(".d_nickname").val().length<2){
						Bombbox("昵称为2-7个汉字","1000");
					}else{
						$("input[name='nickname']").val($(".d_nickname").val());
						$(".d_bigBox>div").eq(2).hide();
						$(".d_bigBox>div").eq(3).show();
					}
					
				});
				/* 选择生日 */
				var myDate = new Date();
				var yearthis= myDate.getFullYear();  
				var monththis= myDate.getMonth();
				var daythis= myDate.getMonth();
				var chayear="";
				var chamonth="";
				var chaday="";
				$(".d_srback").on("click",function(){
					$(".d_bigBox>div").eq(2).show();
					$(".d_bigBox>div").eq(3).hide();
				});
				$(".d_srnext").on("click",function(){
					if($(".d_changesr").text()=="请选择"){
						Bombbox("请选择您的生日","1000");
					}else{
						$(".d_bigBox>div").eq(3).hide();
						$(".d_bigBox>div").eq(4).show();
					}
				});
				for(var i=yearthis-18;i>yearthis-75;i--){
					$(".d_year").append("<li>"+i+"</li>");
					$(".d_year>li").on("click",function(){
						$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"});
					    chayear=$(this).text();
					    $(".d_day").empty();
					    if(chamonth==2){
				    		if(chayear%4==0){
					    		for(var j=1;j<30;j++){
					    			$(".d_day").append("<li>"+j+"</li>")
					    		}
						    }else{
						    	for(var j=1;j<29;j++){
					    			$(".d_day").append("<li>"+j+"</li>")
					    		}
						    }
						    $(".d_day>li").on("click",function(){
						    	$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"});
						    	chaday=$(this).text();
						    })
				    	}else if(chamonth==1 || chamonth==3 || chamonth==5 || chamonth==7 || chamonth==8 || chamonth==10 || chamonth==12){
				    		for(var j=1;j<32;j++){
				    			$(".d_day").append("<li>"+j+"</li>")
				    		}
				    		$(".d_day>li").on("click",function(){
						    	$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"});
						    	chaday=$(this).text();
						    })
				    	}else if(chamonth==4 || chamonth==6 || chamonth==9 || chamonth==11){
				    		for(var j=1;j<31;j++){
				    			$(".d_day").append("<li>"+j+"</li>")
				    		}
				    		$(".d_day>li").on("click",function(){
						    	$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"});
						    	chaday=$(this).text();
						    })
				    	}
					})
				}
				for(var i=1;i<13;i++){
					$(".d_month").append("<li>"+i+"</li>")
					$(".d_month>li").on("click",function(){
						$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"});
					    chamonth=$(this).text();
					    console.log(chamonth)
					    $(".d_day").empty();
				    	if(chamonth==2){
				    		if(chayear%4==0){
					    		for(var j=1;j<30;j++){
					    			$(".d_day").append("<li>"+j+"</li>")
					    		}
						    }else{
						    	for(var j=1;j<29;j++){
					    			$(".d_day").append("<li>"+j+"</li>")
					    		}
						    }
						    $(".d_day>li").on("click",function(){
						    	$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"});
						    	chaday=$(this).text();
						    })
				    	}else if(chamonth==1 || chamonth==3 || chamonth==5 || chamonth==7 || chamonth==8 || chamonth==10 || chamonth==12){
				    		for(var j=1;j<32;j++){
				    			$(".d_day").append("<li>"+j+"</li>")
				    		}
				    		$(".d_day>li").on("click",function(){
						    	$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"});
						    	chaday=$(this).text();
						    })
				    	}else if(chamonth==4 || chamonth==6 || chamonth==9 || chamonth==11){
				    		for(var j=1;j<31;j++){
				    			$(".d_day").append("<li>"+j+"</li>")
				    		}
				    		$(".d_day>li").on("click",function(){
						    	$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"});
						    	chaday=$(this).text();
						    })
				    	}
					})
				};
				$(".d_changesr").on("click",function(){
					$(".d_fetedayBox").show();
					$(".d_fetedayclear").on("click",function(){
						$(".d_fetedayBox").hide();
					});
					$(".d_fetedayBox").on("click",function(){
						$(".d_fetedayBox").hide();
					});
					$(".d_feteday").on("click",function(e){
						e.stopPropagation();
					});
					$(".d_fetedaysure").on("click",function(){
						if(chayear=="" || chamonth=="" || chaday==""){
							$(".d_fetedayBox").show();
							return false;
						}else{
							$(".d_changesr").text(chayear+"-"+chamonth+"-"+chaday).css("color","#111111");
							$("input[name='birthday']").val(Date.parse(new Date($(".d_changesr").text()))/1000);
							$(".d_fetedayBox").hide();
						}
					});
				});
				/* 选择民族  */
				$(".d_changemz").on("click",function(){
					onepop(".d_changemz",nationlist,"","input[name='nation']","汉族")
				});
				$(".d_mzback").on("click",function(){
					$(".d_bigBox>div").eq(3).show();
					$(".d_bigBox>div").eq(4).hide();
				});
				$(".d_mznext").on("click",function(){
					if($(".d_changemz").text()=="请选择"){
						Bombbox("请选择您的民族","1000");
					}else{
						$(".d_bigBox>div").eq(4).hide();
						$(".d_bigBox>div").eq(5).show();
					}
				});
				/* 选择身高、体重  */
				$(".d_changehei").on("click",function(){
					var list=[];
					for(var i=120;i<221;i++){
						list.push(i)
					}
					onepop(".d_changehei",list,"cm","input[name='height']","165");
					$(".d_popbottomBox ul").scrollTop(1530);
				});
				$(".d_changewei").on("click",function(){
					var list=[];
					for(var i=30;i<151;i++){
						list.push(i)
					}
					onepop(".d_changewei",list,"kg","input[name='weight']","55");
					$(".d_popbottomBox ul").scrollTop(850);
				});
				$(".d_heiweiback").on("click",function(){
					$(".d_bigBox>div").eq(4).show();
					$(".d_bigBox>div").eq(5).hide();
				});
				$(".d_heiweinext").on("click",function(){
					if($(".d_changehei").text()=="请选择"){
						Bombbox("请选择您的身高","1000");
					}else if($(".d_changewei").text()=="请选择"){
						Bombbox("请选择您的体重","1000");
					}else{
						$(".d_bigBox>div").eq(5).hide();
						$(".d_bigBox>div").eq(6).show();
					}
				});
				/* 选择月收入  */
				$(".d_changeysr").on("click",function(){
					onepop(".d_changeysr",incomelist,"","input[name='income']","2001-4000元");
				});
				$(".d_ysrback").on("click",function(){
					$(".d_bigBox>div").eq(5).show();
					$(".d_bigBox>div").eq(6).hide();
				});
				$(".d_ysrnext").on("click",function(){
					if($(".d_changeysr").text()=="请选择"){
						Bombbox("请选择您的月收入","1000");
					}else{
						$(".d_bigBox>div").eq(6).hide();
						$(".d_bigBox>div").eq(7).show();
					}
				});
				/* 选择学历  */
				for(var i in educationallist){
					$(".d_xlul").append("<li>"+educationallist[i]+"</li>")
				}
				$(".d_xlul li").on("click",function(){
					$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#f83444"})
					$("input[name='edu']").val($(this).text())
					$(".d_bigBox>div").eq(7).hide();
					$(".d_bigBox>div").eq(8).show();
				});
				$(".d_xlback").on("click",function(){
					$(".d_bigBox>div").eq(6).show();
					$(".d_bigBox>div").eq(7).hide();
				});
				/* 定位选择 */
				$(".d_locationBox").on("click",function(){
					locationfun(".d_locationtext","input[name='province']","input[name='city']");
				})
				$(".d_dwback").on("click",function(){
					$(".d_bigBox>div").eq(7).show();
					$(".d_bigBox>div").eq(8).hide();
				});
				$(".d_dwnext").on("click",function(){
					if($(".d_locationtext").text()=="请选择"){
						Bombbox("请选择您的当前位置","1000");
					}else{
						$(".d_bigBox>div").eq(8).hide();
						$(".d_bigBox>div").eq(9).show();
					}
				});
				/* 爱情宣言 */
				$(".d_xyback").on("click",function(){
					$(".d_bigBox>div").eq(8).show();
					$(".d_bigBox>div").eq(9).hide();
				});
				$(".d_xynext").on("click",function(){
					if($(".d_textarea").val().length<2){
						Bombbox("爱情宣言为2-150个汉字","1000");
					}else{
						$("input[name='declaration']").val($(".d_textarea").val())
						$(".d_bigBox>div").eq(9).hide();
						$(".d_bigBox>div").eq(10).show();
					}
				});
				/* 子女状况 */
				$(".d_znback").on("click",function(){
					$(".d_bigBox>div").eq(9).show();
					$(".d_bigBox>div").eq(10).hide();
				});
				for(var i in childrenlist){
					$(".d_znul").append("<li>"+childrenlist[i]+"</li>")
				}
				$(".d_znul li").on("click",function(){
					$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
					var index=$(".d_znul li").index(this);
					$("input[name='children']").val(index)
					$(".d_bigBox>div").eq(10).hide();
					$(".d_bigBox>div").eq(11).show();
				});
				/* 从事行业 */
				$(".d_hyback").on("click",function(){
					$(".d_bigBox>div").eq(10).show();
					$(".d_bigBox>div").eq(11).hide();
				});
				for(var i in industrylist){
					$(".d_hyul").append("<li>"+industrylist[i]+"</li>")
				}
				var jobsub;
				$(".d_hyul li").on("click",function(){
					$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
					jobsub=$(".d_hyul li").index(this);
					$("input[name='industry']").val(jobsub);
					$(".d_bigBox>div").eq(11).hide();
					$(".d_bigBox>div").eq(12).show();
					$(".d_zyul").empty();
					for(var i in joblist[jobsub]){
						$(".d_zyul").append("<li>"+joblist[jobsub][i]+"</li>")
					}
					$(".d_zyul li").on("click",function(){
						$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
						var index=$(".d_zyul li").index(this);
						$("input[name='job']").val(index);
						$(".d_bigBox>div").eq(12).hide();
						$(".d_bigBox>div").eq(13).show();
					});
				});
				/* 选择职业 */
				$(".d_zyback").on("click",function(){
					$(".d_bigBox>div").eq(11).show();
					$(".d_bigBox>div").eq(12).hide();
				});
				/* 是否有车 */
				$(".d_carback").on("click",function(){
					$(".d_bigBox>div").eq(12).show();
					$(".d_bigBox>div").eq(13).hide();
				});
				for(var i in carlist){
					$(".d_carul").append("<li>"+carlist[i]+"</li>")
				}
				$(".d_carul li").on("click",function(){
					$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
					var index=$(".d_carul li").index(this);
					$("input[name='car']").val(index);
					$(".d_bigBox>div").eq(13).hide();
					$(".d_bigBox>div").eq(14).show();
				});
				/* 是否有房 */
				$(".d_fzback").on("click",function(){
					$(".d_bigBox>div").eq(13).show();
					$(".d_bigBox>div").eq(14).hide();
				});
				for(var i in houselist){
					$(".d_fzul").append("<li>"+houselist[i]+"</li>")
				}
				$(".d_fzul li").on("click",function(){
					$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
					var index=$(".d_fzul li").index(this);
					$("input[name='house']").val(index);
					$(".d_bigBox>div").eq(14).hide();
					$(".d_bigBox>div").eq(15).show();
				});
				/* 毕业院校 */
				$(".d_byback").on("click",function(){
					$(".d_bigBox>div").eq(14).show();
					$(".d_bigBox>div").eq(15).hide();
				});
				$(".d_bynext").on("click",function(){
					if($(".d_graduation").val().length<4){
						Bombbox("输入您的毕业院校","1000");
					}else{
						$("input[name='school']").val($(".d_graduation").val());
						$(".d_bigBox>div").eq(15).hide();
						$(".d_bigBox>div").eq(16).show();
					}
				});
				/* 家庭背景 */
				$(".d_jtback").on("click",function(){
					$(".d_bigBox>div").eq(15).show();
					$(".d_bigBox>div").eq(16).hide();
				});
				for(var i in familybglist){
					$(".d_jtul").append("<li>"+familybglist[i]+"</li>")
				}
				$(".d_jtul li").on("click",function(){
					$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
					var index=$(".d_jtul li").index(this);
					$("input[name='familybg']").val(index);
					$(".d_bigBox>div").eq(16).hide();
					$(".d_bigBox>div").eq(17).show();
				});
				/* 家乡 */
				$(".d_changejx").on("click",function(){
					hometownfun(".d_changejx","input[name='hometown']")
				});
				$(".d_jxback").on("click",function(){
					$(".d_bigBox>div").eq(16).show();
					$(".d_bigBox>div").eq(17).hide();
				});
				$(".d_jxnext").on("click",function(){
					if($(".d_changejx").text()=="请选择"){
						Bombbox("选择您的家乡","1000");
					}else{
						$(".d_bigBox>div").eq(17).hide();
						$(".d_bigBox>div").eq(18).show();
					}
				});
				/* 吸烟史 */
				$(".d_xysback").on("click",function(){
					$(".d_bigBox>div").eq(17).show();
					$(".d_bigBox>div").eq(18).hide();
				});
				for(var i in smokinglist){
					$(".d_xysul").append("<li>"+smokinglist[i]+"</li>")
				}
				$(".d_xysul li").on("click",function(){
					$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
					var index=$(".d_xysul li").index(this);
					$("input[name='smoking']").val(index);
					$(".d_bigBox>div").eq(18).hide();
					$(".d_bigBox>div").eq(19).show();
				});
				/* 饮酒史 */
				$(".d_yjback").on("click",function(){
					$(".d_bigBox>div").eq(18).show();
					$(".d_bigBox>div").eq(19).hide();
				});
				for(var i in drinklist){
					$(".d_yjul").append("<li>"+drinklist[i]+"</li>")
				}
				$(".d_yjul li").on("click",function(){
					$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
					var index=$(".d_yjul li").index(this);
					$("input[name='drink']").val(index);
					$(".d_bigBox>div").eq(19).hide();
					$(".d_bigBox>div").eq(20).show();
				});
				/* 宗教信仰 */
				$(".d_zjback").on("click",function(){
					$(".d_bigBox>div").eq(19).show();
					$(".d_bigBox>div").eq(20).hide();
				});
				for(var i in belieflist){
					$(".d_zjul").append("<li>"+belieflist[i]+"</li>")
				}
				$(".d_zjul li").on("click",function(){
					$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
					var index=$(".d_zjul li").index(this);
					$("input[name='belief']").val(index);
					$(".d_bigBox>div").eq(20).hide();
					$(".d_bigBox>div").eq(21).show();
				});
				/* 饮食习惯 */
				$(".d_ysback").on("click",function(){
					$(".d_bigBox>div").eq(20).show();
					$(".d_bigBox>div").eq(21).hide();
				});
				for(var i in dietlist){
					$(".d_ysul").append("<li>"+dietlist[i]+"</li>")
				}
				$(".d_ysul li").on("click",function(){
					$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
					var index=$(".d_ysul li").index(this);
					$("input[name='diet']").val(index);
					$(".d_bigBox>div").eq(21).hide();
					$(".d_bigBox>div").eq(22).show();
				});
				/* 作息习惯 */
				$(".d_zxback").on("click",function(){
					$(".d_bigBox>div").eq(21).show();
					$(".d_bigBox>div").eq(22).hide();
				});
				for(var i in restlist){
					$(".d_zxul").append("<li>"+restlist[i]+"</li>")
				}
				$(".d_zxul li").on("click",function(){
					$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
					var index=$(".d_zxul li").index(this);
					$("input[name='rest']").val(index);
					$(".d_bigBox>div").eq(22).hide();
					$(".d_bigBox>div").eq(23).show();
				});
				/* 宠物 */
				$(".d_cwback").on("click",function(){
					$(".d_bigBox>div").eq(22).show();
					$(".d_bigBox>div").eq(23).hide();
				});
				for(var i in petlist){
					$(".d_cwul").append("<li>"+petlist[i]+"</li>")
				}
				$(".d_cwul li").on("click",function(){
					$(this).css({"background":"#f83444","border":"none","color":"#ffffff"}).siblings().css({"background":"#ffffff","border":"solid 1px #f83444","color":"#f83444"})
					var index=$(".d_cwul li").index(this);
					$("input[name='pet']").val(index);
					$(".d_bigBox>div").eq(23).hide();
					$(".d_bigBox>div").eq(24).show();
				});
				/* 兴趣爱好 */
				$(".d_xqback").on("click",function(){
					$(".d_bigBox>div").eq(23).show();
					$(".d_bigBox>div").eq(24).hide();
				});
				for(var i in stylelist){
					$(".d_xqul").append("<li>"+stylelist[i]+"</li>")
				}
				var arrxq=[];
				$(".d_xqul>li").on("click",function(){
					if($(this).attr("title")==2){
						$(this).attr("title","1");
						$(this).css({"background":"#ffffff","color":"#f83444"});
						for(var i in arrxq){
							if(arrxq[i]==$(this).text()){
								arrxq.splice(i,1);
							}
						}
					}else{
						arrxq.push($(this).text())
						if(arrxq.length<=5){
							$(this).css({"background":"#f83444","color":"#ffffff"});
							$(this).attr("title","2");
						}else if(arrxq.length>5){
							arrxq.pop();
							Bombbox("最多选5项","1000");
						}
					}
					$("input[name='style']").val(arrxq.join(','));
				});
				$(".d_xqnext").on("click",function(){
					if(arrxq==""){
						Bombbox("请选择你的兴趣爱好","1000");
					}else{
						$(".d_bigBox>div").eq(24).hide();
						$(".d_bigBox>div").eq(25).show();
					}
				});
				/* 择偶条件 */
				$(".d_zoback").on("click",function(){
					$(".d_bigBox>div").eq(24).show();
					$(".d_bigBox>div").eq(25).hide();
				});
				$(".d_changerqage").on("click",function(){
					twopop("18","76","19",".d_changerqage","input[name='rq_age']","岁");
				});
				$(".d_changerqhei").on("click",function(){
					twopop("120","221","121",".d_changerqhei","input[name='rq_height']","cm");
				});
				$(".d_changerqic").on("click",function(){
					onepop(".d_changerqic",rq_incomelist,"","input[name='rq_income']","不限");
				});
				$(".d_changerqed").on("click",function(){
					onepop(".d_changerqed",rq_educationallist,"","input[name='rq_edu']","不限");
				});
				$(".d_zonext").on("click",function(){
					if($(".d_changerqage").text()=="请选择"){
						Bombbox("选择您的择偶年龄","1000");
					}else if($(".d_changerqhei").text()=="请选择"){
						Bombbox("选择您的择偶身高","1000");
					}else if($(".d_changerqic").text()=="请选择"){
						Bombbox("选择您的择偶工资","1000");
					}else if($(".d_changerqed").text()=="请选择"){
						Bombbox("选择您的择偶学历","1000");
					}else{
						$("#form").submit()
					}
				});
				$(".d_future").on("click",function(){
					$("#form").submit()
				});
			}
		}
	});
})
