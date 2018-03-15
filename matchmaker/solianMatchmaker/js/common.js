document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
var d_Http="https://mpq.solian.cc/";
var locationStart=localStorage.getItem("start");//判断是跳转单身团还是 推荐
var toggle=true;
//点击跳转链接
function  skip(url){
     window.location.href=url;
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


