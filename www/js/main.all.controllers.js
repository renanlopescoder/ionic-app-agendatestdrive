angular.module('starter')
.controller('ListagemController', function($scope, CarroService){

	CarroService.obterCarros().then(function(dados){

		$scope.listaDeCarros = dados;

	});

});

angular.module('starter')
.controller('CarroEscolhidoController', function($stateParams, $scope){

	$scope.carroEscolhido = angular.fromJson($stateParams.carro);

	$scope.listaDeAcessorios = [
		{"nome" : "Freio ABS", "preco": 800},
		{"nome" : "Ar Condicionado", "preco": 1000},
		{"nome" : "MP3 Player" , "preco" : 500}
	];

	$scope.mudou = function(acessorio, isMarcado){

		if (isMarcado) {
			$scope.carroEscolhido.preco = 
						$scope.carroEscolhido.preco + acessorio.preco;
		} else {
			$scope.carroEscolhido.preco = 
						$scope.carroEscolhido.preco - acessorio.preco;
		}
	};
});

angular.module('starter')
.controller('FinalizarPedidoController', function($stateParams, $scope
	, $ionicPopup, $state, CarroService,$ionicHistory){

	$scope.carroFinalizado = angular.fromJson($stateParams.carro);

	$scope.pedido = {};

	$scope.finalizarPedido = function(){

		var pedidoFinalizado = {
			params : {
				carro : $scope.carroFinalizado.nome,
				preco : $scope.carroFinalizado.preco,
				nome :  $scope.pedido.nome,
				endereco : $scope.pedido.endereco,
				email : $scope.pedido.email
			}
		}

		CarroService.salvarPedido(pedidoFinalizado).then(function(dados){
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$ionicPopup.alert({
				title: 'Parabens',
				template: 'Você acaba de comprar um carro.'
			}).then(function(){
				$state.go('app.listagem');
			});

		}, function(erro){
			$ionicPopup.alert({
				title: 'Deu erro',
				template: 'Campos obrigatórios'
			});
		});

	}

});

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

angular.module('starter').controller('MenuController', function($rootScope, $scope){
	$scope.usuarioLogado = $rootScope.usuario;
});

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







