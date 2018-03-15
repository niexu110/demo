$(function () {
    var tabBtn=$('.tabBtn li'),
        item=$('.item li'),
        img=$('.banImg')
    var url=location.href,type=url.substring(url.lastIndexOf('#')+1,url.length);
    function ishow(type) {
        if(type){
            tabBtn.eq(type).addClass("show").siblings(".show").removeClass("show");
            item.eq(type).addClass("show").siblings(".show").removeClass("show");
            img.eq(type).addClass('show').siblings(".show").removeClass("show");
        }else {
            tabBtn.eq(0).addClass("show").siblings(".show").removeClass("show");
            item.eq(0).addClass("show").siblings(".show").removeClass("show");
            img.eq(0).addClass('show').siblings(".show").removeClass("show");
        }
    }
    ishow(type)
    window.onhashchange=function () {
        var hs=location.hash.substring(1),th=$('.about').offset().top-130
        $(window).scrollTop(th)
        ishow(hs)
    }
    tabBtn.on('click',function () {
        var type=$(this).index().toString()
        ishow(type)
    })
});
