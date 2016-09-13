var current = "NewsList.html",
	menu = null,
	sub = null,
	main = null,
	showMenu = false,
	subpage = ["NewsList.html", "HotNews.html", "HotNews.html"],
	subpage_styles = {
		top: '45px',

		bottom: "50px"
	}
mui.init({
	preloadPages: [{
		id: "detail.html",
		url: "detail.html"
	}]
});
var myname;
mui.plusReady(function() {
	main = plus.webview.currentWebview();
	var first = null;
mui.back = function() {
	if (showMenu) {
		closeMenu();
	} else {
		//首次按键，提示‘再按一次退出应用’
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
	}
};
	
	
	//创建其他三个页面
	for (var i = 0; i < subpage.length; i++) {
		var sub = plus.webview.create(subpage[i],
			subpage[i],
			subpage_styles);
			if(i>0){
					sub.hide();
			}
	
		main.append(subpage);
	}
	mui("#muiBar").on("tap", "a", function() {
		var target = this.getAttribute("href");
		if (target != current) {
			plus.webview.show(target,"fade-in", 300);
plus.webview.hide(current);
			current = target;
		}
		//					alert(target);

	})

	plus.screen.lockOrientation("portrait-primary");
	
	main.addEventListener('maskClick', closeMenu);
	//处理侧滑导航，为了避免和子页面初始化等竞争资源，延迟加载侧滑页面；
	setTimeout(function() {
		menu = mui.preload({
			id: 'index-menu',
			url: 'Setting.html',
			styles: {
				left: 0,
				width: '80%',
				zindex: -1
			},
			show: {
				aniShow: 'none'
			}
		});
	}, 200);
});
	var isInTransition = false;
	/**
	 * 显示侧滑菜单
	 */
	function openMenu() {

		if (isInTransition) {
			return;
		}
		if (!showMenu) {
			//侧滑菜单处于隐藏状态，则立即显示出来；
			isInTransition = true;
			menu.setStyle({
				mask: 'rgba(0,0,0,0)'
			}); //menu设置透明遮罩防止点击
			menu.show('none', 0, function() {
				//主窗体开始侧滑并显示遮罩
				main.setStyle({
					mask: 'rgba(0,0,0,0.4)',
					left: '80%',
					transition: {
						duration: 150
					}
				});
				mui.later(function() {
					isInTransition = false;
					menu.setStyle({
						mask: "none"
					}); //移除menu的mask
				}, 160);
				showMenu = true;
			});
		}
	};
	/**
	 * 关闭菜单
	 */
	function closeMenu() {
		if (isInTransition) {
			return;
		}
		if (showMenu) {
			//关闭遮罩；
			//主窗体开始侧滑；
			isInTransition = true;
			main.setStyle({
				mask: 'none',
				left: '0',
				transition: {
					duration: 200
				}
			});
			showMenu = false;
			//等动画结束后，隐藏菜单webview，节省资源；
			mui.later(function() {
				isInTransition = false;
				menu.hide();
			}, 300);
		}
	};
	//点击左上角侧滑图标，打开侧滑菜单；
	document.querySelector('.mui-icon-bars').addEventListener('tap', function(e) {
		if (showMenu) {
			closeMenu();
		} else {
			openMenu();
		}
	});
	//敲击顶部导航，内容区回到顶部
	document.querySelector('header').addEventListener('doubletap', function() {
		main.children()[0].evalJS('mui.scrollTo(0, 100)');
	});
	//主界面向右滑动，若菜单未显示，则显示菜单；否则不做任何操作
	window.addEventListener("swiperight", openMenu);
	//主界面向左滑动，若菜单已显示，则关闭菜单；否则，不做任何操作；
	window.addEventListener("swipeleft", closeMenu);
	//侧滑菜单触发关闭菜单命令
	window.addEventListener("menu:close", closeMenu);
	window.addEventListener("menu:open", openMenu);
	//重写mui.menu方法，Android版本menu按键按下可自动打开、关闭侧滑菜单；
	mui.menu = function() {
		if (showMenu) {
			closeMenu();
		} else {
			openMenu();
		}
	}
