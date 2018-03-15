/**
 * Created by Administrator on 2017/11/11.
 */
$(function(){
    var start=0,data={uid:[]},isOk=false;
   $(".item").click(function(){
       var _this=$(this);
       var type=_this.attr("data-type");
       if(type==0){
           start++;
           _this.attr("data-type","1");
           if(start<=3){
               data.uid.push($(this).attr("title"));isOk=true;
               $(this).addClass("active").find("span").text("√");
           }else{
               hint("最多推荐3位",2000);
           }
       }

   })
    $(".offerBtn").click(function(){
        if(isOk){
            console.log(data);
            isOk=false;
        //    发送ajax
        }else{
            hint("请选择推荐成员",2000);
        }
    })
});
