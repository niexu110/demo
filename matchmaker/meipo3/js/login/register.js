/**
 * Created by Administrator on 2017/11/1.
 */
$(function(){
    var phone=/^1[3|5|8|7][0-9]{9}$/,
        psd=/^([!-~]){6,18}$/,intP=false,
        intPsd=false,intC=false,code=1245,time=60;
    var data=new  Object();
     data.proCode=110000; data.cityCode=110100;
    var map = new AMap.Map("map", {
        resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            buttonOffset: new AMap.Pixel(10, 20),
            zoomToAccuracy: true
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', function(res){
            var code=res.addressComponent.adcode;
            data.proCode=code.substring(0,2)+"0000";
            data.cityCode=code.substring(0,4)+"00";


        });//返回定位信息
        AMap.event.addListener(geolocation, 'error', function(res){
            data.proCode=110000;
            data.cityCode=110100;
        });      //返回定位出错信息
    });
    $(".intP").blur(function(){
        if(!phone.test($(this).val())){
            hint("手机格式有误",2000); $(".showImg").hide();intP=false;
            $(".registerBtn").removeAttr("style");
        }else{
            $(".showImg").show();intP=true;
            data.phone=$(this).val();intC=true;
            if(intP&&intPsd&&parseInt($(".intC").val())===code){
                $(".registerBtn").css({background:"#ff704f",color:"#ffcdc5"})
            }
        }
    });
    $(".code").click(function(){
         if(intC){
            intC=false;
            // 发送ajax
             $.ajax({})
             var timer=setInterval(function(){
                 time--;
                 if(time<=0){
                     time=60;
                     clearInterval(timer);
                     intC=true;$(".code").text("再次发送").removeAttr("style");
                 }else{
                     $(".code").text(time+"s").css({color:"#999",border:"1px solid #999"});
                 }
             },1000)
         }
    });
    $(".intC").blur(function(){
        if(parseInt($(this).val())!==code){
            hint("验证码有误",2000);intP=false;
            $(".registerBtn").removeAttr("style");
        }else{
            intP=true;
            data.code=$(this).val();
            if(intP&&intPsd&&parseInt($(".intC").val())===code){
                $(".registerBtn").css({background:"#ff704f",color:"#ffcdc5"})
            }
        }
    });
    $(".intPsd").blur(function(){
        if(!psd.test($(this).val())){
            hint("密码6-18位",2000);intPsd=false;
            $(".registerBtn").removeAttr("style");$(".showImage").hide();
        }else{
            intPsd=true;$(".showImage").show();
            data.password=$(this).val();
            if(intP&&intPsd&&parseInt($(".intC").val())===code){
                $(".registerBtn").css({background:"#ff704f",color:"#ffcdc5"})
            }
        }
    });
    $(".registerBtn").click(function(){
        console.log(data)
        if(intP&&intPsd&&parseInt($(".intC").val())===code){
            console.log(data)
            // $.ajax({
            //     type:"POST",
            //     url:"",
            //     data:data,
            //     success:function(res){
            //         console.log(res)
            //     }
            // })
        }else{
            hint("请完善登陆信息",2000);
        }
    })
})