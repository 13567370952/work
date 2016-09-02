<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<title>三“蛋”狂欢，11天惊喜不断</title>
<link type="text/css" href="static/css/default.css" rel="stylesheet" />
<script src="http://s0.static.duoqu.com/www/base/dj.js" type="text/javascript"></script>
<script type="text/javascript" src="static/js/jquery.min.js"></script>
</head>
<body>
<div class="main">
	<div class="header">
		<a href="http://www.duoqu.com/" class="logo" title="多趣网" target="_blank">多趣网</a>
	</div>
	<div class="content_01">
		<a href="index.php" target="_blank" class="nav_01" title="幸运大转盘">幸运大转盘</a>
		<a href="javascript:;" class="nav nav_02" value="02" title="1积分秒杀活动">1积分秒杀活动</a>
		<a href="javascript:;" class="nav nav_03" value="03" title="千积分游戏礼包大放送">千积分游戏礼包大放送</a>
	</div>
	<div class="content_02"></div>
	<div class="content_03">
		<div class="item_01">
			<a href="http://www.duoqu.com/mall/gift/index/id/2" title="秒杀礼品">秒杀礼品</a>
		</div>
		<div class="item_02">
			快去论坛分享你秒杀到了什么吧！还能和小伙伴们交换礼包哦！ <a href="http://bbs.duoqu.com/forum.php?mod=viewthread&tid=4156207&page=1&extra=#pid8291532" target="_blank">论坛链接>></a>
		</div>
		<div class="item_03" id="recordList">
			<ul class="record_item">
		        {foreach key="k" item="v" from=$prizeUser}
				<li>
					恭喜<span class="m2">{$v.username}</span>用户获得<span class="m2">{$v.prize}</span>
				</li>
				{/foreach}
			</ul>
		</div>
	</div>
</div>
<div class="actPop" id="actPop">
	<div id="maskPop" class="maskPop" style="display: none;"></div>
	<div class="regular regular_02" style="display: none;">
		<a href="javascript:void(0);" hidefocus="hidefocus" class="close" title="关闭">关闭</a>
	</div>
	<div class="regular regular_03" style="display: none;">
		<a href="javascript:void(0);" hidefocus="hidefocus" class="close" title="关闭">关闭</a>
		<a href="http://www.duoqu.com/game/prize/index" hidefocus="hidefocus" class="go" title="GO">GO</a>
	</div>
</div>
<script type="text/javascript">
	{literal}
	// 滚动
	function exScroll(opts) {
		if(!opts.id) return false;

		var id = opts.id,		
			height = opts.height || 30,
			delay = opts.delay || 1500,
			speed = opts.speed || 20,
			oldSpeed = speed,
			stop = false;
		
		var el = document.getElementById(id).children[0];
		if(!el) {
			return;
		} else {
			scrollHtml = el.innerHTML;
			el.style.height = "auto";
		}
			
		var parent = document.getElementById(id);
		if(parent.offsetHeight <= 0) {
			parent.style.overflowY = "hidden"; 
		}

		var fn = {
			initial: function(){
				var subElements = el.childNodes;

				for(var i=0;i<subElements.length;i++) {
					if(subElements[i].nodeType == 1) {
						if(subElements[i].offsetHeight <= 0) {
							subElements[i].style.height = height + "px";
							subElements[i].style.lineHeight = height + "px";
						} else {
							return;
						}
					}
				}
			},
			needScroll: function(){
				if(el.parentNode.offsetHeight > el.offsetHeight) {
					return false;
				}
				return true;
			},
			execute: function(){
				if(speed == 0) {  
					stop = true;  
				} else {  
					stop = false;  
				}
				
				intervalId = setInterval(fn.scroll, speed);
				
				if (!stop){
					el.style.marginTop = parseInt(el.style.marginTop) - 1 + "px";
				}
			},
			scroll: function(){
				if(parseInt(el.style.marginTop) % height != 0) {
					el.style.marginTop = parseInt(el.style.marginTop) - 1 + "px";
					if(Math.abs(parseInt(el.style.marginTop)) >= el.scrollHeight / 2) {
						el.style.marginTop = 0;
					}
				} else {
					intervalId && clearInterval(intervalId);
					setTimeout(fn.execute, delay);
				}
			},
			clearSpeed: function(){
				speed = 0;  
			},
			initSpeed: function(){  
				speed = oldSpeed;  
			}
		};

		for(var i in opts) {
			this[i] = opts[i];
		}
		for(var f in fn) {
			this[f] = fn[f];
		}

		this.initial();
		
		needScroll = this.needScroll();
		if(needScroll) {
			el.innerHTML += el.innerHTML;
			el.style.marginTop = 0;

			if(window.attachEvent) {
				el.attachEvent("onmouseover", this.clearSpeed);
				el.attachEvent("onmouseout", this.initSpeed);
			} else {
				el.addEventListener("mouseover", this.clearSpeed, false);
				el.addEventListener("mouseout", this.initSpeed, false);
			}
			
			setTimeout(this.execute, this.delay);
		}
	}

	$(function(){
		// 设置遮罩的宽高
		var $maskEl = $('#maskPop'),
			mw = document.body.clientWidth || document.documentElement.clientWidth,
			mh = document.body.scrollHeight || document.documentElement.scrollHeight,
			opts = {
				width: mw,
				height: mh
			};
		
		$maskEl.css(opts);
		
		$('a.nav').click(function(){
			var value = $(this).attr('value'),
				$elem = $('.regular_' + value),
				display = $elem.css('display');

			if (display == "none") {
				$maskEl.css('display', 'block');
				$elem.css('display', 'block');
			}

			return false;
		});
		
		$('.regular a.close').live('click', function(){			
			hidePop();
			return false;
		});

		function hidePop() {
			$maskEl.css('display', 'none');
			$('.regular').css('display', 'none');
		}

		// 右侧中奖滚动
		new exScroll({id: 'recordList', height: 48, speed: 24, delay: 4000});
	});
	{/literal}
</script>
<script type="text/javascript">
{literal}
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-23294646-8']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
{/literal}
</script>
</body>
</html>