/**
 * Created by Administrator on 2017/6/19.
 */
var objectUser=localStorage.getItem("userMsg");
$(function(){
    if(objectUser==null){
        $(".userMsg").hide();
    }else{
        objectUser=JSON.parse(objectUser);
        $(".userMsg").show();
        $(".sl-user").text("欢迎你,"+objectUser.nickname);
    }
    $(".quit").click(function(){
        localStorage.clear();
        $(".userMsg").hide();
        location.href="../index.html";
    });
})
