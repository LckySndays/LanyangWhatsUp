serverHOST			= "https://whatsuptku.herokuapp.com/";
// serverHOST			= "https://whatsupdev.herokuapp.com/";
// serverHOST			= "http://192.168.168.1/seniorproject/_Server/";
//serverHOST			= "http://localhost/seniorproject/_Server/";
URLlogin 			= serverHOST + "login.php";
URLloginNFC			= serverHOST + "loginNFC.php";
URLVerifyAccount	= serverHOST + "verify.php";
URLResendEmail		= serverHOST + "resend.php";
URLGetAgenda		= serverHOST + "calendar.php";
URLGetForecast		= serverHOST + "forecast.php";
URLGetPapercut		= serverHOST + "paper.php";
// URLGetBus			= serverHOST + "bus.php";
URLGetBus1			= serverHOST + "bussystem_1.php";
URLGetBus2			= serverHOST + "bussystem_2.php";
URLGetLeave			= serverHOST + "leave.php";
URLGetLeave2		= serverHOST + "leave2.php";
URLGetRollCall1		= serverHOST + "rollcall_1.php";
URLGetRollCall2		= serverHOST + "rollcall_2.php";
URLGetScore			= serverHOST + "score.php";
// URLGetScore2		= serverHOST + "score2.php";
URLGetBasicInfo		= serverHOST + "basic-info.php";
URLGetClassTable	= serverHOST + "classtable.php";
URLGetContact		= serverHOST + "search.php";
URLWebPrinting		= serverHOST + "printing.php";
URLUploadDrive		= serverHOST + "drive.php";
URLActivateFeature	= serverHOST + "store.php";
URLDeactiveAccount	= serverHOST + "deactivate.php";
URLChangePassword	= serverHOST + "reset.php";


var login = angular.module('WhatsUpLogin', ['ngRoute']);

login.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(false);
  $routeProvider
    .when("/", 		 		{templateUrl: "pages/login/login.html", 			controller: "HomeCtrl"})
	.when("/login",  		{templateUrl: "pages/login/login.html", 			controller: "HomeCtrl"})
	.when("/feedback", 		{templateUrl: "pages/login/feedback.html", 			controller: "PageCtrl"})
	.when("/changelog",  	{templateUrl: "pages/login/changelog.html", 		controller: "PageCtrl"})
	.when("/privacy-tos", 	{templateUrl: "pages/login/privacy-tos.html",		controller: "PageCtrl"})
	.when("/about",  		{templateUrl: "pages/login/about.html", 			controller: "PageCtrl"})

	.when("/windows",  		{templateUrl: "pages/login/download/windows.html", 	controller: "PageCtrl"})
	.when("/osx",  			{templateUrl: "pages/login/download/osx.html", 		controller: "PageCtrl"})
	.when("/linux",  		{templateUrl: "pages/login/download/linux.html", 	controller: "PageCtrl"})
	.when("/android",  		{templateUrl: "pages/login/download/android.html", 	controller: "PageCtrl"})
	.when("/ios",  			{templateUrl: "pages/login/download/ios.html", 		controller: "PageCtrl"})
	.when("/winphone",  	{templateUrl: "pages/login/download/winphone.html", controller: "PageCtrl"})
	
	.when("/404", 			{templateUrl: "pages/login/404.html",  				controller: "PageCtrl"})
    .otherwise({redirectTo: '/404'});
	
}]);

login.controller('HomeCtrl', function ($location) {
	
	//document.getElementById("navigation").style.display = 'initial';

	if(sessionStorage.StuBasic){
		// $location.path("chat");
		window.location = "./dashboard.html";
	}
	
});

login.controller('PageCtrl', function ($location) {
	
	// if(sessionStorage.length == 1){
	// 	feedTransmit(parse.stu_nameCH + "viewing " + $location.path().replace("/", "") + " section");
	// }
	
});



var dashboard = angular.module('Dashboard', ['ngRoute']);

