(function(){
	'use strict';

	var support_manager = angular.module('support_manager',[
		'ui.router',
		'ngCookies'
	]);

	 // Static data constant.
    var staticData = {};

    var userRoles = staticData.userRoles = {
        guest: 1,
        user: 2,
        admin: 4
    };

    staticData.accessLevels = {
        guest: userRoles.guest | userRoles.user | userRoles.admin,
        user: userRoles.user | userRoles.admin,
        admin: userRoles.admin
    };

    support_manager.constant('staticData', staticData);

    support_manager.config([
    	'$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',
        '$locationProvider',
        'staticData',
        authConfig
    ]);

    function authConfig(
        $stateProvider,
        $urlRouterProvider,
        $httpProvider,
        $locationProvider,
        staticData ) {

        $stateProvider.state('index', {
            url: '/',
            templateUrl: 'app/views/partials/partial-index.html'
        });

        // Login route.
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/views/partials/partial-login.html',
            controller: 'loginController as lc', 

		});

		$stateProvider.state('signup', {
            url: '/signup',
            templateUrl: 'app/views/partials/partial-signup.html',
            controller: 'profileController as pc', 

		});

		$stateProvider.state('admin', {
			url: '/admin', 
			templateUrl: 'app/views/partials/partial-admin.html',
			controller: 'adminController as ac', 
			data: {
				accessLevel: staticData.accessLevels.admin
			}
		});

		$stateProvider.state('profile', {
			url: '/profile', 
			templateUrl: 'app/views/partials/partial-profile.html',
			controller: 'profileController as pc', 
			data: {
				accessLevel: staticData.accessLevels.user
			}
		});

        $locationProvider.html5Mode(true);
        $httpProvider.intercerptors.push('requestInterceptor')
    }

    support_manager.run([
    	'$rootScope', 
    	'$state', 
    	'authService', 
    	authRun
    ]);

    function authRun($rootScope, $state, authService){
    	$rootScope.$on('$stateChangeStart', function(event, toState){
    		if(toState.data && toState.data.accessLevel){
    			var user = authService.getUserData(); 
    			if(!(toState.data.accessLevel & user.role)){
    				event.preventDefault(); 
    				$state.go('index'); 
    				return; 
    			}
    		}
    	})
    }
})();