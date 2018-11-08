



1. php文件名必须是 .php 例如：index.php
你可以在页面中编写PHP代码写在<?php?>标签之间，但注意后面的?>是可以省略的。

<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<title></title>
	</head>

	<body>
		<?php
		echo "hello php";
		?>
	</body>

</html>

2. 	echo是PHP中的输出语句，可以把字符串输出（字符串用双引号括起来）。

3. 字符串时可以使用单引号，也可以使用双引号
在php中字符串连接符是用点（.）来表示的，这一点比较特殊，其它语言中是
用加号（+）来表示的，比如：JavaScirpt、Asp、C。
例：
	echo 'hello'.'php';
	
4. PHP语句以 ;  结束。


echo - 可以输出一个或多个字符串
print - 只允许输出一个字符串，返回值总为 1

5. //单行注释
   /* 多行注释 */
   
6. 使用 $ 定义变量：变量名是区分大小写
例如：
	$name = 'hcllo';
	变量使用：
	echo $name;
	
	注：
		$a = 10;//全局变量
		$b = 19;
		function text(){
			global $a,$b;//声明调用的是全局变量。
			echo $a + $b;
		}
		text();
	当一个函数完成时，它的所有变量通常都会被删除。然而，有时候您希望某个局部变量不要被删除。
	要做到这一点，请在您第一次声明变量时使用 static 关键字：

	function myTest() {
		static $x = 0;
		echo $x;
		$x++;
	}
	myTest();
	myTest();
	
7. 数据类型
	布尔：TRUE/FALSE
		$flag = TRUE;
		$flag = FALSE;
		
	整型
		$num = 100;
	
	浮点数：
		$float = 1.234;
		
	字符串：	
		$str ="php";
		$str1 = "hello, $str";
		$str2 = 'hi, $str';
		
		echo $str1;
		echo $str2;
		当双引号中包含变量时，变量会与双引号中的内容连接在一起；
		当单引号中包含变量时，变量会被当做字符串输出。
	
	
		定义一个长字符串
$String1 = <<<DOG
我有一只小毛驴，我从来也不骑。
有一天我心血来潮，骑着去赶集。
我手里拿着小皮鞭，我心里正得意。
不知怎么哗啦啦啦啦，我摔了一身泥.
DOG;

		注意：<<<DOG 表示开始 后面的DOG表示结束。后面的DOG 应该单独一行，不能有其它字符包括空格。
		DOG也可以是任意字符。
8. 空类型
	NULL（NULL）：NULL是空类型，对大小写不敏感，NULL类型只有一个取值，表示一个变量没有值，
	当被赋值为NULL，或者尚未被赋值，或者被unset()，这三种情况下变量被认为为NULL。	

9.	数组：array() 函数用于创建数组：
	例：
	//创建数组
	$cars = array(123, 234, 546, 556);
	//遍历数组：count() 函数用于返回数组的长度（元素的数量）
	for ($i = 0; $i < count($cars); $i++) {
		echo $cars[$i] . "<br/>";
	}
	
	关联数组：关联数组是使用您分配给数组的指定的键的数组。
	$age = array("a" => 18, "b" => 19, "c" => 29);

	echo $age['c'];//使用数组中元素
	foreach ($age as $key => $value) {
		echo "key: " . $key . " ,value: " . $value . "<br/>";
	}

	foreach ($age as $value) {
		echo $value."<br/>";
	}
	
	
	sort() - 对数组进行升序排列
	rsort() - 对数组进行降序排列
	asort() - 根据关联数组的值，对数组进行升序排列
	ksort() - 根据关联数组的键，对数组进行升序排列
	arsort() - 根据关联数组的值，对数组进行降序排列
	krsort() - 根据关联数组的键，对数组进行降序排列



	
常量：
	使用define()函数定义常量
	例：
	define('ID', '1986',TRUE);
	echo id;
	
	参数1：常量名
	参数2: 常量值
	参数3：可选，常量名是否大小写敏感.TRUE：不敏感，FALSE：繁感。默认值：FALSE;
	
	
	系统常量：
	（1）__FILE__ :php程序文件名。它可以帮助我们获取当前文件在服务器的物理位置。

	（2）__LINE__ :PHP程序文件行数。它可以告诉我们，当前代码在第几行。

	（3）PHP_VERSION:当前解析器的版本号。它可以告诉我们当前PHP解析器的版本号，我们可以提前知道我们的PHP代码是否可被该PHP解析器解析。

	（4）PHP_OS：执行当前PHP版本的操作系统名称。它可以告诉我们服务器所用的操作系统名称，我们可以根据该操作系统优化我们的代码。
		
	
运算符：
		算术： + - * / %  ++ -- 
		赋值： = & 
			&：引用赋值，意味着两个变量都指向同一个数据。（C语言中的指针）。
			例:
				$a = 10;
				$b = $a;
				$c = &$a;
		比较： == === !=  <>不等 !==  < > <= >=
		
		三目运算（三元运算）： ? : 
		逻辑运算：
			and  与
			or	 或
			Xor  异或
			！   非
			&&   短路与
			||   短路或
控制流：

条件判断
	if(){}
	if(){} else if(){}
	
	switch(){
		case ：
			break;
		default:	
	}

循环：
	while(){}
	do{}while();
	for(;;){}
	
	//只取值，不取下标
	foreach (数组 as 值){
	  //执行的任务
	}
	
	//同时取下标和值
	foreach (数组 as 下标 => 值){
	 //执行的任务
	}
	
	
	
PHP 超级全局变量
	$GLOBALS
	$_SERVER
	$_REQUEST
	$_POST
	$_GET
	$_FILES
	$_ENV
	$_COOKIE
	$_SESSION
	
	1. $GLOBALS 是PHP的一个超级全局变量组，在一个PHP脚本的全部作用域中都可以访问。
		$GLOBALS 是一个包含了全部变量的全局组合数组。变量的名字就是数组的键。
		例：
			$a = 19;
			$b = 10;

			function test() {
				$GLOBALS['a'] += $GLOBALS['b'];
				echo $GLOBALS['a'];
			}
			test();
	2. $_SERVER 是一个包含了诸如头信息(header)、路径(path)、以及脚本位置(script locations)
	等等信息的数组。这个数组中的项目由 Web 服务器创建。
		例：
		echo $_SERVER['PHP_SELF'];
		echo "<br>";
		echo $_SERVER['SERVER_NAME'];
		echo "<br>";
		echo $_SERVER['HTTP_HOST'];
		echo "<br>";
		echo $_SERVER['HTTP_REFERER'];
		echo "<br>";
		echo $_SERVER['HTTP_USER_AGENT'];
		echo "<br>";
		echo $_SERVER['SCRIPT_NAME'];

	3. $_REQUEST 用于收集HTML表单提交的数据。
		例：
		$name = $_REQUEST['name']; 
		$age = $_REQUEST['age'];
		echo $name,$age; 



















	
	