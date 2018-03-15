/**
 * Created by Administrator on 2017/7/17.
 */
$(function(){
       var isOpen=false;
       var time=60;
        var reg = /^1[3|5|8|7][0-9]{9}$/;
        $(".phoneInt").blur(function(){
            if(reg.test($(this).val())){
                $(".phoneSuc").show();
                isOpen=true;
            }else{
                $(".phoneSuc").hide();
                isOpen=false;
            }
        });
        $("#codeBtn").click(function(){
             if(isOpen){
                 isOpen=false;
                 var timer=setInterval(function(){
                     time--;
                        if(time<=0){
                            time=60;  clearInterval(timer);   isOpen=true;
                            $("#codeBtn").text("发送验证码").removeAttr("style");
                        }else{
                            $("#codeBtn").text(time+" s").css({color:"#FF7C5D",border:"1px solid #FF7C5D",padding:".1rem .4rem"});
                        }
                 },1000)
             }
        })

});
