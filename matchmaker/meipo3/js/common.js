document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
var toggle=true;//点击选择开关
function  skip(url){
     window.location.href=url;
}
//提示弹窗
function hint(text,time){
	$(".hint").show().html(text);
	setTimeout(function show(){
		$(".hint").css("display","none")
	},time);
}
function Element(arr,arr2){
    var slider=$(".slider");
    this.list=arr;
    this.arr=arr2;
    this.add=function(elementary,pop,num){
        var list=this.list;
        slider.append("<ul class='slider-ul'></ul>");
        var ul=slider.find("ul");
        var index=0;
        for(var i=0;i<this.list.length;i++){
            ul.append("<li>"+this.list[i]+"</li>");
        }
        var li=ul.find("li");
        $(".slider-ul li").click(function(){
            index=$(this).index();
            $(this).css("background","#ccc").siblings().removeAttr("style");
        })
        $(".slider-btn").click(function(){
            elementary.eq(num).text(list[index]);
            pop.css({bottom:'-6rem',transition: "all .3s linear","-webkit-transition": "all .3s linear"});slider.empty();
            toggle=true;
        });
        $(".slider-close").click(function(){
            pop.css({bottom:'-6rem',transition: "all .3s linear","-webkit-transition": "all .3s linear"});slider.empty();
            toggle=true;
        })
    };
    this.add2=function(elementary,pop,num){
        slider.append("<ul class='item-ul' ></ul><ul class='item-ul2'></ul>");
        var str=this.arr,str0=this.list;
        var index=0,index2=0,txt=str0[0],text=str[0][0];
        for(var i=0;i<str0.length;i++){
            $(".item-ul").append("<li>"+str0[i]+"</li>");
        }
        sort(index,str);
        $(".item-ul li").click(function(){
            index=$(this).index();$(".item-ul2").empty();txt=str0[index];
            $(this).css("background","#ccc").siblings().removeAttr("style");
            sort(index,str);
        });
        function sort(num,str){
            for(var i=0;i<str[num].length;i++){
                $(".item-ul2").append("<li>"+str[num][i]+"</li>");
            }
            $(".item-ul2 li").click(function(){
                text=str[index][index2];
                $(this).css("background","#ccc").siblings().removeAttr("style");
            });
        }
        $(".slider-btn").click(function(){
            elementary.eq(num).text(txt+"  "+text);
            pop.css({bottom:'-6rem',transition: "all .3s linear","-webkit-transition": "all .3s linear"});slider.empty();
            toggle=true;
        });
        $(".slider-close").click(function(){
            pop.css({bottom:'-6rem',transition: "all .3s linear","-webkit-transition": "all .3s linear"});slider.empty();
            toggle=true;
        })
    };
}
//时间戳
function add0(m) {
    return m < 10 ? '0' + m : m
}
function format(timer) {
    var time = new Date(timer * 1000);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    // var times = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    var times = y +'年' + add0(m) + '月' + add0(d) + '日 ';
    return times
}
