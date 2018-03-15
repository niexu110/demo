/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
	function show(){
		$(".d_popupbox").css("display","block")
	}
	function hide(){
		$(".d_popupbox").css("display","none")
	}
	//解析时间戳
	function add0(m) {
		return m < 10 ? '0' + m : m
	}
	function format(shijianchuo) {
		var time = new Date(shijianchuo * 1000);
		var y = time.getFullYear();
		var m = time.getMonth() + 1;
		var d = time.getDate();
		var h = time.getHours();
		var mm = time.getMinutes();
		var s = time.getSeconds();
		var times = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
		return times
	}
$(function(){
	$(".d_back").on("click",function(){
		window.history.back(-1); 
	})
})
var d_head="/head";
var d_photo="/photo";
var d_gift="/gift"
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