$(function(){
     var phone = /^1[3|5|8|7][0-9]{9}$/,
         intN=false,intP=false;
     var  data=new Object();
     $(".intN").blur(function(){
          if ($(this).val()==""){
               hint("请填写姓名", 2000);
          }else{
               intN=true;data.user=$(this).val()  
          }
     });
     $(".intP").blur(function () {
          if (!phone.test($(this).val())) {
               hint("手机格式有误", 2000);  intP = false;
          } else {
                intP = true;
               data.phone = $(this).val();
          }
     });
     $(".fundBtn").click(function(){
          if (intN&&intP){
               console.log(data);
               // 发送ajax成功去支付
               //    skip("success.html")  

          }else{
               hint("请检查信息是否完整", 2000);
            
          }
     })
})