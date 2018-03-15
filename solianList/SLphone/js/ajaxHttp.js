/**
 * Created by Administrator on 2017/5/12.
 */
var _ajax={
    getAjax:function (url,data,type,success) {
        $.ajax({
            type:type,
            url:url,
            data:data,
            success:function(res){
                success?success(res):function(){};
            }
        })
    }
}
function fadeTagle(self,msg,src){
    self.find("img").attr("src",src);
    self.find("p").text(msg);
    self.fadeIn();
    setTimeout(function(){
        self.fadeOut();
    },1500)
}
function add0(m) {
    return m < 10 ? '0' + m : m
}
function format(timer) {
    var time = new Date(timer * 1000);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    // var times = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    var times = y +'年' + add0(m) + '月' + add0(d) + '日 ';
    return times
}
