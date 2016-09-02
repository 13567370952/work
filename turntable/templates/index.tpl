<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<title>多趣网三“蛋”活动，圣诞、多趣1生诞、元旦！11天狂欢3大惊喜，每天都有礼品免费秒杀！奖品拿到手软！</title>
<link type="text/css" href="static/css/style.css" rel="stylesheet" />
<script src="http://s0.static.duoqu.com/www/base/dj.js" type="text/javascript"></script>
<script type="text/javascript" src="static/js/jquery.min.js"></script>
</head>
<body>
<div class="main">
	<div class="header">
		<a href="http://www.duoqu.com/" class="logo" title="多趣网" target="_blank">多趣网</a>
	</div>
	<div class="content">
		<div class="flash" id="flash">
			<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="514" height="517" id="turnplate">
				<param name="allowScriptAccess" value="always" />
				<param name="movie" value="static/swf/prize1224.swf">
				<param name="menu" value="false">
				<param name="quality" value="high">
				<param name="wmode" value="transparent">
				<embed src="static/swf/prize1224.swf" width="514" height="517"  quality="high" id="turnplate" name="turnplate" wmode="transparent" allowScriptAccess="always"  pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed>
			</object>
		</div>
		<div class="regular">
			<p class="reg_hd">多趣三“蛋”大庆，又一劲爆活动！只要你登陆，就可以获得免费的抽奖机会，多趣币拿到手软！</p>
			<p class="reg_bd">
				1、登入活动页面，登录/注册多趣网用户。<br />
				2、绑定用户邮箱，方便奖励发放。<br />
				<span class="m3">3、每天登陆可以获得2次抽奖机会。</span><br />
				<span class="m3">4、分享活动链接，并且好友通过链接进入多趣网注册并<br />&nbsp;&nbsp;&nbsp;&nbsp;绑定邮箱后，用户即可获得1次转盘机会。</span><br />
				5、每天用户可以通过分享链接获得额外3次抽奖机会。<br />
				6、所获得的多趣币和多趣积分将于活动结束后的3个工作<br />&nbsp;&nbsp;&nbsp;&nbsp;日内发放至获奖用户的账户中。<br />
				7、活动最终解释权归多趣网所有。
			</p>
		</div>
		<div class="record1">
			{if $isLogin}
			<p class="p2" id="showUserName">
				<span>欢迎您 <b class="m1" data-info='{$userInfo}'>{$username}</b> </span>
				<a href="javascript:logout();" class="c2">登出</a>
			</p>
			{if count($prizeList) eq 0}
				<p class="p3">
					您还没有奖品哦~<br>
					快参与转盘游戏，大奖带回家！
				</p>
				{else}
				<!-- 登录中奖时 -->
				<div class="d1">
					<a href="javascript:void(0);" title="我的奖品" class="prize_link">我的奖品</a>
					<!--a href="javascript:void(0);" title="完善资料" class="info_link">完善资料</a-->
				</div>
				<ul class="u1">
					{foreach key="k" item="v" from=$prizeList}
					<li>{$v.prize} <span class="mark">{$v.card}</span></li>
					{/foreach}
				</ul>
            {/if}
			<p class="p5">
				您还可以抽奖 <span class="m1">{$times}</span> 次
			</p>
			{else}
			<form name="loginForm" id="loginForm" method="post"></form>
			{/if}
		</div>
		<div class="share1">
		{if $isLogin}
				<div class="bd_share">
					<!-- Baidu Button BEGIN -->
					<div id="bdshare" class="bdshare_b" style="line-height: 12px;width: 106px;height: 106px;opacity:0;filter: alpha(opacity=0);">
						<img src="http://bdimg.share.baidu.com/static/images/type-button-5.jpg?cdnversion=20120831" />
					</div>
					<script type="text/javascript" id="bdshare_js" data="type=button&amp;uid=200475" ></script>
					<script type="text/javascript" id="bdshell_js"></script>
					<script type="text/javascript">
					document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + Math.ceil(new Date()/3600000);
					</script>
					<!-- Baidu Button END -->		
				</div>		
				<p class="p7">分享本活动链接，获得更多抽奖机会</p>
				<p class="p8">一键分享到微博和社区</p>
				<p class="p9">或者直接将链接地址发给您的好友：</p>
				<p class="p10">
					<span class="c3" id="pUrl">{$shortUrl}</span>
					<br />
					<a href="javascript:void(0);"  class="c4" onclick="copyText('{$shortUrl}')">复制链接</a>
				</p>
		{else}
		    	<p class="p6">登录后分享本活动链接，<br />可获取更多抽奖机会</p>		
		{/if}
		</div>
	</div>
	<div class="content2">
		<div class="record2" id="recordList">
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
<script type="text/javascript" src="static/js/popupList.js?_t=20131224"></script>
<script type="text/javascript" src="static/js/common.js?_t=20131224"></script>
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