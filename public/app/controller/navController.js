(function() {
	'use strict';

	angular
		.module('support_manager');
		.controller('navController', [
			'authService', 
			navController
		]);

	function navController(authService){
		var vm = this; 

		vm.isAuthenticated = auhtService.isAuthenticated; 
		vm.logout = authService.logout; 
	}
})(); 