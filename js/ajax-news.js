var data1;
function AjaxJquery(){
	$.ajax({
		type:"get",
		url:"http://apis.baidu.com/songshuxiansheng/news/news",
		async:false,
		timeout: 10000,
		headers: {
			"apikey": "d91c7b1ed6466f69e1a5acbf2daa7f12"
		},
		dataType: "json", 
		success:function(response) {

			data1 = mui.parseJSON(JSON.stringify(response));
			//alert("Ajax+"+data1);
	
		},
		error:function(e){
			mui.confirm("請求失敗，請檢查網絡。","網絡錯誤");
		}
	});
}
function Ajax() {
	var url = "http://apis.baidu.com/songshuxiansheng/news/news";
	mui.ajax(url, {
		type: "GET",
		//预期服务器范围的数据类型
		dataType: "json",
		
		headers: {
			"apikey": "d91c7b1ed6466f69e1a5acbf2daa7f12"
		},
		timeout: 10000, //超时时间设置为10秒； 
		success: function(response) {

			data1 = mui.parseJSON(JSON.stringify(response));
			//alert("Ajax+"+data1);
	
		}
	})
}