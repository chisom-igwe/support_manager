 (function() {
 	'use strict'; 

 	angular
 		.module('support_manager')
 		.controller('signupController', [
 			'$scope', 
 			'authService', 
 			signup
 		]);

 		function signupController($scope, authService){
 			 var vm = this; 

 			 vm.signupSuccess = false; 
 			 vm.signupError = false; 
 			 vm.signupErrorMessage = null; 

 			 vm.signup = signup; 

 			 function signup() {
 			 	vm.signupSuccess = false; 
 			 	vm.signupError = false; 
 			 	vm.signupErrorMessage = null; 

 			 	if(!vm.username || !vm.password){
 			 		vm.signupError = true; 
 			 		vm.signupErrorMessage = 'Username and password are required!'; 
 			 		return; 
 			 	}

 			 	authService.signup(vm.username, um.password)
 			 		.then(handleSuccessfulSignup)
 			 		.catch(handleFailedSignup);

 			 	function handleSuccessfulSignup(response){
 			 		vm.signupSucess = true; 
 			 	}

 			 	function handleFailedSignup(response){
 			 		vm.signupErrorMessage = response.data.message; 
 			 		vm.sigupError = true; 
 			 	}

 			 }
 		}
 })(); 