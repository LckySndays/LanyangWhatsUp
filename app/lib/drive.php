<?php

// Using User Authorization Code to Access Google Drive API
// Need User Consent

$client_id 		= "1050849711410-0cr9k644pu7s8fsem2j7fvqf4c87rpcl.apps.googleusercontent.com";
$client_secret	= "D_KbHkjS63vgI0pAmCMSgKvA";
$refresh_token	= "1/IsivFUqBfgj11a-eSIELHdHkIt_6NbjdUtrHg4_GA_Y";
$Authorization 	= "ya29.Ci9sA1E6_Cq3-q0Ud6G1c6uP_2dxCub007t5fk0oxyYUOKGY1UcLB5kRRGzUaGUtFQ";

if(!empty($_FILES))
{ 
	// Get the Authorization Token by Refreshing the Refresh Token in case if it is Expired
	// If the Refresh Token Expired, Need to Retrieve it Again Manually with User Consent
	// Example to Retrieve the Authorization Code (Not Token) from User and Exchange it for Access Token
	// Can Be Found Here => https://tku-java-project.herokuapp.com/drive.php
	$curl 		= curl_init();
	$url		= "https://www.googleapis.com/oauth2/v4/token";
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($curl, CURLOPT_POST, 1);
	curl_setopt($curl, CURLOPT_POSTFIELDS, "client_secret=" . $client_secret . "&grant_type=refresh_token&refresh_token=" . $refresh_token . "&client_id=" . $client_id);

	$curlResult = curl_exec($curl);
	curl_close($curl);
	
	$array = json_decode($curlResult, true);
	$Authorization = $array['access_token'];

	//Get File Information
    $tmpfile 	= $_FILES['file']['tmp_name'];
    $filename	= basename($_FILES['file']['name']); 
    $filetype 	= $_FILES['file']['type']; 
    $filesize 	= $_FILES['file']['size'];
    $filext		= pathinfo($filename, PATHINFO_EXTENSION);

    //Manually Assign Corresponding MIME Types
	switch ($filext) {
		case "php":
			$contentType = "application/x-httpd-php";
			break;
		case "bmp":
			$contentType = "image/bmp";
			break;
		case "jpeg":
			$contentType = "image/jpeg";
			break;
		case "jpg":
			$contentType = "image/jpeg";
			break;
		case "png":
			$contentType = "image/png";
			break;
		default:
			$contentType = $filetype;
	}

	//Uploading the File DATA to Google Drive Root Folder. (Google User Standard Account)
	//Only send the File Data without any MetaData
	$curl 		= curl_init();
	$url		= "https://www.googleapis.com/upload/drive/v3/files?uploadType=media";
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($curl, CURLOPT_POST, 1);

	curl_setopt($curl, CURLOPT_HTTPHEADER, array(
	    "Content-Type: $contentType",
	    "Content-Length: $filesize",
	    "Authorization: Bearer $Authorization"
    ));


	curl_setopt($curl, CURLOPT_POSTFIELDS, file_get_contents($tmpfile));
	$curlResult = curl_exec($curl);
	curl_close($curl);

	$array = json_decode($curlResult, true);
	$fileID = $array['id'];

	// Adding Parent Folder ID (Target Folder)
	// Removing Root Folder ID (Current Root Folder)
	// Uploading File MetaData
	$folderId 		= '0B9tf_331Jf_CMF9RUThDVUtzYm8';
	$parentFolder	= '0ANtf_331Jf_CUk9PVA';

	$curl 		= curl_init();
	$url		= "https://www.googleapis.com/drive/v3/files/" . $fileID . "?removeParents=" . $parentFolder . "&addParents=" . $folderId;
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($curl, CURLOPT_POST, 1);

	$postData = array(
 		"name" => $filename,
 		"parents[]" => $folderId
	);

	$postData = json_encode($postData);

	curl_setopt($curl, CURLOPT_HTTPHEADER, array(
	    "Content-Type: application/json",
	    "Content-Length: " . strlen($postData),
	    "Authorization: Bearer $Authorization"
    ));

	curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PATCH');
	$curlResult = curl_exec($curl);
	curl_close($curl);

	// $myfile = fopen("debug.txt", "w") or die("Unable to open file!");
	// $txt = $tmpfile . " " . $filename . " " . $filetype . " " . $curlResult;
	// fwrite($myfile, $txt);
	// fclose($myfile);

}else{

	// For Debugging Purpose Only
	// $myfile = fopen("debug.txt", "w") or die("Unable to open file!");
	// $txt = "Failed";
	// fwrite($myfile, $txt);
	// fclose($myfile);

}

?>