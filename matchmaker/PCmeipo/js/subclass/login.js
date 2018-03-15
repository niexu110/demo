/**
 * Created by Administrator on 2017/11/13.
 */
$(function(){
    var data={},code=null,btn=false,stop=false;
    var hint=$(".hint");
    var objectUser=localStorage.getItem("userMsg");
    setTimeout(function(){
        $(".login-form").addClass("cartoon")
    },2000)
    if(objectUser==null){
        $(".userMsg").hide();
        $(".lgBtn").show();
        $(".form-login").css("display","block");
        $("#indexMP4").css("display","none");
    }else{
        objectUser=getJson(objectUser);
        $(".userMsg").show();
        $(".lgBtn").hide();
        $(".form-login").css("display","none");
        $("#indexMP4").css("display","block");
        $(".sl-user").text("欢迎你,"+objectUser.nickname);
    };
    $("input").on("blur",function(){
        blur($(this),data)
    });
    $(".lgBtn").click(function(){
        $(".login-form").css("display","block").addClass("cartoon").removeClass("cartoon2");
    });
    $(".close").click(function(){
        $(".login-form").addClass("cartoon2").removeClass("cartoon");
    });
    //获取验证码
    $("#code,#codes").click(function(){
        var url=d_http+"index.php/Home/Index/phone";
        var num=$(this).attr("title");
        var obj={token:MD5(SL)};
        var time=60;
        if(stop){
            stop=false;
            num==1?obj.tel=$("[name='retrievePhone']").val():obj.tel=$("[name='registerP']").val();
            _ajax.getAjax(url,obj,"POST",function(res){
                code=res.data.code;
                console.log(code);
            });
            var timer=setInterval(function(){
                time--;
                if(time<=0){
                    time=60;  clearInterval(timer);   stop=true;
                    num==1?($("#code").html("发送验证"),$('#code').removeAttr("style"),$("[name='retrievePhone']").attr("disabled",false))
                        :($("#codes").html("发送验证"),$('#codes').removeAttr("style"),$("[name='registerP']").attr("disabled",false));
                }else{
                    num==1?($("#code").html(time+"s"),$("[name='retrievePhone']").attr("disabled",true),
                            $("#code").css({background:"#5793dd",color:"#fff",padding:"2px 20px",cursor: "not-allowed"})
                    )
                        :($("#codes").html(time+"s"), $("[name='registerP']").attr("disabled",true),
                        $("#codes").css({background:"#5793dd",color:"#fff",padding:"2px 20px",cursor: "not-allowed"}));
                }
            },1000)
        }
    });
    //退出
    $(".quit").click(function(){
        localStorage.clear();
        $(".userMsg").hide();
        btn=false;
        $(".form-login").fadeIn(1000);
    });
    //登陆
    $("#loginBtn").click(function(){
        if(btn){
            btn=false;
            console.log(data);
            // var url=+'index.php/Home/Index/login';
            // _ajax.getAjax(url,data,"POST",function(res){
            //     if(res.code==="200"){
            //         localStorage.setItem("userMsg",JSON.stringify(res.data));
            //         $(".userMsg").show();  $(".sl-user").text("欢迎你,"+res.data.nickname);
            //         $("input").val("");
            //        $(".form-login").hide();
            //     }else{
            //         hint.show();hint.text(res.massage);
            //     }
            // })
        }else{
            hint.show();hint.text("请先填写信息");
        }
    });
    $(".register").click(function(){
        hint.hide();
        data={};btn=false;
        $("#registerForms").fadeIn(200);
        $("#loginForm").css("display","none");
    });
    $(".forget").click(function(){
        hint.hide();
        data={};btn=false;
        $("#modifyForm").fadeIn(200);
        $("#loginForm").css("display","none");
    });
    $(".login2").click(function(){
        hint.hide();
        data={};btn=false;
        $("#loginForm").fadeIn(200);
        $("#registerForms").css("display","none");
    })
    $(".login").click(function(){
        hint.hide();
        data={};btn=false;
        $("#loginForm").fadeIn(200);
        $("#modifyForm").css("display","none");
    })
    //修改密码
    $("#btn").click(function(){
        if(btn){
            btn=false;
            var url="";
            console.log(data)

            // _ajax.getAjax(url,data,"post",function(res){
            //     if(res.code==="200"){
            //         data={};
            //         $("#loginForm").fadeIn(500);
            //         $("#modifyForm").css("display","none");
            //     }else{
            //         hint.show();hint.text("修改失败请稍后再试");
            //     }
            // })
        }else{
            hint.show();hint.text("请先填写信息");
        }
    });
    $("#registerBtn").click(function(){
        if(btn){
            btn=false;
            console.log(data)
            var url="";
        //     _ajax.getAjax(url,data,"POST",function(res){
        //     })
        }else{
            hint.show();hint.text("请完善所有信息");
        }
    });
    function blur(obj,data){
        var inT=obj;
        var  tel = /^1[3|5|8|7][0-9]{9}$/;
        var psd=/^([!-~]){6,18}$/;
        if(inT.attr("name")==="phone"){
            if(inT.val()===""||!tel.test(inT.val())){
                hint.show();hint.text("手机号有误");
            }else{hint.hide();data.username=inT.val();}
        }else if(inT.attr("name")==="retrievePhone"){
            if(inT.val()===""||!tel.test(inT.val())){
                hint.show();hint.text("手机号有误"); stop=false;
            }else{hint.hide();data.member=inT.val();stop=true;}
        }else if(inT.attr("name")==="retrieveCode"){
            if(inT.val()!=code||inT.val()===""){
                hint.show();hint.text("验证码有误");
            }else{hint.hide();}
        }else if(inT.attr("name")==="retrievePsd"){
            if(inT.val()===""||!psd.test(inT.val())){
                hint.show();hint.text("密码6到18位");
            }else{hint.hide(500);data.password=inT.val(); btn=true;}
        }else if(inT.attr("name")==="password"){
            if(inT.val()===""||!psd.test(inT.val())){
                hint.show();hint.text("密码6到18位");
            }else{hint.hide();}
        }else if(inT.attr("name")==="psd"){
            if(inT.val()===""){
                hint.show();hint.text("请输入密码");
            }else{hint.hide();data.password=inT.val();btn=true;}
        }else if(inT.attr("name")==="registerP"){
            if(inT.val()===""||!tel.test(inT.val())){
                hint.show();hint.text("手机号有误");stop=false;
            }else{$(".hint").hide();data.member=inT.val();stop=true;}
        }else if(inT.attr("name")==="registerCode"){
            if(inT.val()!=code||inT.val()===""){
                hint.show();hint.text("验证码有误");
            }else{hint.hide();data.code=inT.val();}
        }else if(inT.attr("name")==="registerPsd"){
            if(!psd.test(inT.val())||inT.val()===""){
                hint.show();hint.text("密码6到18位");btn=false;
            }else{hint.hide();data.password=inT.val(); btn=true;}
        }
        return data;
    }
})