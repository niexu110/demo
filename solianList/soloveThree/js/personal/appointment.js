$(function () {
    var li=$('.nav li'),
         nav=$('.nav'),
        meetMe=$('.meetMe'),
        launch=$('.launch'),
        complete=$('.complete'),
        kong=$('.empty'),
        LdataNun=parseInt(launch.attr('data-num')),
        CdataNun=parseInt(complete.attr('data-num')),
        MdataNun=parseInt(meetMe.attr('data-num')),
        btn=$('.btn div'),
        pullup=$('.pullUp')
    //按钮点击
    btn.on('click',function () {
        var index=$(this).index()
        if(index==0){
            var id=$(this).parents('.item').attr('data-uid')
            $(this).parent().prev().children().eq(1).html('您已拒绝约会请求')
        }else if(index==1){
            $(this).parent().prev().children().eq(1).html('您已同意约会请求')
        }
        $(this).parent().detach()
    })
    //封装选项卡函数
    function isKong(num,one) {
        if(num){
            nav.siblings().hide()
            one.show()
        }else {
            nav.siblings().hide()
            kong.show()
        }
    }
    isKong(LdataNun,launch)
    //选项卡点击事件
    li.on('click',function () {
        var index=$(this).index(),  LdataNun=parseInt(launch.attr('data-num')),
            CdataNun=parseInt(complete.attr('data-num')),
            MdataNun=parseInt(meetMe.attr('data-num'))
        $(this).addClass('active').siblings().removeClass('active')
        if(index==0){
            isKong(LdataNun,launch)
        }else if(index==1){
            isKong(MdataNun,meetMe)
        }else if(index==2){
            isKong(CdataNun,complete)
        }
         })
    var dh= document.documentElement.clientHeight,flag=true
    $(document).on('scroll',function () {
        var ph= pullup.offset().top
        var sh=document.body.scrollTop
        if(sh+dh>ph){
            pullup.text('加载更多')
            pullup.show()
            if(flag){
                flag=false
                setTimeout(function () {
                    for(var i=0;i<3;i++){
                        var el='<div class="item" data-uid="1"> <div class="time"> <span>约见时间</span> <span>发布：</span><span>2017.01.01</span> <span class="aTime"></span> <span class="aTime"></span> </div> <div class="content"> <div class="itePic lt"> <img src="../../image/img/two.png" alt=""> </div> <p class="word lt"> <span>花儿为什么这样</span> <span class="request">对方已拒绝！</span> </p> </div> </div>'
                        $(el).appendTo($('.launch'))
                    }
                    pullup.text('')
                    flag=true
                },2000)
            }
        }
    })
     })





