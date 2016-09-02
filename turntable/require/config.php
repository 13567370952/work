<?php

define ( 'ADM_USER', 'admin' );
define ( 'ADM_PSW', 'dqdq@2014' );

//数据库
define ( 'DB_HOST', '192.168.5.67' );
define ( 'DB_USER', 'dbacms');
define ( 'DB_NAME', '2014_dq_turntable' );
define ( 'DB_PASSWORD', 'kMF2lEAi83wzaJ5Q' );

//抽奖起始时间
define ( 'PRICE_BTIME', '2013-12-20 10:00' );
define ( 'PRICE_OTIME', '2014-01-04 00:00' );

//短连接密码
define ( 'SHORT_URL_KEY', 'yQmkFmuYwRacE1Rr' );
define ( 'ENCRYPT_KEY', '9way_test0806' );
define ( 'COOKIE_SIGN', '9wee123456' );

//分享的基础连接
define ( 'BASE_URL', 'http://act.duoqu.com/2014/1year/turntable/' );

//每日默认的抽奖次数
if ( time() >= strtotime( '2013-12-23' ) )
{
	define ( 'DEFAULT_CHANCE', 2 );
}
else
{
	define ( 'DEFAULT_CHANCE', 99 );
}

//每日可增加的抽奖次数
define ( 'DAY_CHANCE', 3 );

