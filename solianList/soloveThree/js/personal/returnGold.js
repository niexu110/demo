$(function(){
	var d_photo=false;
	var d_content=false;
    $(".uploadCover").on("click",function(){
    	$(".uploadCover").hide();
    	$(".img1").attr("src","../../image/icon/d_addjhun.png");
    });
    var d_reg=/^1[3|4|5|8|7][0-9]{9}$/;
    $(".d_inpBox>input").on("change",function(){
		if($(".d_inpBox>input").val()==""){
			Bombbox("手机号不能为空","1000");
		}else if(!d_reg.test($(".d_inpBox>input").val())){
			Bombbox("手机号填写错误","1000");
		}else{d_photo=true;}
	});
	$(".d_inpBox>textarea").on("change",function(){
		if($(".d_inpBox>textarea").val()==""){
			Bombbox("请输入内容","1000");
		}else if($(".d_inpBox>textarea").val().length<2){
			Bombbox("内容为2-50个汉字","1000");
		}else{d_content=true;}
	});
	$(".d_submit").on("click",function(){
		if($(".d_img").val()==""){
			Bombbox("请上传您的结婚证附件","1000");
		}else if(d_photo==false){
			Bombbox("手机号填写错误","1000");
		}else if(d_content==false){
			Bombbox("请输入内容","1000");
		}else{
			$("#form").submit();
		}
	})
})
//图片页面展示
function he() {
    var oFile = document.getElementById('d_btn').files[0];
    var thisimg=oFile['name']
    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
    var oReader = new FileReader();
    oReader.onload = function(e){
    	$(".img1").attr("src",e.target.result);
    	$(".d_img").val(e.target.result)
	};
	 $(".uploadCover").show();
    oReader.readAsDataURL(oFile);
}