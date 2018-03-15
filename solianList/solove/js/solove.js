;(function($){
	/*
	*时间戳转为时间
	*timestamp：时间戳（毫秒值）
	*type:需要得到的时间格式
	*/
	$.format=function(timestamp,type){
		var time=new Date(timestamp);
		var year = time.getFullYear();
    var month= time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var times="";
    if(type=='a'){
    	times = year+'年'+month+'月'+day+'日';
    }else if(type=='b'){
    	times = year+'-'+month+'-'+day; 
    }else if(type=='c'){
    	times = year+'/'+month+'/'+day; 
    }else if(type=='d'){
    	times = year+'-'+$.addZero(month)+'-'+$.addZero(day)+' '+$.addZero(hour)+':'+$.addZero(minutes);
    }else if(type=='e'){
    	times = year+'/'+$.addZero(month)+'/'+$.addZero(day)+' '+$.addZero(hour)+':'+$.addZero(minutes);
    }else if(type=='f'){
    	times = year+'-'+$.addZero(month)+'-'+$.addZero(day)+' '+$.addZero(hour)+':'+$.addZero(minutes)+':'+$.addZero(seconds);
    }
    return times;
	}
	$.addZero=function(num){
    	return num < 10 ? '0' + num : num;
	}

	/*
	*一句话弹框提示
	*message：提示信息
	*需要使用对应的css
	*/ 
	$.promptMessage=function(message){
		$('body').append('<p id="promptMessage">'+message+'</p>')
		setTimeout(function(){
			$('#promptMessage').remove();
		},2000);
	}
	
	/*
	*获取跳转传递过来的参数，并将结果转为对象
	*url:当前页面的地址（含有传递的参数）
	*方法返回值theRequest是对象，key和value一一对应
	*此方法返回一个对象，需要用变量接收
	*/
	$.getPassArguments=function(url){
		var url=url.substring(url.indexOf('?'),url.length);
		var theResult = new Object();   
   	if (url.indexOf("?") != -1) {   
      var strs = url.substr(1).split("&");   
      for(var i = 0; i < strs.length; i ++) {
      	var name= strs[i].split("=")[0];
      	var value= strs[i].split("=")[1]; 
        theResult[name]=value;   
      }   
   	}   
   	return theResult;
	}

	/*
	*移动端滑动事件
	*$.swipeLeft向左滑动
	*$.swipeRight向右滑动
	*el:滑动的元素
	*callback：滑动后需要执行的动作函数
	*回调函数中传递event就可以拿到当前的元素
	*/
	$.swipeLeft=function(el,callBack){
		var startX=0,endX=0;
		el.on('touchstart',function(event){
			var touch=event.originalEvent.changedTouches[0];
			startX=touch.pageX;
		});
		el.on('touchend',function(event){
			event.preventDefault();
			var touch=event.originalEvent.changedTouches[0];
			endX=touch.pageX;
			if(startX-endX > 20){
				callBack(event);
			}
		});
	}
	$.swipeRight=function(el,callBack){
		var startX=0,endX=0;
		el.on('touchstart',function(event){
			var touch=event.originalEvent.changedTouches[0];
			startX=touch.pageX;
		});
		el.on('touchend',function(event){
			var touch=event.originalEvent.changedTouches[0];
			endX=touch.pageX;
			if(startX-endX < -20){
				callBack(event);
			}
		});
	}

	/*
	*
	*
	*
	*
	*
	*
	*
	*
	*
	*/
	$.loadMore=function(el,callback){
		var clientH=document.documentElement.clientHeight;
		var close=true;
		$(window).on('scroll',function(){
			if(close){
				var docH=$(document).height();
				var scrollTop=document.documentElement.scrollTop | document.body.scrollTop;
				if(clientH+scrollTop>=docH){
					close=false;
					el.html('数据加载中......');
					callback();
				}
			}
		});
	}





})(jQuery);