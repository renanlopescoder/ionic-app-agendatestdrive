angular.module('starter').controller('PerfilController', function($rootScope, $scope, $cordovaCamera){
	$scope.usuarioLogado = $rootScope.usuario;
	$scope.editando = false;
	$scope.textoBotao = "Editar";

	$scope.tirarFoto = function(){
		var opcoes = {
			correctOrientation : true,
			quality : 80,
			cameraDirection: 1
		};
		$cordovaCamera.getPicture(opcoes).then(function(foto){
				$scope.caminhoFoto = foto;
		}, function(erro){

		})
	};

	$scope.acaoBotao = function(){
		if($scope.editando){
			$scope.editando = false;
			$scope.textoBotao = "Editar";
		}else{
			$scope.editando = true;
			$scope.textoBotao = "Salvar";
		}
	}

});