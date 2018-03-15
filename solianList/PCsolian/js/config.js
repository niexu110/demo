/**
 * Created by Administrator on 2017/6/12.
 */
require.config({
     baseUrl:"js/",
     shim:{
         "jquery-2.1.4.min":["jquery"],
         "jquery-ui.im":["jquery"],

     },
     paths:{
         "jq":"comm/jquery-2.1.4.min",
         "jqy":"comm/jquery-1.11.3",
         "xdm":"comm/jQuery.XDomainRequest",
         "ajax":"comm/ajaxHttp",
         "md5":"comm/MD5",
         "index":"index/index",
     },
     map:{

     },
})