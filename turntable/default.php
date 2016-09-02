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
 *  支持中文的encode方式
 */
function modifi_json_encode($data){
    $data = json_encode($data);
    return $data = preg_replace("#\\\u([0-9a-f]+)#ie", "iconv('UCS-2','UTF-8', pack('H4', '\\1'))", $data);
}

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

$smarty->display('default.tpl');


