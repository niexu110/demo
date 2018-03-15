/**
 * Created by Administrator on 2017/7/5.
 */
$(".foot-box a").click(function(e){
    e.preventDefault();
    $(this).addClass('active').siblings('.active').removeClass('active');
    $($(this).attr('href')).addClass('active').siblings('.active').removeClass('active');
    $(".header-title").text($(this).attr("title"));
})