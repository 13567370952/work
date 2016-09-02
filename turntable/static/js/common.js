var msg = {},
	scrollHtml = '',
	needScroll = false,
	intervalId = null,
	stringFormat = function(str, arr) {
		if (!str) return;
		if (!arr || arr && Object.prototype.toString.call(arr) != '[object Array]') return false;
		return str.replace(/\{(\d+)\}/g, function(m, i) {
			return arr[i];
		});
	},
	loginBefore = '',
	loginAfter = '';

// 转盘转动
function run() {
	var obj = eval('(' + $.ajax({
		url: "require/action.php?act=run",
		async: false
	}).responseText + ')');

	msg = obj;

	return msg.type;
}

function loginFormInit() {
	// 登录前Html
	loginBefore += '<p class="p1">登录多趣通行证，大奖在等你哦！</p>';
	loginBefore += '<dl>';
	loginBefore += '	<dt><label for="uname">通行证：</label></dt>';
	loginBefore += '	<dd>';
	loginBefore += '		<input type="text" name="username" value="" />';
	loginBefore += '	</dd>';
	loginBefore += '</dl>';
	loginBefore += '<dl>';
	loginBefore += '	<dt><label for="uname">密　码：</label></dt>';
	loginBefore += '	<dd>';
	loginBefore += '		<input type="password" name="password" />';
	loginBefore += '	</dd>';
	loginBefore += '</dl>';
	loginBefore += '<div class="btn1">';
	loginBefore += '	<input type="submit" name="smt" value="" onclick="return checkLogin(this);" />';
	loginBefore += '	<a href="javascript:void(0);" onclick="showWindow(41)">注册</a>';
	loginBefore += '</div>';

	dj.login.form = 'loginForm';
	dj.login.html = [loginBefore, loginAfter];
	dj.login.callback = function(ret) {
		if (ret.data && ret.data.error && ret.data.error > 0) {
			alert(ret.data.err_msg);
			return;
		}
		location.reload();
	};
	dj.login.init();

	//delLoginPopup();	
}

function logout() {
	dj.login.logout();
}

function delLoginPopup() {
	var elem = document.getElementById('dj-dlg-formLoginPopup'),
		maskEle = document.getElementsByClassName("dj_dialog_mask");

	elem && (elem.style.display = "none");
	maskEle[0] && (maskEle[0].style.display = "none");
}

// 滚动
function exScroll(opts) {
	if (!opts.id) return false;

	var id = opts.id,
		height = opts.height || 30,
		delay = opts.delay || 1500,
		speed = opts.speed || 20,
		oldSpeed = speed,
		stop = false;

	var el = document.getElementById(id).children[0];
	if (!el) {
		return;
	} else {
		scrollHtml = el.innerHTML;
		el.style.height = "auto";
	}

	var parent = document.getElementById(id);
	if (parent.offsetHeight <= 0) {
		parent.style.overflowY = "hidden";
	}

	var fn = {
		initial: function() {
			var subElements = el.childNodes;

			for (var i = 0; i < subElements.length; i++) {
				if (subElements[i].nodeType == 1) {
					if (subElements[i].offsetHeight <= 0) {
						subElements[i].style.height = height + "px";
						subElements[i].style.lineHeight = height + "px";
					} else {
						return;
					}
				}
			}
		},
		needScroll: function() {
			if (el.parentNode.offsetHeight > el.offsetHeight) {
				return false;
			}
			return true;
		},
		execute: function() {
			if (speed == 0) {
				stop = true;
			} else {
				stop = false;
			}

			intervalId = setInterval(fn.scroll, speed);

			if (!stop) {
				el.style.marginTop = parseInt(el.style.marginTop) - 1 + "px";
			}
		},
		scroll: function() {
			if (parseInt(el.style.marginTop) % height != 0) {
				el.style.marginTop = parseInt(el.style.marginTop) - 1 + "px";
				if (Math.abs(parseInt(el.style.marginTop)) >= el.scrollHeight / 2) {
					el.style.marginTop = 0;
				}
			} else {
				intervalId && clearInterval(intervalId);
				setTimeout(fn.execute, delay);
			}
		},
		clearSpeed: function() {
			speed = 0;
		},
		initSpeed: function() {
			speed = oldSpeed;
		}
	};

	for (var i in opts) {
		this[i] = opts[i];
	}
	for (var f in fn) {
		this[f] = fn[f];
	}

	this.initial();

	needScroll = this.needScroll();
	if (needScroll) {
		el.innerHTML += el.innerHTML;
		el.style.marginTop = 0;

		if (window.attachEvent) {
			el.attachEvent("onmouseover", this.clearSpeed);
			el.attachEvent("onmouseout", this.initSpeed);
		} else {
			el.addEventListener("mouseover", this.clearSpeed, false);
			el.addEventListener("mouseout", this.initSpeed, false);
		}

		setTimeout(this.execute, this.delay);
	}
}

