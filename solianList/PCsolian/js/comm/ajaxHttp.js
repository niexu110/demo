/**
 * Created by Administrator on 2017/5/12.
 */
var _ajax= {
    getAjax: function (url, data, type, success) {
        $.ajax({
            type: type,
            url: url,
            data: data,
            success: function (res) {
                success ? success(res) : function () {
                };
            }
        })
    },
    upLoadImg: function (src, id, url, success) {
        var url = url;
        var id = id;
        var token = MD5(id + SL);
        var photo = img_blob(src);
        var fd = new FormData();
        fd.append("file", photo);
        $.ajax({
            url: url,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function (res) {
                success ? success(res) : function () {
                };
            }
        })
    }
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
function fadeTagle(self,msg,src){
    self.find("img").attr("src",src);
    self.find("p").text(msg);
    self.fadeIn();
    setTimeout(function(){
        self.fadeOut();
    },1500)
}
function getJson(msg){
     return JSON.parse(msg);
}
function add0(m) {
    return m < 10 ? '0' + m : m
}
function getAstro(m,d){
    return m-(d<"102223444433".charAt(m-1)- -19);
}
function format(shijianchuo) {
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
times={
    getYear:function(){
        var list=[];
        var time=new Date().getFullYear();
        var lastYear=time-18,endYear=time-70;
        for(var i=endYear;i<lastYear;i++){
             list.push(i);
        }
        return list.reverse();
    },
    getMouth:function(){
        var list=[];
        for(var i=1;i<13;i++){
            list.push(i)
        }
        return list;
    },
    getDay:function(num){
        var list=[];
        if(num==2){
            for(var i=1;i<29;i++){
                list.push(i)
            }
        } else if(num==4||num==6||num==9||num==11){
           for(var i=1;i<31;i++){
              list.push(i)
           }
        }else{
            for(var i=1;i<32;i++){
                list.push(i)
            }
        }
        return list;
    },
    getHeight:function(){
        var list=[];
        for(var i=140;i<210;i++){
            list.push(i)
        }
        return list;
    }
}
