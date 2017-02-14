angular.module('starter')
.controller('LoginController', function($scope, CarroService, $ionicPopup, $state, $rootScope){

	$scope.login = {};

	$scope.realizarLogin = function(){
		var dadosDoLogin = {
			params : {
				email : $scope.login.email,
				senha : $scope.login.senha
			}
		};

		CarroService.realizarLogin(dadosDoLogin).then(function(dados){
			$rootScope.usuario = dados.usuario;
			$state.go('app.listagem');
		}, function(erro){
				$ionicPopup.alert({
					title : 'Atenção!',
					template : 'Email ou senha incorretos!'
				})
			}
		);
	};
});