// 显示对话框
function showPopup() {
	if ($('#flash .popup').length > 0) {
		return;
	}

	setTimeout(function() {
		// 登录
		if (msg.msg == 40) {
			alert("您还没有登录，请在转盘左下边的登录窗口登录！");
			$('#loginForm input[name=password]').select().focus();
			callExternalInterface();
			return;
		}

		var objHtml = stringFormat(popupList[msg.msg], msg.params),
			giftObj = $(objHtml).find('.gift'),
			cardObj = $(objHtml).find('.change_card'),
			giftHtml = '',
			cardHtml = '';

		if (giftObj.length > 0) {
			if (giftObj.attr('data-type') == 'card') {
				giftHtml = giftObj.html().replace('<span class="mark">', '').replace('</span>', '');
			} else {
				giftHtml = giftObj.html();
			}
		}

		if (cardObj.length > 0) {
			cardHtml = cardObj.html();
		}

		var aLink = $('#actLink').html();
		if (aLink != '') {
			objHtml = objHtml.replace('{LINK}', aLink);
		}

		$('#flash').append(objHtml);

		var infoObj = $('#flash .info');
		infoObj.length > 0 && fillInfo();

		if (giftHtml != '') {
			scrollHtml = '<dl><dt>' + msg.params[0] + '幸运玩家</dt><dd>获得' + giftHtml + '</dd></dl>' + scrollHtml;

			var dlObj = $('#recordList div.record_item dl'),
				dlParent = dlObj.parent();

			if (dlObj.length > 6) {
				dlParent.html(scrollHtml + scrollHtml).css('margin-top', '0px');
			} else {
				dlParent.html(scrollHtml);

				if (dlObj.length == 7 && !needScroll && !intervalId) {
					new exScroll({
						id: 'recordList',
						height: 44,
						speed: 20,
						delay: 4000
					});
				}
			}

			var p3 = $('.record1 .p3');
			if (p3.length > 0) {
				p3.replaceWith('<div class="d1"><a class="prize_link" title="我的奖品" href="javascript:void(0);">我的奖品</a></div><ul class="u1"></ul>');
			}

			$('.record1 .u1').append('<li>' + giftHtml + ' ' + cardHtml + '</li>');
		}

		if (msg.type != -1) {
			var val = parseInt($('.record1 .p5 .m1').text());
			val > 0 && $('.record1 .p5 .m1').text(val - 1);
		}
	}, 800);
}

// 打开弹出窗口
function showWindow(t) {
	t == 41 ? closeDialog() : closeWindow();
	$(popupList[t]).appendTo($('#flash'));

	if (t == 41) { //注册
		dj.register.checkItems = ['Username', 'Password', 'PasswordConfirm'];
		dj.register.checkScript = 'require/passport_check.php';
		dj.register.setVar('no_message', 1);
		dj.register.setVar('from', location.href.replace('?p=NoData', ''));
		dj.register.callback = function(ret) {
			if (ret.data.error > 0) {
				alert('注册失败：' + ret.data.err_msg);
			} else {
				location.reload();
			}
		}
		dj.register.init('formRegister');
	}
}

// 关闭弹出窗口
function closeWindow() {
	var obj = $('#flash .popup');
	if (obj.length > 0) {
		obj.remove();
	}
}

// 关闭弹出框
function closeDialog() {
	var $ele = $('.stargameDialogClose');
	$ele.length > 0 && $ele.click();
}

