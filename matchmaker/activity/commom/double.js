/**
 * Created by Administrator on 2017/8/22.
 */
$(function(){
    var arr=["乡村媒婆","镇级媒婆","县城媒婆","区级媒婆","省级媒婆","部级媒婆","国家级媒婆","国际媒婆"];
    var type;
   $(".testBtn").click(function(){
      type= $(this).attr("title");
      if(type==0){
       var num=Math.floor(Math.random()*8+1);
       var text='"'+arr[num-1]+'"';
       $(".pop-title").html(text);
       $(".pop").show();
       $(this).attr("title",1);
      }else{
        $(".pop2").show();
      }
   });
   $(".shareBtn").click(function(){
       type==0?$(".pop").hide():$(".pop2").hide();
       $("#lookTop").show();
       setTimeout(function(){$("#lookTop").hide();},3000)
   })
})