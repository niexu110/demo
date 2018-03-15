document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
var httpwindow="https://kfm.solian.cc/";
var https="https://mpq.solian.cc/";
function  skip(url){
     window.location.href=url;
}
function Bombbox(text,time){
	$(".d_popupbox").show().html(text);
	setTimeout(function show(){
		$(".d_popupbox").css("display","none")
	},time);
}
function addMore(type,url,obj,isOpen,callBack){
	//加载更多
	var clientH = Number(document.documentElement.clientHeight);
    var height5=Number($(".pullUp").height());//加载更多
    $(window).on('scroll',function(){
    	if(isOpen){
    		var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
			var H5Top=parseInt($(".pullUp").offset().top+height5); //获取h5底部距离文档顶部的高度
			if(docH>=H5Top){
				isOpen=false;
                $(".pullUp").html('数据加载中......');
				$.ajax({
					type:type,
					url:url,
					data:obj,
					success:function(res){
						if(res.code==200){
							obj.page++;
							isOpen=true;
							callBack?callBack(res):function(){};
                            $(".pullUp").html('数据加载中......');
							setTimeout(function(){
                                $(".pullUp").html("");
							},1500);
						}else{
							isOpen=false;
							$('.pullUp').html('暂无更多数据');
							setTimeout(function(){
								$(".pullUp").html("");
							},1500);
						}
					}
				})
			}
		}
    });
}
//parameter
