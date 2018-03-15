/**
 * Created by Administrator on 2017/9/6.
 */
$(function(){
    var myDate = new Date();
    var day=myDate.getDay();
    var pop=$(".pop-sign"),pop2=$(".pop-sign2");
    $(".sign").click(function(){
        var src=$(this).attr("alt");
        var type=$(this).attr("title");
        if(type==0){
            pop.show();
            localStorage.setItem("day",day);
            $(this).attr("src",src); $(this).attr("title","1");
        }else{
            pop2.show();
        }
    });
    //上传图片
    $("#upFile").change(function(e){
        e.stopPropagation();
        var imgFile = new FileReader();
        imgFile.readAsDataURL(this.files[0]);
        imgFile.onload=function(){
            var  src = this.result; //base64数据
            var html="<div><img src="+src+"></div>";
            $(".album-list").append(html);
        }
    });
    $(".install").click(function(){skip("setup.html")})
    $(".compile").click(function(){skip("editdata.html")})
    pop.click(function(){pop.hide();})
    $(".closeBtn,.dayBtn").on("click",function(){pop2.hide();})
})