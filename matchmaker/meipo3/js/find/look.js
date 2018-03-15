/**
 * Created by Administrator on 2017/11/6.
 // * type判断是否登录0未登陆1已登陆，start是否已有单身团0没有1有
 */
$(function(){
    var li=$(".ul li");
    var li2=$(".uls li");
   $(".ul").width(1.6*li.length+"rem");
   $(".uls").width(1.6*li2.length+"rem");
   $(".big").click(function(){
       var type=$(this).attr("title"),start=$(this).attr("data-ok");
       if(type==0){
         $(".pop-login").show();
       }else {
           if(start==0){
               alert("直接加入单身团");
           }else{
               $(".pop").show();
           }
       }
   });
    $(".no,.close").click(function(){
        $(".pop").hide();
    });
    $(".yes").click(function(){
        console.log("加入他的单身团")
    })
    var phone=/^1[3|5|8|7][0-9]{9}$/,
        psd=/^([!-~]){6,18}$/,intP=false,intPsd=false;
    var data=new Object();
    $(".intP").blur(function(){
        if(!phone.test($(this).val())){
            hint("手机格式有误",2000); $(".showImg").hide();intP=false;
            $(".loginBtn").removeAttr("style");
        }else{
            $(".showImg").show();intP=true;
            data.phone=$(this).val();
            if(intP&&intPsd){
                $(".loginBtn").css({background:"#ff704f",color:"#ffcdc5"})
            }
        }
    });
    $(".intPsd").blur(function(){
        if(!psd.test($(this).val())){
            hint("密码6-18位",2000);intPsd=false;
            $(".loginBtn").removeAttr("style");
        }else{
            intPsd=true;
            data.password=$(this).val();
            if(intP&&intPsd){
                $(".loginBtn").css({background:"#ff704f",color:"#ffcdc5"})
            }
        }
    });
    $(".loginBtn").click(function(){
        if(intP&&intPsd){
            console.log(data)
            $(".pop-login").hide();
            $(".big").attr("title",1);
            // $.ajax({
            //     type:"POST",
            //     url:"",
            //     data:data,
            //     success:function(res){
            //         console.log(res)
            //     }
            // })
        }else{
            hint("登录信息填写有误",2000);
        }
    })
})
