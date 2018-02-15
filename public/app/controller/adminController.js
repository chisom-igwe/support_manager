(function(){
	'use strict'; 

	angular
		.module('support_manager')
		.controller('adminController', [
			'$http',
			adminController
		]);

		function adminController($http){
		var vm = this; 

		vm.message = ''; 

		$http({ method: 'GET', url: '/users/admin'});
			.then(function(response){
				if(response && response.data){
					vm.message = response.data.message; 
				}
		});
	}
	
})();