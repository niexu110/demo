$(function(){
	//图片
	$("#filepath").on("change",function() {
        var srcs = getObjectURL(this.files[0]);
        $(".photo img").attr("src",srcs);
        $(".uploadCover").show()
    })
	function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file)
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
        }
        return url;
    };
    //按钮
    $("#btn").on("click",function(){
    	var url = "../../image/img/upload.png";
    	var src = $(".photo img").attr("src");
    	var text = $("input[type='text']").val();
    	if(src == url || text == ""){
    		return false;
    	}
    })
})
