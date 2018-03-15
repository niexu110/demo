/**
 * Created by Administrator on 2017/8/24.
 */
$(function(){
    var tell= /^1[3|5|8|7][0-9]{9}$/,isOpen=false,code=0,time=60,number=1,phone=0;
    var tote=Number($(".tote").text());
    $(".num").text(number);
    //验证手机格式
    $(".phoneInt").blur(function(){
        if(tell.test($(this).val())){
            isOpen=true;
            phone=$(this).val();
        }else{
            isOpen=false;
            show("手机格式有误");
        }
    });
    //发送验证码
    $(".codeBtn").click(function(){
        if(isOpen){
            isOpen=false;
            //发送ajax获取code
            var timer=setInterval(function(){
                time--;
                if(time<=0){
                    time=60;
                    clearInterval(timer);
                    isOpen=true;
                    $(".codeBtn").text("发送验证");
                }else{
                    $(".codeBtn").text(time+" s");
                }
            },1000)
        }
    });
    //验证码失焦
    $(".codeInt").blur(function(){
        if(code==$(this).val()){
            return;
        }else{
            show("验证码输入有误");
        }
    });
    //票数-
    $(".left-num").click(function(){
          number--;
        if(number<1){
              number=1;
        }
        $(".num").text(number);
    });
    $(".right-num").click(function(){
         number++;
        $(".num").text(number);
    });
    $(".ticketBtn").click(function(){
      var start = $(this).attr("data-follow");
      if(start==0){
          $(".pop").show();
      }else{
        if(tote<number){
            show("余票不足");
        }else{
            if(number>5){
                show("最多购买5张");
            }else{
                if(tell.test(phone)&&code==$(".codeInt").val()){
                    //发送 ajax
                    console.log(number,phone,code);
                    console.log($(".phoneInt").val());
                    console.log($(".codeInt").val());
                    //购买成功后跳转
                    location.href="success.html"
                }else{
                    show("手机或验证码有误");
                }
            }
        }
      }
    });
    function show(text){
        $(".showStart").show().text(text);
        setTimeout(function(){
            $(".showStart").hide()
        },3000)
    }
});
