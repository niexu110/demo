$(function(){
	$("textarea").on("input",function(){
		$(".num").html($(this).val().length)
	})
	$("#file").on("change",function() {
	        var srcs = getObjectURL(this.files[0]);
	        var parentdiv=$('<div class="box"><img src="'+ srcs +'"/></div>');
	        $(".imgs").append(parentdiv);
	        if($(".imgs div").length > 3){
	        	$(".imgs div").eq(0).hide();
	        }
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
    $("#header span").on("click",function(){
    	if($("textarea").val() == "" || $(".text i").text == "请选择举报类型"){
    		return false;
    	}
    	$("#form").submit();
    })
})
	