dashboard.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(false);
  $routeProvider
    .when("/", 		 		{templateUrl: "pages/dashboard/page1.html", 			controller: "DashboardCtrl"})
	.when("/page1",  		{templateUrl: "pages/dashboard/page1.html", 			controller: "DashboardCtrl"})
	.when("/paper",  		{templateUrl: "pages/dashboard/paper.html", 			controller: "PaperCtrl"	})
	.when("/moodle",  		{templateUrl: "pages/dashboard/moodle.html", 			controller: "MoodleCtrl"})
	.when("/bus",  			{templateUrl: "pages/dashboard/bus.html", 				controller: "BusCtrl"})
	.when("/email",  		{templateUrl: "pages/dashboard/email.html", 			controller: "EmailCtrl"})
	.when("/leave",  		{templateUrl: "pages/dashboard/leave.html", 			controller: "LeaveCtrl"})
	.when("/score",  		{templateUrl: "pages/dashboard/score.html", 			controller: "ScoreCtrl"})
	.when("/basicinfo",		{templateUrl: "pages/dashboard/basic-info.html",		controller: "BasicInfoCtrl"})
	.when("/classtt",  		{templateUrl: "pages/dashboard/classtimetable.html",	controller: "ClassttCtrl"})
	.when("/search",  		{templateUrl: "pages/dashboard/search.html", 			controller: "SearchCtrl"})
	.when("/pastexam",  	{templateUrl: "pages/dashboard/pastexam.html", 			controller: "PastExamCtrl"})
	.when("/uploadexam",  	{templateUrl: "pages/dashboard/uploadexam.html",		controller: "UploadExamCtrl"})
	.when("/profile",  		{templateUrl: "pages/dashboard/profile.html",			controller: "ProfileCtrl"})
	.when("/account",  		{templateUrl: "pages/dashboard/account.html",			controller: "AccountCtrl"})
	.when("/report",  		{templateUrl: "pages/dashboard/report.html",			controller: "ReportCtrl"})

	.when("/404", 			{templateUrl: "pages/login/404.html",  	controller: "PageCtrl"})
    .otherwise({redirectTo: '/404'});
	
}]);

dashboard.controller('DashboardHeaderCtrl', function ($location, $scope, $compile) {
	highlightMenu("dashboard-mn");

	if(sessionStorage.JWT){
		JWT = jwt_decode(sessionStorage.JWT);
		$scope.StuID 	= JWT.ID;
		$scope.StuRole 	= "Student";
	}else{

	}
	
});

dashboard.controller('DashboardCtrl', function ($location, $scope, $compile) {
	highlightMenu("dashboard-mn");

	
});

dashboard.controller('BusCtrl', function ($location) {
	highlightMenu("school-bus-mn");
	
});


dashboard.controller('PaperCtrl', function ($location, $scope, $compile, $route, $sce) {
	highlightMenu("papercut-mn");

	// $scope.URLWebPrinting = $sce.trustAsResourceUrl(URLWebPrinting);

	if(sessionStorage.PapercutData){
		$SessionData = JSON.parse(sessionStorage.PapercutData);
		$scope.Balance = $SessionData.balanceFormatted;
		$scope.EnviTree = $SessionData.environmentalImpact.treesFormatted;
		$scope.EnviBulb = $SessionData.environmentalImpact.bulbHoursFormatted;
		$scope.EnviCo2 = $SessionData.environmentalImpact.gramsCO2Formatted;
		$scope.Sheets = $SessionData.printStats.sheets;
		$scope.Jobs = $SessionData.printStats.jobs;
		$scope.EnviSince = $SessionData.environmentalImpact.sinceDateFormatted;

		$scope.TodaySpend = $SessionData.printStats.monthlyCostsFormatted[0];
		$scope.DailySpend = $SessionData.printStats.monthlyCostsFormatted[1];
		$scope.WeeklySpend = $SessionData.printStats.monthlyCostsFormatted[2];
		$scope.MonthlySpend = $SessionData.printStats.monthlyCostsFormatted[3];
	}

	$scope.reloadRoute = function() {
	    //$route.reload();

	    $SessionData = JSON.parse(sessionStorage.PapercutData);
		$scope.Balance = $SessionData.balanceFormatted;
		$scope.EnviTree = $SessionData.environmentalImpact.treesFormatted;
		$scope.EnviBulb = $SessionData.environmentalImpact.bulbHoursFormatted;
		$scope.EnviCo2 = $SessionData.environmentalImpact.gramsCO2Formatted;
		$scope.Sheets = $SessionData.printStats.sheets;
		$scope.Jobs = $SessionData.printStats.jobs;
		$scope.EnviSince = $SessionData.environmentalImpact.sinceDateFormatted;

		$scope.TodaySpend = $SessionData.printStats.monthlyCostsFormatted[0];
		$scope.DailySpend = $SessionData.printStats.monthlyCostsFormatted[1];
		$scope.WeeklySpend = $SessionData.printStats.monthlyCostsFormatted[2];
		$scope.MonthlySpend = $SessionData.printStats.monthlyCostsFormatted[3];

		$scope.$apply();
	};


});

