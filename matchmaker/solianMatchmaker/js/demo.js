/**
 * Created by Administrator on 2017/10/11.
 */
$(function(){
    var arr=["汉族","壮族","傣族","满族","食人族","羌族"],
        arr2=["2K以下","2K-4K","4K-6K","6K-8K","8K-10K","15K以上"],
        arr3=[["汉族","汉族","汉族","汉族","汉族","汉族"],
              ["壮族","壮族","壮族","壮族","壮族","羌族"],
              ["傣族","傣族","傣族","傣族","傣族","羌族"],
              ["满族","满族","满族","满族","满族","羌族"],
              ["食人族","食人族","食人族","食人族","食人族","羌族"],
              ["羌族","羌族","羌族","羌族","羌族","羌族"]
        ],
        height=["150CM","155CM","160CM","165CM","170CM","175CM","180CM","185CM","190CM","195CM","200CM"],
        weight=["40KG","45KG","50KG","55KG","60KG","65KG","70KG","75KG","80KG","85KG","90KG"],
        obj=null,pop=$("#sliders"),num;
    //使用方法 创建 elementary,obj,slider,num,isOpen;
    //先实例化obj new Element(arr);然后调用 add();add2()；方法；
    var elementary=$(".abbr");
    $(".income").click(function(){
          if(toggle){obj=new Element(arr);num=$(this).index();toggle=false;
          obj.add(elementary,pop,num);pop.css({bottom:'0',transition: "all .3s linear","-webkit-transition": "all .3s linear"});}
    });
    $(".marray").click(function(){
        if(toggle){obj=new Element(arr2);num=$(this).index();toggle=false;
        obj.add(elementary,pop,num);pop.css({bottom:'0',transition: "all .3s linear","-webkit-transition": "all .3s linear"});}
    });
    $(".height").click(function(){
        if(toggle){obj=new Element(height);num=$(this).index();toggle=false;
        obj.add(elementary,pop,num);pop.css({bottom:'0',transition: "all .3s linear","-webkit-transition": "all .3s linear"});}
    });
    $(".weight").click(function(){
        if(toggle){obj=new Element(weight);num=$(this).index();toggle=false;
        obj.add(elementary,pop,num);pop.css({bottom:'0',transition: "all .3s linear","-webkit-transition": "all .3s linear"});}
    });
    $(".city").click(function(){
        if(toggle){obj=new Element(arr,arr3);num=$(this).index();toggle=false;
            obj.add2(elementary,pop,num);pop.css({bottom:'0',transition: "all .3s linear","-webkit-transition": "all .3s linear"});}
    });
})

