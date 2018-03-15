var year=new Date().getFullYear();
var userList={city:"",sex:"1",nickname:"",age:"",birthday:"",constellation:"",d_height:"",d_marry:"",d_income:""};
if(localStorage.getItem("upImg")==null){
    $("#IMGUp").click(function(){
        location.href="upLoad.html";
    })
}else{
    $("#IMGUp").attr("src",localStorage.getItem("upImg"));
    $("#IMGUp").click(function(){
        location.href="upLoad.html";
    })
}
$(function(){
	d_http='https://m.qinyikou.cc/';
	for(var i=140;i<211;i++){
    	$(".d_height").append("<li title='"+i+"'>"+i+"</li>")
   	}
	$(".d_youheight").on("click",function(){
		$(".d_box").show();$(".d_height").show();$(".d_marry").hide();$(".d_income").hide();
		$(".d_height li").on("click",function(){
			userList.d_height=$(this).attr("title")
			$("#d_inp5").val($(this).attr("title")+"cm")
			$(".d_height").hide();$(".d_box").hide();
		})
	});
	$(".d_box").on("click",function(){
		$(".d_box").hide();$(".d_height").hide();$(".d_marry").hide();$(".d_income").hide();
	})
	$.ajax({
		type:"get",
		url:d_http+"index.php/Home/Soubrette/search",
		success:function(data){
			for(var i in data.data.data.income){
		    	$(".d_income").append("<li name='"+i+"' title='"+data.data.data.income[i]+"'>"+data.data.data.income[i]+"</li>")
		   	};
			for(var i in data.data.data.marry){
		    	$(".d_marry").append("<li name='"+i+"' title='"+data.data.data.marry[i]+"'>"+data.data.data.marry[i]+"</li>")
		   	};
			
			$(".d_youmarry").on("click",function(){
				$(".d_box").show();$(".d_marry").show();
				$(".d_marry li").on("click",function(){
					userList.d_marry=Number($(this).attr("name"))+1;
					$("#d_inp6").val($(this).attr("title"))
					$(".d_marry").hide();$(".d_box").hide();
				})
				
			});
			$(".d_youincome").on("click",function(){
				$(".d_box").show();$(".d_income").show();
				$(".d_income li").on("click",function(){
					userList.d_income=Number($(this).attr("name"))+1;
					$("#d_inp7").val($(this).attr("title"))
					$(".d_income").hide();$(".d_box").hide();
				})
				
			});
		}
	});
	
})
$(function(ss, doc) {
    ss.init();
    ss.ready(function() {
        var cityPicker = new ss.PopPicker({
            layer: 2
        });
        cityPicker.setData(cityData);
        var showCityPickerButton = doc.getElementById('showCityPicker');
        var cityResult = doc.getElementById('cityResult');
        showCityPickerButton.addEventListener('tap', function(event) {
            cityPicker.show(function(items) {
                cityResult.innerText = items[0].text + "-" + items[1].text;
                userList.city=items[0].text + "-" + items[1].text;
            });
        }, false);
    });

}(mui, document));
$(".act").click(function(){ localStorage.removeItem("upImg")});
var that=$(".bomb");
$("#user").blur(function(){
    userList.nickname=$("#user").val();
})
$("#select").change(function(){
    userList.sex=$("#select").val();
})
$("#dates").blur(function(){
    var date=$("#dates").val();
    var str=date;
    $(".prefectData>em").text(date);
    date=date.split("-");
    if(year-date[0]>=18&&year-date[0]<66){
        userList.age=year-date[0];
        userList.birthday=Date.parse(new Date(str))/1000;
        userList.constellation=getAstro(date[1],date[2]);
    }else{
        fadeTagle(that,"年龄必须18岁以上","../../img/icon/h_bombClose.png")
    }
    function getAstro(m,d){
        return m-(d<"102223444433".charAt(m-1)- -19);
    }
})
$("#btns").click(function(){
    if(userList.nickname===""){
       fadeTagle(that,"填写昵称","../../img/icon/h_bombClose.png")
    } else if(userList.birthday===""||userList.constellation===""||userList.age===""){
        fadeTagle(that,"未满18岁不能注册","../../img/icon/h_bombClose.png")
    }else if(userList.city===""){
        fadeTagle(that,"请选择城市","../../img/icon/h_bombClose.png")
    }else if(userList.d_height===""){
        fadeTagle(that,"请选择身高","../../img/icon/h_bombClose.png")
    }else if(userList.d_marry===""){
        fadeTagle(that,"请选择身份","../../img/icon/h_bombClose.png")
    }else if(userList.d_income===""){
        fadeTagle(that,"请选择收入","../../img/icon/h_bombClose.png")
    }else{
        userList =JSON.stringify(userList);
        localStorage.setItem('list',userList);
        setTimeout(function(){
            location.href="register.html";
        },1000)
    }
})



