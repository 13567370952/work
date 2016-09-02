var popupList = {
	// 恭喜中奖 1000积分 0
	0: '<div class="popup reward"><div class="popup_header"><h3>恭喜中奖</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>恭喜您获得 <b class="gift" >1000积分</b>。</p></div><div class="popup_footer"></div></div>',
	// 恭喜中奖 10积分 1
	1: '<div class="popup reward"><div class="popup_header"><h3>恭喜中奖</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>恭喜您获得 <b class="gift" >10积分</b>。</p></div><div class="popup_footer"></div></div>',
	// 恭喜中奖 1积分 2
	2: '<div class="popup reward"><div class="popup_header"><h3>恭喜中奖</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>恭喜您获得 <b class="gift" >1积分</b>。</p></div><div class="popup_footer"></div></div>',
	// 恭喜中奖 5趣币 3
	3: '<div class="popup reward"><div class="popup_header"><h3>恭喜中奖</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>恭喜您获得 <b class="gift" >5趣币</b>。</p></div><div class="popup_footer"></div></div>',
	// 恭喜中奖 30趣币 4
	4: '<div class="popup reward"><div class="popup_header"><h3>恭喜中奖</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>恭喜您获得 <b class="gift" >30趣币</b>。</p></div><div class="popup_footer"></div></div>',
	// 恭喜中奖 500趣币 5
	5: '<div class="popup reward"><div class="popup_header"><h3>恭喜中奖</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>恭喜您获得 <b class="gift">500趣币</b>。</p></div><div class="popup_footer"></div></div>',

	// 你已领取过该礼包 20
	20: '<div class="popup notice"><div class="popup_header"><h3>再接再厉</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>您已领取过该礼包，活动期间每帐号每种礼包限领一次哦~预祝您抽中其他奖品！！</p></div><div class="popup_footer"></div></div>',
	// 该礼包已发完 21
	21: '<div class="popup notice"><div class="popup_header"><h3>再接再厉</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>对不起，该礼包已经发完</p></div><div class="popup_footer"></div></div>',
	// 绑定邮箱1 22
	22: '<div class="popup bind"><div class="popup_header"><h3>绑定邮箱</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>请您先绑定邮箱，绑定后才可以抽奖～</p><a href="http://www.duoqu.com/user/info/index#email" target="_blank" class="a3" id="emailBind" onclick="return doBind();">立即绑定邮箱</a></div><div class="popup_footer"></div></div>',
	// 绑定邮箱2 23
	23: '<p>请您先绑定邮箱，绑定后才可以抽奖～</p><div class="b1"><a href="javascript:void(0);" class="a1_clicked" title="我已绑定邮箱" onclick="location.reload();">我已绑定邮箱</a><a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDA3NTI1MF80NjgyMV84MDAwNzUyNTBfMl8" class="a2" target="_blank" onclick="return bindProb();">绑定遇到问题</a></div>',
	// 完善个人资料1 24
	24: '<div class="popup info"><div class="popup_header"><h3>完善信息</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><form><dl><dt><label for="realname">姓名</label></dt><dd><input type="text" name="realname" class="t1" /></dd></dl><dl><dt><label for="mobile">充值手机号码</label></dt><dd><input type="text" name="mobile" class="t1" />		</dd></dl><dl><dt><label for="email">邮箱</label></dt><dd><input type="text" name="email" class="t1" /></dd></dl><dl><dt><label for="telephone">联系电话</label></dt><dd><input type="text" name="telephone" class="t1" /></dd></dl><dl class="btn3"><dt></dt><dd><input type="button" name="info_submit" value="" onclick="checkInfo1();" /></dd></dl></form></div><div class="popup_footer"></div></div>',
	// 完善个人资料2 25
	25: '<div class="popup info"><div class="popup_header"><h3>完善信息</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><form><dl><dt><label for="realname">收货人</label></dt><dd><input type="text" name="realname" class="t1" /></dd></dl><dl><dt><label for="address">收货地址</label></dt><dd><input type="text" name="address" class="t1" />		</dd></dl><dl><dt><label for="post">邮编</label></dt><dd><input type="text" name="post" class="t1" /></dd></dl><dl><dt><label for="telephone">联系电话</label></dt><dd><input type="text" name="telephone" class="t1" /></dd></dl><dl class="btn3"><dt></dt><dd><input type="button" name="info_submit" value="" onclick="checkInfo2();" /></dd></dl></form></div><div class="popup_footer"></div></div>',
	// 我的奖品 26
	26: '<div class="popup prize"><div class="popup_header"><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>恭喜您已获得如下奖品</p><div class="prize_list" id="prizeList"></div></div><div class="popup_footer"></div></div>',

	// 活动还未开始 30
	30: '<div class="popup notice"><div class="popup_header"><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>本活动将于 {0} 正式开始，敬请期待！</p></div><div class="popup_footer"></div></div>',
	// 活动调整 31
	31: '<div class="popup notice"><div class="popup_header"><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>活动调整中，将于 2013年7月16日 9:30 重新开放！</p></div><div class="popup_footer"></div></div>',
	// 活动已结束 32
	32: '<div class="popup notice"><div class="popup_header"><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>很抱歉，本活动已经结束，欢迎下次再来！</p></div><div class="popup_footer"></div></div>',

	// 快速登录 40
	40: '<div class="popup login"><div class="popup_header"><h3>快速登录</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>立即登录九维通行证，大奖在等你哦！</p><form name="loginForm" id="loginForm" method="post"><dl><dt><label for="name">通行证：</label></dt><dd><input type="text" name="username" value="" /></dd></dl><dl><dt><label for="password">密　码：</label></dt><dd><input type="password" name="password" /></dd></dl><div class="btn"><input type="submit" name="submit" value="" onclick="return checkLogin(this);" /><a href="javascript:void(0);" onclick="showWindow(41)">注册</a></div></form></div><div class="popup_footer"></div></div>',
	// 注册 41
	41: '<div class="popup register"><div class="popup_header"><h3>注册通行证</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><form method="post" id="formRegister"><dl><dt><label for="username">用户名</label></dt><dd><input type="text" name="username" class="t1" /><span id="tipUsername"></span></dd></dl><dl><dt><label for="password">密码</label></dt><dd><input type="password" name="password" class="t1" /><span id="tipPassword"></span></dd></dl><dl><dt><label for="passwordcfm">确认密码</label></dt><dd><input type="password" name="passwordcfm" class="t1" /><span id="tipPasswordConfirm"></span></dd></dl><dl class="btn3"><dt></dt><dd><input type="submit" class="reg_btn" value="注册" /></dd></dl></form></div><div class="popup_footer"></div></div>',

	// 一键分享 50
	50: '<div class="popup share"><div class="popup_header"><h3>一键分享</h3><a href="javascript:void(0);">关闭</a></div><div class="popup_box"><p>您今日的抽奖机会已经用完，<br />您可以通过以下方式获得更多抽奖机会：<br />1) 您的帐号每天都会免费获赠<span class="mark"> 2 次</span>抽奖机会<br />2) 使用右侧分享按钮分享链接到您的微博、空间或好友，可以额外获得更多抽奖机会。</p><p class="fs11">您的每位朋友访问您分享的链接可立即为您<span class="mark">增加 1 次</span>抽奖机会<br />每日通过分享获得不超过 3 次的抽奖机会</p></div><div class="popup_footer"></div></div>'
};