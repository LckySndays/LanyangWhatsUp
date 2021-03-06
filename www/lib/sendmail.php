<?php

	header('Access-Control-Allow-Origin: *');

	$name	 	= 'default';
	$email 		= 'default';
	$phone 		= 'default';
	$address 	= 'default';
	$feed	 	= 'default';

	if(isset($_GET['name']))		{ $name 	= htmlspecialchars($_GET['name'])		;} 
	if(isset($_GET['email']))		{ $email 	= htmlspecialchars($_GET['email'])		;} 
	if(isset($_GET['phone']))		{ $phone 	= htmlspecialchars($_GET['phone'])		;} 
	if(isset($_GET['address']))		{ $address 	= htmlspecialchars($_GET['address'])	;}
	if(isset($_GET['feedback']))	{ $feed 	= htmlspecialchars($_GET['feedback'])	;} 	
	
	if ($name  == "default") 	{echo "400"; return 300;};
	if ($email == "default") 	{echo "400"; return 300;};
	if ($feed  == "default") 	{echo "400"; return 300;};
	
	$subject = "Lanyang Chat - Feedback";
	$message = "					
				<!doctype html>
				<html>
				<head>
				<meta name='viewport' content='width=device-width'>
				<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
				<title>Really Simple HTML Email Template</title>
				<style>
				*{font-family:'Helvetica Neue',Helvetica,Helvetica,Arial,sans-serif;font-size:100%;line-height:1.6em;margin:0;padding:0}.btn-primary td,h1,h2,h3{font-family:'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif}img{max-width:600px;width:auto}body{-webkit-font-smoothing:antialiased;height:100%;-webkit-text-size-adjust:none;width:100%!important}label{font-weight:700}a{color:#348eda}.btn-primary{Margin-bottom:10px;width:auto!important}.btn-primary td{background-color:#348eda;border-radius:25px;font-size:14px;text-align:center;vertical-align:top}.btn-primary td a{background-color:#348eda;border:1px solid #348eda;border-radius:25px;border-width:10px 20px;display:inline-block;color:#fff;cursor:pointer;font-weight:700;line-height:2;text-decoration:none}.last{margin-bottom:0}.first{margin-top:0}.padding{padding:10px 0}table.body-wrap{padding:20px;width:100%}table.body-wrap .container{border:1px solid #f0f0f0}table.footer-wrap{clear:both!important;width:100%}.footer-wrap .container p{color:#666;font-size:12px}table.footer-wrap a{color:#999}h1,h2,h3{color:#111;font-weight:200;line-height:1.2em;margin:40px 0 10px}h1{font-size:36px}h2{font-size:28px}h3{font-size:22px}ol,p,ul{font-size:14px;font-weight:400;margin-bottom:10px}ol li,ul li{margin-left:5px;list-style-position:inside}.container{clear:both!important;display:block!important;Margin:0 auto!important;max-width:600px!important}.body-wrap .container{padding:20px}.content{display:block;margin:0 auto;max-width:600px}.content table{width:100%}
				</style>
				</head>

				<body bgcolor='#f6f6f6'>

				<!-- body -->
				<table class='body-wrap' bgcolor='#f6f6f6'>
				  <tr>
					<td></td>
					<td class='container' bgcolor='#FFFFFF'>

					  <div class='content'>
					  <table>
						<tr>
						  <td>
							<center><h1>Lanyang Chat - Feedback Form</h1><br></center>
							<hr><br>
							<label>Name:</label><br>
							<p>$name</p>
							<label>Email:</label><br>
							<p>$email</p>
							<label>Phone:</label><br>
							<p>$phone</p>
							<label>Address:</label><br>
							<p>$address</p>
							<label>Feedback:</label><br>
							<p>$feed</p>
						  </td>
						</tr>
					  </table>
					  </div>
					  
					</td>
					<td></td>
				  </tr>
				</table>



				<table class='footer-wrap'>
				  <tr>
					<td></td>
					<td class='container'>
					  

					  <div class='content'>
						<table>
						  <tr>
							<td align='center'>
							  <p>This Email was sent via <a href='https://chats.lanyang.tk'><unsubscribe>Lanyang Chat</unsubscribe></a> Web App.
							  </p>
							</td>
						  </tr>
						</table>
					  </div>

					  
					</td>
					<td></td>
				  </tr>
				</table>


				</body>
				</html>
				";
	send_mail($email, $name, $message, $subject, "feedback@lanyang.tk");
	echo "200";
	return 200;
		
function send_mail($email, $name, $message,$subject,$sender){						
	require_once('mailer/class.phpmailer.php');
	$mail = new PHPMailer();
	$mail->IsSMTP(); 
	$mail->SMTPDebug  = 0;                     
	$mail->SMTPAuth   = true;                  
	//$mail->SMTPSecure = "ssl";
	$mail->SMTPSecure = "tls";  		
	$mail->Host       = "smtp.sparkpostmail.com";      
	//$mail->Port       = 465;
	$mail->Port       = 587;
	$mail->AddAddress("louiseanton12@gmail.com");
	$mail->AddCC($email, $name);
	$mail->Username="SMTP_Injection";  
	$mail->Password="9cf0c97bd5fed61b7c2da7d82d2eb968dffbb80b";            
	$mail->SetFrom($sender, 'Lanyang Chat - Feedback');
	$mail->AddReplyTo("louiseanton12@gmail.com", "Author");
	$mail->Subject    = $subject;
	$mail->MsgHTML($message);
	$mail->CharSet="UTF-8";
	$mail->Send();
}	

?>