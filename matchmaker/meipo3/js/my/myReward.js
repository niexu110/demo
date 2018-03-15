/**
 * Created by Administrator on 2017/11/11.
 */
$(function(){
    var pull=$(".pullUp"),isOpen=true,page=0;
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
