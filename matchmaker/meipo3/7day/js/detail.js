$(function(){
     var phone = /^1[3|5|8|7][0-9]{9}$/,
          psd = /^([!-~]){6,18}$/, intP = false, intPsd = false;
     var data = new Object();
     $(".close").click(function(){
          $(".pop-login").fadeOut(200)
          data={};
     });
     $(".detailBtn").click(function(){
          var type=$(this).attr("title");//是否登陆 0未登录 
          var staus = $(this).attr("data-type");//是否缴费1已缴费
        
          if(type==0){
               $(".pop-login").fadeIn(200)
          }else{
               if(staus==0){
                    skip("seven-fund.html")
               }else{
                    skip("success.html") 
               }
               
          }
     })
     $(".intP").blur(function () {
          if (!phone.test($(this).val())) {
               hint("手机格式有误", 2000); $(".showImg").hide(); intP = false;
               $(".loginBtn").removeAttr("style");
          } else {
               $(".showImg").show(); intP = true;
               data.phone = $(this).val();
               if (intP && intPsd) {
                    $(".loginBtn").css({ background: "#ff704f", color: "#ffcdc5" })
               }
          }
     });
     $(".intPsd").blur(function () {
          if (!psd.test($(this).val())) {
               hint("密码6-18位", 2000); intPsd = false;
               $(".loginBtn").removeAttr("style");
          } else {
               intPsd = true;
               data.password = $(this).val();
               if (intP && intPsd) {
                    $(".loginBtn").css({ background: "#ff704f", color: "#ffcdc5" })
               }
          }
     });
     $(".loginBtn").click(function () {
          if (intP && intPsd) {
               console.log(data)
               // $(".pop-login").hide();
               // $(".big").attr("title", 1);
               // $.ajax({
               //     type:"POST",
               //     url:"",
               //     data:data,
               //     success:function(res){
               //         console.log(res)
               //     }
               // })
          } else {
               hint("登录信息填写有误", 2000);
          }
     })
})