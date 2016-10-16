var app = angular.module('Dashboard', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(false);
  $routeProvider
    .when("/", 		 		{templateUrl: "page1.html", 			controller: "DashboardCtrl"})
	.when("/page1",  		{templateUrl: "page1.html", 			controller: "DashboardCtrl"})
	.when("/paper",  		{templateUrl: "paper.html", 			controller: "PaperCtrl"	})
	.when("/moodle",  		{templateUrl: "moodle.html", 			controller: "MoodleCtrl"})
	.when("/bus",  			{templateUrl: "bus.html", 				controller: "BusCtrl"})
	.when("/email",  		{templateUrl: "email.html", 			controller: "EmailCtrl"})
	.when("/uploadexam",  	{templateUrl: "uploadexam.html",		controller: "UploadExamCtrl"})
	.when("/profile",  		{templateUrl: "profile.html",			controller: "ProfileCtrl"})

	.when("/404", 			{templateUrl: "pages/login/404.html",  	controller: "PageCtrl"})
    .otherwise({redirectTo: '/404'});
	
}]);

app.controller('DashboardCtrl', function ($location) {
	highlightMenu("dashboard-mn");
	
});

app.controller('BusCtrl', function ($location) {
	highlightMenu("school-bus-mn");
	
});


app.controller('PaperCtrl', function ($location, $scope, $compile) {
	highlightMenu("papercut-mn");

	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			if(xhttp.responseText != ""){

				sessionStorage.setItem("PapercutData", xhttp.responseText);

			}else if(xhttp.readyState == 4 && xhttp.status == 502){
			
			}
		}
	}

	xhttp.open("GET", "lib/paper.php", true);
	xhttp.send();

	SessionData = JSON.parse(sessionStorage.PapercutData);
	$scope.Balance = SessionData.balanceFormatted;
	$scope.EnviTree = SessionData.environmentalImpact.treesFormatted;
	$scope.EnviBulb = SessionData.environmentalImpact.bulbHoursFormatted;
	$scope.EnviCo2 = SessionData.environmentalImpact.gramsCO2Formatted;
	$scope.Sheets = SessionData.printStats.sheets;
	$scope.Jobs = SessionData.printStats.jobs;
	$scope.EnviSince = SessionData.environmentalImpact.sinceDateFormatted;

	$scope.TodaySpend = SessionData.printStats.monthlyCostsFormatted[0];
	$scope.DailySpend = SessionData.printStats.monthlyCostsFormatted[1];
	$scope.WeeklySpend = SessionData.printStats.monthlyCostsFormatted[2];
	$scope.MonthlySpend = SessionData.printStats.monthlyCostsFormatted[3];

});

app.controller('MoodleCtrl', function ($location) {
	highlightMenu("moodle-mn");
	
	// document.getElementById("myframe").onload = function(){
	// 	this.contentWindow.document.getElementById("username").value = "403850398";
	// 	this.contentWindow.document.getElementById("password").value = "019894";
	// 	this.contentWindow.document.getElementById("myform").submit();
	// }

});

app.controller('EmailCtrl', function ($location) {
	highlightMenu("email-mn");
	
	// document.getElementById("myframe").onload = function(){
	// 	this.contentWindow.document.getElementById("horde_user").value = "403850398";
	// 	this.contentWindow.document.getElementById("horde_pass").value = "019894";
	// 	this.contentWindow.document.getElementById("myform").submit();
	// }

});

app.controller('UploadExamCtrl', function ($location) {
	highlightMenu("uploadexam-mn");
	

});

app.controller('ProfileCtrl', function ($location) {

	

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

app.directive('head', ['$rootScope','$compile',
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

function frame(){
	myframe.document.getElementById("username").value = '403850398';
	myframe.document.getElementById("password").value = '019894';
	myframe.document.getElementById("myform").submit();
}