// 复制文本
function copyText(txt) {
	if (window.clipboardData) {
		window.clipboardData.clearData();
		window.clipboardData.setData("Text", txt);

		alert('复制成功！');
	} else if (navigator.userAgent.indexOf("Opera") != -1) {
		window.location = txt;
	} else if (window.netscape) {
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		} catch (e) {
			alert("您的firefox安全限制限制您进行剪贴板操作，请打开’about:config’将signed.applets.codebase_principal_support’设置为true’之后重试，相对路径为firefox根目录/greprefs/all.js");
			return false;
		}
		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);

		if (!clip) return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if (!trans) return;
		trans.addDataFlavor('text/unicode');

		var str = new Object();
		var len = new Object();
		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		var copytext = txt;
		str.data = copytext;

		trans.setTransferData("text/unicode", str, copytext.length * 2);
		var clipid = Components.interfaces.nsIClipboard;
		if (!clip) return false;
		clip.setData(trans, null, clipid.kGlobalClipboard);
	} else {
		alert("被浏览器拒绝，请切换至兼容模式或者手动复制。");
		return false;
	}
}

// 验证登录
function checkLogin(t) {
	var username = $(t).parents('#loginForm').find('input[name=username]'),
		password = $(t).parents('#loginForm').find('input[name=password]');

	if ($.trim(username.val()) == '') {
		alert('请输入通行证！');
		return false;
	} else if ($.trim(password.val()) == '') {
		alert('请输入密码！');
		return false;
	}

	return true;
}

// 改变状态
function callExternalInterface() {
	try {
		thisMovie("turnplate").changeState(true);
	} catch (e) {
		//TODO::
	}
}

//浏览器兼容访问DOM
function thisMovie(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[movieName];
	} else {
		return document[movieName];
	}
}

// 立即绑定邮箱
function doBind() {
	var obj = $('#emailBind');

	obj.parent().html(popupList[23]);
	obj.parents('.popup.bind').find('.popup_header a').remove();

	return true;
}

// 绑定遇到问题
function bindProb() {
	closeWindow();
	callExternalInterface();

	// window.open("http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzgwMDA3NTI1MF80NjgyMV84MDAwNzUyNTBfMl8", "_blank");

	return true;
}

// 填充资料
function fillInfo() {
	try {
		var dataObj = $('.record1 .p2 .m1').attr("data-info"),
			dataItem = {};

		if (dataObj) {
			dataItem = $.parseJSON(dataObj);
		}

		for (var i in dataItem) {
			$('.info input[name=' + i + ']').val(dataItem[i]);
		}
	} catch (e) {}
}

loginFormInit();

$(function() {
	// 设置遮罩的宽高
	var $maskEl = $('#maskPop'),
		mw = document.body.clientWidth || document.documentElement.clientWidth,
		mh = document.body.scrollHeight || document.documentElement.scrollHeight;

	$maskEl.css({
		width: mw,
		height: mh
	});

	// 点击关闭按钮
	$('.popup_header a').live('click', function() {
		var $ele = $(this).parents('.popup');
		$ele && $ele.remove();
		callExternalInterface();
	});

	// 查看奖品
	$('.prize_link').live('click', function() {
		showWindow(26);
		$('#prizeList').empty().append($('.record1 .u1').clone());
	});

	// 查看活动规则
	$('.nav_item4 a').live('click', function() {
		var $ele = $('#regularPop'),
			display = $ele.css('display');

		if (display == "none") {
			$maskEl.css('display', 'block');
			$ele.css('display', 'block');
		}

		return false;
	});

	// 关闭活动规则
	$('#regularPop .close').live('click', function() {
		var $ele = $(this).parent();

		$maskEl.css('display', 'none');
		$ele.css('display', 'none');

		return false;
	});

	// 完善资料
	$('.info_link').live('click', function() {
		showWindow(24);
		fillInfo();
	});

	// 右侧中奖滚动
	new exScroll({
		id: 'recordList',
		height: 46,
		speed: 23,
		delay: 4000
	});

	// 分享链接	
	var share = $('#bdshare'),
		url = $('#pUrl');

	if (share && url) {
		share.attr("data", "{ 'text':'多趣网三“蛋”活动，圣诞、多趣1生诞、元旦！11天狂欢3大惊喜，每天都有礼品免费秒杀！奖品拿到手软！@多趣网DUOQU', 'url':'" + url.text() + "' }");
	}
});