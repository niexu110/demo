/**
 * Created by Administrator on 2017/6/16.
 */
 require(["jqy","md5"],function(){
     var stop=false, btn=false;

     $("input").blur(function(){
           blur($(this))
     })
     $(".forget").click(function(){
         $("#formData").show();
         $("#loginForm").hide();
     });
    $("#loginBtn").click(function(){
        var data={};
            if($("[name='phone']").val()==""||$("[name='psd']").val()==""){
                $(".hint").show();$(".hint").text("请填写用户或密码");
            }else{
                data.username=$("[name='phone']").val();
                data.password=$("[name='psd']").val();
                data.token=MD5( data.username+data.password+SL);
                 $.ajax({
                     url: "https://m.qinyikou.cc//index.php/Home/Index/phone",
                     type: 'POST',
                     dataType: "jsonp",
                     jsonp:"callback",
                     jsonpCallback:"data",
                     data:data,
                     success: function(res) {
                        var data=JSON.stringify(res);
                        console.log(res[0]);
                     },
                     error: function (err,xhr,a) {
                         $(".hint").show();$(".hint").text("浏览器版本过低登陆不了");
                         console.log(JSON.stringify(err));
                         console.log(JSON.stringify(xhr));
                     }
                 });
            }
    })
     function blur(obj){
         var inT=obj;
         var  tel = /^1[3|5|8|7][0-9]{9}$/;
         var psd=/^[a-zA-Z]\w{6,18}$/;
         if(inT.attr("name")==="phone"){
             if(inT.val()===""||!tel.test(inT.val())){
                 $(".hint").show();$(".hint").text("请输入正确的手机号");
             }else{$(".hint").hide();}
         }else if(inT.attr("name")==="retrievePhone"){
             if(inT.val()===""||!tel.test(inT.val())){
                 $(".hint").show();$(".hint").text("请输入正确的手机号"); stop=false;
             }else{$(".hint").hide();stop=true;}
         }else if(inT.attr("name")==="retrieveCode"){
             if(inT.val()!=code||inT.val()===""){
                 $(".hint").show();$(".hint").text("验证码输入有误");
             }else{$(".hint").hide();}
         }else if(inT.attr("name")==="retrievePsd"){
             if(inT.val()===""||!psd.test(inT.val())){
                 $(".hint").show();$(".hint").text("密码6到18位且开头必须为字母");
             }else{$(".hint").hide(); }
         }else if(inT.attr("name")==="password"){
             if(inT.val()===""||!psd.test(inT.val())){
                 $(".hint").show();$(".hint").text("密码6到18位且开头必须为字母");
             }else{$(".hint").hide();}
         }else if(inT.attr("name")==="psd"){
             if(inT.val()===""){
                 $(".hint").show();$(".hint").text("请输入密码");
             }else{$(".hint").hide();}
         }
     }
 })

