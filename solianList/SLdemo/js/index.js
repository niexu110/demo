/**
 * Created by Administrator on 2017/2/8.
 */
function getName() {
    console.log(1);
}
var getName=function(){
    console.log(2)
}
function fu() {
    getName=function(){
        console.log(3)
    }
    return this;
}
fu.getName=function(){console.log(4)};
fu.prototype.getName=function () {
    console.log(5)
}
getName();
fu.getName();
getName();
new fu.getName()
fu().getName();

var val="XASDAAFDRF";
var height,Height;
var name="邻家小院";
var num=1;//验证状态1通过2 失败;
var total=0;//总价
var shopImg="moments_bg.png";//商家店面
var lists=[
    [
        {order:34515545646,date:"2017-01-22 15:00",price:"650.00"},
        {order:14515545646,date:"2017-01-23 15:00",price:"650.00"},
        {order:34515545646,date:"2017-01-25 15:00",price:"650.00"},
        {order:44515545646,date:"2017-01-26 15:00",price:"650.00"},
        {order:54515545646,date:"2017-01-27 15:00",price:"650.00"},
        {order:64515545646,date:"2017-01-28 15:00",price:"650.00"}],
    [
        {order:34545646,date:"2017-02-22 15:00",price:"850.00"},
        {order:14545646,date:"2017-02-23 15:00",price:"850.00"},
        {order:34515646,date:"2017-02-25 15:00",price:"850.00"},
        {order:44515646,date:"2017-02-26 15:00",price:"950.00"},
        {order:54515646,date:"2017-02-27 15:00",price:"750.00"},
        {order:64515546,date:"2017-02-28 15:00",price:"650.00"}],
    [
        {order:34514646,date:"2017-03-22 15:00",price:"6150.00"},
        {order:14555646,date:"2017-03-23 15:00",price:"6250.00"},
        {order:34515646,date:"2017-03-25 15:00",price:"6350.00"},
        {order:44515546,date:"2017-03-26 15:00",price:"6350.00"},
        {order:54515646,date:"2017-03-27 15:00",price:"6150.00"},
        {order:64515546,date:"2017-03-28 15:00",price:"650.00"}]
];
var list=[];
 var obj=[{name:'沥青',price:"123"},{name:'蔡青',price:"89"},
    {name:'张青',price:"352"},{name:'A请',price:"185"},{name:'王青',price:"123"}
    ];
//订单信息

var orderList={order:"XAsdsd1478456",price:1980,yPrice:100,date:"2017-01-10 15:30",text:"奶茶*2<br>蛋糕14寸*1<br>咖啡*2<br>",ddate:"2017-02-10"};
var date=["2017-01","2017-02","2017-03","2017-04","2017-05","2017-06"];
$(function(){
    totals(lists);

    //表单提交
    $("#loginBtn").click(function(){
        if($('[name="phone"]').val()==""||$('[name="psd"]').val()==""){
            alert("请您完善您的所有信息！！！");
        }else{
            var requestData=$("#loginForm").serialize();
            console.log(requestData)
            $.post("login.php",requestData,function (data) {
                console.log(data);
                if(data.code==0){
                    alert(data.msg);
                }else if(data.code==1){
                     alert(data.msg);
                     setTimeout(function(){
                        location.href="index.html";
                     },2000)
                }
            })
        }
    })
    $(".input").val(val);
    $(".img").attr("src",shopImg);
    $(".p").html("<b>"+name+"</b>");
    $(".sellerName span").html(name);
    for(var i=0;i<date.length;i++){
        $("#opt").append("<option value="+i+">"+date[i]+"</option>");
    }
    $("#opt").change(function(){
        var v=$("#opt").val();
        $(".date_left span").html(date[v]);
        $(".order").html("");
        add(v,lists);
    });
    $("#btn").click(function(){
        if(num==1){
            console.log("验证通过")
            $("#fixed").slideDown(500);
        }else if(num==2){
            console.log("验证失败")
            $("#fixed1").slideDown(500);
        }

    })
    $("#button1").click(function (){
        $("#fixed1").slideUp(500)
    })
    $("#button").click(function (){
        $("#fixed").slideUp(500)
    })
    //定位验证成功失败;
    height=$(window).height();
    $("body").css("height",height);
    Height=$(".validate").height();
    var top=(height-Height)/2;
    $(".validate").css("margin-top",top);
    //订单信息
        $(".p1").html("<img class='img1'src='my_b.png' >"+(orderList.price-orderList.yPrice)+"搜恋币/"+(orderList.price/10-orderList.yPrice/10)+"元");
        $("table").append(
            "<tr><td>订单号:</td><td>"+orderList.order+"</td></tr>"+
            "<tr><td>价格:</td><td>"+orderList.price+"搜恋币</td></tr>"+
            "<tr><td>优惠价:</td><td>"+orderList.yPrice+"搜恋币</td></tr>"+
            "<tr><td>下单时间:</td><td>"+orderList.date+"</td></tr>"+
            "<tr><td>商品详情:</td><td>"+orderList.text+"</td></tr>"
        );
        $(".orderContainer ul").append(
            "<li><span class='span'>订单编号:</span><span class='span1'>"+orderList.order+"</span></li>"+
            "<li><span class='span'>下单时间:</span><span class='span1'>"+orderList.date+"</span></li>"+
            "<li><span class='span'>有效期:</span><span class='span1'>"+orderList.ddate+"</span></li>"+
            "<li><span class='span'>使用优惠券:</span><span class='span1'>"+orderList.yPrice+"搜恋币/"+orderList.yPrice/10+"元</span></li>"+
            "<li><span class='span'>实际金额:</span><span class='span1'>"+(orderList.price-orderList.yPrice)+"搜恋币/"+(orderList.price/10-orderList.yPrice/10)+"元</span></li>"+
            "<li><span class='span'>商品内容:</span><span class='span1'>读取场景服务内容,如是团体约会读取“团体约会名称”<br>"+orderList.text+"</span></li>"
        );

    function sort(num){
        return function arr(a,b){
            return a[num]-b[num];
        }
    }
    function keysrt(key,desc) {
        return function(a,b){
            return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
        }
    }
    obj.sort(keysrt("name",false));
    console.log(obj)
});
//查询订单
function add(num,obj){
    list=obj[num];
    for(var k in list){
        $(".order").append(
            "<li><div class='order_top'><div class='lt'>订单号: <span>"+list[k].order+"</span></div>" +
            "<div class='rt'>"+list[k].date+"</div></div>" +
            "<div class='order_title'><div class='lt'><span>服务内容</span></div>" +
            "<div class='rt'><b class='b'>￥"+list[k].price+"</b></div></div></li>")
    };
    console.log(list);
}
//计算总价
function totals(str){
    for(var i=0;i<str.length;i++) {
        var num;
        for(var k in str[i]){
            num=parseInt(str[i][k].price);
            total+=num;
        }
    }
    $(".total_price").text(total);
}



