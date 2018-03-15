function locationfun(classname,inputclass1,inputclass2){
	var d_province,d_city;
	$(".d_locationpopBox").show();
	$(".d_province").show().css("width","50%");
	$(".d_city").show();
	$.ajax({
		type:"GET",
		url:"../../city.json",
		dataType:"json",
		success:function(data){
			console.log(data)
			$(".d_province").empty();
			for(var i in data.citylist){
				$(".d_province").append("<li>"+data.citylist[i].name+"</li>")
			}
			$(".d_province li").on("click",function(){
				$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"});
				d_province=$(this).text();
				var index=$(".d_province li").index(this)
				$(".d_city").empty();
				for(var i in data.citylist[index].city){
					$(".d_city").append("<li>"+data.citylist[index].city[i].name+"</li>")
				}
				d_city=data.citylist[index].city[0].name
				$(".d_city li").on("click",function(){
					$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"});
					d_city=$(this).text();
				})
				$(".d_fetedaysure").on("click",function(){
					$(classname).text(d_province+"-"+d_city);
					$(inputclass1).val(d_province);
					$(inputclass2).val(d_city);
					$(".d_locationpopBox").hide();
				});
			})
		}
	})
	$(".d_fetedayclear").on("click",function(){
		$(".d_locationpopBox").hide();
	});
	$(".d_locationpopBox").on("click",function(){
		$(".d_locationpopBox").hide();
	});
	$(".d_addressBox").on("click",function(e){
		e.stopPropagation();
	});
}
function hometownfun(classname,inpname){
	var d_province;
	$(".d_province").show().css("width","100%");
	$(".d_city").hide();
	$(".d_locationpopBox").show();
	$.ajax({
		type:"GET",
		url:"../../city.json",
		dataType:"json",
		success:function(data){
			$(".d_province").empty();
			for(var i in data.citylist){
				$(".d_province").append("<li>"+data.citylist[i].name+"</li>")
			}
			$(".d_province li").on("click",function(){
				$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"});
				d_province=$(this).text();
				$(".d_fetedaysure").on("click",function(){
					$(classname).text(d_province);
					$(inpname).val(d_province)
					$(classname).css("color","#111111")
					$(".d_locationpopBox").hide();
				});
			})
		}
	})
	$(".d_fetedayclear").on("click",function(){
		$(".d_locationpopBox").hide();
	});
	$(".d_locationpopBox").on("click",function(){
		$(".d_locationpopBox").hide();
	});
	$(".d_addressBox").on("click",function(e){
		e.stopPropagation();
	});
}
function onepop(classname,list,unit,inputclass,num){
	$(".d_popbottomBox ul").empty();
	$(".d_popbottomBox").show();
	$(".d_popbottomBox").on("click",function(){
		$(".d_popbottomBox").hide();
	});
	$(".d_popbottom").on("click",function(e){
		e.stopPropagation();
	});
	for(var i in list){
		$(".d_popbottomBox ul").append("<li>"+list[i]+"</li>");
		if(num==list[i]){
			$(".d_popbottomBox li").eq(i).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"})
			$(".d_fetedaysure").on("click",function(){
				$(classname).text(num+unit);
				$(inputclass).val(num)
				$(classname).css("color","#111111")
				$(".d_popbottomBox").hide();
			});
		}
	}
	$(".d_popbottomBox li").on("click",function(){
		$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"})
		var texvalue=$(this).text()
		$(".d_fetedaysure").on("click",function(){
			$(classname).text(texvalue+unit);
			$(inputclass).val(texvalue)
			$(classname).css("color","#111111")
			$(".d_popbottomBox").hide();
		});
	})
	$(".d_fetedayclear").on("click",function(){
		$(".d_popbottomBox").hide();
	});
}
function onepopcopy(classname,list,unit,inputclass,num){
	$(".d_popbottomBox ul").empty();
	$(".d_popbottomBox").show();
	$(".d_popbottomBox").on("click",function(){
		$(".d_popbottomBox").hide();
	});
	$(".d_popbottom").on("click",function(e){
		e.stopPropagation();
	});
	for(var i in list){
		$(".d_popbottomBox ul").append("<li>"+list[i]+"</li>");
		if(num==list[i]){
			$(".d_popbottomBox li").eq(i).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"})
			$(".d_fetedaysure").on("click",function(){
				$(classname).text(num+unit);
				$(inputclass).val(i)
				$(classname).css("color","#111111")
				$(".d_popbottomBox").hide();
			});
		}
	}
	$(".d_popbottomBox li").on("click",function(){
		$(this).css({"background":"#f83444","color":"#ffffff"}).siblings().css({"background":"#ffffff","color":"#666666"})
		var texvalue=$(this).text()
		var index=$(".d_popbottomBox li").index(this);
		$(".d_fetedaysure").on("click",function(){
			$(classname).text(texvalue+unit);
			$(inputclass).val(index)
			$(classname).css("color","#111111")
			$(".d_popbottomBox").hide();
		});
	})
	$(".d_fetedayclear").on("click",function(){
		$(".d_popbottomBox").hide();
	});
}
function twopop(star,end,startwo,classname,inpname,unit){
	$(".d_twoPopBox").show();
	$(".d_minBox").empty();
	$(".d_maxBox").empty();
	$(".d_minBox").append("<li>不限</li>");
	$(".d_minBox li").eq(0).css({"background":"#f83444","color":"#ffffff"});
	for(var i=star;i<end;i++){
		$(".d_minBox").append("<li>"+i+"</li>")
	};
	for(var i=startwo;i<end;i++){
		$(".d_maxBox").append("<li>"+i+"</li>")
	};
	var heightstr="不限";
	if(heightstr=="不限"){
		$(".d_fetedaysure").on("click",function(){
			$(classname).text(heightstr);
			$(inpname).val(heightstr);
			$(classname).css("color","#111111")
			$(".d_twoPopBox").hide();
		})
	}
	$(".d_minBox>li").on("click",function(){
		heightstr=$(this).text();
		var heightend="";
		$(this).css({"background":"#f83444","color":"#ffffff"});
		$(this).siblings().css({"background":"#ffffff","color":"#111111"});
		$(".d_maxBox").empty();
		for(var i=Number(heightstr)+1;i<end;i++){
			$(".d_maxBox").append("<li>"+i+"</li>")
		}
		if(heightstr=="不限"){
			$(".d_fetedaysure").on("click",function(){
				$(classname).text(heightstr);
				$(inpname).val(heightstr);
				$(classname).css("color","#111111")
				$(".d_twoPopBox").hide();
			})
		}else{
			$(".d_maxBox>li").on("click",function(){
				heightend=$(this).text();
				$(this).css({"background":"#f83444","color":"#ffffff"});
				$(this).siblings().css({"background":"#ffffff","color":"#111111"});
				$(".d_fetedaysure").on("click",function(){
					$(classname).text(heightstr+unit+"-"+heightend+unit);
					$(inpname).val(heightstr+"-"+heightend);
					$(classname).css("color","#111111")
					$(".d_twoPopBox").hide();
				})
			})
		}
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
function Bombbox(text,time){
	$(".d_popupbox").show().html(text);
	setTimeout(function show(){
		$(".d_popupbox").css("display","none")
	},time);
}