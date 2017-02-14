angular.module('starter').value('DatabaseValues', {
  bancoDeDados : null,
  setup : function(){
    this.bancoDeDados = window.openDatabase('baseDados','1.0','Banco de Dados WebSQL', 4000);
  }
})