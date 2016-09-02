<?php
/**
 *
 *	Name: Prize 抽奖算法类
 *	Version: 1.0
 *	Author: zhushiheng
 */

class Prize
{

	var $priceBtime; // 抽奖开始时间
	var $priceOtime; // 抽奖结束时间
	var $nowTime; //当前时间

	function __construct ($db,$username){
	    $this->nowTime = time();
        $this->priceBtime = defined('PRICE_BTIME') ? PRICE_BTIME : '2013-5-17';
		$this->priceOtime = defined('PRICE_BTIME') ? PRICE_OTIME : '2013-5-28';
		$this->db = $db;
		$this->username = $username;
		$this->init();
	}


	/*
	 * 初始化
	 */
    function init(){
		$this->checkTime();
		$actPrice = $this->getActivePrize();
	    $prizeId = $this->_get_probability_key( $actPrice );
        $sql = "select * from act_prize where pid = '".$prizeId."'";
		$this->prizeInfo = $this->db->getRow($sql);
		$this->useChance();
	}

	/*
	 * 检查活动时间
	 */
	function checkTime(){
		$tempBtime = strtotime( $this->priceBtime );
		$tempOtime = strtotime( $this->priceOtime );
	    $his = date('His',$tempOtime);
		$bdate = strtotime(PRICE_BTIME);
		$years = date("Y",$bdate);
		$month = date("m",$bdate);
		$days = date("d",$bdate);
		$hours = date("H",$bdate);
		$btimes = $years."年".$month."月".$days."日 ".$hours."点";
        if( $this->nowTime < $tempBtime ){
		    $this->showMessage(30,array($btimes));
		}
	    if( $this->nowTime > $tempOtime ){
		    $this->showMessage(32);
		}
        if($this->nowTime > 1369216800 && $this->nowTime < 1369272600){
		    $this->showMessage(31); 
		}
		return true;
    }

	/*
	 * 使用一次机会
	 */
	function useChance(){
	    $sql = "update act_userinfo set  times = times - 1  where times > 0 and username = '".$this->username."'";
		if($this->db->query($sql)){
		     return true;
		}
		return false;
    }

	/*
	 * 得到激活的的奖品
	 */
	function getActivePrize(){
		$sql= "select * from act_prize where 1=1" ;
		$aprize = $this->db->getAll($sql);
		foreach($aprize as $pk => $pv){
		    $result[$pv['pid']] = $pv['rate'];
		}	
		$result = $this->getRealPrize($result);
	    return $result;
    }

	/*
	 * 得到真实激活的的奖品
	 */
	function getRealPrize($result){
		$daytime = date('Ymd');
		$yDaytime = date('Ymd',strtotime("-1 day"));
		$sql = "select pid,plimit from act_prize where plimit >= 0";
        $this->prizeDayNum = $this->db->getAll($sql);
		$sql = "select count(*) as total,pid from act_advice where DATE_FORMAT(from_unixtime( atime ),'%Y%m%d') = '".$daytime."' group by pid";
        $info = $this->db->getAll($sql);
		foreach($info as $ik=>$iv){
		    $pInfo[$iv['pid']] = $iv['total'];
		}
		if($this->prizeDayNum){
		    foreach( $this->prizeDayNum as $pk =>$pv){
				if($pInfo[$pv['pid']] >= $pv['plimit']){
					unset($result[$pv['pid']]);
				}
			}
		}
	    return $result;
    }

	/*
	 * 根据数组值作为概率进行随机选择
	 * @param array $array : 概率数组，格式为：
	 *		array (
	 *			键名1 => 概率值1,
	 *			键名2 => 概率值2,
	 *			......
	 * 			)
	 * @param integer $degree 精度倍数
	 */
	function _get_probability_key ( $array, $degree = 10000 )
	{
		$total = @array_sum ( $array ) * $degree;
		if ( !$total )
		{
			return false;
		}
		$intRand = mt_rand ( 0, $total );
		$offset = 0;
		while ( list ( $key, $item ) = @each ( $array ) )
		{
			$value = $item * $degree;
			if ( $intRand <= $value + $offset )
			{
				$result = $key;
				break;
			}
			$offset += $value;
		}
		return $result;
	}

	/*
	 *  消息提示
	 */
	function showMessage($type,$params=array(),$method=0){   
		$utype = $type;
		$msg = $this->getMessage($utype,$username,$card,$method);
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
	        case 21:
				$msg = 21;
				$utype = -1;
				break;
			case 30:
				$msg = 30;
				$utype = -1;
				break;
			case 32:
				$msg = 32;
				$utype = -1;
				break;
			case 31:
				$msg = 31;
				$utype = -1;
				break;
		}
		if($method){
			$msg = 20;
		}
		return $msg;
	}
}
?>