var year=new Date().getFullYear();
// if(localStorage.getItem("upImg")==null){
//     $("#IMGUp").click(function(){
//         location.href="upLoad.html";
//     })
// }else{
//     $("#IMGUp").attr("src",localStorage.getItem("upImg"));
//     $("#IMGUp").click(function(){
//         location.href="upLoad.html";
//     })
// }
$(function(ss, doc) {
    ss.init();
    ss.ready(function() {
        var cityPicker = new ss.PopPicker({
            layer: 2
        });
        cityPicker.setData(cityData);
        var showCityPickerButton = doc.getElementById('showCityPicker');
        var cityResult = doc.getElementById('cityResult');
        showCityPickerButton.addEventListener('tap', function(event) {
            cityPicker.show(function(items) {
                cityResult.innerText = items[0].text + "-" + items[1].text;
                userList.city=items[0].text + "-" + items[1].text;
            });
        }, false);
    });

}(mui, document));
var userList={city:"",sex:"1",nickname:"",age:"",birthday:"",constellation:""};
//上传图像
// $("#upLoad").change(function(){
//     var src=null;
//     var oFile = document.getElementById('upLoad').files[0];
//     if(oFile!==undefined){
//         src=oFile['name'];
//     }else{
//         return;
//     }
// })
$("#user").blur(function(){
    userList.nickname=$("#user").val();
})
$("#select").change(function(){
    userList.sex=$("#select").val();
})
$("#dates").change(function(){
    var date=$("#dates").val();
    var str=date;
    $(".prefectData>em").text(date);
    date=date.split("-");
    userList.age=year-date[0];
    userList.birthday=Date.parse(new Date(str))/1000;
    userList.constellation=getAstro(date[1],date[2]);
    function getAstro(m,d){
        return m-(d<"102223444433".charAt(m-1)- -19);
    }
})
$("#btns").click(function(){
    var that=$(".bomb");
    if(userList.nickname==""){
       fadeTagle(that,"填写昵称","../../img/icon/h_bombClose.png")
    } else if(userList.birthday==""||userList.constellation==""){
        fadeTagle(that,"请选择生日","../../img/icon/h_bombClose.png")
    }else if(userList.city==""){
        fadeTagle(that,"请选择城市","../../img/icon/h_bombClose.png")
    }else{
        userList =JSON.stringify(userList);
        localStorage.setItem('list',userList);
        setTimeout(function(){
            location.href="register.html";
        },1000)
    }
})



