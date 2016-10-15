<?php 

	header('Access-Control-Allow-Origin: *');

	$username = 'default';
	$password = 'default';
	
	if(isset($_GET['userID']))		{ $username = htmlspecialchars($_GET['userID'])		;} 
	if(isset($_GET['userPass']))	{ $password = htmlspecialchars($_GET['userPass'])	;} 
	
	if ($username == "default") 	{echo "300"; return 300;};
	if ($password == "default") 	{echo "300"; return 300;};
	
	login($username, $password);
	
	function login($username, $password){
		
		//Advance Configuration (Do not change the value below, unless you are aware of what are you doing)
		$header1_text  		= "學年";			$header2_text  		= "系級";		$header_text	= "目前就讀系級";
		$header1_value 		= 10;				$header2_value 		= 13;			$header_value	= 1;
		$footer1_text  		= "學業總平均";		$footer2_text  		= "必修學分";
		$footer1_value 		= 1;				$footer2_value 		= 1;
		$totalColumn1_value	= 10;				$totalColumn2_value	= 9;
	
		//Login to the TKU Scoring System to Retrieve the Cookies/Session ID
		$curl 		= curl_init();
		$url		= "portal.tku.edu.tw/NEAI/login2.do?action=EAI&myurl=http://portal.tku.edu.tw/aissinfo/emis/tmw0012.aspx&ln=en_US&username=$username&password=$password&loginbtn=Login";
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($curl, CURLOPT_COOKIEJAR, 1);
		// $cookie	= getcwd() . '/test.txt';
		// curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie);
		//curl_set_opt(CURLOPT_MAXCONNECTS, 15);
		
		$curlResult = curl_exec($curl);
		curl_close($curl);	
		
		if($curlResult === false){echo "400"; return 400;}
		if (strpos($curlResult, 'Tamkang University Single Sign On(SSO)') !== false) {echo "300"; return 300;}
		
		//Retrieve the Student Basic Information (學生基本資料查詢)
		$curl 		= curl_init();
		$url		= "http://portal.tku.edu.tw/aissinfo/emis/TMWS020.aspx";
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($curl, CURLOPT_COOKIEFILE, 1);
		$curlResult = curl_exec($curl);
		curl_close($curl);
		
		if($curlResult === false){echo "401"; return 401;}
		
		/* Let the DOM Parser handle the page result from Curl */
		/* Force DOM Parser to add UTF-8 encoding to the page for the Chinese character to load properly */
		$dom = new DOMDocument();
		libxml_use_internal_errors(true);
		$dom->loadHTML('<?xml encoding="UTF-8">' . $curlResult);
		
		$counter = $header_value;
		
		foreach($dom->getElementsByTagName('td') as $link) {
			
			if ($link->textContent == $header_text){$counter = $header_value;}
			
			switch ($counter) {
				case 2:
					$stu_dept = $link->textContent;
					break;
				case 4:
					$stu_ID = preg_replace("/\\s+/iu", "", $link->textContent);
					if ($stu_ID != $username) {echo "500"; return 500;}
					break;
				case 6:
					$stu_nameCH = $link->textContent;
					break;
				case 8:
					$stu_nameEN = $link->textContent;
					break;
				case 10:
					$stu_birthday = $link->textContent;
					break;
				case 12:
					$stu_gender = $link->textContent;
					break;
				case 14:
					$stu_ID_card = $link->textContent;
					break;
				case 16:
					$stu_ARC = $link->textContent;
					break;
				case 18:
					$stu_status_1 = $link->textContent;
					break;
				case 20:
					$stu_status_2 = $link->textContent;
					break;
				case 22:
					$stu_telp = $link->textContent;
					break;
				case 23:
					$stu_telp = $stu_telp . $link->textContent;
					break;
				case 25:
					$stu_phone = $link->textContent;
					break;
				case 27:
					$stu_addr_1 = $link->textContent;
					break;
				case 29:
					$stu_addr_2 = $link->textContent;
					break;
				case 31:
					$stu_addr_3 = $link->textContent;
					break;
				case 33:
					$stu_send_opt = $link->textContent;
					break;
				case 35:
					//Remove Chinese whitespaces (trim())
					$stu_school_email = preg_replace("/\\s+/iu", "", $link->textContent);
					if (!strpos($stu_school_email, 'tku.edu.tw') !== false) {echo "500"; return 500;}
					break;
				case 37:
					$stu_guardian_name = $link->textContent;
					break;
				case 39:
					$stu_guardian_telp = $link->textContent;
					break;
				case 40:
					$stu_guardian_telp = $stu_guardian_telp . $link->textContent;
					break;
				case 42:
					$stu_guardian_phone = $link->textContent;
					break;
				case 43:
					$stu_guardian_phone = $stu_guardian_phone . $link->textContent;
					break;
				default:
					break;
			}
			
			$counter += 1;	
		}
		
		$array = array(
			"stu_dept" 				=> $stu_dept,
			"stu_ID"				=> $stu_ID,
			"stu_nameCH" 			=> $stu_nameCH,
			"stu_nameEN" 			=> $stu_nameEN,
			"stu_birthday" 			=> $stu_birthday,
			"stu_gender"			=> $stu_gender,
			"stu_ID_card"			=> $stu_ID_card,
			"stu_ARC"				=> $stu_ARC,
			"stu_status_1"			=> $stu_status_1,
			"stu_status_2"			=> $stu_status_2,
			"stu_telp"				=> $stu_telp,
			"stu_phone"				=> $stu_phone,
			"stu_addr_1"			=> $stu_addr_1,
			"stu_addr_2"			=> $stu_addr_2,
			"stu_addr_3"			=> $stu_addr_3,
			"stu_send_opt"			=> $stu_send_opt,
			"stu_school_email"		=> $stu_school_email,
			"stu_guardian_name"		=> $stu_guardian_name,
			"stu_guardian_telp"		=> $stu_guardian_telp,
			"stu_guardian_phone"	=> $stu_guardian_phone
		);	
		
		echo json_encode_unicode($array);
		return 0;
	}
	
	function json_encode_unicode($data) {
		if (defined('JSON_UNESCAPED_UNICODE')) {
			return json_encode($data, JSON_UNESCAPED_UNICODE);
		}
		return preg_replace_callback('/(?<!\\\\)\\\\u([0-9a-f]{4})/i',
			function ($m) {
				$d = pack("H*", $m[1]);
				$r = mb_convert_encoding($d, "UTF8", "UTF-16BE");
				return $r!=="?" && $r!=="" ? $r : $m[0];
			}, json_encode($data)
		);
	}
?>