dashboard.controller('MoodleCtrl', function ($location) {
	highlightMenu("moodle-mn");

	// if(detectIE() != false){
	// 	document.getElementById("myframe").contentWindow.document.getElementById("username").value = JWT.ID;
	// 	document.getElementById("myframe").contentWindow.document.getElementById("password").value = JWT.Moodle;
	// 	document.getElementById("myframe").contentWindow.document.getElementById("myform").submit();
	// }else{
	// 	document.getElementById("myframe").onload = function(){
	// 		this.contentWindow.document.getElementById("username").value = JWT.ID;
	// 		this.contentWindow.document.getElementById("password").value = JWT.Moodle;
	// 		this.contentWindow.document.getElementById("myform").submit();
	// 	}
	// }

});

dashboard.controller('EmailCtrl', function ($location) {
	highlightMenu("email-mn");
	
	// if(detectIE() != false){
	// 	document.getElementById("myframe").contentWindow.document.getElementById("horde_user").value = JWT.ID;
	// 	document.getElementById("myframe").contentWindow.document.getElementById("horde_pass").value = JWT.Email;
	// 	document.getElementById("myframe").contentWindow.document.getElementById("myform").submit();
	// }else{
	// 	document.getElementById("myframe").onload = function(){
	// 		this.contentWindow.document.getElementById("horde_user").value = JWT.ID;
	// 		this.contentWindow.document.getElementById("horde_pass").value = JWT.Email;
	// 		this.contentWindow.document.getElementById("myform").submit();
	// 	}
	// }

});

dashboard.controller('LeaveCtrl', function ($location) {
	highlightMenu("leave-mn");

});

dashboard.controller('ScoreCtrl', function ($location) {
	highlightMenu("score-mn");

});


dashboard.controller('BasicInfoCtrl', function ($location) {
	highlightMenu("basic-mn");

});

dashboard.controller('ClassttCtrl', function ($location, $scope) {
	highlightMenu("classtt-mn");
	
});

dashboard.controller('SearchCtrl', function ($location) {
	highlightMenu("search-mn");

});

dashboard.controller('PastExamCtrl', function ($location) {
	highlightMenu("past-exam-mn");
	
});

dashboard.controller('UploadExamCtrl', function ($location, $sce, $scope) {
	highlightMenu("uploadexam-mn");
	// $scope.URLUploadDrive = $sce.trustAsResourceUrl(URLUploadDrive);

});

dashboard.controller('AccountCtrl', function ($location, $scope, $route) {
	highlightMenu("account-mn");
	
	$scope.SSO 		= (JWT.SSO ? "[ON]" : "[OFF]");
	$scope.Moodle 	= (JWT.Moodle ? "[ON]" : "[OFF]");
	$scope.Email	= (JWT.Email ? "[ON]" : "[OFF]");
	$scope.Papercut	= (JWT.Papercut ? "[ON]" : "[OFF]");

	$scope.reloadRoute = function() {
	    $route.reload();
	};
	
	if (window.cordova) {
		if(device.platform != "iOS"){

			tagListener 	= function (nfcEvent) {
						        //console.log(JSON.stringify(nfcEvent.tag, null, 4));
						        //alert(JSON.stringify(nfcEvent.tag, null, 4));
						        //alert("NFC UID is " + nfc.bytesToHexString(nfcEvent.tag.id));
						        registerNFC(nfc.bytesToHexString(nfcEvent.tag.id));
						   	}

			if(window.cordova){
				nfc.addTagDiscoveredListener(tagListener);

			    $scope.$on('$destroy', function(next, current) { 
					nfc.removeTagDiscoveredListener(tagListener);
				});
			}
		}
	}

});

dashboard.controller('ReportCtrl', function ($location, $sce, $scope) {
	highlightMenu("report-mn");
	

});

