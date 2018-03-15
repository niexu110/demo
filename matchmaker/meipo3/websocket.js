/**
 * Created by Administrator on 2017/12/1.
 */
$(function(){
     var ws=null,hit=$(".hint"),content=$(".content");
    //判断当前浏览器是否支持WebSocket
    if(typeof(WebSocket) == "undefined") {
          alert('当前浏览器不支持及时通讯');
          }else{
           ws=new WebSocket("ws://127.0.0.1");
    }
        $(".open").click(function(){
            ws = new WebSocket("ws://127.0.0.1");
        });
    $(".close").click(function(){
        closeWebSocket();
      });
    $(".send").click(function(){
        if($(".Tint").val()==""){
            hint("不能为空内容",3000);
        }else{
            send();
        }
    })
    ws.onopen=function(){
        hint("打开服务",3000);
    }
    ws.onmessage=function(res){
       content.append("<p>"+res.data+"</p>")
    }
    ws.onerror=function(){
        hint("连接错误",6000);
    };
    ws.onclose=function(event){
        console.log(event)
        hint("断开连接",3000);
    }
    window.onbeforeunload = function () {
        closeWebSocket();
      }
    function closeWebSocket(){
         ws.close();
      }
      function send(){
        var txt=$(".Tint").val();
        ws.send(txt);
      }
})