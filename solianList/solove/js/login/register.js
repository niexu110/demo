window.onload=function(){
    function showError(){
        setTimeout(function(){
            $('.error').html('').hide();
        },1500);
    }
    var obj=JSON.parse(localStorage.getItem('list'));
    //获取验证码
    var code='';
    var stop=true;
    var reg = /^1[3|5|8|7][0-9]{9}$/;
    var count=60;
    $(".back").click(function(){localStorage.removeItem("list");localStorage.removeItem("upImg");})
    $('.code').click(function(){
        if(stop){
            stop=false;
            var timer=setInterval(function(){
                count--;
                if(count<=0){
                    count=60;
                    clearInterval(timer);
                    $('.code').html('重新获取');
                    $('.code').removeAttr("style");
                    stop=true;
                }else{
                    $('.code').html(count+'秒后再获取');
                }
            },1000);
            if($('#userPhone').val()==''){
                $('.error').html('手机号为空').show();
                clearInterval(timer);
                setTimeout(function(){
                    $('.error').html('').hide();
                    stop=true;
                },1500);
            }else{
                $.ajax({
                    type:'post',
                    url:d_http+'index.php/Home/Index/phone',
                    data:{
                        tel:$('#userPhone').val(),
                        token:MD5(SL)
                    },
                    success:function(data){
                        console.log(data)
                        if(data.code==200){
                            code=data.data.code;
                            stop=true;
                        }else{
                            $('.error').html(data.massage).show();
                            showError();
                            clearInterval(timer);
                            $('.code').html('获取验证码');
                            stop=true;
                        }
                    }
                });
            }
        }
    });
    // 失去焦点函数
    function inputBlur(obj){
        if(obj.val()==''){
            if(obj.attr('id')=='userPhone'){
                $('.error').html('手机号不能为空。').show();
                showError();
                return;
            }
            if(obj.attr('id')=='userCode'){
                $('.error').html('密码不能为空。').show();
                showError();
                return;
            }
            if(obj.attr('id')=='modifyCode'){
                $('.error').html('验证码不能为空。').show();
                showError();
                return;
            }
        }else{
            if(obj.attr('id')=='userPhone'){
                if(!reg.test(obj.val())){
                    $('.error').html('手机号输入有误。').show();
                    showError();
                }
            }
            if(obj.attr('id')=='userCode'){
                if(obj.val().length<6 || obj.val().length>18){
                    $('.error').html('密码输入有误。').show();
                    showError();
                    return;
                }
            }
            if(obj.attr('id')=='modifyCode'){
                if(obj.val()!=code){
                    $('.error').html('验证码输入有误。').show();
                    showError();
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
       if($("[name='phone']").val()=="" &&$("[name='modifycode']").val()=="" &&$("[name='password']").val()==""){
           $('.error').html('信息填写不完整').show();
           showError();
       }else{
           $.ajax({
               type:"POST",
               url:d_http+"index.php/Home/Index/register",
               data:{
                   member:$("[name='phone']").val(),
                   code:$("[name='modifycode']").val(),
                   password:$("[name='password']").val(),
                   nickname:obj.nickname,
                   age:obj.age,
                   sex:obj.sex,
                   birthday:obj.birthday,
                   constellation:obj.constellation,
                   citys:obj.city,
                   token:MD5($("[name='phone']").val()+$("[name='password']").val()+SL)
               },
               success:function(data){ 
               console.log(data)               
                   if(data.code==404){
                       $('.error').html(data.massage).show();
                       showError();
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
                               if(localStorage.getItem("upImg")==null){
                                   localStorage.removeItem("list");
                                   location.href="../../index.html"
                               }else{
                                   _ajax.upLoadImg(localStorage.getItem("upImg"),data.data,
                                       d_http+"index.php/Home/Article/upload_myimage",function(res){
                                           localStorage.removeItem("upImg");
                                           localStorage.removeItem("list");
                                           location.href="../../index.html";
                                       });
                               }
                           }
                       })
                   }
               }
           })
       }
    });
    $(".back").click(function () {
        localStorage.removeItem("upImg");
    })
}


