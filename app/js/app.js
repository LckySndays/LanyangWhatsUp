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
	.when("/pastexam",  	{templateUrl: "pages/dashboard/pastexam.html", 			controller: "PastExamCtrl"})
	.when("/uploadexam",  	{templateUrl: "pages/dashboard/uploadexam.html",		controller: "UploadExamCtrl"})
	.when("/profile",  		{templateUrl: "pages/dashboard/profile.html",			controller: "ProfileCtrl"})
	.when("/account",  		{templateUrl: "pages/dashboard/account.html",			controller: "AccountCtrl"})

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


dashboard.controller('PaperCtrl', function ($location, $scope, $compile) {
	highlightMenu("papercut-mn");

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

});

dashboard.controller('MoodleCtrl', function ($location) {
	highlightMenu("moodle-mn");

	document.getElementById("myframe").onload = function(){
		this.contentWindow.document.getElementById("username").value = JWT.ID;
		this.contentWindow.document.getElementById("password").value = JWT.Moodle;
		this.contentWindow.document.getElementById("myform").submit();
	}

});

dashboard.controller('EmailCtrl', function ($location) {
	highlightMenu("email-mn");
	
	document.getElementById("myframe").onload = function(){
		this.contentWindow.document.getElementById("horde_user").value = JWT.ID;
		this.contentWindow.document.getElementById("horde_pass").value = JWT.Email;
		this.contentWindow.document.getElementById("myform").submit();
	}

});

dashboard.controller('PastExamCtrl', function ($location) {
	highlightMenu("past-exam-mn");
	
});

dashboard.controller('UploadExamCtrl', function ($location) {
	highlightMenu("uploadexam-mn");
	

});

dashboard.controller('AccountCtrl', function ($location, $scope) {
	highlightMenu("account-mn");
	
	$scope.SSO 		= (JWT.SSO ? "[ON]" : "[OFF]");
	$scope.Moodle 	= (JWT.Moodle ? "[ON]" : "[OFF]");
	$scope.Email	= (JWT.Email ? "[ON]" : "[OFF]");
	$scope.Papercut	= (JWT.Papercut ? "[ON]" : "[OFF]");
	
});

dashboard.controller('ProfileCtrl', function ($location, $scope) {

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
	
		if(sessionStorage.PapercutData){

			$('#view').injector().get('$location').path('paper');
			$('#view').scope().$apply();

		}else{

			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {

					$response = JSON.parse(xhttp.responseText);
					if($response.status == "ok"){

						sessionStorage.setItem("PapercutData", $response.response);
						redir('paper');

					}else if(xhttp.readyState == 4 && xhttp.status == 502){
					
					}
				}
			}

			xhttp.open("GET", "https://whatsupdev.herokuapp.com/dev/paper.php" + "?userID=" + JWT.ID, true);
			xhttp.send();

		}
	
	}else if (url == "bus"){
	
		if(JWT.Bus){

			$('#view').injector().get('$location').path('bus');
			$('#view').scope().$apply();

		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('Please Activate the Feature First');
		}
	
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

	}else{
	
		$('#view').injector().get('$location').path(url);
		$('#view').scope().$apply();
	
	}

}


function logout(){
	sessionStorage.clear();
	window.location = "./index.html";
}

//If Electron
if(window && window.process && window.process.type){

	const remote = require('electron').remote;

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


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    alert("Device is Ready");
    alert("Device UUID is " + device.uuid);

    codePush.sync(null, { updateDialog: true, installMode: InstallMode.IMMEDIATE });

    nfc.addTagDiscoveredListener(function (nfcEvent) {
        //console.log(JSON.stringify(nfcEvent.tag, null, 4));
        //alert(JSON.stringify(nfcEvent.tag, null, 4));
        alert("NFC UID is " + nfc.bytesToHexString(nfcEvent.tag.id));
    });


}