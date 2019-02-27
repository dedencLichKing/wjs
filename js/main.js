
















//自定义的js文件
$(function() {
	//当文档加载完成才会执行
	
	
	//根据屏幕宽度的变化决定轮播图片应该展示什么
	function resize() {
		//获取屏幕宽度
		var windowWidth = $(window).width();
		//判断屏幕属于大还是小
		var isSmallScreen = windowWidth < 768;
		//根据大小为界面上的每一张轮播图设置背景
		//$("#main-ad > .carousel-inner > .item")//获取到的是一个DOM数组
	
		$("#main-ad > .carousel-inner > .item").each(function(i, item) {
			//因为获取的是dom对象 需要转换成jquery对象
			var $item = $(item);
			//$element.data() 是一个函数，专门用于取元素上自定义属性(data-abc)
			//函数的参数是我们要取得属性名称(abc)
			var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
			//因为我们需要小图时等比例变换，所以小图时使用img标签的方式
			$item.css("backgroundImage", 'url(' + imgSrc + ')');
			
			if (isSmallScreen) {
				$item.html('<img src=' + imgSrc + ' alt=""/>');
			}else {
				$item.empty();
			}
		});
	};
	
	//让window对象立即触发一下resize
	$(window).on("resize", resize).trigger("resize");
	
	//初始化tooltips插件
	$('[data-toggle="tooltip"]').tooltip();
	
	//控制标签页的标签宽度
	var $ulContainer = $(".nav-tabs");
	//获取所有子元素的宽度的和
	//因为原本ul上面有padding-left
	var width = 30;
	//遍历子元素
	$ulContainer.children("li").each(function(index, element) {
		
		width += element.clientWidth;
	});
	
	//判断当前ul的宽度是否超出屏幕，如果超出就显示横向滚动条
	if (width > $(window).width()) {
		//此时width等于所有li宽度的和
		$ulContainer.css("width", width).parent().css("overflow-x", "scroll");
	}
	
	var $newsTitle = $(".news-title");
	//给每一个a注册点击事件
	$("#news .nav-pills a").on("click", function() {
		//获取当前点击元素
		var $this = $(this);
		//获取对应的title值
		var title = $this.data("title");
		//将title设置到相应的位置
		$newsTitle.text(title);
	});
	
	
	//1.获取手指在轮播图元素上的一个滑动方向
	
	//获取界面上的轮播图容器
	var $carousels = $(".carousel");
	var startX, endX;
	var offset = 50;
	//注册滑动事件
	$carousels.on("touchstart", function(e) {
		//手指触摸开始时记录一下手指所在的坐标
		startX = e.originalEvent.touches[0].clientX;
//		console.log(startX);
	});
	
	$carousels.on("touchmove", function(e) {
		//重复赋值
		endX = e.originalEvent.touches[0].clientX;
//		console.log(endX);
	});
	
	$carousels.on("touchend", function(e) {
		//结束触摸一瞬间记录最后的手指所在的X
		//比大小
		console.log(endX);
		//控制精度，获取每次运动的距离，当距离大于一定值时认为是有方向变化
		var distance = Math.abs(startX - endX);
		if (distance > offset) {
			//有方向变化
			console.log(startX > endX ? "左边" : "右边");
			//2.根据获得到的方向选择上一张或者下一张
			// 	- 根据原生的carousel方法实现
			$(this).carousel(startX > endX ? "next" : "prev");
		}
	});
	
	
	
	
	
	
});
