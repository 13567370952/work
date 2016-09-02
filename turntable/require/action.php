<?php
header( "Content-type: text/html; charset=utf-8" );
header("cache-control:no-cache,must-revalidate");
set_time_limit(0);
error_reporting(E_ALL & ~E_NOTICE);
@ini_set('memory_limit', '128M');
require_once('./config.php');
require_once('../../../../libs/Smarty.class.php');
require_once('../../../../libs/duoquAuth.class.php');
require_once('./cls_mysql.php');
require_once('./class_prize.php');
$smarty = new Smarty;

$user = DuoquAuth::getLoginUser();

if($user){
	if(!get_magic_quotes_gpc()){
		$user['uid'] = addslashes($user['uid']);
		$user['username'] = addslashes($user['username']);
		$user['email_bind'] = addslashes($user['email_bind']);
	}
}

$db = new cls_mysql( DB_HOST, DB_USER, DB_PASSWORD, DB_NAME ) or die ('不能连接数据库');

/*
 *更新个人信息
*/
if($_GET['ac'] == 'update' ){
    if(updatePerson($_POST,$user['username'])){
		$upMsg['success'] = true; 
	    echo json_encode($upMsg);
	}else{
		$upMsg['success'] = false; 
		echo json_encode($upMsg);
	}
	exit;
}

/*
 *抽奖开始
*/
if($_GET['ac'] == 'reg' ){
    showMessage(40);
}

if($_GET['act'] == 'run'){
	writeLog('run_times');
	if ( !$user['uid'] ){
		showMessage(40);
	}
    if(!$user['email_bind']){
	    showMessage(22);
	}
	$sql = "select times from act_userinfo where username = '".$user['username']."'";
	$times = $db->getOne($sql);
	if(!$times){
	    showMessage(50);
	}
    $objPrize = new Prize($db,$user['username']);
	$prizeInfo = $objPrize->prizeInfo;
	if($prizeInfo && $user['username']){
		$card = sendPrize($prizeInfo['pid'],$user['username'],$prizeInfo['usecard']);
	    $sql = "insert into act_advice ( username , pid , prize , atime ) values ( '".$user['username']."' , '".$prizeInfo['pid']."' ,'".$prizeInfo['pname']."' ,'".time()."')";
		if($db->query($sql)){
			if( $card ){
				$sql = "update act_card set status = 1,username='".$user['username']."',time='".time()."' where card = '".$card."'";
		        $db->query($sql);
				$sql = "update act_advice set card = '".$card."' where username = '".$user['username']."' and pid = '".$prizeInfo['pid']."'";
				$db->query($sql);
			}
            $sql = "insert into act_advice_user ( username , pid , prize , card ,atime ) values ( '".$user['username']."' , '".$prizeInfo['pid']."' ,'".$prizeInfo['pname']."','".$card."' ,'".time()."')";
			$db->query($sql);
		    showMessage($prizeInfo['pid'], array($user['username'],$card,$prizeInfo['pname']));
		}else{

		    showMessage($prizeInfo['pid'],array(),1);
		}
		unset($card);
	}
}


/*
 *  礼包奖品发放
 */
function sendPrize($type,$username,$usecard){
	global $db;
	if(!$usecard){
	    return false;
	}
    $sql = "select card from act_card where status = 0 and type = '".$type."'";
    $cards = $db->getAll($sql);
	if($cards){
	    foreach($cards as $ck => $cv){
		    $card[] = $cv['card'];
		}
		$key = array_rand($card , 1);

		return $card[$key];
	}
    showMessage($type,array(),2);
}

/*
 *  支持中文的encode方式
 */
function modifi_json_encode($data){
    $data = json_encode($data);
    return $data = preg_replace("#\\\u([0-9a-f]+)#ie", "iconv('UCS-2','UTF-8', pack('H4', '\\1'))", $data);
}

/*
 *  消息提示
 */
function showMessage($type,$params=array(),$method=0){   
    $utype = $type;
	$msg = getMessage($utype,$username,$card,$method);
	$arr = array(
		'msg' => $msg,
		'type' => $utype,
		'params' => $params,
	);
	echo json_encode($arr);
	exit;
}

/*
 *  得到MESSAGE
 */
function getMessage(&$utype,$username,$card,$method=0){
	switch($utype){
		case 0:
			$msg = 0;
			break;
		case 1:
			$msg = 1;
			break;
		case 2:
			$msg = 2;
			break;
		case 3:
			$msg = 3;
			break;
		case 4:
			$msg = 4;
			break;
		case 5:
			$msg = 5;
		    break;
		case 6:
			$msg = 6;
			break;
		case 7:
			$msg = 7;
			break;
		case 8:
			$msg = 8;
			break;
		case 9:
			$msg = 9;
			break;
		case 10:
			$msg = 10;
			break;
		case 11:
			$msg = 11;
			break;
		case 40:
			$msg = 40;
		    $utype = -1;
			break;
		case 22:
			$msg = 22;
		    $utype = -1;
			break;
		case 50:
			$msg = 50;
		    $utype = -1;
			break;
	    case 10:
			$msg = 21;
		    $utype = -1;
			break;
		case 11:
			$msg = 30;
		    $utype = -1;
			break;
		case 13:
			$msg = 32;
		    $utype = -1;
			break;
	}
	if($method == 1){
	    $msg = 20;
	}
	if($method == 2){
	    $msg = 21;
	}
	return $msg;
}

/*
 * 更新个人信息
 */
function updatePerson($_POST,$username){
	global $db;
	if(!$username) return false;
	if(!$_POST['realname']) return false;
	if(!get_magic_quotes_gpc()){
		$realname = addslashes($_POST['realname']);
		$mobile = addslashes($_POST['mobile']);
		$email = addslashes($_POST['email']);
		$telephone = addslashes($_POST['telephone']);
	}else{
		$realname = $_POST['realname'];
		$mobile = $_POST['mobile'];
		$email = $_POST['email'];
		$telephone = $_POST['telephone'];
	}
	$sql = "update act_userinfo set pname = '".htmlspecialchars($realname)."', mobile = '".htmlspecialchars($mobile)."', email = '".htmlspecialchars($email)."', telephone = '".htmlspecialchars($telephone)."' where username = '".$username."'";
	if($db->query($sql)){
	    return true;
	}
	return false;
}

function writeLog($name){
	return ;
}
