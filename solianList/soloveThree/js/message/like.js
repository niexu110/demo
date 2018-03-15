/**
 * Created by niexu on 2017-09-18.
 */
$(function(){
    var pullup=$('.pullUp')
    $(".head a").on('click',function(){
        $(this).addClass("active").siblings(".active").removeClass("active");
        $($(this).attr("href")).addClass("actives").siblings(".actives").removeClass("actives")
    })
    $(document).on('scroll',function () {
        var dh= document.documentElement.clientHeight
        var ph= pullup.offset().top
        var sh=document.body.scrollTop
        if(sh+dh>ph-50){
            pullup.text('加载更多')
        }

    })
})