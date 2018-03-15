$(function(){
	//	点击生日
	var belieflist,childrenlist,carlist,dietflist,marrylist,drinklist,educationallist,familybglist,houselist,incomelist,industrylist,interestlist,joblist,nationlist,openxitylist,petlist,report_typelist,restlist,rq_educationallist,rq_incomelist,smokinglist,stylelist,zodialist;
	$.ajax({
		type:"get",
		url:httpwindow+"getdata",
		data:{
			
		},
		success:function(data){
			console.log(data)
			if(data.code==200){
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
				var myDate = new Date();
				var yearthis= myDate.getFullYear();  
				var monththis= myDate.getMonth();
				var daythis= myDate.getMonth();
				var chayear="";
				var chamonth="";
				var chaday="";
			//  昵称
				$(".d_nickname").on("change",function(){
					$("input[name='nickname']").val($(".d_nickname").val());
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
				$(".d_clicksr").on("click",function(){
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
							$(".d_clicksr span").text(chayear+"-"+chamonth+"-"+chaday).css("color","#111111");
							$("input[name='birthday']").val(Date.parse(new Date($(".d_changesr").text()))/1000);
							$(".d_fetedayBox").hide();
						}
					});
				})
			//	点击身高、体重
				$(".d_clickhei").on("click",function(){
					var list=[];
					for(var i=120;i<221;i++){
						list.push(i)
					}
					onepop(".d_clickhei span",list,"cm","input[name='height']","165");
					$(".d_popbottomBox ul").scrollTop(1530);
				});
				$(".d_clickwei").on("click",function(){
					var list=[];
					for(var i=30;i<151;i++){
						list.push(i)
					}
					onepop(".d_clickwei span",list,"kg","input[name='weight']","55");
					$(".d_popbottomBox ul").scrollTop(850);
				});
			//  学历-购车
				$(".d_clickedu").on("click",function(){
					onepop(".d_clickedu span",educationallist,"","input[name='edu']","本科");
				});
				$(".d_clickinc").on("click",function(){
					onepop(".d_clickinc span",incomelist,"","input[name='income']","4001-8000元");
				});
				$(".d_clickadd").on("click",function(){
					locationfun(".d_clickadd span","input[name='province']","input[name='city']");
				});
				$(".d_clickho").on("click",function(){
					onepopcopy(".d_clickho span",houselist,"","input[name='house']","");
				});
				$(".d_clickcar").on("click",function(){
					onepopcopy(".d_clickcar span",carlist,"","input[name='car']","");
				});
			//其他资料	
				$(".d_job").on("click",function(){
					jobtest(industrylist,joblist,".d_job span","input[name='industry']","input[name='job']");
				});
				$(".d_clicksch").on("change",function(){
					$("input[name='school']").val($(".d_clicksch").val());
				});
				$(".d_clickfambg").on("click",function(){
					onepopcopy(".d_clickfambg span",familybglist,"","input[name='familybg']","");
				});
				$(".d_clicknat").on("click",function(){
					onepopcopy(".d_clicknat span",nationlist,"","input[name='nation']","汉族");
				});
				$(".d_clickhome").on("click",function(){
					hometownfun(".d_clickhome span","input[name='hometown']");
				});
				$(".d_clicksm").on("click",function(){
					onepopcopy(".d_clicksm span",smokinglist,"","input[name='smoking']","");
				});
				$(".d_clickdri").on("click",function(){
					onepopcopy(".d_clickdri span",drinklist,"","input[name='drink']","");
				});
				$(".d_clickbel").on("click",function(){
					onepopcopy(".d_clickbel span",belieflist,"","input[name='belief']","");
				});
				$(".d_clickchi").on("click",function(){
					onepopcopy(".d_clickchi span",childrenlist,"","input[name='children']","没有");
				});
				$(".d_clickdiet").on("click",function(){
					onepopcopy(".d_clickdiet span",dietlist,"","input[name='diet']","");
				});
				$(".d_clickrest").on("click",function(){
					onepopcopy(".d_clickrest span",restlist,"","input[name='rest']","");
				});
				$(".d_clicklovesay").on("change",function(){
					$("input[name='declaration']").val($(".d_clicksch").val());
				});
				$(".d_clickpet").on("click",function(){
					onepopcopy(".d_clickpet span",petlist,"","input[name='pet']","");
				});
				//	兴趣爱好
				$(".d_clicklike").on("click",function(){
					$(".d_xqaihao").show();
				});
				for(var i in stylelist){
					$(".d_xqul").append("<li>"+stylelist[i]+"</li>")
				}
				$(".d_xqback").on("click",function(){
					$(".d_xqaihao").hide();
				});
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
					console.log(arrxq)
					if(arrxq==""){
						Bombbox("请选择你的兴趣爱好","1000");
					}else{
						$(".d_clicklike span").text(arrxq.join(','));
						$(".d_xqaihao").hide();
					}
				});
			//  择偶条件
				$(".d_clickzoage").on("click",function(){
					twopop("18","76","19",".d_clickzoage span","input[name='rq_age']","岁");
				});
				$(".d_clickzohei").on("click",function(){
					twopop("120","221","121",".d_clickzohei span","input[name='rq_height']","cm");
				});
				$(".d_clickzoinc").on("click",function(){
					onepop(".d_clickzoinc span",rq_incomelist,"","input[name='rq_income']","不限");
				});
				$(".d_clickzoedu").on("click",function(){
					onepop(".d_clickzoedu span",rq_educationallist,"","input[name='rq_edu']","不限");
				});
			//	点击保存
				$(".d_save").on("click",function(){
					$("#form").submit();
				})
			}
		}
	})
	
})
function jobtest(list,list2,classname,inpname1,inpname2){
	$(".d_twoPopBox").show();
	$(".d_minBox").empty();
	$(".d_maxBox").empty();
	for(var i in list){
		$(".d_minBox").append("<li>"+list[i]+"</li>");
	};
	$(".d_minBox>li").on("click",function(){
		var index=$(".d_minBox>li").index(this);
		$(this).css({"background":"#f83444","color":"#ffffff"});
		$(this).siblings().css({"background":"#ffffff","color":"#111111"});
		var inder=$(this).text();
		$(".d_maxBox").empty();
		for(var i in list2[index]){
			$(".d_maxBox").append("<li>"+list2[index][i]+"</li>")
		}
		$(".d_maxBox li").on("click",function(){
			$(this).css({"background":"#f83444","color":"#ffffff"});
			$(this).siblings().css({"background":"#ffffff","color":"#111111"});
			var job=$(this).text();
			$(".d_fetedaysure").on("click",function(){
				$(classname).text(inder+"-"+job);
				$(inpname1).val(inder);
				$(inpname2).val(job);
				$(classname).css("color","#111111")
				$(".d_twoPopBox").hide();
			})
		})
	})
	$(".d_fetedayclear").on("click",function(){
		$(".d_twoPopBox").hide();
	});
	$(".d_twoPopBox").on("click",function(){
		$(".d_twoPopBox").hide();
	});
	$(".d_twoPop").on("click",function(e){
		e.stopPropagation();
	});
}
