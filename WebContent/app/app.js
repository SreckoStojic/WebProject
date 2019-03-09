//pravljenje modula
var eCommerce = angular.module('eCommerce', ['ngStorage', 'bsTable', 'ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngMaterial', 'ngFileUpload']);


eCommerce.config(function($routeProvider){
	$routeProvider.when('/',
		{
			templateUrl : 'partials/login.html'
		}).when('/customer',
		{
			templateUrl : 'partials/customer.html'
		}).when('/admin',
		{	
			templateUrl : 'partials/admin.html'
		}).when('/manager',
		{
			templateUrl : 'partials/manager.html'
		});
});

eCommerce.config(function($mdThemingProvider){
	$mdThemingProvider.theme('default');
});

eCommerce.config(function($logProvider){
	$logProvider.debugEnabled(true);
});

