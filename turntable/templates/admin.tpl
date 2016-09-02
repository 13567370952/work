<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<title>活动管理</title>
<style>
body { margin: 10px; }
body, ul, li, p, th, td, input, select { font-size: 12px; font-family: "verdana" }
form, ul { list-style: none; margin: 0; padding: 0; }
ul#nav { float:left; width: 100%; padding: 10px; border-bottom: 1px solid #ddd; }
ul#nav li { margin-right: 30px; float: left; }
#main { float:left; padding: 10px; }
a { color: #336699; }
a:hover { color: #c80000; }
.high a { font-weight: bold; color: #c80000; }
table { border-collapse:collapse; }
th { text-align: left; padding: 4px; margin: 0; border-bottom: 1px solid #f0f0f0; }
td { padding: 4px; margin: 0; border-bottom: 1px solid #f0f0f0; }
th.c, td.c { text-align: center; }
th.r, td.r { text-align: right; }
input { padding: 2px 4px 2px 4px; }
#import_card { position: absolute; z-index: 9; background-color: #fff; border: 2px solid #ddd; width: 500px; height: 160px; left: 50%; top: 40%; margin-top: -80px; margin-left: -250px; }
</style>
</head>
<body>
<ul id="nav">
	{{if $installed}}
	<li><a href="#0" onclick="run(this)">礼包管理</a></li>
	<li><a href="#1" onclick="run(this)">修改配置</a></li>
	<li><a href="#2" onclick="run(this)">修改密码</a></li>
	{{else}}
	<li><a href="#0" onclick="run(this)">安装活动</a></li>
	{{/if}}
</ul>

<div id="main">

	{{if $installed}}
	<form method="post" style="display:none" onsubmit="return checkPrize(this)">
		<input type="hidden" name="act" value="prize" />
		<table id="prize">
			<tr>
				<th class="c" width="70">礼包ID</th><th width="90">礼包名称</th><th class="c"  width="70">出奖概率</th><th class="c"  width="150">每日限额（-1 表示无限）</th><th class="c"  width="100">是否获得卡号</th><th class="r">中奖人数</th><th class="r">剩余卡号</th><th></th>
			</tr>
			{{foreach from=$prize item="v"}}
			<tr>
				<td class="c">{{$v.pid}}</td>
				<td><input type="text" name="prize[{{$v.pid}}][pname]" size="15" value="{{$v.pname}}" /></td>
				<td class="c"><input type="text" name="prize[{{$v.pid}}][rate]" size="4" value="{{$v.rate}}" /></td>
				<td class="c"><input type="text" name="prize[{{$v.pid}}][plimit]" size="4" value="{{$v.plimit}}" /></td>
				<td class="c"><select name="prize[{{$v.pid}}][usecard]"><option value="1"{{if $v.usecard}} selected{{/if}}>是</option><option value="0"{{if !$v.usecard}} selected{{/if}}>否</option></select></td>
				<td class="r">{{$prizeNum[$v.pid]|default:0}}</td>
				<td class="r">{{if $v.usecard}}{{$cardNum[$v.pid]|default:0}}{{else}}--{{/if}}</td>
				<td><a href="?act=export_prize&pid={{$v.pid}}">导出中奖记录</a>
					{{if $v.usecard}} | <a href="javascript:void(0)" onclick="importCard({{$v.pid}},'{{$v.pname}}');">导入卡号</a>
					 | <a href="?act=clear_card&pid={{$v.pid}}" onclick="return confirm('确定要清空该礼包的所有卡号吗？请谨慎操作！')">清空卡号</a>
					{{/if}}
					| <a href="?act=remove&pid={{$v.pid}}" onclick="return confirm('删除礼包将清除所有礼包卡号和中奖信息，请谨慎操作！')">删除</a>
				</td>
			</tr>
			{{/foreach}}
		</table>
		<div id="new_prize"></div>
		<div style="padding: 5px"><input type="submit" value="保存修改" /> <input type="button" value="新增礼包" onclick="addPrize()" /> <input type="button" value="导出所有中奖记录" onclick="window.location.href = '?act=export_prize'" /></div>
	</form>

	<form method="post" style="display:none">
		<input type="hidden" name="act" value="config" />
		<table>
			<tr>
				<td class="r">活动开始时间：</td><td><input type="text" name="PRICE_BTIME" value="{{$config.PRICE_BTIME}}" /> （格式：YYYY-mm-dd HH:MM）</td>
			</tr>
			<tr>
				<td class="r">活动结束时间：</td><td><input type="text" name="PRICE_OTIME" value="{{$config.PRICE_OTIME}}" /> （格式：YYYY-mm-dd HH:MM）</td>
			</tr>
			<tr>
				<td class="r">每日抽奖次数：</td><td><input type="text" name="DEFAULT_CHANCE" value="{{$config.DEFAULT_CHANCE}}" /></td>
			</tr>
			<tr>
				<td class="r">每日邀请增加次数：</td><td><input type="text" name="DAY_CHANCE" value="{{$config.DAY_CHANCE}}" /></td>
			</tr>
			<tr>
				<td class="r">分享链接地址：</td><td><input type="text" name="BASE_URL" value="{{$config.BASE_URL}}" size="80" /></td>
			</tr>
			<tr>
				<td class="r"></td><td><input type="submit" value="保存修改" /></td>
			<tr>
		</table>
	</form>

	<form method="post" style="display:none" onsubmit="if ( this.ADM_PSW.value == '' ) { this.ADM_PSW.focus(); return false; }">
		<input type="hidden" name="act" value="password" />
		<table>
			<tr>
				<td class="r">管理帐号：</td><td><input type="text" name="ADM_USER" value="{{$config.ADM_USER}}" /></td>
			</tr>
			<tr>
				<td class="r">管理密码：</td><td><input type="text" name="ADM_PSW" value="" /></td>
			</tr>
			<tr>
				<td class="r"></td><td><input type="submit" value="保存修改" /></td>
			<tr>
		</table>
	</form>

	{{else}}
	<form method="post" style="display:none">
		<input type="hidden" name="act" value="install" />
		<table>
			<tr>
				<td class="r">MySQL 地址：</td><td><input type="text" name="DB_HOST" value="{{$config.DB_HOST}}" /></td>
			</tr>
			<tr>
				<td class="r">MySQL 用户：</td><td><input type="text" name="DB_USER" value="{{$config.DB_USER}}" /></td>
			</tr>
			<tr>
				<td class="r">MySQL 密码：</td><td><input type="text" name="DB_PASSWORD" value="{{$config.DB_PASSWORD}}" /></td>
			</tr>
			<tr>
				<td class="r">MySQL 数据库名：</td><td><input type="text" name="DB_NAME" value="{{$config.DB_NAME}}" /></td>
			</tr>
			<tr>
				<td class="r"></td><td><input type="submit" value="保存修改" /></td>
			<tr>
		</table>
	</form>
	{{/if}}
</div>

<form method="post" enctype="multipart/form-data" id="import_card" style="display:none">
	<input type="hidden" name="act" value="import_card" />
	<input type="hidden" name="pid" value="" />
	<table width="100%">
		<tr>
			<td class="c" colspan="2" style="color:#336699; font-weight:bold; font-size: 14px;" height="40">为【<span id="import_card_pname"></span>】（ID：<span id="import_card_pid"></span>）导入卡号</td>
		</tr>
		<tr>
			<td class="r" width="30%">选择卡号文件：</td><td><input type="file" name="card" value="" /></td>
		</tr>
		<tr>
			<td class="c" colspan="2" height="40" style="color: #c80000;">提示：卡号文件必须为文本格式，每行一个卡号</td>
		</tr>
		<tr>
			<td class="c" colspan="2"><input type="submit" value="开始导入" /> <input type="button" value="取消" onclick="importCardClose()" /></td>
		<tr>
	</table>
</form>

<script type="text/javascript">
function importCard( pid, pname )
{
	var ob = document.getElementById( 'import_card' );
	document.getElementById( 'import_card_pid' ).innerHTML = pid;
	document.getElementById( 'import_card_pname' ).innerHTML = pname;
	ob.pid.value = pid;
	ob.style.display = '';
}

function importCardClose()
{
	document.getElementById( 'import_card' ).style.display = 'none';
}

function addPrize()
{
	var html = [];
	html.push( 	'<table><tr>' );
	html.push( 	'<td class="c" width="70"><input type="text" name="newPrize[pid][]" size="3" /></td>' );
	html.push( 	'<td class="c" width="90"><input type="text" name="newPrize[pname][]" size="15" /></td>' );
	html.push( 	'<td class="c" width="70"><input type="text" name="newPrize[rate][]" size="4" /></td>' );
	html.push( 	'<td class="c" width="150"><input type="text" name="newPrize[plimit][]" size="4" /></td>' );
	html.push( 	'<td class="c" width="100"><select name="newPrize[usecard][]"><option value="1">是</option><option value="0">否</option></select></td>' );
	html.push( 	'<td><a href="javascript:void(0)" onclick="this.parentNode.parentNode.parentNode.removeChild( this.parentNode.parentNode );">取消</a></td>' );
	html.push( '</tr></table>' );
	html = html.join( '' );

	var prize = document.getElementById( 'new_prize' );
	var tr = document.createElement( 'div' );
	tr.innerHTML = html;
	prize.appendChild( tr );
}

function checkPrize( form )
{
	var inputs = form.getElementsByTagName( 'input' );
	for ( var i = 0; i < inputs.length; i ++ )
	{
		if ( inputs[i].value == '' )
		{
			alert( '请填写完整礼包信息！' );
			inputs[i].focus();
			return false;
		}
	}
	return true;
}

function run(ob)
{
	var nav = document.getElementById( 'nav' );
	var main = document.getElementById( 'main' );
	var li = nav.getElementsByTagName( 'li' );
	var form = document.getElementsByTagName( 'form' );
	var idx;

	if ( ob == undefined )
	{
		idx = parseInt( window.location.hash.substring( 1 ) );
		if ( isNaN( idx ) || !form[idx] ) idx = 0;
	}
	else
	{
		var href = ob.getAttribute( 'href' );
		idx = href.substring( href.indexOf( '#' ) + 1 );
	}

	for ( var i = 0; i < li.length; i ++ )
	{
		li[i].className = '';
		form[i].style.display = 'none';
	}

	li[idx].className = 'high';
	form[idx].style.display = '';
}

run();
</script>
</body>
</html>