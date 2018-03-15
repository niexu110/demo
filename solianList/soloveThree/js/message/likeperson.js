$(function () {
    //huiyuan有没有开通会员，vipnum没开通会员的时候有人查看的数量，likenum自己喜欢的人数,onlynvip没有vip有人喜欢，nvipnp没有vip没人喜欢,ilike我喜欢谁，slikeme谁喜欢我

    var p=$('.head p'),ilike=$('.ilikeone'),weikong=$('.noone'),head=$('.head'),nvipnp=$('.openvip'),onlynvip=$('.someone'),slikeme=$('.somelikeme'),someone=$('.someone'),openvip=$('.openvip'),pullup=$('.pullUp'),
    huiyuan = head.attr('data-vip')=='true'?true:false,vipnum=parseInt(head.attr('data-vipnum')),likenum=parseInt(head.attr('data-ilike'))
     if(likenum){
         ilike.show()
         weikong.hide()
     }else{
         ilike.hide()
         head.hide()
         weikong.show()
     }
    p.on('click',function (){
        var index=$(this).index()
        $(this).addClass('active').siblings().removeClass('active')
        //我喜欢谁
        if(index==0){
           ilike.show()
            slikeme.hide()
         } else if(index==1){//谁喜欢我
            ilike.hide()
            slikeme.show()
            if(!huiyuan){
                if(vipnum){//有人喜欢
                    someone.show()
                    openvip.hide()
                }else {//没人喜欢
                    someone.hide()
                    openvip.show()
                }
            }else {
                openvip.hide()
        $('.havevip').show()
            }
        }
    })
    $('.view').on('click','.item',function () {
        var uid=$(this).attr('uid')
        skip('https://www.solian.cc/?uid='+uid)
    })
    $('.havevip').on('click','.item',function () {
        var uid=$(this).attr('uid')
        skip('https://www.solian.cc/?uid='+uid)
    })
    $(document).on('scroll',function () {
        var dh= document.documentElement.clientHeight;
        var ph= pullup.offset().top;
        var sh=document.body.scrollTop;
        if(sh+dh>ph-50){
          pullup.text('加载更多')
        }

    })
})