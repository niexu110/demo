window.onload=function(){
    var that=$(".bomb");
    var obj=JSON.parse(localStorage.getItem('list'));
    //获取验证码;
    var stop=true, reg = /^1[3|5|8|7][0-9]{9}$/,count=60,code=null,url=null;
    $('.code').click(function(){
        if(stop){
            stop=false;
            var timer=setInterval(function(){
                count--;
                if(count<=0){
                    count=60;
                    clearInterval(timer);
                    $('.code').html('重新获取');
                    stop=true;
                }else{
                    $('.code').html(count+'秒后再获取');
                }
            },1000);
            if($('#userPhone').val()==''){
                fadeTagle(that,"手机号码不能为空","../../img/icon/h_bombClose.png");
                clearInterval(timer);
                stop=true;
            }else{
                url=d_http+'index.php/Home/Index/phone';
                var data={tel:$('#userPhone').val(),token:MD5(SL)};
               _ajax.getAjax(url,data,"POST",function(data){
                        if(data.code==200){
                            code=data.data.code;
                            stop=true;
                        }else{
                            fadeTagle(that,data.massage,"../../img/icon/h_bombClose.png");
                            clearInterval(timer);
                            $('.code').html('获取验证码');
                            stop=true;
                        }
                    });
            }
        }
    });
    // 失去焦点函数
    function inputBlur(obj){
        if(obj.val()==''){
            if(obj.attr('id')=='userPhone'){
                fadeTagle(that,"手机号码不能为空","../../img/icon/h_bombClose.png");
                return;
            }
            if(obj.attr('id')=='userCode'){
                fadeTagle(that,"密码不能为空","../../img/icon/h_bombClose.png");
                return;
            }
            if(obj.attr('id')=='modifyCode'){
                fadeTagle(that,"验证码不能为空","../../img/icon/h_bombClose.png");
                return;
            }
        }else{
            if(obj.attr('id')=='userPhone'){
                if(!reg.test(obj.val())){
                    fadeTagle(that,"手机号格式不对","../../img/icon/h_bombClose.png");
                }
            }
            if(obj.attr('id')=='userCode'){
                if(obj.val().length<6 || obj.val().length>18){
                    fadeTagle(that,"密码输入有误","../../img/icon/h_bombClose.png");
                    return;
                }
            }
            if(obj.attr('id')=='modifyCode'){
                if(obj.val()!=code){
                    fadeTagle(that,"验证码输入有误","../../img/icon/h_bombClose.png");
                    return;
                }
            }
        }
    }
    $('input').on('blur',function(){
        inputBlur($(this));
    });

    // 提交表单
    $('#submitBtn').click(function(){
        url=d_http+"index.php/Home/Index/register";
       if($("[name='phone']").val()=="" &&$("[name='modifycode']").val()=="" &&$("[name='password']").val()==""){
           fadeTagle(that,"信息填写不完整","../../img/icon/h_bombClose.png");
       }else{
           obj.member=$("[name='phone']").val();obj.code=$("[name='modifycode']").val();obj.password=$("[name='password']").val();
           obj.token=MD5($("[name='phone']").val()+$("[name='password']").val()+SL);
           _ajax.getAjax(url,obj,"POST", function(data){
               console.log(obj)
               console.log(obj);
                   if(data.code==404){
                       fadeTagle(that,data.massage,"../../img/icon/h_bombClose.png");
                   }else if(data.code==200){
                       $.ajax({
                           type:"POST",
                           url:d_http+"index.php/Home/Hx/registerImUser",
                           data:{
                               username:data.data,
                               password:111111,
                               nickname:obj.nickname
                           },
                           success:function(data){
                               localStorage.removeItem("list");
                               localStorage.setItem("uid",data.data);
                               location.href="../../index.html"
                           }
                       })
                   }
               }
           )
       }
    });
}
