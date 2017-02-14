angular.module('starter')
.controller('PedidoController', function($stateParams, $scope
	, $ionicPopup, $state, CarroService,$ionicHistory, ionicDatePicker, DatabaseValues){

	$scope.carroFinalizado = angular.fromJson($stateParams.carro);

	$scope.pedido = {};
  $scope.dataSelecionada;

	var agendamento = function(confirmado){
			DatabaseValues.bancoDeDados.transaction(function(transacao){
				transacao.executeSql('INSERT INTO agendamentos(nome, endereco, email, dataAgendamento, modelo, preco, confirmado) VALUES (?,?,?,?,?,?,?)', [$scope.pedido.nome,$scope.pedido.endereco,$scope.pedido.email,$scope.dataSelecionada,$scope.carroFinalizado.nome,$scope.carroFinalizado.preco,confirmado]);
			});
	}

  $scope.calendario = function(){
    
      var config = {
        callback : function(data){
          $scope.dataSelecionada = new Date(data);
        },
        weeksList : ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
        monthsList : ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        closeOnSelect : true
      };
      ionicDatePicker.openDatePicker(config);
  }

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

			// Configurando banco e inserindo dados
			DatabaseValues.setup(); //Configurando Banco

			agendamento('true');

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
			agendamento('false');
			$ionicPopup.alert({
				title: 'Erro',
				template: 'Desculpe obtivemos um erro, favor tente mais tarde'
			}).then(function(){
				$state.go('app.listagem');
			});
		});

	}

});