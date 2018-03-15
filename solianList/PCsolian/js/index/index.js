/**
 * Created by Administrator on 2017/6/12.
 */
window.addEventListener("load",function(){
    require(["jqy","ajax","md5"],function(){
        var myVideo=document.getElementById("video");
        var objectUser=localStorage.getItem("userMsg");
        if(objectUser==null){
            $(".userMsg").hide();
            $(".form-login").css("display","block");
            $("#indexMP4").css("display","none");
        }else{
            objectUser=getJson(objectUser);
            $(".userMsg").show();
            $(".form-login").css("display","none");
            $("#indexMP4").css("display","block");
            video();
            $(".sl-user").text("欢迎你,"+objectUser.nickname);
        };
         $(".li").on("click",function(){
              $(this).addClass("actives").siblings(".actives").removeClass("actives");
         })
           var data={};
           var code=null;
           var btn=false;
           var stop=false;
           var residence=[],incomes=[],city1=[];
           _ajax.getAjax(d_http+"index.php/Home/Soubrette/search","","GET",function(res){
               console.log(res)
               var str=res.data.data.provinces.citys;
               incomes=res.data.data.income;
               for(var k in str){
                   residence.push(str[k].region_name)
                   city1.push(str[k].citys)
               }
           });
           $("input").on("blur",function(){
             blur($(this),data)
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
                closed();
                $("#indexMP4").css("display","none");
                $(".form-login").fadeIn(1000);
           })
          $(".qrCode span").click(function(){
              var left=$(this).index();
              left===0?$(".codeImg").css("left","0")
                  :(left===1?$(".codeImg").css("left","70px"):$(".codeImg").css("left","140px"))
              $(".codeImg").fadeIn(500);
              $(".codeImg>img").attr("src",$(this).attr("title"));
          });
        $(".codeImg").hover(function(){
            $(".codeImg").fadeIn(500);
        },function(){
            $(".codeImg").fadeOut(500);
        })
           //登陆
           $("#loginBtn").click(function(){
               if(btn){
                   btn=false;
                  var url=d_http+'index.php/Home/Index/login';
                   data.token=MD5(data.username+data.password+SL);
                   _ajax.getAjax(url,data,"POST",function(res){
                      if(res.code==="200"){
                           localStorage.setItem("userMsg",JSON.stringify(res.data));
                           $(".userMsg").show();  $(".sl-user").text("欢迎你,"+res.data.nickname);
                           $("input").val("");
                           $("#indexMP4").fadeIn(1000);
                            video();
                           $(".form-login").css("display","none");
                      }else{
                         $(".hint").show();$(".hint").text(res.massage);
                      }
                  })
               }else{
                   $(".hint").show();$(".hint").text("请先填写信息");
               }
           });
            $(".register").click(function(){
                  $(".hint").hide();
                   data={sex:1};btn=false;
                  $("#registerForm").fadeIn(200);
                  $("#loginForm").css("display","none");
            });
        $(".forget").click(function(){
            $(".hint").hide();
            data={};btn=false;
            $("#modifyForm").fadeIn(200);
            $("#loginForm").css("display","none");
        });
        $('#video').bind('contextmenu',function() { return false; });
        $(".jump-logins").click(function(){
            data={};btn=false;
            $(".hint").hide();
            $("#modifyForm").css("display","none");
            $("#loginForm").fadeIn(200);
        })
            //修改密码
          $("#btn").click(function(){
              if(btn){
                  btn=false;
                 var url=d_http+"index.php/Home/User/wpassword";
                  data.token=MD5(data.member+data.password+SL);
                  _ajax.getAjax(url,data,"post",function(res){
                      if(res.code==="200"){
                          data={};
                              $("#loginForm").fadeIn(500);
                              $("#modifyForm").css("display","none");
                      }else{
                          $(".hint").show();$(".hint").text("修改失败请稍后再试");
                      }
                  })
              }else{
                  $(".hint").show();$(".hint").text("请先填写信息");
              }
          });
          //注册
         var year=new Date().getFullYear();
         var bd=[year-18,10,10];
         var mouth=1;
         $(".date-year").click(function(){
             var num=times.getYear();
             for(var i=0;i<num.length;i++){
                 var html="<li class='yearItem'>"+num[i]+"</li>";
                 $(".year-box ul").append(html);
             };
            $(".year-box").fadeIn(200);
            $(".yearItem").click(function(){
                $(".date-year").text($(this).text());
                $(".year-box").fadeOut(200);
                $(".year-box ul").html("");
                bd[0]=$(this).text();
            })
        });
        $(".date-mouth").click(function(){
            var num=times.getMouth();
            for(var i=0;i<num.length;i++){
                var html="<li class='mouthItem'>"+num[i]+"</li>";
                $(".mouth-box ul").append(html);
            };
            $(".mouth-box").fadeIn(200);
            $(".mouthItem").click(function(){
                mouth=$(this).text();
                $(".date-mouth").text(add0(mouth));
                $(".mouth-box").fadeOut(200);
                $(".mouth-box ul").html("");
                bd[1]=add0(mouth);
            })
        });
        $(".date-day").click(function(){
            var num=times.getDay(mouth);
            for(var i=0;i<num.length;i++){
                var html="<li class='dayItem'>"+num[i]+"</li>";
                $(".day-box ul").append(html);
            };
            $(".day-box").fadeIn(200);
            $(".dayItem").click(function(){
                bd[2]=add0($(this).text());
                $(".date-day").text(add0($(this).text()));
                $(".day-box").fadeOut(200);
                $(".day-box ul").html("");
            })
        });
        var province="",city="";
        $(".address").click(function(){
            $(".district").fadeIn(200);
            for(var k in residence){
                var html="<li class='provinceItem'>"+residence[k]+"</li>";
                $(".province").append(html);
            }
            proct(city1,0);
            $(".provinceItem").click(function(e){
                e.stopPropagation();
                 province=$(this).text();
                 $(".city").html("");
                var num=$(this).index();
                proct(city1,num);
            });
        });
        function proct(list,num){
            for(var k in list[num]){
                var html="<li class='cityItem'>"+list[num][k].region_name+"</li>";
                $(".city").append(html);
            }
            $(".cityItem").click(function(e){
                e.stopPropagation();
                city=$(this).text();
                $(".district").fadeOut(200);
                $(".city").html("");
                $(".province").html("");
                $(".address>span").text(province+"-"+city);
                data.citys=province+"-"+city;
            })
        }
        //性别
    $(".registerSex div").on("click",function(){
         data.sex=$(this).attr("title");
         $(this).find("span").addClass("boy");
         $(this).siblings().find("span").removeClass("boy");
    });
    $(".jump-login").click(function(){
          data={};
         $(".hint").hide();
          $("#loginForm").fadeIn(200);
          $("#registerForm").css("display","none");
    });
        $(".jump-login2").click(function(){
            data={};
            $(".hint").hide();
            $("#loginForm").fadeIn(200);
            $("#registerForm2").css("display","none");
        });
        $(".jump-DL").click(function(){
            data={};
            $("#loginForm").fadeIn(200);
            $(".hint").hide();
            $("#registerForms").css("display","none");
    })
    $("#stepBtn").click(function(){
        data.age=year-bd[0];
        data.birthday=Date.parse(new Date(bd[0]+"-"+bd[1]+"-"+bd[2]))/1000;
        data.constellation=getAstro(bd[1],bd[2]);
        data.marry=1;
        if(data.nickname===undefined||bd.length!==3){
            $(".hint").show();$(".hint").text("请完善所有信息");
        }else{
            $("#registerForm2").fadeIn(200);
            $("#registerForm").css("display","none");
            $(".hint").hide();
        }
    });
        //婚史
        $(".registerSex2 div").on("click",function(){
            data.marry=$(this).attr("title");
            $(this).find("span").addClass("boy");
            $(this).siblings().find("span").removeClass("boy");
        });
        //身高
        $(".height").click(function(){
            var height=times.getHeight();
            for(var i=0;i<height.length;i++){
                var html="<li class='heightItem'>"+height[i]+"</li>";
                $(".height-list ul").append(html);
            }
            $(".height-list").fadeIn(200);
            $(".heightItem").click(function(e){
                e.stopPropagation();
                var h=$(this).text();
                data.height=h;
                $(".height>span").text(h+"cm");
                $(".height-list").fadeOut(200);
                $(".height-list ul").html("");
            })
        });
        //收入
        $(".schooling").click(function(){
            for(var i=0;i<incomes.length;i++){
                var html="<li class='incomeItem' title="+(i+1)+">"+incomes[i]+"</li>";
                $(".school-box ul").append(html);
            }
            $(".school-box").fadeIn(200);
            $(".incomeItem").click(function(e){
                e.stopPropagation();
                $(".schooling>span").text($(this).text());
                data.income=$(this).attr("title");
                $(".school-box ul").html("");
                $(".school-box").fadeOut(200);
            })
        });
        $("#stepBtn2").click(function(){
            if(data.height===undefined||data.income===undefined||data.citys===undefined){
                $(".hint").show();$(".hint").text("请完善所有信息");
            }else{
                $("#registerForms").fadeIn(200);
                $("#registerForm2").css("display","none");
                $(".hint").hide();
            }
        })
    $(".qyBtn").click(function(){
        location.href="src/vipIndex.html";
    })
    $("#registerBtn").click(function(){
        if(btn){
            btn=false;
            data.token=MD5(data.member+data.password+SL);
            console.log(data)
            var url=d_http+"index.php/Home/Index/register";
            _ajax.getAjax(url,data,"POST",function(res){
                if(res.code==="200"){
                    $.ajax({
                        type:"POST",
                        url:d_http+"index.php/Home/Hx/registerImUser",
                        data:{
                            username:res.data,
                            password:111111,
                            nickname:data.nickname
                        },
                        success:function(res){
                            setTimeout(function(){
                                $("#registerForms").css("display","none");
                                $(".hint").show();$(".hint").text("注册成功前去登陆");
                            },2000)
                            $("#loginForm").fadeIn(200);
                            $(".hint").hide();data={};
                        }
                    })
                }else{
                    $(".hint").show();$(".hint").text(res.massage);
                }
            })
        }else{
            $(".hint").show();$(".hint").text("请完善所有信息");
        }
    });
        function video(){myVideo.play()}
        function closed(){myVideo.pause();}
        function blur(obj,data){
            var inT=obj;
            var  tel = /^1[3|5|8|7][0-9]{9}$/;
            var psd=/^[a-zA-Z]\w{6,18}$/;
            if(inT.attr("name")==="phone"){
                if(inT.val()===""||!tel.test(inT.val())){
                    $(".hint").show();$(".hint").text("请输入正确的手机号");
                }else{$(".hint").hide();data.username=inT.val();}
            }else if(inT.attr("name")==="retrievePhone"){
                if(inT.val()===""||!tel.test(inT.val())){
                    $(".hint").show();$(".hint").text("请输入正确的手机号"); stop=false;
                }else{$(".hint").hide();data.member=inT.val();stop=true;}
            }else if(inT.attr("name")==="retrieveCode"){
                if(inT.val()!=code||inT.val()===""){
                    $(".hint").show();$(".hint").text("验证码输入有误");
                }else{$(".hint").hide();}
            }else if(inT.attr("name")==="retrievePsd"){
                if(inT.val()===""||!psd.test(inT.val())){
                    $(".hint").show();$(".hint").text("密码6到18位且开头必须为字母");
                }else{$(".hint").hide(500);data.password=inT.val(); btn=true;}
            }else if(inT.attr("name")==="password"){
                if(inT.val()===""||!psd.test(inT.val())){
                    $(".hint").show();$(".hint").text("密码6到18位且开头必须为字母");
                }else{$(".hint").hide();}
            }else if(inT.attr("name")==="psd"){
                if(inT.val()===""){
                    $(".hint").show();$(".hint").text("请输入密码");
                }else{$(".hint").hide();data.password=inT.val();btn=true;}
            }else if(inT.attr("name")==="registerUser"){
                if(inT.val()===""){
                    $(".hint").show();$(".hint").text("请填写昵称");
                }else{$(".hint").hide();data.nickname=inT.val();}
            }else if(inT.attr("name")==="registerP"){
                if(inT.val()===""||!tel.test(inT.val())){
                    $(".hint").show();$(".hint").text("请输入正确的手机号");stop=false;
                }else{$(".hint").hide();data.member=inT.val();stop=true;}
            }else if(inT.attr("name")==="registerCode"){
                if(inT.val()!=code||inT.val()===""){
                    $(".hint").show();$(".hint").text("验证码输入有误");
                }else{$(".hint").hide();data.code=inT.val();}
            }else if(inT.attr("name")==="registerPsd"){
                if(!psd.test(inT.val())||inT.val()===""){
                    $(".hint").show();$(".hint").text("密码6到18位且开头必须为字母");btn=false;
                }else{$(".hint").hide();data.password=inT.val(); btn=true;}
            }
            return data;
        }
    })
},false);