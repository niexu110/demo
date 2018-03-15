/**
 * Created by Administrator on 2017/6/8.
 */
var html="<div class='box-content' style='position: fixed;left:0;bottom:0;right:0;top:0;background:rgba(0,0,0,.5);z-index: 1000;'>" +
    "<div style='position:absolute;width: 5.26rem;height:5.5rem;background:#fff;text-align:center;top:30%;left:1.12rem '>" +
    "<img src='../../img/n_wanshan.png' class='img' style='position: absolute;width:1.2rem;height:1.2rem;top:-.6rem;left:2.03rem;border-radius: 50%;'>" +
    "<h3 style='margin-top:1rem;margin-bottom:.4rem;font-size: .38rem;color:#333;font-weight: bold;'>完善信息</h3>" +
    "<p style='font-size: .24rem;color:#363636;height:.6rem;line-height: .6rem;'>听说你上得了厅堂，下得了厨房。开得起好车,</p>" +
    "<p style='font-size: .24rem;color:#363636;height:.6rem;line-height: .6rem;'>买得起新房。但是为什么没人知道呢？</p>" +
    "<h4 style='font-size: .28rem;color:#5793dd;height:.6rem;line-height: .6rem;'>赶快来完善你的个人资料吧！</h4>" +
    "<div style='width:3.8rem;height:.6rem;margin:.5rem auto;'>" +
    "<span class='upGo pull-left' style='width:1.6rem;height:.6rem;line-height: .6rem;font-size: .3rem;background: #5793dd;color:#fff;border-radius:4px; '>立刻就去</span>" +
    "<span class='closed pull-right' style='width:1.6rem;height:.6rem;line-height: .6rem;font-size: .3rem;border:1px solid #5793dd;color:#5793dd;border-radius:4px;'>稍后再说</span></div>" +
    "</div></div>";
judge(localStorage.getItem("listType"));
function judge(num) {
    if(num==0){
        $(document.body).append(html);
        $(".upGo").click(function(){
            location.href="../../src/myself/personage.html";
            localStorage.removeItem("listType");
        });
        $(".closed").click(function(){
            $(".box-content").hide();
            localStorage.removeItem("listType");
        })
    }else{
        return;
    }
}
