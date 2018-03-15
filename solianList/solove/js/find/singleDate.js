/**
 * Created by Administrator on 2017/3/15.
 */
var userObj=JSON.parse(localStorage.getItem('userData'))
$(function(){
    if(userObj.image==''||userObj.image==null){
        $(".single_left img").attr("src",'../../img/icon/d_head.png');
    }else{
        $(".single_left img").attr("src",userObj.image);
    }
    $(".single_left p").text(userObj.nickname);
    $(".single_right img").attr("src",localStorage.getItem('n_userimg'));
    $(".single_right p").text(localStorage.getItem('n_nickname'));
    $(".single_box h2 span").text(localStorage.getItem('n_nickname'));
    $(".SL_nav b").click(function(){
        // location.href="personalcarte.html?id="+localStorage.getItem('n_datauid');
        history.go(-1)
    })
    $(".btn").click(function(){
        location.href='../personal/sendDate.html?id='+localStorage.getItem('n_datauid');
    });
})
