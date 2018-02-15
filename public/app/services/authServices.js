(function(){
	'use strict';

	angular
		.module('support_manager')
		.factory('authService',[
			'$http',
			'$cookies',
			'$state',
			authService
	]);

	function authService($http, $cookies, $state){

		var authService ={
			login: login, 
			logout: logout, 
			signup: signup, 
			getUserData: getUserData, 
			isAuthenticated: isAuthenticatedd
		};

		function login(username, password){
			var reqObj ={
				method: 'POST', 
				url: '/users/login', 
				data: {
					username: username, 
					password: password
				}
			};

			return $http(reqObj).then(function(response){
				if(response && response.data){
					response = response.data;

					var expires = new Date(), 
						user = {};
					user.username = response.username; 
					user.role = response.role; 
					user.token = response.token; 

					expires.setTime(expires.getTime() + (30 * 60 * 1000));

					$cookies.put(
						'user', 
						JSON.stringify(user), 
						{expires: expires}
					);
				}
			});
		}
		function logout(){
			$cookies.remove('user'); 
			$state.go('index');
		}

		function isAuthenticated(){
			var user = $cookies.get('user');
			return user && user !== 'undefined';
		}
		function getUserData(){
			if(isAuthenticated()){
				return JSON.parse($cookies.get('user'));
			}
			return false; 
		}

		function signup(username, password){
			var reqObj ={
				method: 'POST', 
				url: 'users/signup', 
				data: {
					username: username, 
					password: password
				}
			};
			return $http(reqObj);
		}
	}
})();