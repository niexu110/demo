/**
 * Created by Administrator on 2017/11/8.
 */
$(function(){
    var h=window.screen.height;
    $(".pop-table").height(h);
    var mp3=document.getElementById("mp3");
    var mp=document.getElementById("mp");
         var counterNum=["1","2","3","4","5","6","7","8","9","删除","=","关闭"],isOpen=true,num=0,ageM=0,ageM2=0,total=900,isOk=false;
     //     for(var i=0;i<counterNum.length;i++){
     //         var html="<span title="+(i+1)+">"+counterNum[i]+"</span>";
     //         $(".content").append(html);
     //     }
     //     $(".content span").click(function(){
     //         console.log($(this).text())
     // });
    var text="中国现在平均年龄是75岁,不吹不黑整整900个月.不算什么意外，生病等,接下来这个测试用一张表就可以直观的看到你已过了多久,赶快查看吧！",o=0;
    function typing(){
        var div=document.getElementById("text");
        if(o<=text.length){div.innerHTML=text.slice(0, o++) + '|';
            setTimeout(typing,200)
        }
        else{div.innerHTML=text;
            mp.pause();
        setTimeout(function(){
            $("#box").css("display","none");
        },1500)}
    }
    mp.play();
typing();
    for(var j=20;j<68;j++){
        var txt="<em title="+j+">"+j+"岁</em>";
        $(".content-2").append(txt);
    };

    $(".itemList").click(function(){
        if(isOpen){
            isOpen=false;
            num=$(this).index();
            $(".pop").css({bottom:'0',transition: "all .3s linear","-webkit-transition": "all .3s linear"})
        }
    });
    $(".content-2 em").click(function(){
        if(num==1){
            ageM=parseInt($(this).attr("title"))*12;
            $(".total").eq(num-1).html(ageM);
            $(".age").eq(num-1).text("你今年"+$(this).text()).css("color","#111");
        }else{
            ageM2=parseInt($(this).attr("title"))*12;
            $(".total").eq(num-1).html(ageM2);
            $(".age").eq(num-1).text("父母今年"+$(this).text()).css("color","#111");
        }
        isOpen=true; $(".pop").css({bottom:'-6rem',transition: "all .3s linear","-webkit-transition": "all .3s linear"});
    });
    $(".btn").click(function(){
        if(ageM==0||ageM2==0){
            alert("选择年龄");
        }else{
            mp3.play();
            for(var k=1;k<=total;k++){
                var tst="<span class='span'>"+k+"</span>";
                $(".pop-item-box").append(tst);
                if(k==total){fn(ageM,total);}
            };
            $(".pop-table").css({right:'0',transition: "all .5s linear","-webkit-transition": "all .5s linear"});
        }
    });
    $(".close").click(function(){
        if(isOk){
            mp3.pause();
            mp3.src="mp.mp3";
            ageM=0;ageM2=0;
            isOk=false;
            $(".pop-item-box").html("");
            $(".pop-table").css({right:'-7.5rem',transition: "all .5s linear","-webkit-transition": "all .5s linear"});
        }

    });
    function fn(age,total){
        if(age<=total){
            var i=0;
            var timer=setInterval(function(){
                $(".span").eq(i).append("<i></i>");
                i++;
                if(i==age){
                    clearInterval(timer);
                    setTimeout(function(){
                        var H5Top=parseInt($('.pullUp').offset().top);
                        $(".pop-box").scrollTop(H5Top);
                    },1000)

                    fn2(ageM2,total);
                }
            },100)
        }
    }
    function fn2(age,total){
       if(age<=total){
           var timer=setInterval(function(){
               $(".span").eq(total).append("<em></em>");
               total--;
               if(age==total){
                   clearInterval(timer);
                   isOk=true;
               }
           },100)
       }
    }
})
