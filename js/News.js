mui.init({
	gestures:{
		swipe:true
	}
})

(function($) {
	//阻尼系数
	var deceleration = mui.os.ios ? 0.003 : 0.0009;
	$('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration: deceleration
	});
	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				down: {
					callback: function() {
						var self = this;
						Ajax();
						setTimeout(function() {
							var ul = self.element.querySelector('.mui-table-view');
							ul.insertBefore(createFragment(ul, index, 5, true), ul.firstChild);
							self.endPullDownToRefresh();
						}, 1000);
					}
				},
				up: {
					callback: function() {
						var self = this;
							Ajax();
						setTimeout(function() {
						
							var ul = self.element.querySelector('.mui-table-view');
							ul.appendChild(createFragment(ul, index, 5));
							self.endPullUpToRefresh();
						}, 1000);
					}
				}
			});
		});
		var createFragment = function(ul, index, count, reverse) {
			var length = ul.querySelectorAll('li').length;
			var fragment = document.createDocumentFragment();
			var li;
//			Ajax();
			//alert("Pull+"+data1);
			for (var i = 0; i < count; i++) {
				li = document.createElement('li');
				li.className = 'mui-table-view-cell mui-media';
			
				var img = document.createElement('img');
				img.className = "mui-media-object mui-pull-left";
				var a=document.createElement("a");
				var div = document.createElement("div");
				div.className = "mui-media-body";
				var p = document.createElement("p");
				p.className = "mui-ellipsis";		
					mui.each(data1.retData[i], function(index, item) {
					if(index==="image_url"){if(item==""){img.src="imgs/news.png"}else{img.src=item;} }
					if(index==='title'){div.innerText = item;}
					if(index==="abstract"){p.innerHTML=item;}
					if(index==="url"){a.href=item}
				});				
				div.appendChild(p);
				
				a.appendChild(img);
				a.appendChild(div)
li.appendChild(a);
				fragment.appendChild(li);
			}
			return fragment;
		};
	});
})(mui);
//setTimeout(Ajax,0);
mui.ready(function(){
	function JudgeLiIsNull(){
 //	alert(1);
 	//var sh= plus.nativeUI.showWaiting();
 	var ni=document.querySelector(".mui-active").getAttribute("href");
	var itemDiv = document.getElementById(ni.slice(1));
	var ul=itemDiv.querySelector("ul");
	//for(var i=0;i<ul.length;i++){
		
		var length = itemDiv.querySelectorAll('li').length;
		if(length<10){
			AjaxJquery();
			var fragment = document.createDocumentFragment();
			var li;
			for (var n = 0; n < 5; n++) {
				li = document.createElement('li');
				li.className = 'mui-table-view-cell mui-media';
				var a=document.createElement("a");
				var img = document.createElement('img');
				img.className = "mui-media-object mui-pull-left";
				var div = document.createElement("div");
				div.className = "mui-media-body";
				var p = document.createElement("p");
				p.className = "mui-ellipsis";		
					mui.each(data1.retData[n], function(index, item) {
					if(index==="image_url"){if(item==""){img.src="imgs/news.png"}else{img.src=item;} }
					if(index==='title'){div.innerText = item;}
					if(index==="abstract"){p.innerHTML=item;}
					if(index==="url"){a.href=item}
				});
				div.appendChild(p);
				a.appendChild(img);
				a.appendChild(div)
				li.appendChild(a);
					fragment.appendChild(li);
				ul.insertBefore(fragment,ul.firstChild);
				//sh.close();
			}
	}	
}
 JudgeLiIsNull(); JudgeLiIsNull();
	mui.plusReady(function(){
				mui(".mui-slider-group").on("tap","a",function(){
				var newsid=this.getAttribute("href");
				var detail=plus.webview.getWebviewById("detail.html");
				mui.fire(detail,"showNews",{id:newsid});
				detail.show(
					"slide-in-right",150
				)

		});
		var first = null;
mui.back = function() {
		//首次按键，提示‘再按一次退出应用’ HNews
		if (!first) {
			first = new Date().getTime();
			mui.toast('再按一次退出应用');
			setTimeout(function() {
				first = null;
			}, 1000);
		} else {
			if (new Date().getTime() - first < 1000) {
				plus.runtime.quit();
			}
		}
};
document.getElementById('slider').addEventListener('slide', function(event) {

  var sw=plus.nativeUI.showWaiting("正在加載...",{});
  JudgeLiIsNull(); JudgeLiIsNull();
  sw.close();
});
})
	
	
})
 