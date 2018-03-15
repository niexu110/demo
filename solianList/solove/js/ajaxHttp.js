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
    },
    upLoadImg:function(src,id,url,success){
        var url=url;
        var id=id;
        var token=MD5(id+SL);
        var blob=img_blob(src);
        var fd=new FormData();
        fd.append("file",blob);
        fd.append("uid",id);
        fd.append("token",token);
        $.ajax({
            url:url,
            type:"POST",
            data:fd,
            processData:false,
            contentType:false,
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
function img_blob(base64){
    var dataURI = base64; //base64 字符串
    var mimeString =  dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
    var byteString = atob(dataURI.split(',')[1]); //base64 解码
    var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
    var intArray = new Uint8Array(arrayBuffer); //创建视图
    for (i = 0; i < byteString.length; i += 1) {
        intArray[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([intArray], { type:  mimeString }); //转成blob
    return blob;
}
function add0(m) {
    return m < 10 ? '0' + m : m
}
function timer(shijianchuo) {
    var time = new Date(shijianchuo * 1000);
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
function formats(shijianchuo) {
    var time = new Date(shijianchuo * 1000);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    var date={date:y + '.' + add0(m) + '.' + add0(d),time:add0(h) + ':' + add0(mm)+"开始"}
    return date
}
