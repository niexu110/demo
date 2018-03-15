/**
 * Created by Administrator on 2017/11/11.
 */
$(function(){
    var pull=$(".pullUp"),isOpen=true,page1=0,page2=0;
    var data={type:0,page:page1};
    $(".reward-nav div").click(function(){
        var start=$(this).attr("data-type");
        start==0?(data.page=page1,data.type=0):(data.page=page2,data.type=1);
        $(this).addClass("active").siblings(".active").removeClass("active");
        $($(this).attr("title")).addClass("active").siblings(".active").removeClass("active");
        console.log(data);
    });
    var clientH = Number(document.documentElement.clientHeight);
    var H=Number(pull.height());
    $(document).on('scroll',function(){
        if(isOpen){
            var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop+clientH);
            var H5Top=parseInt(pull.offset().top+H);
            if(docH>H5Top-150){
                isOpen=false;
                pull.html("数据加载中...");
                //    发送ajax

            }
        }
    })

})