dashboard.controller('ProfileCtrl', function ($location, $scope, $compile, $route, $sce) {

	if(sessionStorage.StuBasic){
		$StuProfile			= JSON.parse(sessionStorage.StuBasic);
		$scope.StuNameCH 	= $StuProfile.stu_nameCH;
		$scope.StuNameEN	= $StuProfile.stu_nameEN;
		$scope.StuGender	= $StuProfile.stu_gender;
		$scope.StuStatus	= $StuProfile.stu_status_2 + " (" + $StuProfile.stu_status_1 + ")";
		$scope.StuDept		= $StuProfile.stu_dept;
		$scope.StuEmail		= $StuProfile.stu_school_email;
		$scope.StuBday		= $StuProfile.stu_birthday;

		$scope.StuIDTW	 		= $StuProfile.stu_ID_card;
		$scope.StuIDARC	 		= $StuProfile.stu_ARC;
		$scope.StuTelp			= $StuProfile.stu_telp;
		$scope.StuPhone			= $StuProfile.stu_phone;
		$scope.GuardianName		= $StuProfile.stu_guardian_name;
		$scope.GuardianTelp		= $StuProfile.stu_guardian_telp;
		$scope.GuardianPhone	= $StuProfile.stu_guardian_phone;
		$scope.Address1			= $StuProfile.stu_addr_1;
		$scope.Address2			= $StuProfile.stu_addr_2;
		$scope.Address3			= $StuProfile.stu_addr_3;
	}

	$scope.reloadRoute = function() {
	    //$route.reload();

	    $StuProfile			= JSON.parse(sessionStorage.StuBasic);
		$scope.StuNameCH 	= $StuProfile.stu_nameCH;
		$scope.StuNameEN	= $StuProfile.stu_nameEN;
		$scope.StuGender	= $StuProfile.stu_gender;
		$scope.StuStatus	= $StuProfile.stu_status_2 + " (" + $StuProfile.stu_status_1 + ")";
		$scope.StuDept		= $StuProfile.stu_dept;
		$scope.StuEmail		= $StuProfile.stu_school_email;
		$scope.StuBday		= $StuProfile.stu_birthday;

		$scope.StuIDTW	 		= $StuProfile.stu_ID_card;
		$scope.StuIDARC	 		= $StuProfile.stu_ARC;
		$scope.StuTelp			= $StuProfile.stu_telp;
		$scope.StuPhone			= $StuProfile.stu_phone;
		$scope.GuardianName		= $StuProfile.stu_guardian_name;
		$scope.GuardianTelp		= $StuProfile.stu_guardian_telp;
		$scope.GuardianPhone	= $StuProfile.stu_guardian_phone;
		$scope.Address1			= $StuProfile.stu_addr_1;
		$scope.Address2			= $StuProfile.stu_addr_2;
		$scope.Address3			= $StuProfile.stu_addr_3;

		$scope.$apply();
	};

});

function highlightMenu(menuName){
	var selectedLink = $('#main-menu a.active');
	selectedLink.parentsUntil($('#main-menu')).each(function () {
		if ($(this).is('li')) {
			$(this).removeClass('active');
			$(this).removeClass('expanded');
		}
	});
	selectedLink.removeClass('active');

	document.getElementById(menuName).className = "active";
	materialadmin.AppNavigation._invalidateMenu();

	if(window.cordova){

		setTimeout(function () {materialadmin.AppNavigation._handleMenubarLeave();}, 1000);

	}
}

