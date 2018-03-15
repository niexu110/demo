/**
 * Created by Administrator on 2017/8/29.
 */
$(function () {
    //TODO 以下几个值请确保填上再调用示例里的sdk方法
    //具体可以到https://console.qcloud.com/cos 进行查看
    var bucket = 'bak1';
    var appId = '1253175695';
    var region = 'tj';
    var sign=
        "znvUAAgO7saq4LMFjFraxU+jpThhPTEyNTMxNzU2OTUmaz1BS0lEaVQ0YnpCTEN3ZEk4ckh0c3p2bGNMdEVPTUFtSXJ0dmsmZT0xNTA1MTgzMzkyJnQ9MTUwNDA2MDE5MiZyPTUzNjUyMjYzOCZmPSZiPWJhazE=";
    //TODO 以上几个值请确保填上再调用示例里的sdk方法

    var myFolder = '/album';//需要操作的目录
    // $.post("https://kfa.solian.cc", { cmd: "500001" },
    //     function(res){
    //         console.log(res)
    //     });
    //初始化逻辑
    //特别注意: JS-SDK使用之前请先到console.qcloud.com/cos 对相应的Bucket进行跨域设置
    var cos = new CosCloud({
        appid: appId,// APPID 必填参数
        bucket: bucket,//bucketName 必填参数
        region: region,//地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
        getAppSign: function (callback) {//获取签名 必填参数
            //下面简单讲一下获取签名的几种办法，签名请做一次 url encode
            //1.搭建一个鉴权服务器，自己构造请求参数获取签名，推荐实际线上业务使用，优点是安全性好，不会暴露自己的私钥
            /**
             $.ajax('SIGN_URL').done(function (data) {
                        var sig = data.sign;
                        callback(sig);
                    });
             **/
                callback(sign);

        },

    });
    var successCallBack = function (result) {
        console.log('request success.');
        $("#result").text(JSON.stringify(result));
    };
    var errorCallBack = function (result) {
        result = result || {};
        console.log('request error:', result && result.message);
        $("#result").text(result.responseText || 'error');
    };

    var progressCallBack = function (curr, sha1) {
        var sha1CheckProgress = ((sha1 * 100).toFixed(2) || 100) + '%';
        var uploadProgress = ((curr || 0) * 100).toFixed(2) + '%';
        var msg = 'upload progress:' + uploadProgress + '; sha1 check:' + sha1CheckProgress + '.';
        console.log(msg);
        $("#result").text(msg);
    };


    //上传文件,适合小于20M的文件上传
    $('#file').on('click', function () {
        codeData("1.php","123",true,60);
        $('#myFile').off('change').on('change', function (e) {
            var file = e.target.files[0];
            console.log(file)
            // 分片上传过程可能会有 op=upload_slice_list 的 POST 请求返回 404，不会影响上传：https://github.com/tencentyun/cos-js-sdk-v4/issues/16
            cos.uploadFile(successCallBack, errorCallBack, progressCallBack, "bak1", myFolder + file.name, file, 0);//insertOnly==0 表示允许覆盖文件 1表示不允许
            return false;
        });

        setTimeout(function () {
            $('#myFile').click();
        }, 0);

        return false;
    });

});
