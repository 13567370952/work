<?php
header( "Content-type: text/html; charset=utf-8" );
header("cache-control:no-cache,must-revalidate");
set_time_limit(0);
error_reporting(E_ALL & ~E_NOTICE);
@ini_set('memory_limit', '128M');
require_once('require/config.php');
require_once('../../../libs/Smarty.class.php');
require_once('../../../libs/duoquAuth.class.php');
require_once('require/cls_mysql.php');
require_once('require/class_prize.php');
$smarty = new Smarty;

$db = new cls_mysql( DB_HOST, DB_USER, DB_PASSWORD, DB_NAME ) or die ('不能连接数据库');

writeLog('visit_times');

/*
 *分享验证
*/
if($_GET['u']){
    addChance($_GET['u']);
}

/*
 *登陆验证
*/
$user = DuoquAuth::getLoginUser();

if ( $user['uid'] > 0 ){
	$daytime = date('Ymd');
	$url = BASE_URL.'?u='.$user['username'];
    if(!$_COOKIE['short_url']){
		$shortUrl = getShortUrl($url);
		setcookie('short_url', $shortUrl);
	}else{
	    $shortUrl = $_COOKIE['short_url'];
	}
	$sql = "select count(*) from act_userinfo where username = '".$user['username']."'";
	$exist = $db->getOne($sql);
	if(!$exist){
		$sql = "insert into act_userinfo ( username , times , addtime , uptime ) values ( '".$user['username']."' , '".DEFAULT_CHANCE."' , '".time()."' ,'".time()."' ) ";
		$db->query($sql);
	}else{
		$sql = "select count(*) as total from act_chance where DATE_FORMAT(from_unixtime( addtime ),'%Y%m%d') = '".$daytime."' and username = '".$user['username']."'";
		$addChance = $db->getOne($sql);
		$newChance = $addChance > DAY_CHANCE?DAY_CHANCE:$addChance;
		$realChance = DEFAULT_CHANCE + $newChance;
	   	$sql = "update act_userinfo set times = IF( DATE_FORMAT(from_unixtime( uptime ),'%Y%m%d') = '".$daytime."', times, '".$realChance."' ) , uptime = '".time()."' where username = '".$user['username']."'";
		$db->query($sql); 
	}
	$sql = "select times from act_userinfo where username = '".$user['username']."' ";
	$times = $db->getOne($sql);
	$userInfo = json_encode(getUserInfo($user['username']));
    if($user['email_bind']){
		$prizeList = getPrizeList($user['username']);
		$smarty->assign("prizeList", $prizeList );

		$smarty->assign("bind", "已绑定" );

	}else{
	    $smarty->assign("bind", "未绑定" );
	}
	$bdate = strtotime(PRICE_BTIME);
    $years = date("Y",$bdate);
	$month = date("m",$bdate);
	$days = date("d",$bdate);
	$hours = date("H",$bdate);
	$smarty->assign("beginTime", "本活动将于 ".$years."年".$month."月".$days." 正式开始，敬请期待！" );
    $smarty->assign("userInfo", $userInfo );
	$smarty->assign("times", $times );
    $smarty->assign("shortUrl", $shortUrl );
	$smarty->assign("isLogin", true );
	$smarty->assign("username", $user['username'] );
}



/*
 *  得到短连接
 */
function getShortUrl($url){
	$sign = md5( $url.SHORT_URL_KEY );
    $postUrl = 'http://go.9wee.com/save?url='.$url.'&sign='.$sign;
	$result = file_get_contents( $postUrl );
	return $result;
}

/*
 * 推荐人增加抽奖机会
 */
function addChance($username){
	global $db;
	$ip = getIp();
	if(!$username) return false;
	$sql = "select count(*) from act_userinfo where username = '".$username."'";
	$count = $db->getOne($sql);
	if(!$count){
	    return false;
	}
	if(!get_magic_quotes_gpc()){
		$username = addslashes($username);
	}
	$daytime = date('Ymd');
	if($ip && $username){
		$sql = "insert into act_checkip ( ip , datetime ) values ( '".$ip."' , '".$daytime."' ) ";
		$rs = $db->query($sql);
		$sql = "select count(*) as total from act_chance where DATE_FORMAT(from_unixtime( addtime ),'%Y%m%d') = '".$daytime."' and username = '".$username."'";
		$addChance = $db->getOne($sql);
		if($rs && $addChance <= DAY_CHANCE){
		    $sql = "update act_userinfo set score = score + 1 , times = times + 1 where username = '".$username."'";
		    $db->query($sql);
			$sql = "insert into act_chance ( username , addtime ) values ( '".$username."' , '".time()."' ) ";
			$db->query($sql);
		}
	}
}

/*
 *  真实IP
 */
function getIp(){
	$ip=false;
	if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		$ips = explode (", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
		for ($i = 0; $i < count($ips); $i++) {
			if (!eregi ("^(10|172\.16|192\.168)\.", $ips[$i])) {
				$ip = $ips[$i];
				break;
			}
		}
	}
	return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
}

/*
 * 中奖用户
 */
function getPrizeUser(){
	global $db;
	$sql = "select * from act_advice_user where atime < ".time()." ORDER BY atime desc  limit 20";
	$data = $db->getAll($sql);
	foreach($data as $dk=>$dv){
	    $data[$dk]['username'] = substr($dv['username'] , 0 ,3).'****';
		$data[$dk]['prize'] = substr($dv['prize'] , 0 ,21).'...';
	} 
	return $data;
}

/*
 * 中奖信息
 */
function getPrizeList($username){
	global $db;
	$sql = "select * from act_advice where username = '".$username."'";
	$data = $db->getAll($sql);
	return $data;
}

/*
 * 个人信息
 */
function getUserInfo($username){
	global $db;
	$sql = "select pname as realname , mobile , email ,telephone from act_userinfo where username = '".$username."'";
	$data = $db->getRow($sql);
	return $data;
}

/*
 *  支持中文的encode方式
 */
function modifi_json_encode($data){
    $data = json_encode($data);
    return $data = preg_replace("#\\\u([0-9a-f]+)#ie", "iconv('UCS-2','UTF-8', pack('H4', '\\1'))", $data);
}


/*function writeLog($name){
	$time = date("Ymd",time());
	if(!is_dir('./log/'.$time)){
	    mkdir('./log/'.$time,755);
	}
	if(!is_file('./log/'.$time.'/'.$name.'.log')){
	    $count = 1;
	}else{
		$count = file_get_contents('./log/'.$time.'/'.$name.'.log');
		$count++;
	}
	file_put_contents('./log/'.$time.'/'.$name.'.log',$count);
}*/
function writeLog($name){
	return;

	$time = date("Ymd",time());
	if(!is_file('./log/'.$time.'_'.$name.'.log')){
	    $count = 1;
	}else{
		$count = file_get_contents('./log/'.$time.'_'.$name.'.log');
		$count++;
	}
	file_put_contents('./log/'.$time.'_'.$name.'.log',$count);
}
$prizeUser = getPrizeUser();

$smarty->assign("prizeUser", $prizeUser);

$smarty->display('index.tpl');