dashboard.directive('head', ['$rootScope','$compile',
    function($rootScope, $compile){
        return {
            restrict: 'E',
            link: function(scope, elem){
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if(current && current.$$route && current.$$route.css){
                        if(!angular.isArray(current.$$route.css)){
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function(sheet){
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if(next && next.$$route && next.$$route.css){
                        if(!angular.isArray(next.$$route.css)){
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet){
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);

function redir(url){

	if(url == "presentation"){
	
		if(sessionStorage.length == 1 && parse.stu_ID == "403850398"){
			$('#view').injector().get('$location').path('presentation');
			$('#view').scope().$apply();
		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('You don\'t have access to this page');
		}
		
	}else if (url == "chat"){
	
		if(sessionStorage.length == 1){
			$('#view').injector().get('$location').path('chat');
			$('#view').scope().$apply();
		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('Please Login First');
		}
		
	}else if (url == "paper"){
	
		if(JWT.Papercut){

			$('#view').injector().get('$location').path('paper');
			$('#view').scope().$apply();

		}else{

			alertify.set('notifier','position', 'bottom-right');
			alertify.error('Please Activate the Feature First');

			// var xhttp = new XMLHttpRequest();

			// xhttp.onreadystatechange = function() {
			// 	if (xhttp.readyState == 4 && xhttp.status == 200) {

			// 		$response = JSON.parse(xhttp.responseText);
			// 		if($response.status == "ok"){

			// 			sessionStorage.setItem("PapercutData", $response.response);
			// 			redir('paper');

			// 		}else if(xhttp.readyState == 4 && xhttp.status == 502){
					
			// 		}
			// 	}
			// }

			// xhttp.open("GET", "https://whatsupdev.herokuapp.com/paper.php" + "?userID=" + JWT.ID, true);
			// xhttp.send();

		}
	
	}else if (url == "bus"){
	
		// if(JWT.Bus){

			$('#view').injector().get('$location').path('bus');
			$('#view').scope().$apply();

		// }else{
		// 	alertify.set('notifier','position', 'bottom-right');
		// 	alertify.error('Please Activate the Feature First');
		// }
	
	}else if (url == "email"){
	
		if(JWT.Email){

			$('#view').injector().get('$location').path('email');
			$('#view').scope().$apply();

		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('Please Activate the Feature First');
		}

	}else if (url == "moodle"){
	
		if(JWT.Moodle){

			$('#view').injector().get('$location').path('moodle');
			$('#view').scope().$apply();

		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('Please Activate the Feature First');
		}

	}else if (url == "leave"){
	
		if(JWT.SSO){

			$('#view').injector().get('$location').path('leave');
			$('#view').scope().$apply();

		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('Please Activate the Feature First');
		}

	}else if (url == "score"){
	
		if(JWT.SSO){

			$('#view').injector().get('$location').path('score');
			$('#view').scope().$apply();

		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('Please Activate the Feature First');
		}

	}else if (url == "search"){
	
		if(JWT.SSO){

			$('#view').injector().get('$location').path('search');
			$('#view').scope().$apply();

		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('Please Activate the Feature First');
		}

	}else if (url == "basic"){
	
		if(JWT.SSO){

			$('#view').injector().get('$location').path('basicinfo');
			$('#view').scope().$apply();

		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('Please Activate the Feature First');
		}

	}else if (url == "classtt"){
	
		if(JWT.SSO){

			$('#view').injector().get('$location').path('classtt');
			$('#view').scope().$apply();

		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('Please Activate the Feature First');
		}

	}else if (url == "profile"){
	
		if(JWT.SSO){

			$('#view').injector().get('$location').path('profile');
			$('#view').scope().$apply();

		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('Please Activate the Feature First');
		}

	}else{
	
		$('#view').injector().get('$location').path(url);
		$('#view').scope().$apply();
	
	}

}

function logout(){
	sessionStorage.clear();
	window.location = "./index.html";
}

// If Electron
if(window && window.process && window.process.type){

	var remote = require('electron').remote;

    if(document.getElementById("minbt")){
        document.getElementById("minbt").style.display = '';
        document.getElementById("maxbt").style.display = '';
        document.getElementById("exitbt").style.display = '';
   

        document.getElementById("minbt").addEventListener("click", function (e) {
            var window = remote.getCurrentWindow();
            window.minimize(); 
        });

        document.getElementById("maxbt").addEventListener("click", function (e) {
            var window = remote.getCurrentWindow();
            if (!window.isMaximized()) {
               window.maximize();          
            } else {
               window.unmaximize();
            }
        });

        document.getElementById("exitbt").addEventListener("click", function (e) {
           var window = remote.getCurrentWindow();
           window.close();
        });
    }
    
    document.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    document.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    // webview.addEventListener('dragover', function(e) {
        // e.preventDefault();
    // });

}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       // return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

function initAngular($app){
	angular.element(document).ready(function () {
		if (window.cordova) {
			document.addEventListener('deviceready', function () {
				switch($app) {
				    case "WhatsUpLogin":

				    	codePush.sync(null, { updateDialog: true, installMode: InstallMode.IMMEDIATE });
				    	
				    	if(device.platform != "iOS"){

		    				nfc.addTagDiscoveredListener(function (nfcEvent) {
		        				//console.log(JSON.stringify(nfcEvent.tag, null, 4));
		        				//alert(JSON.stringify(nfcEvent.tag, null, 4));
		       				 	//alert("NFC UID is " + nfc.bytesToHexString(nfcEvent.tag.id));
		       				 	loginNFC(device.uuid, nfc.bytesToHexString(nfcEvent.tag.id));
		    				});

		    				// Enable to debug issues.
							// window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

							// cordova.plugins.backgroundMode.enable();
							// Called when background mode has been activated
						    // cordova.plugins.backgroundMode.onactivate = function () {
					     //        // Modify the currently displayed notification
					     //        cordova.plugins.backgroundMode.configure({
					     //            text:'Running in background for more than 5s now.'
					     //        });
						    // }

							var notificationOpenedCallback = function(jsonData) {
								console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
							};

							window.plugins.OneSignal
								.startInit("10a9cfcf-9b03-4a61-98f7-c40bf4c2b75f", "1050849711410")
								.handleNotificationOpened(notificationOpenedCallback)
								.inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
								.endInit();

							// window.plugins.OneSignal.enableInAppAlertNotification(false)
							// window.plugins.OneSignal.OSInFocusDisplayOption("Notification");
							// window.plugins.OneSignal.inFocusDisplaying("Notification");
							window.plugins.OneSignal.setSubscription(true);
							window.plugins.OneSignal.enableNotificationsWhenActive(true);


							// Sync hashed email if you have a login system or collect it.
							// Will be used to reach the user at the most optimal time of day.
							// window.plugins.OneSignal.syncHashedEmail(userEmail);

						}

				        break;
				    case "Dashboard":
				       	
				        break;
				    default:
				}
				angular.bootstrap(document.body, [$app]);
			}, false);
		} else {
			angular.bootstrap(document.body, [$app]);
		}
	});
}

/**
 * Module for displaying "Waiting for..." dialog using Bootstrap
 *
 * @author Eugene Maslovich <ehpc@em42.ru>
 */

var waitingDialog = waitingDialog || (function ($) {
    'use strict';

	// Creating modal dialog's DOM
	var $dialog = $(
		'<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
		'<div class="modal-dialog modal-m">' +
		'<div class="modal-content">' +
			'<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
			'<div class="modal-body">' +
				'<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
			'</div>' +
		'</div></div></div>');

	return {
		/**
		 * Opens our dialog
		 * @param message Custom message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
		 */
		show: function (message, options) {
			// Assigning defaults
			if (typeof options === 'undefined') {
				options = {};
			}
			if (typeof message === 'undefined') {
				message = 'Loading';
			}
			var settings = $.extend({
				dialogSize: 'm',
				progressType: '',
				onHide: null // This callback runs after the dialog was hidden
			}, options);

			// Configuring dialog
			$dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
			$dialog.find('.progress-bar').attr('class', 'progress-bar');
			if (settings.progressType) {
				$dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
			}
			$dialog.find('h3').text(message);
			// Adding callbacks
			if (typeof settings.onHide === 'function') {
				$dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
					settings.onHide.call($dialog);
				});
			}
			// Opening dialog
			$dialog.modal();
		},
		/**
		 * Closes dialog
		 */
		hide: function () {
			$dialog.modal('hide');
		}
	};

})(jQuery);


// angular.element(document).ready(function () {
// 	if (window.cordova) {
// 		console.log("Running in Cordova, will bootstrap AngularJS once 'deviceready' event fires.");
// 		document.addEventListener('deviceready', function () {
// 			console.log("Deviceready event has fired, bootstrapping AngularJS.");
// 			onDeviceReady();
// 			angular.bootstrap(document.body, ['Dashboard']);
// 		}, false);
// 	} else {
// 		console.log("Running in browser, bootstrapping AngularJS now.");
// 		angular.bootstrap(document.body, ['Dashboard']);
// 	}
// });


// document.addEventListener("deviceready", onDeviceReady, false);

// function onDeviceReady() {
//     alert("Device is Ready");
//     alert("Device UUID is " + device.uuid);

//     codePush.sync(null, { updateDialog: true, installMode: InstallMode.IMMEDIATE });

//     nfc.addTagDiscoveredListener(function (nfcEvent) {
//         //console.log(JSON.stringify(nfcEvent.tag, null, 4));
//         //alert(JSON.stringify(nfcEvent.tag, null, 4));
//         alert("NFC UID is " + nfc.bytesToHexString(nfcEvent.tag.id));
//     });
// }

