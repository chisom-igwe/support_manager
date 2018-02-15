(function() {
	'use strict'; 

	angular
		.module('support_manager')
		.controller('profileController', [
			'$http',
			profileController
		]);

	function profileController($http){
		var vm = this; 

		vm.message = '';

		$http({ method: 'GET', url: '/users/profile'})
			.then(function(response){
				if(response && response.data){
					vm.message = response.data.message; 
			}
		});
	}
})(); 